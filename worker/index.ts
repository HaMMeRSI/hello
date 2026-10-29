// Static assets, plus the canonical-host redirect and the PostHog reverse proxy under /ingest.
const CANONICAL_HOST = 'sagihammer.com';
const POSTHOG_ASSETS = 'us-assets.i.posthog.com';
const POSTHOG_INGEST = 'us.i.posthog.com';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

// Static assets ignore Range, and Safari won't play <video> without 206 responses.
async function serveAsset(request: Request, env: Env): Promise<Response> {
  const range = request.headers.get('range');
  const response = await env.ASSETS.fetch(request);
  const match = range?.match(/^bytes=(\d*)-(\d*)$/);
  if (!match || response.status !== 200 || !response.body) return response;

  const body = await response.arrayBuffer();
  const size = body.byteLength;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { 'content-range': `bytes */${size}` } });
  }

  const headers = new Headers(response.headers);
  headers.delete('content-encoding');
  headers.set('accept-ranges', 'bytes');
  headers.set('content-range', `bytes ${start}-${end}/${size}`);
  headers.set('content-length', String(end - start + 1));
  return new Response(body.slice(start, end + 1), { status: 206, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    if (!url.pathname.startsWith('/ingest/')) {
      // The assets layer drops trailing slashes with a 307; search engines want a permanent move.
      if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
        url.pathname = url.pathname.slice(0, -1);
        return Response.redirect(url.toString(), 301);
      }
      return serveAsset(request, env);
    }

    const path = url.pathname.replace(/^\/ingest/, '');
    url.hostname = path.startsWith('/static/') ? POSTHOG_ASSETS : POSTHOG_INGEST;
    url.pathname = path;
    url.protocol = 'https:';
    url.port = '';

    const headers = new Headers(request.headers);
    headers.delete('cookie');
    const ip = request.headers.get('cf-connecting-ip');
    if (ip) headers.set('x-forwarded-for', ip);

    return fetch(new Request(url, { method: request.method, headers, body: request.body, redirect: 'manual' }));
  },
};
