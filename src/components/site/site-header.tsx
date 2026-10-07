"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PiMark } from "@/components/studio/pi-mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/content/site";
import { cn } from "@/lib/utils";

/** En-tête fixe en mode « différence » : reste lisible sur fond noir comme sur image claire. */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link href="/" aria-label="π Studio — accueil" className="text-sm">
          <PiMark />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              className={cn(
                "label-mono relative py-1 transition-opacity hover:opacity-100",
                pathname.startsWith(href) ? "opacity-100" : "opacity-60",
                "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="label-mono md:hidden">Menu</SheetTrigger>
          <SheetContent side="right" className="w-full border-l-0 bg-background px-6 pt-24 sm:max-w-none">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav aria-label="Navigation mobile" className="flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label }, i) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-border py-4 font-serif text-5xl"
                >
                  <span className="label-mono text-muted-foreground">0{i + 1}</span>
                  {label}
                </Link>
              ))}
            </nav>
            <Button
              size="xl"
              className="mt-8 w-full"
              nativeButton={false}
              render={<Link href="/contact" onClick={() => setOpen(false)} />}
            >
              Lancer un projet
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
