import type { MetadataRoute } from "next";
import { getSiteUrlOrLocal } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${getSiteUrlOrLocal()}/sitemap.xml`,
  };
}
