import Link from "next/link";
import { PiMark } from "@/components/studio/pi-mark";
import { CONTACT, COPYRIGHT_YEAR, LEGAL_LINKS, NAV_LINKS, SOCIALS } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-10 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <PiMark className="text-base" />
          <p className="mt-6 max-w-xs text-sm text-muted-foreground">
            Studio de production audiovisuelle. Publicités, clips, fiction et contenus pour les réseaux sociaux.
          </p>
        </div>

        <nav aria-label="Plan du site">
          <p className="label-mono text-muted-foreground">Plan</p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm transition-opacity hover:opacity-60">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label-mono text-muted-foreground">Suivre</p>
          <ul className="mt-4 space-y-2">
            {SOCIALS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm transition-opacity hover:opacity-60">
                  {label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Wordmark géant en bas de page, coupé par le bord comme un générique de fin. */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.18em] text-center font-serif text-[23vw] leading-none whitespace-nowrap text-foreground/[0.06] italic select-none"
      >
        π studio
      </p>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-2 border-t border-border px-4 py-6 text-muted-foreground sm:flex-row sm:justify-between sm:px-8">
        <span className="label-mono">© {COPYRIGHT_YEAR} π Studio — {CONTACT.city}</span>
        <ul className="flex gap-6">
          {LEGAL_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="label-mono transition-colors hover:text-foreground">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
