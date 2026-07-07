import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Collection "projets" — 1 fichier Markdown par projet dans src/content/projets/.
// Le corps Markdown = note d'intention (éditable par Kevin).
// Les images sont référencées par nom de fichier (résolues via src/lib/images.ts).
const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: z.object({
    titre: z.string(),
    annee: z.number().optional(), // laissé vide si inconnu → affiché en placeholder
    typologiePrincipale: z.string(),
    typologies: z.array(z.string()).default([]),
    diffusion: z.string().optional(),
    duree: z.string().optional(),
    distinctions: z.array(z.string()).default([]),
    credits: z
      .object({
        realisation: z.string().optional(),
        production: z.string().optional(),
        image: z.string().optional(),
        camera: z.string().optional(),
        etalonnage: z.string().default('Kévin Richarte'),
        workflow: z.string().optional(),
      })
      .default({}),
    videoVimeo: z.string().optional(),
    cover: z.string(),
    coverAlt: z.string().optional(),
    wipe: z
      .object({
        avant: z.string().optional(),
        apres: z.string().optional(),
        alt: z.string().optional(),
      })
      .optional(),
    stills: z.array(z.string()).default([]),
    detailTechnique: z.string().optional(),
    tags: z
      .object({
        cameras: z.array(z.string()).default([]),
        espaces: z.array(z.string()).default([]),
        diffusions: z.array(z.string()).default([]),
        approches: z.array(z.string()).default([]),
      })
      .default({}),
    inspirations: z.array(z.string()).default([]),
    videoUrl: z.string().optional(),
    testimonial: z.object({ citation: z.string(), auteur: z.string() }).optional(),
    draft: z.boolean().default(false), // true = exclu de la grille, de l'accueil et du sitemap
    featured: z.boolean().default(false),
    ordre: z.number().default(0),
  }),
});

export const collections = { projets };
