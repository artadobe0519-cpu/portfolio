"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { deleteProject, logout, saveProject } from "@/app/admin/actions";
import type { AdminProject } from "@/lib/projects";
import {
  emptyDraft,
  heroSlugs,
  projectToDraft,
  slugify,
  validateDraft,
  type WorkDraft,
} from "@/lib/work-draft";
import { categoryLabels, projectCategories, type GalleryAspect, type ProjectCategory } from "@/types/portfolio";

const aspects: GalleryAspect[] = ["landscape", "portrait", "square", "wide"];

export function WorkManager({ projects }: { projects: AdminProject[] }) {
  const [items, setItems] = useState(projects);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState<string | null>(projects[0]?.slug ?? null);
  const [draft, setDraft] = useState<WorkDraft | null>(projects[0] ? projectToDraft(projects[0]) : null);
  const [files, setFiles] = useState<File[]>([]);
  const [slugTouched, setSlugTouched] = useState(true);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [fileKey, setFileKey] = useState(0);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((project) => {
      if (category !== "all" && project.category !== category) return false;
      if (!needle) return true;
      return `${project.title} ${project.slug} ${categoryLabels[project.category]}`.toLowerCase().includes(needle);
    });
  }, [items, query, category]);

  const current = items.find((project) => project.slug === selected);
  const locked = Boolean(draft && (heroSlugs as readonly string[]).includes(draft.slug));
  const hiddenCount = items.filter((project) => project.hidden).length;

  function selectProject(slug: string) {
    const project = items.find((item) => item.slug === slug);
    if (!project) return;
    setCreating(false);
    setSelected(slug);
    setDraft(projectToDraft(project));
    setFiles([]);
    setSlugTouched(true);
    setMessage("");
  }

  function startNew() {
    const order = Math.max(0, ...items.map((item) => item.order)) + 1;
    setCreating(true);
    setSelected(null);
    setDraft(emptyDraft(order));
    setFiles([]);
    setSlugTouched(false);
    setMessage("");
  }

  function patch(next: Partial<WorkDraft>) {
    setDraft((currentDraft) => (currentDraft ? { ...currentDraft, ...next } : currentDraft));
  }

  async function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft || pending) return;
    const nextDraft = { ...draft, slug: slugify(draft.slug) };
    const problem = validateDraft(nextDraft, files.length);
    if (problem) {
      setMessage(problem);
      return;
    }
    setPending(true);
    const body = new FormData();
    body.set("mode", creating ? "create" : "update");
    body.set("draft", JSON.stringify(nextDraft));
    for (const file of files) body.append("images", file);
    const result = await saveProject(body);
    setPending(false);
    setMessage(result.message);
    if (!result.ok || !result.project) return;
    const saved = result.project;
    setItems((currentItems) =>
      [...currentItems.filter((item) => item.slug !== saved.slug), saved].sort(
        (a, b) => a.order - b.order || a.title.localeCompare(b.title),
      ),
    );
    setCreating(false);
    setSelected(saved.slug);
    setDraft(projectToDraft(saved));
    setFiles([]);
    setFileKey((value) => value + 1);
    setSlugTouched(true);
  }

  async function onDelete() {
    if (!draft || creating || pending) return;
    if (!window.confirm(`Delete “${draft.title}” from the library?`)) return;
    setPending(true);
    const result = await deleteProject(draft.slug);
    setPending(false);
    setMessage(result.message);
    if (!result.ok) return;
    const remaining = items.filter((item) => item.slug !== draft.slug);
    setItems(remaining);
    const next = remaining[0];
    setCreating(false);
    setSelected(next?.slug ?? null);
    setDraft(next ? projectToDraft(next) : null);
  }

  return (
    <div className="mx-auto w-full max-w-[90rem] px-5 py-8 md:px-8 lg:px-12">
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-wine">Admin</p>
          <h1 className="mt-2 font-display text-4xl tracking-[-0.03em] sm:text-5xl">Work library</h1>
          <p className="mt-2 text-sm text-muted">
            {items.length} projects · {hiddenCount} hidden
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/work" className="inline-flex min-h-11 items-center text-sm hover:text-wine">
            View the site
          </Link>
          <form action={logout}>
            <button type="submit" className="inline-flex min-h-11 items-center text-sm hover:text-wine">
              Log out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-6">
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects"
              aria-label="Search projects"
              className="field"
            />
          </div>
          <label htmlFor="library-category" className="sr-only">
            Filter by category
          </label>
          <select
            id="library-category"
            value={category}
            onChange={(event) => setCategory(event.target.value as ProjectCategory | "all")}
            className="field mt-2"
          >
            <option value="all">All categories</option>
            {projectCategories.map((item) => (
              <option key={item} value={item}>
                {categoryLabels[item]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={startNew}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-4 text-sm text-ivory hover:bg-wine"
          >
            New project
          </button>
          <ul className="mt-4 max-h-[70vh] space-y-1 overflow-auto pr-1" aria-label="Projects">
            {visible.map((project) => (
              <li key={project.slug}>
                <button
                  type="button"
                  onClick={() => selectProject(project.slug)}
                  aria-pressed={!creating && selected === project.slug}
                  className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left ${
                    !creating && selected === project.slug ? "bg-blush" : "hover:bg-stone/70"
                  }`}
                >
                  <Image
                    src={project.coverImage.src}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm">{project.title}</span>
                    <span className="block truncate text-xs text-muted">
                      {categoryLabels[project.category]}
                      {project.hidden ? " · Hidden" : ""}
                      {project.featured ? " · Featured" : ""}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {draft ? (
          <form onSubmit={onSave} className="min-w-0 border border-line bg-paper p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl tracking-[-0.03em]">
                {creating ? "New project" : "Edit project"}
              </h2>
              {!creating && !draft.hidden ? (
                <Link href={`/work/${draft.slug}`} className="text-sm hover:text-wine">
                  Open public page
                </Link>
              ) : null}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Title">
                <input
                  value={draft.title}
                  onChange={(event) => {
                    const title = event.target.value;
                    patch({
                      title,
                      slug: creating && !slugTouched ? slugify(title) : draft.slug,
                    });
                  }}
                  className="field"
                  required
                />
              </Field>
              <Field label="Artwork label">
                <input
                  value={draft.artworkLabel}
                  onChange={(event) => patch({ artworkLabel: event.target.value })}
                  className="field"
                  required
                />
              </Field>
              <Field label="Slug">
                <input
                  value={draft.slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    patch({ slug: event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") });
                  }}
                  className="field"
                  disabled={!creating}
                  required
                />
              </Field>
              <Field label="Category">
                <select
                  value={draft.category}
                  onChange={(event) => patch({ category: event.target.value as ProjectCategory })}
                  className="field"
                >
                  {projectCategories.map((item) => (
                    <option key={item} value={item}>
                      {categoryLabels[item]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Year">
                <input
                  value={draft.year}
                  onChange={(event) => patch({ year: event.target.value })}
                  className="field"
                />
              </Field>
              <Field label="Order">
                <input
                  type="number"
                  min={0}
                  max={9999}
                  value={draft.order}
                  onChange={(event) => patch({ order: Number.parseInt(event.target.value, 10) || 0 })}
                  className="field"
                />
              </Field>
            </div>

            <div className="mt-4 flex flex-wrap gap-6">
              <label className="flex min-h-11 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.featured}
                  onChange={(event) => patch({ featured: event.target.checked })}
                />
                Featured on the homepage
              </label>
              {draft.featured ? (
                <label className="flex items-center gap-2 text-sm">
                  Featured order
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={draft.featuredOrder}
                    onChange={(event) => patch({ featuredOrder: Number.parseInt(event.target.value, 10) || 1 })}
                    className="field w-24"
                  />
                </label>
              ) : null}
              <label className="flex min-h-11 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.hidden}
                  disabled={locked}
                  onChange={(event) => patch({ hidden: event.target.checked })}
                />
                Hide from the public site
              </label>
            </div>
            {locked ? (
              <p className="mt-2 text-sm text-muted">This project is used in the homepage hero, so it stays visible.</p>
            ) : null}

            <Field label="Short description" className="mt-4">
              <textarea
                value={draft.shortDescription}
                onChange={(event) => patch({ shortDescription: event.target.value })}
                className="field h-24"
              />
            </Field>
            <Field label="Overview" className="mt-4">
              <textarea
                value={draft.overview}
                onChange={(event) => patch({ overview: event.target.value })}
                className="field h-32"
              />
            </Field>
            <Field label="Objective" className="mt-4">
              <textarea
                value={draft.objective}
                onChange={(event) => patch({ objective: event.target.value })}
                className="field h-28"
              />
            </Field>
            <Field label="Approach" className="mt-4">
              <textarea
                value={draft.approach}
                onChange={(event) => patch({ approach: event.target.value })}
                className="field h-28"
              />
            </Field>
            <Field label="Creative direction" className="mt-4">
              <textarea
                value={draft.creativeDirection}
                onChange={(event) => patch({ creativeDirection: event.target.value })}
                className="field h-28"
              />
            </Field>
            <Field label="Typography notes" className="mt-4">
              <textarea
                value={draft.typographyNotes}
                onChange={(event) => patch({ typographyNotes: event.target.value })}
                className="field h-24"
              />
            </Field>
            <Field label="Tags, separated by commas" className="mt-4">
              <input
                value={draft.tags}
                onChange={(event) => patch({ tags: event.target.value })}
                className="field"
              />
            </Field>

            <div className="mt-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-2xl tracking-[-0.03em]">Colours</h3>
                <button
                  type="button"
                  onClick={() => patch({ palette: [...draft.palette, { name: "", hex: "#722F37" }] })}
                  className="text-sm hover:text-wine"
                >
                  Add colour
                </button>
              </div>
              <ul className="mt-3 space-y-2">
                {draft.palette.map((swatch, index) => (
                  <li key={`${swatch.hex}-${index}`} className="grid grid-cols-[1fr_8rem_auto] gap-2">
                    <input
                      value={swatch.name}
                      aria-label={`Colour ${index + 1} name`}
                      onChange={(event) => {
                        const palette = draft.palette.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, name: event.target.value } : item,
                        );
                        patch({ palette });
                      }}
                      className="field"
                    />
                    <input
                      value={swatch.hex}
                      aria-label={`Colour ${index + 1} hex`}
                      onChange={(event) => {
                        const palette = draft.palette.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, hex: event.target.value } : item,
                        );
                        patch({ palette });
                      }}
                      className="field"
                    />
                    <button
                      type="button"
                      onClick={() => patch({ palette: draft.palette.filter((_, itemIndex) => itemIndex !== index) })}
                      className="min-h-11 px-2 text-sm hover:text-wine"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-2xl tracking-[-0.03em]">Images</h3>
              <p className="mt-2 text-sm text-muted">The first image is the cover. New uploads are added at the end.</p>
              <ul className="mt-4 space-y-4">
                {draft.gallery.map((image, index) => (
                  <li key={image.src} className="grid gap-3 border border-line p-3 sm:grid-cols-[4.5rem_minmax(0,1fr)]">
                    <Image src={image.src} alt="" width={72} height={72} className="h-[4.5rem] w-[4.5rem] object-cover" />
                    <div className="grid gap-2">
                      <input
                        value={image.alt}
                        aria-label={`Image ${index + 1} description`}
                        onChange={(event) => {
                          const gallery = draft.gallery.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, alt: event.target.value } : item,
                          );
                          patch({ gallery });
                        }}
                        className="field"
                      />
                      <input
                        value={image.caption ?? ""}
                        aria-label={`Image ${index + 1} caption`}
                        placeholder="Caption"
                        onChange={(event) => {
                          const gallery = draft.gallery.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, caption: event.target.value } : item,
                          );
                          patch({ gallery });
                        }}
                        className="field"
                      />
                      <div className="flex flex-wrap gap-2">
                        <select
                          value={image.aspect ?? "landscape"}
                          aria-label={`Image ${index + 1} shape`}
                          onChange={(event) => {
                            const gallery = draft.gallery.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, aspect: event.target.value as GalleryAspect } : item,
                            );
                            patch({ gallery });
                          }}
                          className="field w-auto"
                        >
                          {aspects.map((aspect) => (
                            <option key={aspect} value={aspect}>
                              {aspect}
                            </option>
                          ))}
                        </select>
                        {index > 0 ? (
                          <button
                            type="button"
                            onClick={() => {
                              const gallery = [...draft.gallery];
                              const [imageItem] = gallery.splice(index, 1);
                              gallery.unshift(imageItem);
                              patch({ gallery });
                            }}
                            className="min-h-11 px-2 text-sm hover:text-wine"
                          >
                            Make cover
                          </button>
                        ) : (
                          <span className="inline-flex min-h-11 items-center px-2 text-sm text-muted">Cover</span>
                        )}
                        <button
                          type="button"
                          onClick={() => patch({ gallery: draft.gallery.filter((_, itemIndex) => itemIndex !== index) })}
                          className="min-h-11 px-2 text-sm hover:text-wine"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <label htmlFor="project-images" className="mb-2 mt-4 block text-sm">
                Upload images
              </label>
              <input
                key={fileKey}
                id="project-images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
                className="block w-full text-sm"
              />
              {files.length ? (
                <p className="mt-2 text-sm text-muted">{files.length} new image{files.length === 1 ? "" : "s"} ready to save.</p>
              ) : null}
            </div>

            {message ? (
              <p role="status" className="mt-6 text-sm">
                {message}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-ivory hover:bg-wine disabled:opacity-60"
              >
                {pending ? "Saving…" : "Save project"}
              </button>
              {!creating && current?.managed ? (
                <button
                  type="button"
                  onClick={onDelete}
                  disabled={pending}
                  className="inline-flex min-h-11 items-center rounded-full px-5 text-sm text-wine hover:bg-blush disabled:opacity-60"
                >
                  Delete project
                </button>
              ) : null}
            </div>
          </form>
        ) : (
          <div className="border border-line bg-paper p-8">
            <h2 className="font-display text-3xl">No project selected</h2>
            <button type="button" onClick={startNew} className="mt-4 text-sm hover:text-wine">
              Add the first project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={className ?? ""}>
      <span className="mb-2 block text-sm">{label}</span>
      {children}
    </label>
  );
}
