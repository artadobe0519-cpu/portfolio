/**
 * Publish every remaining archive image (folders and zip files) into the portfolio.
 * Curated case-study files listed in sync-artwork.mjs are skipped so they are not duplicated.
 *
 * Usage: npm run index:archive
 */
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import AdmZip from "adm-zip";
import sharp from "sharp";
import { jobs } from "./sync-artwork.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageExt = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const alreadyPublished = new Set(jobs.map((job) => normalize(job.from)));

const collections = {
  "logo-archive": {
    category: "logos",
    title: "Logo Archive",
    label: "Logo archive",
    summary: "The remaining logo files from the local archive.",
    aspect: "square",
    fit: "contain",
  },
  "business-card-archive": {
    category: "print-design",
    title: "Business Card Archive",
    label: "Business cards",
    summary: "Business card artwork from the archive that sits outside the individual case studies.",
    aspect: "landscape",
    fit: "contain",
  },
  "print-archive": {
    category: "print-design",
    title: "Brochures and Booklets",
    label: "Print archive",
    summary: "Brochure, booklet, and checklist pages from the archive.",
    aspect: "landscape",
    fit: "cover",
  },
  "thumbnail-archive": {
    category: "social-media",
    title: "Thumbnail Archive",
    label: "Thumbnails",
    summary: "Additional thumbnail artwork from the archive.",
    aspect: "wide",
    fit: "cover",
  },
  "web-banner-archive": {
    category: "posters",
    title: "Web Banner Archive",
    label: "Web banners",
    summary: "Web banner artwork from the archive.",
    aspect: "wide",
    fit: "cover",
  },
  "social-post-archive": {
    category: "social-media",
    title: "Social Post Archive",
    label: "Social posts",
    summary: "Social post artwork from the archive.",
    aspect: "square",
    fit: "cover",
  },
  "my-kiwi-kitchen-social": {
    category: "social-media",
    title: "My Kiwi Kitchen — Social Set",
    label: "My Kiwi Kitchen",
    summary: "Social creatives for My Kiwi Kitchen, taken from the archive zip.",
    aspect: "square",
    fit: "cover",
  },
  "mountmana-tyres": {
    category: "packaging",
    title: "Mountmana Tyres — Product Creatives",
    label: "Mountmana Tyres",
    summary: "Product promotion layouts for Mountmana Tyres from the archive. These are product creatives, not a measured packaging case study.",
    aspect: "square",
    fit: "cover",
  },
  "nz-sikh-games-posts": {
    category: "posters",
    title: "NZ Sikh Games — Campaign Posts",
    label: "NZ Sikh Games",
    summary: "Campaign posts for the NZ Sikh Games from the archive zip.",
    aspect: "square",
    fit: "cover",
  },
  "waikato-blood-donation": {
    category: "posters",
    title: "Waikato Warriors — Donation Posters",
    label: "Waikato Warriors",
    summary: "Blood donation posters for Waikato Warriors from the archive.",
    aspect: "portrait",
    fit: "cover",
  },
  "archive-stills": {
    category: "social-media",
    title: "Additional Archive Stills",
    label: "Archive stills",
    summary: "Other still images found in the local archive.",
    aspect: "landscape",
    fit: "cover",
  },
};

function normalize(value) {
  return value.replace(/\\/g, "/").replace(/^\.\//, "");
}

function classify(relativePath) {
  const value = relativePath.toLowerCase();
  if (value.includes("mountmana")) return "mountmana-tyres";
  if (value.includes("my kiwi kitchen.zip")) return "my-kiwi-kitchen-social";
  if (value.includes("nz sikh games.zip")) return "nz-sikh-games-posts";
  if (value.includes("waikato")) return "waikato-blood-donation";
  if (value.includes("/logo/")) return "logo-archive";
  if (value.includes("business card")) return "business-card-archive";
  if (value.includes("/booklet/") || value.includes("/brochure/") || value.includes("/checklist/")) {
    return "print-archive";
  }
  if (value.includes("/thumbnail/")) return "thumbnail-archive";
  if (value.includes("web banner")) return "web-banner-archive";
  if (value.includes("/post/")) return "social-post-archive";
  return "archive-stills";
}

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "projects" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else files.push(full);
  }
  return files;
}

/** @type {{ key: string, name: string, ext: string, file?: string, zip?: string, entry?: string }[]} */
const incoming = [];

