import Link from "next/link";
import type { Project } from "@/types/portfolio";
import { categoryLabels } from "@/types/portfolio";
import { ProjectGallery } from "./ProjectGallery";

const serviceForCategory = {
  branding: { href: "/services#brand-identity", label: "Brand identity" },
  logos: { href: "/services#logo-design", label: "Logo design" },
  "social-media": { href: "/services#social-media", label: "Social media design" },
  packaging: { href: "/services#packaging", label: "Packaging design" },
  posters: { href: "/services#posters", label: "Posters" },
  "print-design": { href: "/services#print", label: "Print design" },
} as const;

export function ProjectDetails({
  project,
  previous,
  next,
}: {
  project: Project;
  previous?: Project;
  next?: Project;
}) {
  const service = serviceForCategory[project.category];

  return (
    <article className="mx-auto w-full max-w-[90rem] px-5 py-12 md:px-8 md:py-16 lg:px-12">
      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-wine">
        {categoryLabels[project.category]}
      </p>
      <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.02] tracking-[-0.03em] sm:text-6xl">
        {project.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.shortDescription}</p>
      <p className="mt-4 text-sm text-muted">
        {project.contentStatus === "demo"
          ? "Demo project. Replace this entry before treating it as finished client work."
          : "Archive sample. This page describes the visual work only and does not claim measured results."}{" "}
        {project.year === "Undated" ? "Year not recorded." : project.year}
      </p>

      <div className="mt-10">
        <ProjectGallery images={project.gallery} />
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl">Overview</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{project.overview}</p>
          <h2 className="mt-10 font-display text-3xl">Objective</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{project.objective}</p>
          <h2 className="mt-10 font-display text-3xl">Design approach</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{project.approach}</p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <h2 className="font-display text-3xl">Creative direction</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">{project.creativeDirection}</p>
          <h2 className="mt-10 text-sm uppercase tracking-[0.16em] text-wine">Colour</h2>
          <ul className="mt-4 space-y-3">
            {project.palette.map((swatch) => (
              <li key={swatch.hex} className="flex items-center gap-3 text-sm">
                <span
                  className="h-8 w-8 rounded-full ring-1 ring-ink/10"
                  style={{ backgroundColor: swatch.hex }}
                  aria-hidden="true"
                />
                <span>
                  {swatch.name}
                  <span className="ml-2 text-muted">{swatch.hex}</span>
                </span>
              </li>
            ))}
          </ul>
          <h2 className="mt-10 text-sm uppercase tracking-[0.16em] text-wine">Type</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">{project.typographyNotes}</p>
          <p className="mt-8 text-sm">
            <Link href={service.href} className="hover:text-wine">
              Related service: {service.label}
            </Link>
          </p>
        </div>
      </div>

      <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="More projects">
        {previous ? (
          <Link href={`/work/${previous.slug}`} className="group block">
            <span className="text-xs uppercase tracking-[0.16em] text-muted">Previous</span>
            <span className="mt-2 block font-display text-2xl group-hover:text-wine">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} className="group block sm:text-right">
            <span className="text-xs uppercase tracking-[0.16em] text-muted">Next</span>
            <span className="mt-2 block font-display text-2xl group-hover:text-wine">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
