import type { Metadata } from "next";
import { siteConfig } from "../../../data/site-config";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { pageMetadata } from "@/lib/seo";
import { telHref } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Rajni Goswami, a freelance graphic designer in Sri Ganganagar, by phone, WhatsApp, or the enquiry form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto grid w-full max-w-[90rem] gap-14 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-12 lg:px-12">
      <div className="lg:col-span-5">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-wine">Contact</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.98] tracking-[-0.03em] sm:text-6xl">
          Start a project
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
          {siteConfig.availability}. Call, message on WhatsApp, or send the enquiry form.
        </p>
        <dl className="mt-10 space-y-6 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-wine">Phone</dt>
            <dd className="mt-2">
              <a href={telHref()} className="text-lg hover:text-wine">
                {siteConfig.phone.display}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-wine">WhatsApp</dt>
            <dd className="mt-3">
              <WhatsAppButton>Message on WhatsApp</WhatsAppButton>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-wine">Studio</dt>
            <dd className="mt-2 text-base">{siteConfig.location.display}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-wine">Email</dt>
            <dd className="mt-2 max-w-sm leading-relaxed text-muted">
              {siteConfig.email.isPlaceholder
                ? "A public email address has not been added yet. Until it is, use phone or WhatsApp. The form below will send email only after delivery is configured."
                : (
                  <a href={`mailto:${siteConfig.email.address}`} className="text-ink hover:text-wine">
                    {siteConfig.email.address}
                  </a>
                )}
            </dd>
          </div>
        </dl>
      </div>
      <div id="inquiry" className="lg:col-span-6 lg:col-start-7">
        <h2 className="font-display text-3xl tracking-[-0.03em]">Project enquiry</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          The form emails the studio and sends you a thank-you note. If email is not connected, it
          says so and offers WhatsApp instead. It will not pretend the message was sent.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
