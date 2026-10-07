"use server";

import { CONTACT } from "@/content/site";
import { contactSchema, formatBrief, type ContactInput } from "@/lib/contact";

export type ContactResult =
  | { status: "sent" }
  /** Aucun service d'envoi configuré : rien n'est parti, le visiteur doit passer par mail ou WhatsApp. */
  | { status: "demo" }
  | { status: "invalid" }
  | { status: "error" };

/**
 * Envoi du brief via l'API Resend (https://resend.com). Variables d'environnement :
 *   RESEND_API_KEY      clé API (sans elle : mode démonstration, aucun envoi)
 *   CONTACT_TO_EMAIL    destinataire (par défaut l'email public du studio)
 *   CONTACT_FROM_EMAIL  expéditeur vérifié chez Resend (par défaut l'adresse de test Resend)
 */
export async function sendContactRequest(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { status: "invalid" };

  const data = parsed.data;
  // Champ piège rempli : on répond comme si tout allait bien, sans rien envoyer.
  if (data.website) return { status: "sent" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { status: "demo" };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "π Studio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? CONTACT.email],
        reply_to: data.email,
        subject: `Nouveau projet — ${data.projectType} — ${data.name}`,
        text: formatBrief(data),
      }),
    });
    if (!response.ok) {
      console.error("Resend :", response.status, await response.text());
      return { status: "error" };
    }
    return { status: "sent" };
  } catch (error) {
    console.error("Resend :", error);
    return { status: "error" };
  }
}
