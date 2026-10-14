/**
 * Confirm every /projects/... image referenced in the site exists in public/.
 * Usage: npm run check:artwork
 */
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const roots = [path.join(root, "data", "projects"), path.join(root, "data", "generated"), path.join(root, "src")];
const pattern = /\/projects\/[a-z0-9/_-]+\.(?:jpg|jpeg|png|webp)/g;

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (/\.(ts|tsx|mjs|js|json)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const files = [];
for (const dir of roots) files.push(...(await walk(dir)));

const referenced = new Set();
for (const file of files) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(pattern)) referenced.add(match[0]);
}

const missing = [];
for (const src of referenced) {
  try {
    await access(path.join(root, "public", src));
  } catch {
    missing.push(src);
  }
}

console.log(`Checked ${referenced.size} artwork paths.`);
if (missing.length) {
  console.error("Missing public files. Run npm run sync:artwork or add the file:");
  for (const src of missing) console.error(`  public${src}`);
  process.exit(1);
}

console.log("Every referenced artwork file is present.");
