import Link from "next/link";
import { siteConfig } from "../../../data/site-config";
import { configuredSocials, telHref, whatsappHref } from "@/lib/utils";

export function SiteFooter() {
  const socials = configuredSocials();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 px-5 py-16 md:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <p className="font-display text-4xl tracking-[-0.03em]">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {siteConfig.profession}. {siteConfig.availability}.
          </p>
        </div>
        <div className="lg:col-span-3">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-wine">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-wine">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-wine">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{siteConfig.location.display}</li>
            <li>
              <a href={telHref()} className="hover:text-wine">
                {siteConfig.phone.display}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} className="hover:text-wine" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li className="text-muted">
              {siteConfig.email.isPlaceholder
                ? "Email address to be added in the site configuration."
                : (
                  <a href={`mailto:${siteConfig.email.address}`} className="text-ink hover:text-wine">
                    {siteConfig.email.address}
                  </a>
                )}
            </li>
          </ul>
          {socials.length ? (
            <ul className="mt-6 flex flex-wrap gap-4 text-sm">
              {socials.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="hover:text-wine" target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm text-muted">
              Social profiles can be added in the site configuration.
            </p>
          )}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:justify-between md:px-8 lg:px-12">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}
          </p>
          <p>Graphic designer in Sri Ganganagar, Rajasthan</p>
        </div>
      </div>
    </footer>
  );
}
