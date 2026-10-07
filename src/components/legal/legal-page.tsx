import type { ReactNode } from "react";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { SceneLabel } from "@/components/studio/scene-label";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  label: string;
  title: ReactNode[];
  updated: string;
  intro?: ReactNode;
  sections: LegalSection[];
};

/** Information que seul le studio peut fournir : affichée telle quelle pour ne rien inventer. */
export function ToComplete({ children }: { children: ReactNode }) {
  return (
    <span className="border border-dashed border-foreground/40 px-1.5 py-0.5 text-foreground">
      <span className="label-mono mr-1.5 text-[0.625rem] text-muted-foreground">À compléter</span>
      {children}
    </span>
  );
}

/** Gabarit des pages légales : sommaire fixe à gauche sur ordinateur, sections numérotées. */
export function LegalPage({ label, title, updated, intro, sections }: LegalPageProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-36 pb-24 sm:px-8 md:pt-44 md:pb-32">
      <Reveal>
        <SceneLabel number={1} title={label} />
      </Reveal>
      <RevealLines
        as="h1"
        className="mt-8 font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight"
        lines={title}
      />
      <Reveal delay={0.2}>
        <p className="label-mono mt-8 text-muted-foreground">Dernière mise à jour : {updated}</p>
      </Reveal>

      <div className="mt-16 grid gap-12 border-t border-border pt-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
        <nav aria-label="Sommaire" className="lg:sticky lg:top-28 lg:self-start">
          <p className="label-mono text-muted-foreground">Sommaire</p>
          <ol className="mt-4 space-y-2">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="label-mono pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-3xl">
          {intro && <div className="mb-14 font-serif text-2xl leading-snug md:text-3xl">{intro}</div>}
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-border py-10 first:pt-0">
              <h2 className="flex items-baseline gap-4 font-serif text-3xl md:text-4xl">
                <span className="label-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_a:hover]:decoration-foreground [&_li]:pl-1 [&_strong]:font-normal [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
