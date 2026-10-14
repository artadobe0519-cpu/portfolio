import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getSiteUrlOrLocal } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrlOrLocal();
  const paths = ["", "/work", "/about", "/services", "/contact", ...getAllProjects().map((project) => `/work/${project.slug}`)];

  return paths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/work/") ? 0.7 : 0.8,
  }));
}
