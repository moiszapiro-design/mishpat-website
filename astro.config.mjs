// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// BASE_PATH / SITE_URL let the same source build for a preview host
// (e.g. GitHub Pages under a subpath) without editing any links.
// Leave both unset for the production build at the domain root.
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.mishpatcapital.com',
  base: process.env.BASE_PATH || undefined,
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap()],
});
