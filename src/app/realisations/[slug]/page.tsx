import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CurtainReveal, Reveal, RevealLines } from "@/components/motion/reveal";
import { ProjectVideo } from "@/components/projects/project-video";
import { Button } from "@/components/ui/button";
import { PROJECTS, getNextProject, getProject } from "@/content/projects";

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/realisations/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

/**
 * La lecture des paramètres d'URL se fait sous <Suspense> : la navigation reste instantanée
 * (toutes les fiches sont pré-générées, le fond noir d'attente n'apparaît quasiment jamais).
 */
export default function ProjectPage({ params }: PageProps<"/realisations/[slug]">) {
  return (
    <Suspense fallback={<main className="min-h-svh" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: Pick<PageProps<"/realisations/[slug]">, "params">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const credits = [
    ["Client", project.client],
    ["Réalisation", project.director],
    ["Année", project.year ? String(project.year) : "—"],
    ["Format", project.format],
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-32 pb-24 sm:px-8 md:pt-40">
      <Reveal>
        <Link
          href="/realisations"
          className="label-mono inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3" /> Réalisations
        </Link>
      </Reveal>

      <header className="mt-12">
        <Reveal>
          <p className="label-mono text-muted-foreground">
            <span className="text-foreground">{project.category}</span> — {project.format}
          </p>
        </Reveal>
        <RevealLines
          as="h1"
          className="mt-6 max-w-5xl font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight"
          lines={[project.title]}
        />
        <Reveal delay={0.2}>
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-6 md:grid-cols-4">
            {credits.map(([label, value]) => (
              <div key={label}>
                <dt className="label-mono text-muted-foreground">{label}</dt>
                <dd className="mt-2">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      <Reveal delay={0.3} className="mt-16">
        {project.video ? (
          <ProjectVideo video={project.video} title={project.title} />
        ) : (
          <figure>
            <CurtainReveal className="aspect-video">
              <Image
                src={project.image}
                alt={project.title}
                fill
                preload
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover grayscale"
              />
            </CurtainReveal>
            {project.placeholder && (
              <figcaption className="label-mono mt-3 text-muted-foreground">
                Visuel provisoire — vidéo du projet à venir
              </figcaption>
            )}
          </figure>
        )}
      </Reveal>

      <section className="mt-24 grid gap-10 border-t border-border pt-10 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <h2 className="label-mono text-muted-foreground">Le projet</h2>
          {project.award && (
            <p className="mt-6 border border-border p-4 text-sm">
              <span className="label-mono block text-muted-foreground">Distinction</span>
              <span className="mt-2 block font-serif text-xl">{project.award}</span>
            </p>
          )}
        </Reveal>
        <Reveal delay={0.1} className="space-y-6">
          <p className="font-serif text-3xl leading-snug md:text-4xl">{project.summary}</p>
          {project.description.map((paragraph) => (
            <p key={paragraph} className="max-w-2xl leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </section>

      {/* Projet suivant : grande ligne cliquable, l'image apparaît au survol. */}
      <Link
        href={`/realisations/${next.slug}`}
        className="group relative mt-32 block overflow-hidden border-y border-border py-12 md:py-16"
      >
        <Image
          src={next.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-0 grayscale transition-opacity duration-700 group-hover:opacity-30"
        />
        <span className="label-mono relative text-muted-foreground">Projet suivant</span>
        <span className="relative mt-4 flex items-center justify-between gap-6">
          <span className="font-serif text-5xl leading-none md:text-8xl">{next.title}</span>
          <ArrowRight className="size-8 shrink-0 transition-transform duration-500 group-hover:translate-x-2 md:size-12" />
        </span>
      </Link>

      <Reveal className="mt-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <p className="font-serif text-3xl md:text-4xl">
          Un projet dans cette veine ? <em className="text-muted-foreground">Parlons-en.</em>
        </p>
        <Button size="xl" nativeButton={false} render={<Link href="/contact" />}>
          Lancer un projet <ArrowUpRight />
        </Button>
      </Reveal>
    </main>
  );
}
