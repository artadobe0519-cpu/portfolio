import {
  projectCategories,
  type ColorSwatch,
  type GalleryAspect,
  type GalleryImage,
  type Project,
  type ProjectCategory,
} from "@/types/portfolio";

export const heroSlugs = ["sunrise-study-posters", "bay-lawn-mowing", "desi-talk"] as const;

const aspects: GalleryAspect[] = ["landscape", "portrait", "square", "wide"];

export type ProjectOverride = Partial<
  Pick<
    Project,
    | "title"
    | "artworkLabel"
    | "category"
    | "year"
    | "shortDescription"
    | "overview"
    | "objective"
    | "approach"
    | "creativeDirection"
    | "typographyNotes"
    | "tags"
    | "palette"
    | "featured"
    | "featuredOrder"
    | "order"
    | "gallery"
    | "hidden"
  >
>;

export type WorkDraft = {
  slug: string;
  title: string;
  artworkLabel: string;
  category: ProjectCategory;
  year: string;
  shortDescription: string;
  overview: string;
  objective: string;
  approach: string;
  creativeDirection: string;
  typographyNotes: string;
  tags: string;
  featured: boolean;
  featuredOrder: number;
  order: number;
  hidden: boolean;
  palette: ColorSwatch[];
  gallery: GalleryImage[];
};

export function projectToDraft(project: Project): WorkDraft {
  return {
    slug: project.slug,
    title: project.title,
    artworkLabel: project.artworkLabel,
    category: project.category,
    year: project.year,
    shortDescription: project.shortDescription,
    overview: project.overview,
    objective: project.objective,
    approach: project.approach,
    creativeDirection: project.creativeDirection,
    typographyNotes: project.typographyNotes,
    tags: project.tags.join(", "),
    featured: project.featured,
    featuredOrder: project.featuredOrder ?? 99,
    order: project.order,
    hidden: Boolean(project.hidden),
    palette: project.palette.map((swatch) => ({ ...swatch })),
    gallery: project.gallery.map((image) => ({ ...image })),
  };
}

export function emptyDraft(order: number): WorkDraft {
  return {
    slug: "",
    title: "",
    artworkLabel: "",
    category: "branding",
    year: "Undated",
    shortDescription: "",
    overview: "",
    objective: "",
    approach: "",
    creativeDirection: "",
    typographyNotes: "",
    tags: "",
    featured: false,
    featuredOrder: 99,
    order,
    hidden: false,
    palette: [],
    gallery: [],
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function parseTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 12);
}

export function cleanPalette(palette: ColorSwatch[]) {
  return palette
    .map((swatch) => ({ name: swatch.name.trim(), hex: swatch.hex.trim() }))
    .filter((swatch) => swatch.name || swatch.hex);
}

export function sanitizeGallery(gallery: GalleryImage[]) {
  return gallery.map((image) => ({
    src: image.src,
    alt: image.alt.trim().slice(0, 240),
    caption: image.caption?.trim().slice(0, 160) || undefined,
    aspect: aspects.includes(image.aspect ?? "landscape") ? image.aspect : "landscape",
    fit: image.fit === "contain" ? "contain" : "cover",
    frame: image.frame === "dark" ? "dark" : "light",
  })) satisfies GalleryImage[];
}

export function validateDraft(draft: WorkDraft, fileCount: number) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug)) {
    return "Use a slug made of lowercase letters, numbers, and hyphens.";
  }
  if (draft.title.trim().length < 2 || draft.title.trim().length > 140) {
    return "Enter a title of 2 to 140 characters.";
  }
  if (draft.artworkLabel.trim().length < 2 || draft.artworkLabel.trim().length > 80) {
    return "Enter a short artwork label.";
  }
  if (!(projectCategories as readonly string[]).includes(draft.category)) {
    return "Choose a category.";
  }
  if (draft.year.trim().length < 1 || draft.year.trim().length > 40) {
    return "Enter a year, or Undated.";
  }
  if (draft.shortDescription.trim().length < 10 || draft.shortDescription.trim().length > 400) {
    return "Write a short description of at least 10 characters.";
  }
  const longFields = [draft.overview, draft.objective, draft.approach, draft.creativeDirection, draft.typographyNotes];
  if (longFields.some((field) => field.length > 4000)) {
    return "One of the longer notes is over 4000 characters.";
  }
  if (draft.hidden && (heroSlugs as readonly string[]).includes(draft.slug)) {
    return "This project is used on the homepage, so it cannot be hidden.";
  }
  if (!Number.isInteger(draft.order) || draft.order < 0 || draft.order > 9999) {
    return "Order must be a whole number from 0 to 9999.";
  }
  if (!Number.isInteger(draft.featuredOrder) || draft.featuredOrder < 1 || draft.featuredOrder > 99) {
    return "Featured order must be a whole number from 1 to 99.";
  }
  for (const image of draft.gallery) {
    if (!image.src.startsWith("/projects/") || image.src.includes("..") || image.src.includes("\\")) {
      return "An image path is not valid.";
    }
  }
  if (draft.gallery.length + fileCount < 1) {
    return "Add at least one image.";
  }
  for (const swatch of cleanPalette(draft.palette)) {
    if (!swatch.name || !/^#([0-9a-fA-F]{6})$/.test(swatch.hex)) {
      return "Each colour needs a name and a hex value like #722F37.";
    }
  }
  return null;
}
