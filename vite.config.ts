import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        cv: 'CV/index.html',
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
