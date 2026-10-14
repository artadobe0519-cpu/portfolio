import { siteConfig } from "../../data/site-config";
import type { GalleryAspect } from "@/types/portfolio";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function aspectClass(aspect: GalleryAspect = "landscape") {
  switch (aspect) {
    case "portrait":
      return "aspect-[3/4]";
    case "square":
      return "aspect-square";
    case "wide":
      return "aspect-[2/1]";
    default:
      return "aspect-[4/3]";
  }
}

export function telHref() {
  return `tel:${siteConfig.phone.tel}`;
}

export function whatsappHref(
  message = `Hello ${siteConfig.name}, I would like to discuss a design project.`,
) {
  return `https://wa.me/${siteConfig.phone.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function configuredSocials() {
  return siteConfig.social.filter((item) => item.href.trim().length > 0);
}

export function enquiryWhatsappMessage(fields: {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}) {
  return [
    `Hello ${siteConfig.name}, I would like to enquire about a design project.`,
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Service: ${fields.service}`,
    `Budget: ${fields.budget}`,
    "",
    fields.message,
  ].join("\n");
}
