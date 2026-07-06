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
