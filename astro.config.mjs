import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dataisland.com',
  output: 'static',
  integrations: [
    // test.html and the example flip-books are not pages anyone should land on from search.
    sitemap({ filter: (page) => !page.includes('/test') }),
  ],
});
