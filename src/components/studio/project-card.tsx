import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Pick<Project, "title" | "category" | "client" | "director" | "year" | "image" | "placeholder"> & {
    slug?: string;
  };
  className?: string;
};

/** Fiche projet présentée comme un générique : visuel, titre en serif, crédits en mono. */
export function ProjectCard({ project, className }: ProjectCardProps) {
  const credits = [
    ["Client", project.client],
    ["Réalisation", project.director],
    ["Année", project.year ? String(project.year) : "—"],
  ];

  const content = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden bg-card">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-80 grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
        />
        <span className="label-mono absolute top-4 left-4 bg-background/70 px-2 py-1 backdrop-blur-sm">
          {project.category}
        </span>
        {project.placeholder && (
          <span className="label-mono absolute right-4 bottom-4 text-[0.625rem] text-foreground/70">
            Visuel provisoire
          </span>
        )}
      </div>
      <h3 className="mt-5 font-serif text-3xl">{project.title}</h3>
      <dl className="mt-3 grid grid-cols-3 gap-4 border-t border-border pt-3">
        {credits.map(([label, value]) => (
          <div key={label}>
            <dt className="label-mono text-muted-foreground">{label}</dt>
            <dd className="mt-1 text-sm">{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );

  return (
    <article className={cn("group", className)}>
      {project.slug ? (
        <Link href={`/realisations/${project.slug}`} className="block">
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
}
