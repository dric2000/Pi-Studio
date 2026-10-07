import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    // Le styleguide est une page de travail interne.
    rules: { userAgent: "*", allow: "/", disallow: "/styleguide" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
