import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-center overflow-hidden px-4 sm:px-8">
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 font-serif text-[30rem] leading-none text-foreground/[0.04] italic select-none md:text-[48rem]"
      >
        π
      </span>
      <p className="label-mono text-muted-foreground">
        <span className="text-foreground">Erreur 404</span> — Scène introuvable
      </p>
      <h1 className="mt-6 font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-tight">
        Coupez !<br />
        <em className="text-muted-foreground">Cette page n&apos;existe pas.</em>
      </h1>
      <p className="mt-8 max-w-md text-muted-foreground">
        Elle a peut-être été déplacée, ou n&apos;a jamais quitté la salle de montage.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button size="xl" nativeButton={false} render={<Link href="/" />}>
          Retour à l&apos;accueil
        </Button>
        <Button size="xl" variant="outline" nativeButton={false} render={<Link href="/realisations" />}>
          Nos réalisations <ArrowUpRight />
        </Button>
      </div>
    </main>
  );
}
