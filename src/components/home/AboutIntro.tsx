import { siteConfig } from "../../../data/site-config";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function AboutIntro() {
  return (
    <section className="mx-auto grid w-full max-w-[90rem] gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:px-12">
      <div className="lg:col-span-5">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-wine">03 — About</p>
        <p className="mt-6 font-display text-3xl leading-snug tracking-[-0.03em] sm:text-4xl">
          {siteConfig.about.philosophy}
        </p>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <h2 className="font-display text-4xl tracking-[-0.03em] sm:text-5xl">{siteConfig.name}</h2>
        <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">{siteConfig.profession}</p>
        <p className="mt-6 text-base leading-relaxed text-muted">{siteConfig.about.lead}</p>
        <p className="mt-4 text-base leading-relaxed text-muted">{siteConfig.about.approach}</p>
        <p className="mt-4 text-sm text-ink">{siteConfig.location.display}</p>
        <div className="mt-8">
          <ButtonLink href="/about" variant="secondary">
            Read the profile
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
