// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
 

import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://santiquirogaalvarez.github.io',
  base: '/', // User site on GitHub Pages should use '/'
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
