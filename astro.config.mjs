import { defineConfig } from 'astro/config';

export default defineConfig({
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
