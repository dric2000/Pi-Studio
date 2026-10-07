import type { Metadata } from "next";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { ProjectGrid } from "@/components/projects/project-grid";
import { SceneLabel } from "@/components/studio/scene-label";
import { PROJECTS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Publicités, clips, fiction, contenus pour les réseaux sociaux : les productions de π Studio.",
};

export default function RealisationsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-36 pb-24 sm:px-8 md:pt-44 md:pb-32">
      <Reveal>
        <SceneLabel number={1} title="Réalisations" />
      </Reveal>
      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <RevealLines
          as="h1"
          className="font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-tight"
          lines={["Ce qu'on a", <em key="t" className="text-muted-foreground">tourné.</em>]}
        />
        <Reveal delay={0.3} className="max-w-sm text-muted-foreground md:pb-4">
          Fiction, publicité, clips, réseaux sociaux : chaque projet commence par une histoire à raconter.
        </Reveal>
      </div>

      <Reveal delay={0.4} className="mt-16">
        <ProjectGrid projects={PROJECTS} />
      </Reveal>
    </main>
  );
}
