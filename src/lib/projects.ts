import archiveProjects from "../../data/generated/archive-projects.json";
import { brandingProjects } from "../../data/projects/branding/projects";
import { logoProjects } from "../../data/projects/logos/projects";
import { packagingProjects } from "../../data/projects/packaging/projects";
import { posterProjects } from "../../data/projects/posters/projects";
import { printProjects } from "../../data/projects/print-design/projects";
import { socialMediaProjects } from "../../data/projects/social-media/projects";
import type { Project, ProjectCategory } from "@/types/portfolio";

const generatedProjects = archiveProjects as Project[];

const projects: Project[] = [
  ...brandingProjects,
  ...logoProjects,
  ...socialMediaProjects,
  ...packagingProjects,
  ...posterProjects,
  ...printProjects,
  ...generatedProjects,
].sort((a, b) => a.order - b.order);

const seen = new Set<string>();
for (const project of projects) {
  if (seen.has(project.slug)) {
    throw new Error(`Duplicate project slug: ${project.slug}`);
  }
  seen.add(project.slug);
  if (project.gallery.length === 0) {
    throw new Error(`Project ${project.slug} needs at least one gallery image.`);
  }
}

export function getAllProjects() {
  return projects;
}

export function getFeaturedProjects() {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((project) => project.category === category);
}

export function getAllProjectSlugs() {
  return projects.map((project) => project.slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: projects[index - 1],
    next: projects[index + 1],
  };
}
