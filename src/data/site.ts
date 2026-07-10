// Données factuelles centralisées (issues du brief). Ne rien inventer ici.
export const site = {
  name: 'Kévin Richarte',
  role: 'Étalonneur',
  roleLong: 'Étalonneur · Spécialisé fiction',
  tagline: 'Étalonneur · Spécialisé fiction · Région parisienne',
  location: 'Région parisienne',

  email: 'kevin.richarte.pro@gmail.com',
  phone: '06 01 63 78 59',
  phoneHref: '+33601637859',

  showreelVimeoId: '1069282023',
  showreelUrl: 'https://vimeo.com/1069282023',
  instagram: '@kevin_richarte_colorist',
  instagramUrl: 'https://www.instagram.com/kevin_richarte_colorist/',
  linkedinUrl: 'https://www.linkedin.com/in/kévin-richarte-213358123/',

  // Textes éditoriaux (brief §3.3 / §3.4). Baseline PROVISOIRE.
  baselineProvisoire: 'Révéler votre image.',
  manifeste: 'Car voir votre vision prendre sa forme définitive donne tout son sens à ce métier.',

  facts: {
    software: 'DaVinci Resolve Studio',
    period: '2025 / 26',
  },
} as const;

export type Site = typeof site;
