import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkDataDeleted from './src/plugins/remark-data-deleted.mjs';

export default defineConfig({
  site: 'https://ab.hikari.bond',
  output: 'static',
  vite: {
    build: {
      // The home-only WebGL scene includes Three.js geometry and bloom post-processing.
      chunkSizeWarningLimit: 600,
    },
  },
  markdown: {
    processor: unified({ remarkPlugins: [remarkDataDeleted] }),
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,
    },
  },
});
