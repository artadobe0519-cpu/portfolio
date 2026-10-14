import { siteConfig } from "../../../data/site-config";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { telHref } from "@/lib/utils";

export function ContactCTA({
  title = "Tell me what you are building.",
  body = "Selected freelance projects are open. Call, message on WhatsApp, or send a note through the contact page.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto grid w-full max-w-[90rem] gap-8 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-wine">Contact</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] tracking-[-0.03em] sm:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">{body}</p>
        </div>
        <div className="flex flex-col items-start justify-end gap-4 lg:col-span-5">
          <p className="text-sm text-muted">{siteConfig.availability}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">{"Let's Work Together"}</ButtonLink>
            <WhatsAppButton />
            <ButtonLink href={telHref()} variant="secondary">
              {siteConfig.phone.display}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
