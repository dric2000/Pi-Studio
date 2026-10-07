import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { SceneLabel } from "@/components/studio/scene-label";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/content/site";

/** Appel final : « Un projet en tête ? » en très grand, puis les trois façons de nous joindre. */
export function ContactCta({ scene = 6 }: { scene?: number }) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-40">
        <SceneLabel number={scene} title="Contact" />
        <RevealLines
          className="mt-10 font-serif text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] tracking-tight"
          lines={["Un projet", <em key="t">en tête ?</em>]}
        />

        <Reveal delay={0.2} className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-md text-lg text-muted-foreground">
            Racontez-nous votre idée, votre budget et vos délais : on s&apos;occupe du reste.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="xl" nativeButton={false} render={<Link href="/contact" />}>
              Lancer un projet <ArrowUpRight />
            </Button>
            <Button
              size="xl"
              variant="outline"
              nativeButton={false}
              render={<a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" />}
            >
              WhatsApp
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-10">
          <a
            href={`mailto:${CONTACT.email}`}
            className="font-serif text-2xl text-muted-foreground underline decoration-border underline-offset-8 transition-colors hover:text-foreground hover:decoration-foreground md:text-4xl"
          >
            {CONTACT.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
