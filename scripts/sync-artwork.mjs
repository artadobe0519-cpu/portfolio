/**
 * Copy supported artwork from the local archive into public/projects.
 *
 * Originals stay in data/. This script writes web-sized JPEG or PNG files
 * that Next.js can serve. PDF, MP4, and ZIP files are skipped on purpose.
 *
 * Usage: npm run sync:artwork
 */
import { access, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const logo = "data/logo-20261014T034343Z-1-001/logo";
const brochure = "data/brochure-20261014T034334Z-1-001/brochure";
const cards = "data/business card-20261014T034337Z-1-001/business card";
const posts = "data/post-20261014T034344Z-1-001/post";
const thumbs = "data/thumbnail-20261014T034347Z-1-001/thumbnail";
const booklet = "data/booklet-20261014T034335Z-1-001/booklet";
const banners = "data/web banner-20261014T034351Z-1-001/web banner";

/** @type {{ from: string, to: string, format: "jpeg" | "png" }[]} */
const jobs = [
  { from: `${logo}/RED BDS MOVERS logo.png`, to: "public/projects/branding/bds-movers/logo.png", format: "png" },
  { from: `${logo}/RED white BDS MOVERS logo.png`, to: "public/projects/branding/bds-movers/logo-reverse.png", format: "png" },
  { from: `${brochure}/BDS BRUCHURE PAGE 1.jpg`, to: "public/projects/branding/bds-movers/brochure-1.jpg", format: "jpeg" },
  { from: `${brochure}/BDS BRUCHURE PAGE 2.jpg`, to: "public/projects/branding/bds-movers/brochure-2.jpg", format: "jpeg" },
  { from: `${brochure}/BDS BRUCHURE PAGE 3.jpg`, to: "public/projects/branding/bds-movers/brochure-3.jpg", format: "jpeg" },
  { from: `${cards}/business card bds.jpg`, to: "public/projects/branding/bds-movers/card-front.jpg", format: "jpeg" },
  { from: `${cards}/business card bds BACK.jpg`, to: "public/projects/branding/bds-movers/card-back.jpg", format: "jpeg" },
  { from: `${logo}/bay lawn logo.jpg`, to: "public/projects/branding/bay-lawn/logo.jpg", format: "jpeg" },
  { from: `${cards}/bay lawn mowing business card (6).jpg`, to: "public/projects/branding/bay-lawn/card-1.jpg", format: "jpeg" },
  { from: `${cards}/bay lawn mowing business card (7).jpg`, to: "public/projects/branding/bay-lawn/card-2.jpg", format: "jpeg" },
  { from: `${banners}/it loop fb cover.jpg`, to: "public/projects/branding/it-loop/cover.jpg", format: "jpeg" },
  { from: `${logo}/it loop logo2.jpg`, to: "public/projects/branding/it-loop/logo.jpg", format: "jpeg" },
  { from: `${thumbs}/1.jpg`, to: "public/projects/social-media/desi-talk/daily-podcast.jpg", format: "jpeg" },
  { from: `${thumbs}/3.jpg`, to: "public/projects/social-media/desi-talk/ready-for-talks.jpg", format: "jpeg" },
  { from: `${thumbs}/5.jpg`, to: "public/projects/social-media/desi-talk/split-cover.jpg", format: "jpeg" },
  { from: `${posts}/greece study visa.jpg`, to: "public/projects/posters/study-abroad/greece.jpg", format: "jpeg" },
  { from: `${posts}/spain study visa.jpg`, to: "public/projects/posters/study-abroad/spain.jpg", format: "jpeg" },
  { from: `${posts}/new zealand study visa.jpg`, to: "public/projects/posters/study-abroad/new-zealand.jpg", format: "jpeg" },
  { from: `${booklet}/21webs booklet front n back page.jpg`, to: "public/projects/print-design/21webs/cover.jpg", format: "jpeg" },
  { from: `${booklet}/21webs booklet 1,2 page.jpg`, to: "public/projects/print-design/21webs/spread-1.jpg", format: "jpeg" },
  { from: `${booklet}/21webs booklet 3,4 page.jpg`, to: "public/projects/print-design/21webs/spread-2.jpg", format: "jpeg" },
  { from: `${booklet}/21webs booklet 5,6 page.jpg`, to: "public/projects/print-design/21webs/spread-3.jpg", format: "jpeg" },
  { from: `${logo}/Fusion kebab 4.jpg`, to: "public/projects/logos/fusion-kebab/logo.jpg", format: "jpeg" },
  { from: `${logo}/nz sikh marathon logo.png`, to: "public/projects/logos/nz-sikh-games/logo.png", format: "png" },
  { from: `${logo}/pukerimu nursery and landscape logo 1.jpg`, to: "public/projects/logos/pukerimu-nursery/logo.jpg", format: "jpeg" },
  { from: `${logo}/prime punjabi tv 5.jpg`, to: "public/projects/logos/prime-punjabi-tv/logo.jpg", format: "jpeg" },
  { from: `${logo}/1300 melbourne taxi concept 5.jpg`, to: "public/projects/logos/melbourne-taxi/concept-5.jpg", format: "jpeg" },
  { from: `${logo}/1300 melbourne taxi concept 4_page-0001.jpg`, to: "public/projects/logos/melbourne-taxi/concept-4.jpg", format: "jpeg" },
  { from: `${logo}/1300 melbourne taxi concept 3.2_page-0001.jpg`, to: "public/projects/logos/melbourne-taxi/concept-3.jpg", format: "jpeg" },
  { from: `${logo}/logo eazy cleaning.png`, to: "public/projects/logos/easy-cleaning/logo.png", format: "png" },
  { from: `${logo}/bansal hospital logo.png`, to: "public/projects/logos/bansal-hospital/mark.png", format: "png" },
  { from: `${cards}/bk movers business card.jpg`, to: "public/projects/print-design/bk-movers/card.jpg", format: "jpeg" },
  { from: `${cards}/MY KIWI KITCHEN BUSINESS CARD 2.1.jpg`, to: "public/projects/print-design/my-kiwi-kitchen/card.jpg", format: "jpeg" },
  { from: `${cards}/business card 27 logics.jpg`, to: "public/projects/print-design/27-logics/card.jpg", format: "jpeg" },
];

export { jobs };

const invoked = process.argv[1] ? path.resolve(process.argv[1]) : "";
const self = fileURLToPath(import.meta.url);
const isDirectRun = invoked && path.normalize(invoked).toLowerCase() === path.normalize(self).toLowerCase();

if (!isDirectRun) {
  // Imported by the archive indexer so it can skip files already published.
} else {
await publishCuratedArtwork();
}

async function publishCuratedArtwork() {
const missing = [];

for (const job of jobs) {
  const source = path.join(root, job.from);
  const target = path.join(root, job.to);
  try {
    await access(source);
  } catch {
    missing.push(job.from);
    continue;
  }

  await mkdir(path.dirname(target), { recursive: true });
  const before = (await stat(source)).size;
  const pipeline = sharp(source).rotate().resize({
    width: job.format === "png" ? 1600 : 2000,
    height: job.format === "png" ? 1600 : 2000,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (job.format === "png") {
    await pipeline.png({ compressionLevel: 9 }).toFile(target);
  } else {
    await pipeline.jpeg({ quality: 84, mozjpeg: true }).toFile(target);
  }

  const after = (await stat(target)).size;
  console.log(
    `${job.to}  ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`,
  );
}

if (missing.length) {
  console.error("\nMissing source files:");
  for (const file of missing) console.error(`  ${file}`);
  process.exit(1);
}

console.log(`\nSynced ${jobs.length} artwork files into public/projects.`);
}
