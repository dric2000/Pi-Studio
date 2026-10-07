import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { CurtainReveal, Reveal, RevealLines } from "@/components/motion/reveal";
import { Marquee } from "@/components/studio/marquee";
import { ProjectCard } from "@/components/studio/project-card";
import type { Project } from "@/content/projects";
import { RecIndicator } from "@/components/studio/rec-indicator";
import { SceneLabel } from "@/components/studio/scene-label";
import { Timecode } from "@/components/studio/timecode";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false },
};

const COLORS = [
  { name: "Noir", value: "#000000", role: "Fond", className: "bg-background ring-1 ring-border" },
  { name: "Surface", value: "#0A0A0A", role: "Cartes, blocs", className: "bg-card ring-1 ring-border" },
  { name: "Filet", value: "Blanc 10 %", role: "Séparations", className: "bg-border" },
  { name: "Gris", value: "#A3A3A3", role: "Texte secondaire", className: "bg-muted-foreground" },
  { name: "Blanc", value: "#FFFFFF", role: "Texte, actions", className: "bg-foreground" },
];

// Données d'exemple : visuels provisoires, à remplacer par les vrais projets du studio.
const PROJECTS: Pick<Project, "title" | "category" | "client" | "director" | "year" | "image">[] = [
  {
    title: "Réseau Social",
    category: "Fiction",
    client: "π Studio",
    director: "P. Y. Ettien",
    year: 2022,
    image: "/media/images/studio-operateur-camera.jpg",
  },
  {
    title: "Campagne de marque",
    category: "Publicité",
    client: "Exemple",
    director: "P. Y. Ettien",
    year: 2025,
    image: "/media/images/portrait-costume.jpg",
  },
  {
    title: "Soirée PYE",
    category: "Coulisses",
    client: "π Studio",
    director: "P. Y. Ettien",
    year: 2024,
    image: "/media/images/evenement-pye-communaute.jpg",
  },
];

const DISTINCTIONS = ["ADICOM Awards 2022", "NISA 2022 — Meilleure fiction", "KORA Awards 2024 — Nomination"];

export default function StyleguidePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-8">
      {/* En-tête */}
      <header className="mt-20 flex items-center justify-between border-b border-border py-6">
        <span className="label-mono text-muted-foreground">Styleguide</span>
        <div className="flex items-center gap-6 text-muted-foreground">
          <RecIndicator className="text-foreground" />
          <Timecode className="hidden sm:inline" />
        </div>
      </header>

      <section className="relative overflow-hidden py-24 md:py-36">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-10 font-serif text-[22rem] leading-none text-foreground/[0.04] italic select-none md:text-[36rem]"
        >
          π
        </span>
        <p className="label-mono text-muted-foreground">Direction artistique — v1</p>
        <RevealLines
          as="h1"
          className="mt-6 font-serif text-6xl leading-[0.95] tracking-tight sm:text-8xl md:text-9xl"
          lines={[
            "La salle",
            <em key="o" className="text-muted-foreground">
              obscure.
            </em>,
          ]}
        />
        <Reveal delay={0.3} className="mt-8 max-w-xl text-lg text-muted-foreground">
          Fond noir, lumière blanche, et rien d&apos;autre. Le noir &amp; blanc strict comme signature :
          celle d&apos;un studio de production exigeant.
        </Reveal>
      </section>

      {/* SC. 01 — Typographie */}
      <section className="border-t border-border py-20">
        <SceneLabel number={1} title="Typographie" />
        <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-10">
            <p className="font-serif text-7xl leading-none md:text-8xl">
              On fait tourner <em>les histoires.</em>
            </p>
            <h2 className="font-serif text-5xl">Titre de section — H2</h2>
            <h3 className="font-serif text-3xl">Titre de bloc — H3</h3>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Texte courant en Geist. Né en 2013 avec un simple smartphone, π Studio produit aujourd&apos;hui
              publicités, clips, courts-métrages et contenus pour les réseaux sociaux, entre Abidjan et le reste
              du continent.
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              <span className="label-mono">SC. 02 — Réalisations</span>
              <span className="label-mono text-muted-foreground">Client — Réalisation — Année</span>
              <Timecode />
            </div>
          </div>
          <dl className="space-y-6 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            {[
              ["Titres", "Instrument Serif", "font-serif text-2xl"],
              ["Texte", "Geist", "font-sans text-lg"],
              ["Étiquettes", "Geist Mono", "font-mono text-sm"],
            ].map(([role, font, cls]) => (
              <div key={role}>
                <dt className="label-mono text-muted-foreground">{role}</dt>
                <dd className={cls}>{font}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SC. 02 — Couleurs */}
      <section className="border-t border-border py-20">
        <SceneLabel number={2} title="Couleurs" />
        <ul className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {COLORS.map((color) => (
            <li key={color.name}>
              <div className={`aspect-square ${color.className}`} />
              <p className="mt-3 font-serif text-2xl">{color.name}</p>
              <p className="label-mono text-muted-foreground">{color.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{color.role}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* SC. 03 — Boutons */}
      <section className="border-t border-border py-20">
        <SceneLabel number={3} title="Boutons" />
        <p className="mt-6 max-w-xl text-muted-foreground">
          Pas de couleur d&apos;accent : au survol, le bouton s&apos;inverse.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button size="xl">
            Lancer un projet <ArrowUpRight />
          </Button>
          <Button size="xl" variant="outline">
            <Play /> Voir la showreel
          </Button>
          <Button variant="link" className="label-mono px-0">
            Toutes les réalisations →
          </Button>
        </div>
      </section>

      {/* SC. 04 — Image & mouvement */}
      <section className="border-t border-border py-20">
        <SceneLabel number={4} title="Image & mouvement" />
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-end">
          <CurtainReveal className="aspect-[4/5]">
            <Image
              src="/media/images/studio-operateur-camera.jpg"
              alt="Opérateur π Studio avec une caméra cinéma"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </CurtainReveal>
          <div>
            <RevealLines
              className="font-serif text-5xl leading-none md:text-6xl"
              lines={["Le rideau", "se lève,", <em key="i">l&apos;image respire.</em>]}
            />
            <Reveal delay={0.2} className="mt-6 max-w-md text-muted-foreground">
              Révélations lentes, titres qui glissent ligne par ligne, défilement fluide. Tout est désactivé si
              le visiteur a demandé à réduire les animations.
            </Reveal>
          </div>
        </div>

        <figure className="mt-20">
          <div className="relative aspect-video overflow-hidden bg-card">
            <video
              className="size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/media/videos/hero-bts-desktop.jpg"
            >
              <source src="/media/videos/hero-bts-desktop.webm" type="video/webm" />
              <source src="/media/videos/hero-bts-desktop.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-x-0 top-0 flex justify-between p-4">
              <RecIndicator />
              <Timecode />
            </div>
          </div>
          <figcaption className="label-mono mt-3 text-muted-foreground">
            Vidéo du hero — version ordinateur (fond flou), noir &amp; blanc
          </figcaption>
        </figure>
      </section>

      {/* SC. 05 — Fiches projet */}
      <section className="border-t border-border py-20">
        <SceneLabel number={5} title="Fiches projet" />
        <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SC. 06 — Bandeau */}
      <section className="border-t border-border py-20">
        <SceneLabel number={6} title="Bandeau défilant" />
        <Marquee items={DISTINCTIONS} className="mt-12" />
      </section>

    </main>
  );
}
