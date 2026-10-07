import type { Metadata } from "next";
import Image from "next/image";
import { ContactCta } from "@/components/home/contact-cta";
import { CurtainReveal, Reveal, RevealLines } from "@/components/motion/reveal";
import { Marquee } from "@/components/studio/marquee";
import { SceneLabel } from "@/components/studio/scene-label";
import { COLLABORATORS, PRESS, TIMELINE, VALUES } from "@/content/studio";

export const metadata: Metadata = {
  title: "Le Studio",
  description:
    "Fondé par Paul Yves Ettien, π Studio produit publicités, clips, fiction et contenus depuis Abidjan. Notre histoire, nos valeurs, notre équipe.",
};

export default function StudioPage() {
  return (
    <main>
      {/* Ouverture */}
      <section className="mx-auto max-w-7xl px-4 pt-36 pb-24 sm:px-8 md:pt-44 md:pb-32">
        <Reveal>
          <SceneLabel number={1} title="Le Studio" />
        </Reveal>
        <RevealLines
          as="h1"
          className="mt-8 font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-tight"
          lines={["Derrière", <em key="c" className="text-muted-foreground">la caméra.</em>]}
        />
        <Reveal delay={0.3} className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
          <p className="font-serif text-2xl leading-snug md:text-3xl">
            π Studio, c&apos;est la maison de production de Paul Yves Ettien : le créateur aux millions d&apos;abonnés
            devenu réalisateur.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Né à Abidjan, Paul Yves commence en 2013 avec un smartphone et un sens aigu de l&apos;observation. Ses
            sketchs sur le quotidien ivoirien font le tour de l&apos;Afrique de l&apos;Ouest. Pour aller plus loin,
            vers la fiction, la publicité et le clip, il fonde π Studio : une structure pour professionnaliser la
            production et faire grandir les talents qui l&apos;entourent.
          </p>
        </Reveal>
      </section>

      {/* Le nom */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-8 md:grid-cols-[auto_1fr] md:gap-20 md:py-32">
          <Reveal>
            <p aria-hidden className="font-serif text-[16rem] leading-[0.8] italic md:text-[22rem]">
              π
            </p>
          </Reveal>
          <div>
            <SceneLabel number={2} title="Le nom" />
            <RevealLines
              className="mt-8 font-serif text-5xl leading-[1.02] md:text-6xl"
              lines={["Trois initiales,", <em key="u" className="text-muted-foreground">une constante.</em>]}
            />
            <Reveal delay={0.2} className="mt-8 max-w-xl space-y-4 leading-relaxed text-muted-foreground">
              {/* À CONFIRMER : l'histoire du nom racontée par le studio. Seul fait public : « PYE STUDIO (π) ». */}
              <p>
                Le studio porte les initiales de son fondateur,{" "}
                <span className="label-mono whitespace-nowrap text-foreground">P · Y · E</span> pour Paul Yves Ettien, et leur symbole : π.
              </p>
              <p>
                Et π, c&apos;est aussi le nombre qui ne s&apos;arrête jamais : 3,14159… Une constante pour une ambition
                simple, continuer à raconter des histoires, sans fin.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
          <SceneLabel number={3} title="L'histoire" />
          <h2 className="mt-8 font-serif text-5xl leading-none md:text-7xl">
            Du smartphone <em>au plateau.</em>
          </h2>
          <ol className="mt-16 border-t border-border">
            {TIMELINE.map((step, i) => (
              <li key={step.year}>
                <Reveal
                  delay={i * 0.04}
                  className="grid gap-2 border-b border-border py-8 md:grid-cols-[10rem_16rem_1fr] md:items-baseline md:gap-8"
                >
                  <span className="font-serif text-5xl leading-none text-muted-foreground tabular-nums md:text-6xl">
                    {step.year}
                  </span>
                  <span className="font-serif text-2xl">{step.title}</span>
                  <span className="max-w-xl text-muted-foreground">{step.detail}</span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Valeurs */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
          <SceneLabel number={4} title="Ce qui nous guide" />
          <ul className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
            {VALUES.map((value, i) => (
              <li key={value.title} className="bg-background">
                <Reveal delay={i * 0.08} className="flex h-full flex-col p-8 md:p-10">
                  <span className="label-mono text-muted-foreground">0{i + 1}</span>
                  <p className="mt-12 font-serif text-4xl">{value.title}</p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{value.detail}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fondateur */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <figure>
            {/* À CONFIRMER : remplacer par un portrait officiel de Paul Yves Ettien. */}
            <CurtainReveal className="aspect-[4/5]">
              <Image
                src="/media/images/portrait-costume.jpg"
                alt="Portrait"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover grayscale"
              />
            </CurtainReveal>
            <figcaption className="label-mono mt-3 text-muted-foreground">Visuel provisoire</figcaption>
          </figure>
          <div className="flex flex-col justify-center">
            <SceneLabel number={5} title="Le fondateur" />
            <RevealLines
              className="mt-8 font-serif text-5xl leading-[1.02] md:text-7xl"
              lines={["Paul Yves", "Ettien"]}
            />
            <Reveal delay={0.2} className="mt-8 max-w-lg space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Créateur de contenu, comédien, scénariste et réalisateur. Ingénieur de formation, diplômé de
                l&apos;INP-HB, il a réuni en parallèle une communauté de plus de 4 millions d&apos;abonnés.
              </p>
              <p>
                Ses vidéos mêlent humour et regard sur la société. Ses courts-métrages prolongent ce regard :
                « Réseau Social » remporte le prix de la meilleure fiction au NISA 2022.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                ["2,9 M", "TikTok"],
                ["1 M+", "Facebook"],
                ["446 K", "Instagram"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-serif text-4xl">{value}</p>
                  <p className="label-mono mt-1 text-muted-foreground">{label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Collectif */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:items-end">
          <div>
            <SceneLabel number={6} title="Le collectif" />
            <h2 className="mt-8 font-serif text-5xl leading-none md:text-7xl">
              On ne tourne <em>jamais seul.</em>
            </h2>
            <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
              Comédiens, créateurs, techniciens : π Studio s&apos;entoure d&apos;une famille de talents, et fait
              tourner la caméra pour ceux qui arrivent.
            </p>
          </div>
          <figure>
            <CurtainReveal className="aspect-[3/2]">
              <Image
                src="/media/images/evenement-pye-communaute.jpg"
                alt="La communauté réunie lors d'un événement PYE"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover grayscale"
              />
            </CurtainReveal>
            <figcaption className="label-mono mt-3 text-muted-foreground">Soirée PYE</figcaption>
          </figure>
        </div>
        <p className="label-mono mx-auto mt-20 max-w-7xl px-4 text-muted-foreground sm:px-8">Ils ont tourné avec nous</p>
        <Marquee items={COLLABORATORS} className="mt-8" duration={40} />
      </section>

      {/* Presse */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
          <SceneLabel number={7} title="Ils en parlent" />
          <ul className="mt-12 border-t border-border">
            {PRESS.map((article) => (
              <li key={article.href}>
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-2 border-b border-border px-2 py-6 transition-colors duration-500 hover:bg-foreground hover:text-background md:grid-cols-[14rem_1fr_auto] md:items-center md:px-4"
                >
                  <span className="label-mono text-muted-foreground group-hover:text-background/60">
                    {article.outlet}
                  </span>
                  <span className="font-serif text-2xl md:text-3xl">{article.title}</span>
                  <span className="label-mono">Lire ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta scene={8} />
    </main>
  );
}
