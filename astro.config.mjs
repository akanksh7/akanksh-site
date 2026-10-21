import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config.ts';
export default defineConfig({ site: site.url, base: site.base, integrations: [sitemap()], markdown:{shikiConfig:{themes:{light:'github-light',dark:'github-dark'}}} });
