export const config = {
  host: 'sagi-mach', // deploy user - for rsync + docker
  hostRoot: 'sagi-mach-vps', // root user - for nginx/system config
  sshKey: '~/.ssh/hostinger',
  remotePath: '~/sagi-hammer',
  imageName: 'sagi-hammer',
  appLabel: 'Sagi Hammer',
  nginx: {
    localPath: 'devops/config/nginx/sagihammer-com.conf',
    bootstrapLocalPath: 'devops/config/nginx/sagihammer-com.http.conf',
    remoteTempPath: '/tmp/sagihammer-com.conf',
    siteName: 'sagihammer.com',
    certificateName: 'sagihammer.com',
    domains: ['sagihammer.com', 'www.sagihammer.com'],
    certbotEmail: 'contact@sagihammer.com',
  },
} as const;
