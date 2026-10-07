import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { SceneLabel } from "@/components/studio/scene-label";
import { CONTACT, SOCIALS } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Un projet de publicité, de clip, de fiction ou de contenu ? Envoyez votre brief à π Studio.",
};

const STEPS = [
  { title: "Vous nous écrivez", detail: "Un brief, même court : l'idée, le budget, le délai." },
  { title: "On en parle", detail: "Un appel pour comprendre vos objectifs et poser les bonnes questions." },
  { title: "On vous propose", detail: "Une approche créative, un planning et un devis clairs." },
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-36 pb-24 sm:px-8 md:pt-44 md:pb-32">
      <Reveal>
        <SceneLabel number={1} title="Contact" />
      </Reveal>
      <RevealLines
        as="h1"
        className="mt-8 font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-tight"
        lines={["Parlons de", <em key="p" className="text-muted-foreground">votre projet.</em>]}
      />

      <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        <aside className="space-y-14">
          <Reveal className="space-y-6">
            <div>
              <p className="label-mono text-muted-foreground">Email</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-2 inline-block font-serif text-2xl break-all transition-opacity hover:opacity-60"
              >
                {CONTACT.email}
              </a>
            </div>
            <div>
              <p className="label-mono text-muted-foreground">WhatsApp</p>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-serif text-2xl transition-opacity hover:opacity-60"
              >
                {CONTACT.phone}
              </a>
            </div>
            <div>
              <p className="label-mono text-muted-foreground">Studio</p>
              <p className="mt-2 font-serif text-2xl">{CONTACT.city}</p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {SOCIALS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="label-mono text-muted-foreground">Comment ça se passe</p>
            <ol className="mt-6 border-t border-border">
              {STEPS.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[3rem_1fr] border-b border-border py-5">
                  <span className="label-mono pt-1.5 text-muted-foreground">0{i + 1}</span>
                  <div>
                    <p className="font-serif text-2xl">{step.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </aside>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </main>
  );
}
