import Link from "next/link";
import type { Project } from "@/types/portfolio";
import { categoryLabels } from "@/types/portfolio";
import { ArtworkFrame } from "./ArtworkFrame";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="mb-8 break-inside-avoid">
      <Link href={`/work/${project.slug}`} className="group block rounded-sm focus-visible:outline-offset-4">
        <ArtworkFrame
          image={project.coverImage}
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
        />
        <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-wine">
          {categoryLabels[project.category]}
        </p>
        <h2 className="mt-1 font-display text-[1.7rem] leading-tight tracking-[-0.03em] group-hover:text-wine">
          {project.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.shortDescription}</p>
      </Link>
    </article>
  );
}
