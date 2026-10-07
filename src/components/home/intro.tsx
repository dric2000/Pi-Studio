import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CurtainReveal, Reveal, RevealLines } from "@/components/motion/reveal";
import { SceneLabel } from "@/components/studio/scene-label";
import { Button } from "@/components/ui/button";

/** Le studio en quelques lignes : manifeste, image, lien vers la page « Le Studio ». */
export function Intro() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-16 font-serif text-[28rem] leading-none text-foreground/[0.03] italic select-none md:text-[44rem]"
      >
        π
      </span>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div className="flex flex-col">
          <SceneLabel number={2} title="Le studio" />
          <RevealLines
            className="mt-10 font-serif text-5xl leading-[1.02] md:text-7xl"
            lines={["Né d'un smartphone,", "devenu studio.", <em key="e" className="text-muted-foreground">Même exigence.</em>]}
          />
          <Reveal delay={0.2} className="mt-10 max-w-lg space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Tout commence en 2013, à Abidjan, avec des sketchs tournés au téléphone. Des millions de vues plus
              tard, Paul Yves Ettien fonde π Studio pour professionnaliser la production et faire grandir les
              talents qui l&apos;entourent.
            </p>
            <p>
              Aujourd&apos;hui, le studio écrit, tourne et monte pour les marques, les artistes et l&apos;écran, avec
              un regard : raconter les réalités d&apos;ici, avec humour et précision.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <Button size="xl" variant="outline" nativeButton={false} render={<Link href="/studio" />}>
              Découvrir le studio <ArrowUpRight />
            </Button>
          </Reveal>
        </div>

        <figure className="lg:mt-24">
          <CurtainReveal className="aspect-[4/5]">
            <Image
              src="/media/images/studio-operateur-camera.jpg"
              alt="Membre de l'équipe π Studio préparant une caméra cinéma"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </CurtainReveal>
          <figcaption className="label-mono mt-3 flex justify-between text-muted-foreground">
            <span>Sur le plateau</span>
            <span>Abidjan</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
