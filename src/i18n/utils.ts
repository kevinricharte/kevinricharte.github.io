import { ui, defaultLang, routes, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/').filter(Boolean)[0];
  return seg === 'en' ? 'en' : 'fr';
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