const archiveRoot = path.join(root, "data");
const files = await walk(archiveRoot);
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const relative = normalize(path.relative(root, file));
  if (relative.startsWith("data/projects/") || relative.startsWith("data/generated/")) continue;
  if (alreadyPublished.has(relative)) continue;

  if (ext === ".zip") {
    const zip = new AdmZip(file);
    for (const entry of zip.getEntries()) {
      if (entry.isDirectory) continue;
      const entryExt = path.extname(entry.entryName).toLowerCase();
      if (!imageExt.has(entryExt)) continue;
      incoming.push({
        key: `${relative}/${entry.entryName}`,
        name: path.basename(entry.entryName),
        ext: entryExt,
        zip: file,
        entry: entry.entryName,
      });
    }
    continue;
  }

  if (!imageExt.has(ext)) continue;
  incoming.push({
    key: relative,
    name: path.basename(file),
    ext,
    file,
  });
}

const grouped = new Map();
for (const item of incoming) {
  const id = classify(item.key);
  const list = grouped.get(id) ?? [];
  list.push(item);
  grouped.set(id, list);
}

const zipCache = new Map();

function readSource(item) {
  if (item.file) return readFile(item.file);
  let zip = zipCache.get(item.zip);
  if (!zip) {
    zip = new AdmZip(item.zip);
    zipCache.set(item.zip, zip);
  }
  const entry = zip.getEntry(item.entry);
  if (!entry) throw new Error(`Missing zip entry ${item.entry} in ${item.zip}`);
  return entry.getData();
}

const projects = [];
let order = 200;

for (const [id, items] of grouped) {
  const meta = collections[id];
  items.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const chunks = [];
  const size = 36;
  for (let index = 0; index < items.length; index += size) chunks.push(items.slice(index, index + size));

  for (let part = 0; part < chunks.length; part += 1) {
    const slug = chunks.length > 1 ? `${id}-${part + 1}` : id;
    const title = chunks.length > 1 ? `${meta.title} ${part + 1}` : meta.title;
    const folder = path.join(root, "public", "projects", meta.category, slug);
    await mkdir(folder, { recursive: true });
    const gallery = [];

    for (let imageIndex = 0; imageIndex < chunks[part].length; imageIndex += 1) {
      const item = chunks[part][imageIndex];
      const filename = `${String(imageIndex + 1).padStart(3, "0")}${item.ext === ".png" ? ".png" : ".jpg"}`;
      const target = path.join(folder, filename);
      let source;
      try {
        source = await readSource(item);
        const pipeline = sharp(source, { limitInputPixels: false }).rotate().resize({
          width: 1400,
          height: 1400,
          fit: "inside",
          withoutEnlargement: true,
        });
        if (item.ext === ".png") await pipeline.png({ compressionLevel: 9 }).toFile(target);
        else await pipeline.jpeg({ quality: 78, mozjpeg: true }).toFile(target);
      } catch (error) {
        console.warn(`Skipped ${item.key}: ${error instanceof Error ? error.message : error}`);
        continue;
      }

      const src = `/projects/${meta.category}/${slug}/${filename}`;
      gallery.push({
        src,
        alt: `${meta.label} archive artwork, ${item.name.replace(/\.[^.]+$/, "")}`,
        caption: item.name.replace(/\.[^.]+$/, ""),
        aspect: meta.aspect,
        fit: meta.fit,
        frame: "light",
      });
    }

    if (!gallery.length) continue;

    projects.push({
      id: slug,
      slug,
      title,
      category: meta.category,
      artworkLabel: meta.label,
      shortDescription: meta.summary,
      overview: `${meta.summary} ${gallery.length} images from the local data archive are shown here.`,
      objective: "Keep this set available in the portfolio so the archive can be browsed in one place.",
      approach: "The files are published in their archive grouping, with neutral captions taken from the original filenames.",
      creativeDirection: "Archive set. Notes describe the source grouping, not a measured result.",
      palette: [],
      typographyNotes: "Type notes have not been written separately for this archive set.",
      coverImage: gallery[0],
      gallery,
      featured: false,
      order: order++,
      year: "Undated",
      tags: ["archive", meta.category],
      contentStatus: "archive",
    });
    console.log(`${slug}  ${gallery.length} images`);
  }
}

const output = path.join(root, "data", "generated", "archive-projects.json");
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, JSON.stringify(projects));

const counts = {};
for (const project of projects) counts[project.category] = (counts[project.category] ?? 0) + 1;
console.log(`\nWrote ${projects.length} archive projects.`);
console.log(counts);
