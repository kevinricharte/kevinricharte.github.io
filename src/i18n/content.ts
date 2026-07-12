// Traductions de contenu structuré (typologies de projets, etc.).
export const typoLabels: Record<string, string> = {
  Fiction: 'Fiction',
  Clip: 'Music video',
  'Publicité': 'Advertising',
  'Brand content': 'Brand content',
  Documentaire: 'Documentary',
  Spot: 'Spot',
};

/** Libellé d'une typologie selon la langue (repli sur la valeur FR si inconnue). */
export const typoLabel = (value: string, en: boolean): string =>
  en ? (typoLabels[value] ?? value) : value;

/** Chemin d'une fiche projet selon la langue. */
export const projectHref = (id: string, en: boolean): string =>
  en ? `/en/projects/${id}` : `/fr/projets/${id}`;

// Genres (saisie libre) : traduction des genres courants ; repli sur le texte tel quel.
const genreEn: Record<string, string> = {
  action: 'Action', aventure: 'Adventure', 'comédie': 'Comedy', comedie: 'Comedy',
  'comédie dramatique': 'Comedy-drama', 'comédie romantique': 'Romantic comedy',
  drame: 'Drama', thriller: 'Thriller', romance: 'Romance',
  'science-fiction': 'Science fiction', 'science fiction': 'Science fiction',
  documentaire: 'Documentary', horreur: 'Horror', 'épouvante': 'Horror',
  fantastique: 'Fantasy', 'fantaisie': 'Fantasy', policier: 'Crime', polar: 'Crime',
  historique: 'Historical', musical: 'Musical', 'comédie musicale': 'Musical',
  guerre: 'War', western: 'Western', biopic: 'Biopic',
  'expérimental': 'Experimental', experimental: 'Experimental', onirique: 'Dreamlike',
  'néo-noir': 'Neo-noir', 'neo-noir': 'Neo-noir', 'film noir': 'Film noir',
  fiction: 'Fiction', clip: 'Music video', 'publicité': 'Advertising',
  animation: 'Animation', suspense: 'Suspense', 'mystère': 'Mystery',
  satire: 'Satire', 'tragi-comédie': 'Tragicomedy', 'érotique': 'Erotic',
  burlesque: 'Slapstick', 'huis clos': 'Chamber piece', 'road movie': 'Road movie',
};

/** Libellé d'un genre selon la langue (repli sur la valeur saisie si non répertorié). */
export const genreLabel = (value: string, en: boolean): string =>
  en ? (genreEn[value.trim().toLowerCase()] ?? value) : value;
