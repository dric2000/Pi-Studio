import type { MetadataRoute } from "next";
import { getSitePassword } from "@/lib/site-access";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  // Démo verrouillée par mot de passe : rien ne doit être indexé.
  if (getSitePassword()) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    // Le styleguide est une page de travail interne.
    rules: { userAgent: "*", allow: "/", disallow: ["/styleguide", "/acces"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
