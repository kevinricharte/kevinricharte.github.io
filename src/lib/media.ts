/**
 * Renvoie le chemin de la miniature légère correspondant à une image de /media.
 * Ex. /media/x.jpg → /media/thumbs/x.webp.
 * Utilisée pour l'affichage (vignettes, galerie, couverture) ; l'original
 * pleine résolution reste servi en plein écran via l'attribut data-full.
 */
export const thumb = (p?: string): string | undefined => {
  if (!p || !p.startsWith('/media/')) return p;
  return p.replace(/^\/media\//, '/media/thumbs/').replace(/\.(jpe?g|png|webp)$/i, '.webp');
};
