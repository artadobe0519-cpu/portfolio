import type { Metadata } from "next";
import { siteConfig } from "../../../data/site-config";
import { ContactCTA } from "@/components/home/ContactCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Rajni Goswami is a graphic designer and visual brand designer based in Purani Abadi, Sri Ganganagar, Rajasthan.",
  path: "/about",
});

const specialties = [
  "Brand identity",
  "Logo design",
  "Social media creatives",
  "Packaging design",
  "Poster design",
  "Marketing collateral",
  "Business cards",
  "Typography and digital creatives",
];

export default function AboutPage() {
  return (
    <>
      <article className="mx-auto w-full max-w-[90rem] px-5 py-14 md:px-8 md:py-20 lg:px-12">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-wine">About</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] tracking-[-0.03em] sm:text-7xl">
          {siteConfig.name}
        </h1>
        <p className="mt-5 text-sm uppercase tracking-[0.16em] text-muted">{siteConfig.profession}</p>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xl leading-relaxed">{siteConfig.about.lead}</p>
            <h2 className="mt-12 font-display text-4xl tracking-[-0.03em]">Design philosophy</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{siteConfig.about.philosophy}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">{siteConfig.about.approach}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              I work as a freelance graphic designer in India, with a practice rooted in Sri Ganganagar,
              Rajasthan. The archive on this site is a selection of identity, logo, social, poster, and
              print work. I take on selected projects when the brief and the timing fit.
            </p>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-sm uppercase tracking-[0.16em] text-wine">Studio</h2>
            <p className="mt-4 text-base leading-relaxed">{siteConfig.location.display}</p>
            <p className="mt-3 text-sm text-muted">{siteConfig.availability}</p>
            <dl className="mt-8 space-y-4 border-t border-line pt-6">
              {siteConfig.stats.map((stat) => (
                <div key={stat.id}>
                  <dt className="text-sm text-muted">
                    {stat.label}
                    {stat.isDemo ? " (placeholder)" : ""}
                  </dt>
                  <dd className="font-display text-3xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <h2 className="mt-16 font-display text-4xl tracking-[-0.03em]">Creative specialties</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {specialties.map((item) => (
            <li key={item} className="border-t border-line py-3 text-base">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-4xl tracking-[-0.03em]">Workflow</h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.process.map((step) => (
            <li key={step.id}>
              <p className="text-xs tracking-[0.18em] text-wine">{step.index}</p>
              <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </article>
      <ContactCTA />
    </>
  );
}
