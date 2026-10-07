import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactCta } from "@/components/home/contact-cta";
import { Counter } from "@/components/motion/counter";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { SceneLabel } from "@/components/studio/scene-label";
import { PROCESS, SERVICES } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Publicité, clips musicaux, fiction et contenus pour les réseaux sociaux : π Studio écrit, tourne, monte et diffuse.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 pt-36 pb-16 sm:px-8 md:pt-44">
        <Reveal>
          <SceneLabel number={1} title="Services" />
        </Reveal>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <RevealLines
            as="h1"
            className="font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-tight"
            lines={["Ce que l'on", <em key="f" className="text-muted-foreground">fabrique.</em>]}
          />
          <Reveal delay={0.3} className="max-w-sm text-muted-foreground md:pb-4">
            De l&apos;idée à l&apos;écran : on écrit, on tourne, on monte et, si vous le voulez, on diffuse.
          </Reveal>
        </div>
      </section>

      {/* Les services, un par un : numéro et titre fixés à gauche pendant le défilement. */}
      <section className="mx-auto max-w-7xl px-4 sm:px-8">
        {SERVICES.map((service, i) => (
          <article
            key={service.title}
            className="grid gap-8 border-t border-border py-16 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-24"
          >
            <div className="md:sticky md:top-28 md:self-start">
              <Reveal>
                <span className="label-mono text-muted-foreground">0{i + 1} / 0{SERVICES.length}</span>
                <h2 className="mt-6 font-serif text-5xl leading-none md:text-6xl">{service.title}</h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="font-serif text-2xl leading-snug md:text-3xl">{service.pitch}</p>
              <p className="label-mono mt-10 text-muted-foreground">Livrables</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="border border-border px-4 py-2 text-sm">
                    {deliverable}
                  </li>
                ))}
              </ul>
              <Link
                href="/realisations"
                className="label-mono mt-10 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                Voir les réalisations <ArrowUpRight className="size-3" />
              </Link>
            </Reveal>
          </article>
        ))}
      </section>

      {/* Ce qui nous distingue : la production ET la diffusion. */}
      <section className="mt-16 bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:grid-cols-2 md:items-end md:py-32">
          <div>
            <p className="label-mono text-background/60">
              <span className="text-background">SC. 02</span> — Notre différence
            </p>
            <RevealLines
              className="mt-8 font-serif text-5xl leading-[1.02] md:text-7xl"
              lines={["Produire,", <em key="d">et diffuser.</em>]}
            />
            <Reveal delay={0.2} className="mt-8 max-w-md leading-relaxed text-background/70">
              Une société de production livre un film. π Studio peut aussi le faire voir : nos contenus parlent chaque
              jour à une communauté qui réagit, partage et commente.
            </Reveal>
          </div>
          <Reveal delay={0.2} className="md:text-right">
            <Counter value={4} suffix="M+" className="font-serif text-[clamp(7rem,20vw,16rem)] leading-none" />
            <p className="label-mono mt-2 text-background/60">Abonnés cumulés — TikTok, Instagram, Facebook</p>
          </Reveal>
        </div>
      </section>

      {/* Méthode */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
        <SceneLabel number={3} title="Notre méthode" />
        <h2 className="mt-8 font-serif text-5xl leading-none md:text-7xl">
          Cinq étapes, <em>zéro surprise.</em>
        </h2>
        <ol className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((step, i) => (
            <li key={step.title} className="bg-background">
              <Reveal delay={i * 0.08} className="flex h-full flex-col p-6 md:p-8">
                <span className="font-serif text-6xl leading-none text-muted-foreground">{i + 1}</span>
                <p className="mt-10 font-serif text-2xl">{step.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <ContactCta scene={4} />
    </main>
  );
}
