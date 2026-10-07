"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HeroVideo } from "@/components/home/hero-video";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { useLoaderDone } from "@/components/site/page-loader";
import { RecIndicator } from "@/components/studio/rec-indicator";
import { Timecode } from "@/components/studio/timecode";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const play = useLoaderDone();
  const reduceMotion = useReducedMotion();

  // En quittant le hero : la vidéo zoome doucement, le texte s'efface en remontant.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -120]);

  return (
    <section ref={ref} className="relative h-svh min-h-[40rem] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <HeroVideo />
      </motion.div>

      {/* Voiles pour la lisibilité du texte blanc */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
      <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-background/70 to-transparent md:block" />

      <motion.div
        className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-8 sm:px-8"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <Reveal play={play}>
          <p className="label-mono text-muted-foreground">
            <span className="text-foreground">SC. 00</span> — Studio de production · Abidjan
          </p>
        </Reveal>

        <RevealLines
          as="h1"
          play={play}
          delay={0.1}
          className="mt-6 font-serif text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] tracking-tight"
          lines={[
            "On fait tourner",
            <em key="h" className="text-muted-foreground">
              les histoires.
            </em>,
          ]}
        />

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal play={play} delay={0.45} className="max-w-md text-base leading-relaxed text-muted-foreground">
            Publicités, clips, fiction et contenus pour les réseaux sociaux. De l&apos;idée à l&apos;écran, π Studio
            produit des images qui restent.
          </Reveal>
          <Reveal play={play} delay={0.6} className="flex flex-col gap-3 sm:flex-row">
            <Button size="xl" nativeButton={false} render={<Link href="/contact" />}>
              Lancer un projet <ArrowUpRight />
            </Button>
            <Button size="xl" variant="outline" nativeButton={false} render={<Link href="/realisations" />}>
              Nos réalisations
            </Button>
          </Reveal>
        </div>

        <Reveal
          play={play}
          delay={0.8}
          className="mt-14 flex items-center justify-between border-t border-border pt-5 text-muted-foreground"
        >
          <div className="flex items-center gap-6">
            <RecIndicator className="text-foreground" />
            <Timecode className="hidden sm:inline" />
          </div>
          <span className="label-mono flex items-center gap-2">
            Défiler <ArrowDown className="size-3 motion-safe:animate-bounce" />
          </span>
          <span className="label-mono hidden md:inline">Abidjan — Côte d&apos;Ivoire</span>
        </Reveal>
      </motion.div>
    </section>
  );
}
