// Chaînes d'interface + routes par langue.
// V1 : FR complet. EN prêt à brancher (enReady dans LangSwitcher).
export const languages = { fr: 'FR', en: 'EN' } as const;
export const defaultLang = 'fr';
export type Lang = keyof typeof languages;

export const routes = {
  fr: {
    home: '/fr/',
    projects: '/fr/projets',
    training: '/fr/formation',
    about: '/fr/a-propos',
    contact: '/fr/contact',
    legal: '/fr/mentions-legales',
  },
  en: {
    home: '/en/',
    projects: '/en/projects',
    training: '/en/training',
    about: '/en/about',
    contact: '/en/contact',
    legal: '/en/legal',
  },
} as const;

export const ui = {
  fr: {
    'skip': 'Aller au contenu',
    'nav.home': 'Accueil',
    'nav.projects': 'Projets',
    'nav.training': 'Formation',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.menu': 'Ouvrir le menu',
    'nav.close': 'Fermer le menu',
    'footer.role': 'Étalonneur fiction · Région parisienne',
    'footer.rights': 'Tous droits réservés.',
    'footer.legal': 'Mentions légales',
    'cta.projects': 'Voir les projets',
    'cta.allProjects': 'Voir tous les projets',
    'cta.more': 'En savoir plus',
    'cta.contact': 'Me contacter',
  },
  en: {
    'skip': 'Skip to content',
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.training': 'Training',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.menu': 'Open menu',
    'nav.close': 'Close menu',
    'footer.role': 'Fiction colorist · Paris area',
    'footer.rights': 'All rights reserved.',
    'footer.legal': 'Legal notice',
    'cta.projects': 'View projects',
    'cta.allProjects': 'View all projects',
    'cta.more': 'Learn more',
    'cta.contact': 'Get in touch',
  },
} as const;

export type UIKey = keyof (typeof ui)['fr'];
