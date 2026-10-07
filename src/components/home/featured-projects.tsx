import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/studio/project-card";
import { SceneLabel } from "@/components/studio/scene-label";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/content/projects";

const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);

export function FeaturedProjects() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
        <SceneLabel number={4} title="Réalisations" />
        <h2 className="mt-8 font-serif text-5xl leading-none md:text-7xl">
          À l&apos;<em>affiche.</em>
        </h2>

        {/* Décalage vertical d'une carte sur deux, comme des affiches accrochées. */}
        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1} className={i % 2 === 1 ? "lg:mt-24" : undefined}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex justify-center">
          <Button size="xl" variant="outline" nativeButton={false} render={<Link href="/realisations" />}>
            Toutes les réalisations <ArrowUpRight />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
