// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://astra.in.ua',
  // Output flat .html files (seredniy.html) so URLs, relative asset paths and
  // the existing astra.js filename-based nav highlighting keep working 1:1.
  build: { format: 'file' },
  adapter: vercel(),
});
