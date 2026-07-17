import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
import sitemap from '@astrojs/sitemap';
import thumbnails from './scripts/thumbnails.mjs';
import ogImages from './scripts/og-images.mjs';

// Tant que la version anglaise n'est pas activée, on l'exclut du sitemap.
const EN_ACTIVE = JSON.parse(readFileSync('./src/data/reglages.json', 'utf8')).enActive === true;

// ⚠️ AVANT MISE EN LIGNE :
//  - `site` : remplacer par le domaine final (ex. https://kevinricharte.fr)
//  - `base` : laisser '/' si domaine personnalisé ou <user>.github.io ;
//             mettre '/nom-du-repo/' si déployé sur github.io/<repo> sans domaine.
export default defineConfig({
  site: 'https://kevinricharte.github.io',
  base: '/',
  trailingSlash: 'ignore',
  output: 'static',
  compressHTML: true,
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: true, // FR est explicitement préfixé : /fr/...
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({ filter: (page) => EN_ACTIVE || !page.includes('/en/') }),
    thumbnails(),
    ogImages(),
  ],
});
