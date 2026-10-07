/**
 * Catalogue des réalisations : alimente l'accueil, la grille /realisations et les fiches projet.
 *
 * Ajouter une vidéo YouTube : renseigner `video: { youtubeId: "xxxxxxxxxxx" }` (les 11 caractères
 * après « watch?v= »). La vignette et le lecteur sont alors gérés automatiquement.
 *
 * Seuls des projets vérifiés figurent ici. Les champs marqués « À CONFIRMER » et les visuels
 * `placeholder` doivent être remplacés avec les informations du studio.
 */

export const CATEGORIES = ["Publicité", "Clip", "Fiction", "Réseaux sociaux", "Coulisses"] as const;
export type Category = (typeof CATEGORIES)[number];

export type ProjectVideo =
  /** Vidéo YouTube (lecteur léger, chargé au clic). */
  | { youtubeId: string }
  /** Vidéo hébergée sur le site (fichiers produits par scripts/process-media.mjs). */
  | { src: string; poster: string; vertical?: boolean };

export type Project = {
  slug: string;
  title: string;
  category: Category;
  /** Précision affichée sur la fiche (ex. « Court-métrage »). */
  format: string;
  client: string;
  director: string;
  year?: number;
  image: string;
  /** Visuel d'attente, à remplacer par une image du projet. */
  placeholder?: boolean;
  video?: ProjectVideo;
  summary: string;
  description: string[];
  award?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "reseau-social",
    title: "Réseau Social",
    category: "Fiction",
    format: "Court-métrage",
    client: "π Studio",
    director: "Paul Yves Ettien",
    year: 2022,
    image: "/media/images/studio-operateur-camera.jpg",
    placeholder: true,
    summary: "Le court-métrage récompensé par le prix de la meilleure fiction au NISA 2022.",
    description: [
      "Court-métrage de fiction écrit et réalisé par Paul Yves Ettien, récompensé par le prix de la meilleure fiction au NISA 2022.",
      // À CONFIRMER : synopsis, équipe, durée, lien de visionnage.
    ],
    award: "NISA 2022 — Prix de la meilleure fiction",
    featured: true,
  },
  {
    slug: "lisa",
    title: "Lisa",
    category: "Fiction",
    format: "Court-métrage",
    client: "π Studio",
    director: "Paul Yves Ettien",
    image: "/media/images/portrait-costume.jpg",
    placeholder: true,
    summary: "Un court-métrage de fiction signé π Studio.",
    description: [
      "Court-métrage de fiction produit par π Studio.",
      // À CONFIRMER : année, synopsis, équipe, lien de visionnage.
    ],
    featured: true,
  },
  {
    slug: "ce-que-peut-cacher-un-regard",
    title: "Ce que peut cacher un regard",
    category: "Fiction",
    format: "Court-métrage",
    client: "π Studio",
    director: "Paul Yves Ettien",
    image: "/media/images/evenement-pye-communaute.jpg",
    placeholder: true,
    summary: "Un court-métrage de fiction signé π Studio.",
    description: [
      "Court-métrage de fiction produit par π Studio.",
      // À CONFIRMER : année, synopsis, équipe, lien de visionnage.
    ],
    featured: true,
  },
  {
    slug: "sur-le-plateau",
    title: "Sur le plateau",
    category: "Coulisses",
    format: "Making-of",
    client: "π Studio",
    director: "π Studio",
    image: "/media/videos/hero-bts-col-1.jpg",
    video: {
      src: "/media/videos/hero-bts-mobile",
      poster: "/media/videos/hero-bts-mobile.jpg",
      vertical: true,
    },
    summary: "Lumière, perche, retour image : quinze secondes dans les coulisses d'un tournage.",
    description: [
      "Installation des lumières, réglages caméra, retour image sur le poste de montage, maquillage : un aperçu de l'envers du décor sur un tournage π Studio.",
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

/** Projet suivant dans le catalogue (boucle à la fin), pour la navigation entre fiches. */
export function getNextProject(slug: string) {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  return PROJECTS[(index + 1) % PROJECTS.length];
}
