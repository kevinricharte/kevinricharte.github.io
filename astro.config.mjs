import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  integrations: [sitemap()],
});
