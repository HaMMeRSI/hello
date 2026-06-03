#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { join } from 'node:path';

import { config } from '../../deploy.config.ts';

const { host: HOST, hostRoot: ROOT_HOST, sshKey: KEY, remotePath: REMOTE, imageName: IMAGE, appLabel: APP_LABEL } = config;

const root = join(import.meta.dirname, '../../..');
const nginxDomains = [...config.nginx.domains];
const certificateName = config.nginx.certificateName;

const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const blue = (s: string) => `\x1b[34m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const sshKey = KEY.startsWith('~/') && process.env.HOME ? `${process.env.HOME}${KEY.slice(1)}` : KEY;
const sshOptions = `-i ${sshKey} -o BatchMode=yes -o ConnectTimeout=10 -o ServerAliveInterval=20 -o ServerAliveCountMax=6 -o IPQoS=none`;

const run = (cmd: string, silent = false) => {
  if (!silent) console.log(blue(`$ ${cmd}`));
  return execSync(cmd, { stdio: silent ? 'pipe' : 'inherit', encoding: 'utf-8', shell: '/bin/bash' });
};

const ssh = (cmd: string, silent = false) => run(`ssh ${sshOptions} ${HOST} "${cmd}"`, silent);
const sshRoot = (cmd: string, silent = false) => run(`ssh ${sshOptions} ${ROOT_HOST} "${cmd}"`, silent);

function remoteCertificateExists() {
  try {
    sshRoot(
      `timeout 5 bash -lc 'test -f /etc/letsencrypt/live/${certificateName}/fullchain.pem && test -f /etc/letsencrypt/live/${certificateName}/privkey.pem'`,
      true,
    );
    return true;
  } catch {
    return false;
  }
}

function remotePublicIpv4() {
  try {
    return sshRoot('curl -4fsS --max-time 5 https://api.ipify.org', true).trim();
  } catch {
    return sshRoot('hostname -I', true).trim().split(/\s+/)[0];
  }
}

function resolveRemoteIpv4(domain: string) {
  try {
    const output = sshRoot(
      [
        `timeout 5 dig +short @1.1.1.1 ${domain} A || true`,
        `timeout 5 dig +short @8.8.8.8 ${domain} A || true`,
        `timeout 5 dig +short @9.9.9.9 ${domain} A || true`,
      ].join('; '),
      true,
    );
    const ips = output.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) ?? [];
    if (ips.length > 0) return [...new Set(ips)];

    const fallbackOutput = sshRoot(`timeout 5 getent ahostsv4 ${domain}`, true);
    const fallbackIps = fallbackOutput.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) ?? [];
    return [...new Set(fallbackIps)];
  } catch {
    return [];
  }
}

function domainsPointAtVps() {
  const serverIp = remotePublicIpv4();
  const mismatches = nginxDomains
    .map((domain) => ({ domain, ips: resolveRemoteIpv4(domain) }))
    .filter(({ ips }) => !ips.includes(serverIp));

  if (mismatches.length === 0) return true;

  console.log(red(`! ${nginxDomains.join(', ')} must point to ${serverIp} before HTTPS can be issued.`));
  for (const { domain, ips } of mismatches) {
    console.log(`  ${domain}: ${ips.length ? ips.join(', ') : 'no A record'}`);
  }
  return false;
}

function installHttpBootstrapConfig() {
  const src = join(root, config.nginx.bootstrapLocalPath);
  const remoteConfig = `/etc/nginx/sites-available/${config.nginx.siteName}`;
  const enabledConfig = `/etc/nginx/sites-enabled/${config.nginx.siteName}`;

  run(`rsync -az --partial -e "ssh ${sshOptions}" ${src} ${ROOT_HOST}:${config.nginx.remoteTempPath}`, true);
  sshRoot(
    `mkdir -p /var/www/certbot && cp ${config.nginx.remoteTempPath} ${remoteConfig} && ln -sf ${remoteConfig} ${enabledConfig} && nginx -t && systemctl reload nginx`,
  );
  console.log(green('✓ HTTP nginx bootstrap synced'));
}

function issueCertificateIfPossible() {
  if (!domainsPointAtVps()) return false;

  installHttpBootstrapConfig();

  try {
    sshRoot('command -v certbot >/dev/null', true);
    const domainArgs = nginxDomains.map((domain) => `-d ${domain}`).join(' ');
    sshRoot(
      `certbot certonly --webroot -w /var/www/certbot ${domainArgs} --email ${config.nginx.certbotEmail} --agree-tos --non-interactive --keep-until-expiring`,
    );
    return remoteCertificateExists();
  } catch {
    console.log(red('! Certbot could not issue the certificate. Leaving HTTP bootstrap config enabled.'));
    return false;
  }
}

// =============================================================================
// Deploy Steps
// =============================================================================

function syncFiles() {
  console.log('\n📦 Syncing files...');
  ssh(`mkdir -p ${REMOTE}`, true);

  const filters = [
    '--exclude=node_modules',
    '--exclude=dist',
    '--exclude=.astro',
    '--exclude=.git',
    '--exclude=.github',
    '--exclude=.codex-screenshots',
    '--exclude=devops',
    '--exclude=.env',
    '--exclude=.env.*',
    '--exclude=*.log',
  ];

  run(`rsync -avz --partial --delete ${filters.join(' ')} -e "ssh ${sshOptions}" ${root}/ ${HOST}:${REMOTE}/`);
  console.log(green('✓ Files synced'));
}

function syncNginxConfig() {
  console.log('\n🔧 Syncing nginx config...');
  const src = join(root, config.nginx.localPath);
  const remoteConfig = `/etc/nginx/sites-available/${config.nginx.siteName}`;
  const enabledConfig = `/etc/nginx/sites-enabled/${config.nginx.siteName}`;

  if (!remoteCertificateExists() && !issueCertificateIfPossible()) {
    installHttpBootstrapConfig();
    console.log(red('! HTTPS nginx config was not enabled because the certificate is missing.'));
    return;
  }

  run(`rsync -az --partial -e "ssh ${sshOptions}" ${src} ${ROOT_HOST}:${config.nginx.remoteTempPath}`, true);
  sshRoot(`cp ${config.nginx.remoteTempPath} ${remoteConfig} && ln -sf ${remoteConfig} ${enabledConfig} && nginx -t && systemctl reload nginx`);
  console.log(green('✓ Nginx config synced'));
}

function deploy() {
  console.log('\n🐳 Deploying container...');

  // Rotate rollback tags (keep 2 previous versions)
  ssh(`docker tag ${IMAGE}:previous ${IMAGE}:previous-2 2>/dev/null || true`, true);
  ssh(`docker tag ${IMAGE}:latest ${IMAGE}:previous 2>/dev/null || true`, true);

  ssh(`cd ${REMOTE} && docker compose up -d --build --wait`);
  console.log(green('✓ Container running and healthy'));

  console.log('\n🧹 Cleaning up...');
  ssh(`docker image prune -f`, true);
  console.log(green('✓ Cleanup done'));
}

function rollback() {
  const depth = process.argv[3] === '2' ? 'previous-2' : 'previous';
  console.log(`\n⏪ Rolling back to ${depth}...`);

  try {
    ssh(`docker image inspect ${IMAGE}:${depth} >/dev/null 2>&1`, true);
  } catch {
    console.log(red(`❌ No ${depth} version to rollback to`));
    process.exit(1);
  }

  ssh(`docker tag ${IMAGE}:${depth} ${IMAGE}:latest`);
  ssh(`cd ${REMOTE} && docker compose up -d --wait`);

  console.log(green(`✓ Rolled back to ${depth}`));
}

// =============================================================================
// Main
// =============================================================================

const cmd = process.argv[2];

if (cmd === 'rollback') {
  rollback();
} else {
  console.log(blue(`🚀 Deploying ${APP_LABEL}\n`));
  console.log(`   ${root} → ${HOST}:${REMOTE}`);

  syncFiles();
  syncNginxConfig();
  deploy();

  console.log('\n' + green('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  console.log(green('✅ Deployed!'));
  console.log(green('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));

  console.log(`\nRollback: ${blue(`pnpm deploy:vps rollback`)} or ${blue(`pnpm deploy:vps rollback 2`)}`);
}
