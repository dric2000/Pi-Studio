"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BASE = "/media/videos/hero-bts";
const DESKTOP_QUERY = "(min-width: 768px)";

/**
 * Décalages (s) des 3 colonnes desktop, identiques à `columns` dans scripts/process-media.mjs.
 * La même vidéo verticale est jouée 3 fois : un seul fichier téléchargé, 3 plans différents à l'écran.
 */
const COLUMN_OFFSETS = [0, 5, 10];

type ClipProps = {
  poster: string;
  offset?: number;
  play: boolean;
};

/** Poster affiché tout de suite, vidéo en fondu par-dessus dès qu'elle joue. */
function Clip({ poster, offset = 0, play }: ClipProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative size-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- poster plein cadre, déjà optimisé par le script média */}
      <img src={poster} alt="" className="size-full object-cover" fetchPriority="high" />
      {play && (
        <video
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-1000",
            playing ? "opacity-100" : "opacity-0",
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          onLoadedMetadata={(e) => {
            if (offset) e.currentTarget.currentTime = offset;
          }}
          onPlaying={() => setPlaying(true)}
        >
          <source src={`${BASE}-mobile.webm`} type="video/webm" />
          <source src={`${BASE}-mobile.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

/**
 * Vidéo de fond du hero : verticale plein écran sur mobile, 3 colonnes verticales côte à côte
 * sur ordinateur. Si l'utilisateur réduit les animations, seules les images fixes restent.
 */
export function HeroVideo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const canPlay = !reduceMotion && desktop !== null;

  return (
    <div className={cn("absolute inset-0", className)}>
      <div className="size-full md:hidden">
        <Clip poster={`${BASE}-mobile.jpg`} play={canPlay && !desktop} />
      </div>
      <div className="hidden size-full grid-cols-3 gap-px bg-border md:grid">
        {COLUMN_OFFSETS.map((offset, i) => (
          <Clip key={offset} poster={`${BASE}-col-${i}.jpg`} offset={offset} play={canPlay && !!desktop} />
        ))}
      </div>
    </div>
  );
}
