import { ui, defaultLang, routes, type Lang, type UIKey } from './ui';
import reglages from '../data/reglages.json';

// Version anglaise publiée ? (piloté depuis le panneau : Réglages → « Activer la version anglaise »)
export const enActive: boolean = (reglages as { enActive?: boolean }).enActive === true;

export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/').filter(Boolean)[0];
  return seg === 'en' ? 'en' : 'fr';
}

// Segments localisés (le 2e niveau d'URL diffère entre FR et EN).
const frToEnSeg: Record<string, string> = { projets: 'projects', 'a-propos': 'about', formation: 'training', contact: 'contact', 'mentions-legales': 'legal' };
const enToFrSeg: Record<string, string> = { projects: 'projets', about: 'a-propos', training: 'formation', contact: 'contact', legal: 'mentions-legales' };

/** Chemin équivalent dans l'autre langue (ex. /fr/projets/x/ -> /en/projects/x/). */
export function altLangPath(pathname: string, to: Lang): string {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  if (parts.length === 0) return to === 'en' ? '/en/' : '/fr/';
  parts[0] = to;
  if (parts[1]) parts[1] = to === 'en' ? (frToEnSeg[parts[1]] ?? parts[1]) : (enToFrSeg[parts[1]] ?? parts[1]);
  return '/' + parts.join('/') + '/';
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return (ui[lang] as Record<string, string>)[key]
      ?? (ui[defaultLang] as Record<string, string>)[key]
      ?? String(key);
  };
}

export function getRoutes(lang: Lang) {
  return routes[lang];
}
