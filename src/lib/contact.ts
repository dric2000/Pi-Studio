import { z } from "zod";

/** Options du brief, partagées par le formulaire, la validation et le message envoyé. */
export const PROJECT_TYPES = ["Publicité", "Clip musical", "Fiction", "Réseaux sociaux", "Autre"] as const;
export const BUDGETS = [
  "Moins de 500 000 FCFA",
  "500 000 – 2 M FCFA",
  "2 – 5 M FCFA",
  "Plus de 5 M FCFA",
  "À définir ensemble",
] as const;
export const TIMELINES = ["Moins d'un mois", "1 à 3 mois", "Plus de 3 mois", "Pas encore fixé"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, { error: "Indiquez votre nom." }),
  email: z.email({ error: "Cette adresse email ne semble pas valide." }),
  phone: z.string().trim().max(30, { error: "Numéro trop long." }).optional(),
  company: z.string().trim().max(120).optional(),
  projectType: z.enum(PROJECT_TYPES, { error: "Choisissez un type de projet." }),
  budget: z.enum(BUDGETS, { error: "Choisissez une fourchette de budget." }),
  timeline: z.enum(TIMELINES, { error: "Choisissez un délai." }),
  message: z
    .string()
    .trim()
    .min(20, { error: "Dites-nous en un peu plus (20 caractères minimum)." })
    .max(3000, { error: "Message trop long (3 000 caractères maximum)." }),
  // Champ piège invisible : les robots le remplissent, les humains non.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Le brief en texte brut : corps de l'email, et message prérempli pour l'envoi par mail ou WhatsApp. */
export function formatBrief(data: ContactInput) {
  const contact = [
    `Nom : ${data.name}`,
    data.company && `Structure : ${data.company}`,
    `Email : ${data.email}`,
    data.phone && `Téléphone / WhatsApp : ${data.phone}`,
  ];
  const project = [`Budget : ${data.budget}`, `Délai : ${data.timeline}`];

  return [
    `Nouveau projet — ${data.projectType}`,
    contact.filter(Boolean).join("\n"),
    project.join("\n"),
    data.message,
  ].join("\n\n");
}
