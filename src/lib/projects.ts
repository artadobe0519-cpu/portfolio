import { cacheLife, cacheTag } from "next/cache";
import archiveProjects from "../../data/generated/archive-projects.json";
import { brandingProjects } from "../../data/projects/branding/projects";
import { logoProjects } from "../../data/projects/logos/projects";
import { packagingProjects } from "../../data/projects/packaging/projects";
import { posterProjects } from "../../data/projects/posters/projects";
import { printProjects } from "../../data/projects/print-design/projects";
import { socialMediaProjects } from "../../data/projects/social-media/projects";
import type { Project, ProjectCategory } from "@/types/portfolio";
import type { ProjectOverride } from "@/lib/work-draft";
import { readStore } from "@/lib/work-store";

export type AdminProject = Project & { managed: boolean };

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

function applyOverride(project: Project, override?: ProjectOverride): Project {
  if (!override) return project;
  const gallery = override.gallery?.length ? override.gallery : project.gallery;
  return {
    ...project,
    title: override.title ?? project.title,
    artworkLabel: override.artworkLabel ?? project.artworkLabel,
    category: override.category ?? project.category,
    year: override.year ?? project.year,
    shortDescription: override.shortDescription ?? project.shortDescription,
    overview: override.overview ?? project.overview,
    objective: override.objective ?? project.objective,
    approach: override.approach ?? project.approach,
    creativeDirection: override.creativeDirection ?? project.creativeDirection,
    typographyNotes: override.typographyNotes ?? project.typographyNotes,
    tags: override.tags ?? project.tags,
    palette: override.palette ?? project.palette,
    featured: override.featured ?? project.featured,
    featuredOrder: override.featuredOrder ?? project.featuredOrder,
    order: override.order ?? project.order,
    hidden: override.hidden ?? false,
    gallery,
    coverImage: gallery[0] ?? project.coverImage,
    id: project.id,
    slug: project.slug,
    contentStatus: project.contentStatus,
  };
}

async function loadCatalog(): Promise<{ projects: Project[]; managed: string[] }> {
  "use cache";
  cacheTag("projects");
  cacheLife("max");

  const store = readStore();
  const managed = new Set(store.created.map((project) => project.slug));
  const merged = new Map<string, Project>();
  for (const project of projects) {
    merged.set(project.slug, applyOverride(project, store.overrides[project.slug]));
  }
  for (const project of store.created) {
    if (merged.has(project.slug)) continue;
    merged.set(project.slug, applyOverride(project, store.overrides[project.slug]));
  }

  const list = [...merged.values()].sort(
    (a, b) => a.order - b.order || a.title.localeCompare(b.title),
  );
  for (const project of list) {
    if (project.gallery.length === 0) {
      throw new Error(`Project ${project.slug} needs at least one gallery image.`);
    }
  }
  return { projects: list, managed: [...managed] };
}

export async function getAdminCatalog(): Promise<AdminProject[]> {
  const { projects: list, managed } = await loadCatalog();
  const managedSet = new Set(managed);
  return list.map((project) => ({ ...project, managed: managedSet.has(project.slug) }));
}

export async function getAllProjects() {
  const { projects: list } = await loadCatalog();
  return list.filter((project) => !project.hidden);
}

export async function getFeaturedProjects() {
  const list = await getAllProjects();
  return list.filter((project) => project.featured).sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export async function getProjectBySlug(slug: string) {
  const list = await getAllProjects();
  return list.find((project) => project.slug === slug);
}

export async function getProjectsByCategory(category: ProjectCategory) {
  const list = await getAllProjects();
  return list.filter((project) => project.category === category);
}

export async function getAllProjectSlugs() {
  const list = await getAllProjects();
  return list.map((project) => project.slug);
}

export async function getAdjacentProjects(slug: string) {
  const list = await getAllProjects();
  const index = list.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: list[index - 1],
    next: list[index + 1],
  };
}
