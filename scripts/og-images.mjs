import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { promises as fs, existsSync } from 'node:fs';
import sharp from 'sharp';

// Images de partage (Open Graph) — format standard 1200×630.
const OG_W = 1200;
const OG_H = 630;
const QUALITY = 82;
// Mosaïque de l'accueil : une cover par projet publié, grille adaptée au nombre.

const clean = (v) => (v ? v.trim().replace(/^["']|["']$/g, '') : undefined);
// [^\r\n]+ : robuste aux fins de ligne Windows (CRLF) comme Unix (LF).
const fmValue = (block, key) => {
  const m = block.match(new RegExp(`^${key}:\\s*([^\\r\\n]+)`, 'm'));
  return m ? clean(m[1]) : undefined;
};

/**
 * Intégration Astro : à la fin du build, génère les images de partage dans /og/.
 *  - /og/projets/<id>.jpg : la cover de chaque projet, recadrée en 1200×630.
 *  - /og/og-home.jpg       : une mosaïque des projets publiés (accueil).
 * Les fichiers sources ne sont jamais modifiés.
 */
export default function ogImages() {
  return {
    name: 'og-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const mediaDir = path.join(distDir, 'media');
        const ogDir = path.join(distDir, 'og');
        const projetsDir = path.resolve('src/content/projets');
        if (!existsSync(mediaDir) || !existsSync(projetsDir)) {
          logger.warn('og-images : /media ou /projets introuvable — ignoré.');
          return;
        }
        const toSrc = (mediaPath) => path.join(mediaDir, String(mediaPath).replace(/^\/media\//, ''));

        // Lecture des projets (frontmatter brut)
        const mdFiles = (await fs.readdir(projetsDir)).filter((f) => f.endsWith('.md'));
        const projects = [];
        for (const f of mdFiles) {
          const md = await fs.readFile(path.join(projetsDir, f), 'utf8');
          const block = (md.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
          projects.push({
            id: f.replace(/\.md$/, ''),
            draft: /^draft:\s*true/m.test(block),
            ordre: parseInt(fmValue(block, 'ordre') || '999', 10),
            cover: fmValue(block, 'cover'),
          });
        }

        await fs.mkdir(path.join(ogDir, 'projets'), { recursive: true });

        // 1) Une image de partage par projet (depuis sa cover)
        let madeProjets = 0;
        for (const p of projects) {
          if (!p.cover) continue;
          const src = toSrc(p.cover);
          if (!existsSync(src)) {
            logger.warn(`og-images : cover manquante pour ${p.id}`);
            continue;
          }
          try {
            await sharp(src)
              .resize({ width: OG_W, height: OG_H, fit: 'cover', position: sharp.strategy.attention })
              .jpeg({ quality: QUALITY })
              .toFile(path.join(ogDir, 'projets', `${p.id}.jpg`));
            madeProjets += 1;
          } catch (err) {
            logger.warn(`og-images : projet ${p.id} — ${err.message}`);
          }
        }

        // 2) Mosaïque de l'accueil : la cover de chaque projet publié, grille adaptée au nombre.
        const published = projects.filter((p) => !p.draft).sort((a, b) => a.ordre - b.ordre);
        const covers = published.map((p) => p.cover).filter((c) => c && existsSync(toSrc(c)));
        const N = covers.length;

        // Grilles paysage ; on retient la plus grande dont le nombre de cases ne dépasse pas N
        // (on montre les N premiers projets par ordre — pas de case vide, pas de doublon).
        const layouts = [
          { cols: 3, rows: 2 }, { cols: 3, rows: 3 }, { cols: 4, rows: 3 },
          { cols: 4, rows: 4 }, { cols: 5, rows: 4 }, { cols: 6, rows: 4 },
        ];
        let cols = 3, rows = 2;
        for (const l of layouts) if (l.cols * l.rows <= N) { cols = l.cols; rows = l.rows; }
        const cells = cols * rows;

        let tilesMade = 0;
        if (N) {
          const cw = Math.round(OG_W / cols);
          const ch = Math.round(OG_H / rows);
          const tiles = [];
          for (let i = 0; i < Math.min(N, cells); i++) {
            try {
              const buf = await sharp(toSrc(covers[i]))
                .resize({ width: cw, height: ch, fit: 'cover', position: 'centre' })
                .toBuffer();
              tiles.push({ input: buf, left: (i % cols) * cw, top: Math.floor(i / cols) * ch });
              tilesMade += 1;
            } catch (err) {
              logger.warn(`og-images : mosaïque ${covers[i]} — ${err.message}`);
            }
          }
          await sharp({ create: { width: OG_W, height: OG_H, channels: 3, background: '#15110e' } })
            .composite(tiles)
            .jpeg({ quality: QUALITY })
            .toFile(path.join(ogDir, 'og-home.jpg'));
        }

        logger.info(`Images de partage : ${madeProjets} projets + mosaïque accueil (${tilesMade} plans, grille ${cols}×${rows}).`);
      },
    },
  };
}
