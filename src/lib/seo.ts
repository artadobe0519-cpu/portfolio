import type { Metadata } from "next";
import { siteConfig } from "../../data/site-config";

/**
 * A real canonical origin.
 * Uses NEXT_PUBLIC_SITE_URL when set, otherwise the Vercel deployment host.
 * Returns undefined when neither exists so metadataBase is not invented.
 */
export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  return undefined;
}

/** Sitemap and robots need an absolute URL even during local builds. */
export function getSiteUrlOrLocal() {
  return getSiteUrl() ?? "http://localhost:3000";
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildJsonLd() {
  const url = getSiteUrl();
  const sameAs = siteConfig.social
    .map((item) => item.href.trim())
    .filter((href) => href.length > 0);

  const address = {
    "@type": "PostalAddress",
    addressLocality: `${siteConfig.location.area}, ${siteConfig.location.city}`,
    addressRegion: siteConfig.location.state,
    addressCountry: "IN",
  };

  const person: Record<string, unknown> = {
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.profession,
    telephone: siteConfig.phone.tel,
    address,
    knowsAbout: [
      "Graphic design",
      "Brand identity",
      "Logo design",
      "Social media design",
      "Packaging design",
      "Poster design",
      "Print design",
    ],
  };

  if (!siteConfig.email.isPlaceholder) {
    person.email = siteConfig.email.address;
  }
  if (url) person.url = url;
  if (sameAs.length) person.sameAs = sameAs;

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.seo.description,
    inLanguage: "en-IN",
  };
  if (url) website.url = url;

  const practice: Record<string, unknown> = {
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.seo.description,
    telephone: siteConfig.phone.tel,
    areaServed: siteConfig.location.display,
    address,
  };
  if (url) practice.url = url;

  return {
    "@context": "https://schema.org",
    "@graph": [website, person, practice],
  };
}

export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  return {
    title,
    description,
    alternates: siteUrl ? { canonical: path } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: siteUrl ? path : undefined,
      siteName: siteConfig.name,
      locale: "en_IN",
      images: image && siteUrl ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image && siteUrl ? [image] : undefined,
    },
    robots: { index: true, follow: true },
  };
}
