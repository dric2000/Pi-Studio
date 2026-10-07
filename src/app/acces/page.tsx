import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { AccessForm } from "@/app/acces/access-form";

export const metadata: Metadata = {
  title: "Accès privé",
  robots: { index: false, follow: false },
};

/** Page d'accès à la démo. Plein écran, elle recouvre l'en-tête et le pied de page du site. */
export default function AccessPage() {
  return (
    <main className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-background px-4">
      <Image
        src="/media/brand/logo-mark.png"
        alt="π Studio"
        width={597}
        height={593}
        loading="eager"
        className="h-32 w-auto md:h-40"
      />
      <p className="label-mono mt-6">Studio</p>
      <h1 className="mt-12 text-center font-serif text-4xl md:text-5xl">
        Accès <em className="text-muted-foreground">privé.</em>
      </h1>
      <p className="mt-4 max-w-sm text-center text-sm text-muted-foreground">
        Ce site est une maquette en cours de présentation. Saisissez le mot de passe qui vous a été communiqué.
      </p>
      <div className="mt-10 flex w-full justify-center">
        <Suspense>
          <AccessForm />
        </Suspense>
      </div>
    </main>
  );
}
