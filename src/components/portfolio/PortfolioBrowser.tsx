"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { Project, ProjectCategory } from "@/types/portfolio";
import { categoryLabels, projectCategories } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

function readCategory(value: string | null): ProjectCategory | "all" {
  if (value && (projectCategories as readonly string[]).includes(value)) {
    return value as ProjectCategory;
  }
  return "all";
}

export function PortfolioBrowser({ projects }: { projects: Project[] }) {
  const pathname = usePathname();
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const apply = () => setCategory(readCategory(new URLSearchParams(window.location.search).get("category")));
    apply();
    window.addEventListener("popstate", apply);
    return () => window.removeEventListener("popstate", apply);
  }, []);

  const counts = useMemo(() => {
    const next = Object.fromEntries(projectCategories.map((item) => [item, 0])) as Record<
      ProjectCategory,
      number
    >;
    for (const project of projects) next[project.category] += 1;
    return next;
  }, [projects]);

  const filtered = projects.filter((project) => {
    if (category !== "all" && project.category !== category) return false;
    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    const haystack = [
      project.title,
      project.shortDescription,
      project.artworkLabel,
      categoryLabels[project.category],
      ...project.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });

  function updateCategory(next: ProjectCategory | "all") {
    const params = new URLSearchParams(window.location.search);
    if (next === "all") params.delete("category");
    else params.set("category", next);
    const queryString = params.toString();
    window.history.replaceState(null, "", queryString ? `${pathname}?${queryString}` : pathname);
    setCategory(next);
  }

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div role="toolbar" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          <FilterButton
            pressed={category === "all"}
            onClick={() => updateCategory("all")}
            label="All"
            count={projects.length}
          />
          {projectCategories.map((item) => (
            <FilterButton
              key={item}
              pressed={category === item}
              onClick={() => updateCategory(item)}
              label={categoryLabels[item]}
              count={counts[item]}
            />
          ))}
        </div>
        <form role="search" className="relative w-full lg:max-w-xs" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Search aria-hidden="true" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id="project-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the archive"
            className="min-h-11 w-full rounded-full border border-line bg-paper py-2 pl-9 pr-4 text-sm outline-none"
          />
        </form>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 border-t border-line py-16">
          <p className="max-w-lg font-display text-3xl tracking-[-0.03em]">Nothing in this view yet.</p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
            No projects match this filter and search. Clear the search or choose another category.
          </p>
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-6 text-sm text-wine underline-offset-4 hover:underline"
            >
              Clear search
            </button>
          ) : null}
        </div>
      ) : (
        <div className="mt-8 columns-1 gap-6 sm:columns-2 xl:columns-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterButton({
  pressed,
  onClick,
  label,
  count,
}: {
  pressed: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full px-4 text-sm transition-colors",
        pressed ? "bg-ink text-ivory" : "bg-stone/70 text-ink hover:bg-blush",
      )}
    >
      {label}
      <span className={cn("ml-2 text-xs", pressed ? "text-ivory/70" : "text-muted")}>{count}</span>
    </button>
  );
}
