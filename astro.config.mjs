// @ts-check
import { defineConfig } from 'astro/config';
 

import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  base: '/', // Use '/' for local dev, set to '/SantiQuirogaAlvarez.github.io/' for GitHub Pages
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
  remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});