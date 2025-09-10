// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  base: '/', // Use '/' for local dev, set to '/SantiQuirogaAlvarez.github.io/' for GitHub Pages
  vite: {
    plugins: [tailwindcss()],
  }
});