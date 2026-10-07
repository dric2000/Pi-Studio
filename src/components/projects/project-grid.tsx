"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { EASE_CINEMA } from "@/components/motion/ease";
import { ProjectCard } from "@/components/studio/project-card";
import { CATEGORIES, type Category, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const ALL = "Tout";
type Filter = Category | typeof ALL;

/** Grille filtrable : seules les catégories qui ont au moins un projet apparaissent dans les filtres. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>(ALL);

  const filters: { label: Filter; count: number }[] = [
    { label: ALL, count: projects.length },
    ...CATEGORIES.map((category) => ({
      label: category,
      count: projects.filter((project) => project.category === category).length,
    })).filter(({ count }) => count > 0),
  ];
  const visible = filter === ALL ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2 border-b border-border pb-8">
        {filters.map(({ label, count }) => (
          <button
            key={label}
            type="button"
            aria-pressed={filter === label}
            onClick={() => setFilter(label)}
            className={cn(
              "inline-flex h-10 items-center gap-2 border px-4 text-sm transition-colors duration-300",
              filter === label
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
            )}
          >
            {label}
            <span className="label-mono text-[0.625rem] opacity-60">{String(count).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout={!reduceMotion}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: EASE_CINEMA }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
