import type { ImageMetadata } from 'astro';

// Toutes les images de projet, importées pour optimisation (astro:assets).
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projets/**/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

/** Résout un fichier image d'un projet en ImageMetadata optimisable. */
export function projectImage(slug: string, file: string): ImageMetadata | undefined {
  return modules[`/src/assets/projets/${slug}/${file}`]?.default;
}

/** Résout une liste de fichiers (galerie). Ignore silencieusement les manquants. */
export function projectImages(slug: string, files: string[]): ImageMetadata[] {
  return files
    .map((f) => projectImage(slug, f))
    .filter((x): x is ImageMetadata => Boolean(x));
}

/** Toutes les vignettes still-*.jpg d'un projet (par convention de dossier, triées). */
export function projectStills(slug: string): ImageMetadata[] {
  const prefix = `/src/assets/projets/${slug}/still-`;
  return Object.keys(modules)
    .filter((k) => k.startsWith(prefix))
    .sort()
    .map((k) => modules[k].default);
}

/** Paire de wipe si wipe-avant.jpg ET wipe-apres.jpg existent dans le dossier. */
export function projectWipe(
  slug: string,
): { avant: ImageMetadata; apres: ImageMetadata } | undefined {
  const avant = projectImage(slug, 'wipe-avant.jpg');
  const apres = projectImage(slug, 'wipe-apres.jpg');
  return avant && apres ? { avant, apres } : undefined;
}
