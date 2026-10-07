"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_CINEMA } from "@/components/motion/ease";

type CounterProps = {
  value: number;
  from?: number;
  suffix?: string;
  className?: string;
};

/** Nombre qui défile jusqu'à sa valeur à l'entrée dans l'écran. Le HTML contient la valeur finale (SEO, sans JS). */
export function Counter({ value, from = 0, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion) return;
    if (!inView) {
      node.textContent = `${from}${suffix}`;
      return;
    }
    const controls = animate(from, value, {
      duration: 2,
      ease: EASE_CINEMA,
      onUpdate: (latest) => (node.textContent = `${Math.round(latest)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, from, value, suffix, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
