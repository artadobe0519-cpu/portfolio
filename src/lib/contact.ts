import { services } from "../../data/services";
import { siteConfig } from "../../data/site-config";

export const enquiryServices = [
  ...services.map((service) => ({ slug: service.slug, title: service.title })),
  { slug: "not-sure", title: "Not sure yet" },
];

export type ContactFields = {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  companyWebsite: string;
};

export type ContactResult =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "unconfigured" }
  | { status: "invalid"; errors: Partial<Record<keyof ContactFields, string>> }
  | { status: "error" }
  | { status: "rejected" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[\p{L}\s.'-]{2,80}$/u;

export function readContactFields(formData: FormData): ContactFields {
  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    service: String(formData.get("service") ?? "").trim(),
    budget: String(formData.get("budget") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    companyWebsite: String(formData.get("company_website") ?? "").trim(),
  };
}

export function validateContact(fields: ContactFields) {
  const errors: Partial<Record<keyof ContactFields, string>> = {};

  if (!namePattern.test(fields.name)) {
    errors.name = "Enter your name using letters, spaces, or hyphens.";
  }
  if (!emailPattern.test(fields.email) || fields.email.length > 120) {
    errors.email = "Enter a valid email address so a reply is possible.";
  }
  if (!enquiryServices.some((service) => service.slug === fields.service)) {
    errors.service = "Choose a service.";
  }
  if (!siteConfig.budgetRanges.some((range) => range.id === fields.budget)) {
    errors.budget = "Choose a budget range.";
  }
  if (fields.message.length < 20 || fields.message.length > 2000) {
    errors.message = "Describe the project in 20 to 2000 characters.";
  }

  return errors;
}

export function serviceTitle(slug: string) {
  return enquiryServices.find((service) => service.slug === slug)?.title ?? slug;
}

export function budgetLabel(id: string) {
  return siteConfig.budgetRanges.find((range) => range.id === id)?.label ?? id;
}

export function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}
