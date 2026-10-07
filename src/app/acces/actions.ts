"use server";

import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, accessToken, getSitePassword, safeReturnPath } from "@/lib/site-access";

export type UnlockState = { error?: string };

export async function unlock(_: UnlockState, formData: FormData): Promise<UnlockState> {
  const expected = getSitePassword();
  const next = safeReturnPath(formData.get("suite"));
  if (!expected) redirect(next);

  // Comparaison des empreintes (même longueur) en temps constant.
  const [given, wanted] = await Promise.all([
    accessToken(String(formData.get("password") ?? "")),
    accessToken(expected),
  ]);
  if (!timingSafeEqual(Buffer.from(given), Buffer.from(wanted))) {
    await new Promise((resolve) => setTimeout(resolve, 600)); // freine les essais en série
    return { error: "Mot de passe incorrect." };
  }

  (await cookies()).set(ACCESS_COOKIE, wanted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ACCESS_MAX_AGE,
    path: "/",
  });
  redirect(next);
}
