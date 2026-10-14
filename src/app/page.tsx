import type { Metadata } from "next";
import { siteConfig } from "../../data/site-config";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ContactCTA } from "@/components/home/ContactCTA";
import { FeaturedCaseStudies } from "@/components/home/FeaturedCaseStudies";
import { HeroSection } from "@/components/home/HeroSection";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { getFeaturedProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    path: "/",
  }),
  title: { absolute: siteConfig.seo.defaultTitle },
};

export default async function HomePage() {
  const featured = await getFeaturedProjects();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <SelectedWork projects={featured} />
      <ServicesOverview />
      <AboutIntro />
      <FeaturedCaseStudies projects={featured.slice(0, 2)} />
      <ProcessTimeline />
      <TestimonialsSection />
      <ContactCTA />
    </>
  );
}
