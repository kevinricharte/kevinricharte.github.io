import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { promises as fs, existsSync } from 'node:fs';
import sharp from 'sharp';

// Largeur des miniatures d'affichage. Les originaux (UHD) ne sont pas touchés
// et restent servis en plein écran (lightbox).
const THUMB_WIDTH = 1600;
const QUALITY = 85;
const RASTER = /\.(jpe?g|png|webp)$/i;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    if (e.isDirectory()) {
      if (e.name === 'thumbs') continue; // ne pas re-traiter les miniatures
      files.push(...(await walk(path.join(dir, e.name))));
    } else if (RASTER.test(e.name)) {
      files.push(path.join(dir, e.name));
    }
  }
  return files;
}

/**
 * Intégration Astro : à la fin du build, génère une miniature WebP légère
 * (~1000 px) pour chaque image de /media, dans /media/thumbs/. Les pages
 * affichent la miniature ; l'original pleine résolution reste utilisé en
 * plein écran. Rien n'est modifié dans les fichiers sources.
 */
export default function thumbnails() {
  return {
    name: 'thumbnails',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const mediaDir = path.join(fileURLToPath(dir), 'media');
        if (!existsSync(mediaDir)) {
          logger.warn('Aucun dossier /media à traiter — miniatures ignorées.');
          return;
        }
        const files = await walk(mediaDir);
        let made = 0;
        let origBytes = 0;
        let thumbBytes = 0;
        for (const src of files) {
          const rel = path.relative(mediaDir, src);
          const dest = path.join(mediaDir, 'thumbs', rel).replace(RASTER, '.webp');
          await fs.mkdir(path.dirname(dest), { recursive: true });
          try {
            await sharp(src)
              .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
              .webp({ quality: QUALITY })
              .toFile(dest);
            made += 1;
            thumbBytes += (await fs.stat(dest)).size;
            origBytes += (await fs.stat(src)).size;
          } catch (err) {
            logger.warn(`Miniature impossible pour ${rel} : ${err.message}`);
          }
        }
        logger.info(
          `Miniatures : ${made} générées — ${(origBytes / 1048576).toFixed(1)} Mo d'originaux ` +
            `→ ${(thumbBytes / 1048576).toFixed(1)} Mo de vignettes.`,
        );
      },
    },
  };
}
