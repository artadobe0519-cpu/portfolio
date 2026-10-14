import { mkdir, rm, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { GalleryImage } from "@/types/portfolio";

const types = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

export function resolveManagedImage(slug: string, src: string) {
  const prefix = `/projects/managed/${slug}/`;
  if (!src.startsWith(prefix)) return null;
  const name = src.slice(prefix.length);
  if (!/^[a-z0-9][a-z0-9.-]*\.(?:jpg|png|webp)$/i.test(name) || name.includes("..")) return null;
  return path.join(process.cwd(), "public", "projects", "managed", slug, name);
}

export async function storeUploads(slug: string, files: File[], title: string) {
  if (files.length > 12) {
    throw new Error("Upload up to 12 images at a time.");
  }
  const dir = path.join(process.cwd(), "public", "projects", "managed", slug);
  await mkdir(dir, { recursive: true });
  const saved: GalleryImage[] = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const ext = types.get(file.type);
    if (!ext) throw new Error("Use JPG, PNG, or WebP images.");
    if (file.size > 15 * 1024 * 1024) throw new Error("Each image must be 15 MB or smaller.");
    const filename = `${Date.now()}-${index}${ext === ".png" ? ".png" : ".jpg"}`;
    const pipeline = sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: false })
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true });
    if (ext === ".png") await pipeline.png({ compressionLevel: 9 }).toFile(path.join(dir, filename));
    else await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(dir, filename));
    saved.push({
      src: `/projects/managed/${slug}/${filename}`,
      alt: `${title} artwork`,
      aspect: "landscape",
      fit: "cover",
      frame: "light",
    });
  }

  return saved;
}

export async function removeManagedImages(slug: string, srcs: string[]) {
  await Promise.all(
    srcs.map(async (src) => {
      const file = resolveManagedImage(slug, src);
      if (!file) return;
      await unlink(file).catch(() => undefined);
    }),
  );
}

export async function removeManagedFolder(slug: string) {
  await rm(path.join(process.cwd(), "public", "projects", "managed", slug), { recursive: true, force: true });
}
