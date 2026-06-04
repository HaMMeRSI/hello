import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const withoutTrailingSlash = url => (url.endsWith('/') && url !== 'https://sagihammer.com/' ? url.slice(0, -1) : url);

export default defineConfig({
  site: 'https://sagihammer.com',
  integrations: [
    sitemap({
      serialize(item) {
        item.url = withoutTrailingSlash(item.url);
        return item;
      },
    }),
  ],
  prefetch: false,
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  },
});
