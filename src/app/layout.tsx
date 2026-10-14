import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Outfit } from "next/font/google";
import { siteConfig } from "../../data/site-config";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  keywords: [...siteConfig.seo.keywords],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f3eee6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="flex min-h-screen flex-col bg-ivory font-sans text-ink antialiased">
        <SiteFrame jsonLd={<JsonLd />}>{children}</SiteFrame>
      </body>
    </html>
  );
}
