import type { GalleryImage } from "@/types/portfolio";

export function image(
  src: string,
  alt: string,
  options: Partial<Omit<GalleryImage, "src" | "alt">> = {},
): GalleryImage {
  return {
    fit: "contain",
    frame: "light",
    aspect: "landscape",
    src,
    alt,
    ...options,
  };
}
