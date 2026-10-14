import { siteConfig } from "../../../data/site-config";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessTimeline() {
  return (
    <section className="bg-ink text-ivory">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <SectionHeading
          index="05 — Process"
          title="Discover, concept, design, deliver."
          className="[&_h2]:text-ivory [&_p]:text-ivory/70"
        />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.process.map((step) => (
            <li key={step.id} className="border-t border-white/20 pt-5">
              <p className="text-xs tracking-[0.18em] text-blush">{step.index}</p>
              <h3 className="mt-3 font-display text-3xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
