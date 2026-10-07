import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  /** Durée d'un tour complet, en secondes. */
  duration?: number;
};

/** Bandeau défilant en continu (logos clients, distinctions). Le contenu est doublé pour boucler sans saut. */
export function Marquee({ items, className, duration = 30 }: MarqueeProps) {
  return (
    <div className={cn("flex overflow-hidden mask-x-from-90% mask-x-to-100%", className)}>
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center motion-safe:animate-[marquee_var(--duration)_linear_infinite]"
          style={{ "--duration": `${duration}s` } as CSSProperties}
        >
          {items.map((item) => (
            <li key={item} className="flex items-center gap-12 pr-12 font-serif text-4xl whitespace-nowrap md:text-6xl">
              {item}
              <span aria-hidden className="font-serif text-2xl text-muted-foreground italic">
                π
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
