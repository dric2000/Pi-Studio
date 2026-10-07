"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const FPS = 25;

function format(ms: number) {
  const totalFrames = Math.floor((ms / 1000) * FPS);
  const frames = totalFrames % FPS;
  const seconds = Math.floor(totalFrames / FPS);
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60, frames]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

/** Timecode qui défile (HH:MM:SS:FF à 25 i/s), écrit directement dans le DOM pour éviter 25 rendus React par seconde. */
export function Timecode({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      if (ref.current) ref.current.textContent = format(now - start);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span ref={ref} aria-hidden className={cn("label-mono tabular-nums", className)}>
      00:00:00:00
    </span>
  );
}
