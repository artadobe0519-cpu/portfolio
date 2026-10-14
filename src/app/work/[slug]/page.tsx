import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ProjectDetails } from "@/components/portfolio/ProjectDetails";
import { getAdjacentProjects, getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/work/${project.slug}`,
    image: project.coverImage.src,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const { previous, next } = await getAdjacentProjects(slug);

  return (
    <>
      <ProjectDetails project={project} previous={previous} next={next} />
      <ContactCTA
        title="Like the direction of this work?"
        body="Tell me about the piece you need. Quotes are prepared for the actual scope, not from a fixed price list."
      />
    </>
  );
}
