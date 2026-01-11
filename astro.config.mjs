import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tlc-learning.co.uk',
  integrations: [svelte(), tailwind(), sitemap()],
  output: 'static',
  build: {
    assets: '_assets',
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '$lib': '/src/lib',
      },
    },
  },
});
