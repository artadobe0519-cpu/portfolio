import Link from "next/link";
import type { Project } from "@/types/portfolio";
import { categoryLabels } from "@/types/portfolio";
import { ArtworkFrame } from "@/components/portfolio/ArtworkFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedCaseStudies({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <SectionHeading
          index="04 — Studies"
          title="A closer look at two systems."
          intro="Notes on composition and craft. No invented performance figures."
        />
        <div className="mt-14 space-y-20">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className={index % 2 === 1 ? "lg:col-span-7 lg:col-start-6 lg:row-start-1" : "lg:col-span-7"}>
                <ArtworkFrame
                  image={project.coverImage}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className={index % 2 === 1 ? "lg:col-span-4 lg:col-start-1 lg:row-start-1" : "lg:col-span-4 lg:col-start-9"}>
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-wine">
                  {categoryLabels[project.category]}
                </p>
                <h3 className="mt-3 font-display text-4xl tracking-[-0.03em]">{project.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{project.overview}</p>
                <Link href={`/work/${project.slug}`} className="mt-6 inline-flex text-sm hover:text-wine">
                  Open the project
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
