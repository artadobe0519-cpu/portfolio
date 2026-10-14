"use server";

import { existsSync } from "node:fs";
import path from "node:path";
import { refresh, revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { endAdminSession, isAdmin, passwordsMatch, startAdminSession } from "@/lib/admin-auth";
import { removeManagedFolder, removeManagedImages, storeUploads } from "@/lib/managed-images";
import { getAdminCatalog, type AdminProject } from "@/lib/projects";
import {
  cleanPalette,
  heroSlugs,
  parseTags,
  sanitizeGallery,
  validateDraft,
  type WorkDraft,
} from "@/lib/work-draft";
import { readStore, writeStore } from "@/lib/work-store";
import type { Project } from "@/types/portfolio";

export type SaveResult = {
  ok: boolean;
  message: string;
  project?: AdminProject;
};

function publishChange() {
  updateTag("projects");
  revalidatePath("/", "layout");
  refresh();
}

export async function login(_previous: { message: string }, formData: FormData) {
  const expected = process.env.ADMIN_PASSWORD?.trim() ?? "";
  const password = String(formData.get("password") ?? "");
  if (!expected || !passwordsMatch(password, expected)) {
    return { message: "That password is not correct." };
  }
  await startAdminSession();
  redirect("/admin");
}

export async function logout() {
  await endAdminSession();
  redirect("/admin");
}

function imageExists(src: string) {
  const relative = src.replace(/^\//, "");
  return existsSync(path.join(process.cwd(), "public", relative));
}

function toProject(draft: WorkDraft, existing: AdminProject | undefined, gallery: Project["gallery"]): Project {
  return {
    id: existing?.id ?? draft.slug,
    slug: draft.slug,
    title: draft.title.trim(),
    artworkLabel: draft.artworkLabel.trim(),
    category: draft.category,
    year: draft.year.trim(),
    shortDescription: draft.shortDescription.trim(),
    overview: draft.overview.trim(),
    objective: draft.objective.trim(),
    approach: draft.approach.trim(),
    creativeDirection: draft.creativeDirection.trim(),
    typographyNotes: draft.typographyNotes.trim(),
    tags: parseTags(draft.tags),
    palette: cleanPalette(draft.palette),
    featured: draft.featured,
    featuredOrder: draft.featured ? draft.featuredOrder : undefined,
    order: draft.order,
    hidden: draft.hidden,
    gallery,
    coverImage: gallery[0],
    contentStatus: existing?.contentStatus ?? "archive",
  };
}

export async function saveProject(formData: FormData): Promise<SaveResult> {
  if (!(await isAdmin())) return { ok: false, message: "Sign in again to save." };

  let draft: WorkDraft;
  try {
    draft = JSON.parse(String(formData.get("draft") ?? "")) as WorkDraft;
  } catch {
    return { ok: false, message: "The form could not be read." };
  }

  const mode = formData.get("mode") === "create" ? "create" : "update";
  const files = formData
    .getAll("images")
    .filter((item): item is File => item instanceof File && item.size > 0);
  const problem = validateDraft(draft, files.length);
  if (problem) return { ok: false, message: problem };

  const catalog = await getAdminCatalog();
  const existing = catalog.find((project) => project.slug === draft.slug);
  if (mode === "create" && existing) return { ok: false, message: "That slug is already used. Choose another." };
  if (mode === "update" && !existing) return { ok: false, message: "That project is no longer in the library." };

  const gallery = sanitizeGallery(draft.gallery);
  for (const image of gallery) {
    if (!image.alt) image.alt = `${draft.title.trim()} artwork`;
    if (!imageExists(image.src)) return { ok: false, message: "One of the selected images is missing from the site files." };
  }

  let uploaded: Project["gallery"] = [];
  try {
    uploaded = await storeUploads(draft.slug, files, draft.title.trim());
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "The images could not be saved." };
  }

  const nextGallery = [...gallery, ...uploaded];
  if (!nextGallery.length) return { ok: false, message: "Add at least one image." };

  const removed = (existing?.gallery ?? [])
    .map((image) => image.src)
    .filter((src) => !nextGallery.some((image) => image.src === src));
  await removeManagedImages(draft.slug, removed);

  const next = toProject(draft, existing, nextGallery);
  const store = readStore();
  const managed = mode === "create" || Boolean(existing?.managed);
  if (managed) {
    store.created = [...store.created.filter((project) => project.slug !== next.slug), next];
    delete store.overrides[next.slug];
  } else {
    store.overrides[next.slug] = {
      title: next.title,
      artworkLabel: next.artworkLabel,
      category: next.category,
      year: next.year,
      shortDescription: next.shortDescription,
      overview: next.overview,
      objective: next.objective,
      approach: next.approach,
      creativeDirection: next.creativeDirection,
      typographyNotes: next.typographyNotes,
      tags: next.tags,
      palette: next.palette,
      featured: next.featured,
      featuredOrder: next.featuredOrder,
      order: next.order,
      gallery: next.gallery,
      hidden: next.hidden,
    };
  }
  writeStore(store);
  publishChange();
  return { ok: true, message: "Saved. The public site is updated.", project: { ...next, managed } };
}

export async function deleteProject(slug: string): Promise<SaveResult> {
  if (!(await isAdmin())) return { ok: false, message: "Sign in again to delete." };
  if ((heroSlugs as readonly string[]).includes(slug)) {
    return { ok: false, message: "This project stays on the homepage." };
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { ok: false, message: "That project could not be deleted." };

  const catalog = await getAdminCatalog();
  const existing = catalog.find((project) => project.slug === slug);
  if (!existing?.managed) {
    return { ok: false, message: "Only projects added in the admin can be deleted. Hide the others instead." };
  }

  const store = readStore();
  store.created = store.created.filter((project) => project.slug !== slug);
  delete store.overrides[slug];
  writeStore(store);
  await removeManagedFolder(slug);
  publishChange();
  return { ok: true, message: "Deleted from the library." };
}
