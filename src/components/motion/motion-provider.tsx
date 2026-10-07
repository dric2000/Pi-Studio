"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Respecte le réglage « réduire les animations » du visiteur pour toutes les animations Motion :
 * transformations et déplacements deviennent instantanés, les fondus sont conservés.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
