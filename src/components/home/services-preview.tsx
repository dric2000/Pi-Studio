import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SceneLabel } from "@/components/studio/scene-label";
import { SERVICES } from "@/content/site";

/** Services en liste façon générique : au survol, la ligne s'inverse (blanc sur noir → noir sur blanc). */
export function ServicesPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SceneLabel number={3} title="Services" />
          <h2 className="mt-8 font-serif text-5xl leading-none md:text-7xl">
            Ce que l&apos;on <em>fabrique.</em>
          </h2>
        </div>
        <Link href="/services" className="label-mono text-muted-foreground transition-colors hover:text-foreground">
          Tous les services →
        </Link>
      </div>

      <ul className="mt-14 border-t border-border">
        {SERVICES.map((service, i) => (
          <li key={service.title}>
            <Reveal delay={i * 0.06}>
              <Link
                href="/services"
                className="group relative grid items-center gap-2 border-b border-border px-2 py-7 transition-colors duration-500 hover:bg-foreground hover:text-background md:grid-cols-[5rem_1fr_1fr_2rem] md:gap-8 md:px-4 md:py-9"
              >
                <span className="label-mono text-muted-foreground group-hover:text-background/60">
                  0{i + 1}
                </span>
                <span className="font-serif text-3xl md:text-5xl">{service.title}</span>
                <span className="max-w-sm text-sm text-muted-foreground group-hover:text-background/70">
                  {service.description}
                </span>
                <ArrowUpRight className="hidden size-6 transition-transform duration-500 group-hover:rotate-45 md:block" />
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
