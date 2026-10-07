import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/studio/marquee";
import { SceneLabel } from "@/components/studio/scene-label";
import { DISTINCTIONS } from "@/content/site";

export function Distinctions() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SceneLabel number={5} title="Distinctions" />
      </div>

      <Marquee items={DISTINCTIONS.map((d) => `${d.title} ${d.year}`)} className="mt-14" duration={35} />

      <ul className="mx-auto mt-14 grid max-w-7xl gap-px px-4 sm:px-8 md:grid-cols-3">
        {DISTINCTIONS.map((distinction, i) => (
          <li key={distinction.title}>
            <Reveal delay={i * 0.08} className="border-t border-border pt-5">
              <p className="label-mono text-muted-foreground">{distinction.year}</p>
              <p className="mt-3 font-serif text-3xl">{distinction.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{distinction.detail}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
