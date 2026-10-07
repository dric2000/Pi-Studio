import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { SceneLabel } from "@/components/studio/scene-label";
import { STATS } from "@/content/site";

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
      <SceneLabel number={1} title="En chiffres" />
      <dl className="mt-12 grid grid-cols-2 border-t border-l border-border lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="border-r border-b border-border p-5 sm:p-8">
            <dt className="label-mono text-muted-foreground">{stat.label}</dt>
            <dd className="mt-6">
              <Counter
                value={stat.value}
                from={stat.from}
                suffix={stat.suffix}
                className="font-serif text-6xl leading-none tabular-nums sm:text-7xl md:text-8xl"
              />
              <p className="mt-4 text-sm text-muted-foreground">{stat.detail}</p>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
