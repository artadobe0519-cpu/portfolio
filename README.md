# Rajni Goswami — Portfolio

A portfolio site for Rajni Goswami, graphic designer and visual brand designer in Purani Abadi, Sri Ganganagar, Rajasthan.

The visual system is ivory, charcoal, and wine. Project content lives in `data/`. Public images live in `public/projects/`. The original archive stays in the dated folders under `data/` and is not deleted by the site.

## 1. Install

```bash
npm install
```

## 2. Start the development server

```bash
npm run sync:artwork
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`sync:artwork` is required once, and again whenever you point a project at a new file from the archive. It resizes copies into `public/projects/`. It does not modify the originals.

## 3. How `data/` is organised

| Path | Purpose |
| --- | --- |
| `data/site-config.ts` | Name, phone, location, email placeholder, social links, stats, SEO, process, budget ranges |
| `data/services.ts` | Service copy. No prices. |
| `data/testimonials.ts` | Quotes. The current entries are **demo layout samples**, not real testimonials. |
| `data/projects/<category>/projects.ts` | Portfolio metadata |
| `data/*-20261014T*/` | Original artwork archive (jpg, png, pdf, mp4, zip). Leave these in place. |

Categories: `branding`, `logos`, `social-media`, `packaging`, `posters`, `print-design`.

## 4. Where to put new artwork

1. Keep the original in the archive, or drop a new master file somewhere under `data/` that you control.
2. Add a job to `scripts/sync-artwork.mjs` that copies it to a stable path such as `public/projects/branding/my-project/cover.jpg`.
3. Run `npm run sync:artwork`.

You can also place a finished web image directly in `public/projects/<category>/<slug>/` and skip the script. Use that path in the project entry.

Supported web formats: `.jpg`, `.jpeg`, `.png`, `.webp`.

Not published automatically: `.pdf`, `.mp4`, `.zip`. PDFs and videos in the archive were left out of the site (mixed print masters, motion files, and personal documents). Export a still if you want a video or PDF represented.

Naming: lowercase, hyphens, no spaces. Example: `cover.jpg`, `card-front.jpg`.

## 5. Register a new project

Add an object to the category file, for example `data/projects/logos/projects.ts`.

```ts
{
  id: "studio-mark",
  slug: "studio-mark",
  title: "Studio Mark — Logo",
  category: "logos",
  artworkLabel: "Studio Mark",
  shortDescription: "One sentence about the piece.",
  overview: "What the artwork is.",
  objective: "What the design needed to do. Do not invent results.",
  approach: "How it was composed.",
  creativeDirection: "The visual idea.",
  palette: [{ name: "Ink", hex: "#1C1714" }],
  typographyNotes: "How type is used.",
  coverImage: {
    src: "/projects/logos/studio-mark/cover.jpg",
    alt: "Describe the image, not the filename",
    aspect: "square",
    fit: "contain",
    frame: "light",
  },
  gallery: [
    {
      src: "/projects/logos/studio-mark/cover.jpg",
      alt: "Describe the image, not the filename",
      caption: "Primary logo",
    },
  ],
  featured: false,
  order: 20,
  year: "Undated",
  tags: ["logo"],
  contentStatus: "archive",
}
```

`slug` must be unique. `npm run check:artwork` confirms every image path exists. Unknown slugs return the custom 404 page.

`contentStatus: "archive"` means the file is real archive work and the text is a visual note, not a results case study. Use `"demo"` only for placeholders.

## 6. Feature a project on the homepage

Set `featured: true` and `featuredOrder` to a small number (`1` appears first). The home page reads `getFeaturedProjects()`.

## 7. Change contact details

Edit `data/site-config.ts`.

- Phone display, `tel`, and WhatsApp digits live together. WhatsApp must stay digits only, country code included: `919462101167`.
- Email is a placeholder (`isPlaceholder: true`). The site hides the mailto link until you set a real address and `isPlaceholder: false`.
- Social `href` values are empty on purpose. Fill a real URL to show the link. Do not invent profiles.
- The “30+ happy clients” stat is marked `isDemo: true`. Change the number and set `isDemo` to `false` when the count is verified.

## 8. Canonical domain

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

`metadataBase`, canonical URLs, and absolute social images use this value. On Vercel, `VERCEL_URL` is used when the public URL is not set. No production domain is hardcoded.

Until a real URL is set, local sitemap and robots fall back to `http://localhost:3000`. Set the variable before you launch.

## 9. Contact form delivery

The form validates in the browser and again on the server. A hidden honeypot field drops obvious spam. Nothing is stored on the site.

Email sends through Gmail SMTP when all three variables are set. Put them in `.env`. Do not commit that file.

```bash
SMTP_USER=
SMTP_PASS=
CONTACT_TO_EMAIL=
```

`SMTP_USER` is the Gmail address that sends both messages. `SMTP_PASS` is a Gmail app password. `CONTACT_TO_EMAIL` is the inbox that receives the enquiry. The person who filled the form also gets a thank-you email. If any value is missing, the form does **not** claim success. It explains that email is not connected and offers a WhatsApp link with the enquiry already written. Phone (`tel:+919462101167`) and WhatsApp (`https://wa.me/919462101167`) work without email setup.

## 10. Work library

Open `/admin` to edit projects: titles, categories, write-ups, featured placement, gallery images, and visibility. Sign-in uses `ADMIN_PASSWORD` from `.env`.

Edits are stored in `data/managed/work.json`. The public site reads that file. Hide a project to take it off the site without deleting the artwork. Projects added in the admin can be deleted. Homepage hero projects cannot be hidden.

## 11. Build and deploy

```bash
npm run check:artwork
npm run lint
npm run build
npm start
```

Deploy on Vercel with the environment variables above. Run `sync:artwork` before the build so `public/projects` contains the images, and commit those web copies (or run the script in CI).

## Artwork already connected

The first version uses stills from the local archive:

- Branding: BDS Movers, Bay Lawn Mowing, IT Loop
- Logos: Fusion Kebab, NZ Sikh Games, Pukerimu Nursery, Prime Punjabi Television, 1300 Melbourne Cabs, Easy Cleaning, Bansal Hospital
- Social: Desi Talk podcast thumbnails
- Posters: Sunrise Group study posters (Greece, Spain, New Zealand)
- Print: 21Webs booklet, BK Movers card, My Kiwi Kitchen card, 27 Logics card

Packaging shows the Mountmana Tyres product creatives from the archive. There are no dielines or box files. Personal certificates, award files, and named review videos were not published.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run sync:artwork` | Resize the curated case studies into `public/projects` |
| `npm run index:archive` | Publish the remaining archive images, including zip files |
| `npm run check:artwork` | Fail if a project image path is missing |
| `npm run lint` | ESLint |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
