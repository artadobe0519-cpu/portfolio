import type { Project } from "@/types/portfolio";
import { image } from "../helpers";

/**
 * Print pieces from the local archive: booklets and business cards.
 */
export const printProjects: Project[] = [
  {
    id: "21webs",
    slug: "21webs-booklet",
    title: "21Webs — Service Booklet",
    category: "print-design",
    artworkLabel: "21Webs",
    shortDescription:
      "A yellow and charcoal booklet for a dental-clinic web studio.",
    overview:
      "Cover and interior spreads for a 21Webs service booklet. The cover splits a yellow brand panel from a clinic photograph. Interior pages continue the same yellow, charcoal, and navy relationship.",
    objective:
      "Introduce the studio and its offer in a piece that can be printed and handed to a clinic.",
    approach:
      "The cover puts the wordmark on a flat colour field and the promise over the photograph. Contact details and a QR code stay on the colour side so the photo is not asked to carry small type.",
    creativeDirection:
      "Clean and clinical, with one strong colour. Yellow does the branding. The photograph does the context.",
    palette: [
      { name: "Signal yellow", hex: "#F5C518" },
      { name: "Charcoal", hex: "#5C5346" },
      { name: "Navy", hex: "#1F2A44" },
      { name: "White", hex: "#FFFFFF" },
    ],
    typographyNotes:
      "Geometric sans. The W in 21Webs is the only letter in yellow when the word sits on charcoal. Cover headlines are a regular-weight sans, not a display face.",
    coverImage: image(
      "/projects/print-design/21webs/cover.jpg",
      "21Webs booklet cover with a yellow brand panel and a dental clinic photograph",
      { aspect: "landscape", fit: "cover", caption: "Front and back cover" },
    ),
    gallery: [
      image(
        "/projects/print-design/21webs/cover.jpg",
        "21Webs booklet cover with a yellow brand panel and a dental clinic photograph",
        { aspect: "landscape", fit: "cover", caption: "Front and back cover" },
      ),
      image(
        "/projects/print-design/21webs/spread-1.jpg",
        "Opening interior spread of the 21Webs booklet",
        { aspect: "landscape", fit: "cover", caption: "Interior spread" },
      ),
      image(
        "/projects/print-design/21webs/spread-2.jpg",
        "Middle interior spread of the 21Webs booklet",
        { aspect: "landscape", fit: "cover", caption: "Interior spread" },
      ),
      image(
        "/projects/print-design/21webs/spread-3.jpg",
        "Later interior spread of the 21Webs booklet",
        { aspect: "landscape", fit: "cover", caption: "Interior spread" },
      ),
    ],
    featured: true,
    featuredOrder: 2,
    order: 6,
    year: "Undated",
    tags: ["print", "booklet", "brochure"],
    contentStatus: "archive",
  },
  {
    id: "bk-movers",
    slug: "bk-movers",
    title: "BK Movers — Business Card",
    category: "print-design",
    artworkLabel: "BK Movers",
    shortDescription: "A blue card with a New Zealand map cut into the wordmark.",
    overview:
      "Business card for BK Movers. The front is a blue field with a soft wave and the wordmark in white. The back splits contact details from a smaller repeat of the logo.",
    objective:
      "Make a moving company card that feels local to New Zealand and stays simple enough to print cleanly.",
    approach:
      "The map of New Zealand replaces a letterform in the wordmark, so the place is in the name rather than in a separate icon. Stars sit above the word as a small constellation.",
    creativeDirection:
      "Calm and corporate. One blue, white, and a little charcoal. No truck illustration on this piece.",
    palette: [
      { name: "Movers blue", hex: "#0B4FBF" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Charcoal", hex: "#333333" },
    ],
    typographyNotes:
      "Bold condensed sans for BK MOVERS. The back uses a smaller regular sans for the contact column, with a hairline dividing logo and details.",
    coverImage: image(
      "/projects/print-design/bk-movers/card.jpg",
      "BK Movers business card, blue front and white contact back",
      { aspect: "portrait", caption: "Front and back" },
    ),
    gallery: [
      image(
        "/projects/print-design/bk-movers/card.jpg",
        "BK Movers business card, blue front and white contact back",
        { aspect: "portrait", caption: "Front and back" },
      ),
    ],
    featured: false,
    order: 14,
    year: "Undated",
    tags: ["print", "business card", "transport"],
    contentStatus: "archive",
  },
  {
    id: "my-kiwi-kitchen",
    slug: "my-kiwi-kitchen",
    title: "My Kiwi Kitchen — Business Card",
    category: "print-design",
    artworkLabel: "My Kiwi Kitchen",
    shortDescription:
      "A pale card for a bespoke kitchen studio, set over a room photograph.",
    overview:
      "Business card artwork for My Kiwi Kitchen, a bespoke kitchen design and build studio. A white panel holds a boxed wordmark and a short contact column, laid over a bright kitchen interior.",
    objective:
      "Let the kitchens speak, and keep the card itself quiet.",
    approach:
      "The photograph is faded back so the type stays readable. A single blue rule divides the name from the contact lines.",
    creativeDirection:
      "Light, architectural, and unforced. Blue type on white, with the interior doing the warmth.",
    palette: [
      { name: "Kitchen blue", hex: "#2E9BDB" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Soft grey", hex: "#E6E6E6" },
    ],
    typographyNotes:
      "Bold sans for the name, with a very small tracked line for “Bespoke kitchen design & build”. Contact lines are a regular weight of the same family.",
    coverImage: image(
      "/projects/print-design/my-kiwi-kitchen/card.jpg",
      "My Kiwi Kitchen business card over a bright kitchen interior",
      { aspect: "landscape", fit: "cover", caption: "Business card" },
    ),
    gallery: [
      image(
        "/projects/print-design/my-kiwi-kitchen/card.jpg",
        "My Kiwi Kitchen business card over a bright kitchen interior",
        { aspect: "landscape", fit: "cover", caption: "Business card" },
      ),
    ],
    featured: false,
    order: 15,
    year: "Undated",
    tags: ["print", "business card", "interiors"],
    contentStatus: "archive",
  },
  {
    id: "27-logics",
    slug: "27-logics",
    title: "27 Logics — Business Card",
    category: "print-design",
    artworkLabel: "27 Logics",
    shortDescription:
      "A black and blush card for a digital marketing company and institute.",
    overview:
      "Business card for 27 Logics. A blush side band carries the name vertically. The black field holds a large wordmark, a role line, and contact details in white.",
    objective:
      "Fit a company name, a person, and a full address on one card without shrinking everything to the same size.",
    approach:
      "The company name is the largest line. The person and role step down. Icons mark phone, web, email, and address so the block can be scanned.",
    creativeDirection:
      "Dark, textured, and institutional. A narrow pink rule is the only accent on the black field.",
    palette: [
      { name: "Black", hex: "#161616" },
      { name: "Blush", hex: "#E7E2E4" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Pink rule", hex: "#E07A9A" },
    ],
    typographyNotes:
      "Heavy sans for 27 LOGICS. The side band uses the same wordmark turned vertically, with a small node icon beneath it.",
    coverImage: image(
      "/projects/print-design/27-logics/card.jpg",
      "27 Logics business card with a black field and a vertical name band",
      { aspect: "landscape", fit: "cover", caption: "Business card" },
    ),
    gallery: [
      image(
        "/projects/print-design/27-logics/card.jpg",
        "27 Logics business card with a black field and a vertical name band",
        { aspect: "landscape", fit: "cover", caption: "Business card" },
      ),
    ],
    featured: false,
    order: 16,
    year: "Undated",
    tags: ["print", "business card", "education"],
    contentStatus: "archive",
  },
];
