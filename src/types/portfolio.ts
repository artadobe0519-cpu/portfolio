export const projectCategories = [
  "branding",
  "logos",
  "social-media",
  "packaging",
  "posters",
  "print-design",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type GalleryAspect = "landscape" | "portrait" | "square" | "wide";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  aspect?: GalleryAspect;
  fit?: "cover" | "contain";
  frame?: "light" | "dark";
};

export type ColorSwatch = {
  name: string;
  hex: string;
};

/**
 * contentStatus
 * - archive: artwork found in the local design archive. The write-up describes the visual work only.
 * - demo: placeholder entry until real artwork and notes are added.
 */
export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  artworkLabel: string;
  shortDescription: string;
  overview: string;
  objective: string;
  approach: string;
  creativeDirection: string;
  palette: ColorSwatch[];
  typographyNotes: string;
  coverImage: GalleryImage;
  gallery: GalleryImage[];
  featured: boolean;
  featuredOrder?: number;
  order: number;
  year: string;
  tags: string[];
  contentStatus: "archive" | "demo";
  /** Hidden projects stay in the admin library and are left off the public site. */
  hidden?: boolean;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  branding: "Branding",
  logos: "Logo Design",
  "social-media": "Social Media",
  packaging: "Packaging",
  posters: "Posters",
  "print-design": "Print",
};
