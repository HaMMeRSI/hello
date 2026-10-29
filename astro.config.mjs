import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';

// The essays come from an editor where a single newline is a line break; keep it.
const lineBreaks = {
  name: 'line-breaks',
  text(node, ctx) {
    if (!node.value.includes('\n')) return;
    ctx.replaceNode(
      node,
      node.value
        .split('\n')
        .flatMap(value => [{ type: 'break' }, { type: 'text', value }])
        .slice(1)
    );
  },
};

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
  markdown: {
    processor: satteri({ mdastPlugins: [lineBreaks] }),
  },
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
