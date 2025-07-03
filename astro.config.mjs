import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  output: 'static',

  // your real domain
  // No integrations needed for GitHub Pages
  site: 'https://thefilthysoap.co',

  integrations: [react()]
});