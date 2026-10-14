import { getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "../../../data/site-config";
import { ArtworkFrame } from "@/components/portfolio/ArtworkFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function HeroSection() {
  const poster = await getProjectBySlug("sunrise-study-posters");
  const lawn = await getProjectBySlug("bay-lawn-mowing");
  const talk = await getProjectBySlug("desi-talk");
  if (!poster || !lawn || !talk) {
    throw new Error("Hero artwork is missing from the project registry.");
  }

  return (
    <section className="mx-auto grid w-full max-w-[90rem] items-end gap-12 px-5 pb-16 pt-12 md:px-8 md:pb-20 md:pt-16 lg:grid-cols-12 lg:px-12 lg:pt-20">
      <div className="rise lg:col-span-6">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-wine">
          {siteConfig.hero.eyebrow}
        </p>
        <h1 className="mt-5 font-display text-[2.8rem] leading-[0.96] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.6rem]">
          Designs That Make Brands{" "}
          <span className="italic text-wine">Impossible</span> to Ignore.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          {siteConfig.hero.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/work">Explore My Work</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            {"Let's Work Together"}
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-muted">{siteConfig.availability}</p>
      </div>
      <div className="rise rise-late grid grid-cols-2 gap-3 md:grid-cols-6 lg:col-span-6">
        <ArtworkFrame
          image={poster.coverImage}
          priority
          sizes="(min-width: 1024px) 28vw, 70vw"
          className="col-span-2 md:col-span-4 md:row-span-2"
        />
        <ArtworkFrame
          image={lawn.coverImage}
          sizes="(min-width: 1024px) 16vw, 30vw"
          className="col-span-1 md:col-span-2"
        />
        <ArtworkFrame
          image={talk.coverImage}
          sizes="(min-width: 1024px) 16vw, 30vw"
          className="col-span-1 md:col-span-2"
        />
      </div>
    </section>
  );
}
