import { ContactCta } from "@/components/home/contact-cta";
import { Distinctions } from "@/components/home/distinctions";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { ServicesPreview } from "@/components/home/services-preview";
import { Stats } from "@/components/home/stats";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Intro />
      <ServicesPreview />
      <FeaturedProjects />
      <Distinctions />
      <ContactCta />
    </main>
  );
}
