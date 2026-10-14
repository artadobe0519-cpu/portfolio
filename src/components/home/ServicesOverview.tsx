import Link from "next/link";
import { services } from "../../../data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesOverview() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <SectionHeading
          index="02 — Services"
          title="Design for the pieces a brand repeats."
          intro="Logo, identity, social, packaging, posters, and print. Pricing is quoted per project."
        />
        <ol className="mt-12 divide-y divide-line border-y border-line">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Link
                href={`/services#${service.slug}`}
                className="group grid gap-3 py-6 sm:grid-cols-12 sm:items-baseline"
              >
                <span className="text-xs tracking-[0.18em] text-muted sm:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl tracking-tight group-hover:text-wine sm:col-span-4 sm:text-3xl">
                  {service.title}
                </span>
                <span className="text-sm leading-relaxed text-muted sm:col-span-7">
                  {service.summary}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
