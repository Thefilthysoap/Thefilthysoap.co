import { defineConfig } from 'astro/config';
import github from '@astrojs/github';

export default defineConfig({
  output: 'static',
  site: 'https://thefilthysoap.co',
  integrations: [github()],
});
