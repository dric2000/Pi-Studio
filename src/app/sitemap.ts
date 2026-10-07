import type { MetadataRoute } from "next";
import { PROJECTS } from "@/content/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const PAGES = ["", "/studio", "/services", "/realisations", "/contact", "/mentions-legales", "/confidentialite"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((page) => ({ url: `${SITE_URL}${page}` })),
    ...PROJECTS.map((project) => ({ url: `${SITE_URL}/realisations/${project.slug}` })),
  ];
}
