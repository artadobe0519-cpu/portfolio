import type { Metadata } from "next";
import Link from "next/link";
import { services } from "../../../data/services";
import { ContactCTA } from "@/components/home/ContactCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Logo design, brand identity, social media, packaging, posters, and print by Rajni Goswami, a graphic designer in Sri Ganganagar, Rajasthan.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[90rem] px-5 py-14 md:px-8 md:py-20 lg:px-12">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-wine">Services</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] tracking-[-0.03em] sm:text-7xl">
          Design services, quoted for the work itself.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          I design logos, brand identities, social creatives, packaging, posters, and print for
          businesses in Sri Ganganagar, across Rajasthan, and further afield. There is no fixed price
          list. Every engagement starts with a quote.
        </p>
        <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="On this page">
          {services.map((service) => (
            <a key={service.slug} href={`#${service.slug}`} className="hover:text-wine">
              {service.title}
            </a>
          ))}
        </nav>

        <div className="mt-16 space-y-16">
          {services.map((service, index) => (
            <section key={service.slug} id={service.slug} className="scroll-mt-28 border-t border-line pt-10">
              <p className="text-xs tracking-[0.18em] text-muted">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-display text-4xl tracking-[-0.03em]">{service.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{service.overview}</p>
              <div className="mt-8 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <h3 className="text-sm uppercase tracking-[0.16em] text-wine">Deliverables</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="text-sm uppercase tracking-[0.16em] text-wine">Suitable for</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{service.suitableFor}</p>
                  <div className="mt-6 flex flex-wrap gap-4 text-sm">
                    <Link
                      href={`/contact?service=${service.slug}`}
                      className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-ivory hover:bg-wine"
                    >
                      Request a Quote
                    </Link>
                    {service.category ? (
                      <Link href={`/work?category=${service.category}`} className="inline-flex min-h-11 items-center hover:text-wine">
                        See related work
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
      <ContactCTA title="Not sure which service you need?" body="Describe the outcome and I will suggest a practical scope before any quote." />
    </>
  );
}
