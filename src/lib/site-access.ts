/**
 * Accès privé au site (démo) : actif seulement si la variable d'environnement SITE_PASSWORD est définie.
 * Le cookie contient une empreinte SHA-256 du mot de passe, jamais le mot de passe lui-même.
 * Changer le mot de passe invalide donc automatiquement tous les accès déjà accordés.
 */

export const ACCESS_COOKIE = "pi_access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

export function getSitePassword() {
  return process.env.SITE_PASSWORD || undefined;
}

export async function accessToken(password: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`pi-studio:${password}`));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** Chemin de retour après connexion : uniquement un chemin interne (pas de redirection vers un autre site). */
export function safeReturnPath(value: unknown) {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}
