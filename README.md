# Site Kevin Richarte — étalonneur

Site vitrine construit avec [Astro](https://astro.build) (statique, hébergeable sur GitHub Pages).
Palette, typographie et structure suivent le brief de design.

---

## 🧰 Prérequis

- **Node.js 18+** (installé). Vérifier : `node -v`
- Un éditeur de texte (VS Code recommandé) pour modifier les fichiers `.md`.

## ▶️ Lancer le site en local

Dans un terminal, à la racine du projet (`…/Kévin Richarte_Site Web/site`) :

```bash
npm install      # la première fois seulement
npm run dev      # démarre le site sur http://localhost:4321
```

`npm run build` génère le site final dans `dist/`. `npm run preview` sert ce build.

---

## ✍️ Modifier le contenu (sans toucher au code)

### Les projets
Chaque projet = **un fichier Markdown** dans `src/content/projets/`.
Exemple `postcard-from-marseille.md` :

```yaml
---
titre: "Postcard from Marseille"
annee: 2025                         # supprimer la ligne si inconnue
typologiePrincipale: "Fiction"      # étiquette affichée sur la carte
typologies: ["Fiction"]             # sert aux filtres (Fiction, Clip, Publicité, Brand content…)
diffusion: "France 3 PACA · France TV"
credits:
  realisation: "[Réalisateur — à confirmer]"
  production: "Channel Rose"
  image: "[Chef opérateur — à confirmer]"
  camera: "[Caméra — à confirmer]"
  workflow: "[Espace colorimétrique — à confirmer]"
cover: "cover.jpg"                  # image de vignette
wipe:                               # comparateur avant/après (optionnel)
  avant: "wipe-avant.jpg"           # plan REC.709
  apres: "wipe-apres.jpg"           # plan étalonné
stills: ["still-01.jpg", "still-02.jpg"]   # galerie (optionnel)
featured: true                      # true = apparaît dans la Sélection de l'accueil
ordre: 1                            # ordre d'affichage
---

Ici, le texte de la NOTE D'INTENTION (200–400 mots). C'est le cœur éditorial.
```

**Les images d'un projet** vont dans `src/assets/projets/<nom-du-projet>/`
(le `<nom-du-projet>` doit correspondre au nom du fichier `.md`).
Elles sont converties automatiquement en WebP optimisé au build — pas besoin de les redimensionner.

Pour un **wipe avant/après** : place les deux plans du **même cadre** (un REC.709, un étalonné),
nomme-les `wipe-avant.jpg` / `wipe-apres.jpg`, et remplis le bloc `wipe:` du `.md`.

### L'accueil
- **Marques & chiffres** : `src/pages/fr/index.astro` (tableaux `marques` et section `stats`).
- **Logos** : SVG dans `public/logos/marques/` (affichés en monochrome).
- **Sélection** : les projets avec `featured: true`.

### Coordonnées, showreel, réseaux
Tout est centralisé dans `src/data/site.ts` (e-mail, téléphone, ID Vimeo, Instagram…).

---

## 🎨 Repères de design
- Couleurs et typo : `src/styles/tokens.css` (palette verrouillée).
- Composants : `src/components/`. Layout : `src/layouts/BaseLayout.astro`.

---

## 🚀 Mettre en ligne (GitHub Pages)

1. Créer un dépôt GitHub et y pousser le contenu de ce dossier `site/`.
2. Dans **Settings → Pages**, choisir **Source : GitHub Actions**.
3. À chaque `git push` sur `main`, le workflow `.github/workflows/deploy.yml` build et publie.

**Avant la mise en ligne**, dans `astro.config.mjs` :
- remplacer `site: 'https://kevinricharte.fr'` par le domaine final ;
- si le site est servi depuis `https://<user>.github.io/<repo>/` (sans domaine perso),
  ajouter `base: '/<repo>/'`.

---

## ✅ À compléter (placeholders à remplacer)
- Notes d'intention de chaque projet.
- Crédits réels (réalisateur, chef op, caméra, workflow, année).
- Typologies définitives (provisoires pour l'instant).
- Covers à curer (1er still pris par défaut).
- Mentions légales : statut juridique, SIRET, adresse (`src/pages/fr/mentions-legales.astro`).
- Version anglaise (`/en/`) : à traduire une fois les textes FR validés.
