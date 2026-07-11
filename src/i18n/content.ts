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
