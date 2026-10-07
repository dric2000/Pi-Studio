/**
 * Contenu éditorial du site, centralisé ici pour être corrigé facilement.
 * Sources : profils publics de Paul Yves Ettien (TikTok, Instagram, Facebook) et presse ivoirienne,
 * relevés en octobre 2026. Tout ce qui est marqué « À CONFIRMER » doit être validé avec le studio.
 */

export const NAV_LINKS = [
  { href: "/studio", label: "Le Studio" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/contact", label: "Contact" },
];

export const CONTACT = {
  email: "paulettienprod@gmail.com",
  // À CONFIRMER : numéro trouvé dans un résultat de recherche, pas sur un profil officiel.
  phone: "+225 07 78 35 50 99",
  whatsapp: "https://wa.me/2250778355099",
  city: "Abidjan — Côte d'Ivoire",
};

/** Date de dernière mise à jour des mentions légales et de la politique de confidentialité. */
export const LEGAL_UPDATED = "7 octobre 2026";

export const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
];

/** Année du copyright, figée au build (Next refuse `new Date()` dans une page pré-générée). */
export const COPYRIGHT_YEAR = 2026;

export const SOCIALS = [
  { label: "TikTok", href: "https://www.tiktok.com/@paulyvesettien" },
  { label: "Instagram", href: "https://www.instagram.com/paulyvesheytien/" },
  { label: "Facebook", href: "https://www.facebook.com/PaulYvesHeyTien/" },
  { label: "X", href: "https://x.com/paulyvesettien" },
];

/** Chiffres clés. Audience cumulée : TikTok 2,9 M + Instagram 446 K + Facebook 1 M+. */
export const STATS = [
  { value: 4, suffix: "M+", label: "Abonnés cumulés", detail: "TikTok, Instagram, Facebook" },
  { value: 36, suffix: "M+", label: "J'aime sur TikTok", detail: "Une audience qui réagit" },
  { value: 2013, from: 2000, suffix: "", label: "Premières images", detail: "Tournées au smartphone" },
  { value: 3, suffix: "", label: "Prix & nomination", detail: "ADICOM, NISA, KORA" },
];

/**
 * Offre du studio. Les livrables décrivent une offre type de société de production :
 * À CONFIRMER avec le studio (ce qu'il propose réellement, en interne ou avec des partenaires).
 */
export const SERVICES = [
  {
    title: "Publicité & brand content",
    description: "Spots, campagnes et films de marque, de l'écriture à la diffusion.",
    pitch:
      "Une marque se retient quand elle raconte quelque chose. On imagine le concept, on écrit, on tourne et on livre des formats prêts pour la télé, le web et les réseaux.",
    deliverables: ["Concept & script", "Spot TV / web", "Déclinaisons formats courts", "Film de marque"],
  },
  {
    title: "Clips musicaux",
    description: "Une mise en image à la hauteur du morceau, pensée pour les plateformes.",
    pitch:
      "Un clip doit donner envie de réécouter. On construit un univers visuel autour de l'artiste, du traitement de l'image jusqu'aux extraits verticaux pour la promo.",
    deliverables: ["Direction artistique", "Tournage & réalisation", "Étalonnage", "Extraits pour la promo"],
  },
  {
    title: "Fiction",
    description: "Courts-métrages et séries web qui racontent les réalités d'ici.",
    pitch:
      "C'est l'ADN du studio, récompensé au NISA 2022. Des histoires ancrées dans le quotidien ivoirien, écrites pour toucher et faire réfléchir.",
    deliverables: ["Écriture & développement", "Casting", "Tournage", "Post-production complète"],
  },
  {
    title: "Contenus réseaux sociaux",
    description: "Formats courts et campagnes d'influence, produits et diffusés auprès d'une audience de millions.",
    pitch:
      "Notre différence : on ne fait pas que produire, on sait ce qui fonctionne en ligne et on peut le diffuser auprès d'une communauté de plus de 4 millions d'abonnés.",
    deliverables: ["Formats verticaux", "Séries de sketchs", "Campagnes d'influence", "Diffusion sur nos réseaux"],
  },
];

/** Les étapes d'une production, de la prise de contact à la mise en ligne. */
export const PROCESS = [
  { title: "Brief", detail: "On écoute votre besoin, votre cible, votre budget et vos délais." },
  { title: "Écriture", detail: "Concept, script et intentions de réalisation, validés avec vous." },
  { title: "Tournage", detail: "Préparation, casting, repérages, puis le plateau." },
  { title: "Post-production", detail: "Montage, étalonnage, son et sous-titres." },
  { title: "Diffusion", detail: "Livraison dans tous les formats, et diffusion sur nos réseaux si vous le souhaitez." },
];

export const DISTINCTIONS = [
  { year: 2022, title: "ADICOM Awards", detail: "Lauréat — Concept, Fiction & Humour" },
  { year: 2022, title: "NISA", detail: "Prix de la meilleure fiction — « Réseau Social »" },
  { year: 2024, title: "KORA Awards", detail: "Nomination — Meilleur humoriste web africain" },
];
