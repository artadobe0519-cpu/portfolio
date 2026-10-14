import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { categoryLabels } from "@/types/portfolio";
import { ArtworkFrame } from "@/components/portfolio/ArtworkFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SelectedWork({ projects }: { projects: Project[] }) {
  const [lead, second, third, ...rest] = projects;

  return (
    <section className="mx-auto w-full max-w-[90rem] px-5 py-20 md:px-8 md:py-28 lg:px-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          index="01 — Work"
          title="Pieces from the design archive."
          intro="Identity systems, posters, print, and social creatives. Each note describes the visual work, not a measured result."
        />
        <Link href="/work" className="text-sm tracking-wide text-ink hover:text-wine">
          View the full portfolio
        </Link>
      </div>

      {lead ? <FeatureBlock project={lead} large /> : null}

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        {second ? (
          <div className="lg:col-span-7">
            <FeatureBlock project={second} />
          </div>
        ) : null}
        {third ? (
          <div className="lg:col-span-5 lg:pt-16">
            <FeatureBlock project={third} />
          </div>
        ) : null}
      </div>

      {rest.length ? (
        <ul className="mt-16 divide-y divide-line border-y border-line">
          {rest.map((project) => (
            <li key={project.id}>
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-display text-2xl tracking-tight group-hover:text-wine">
                  {project.title}
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-muted">
                  {categoryLabels[project.category]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function FeatureBlock({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <article className={large ? "mt-12" : ""}>
      <Link href={`/work/${project.slug}`} className="group block">
        <ArtworkFrame
          image={project.coverImage}
          sizes={large ? "(min-width: 1024px) 70vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
          priority={large}
        />
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-wine">
              {categoryLabels[project.category]}
            </p>
            <h3 className="mt-2 font-display text-3xl tracking-[-0.03em] group-hover:text-wine sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              {project.shortDescription}
            </p>
          </div>
          <ArrowUpRight aria-hidden="true" className="shift mt-1 shrink-0" size={20} />
        </div>
      </Link>
    </article>
  );
}
