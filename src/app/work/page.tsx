import type { Metadata } from "next";
import { PortfolioBrowser } from "@/components/portfolio/PortfolioBrowser";
import { getAllProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Selected graphic design from Rajni Goswami in Sri Ganganagar: brand identity, logos, social creatives, posters, and print.",
  path: "/work",
});

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto w-full max-w-[90rem] px-5 py-14 md:px-8 md:py-20 lg:px-12">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-wine">Portfolio</p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.98] tracking-[-0.03em] sm:text-7xl">
        Selected work
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
        The full image archive is included: logos, posts, banners, cards, brochures, and product creatives.
        Filter by category or search by name.
      </p>
      <div className="mt-12">
        <PortfolioBrowser projects={projects} />
      </div>
    </div>
  );
}
