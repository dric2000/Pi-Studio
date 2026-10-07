"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { EASE_CINEMA } from "@/components/motion/ease";

/** Durées minimales d'affichage : version complète au premier chargement, courte entre deux pages. */
const MIN_DURATION_FIRST = 1800;
const MIN_DURATION_NAV = 700;

/** Constante de temps du lissage de la progression (ms). */
const SMOOTHING_MS = 120;

const RING_RADIUS = 48;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

// Vit le temps de l'onglet : vaut false au premier chargement, true après (navigations côté client).
let hasLoadedOnce = false;

const LoaderContext = createContext(true);

/** true une fois le loader levé : les animations d'entrée de la page peuvent démarrer. */
export function useLoaderDone() {
  return useContext(LoaderContext);
}

function waitForPage() {
  const loaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
  return Promise.all([loaded, document.fonts.ready]);
}

export function PageLoader({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  // Progression : avance seule vers 90 % pendant l'attente, puis file à 100 % quand la page est prête.
  useEffect(() => {
    const firstLoad = !hasLoadedOnce;
    hasLoadedOnce = true;
    const start = performance.now();
    const minDuration = firstLoad ? MIN_DURATION_FIRST : MIN_DURATION_NAV;
    let ready = !firstLoad;
    let progress = 0;
    let last = start;
    let frame = 0;

    if (firstLoad) waitForPage().then(() => (ready = true));

    // Lissage basé sur le temps écoulé (et non sur le nombre d'images) : même durée sur un
    // téléphone lent que sur un ordinateur rapide.
    const tick = (now: number) => {
      const elapsed = now - start;
      const dt = now - last;
      last = now;
      const target = ready && elapsed >= minDuration ? 1 : Math.min(0.9, elapsed / minDuration);
      progress += (target - progress) * (1 - Math.exp(-dt / SMOOTHING_MS));
      if (target === 1 && progress > 0.99) progress = 1;

      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(RING_LENGTH * (1 - progress));
      if (counterRef.current) counterRef.current.textContent = String(Math.round(progress * 100)).padStart(3, "0");

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        // Les animations de la page démarrent pendant que le rideau se lève.
        setDone(true);
        setVisible(false);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Pas de défilement tant que le loader est affiché.
  useEffect(() => {
    if (!visible) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      root.style.overflow = "";
      lenis?.start();
    };
  }, [visible, lenis]);

  return (
    <LoaderContext.Provider value={done}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="loader"
            data-page-loader
            role="status"
            aria-label="Chargement"
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-background"
            exit={reduceMotion ? { opacity: 0 } : { y: "-100%" }}
            transition={{ duration: reduceMotion ? 0.3 : 1, ease: EASE_CINEMA }}
          >
            <motion.div
              className="relative grid size-[min(64vw,48svh)] place-items-center"
              exit={reduceMotion ? undefined : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE_CINEMA }}
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r={RING_RADIUS} fill="none" className="stroke-border" strokeWidth="0.3" />
                <circle
                  ref={ringRef}
                  cx="50"
                  cy="50"
                  r={RING_RADIUS}
                  fill="none"
                  className="stroke-foreground"
                  strokeWidth="0.4"
                  strokeDasharray={RING_LENGTH}
                  strokeDashoffset={RING_LENGTH}
                />
              </svg>
              <Image
                src="/media/brand/logo-mark.png"
                alt=""
                width={597}
                height={593}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 768px) 300px, 40vw"
                className="h-[54%] w-auto select-none"
              />
            </motion.div>
            <p aria-hidden className="label-mono absolute bottom-8 flex gap-3 text-muted-foreground">
              π Studio <span className="text-foreground tabular-nums" ref={counterRef}>000</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <noscript>
        <style>{"[data-page-loader]{display:none}"}</style>
      </noscript>
    </LoaderContext.Provider>
  );
}
