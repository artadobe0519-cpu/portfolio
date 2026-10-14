import { testimonials, testimonialsNote } from "../../../data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TestimonialsSection() {
  if (!testimonials.length) return null;

  return (
    <section className="mx-auto w-full max-w-[90rem] px-5 py-20 md:px-8 md:py-28 lg:px-12">
      <SectionHeading
        index="06 — Words"
        title="A place for real client words."
        intro={testimonialsNote}
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {testimonials.map((item) => (
          <figure key={item.id} className="border-t border-line pt-6">
            <blockquote className="font-display text-2xl leading-snug tracking-[-0.02em]">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted">
              <span className="text-ink">{item.attribution}</span>
              <span className="mt-1 block">{item.context}</span>
              {item.isDemo ? (
                <span className="mt-2 block text-xs uppercase tracking-[0.16em] text-wine">
                  Demo content
                </span>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
