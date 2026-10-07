"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { sendContactRequest, type ContactResult } from "@/app/contact/actions";
import { EASE_CINEMA } from "@/components/motion/ease";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT } from "@/content/site";
import { BUDGETS, PROJECT_TYPES, TIMELINES, contactSchema, formatBrief, type ContactInput } from "@/lib/contact";
import { cn } from "@/lib/utils";

/** Champs soulignés, sans cadre : en erreur, le filet passe en blanc plein (pas de rouge, charte N&B). */
const FIELD_CLASS =
  "h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-lg shadow-none focus-visible:border-foreground focus-visible:ring-0 aria-invalid:border-foreground aria-invalid:ring-0 dark:bg-transparent dark:aria-invalid:border-foreground dark:aria-invalid:ring-0 md:text-lg";

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-foreground">
      ✕ {message}
    </p>
  );
}

type TextFieldProps = {
  id: keyof ContactInput;
  label: string;
  error?: string;
  optional?: boolean;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
};

function TextField({ id, label, error, optional, children }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="label-mono flex justify-between text-muted-foreground">
        {label}
        {optional && <span>Facultatif</span>}
      </label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": error ? `${id}-error` : undefined })}
      <ErrorMessage id={`${id}-error`} message={error} />
    </div>
  );
}

type ChoiceGroupProps = {
  legend: string;
  name: string;
  options: readonly string[];
  registration: UseFormRegisterReturn;
  error?: string;
};

/** Choix unique présenté en pastilles : de vrais boutons radio, masqués, pour le clavier et les lecteurs d'écran. */
function ChoiceGroup({ legend, name, options, registration, error }: ChoiceGroupProps) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="label-mono text-muted-foreground">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="relative">
            <input type="radio" value={option} className="peer sr-only" {...registration} />
            <span
              className={cn(
                "inline-flex h-10 cursor-pointer items-center border px-4 text-sm transition-colors duration-300",
                "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                "peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
                error && "border-foreground/60",
              )}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
      <ErrorMessage id={`${name}-error`} message={error} />
    </fieldset>
  );
}

/** Liens d'envoi direct avec le brief prérempli (mode démo, ou si l'envoi échoue). */
function DirectLinks({ data }: { data: ContactInput }) {
  const brief = formatBrief(data);
  const subject = `Nouveau projet — ${data.projectType} — ${data.name}`;
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
  const whatsapp = `${CONTACT.whatsapp}?text=${encodeURIComponent(brief)}`;

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button size="xl" nativeButton={false} render={<a href={mailto} />}>
        Envoyer par email <ArrowUpRight />
      </Button>
      <Button
        size="xl"
        variant="outline"
        nativeButton={false}
        render={<a href={whatsapp} target="_blank" rel="noopener noreferrer" />}
      >
        Envoyer sur WhatsApp
      </Button>
    </div>
  );
}

const RESULT_TEXT: Record<Exclude<ContactResult["status"], "invalid">, { title: ReactNode; body: string }> = {
  sent: {
    title: (
      <>
        Merci, <em>c&apos;est dans la boîte.</em>
      </>
    ),
    body: "Votre brief est bien arrivé. L'équipe revient vers vous très vite.",
  },
  demo: {
    title: (
      <>
        Presque <em>prêt.</em>
      </>
    ),
    body: "Ce site est en mode démonstration : votre message n'a pas encore été envoyé. Votre brief est prêt, envoyez-le directement :",
  },
  error: {
    title: (
      <>
        Un souci <em>technique.</em>
      </>
    ),
    body: "L'envoi a échoué. Votre brief n'est pas perdu : envoyez-le directement, il est déjà rédigé.",
  },
};

export function ContactForm() {
  const [result, setResult] = useState<{ status: ContactResult["status"]; data: ContactInput } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = handleSubmit(async (data) => {
    const response = await sendContactRequest(data).catch((): ContactResult => ({ status: "error" }));
    setResult({ status: response.status === "invalid" ? "error" : response.status, data });
  });

  const outcome = result && result.status !== "invalid" ? RESULT_TEXT[result.status] : null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {result && outcome ? (
        <motion.div
          key="result"
          role="status"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_CINEMA }}
          className="border-t border-border pt-10"
        >
          <p className="font-serif text-5xl leading-none md:text-6xl">{outcome.title}</p>
          <p className="mt-6 max-w-md text-muted-foreground">{outcome.body}</p>
          {result.status !== "sent" && <DirectLinks data={result.data} />}
          <button
            type="button"
            onClick={() => setResult(null)}
            className="label-mono mt-10 text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Modifier le brief
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={onSubmit}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="space-y-12"
        >
          <div className="grid gap-10 sm:grid-cols-2">
            <TextField id="name" label="Nom" error={errors.name?.message}>
              {(props) => <Input {...props} {...register("name")} autoComplete="name" className={FIELD_CLASS} />}
            </TextField>
            <TextField id="company" label="Structure" optional error={errors.company?.message}>
              {(props) => (
                <Input {...props} {...register("company")} autoComplete="organization" className={FIELD_CLASS} />
              )}
            </TextField>
            <TextField id="email" label="Email" error={errors.email?.message}>
              {(props) => (
                <Input {...props} {...register("email")} type="email" autoComplete="email" className={FIELD_CLASS} />
              )}
            </TextField>
            <TextField id="phone" label="Téléphone / WhatsApp" optional error={errors.phone?.message}>
              {(props) => (
                <Input {...props} {...register("phone")} type="tel" autoComplete="tel" className={FIELD_CLASS} />
              )}
            </TextField>
          </div>

          <ChoiceGroup
            legend="Type de projet"
            name="projectType"
            options={PROJECT_TYPES}
            registration={register("projectType")}
            error={errors.projectType?.message}
          />
          <ChoiceGroup
            legend="Budget"
            name="budget"
            options={BUDGETS}
            registration={register("budget")}
            error={errors.budget?.message}
          />
          <ChoiceGroup
            legend="Délai"
            name="timeline"
            options={TIMELINES}
            registration={register("timeline")}
            error={errors.timeline?.message}
          />

          <TextField id="message" label="Votre projet" error={errors.message?.message}>
            {(props) => (
              <Textarea
                {...props}
                {...register("message")}
                rows={5}
                placeholder="L'idée, le message à faire passer, les références qui vous parlent…"
                className={cn(FIELD_CLASS, "h-auto min-h-36 resize-y py-3 placeholder:text-muted-foreground/50")}
              />
            )}
          </TextField>

          {/* Champ piège pour les robots, invisible pour les visiteurs. */}
          <div aria-hidden className="absolute -left-[9999px]">
            <label htmlFor="website">Site web</label>
            <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-sm text-muted-foreground">
              Vos informations servent uniquement à répondre à votre demande.{" "}
              <Link href="/confidentialite" className="underline decoration-border underline-offset-4 hover:text-foreground">
                En savoir plus
              </Link>
            </p>
            <Button type="submit" size="xl" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Envoi <LoaderCircle className="animate-spin" />
                </>
              ) : (
                <>
                  Envoyer le brief <ArrowUpRight />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
