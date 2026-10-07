import { FilmGrain } from "@/components/fx/film-grain";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const DESCRIPTION =
  "Studio de production audiovisuelle à Abidjan : publicités, clips, fiction et contenus pour les réseaux sociaux.";

export const metadata: Metadata = {
  // Adresse publique du site, nécessaire aux aperçus de partage (WhatsApp, réseaux sociaux).
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "π Studio - Studio de production à Abidjan",
    template: "%s - π Studio",
  },
  description: DESCRIPTION,
  openGraph: {
    siteName: "π Studio",
    locale: "fr_CI",
    type: "website",
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Sans JavaScript, les animations ne se lancent pas : on affiche directement leur état final. */}
        <noscript>
          <style>
            {
              "[data-reveal]{opacity:1!important;transform:none!important}[data-reveal-curtain]{display:none}"
            }
          </style>
        </noscript>
        <a
          href="#contenu"
          className="label-mono sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:bg-foreground focus:px-4 focus:py-3 focus:text-background"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <SmoothScroll />
          <SiteHeader />
          <div id="contenu" className="flex flex-1 flex-col">
            {children}
          </div>
          <SiteFooter />
        </MotionProvider>
        <FilmGrain />
      </body>
    </html>
  );
}
