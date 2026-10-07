"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/** Défilement fluide de la page entière, désactivé si l'utilisateur réduit les animations. */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  // anchors : les liens « #section » défilent en douceur (arrêt réglé par le scroll-margin-top de la cible).
  return <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 0.9, anchors: true }} />;
}
