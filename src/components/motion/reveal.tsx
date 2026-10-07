"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_CINEMA } from "@/components/motion/ease";
import { useLoaderDone } from "@/components/site/page-loader";
import { cn } from "@/lib/utils";

/*
 * Animations réduites : aucune branche ici sur la préférence du visiteur (le rendu serveur ne la
 * connaît pas, d'où une erreur d'hydratation). C'est <MotionProvider> (MotionConfig reducedMotion="user")
 * qui neutralise les mouvements : les éléments apparaissent alors en fondu, sans déplacement.
 */

/**
 * Déclenchement : sur signal quand `play` est fourni, sinon à l'entrée dans l'écran — mais
 * jamais avant la levée du loader, pour que les éléments visibles dès l'arrivée s'animent devant le visiteur.
 */
function useTrigger(play: boolean | undefined, amount: number) {
  const loaderDone = useLoaderDone();
  if (play !== undefined) return { animate: play ? "visible" : "hidden" };
  if (!loaderDone) return { animate: "hidden" };
  return { whileInView: "visible", viewport: { once: true, amount } };
}

type RevealLinesProps = {
  /** Une entrée par ligne : chaque ligne glisse hors de son masque, comme au générique. */
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  play?: boolean;
};

export function RevealLines({ lines, as = "h2", className, delay = 0, play }: RevealLinesProps) {
  const MotionTag = motion[as];
  const trigger = useTrigger(play, 0.4);

  // La détection se fait sur le bloc entier : chaque ligne, cachée par son masque,
  // ne serait jamais considérée « visible » par l'IntersectionObserver.
  return (
    <MotionTag className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            data-reveal
            className="block"
            variants={{
              hidden: { y: "110%" },
              visible: { y: 0, transition: { duration: 1.1, ease: EASE_CINEMA, delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  play?: boolean;
};

/** Apparition douce (fondu + léger glissement) à l'entrée dans l'écran. */
export function Reveal({ children, className, delay = 0, play }: RevealProps) {
  const trigger = useTrigger(play, 0.3);

  return (
    <motion.div
      data-reveal
      className={className}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_CINEMA, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Média révélé par un rideau noir qui se lève, avec un lent dézoom. */
export function CurtainReveal({ children, className }: Omit<RevealProps, "delay" | "play">) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        data-reveal
        className="relative size-full"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.8, ease: EASE_CINEMA }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        data-reveal-curtain
        className="absolute inset-0 origin-top bg-background"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: EASE_CINEMA }}
      />
    </div>
  );
}
