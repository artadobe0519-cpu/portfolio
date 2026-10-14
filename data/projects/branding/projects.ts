import type { Project } from "@/types/portfolio";
import { image } from "../helpers";

/**
 * Brand identity pieces found in the local design archive.
 * Descriptions cover the visual work only. They are not measured case studies.
 */
export const brandingProjects: Project[] = [
  {
    id: "bds-movers",
    slug: "bds-movers",
    title: "BDS Movers — Brand System",
    category: "branding",
    artworkLabel: "BDS Movers",
    shortDescription:
      "A red truck emblem extended across a brochure and business cards.",
    overview:
      "An identity system for BDS Movers built around a front-three-quarter truck emblem. The mark is carried onto a brochure cover and a two-sided business card, using the same red, charcoal, and white relationship throughout.",
    objective:
      "Give a moving company a mark that reads as transport at a glance, then repeat it on the print pieces a customer would actually hold.",
    approach:
      "The emblem sits in a badge with a heavy baseline and a red nameplate. Brochure and card layouts keep the truck large, then place contact details in a simple column so the mark does the introduction.",
    creativeDirection:
      "Bold, roadside, and high contrast. The truck is illustrated rather than photographed, so it stays crisp on a card and a brochure cover.",
    palette: [
      { name: "Signal red", hex: "#E10600" },
      { name: "Charcoal", hex: "#1A1A1A" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Warm grey", hex: "#8A8A8A" },
    ],
    typographyNotes:
      "Block lettering for the initials, with a heavier white wordmark on the red plate. The cards use a plain sans for the contact lines so they stay secondary to the emblem.",
    coverImage: image(
      "/projects/branding/bds-movers/brochure-1.jpg",
      "BDS Movers brochure cover with a red semi-truck emblem and burgundy wave bands",
      { aspect: "landscape", caption: "Brochure cover" },
    ),
    gallery: [
      image(
        "/projects/branding/bds-movers/brochure-1.jpg",
        "BDS Movers brochure cover with a red semi-truck emblem and burgundy wave bands",
        { aspect: "landscape", caption: "Brochure cover" },
      ),
      image(
        "/projects/branding/bds-movers/logo.png",
        "BDS Movers logo: a red semi-truck inside a black and red badge",
        { aspect: "square", frame: "dark", caption: "Primary emblem" },
      ),
      image(
        "/projects/branding/bds-movers/logo-reverse.png",
        "Alternate BDS Movers logo lockup in red and white",
        { aspect: "square", caption: "Alternate lockup" },
      ),
      image(
        "/projects/branding/bds-movers/brochure-2.jpg",
        "Interior page from the BDS Movers brochure",
        { aspect: "landscape", caption: "Brochure interior" },
      ),
      image(
        "/projects/branding/bds-movers/brochure-3.jpg",
        "Further interior page from the BDS Movers brochure",
        { aspect: "landscape", caption: "Brochure interior" },
      ),
      image(
        "/projects/branding/bds-movers/card-front.jpg",
        "BDS Movers business card with the truck emblem beside a dark contact panel",
        { aspect: "wide", caption: "Business card" },
      ),
      image(
        "/projects/branding/bds-movers/card-back.jpg",
        "Reverse of the BDS Movers business card",
        { aspect: "wide", caption: "Card reverse" },
      ),
    ],
    featured: true,
    featuredOrder: 1,
    order: 1,
    year: "Undated",
    tags: ["identity", "logo", "brochure", "business card", "transport"],
    contentStatus: "archive",
  },
  {
    id: "bay-lawn",
    slug: "bay-lawn-mowing",
    title: "Bay Lawn Mowing — Identity",
    category: "branding",
    artworkLabel: "Bay Lawn Mowing Service",
    shortDescription:
      "A lawn-and-sun emblem with matching service business cards.",
    overview:
      "Identity artwork for Bay Lawn Mowing Service. A mower, pressure-washer lance, and setting sun form the mark, with the name set in a heavy olive wordmark and a lighter service line underneath.",
    objective:
      "Make a lawn-care service recognisable in a single illustration, then carry that illustration onto cards.",
    approach:
      "The scene is drawn as one compact emblem: grass at the base, equipment in the middle, sun behind. The wordmark is separated so the picture can also stand alone.",
    creativeDirection:
      "Bright, practical, and outdoor. Lime and olive do the work, with the orange sun as the only warm accent.",
    palette: [
      { name: "Lime", hex: "#8FBF1F" },
      { name: "Olive", hex: "#3C4718" },
      { name: "Sun", hex: "#F5A623" },
      { name: "White", hex: "#FFFFFF" },
    ],
    typographyNotes:
      "Condensed bold sans for the name, with a lighter, widely spaced line for “Mowing Service”. The picture and the words are stacked, not locked into one line.",
    coverImage: image(
      "/projects/branding/bay-lawn/logo.jpg",
      "Bay Lawn Mowing Service logo with a green mower, pressure washer, and orange sun",
      { aspect: "square", caption: "Primary logo" },
    ),
    gallery: [
      image(
        "/projects/branding/bay-lawn/logo.jpg",
        "Bay Lawn Mowing Service logo with a green mower, pressure washer, and orange sun",
        { aspect: "square", caption: "Primary logo" },
      ),
      image(
        "/projects/branding/bay-lawn/card-1.jpg",
        "Bay Lawn Mowing business card from the identity set",
        { aspect: "landscape", caption: "Business card" },
      ),
      image(
        "/projects/branding/bay-lawn/card-2.jpg",
        "Second Bay Lawn Mowing business card from the identity set",
        { aspect: "landscape", caption: "Business card variation" },
      ),
    ],
    featured: true,
    featuredOrder: 5,
    order: 2,
    year: "Undated",
    tags: ["identity", "logo", "business card", "home services"],
    contentStatus: "archive",
  },
  {
    id: "it-loop",
    slug: "it-loop",
    title: "IT Loop — Agency Identity",
    category: "branding",
    artworkLabel: "IT Loop",
    shortDescription:
      "A magenta wordmark and a wide social cover for a digital agency.",
    overview:
      "A wordmark and Facebook cover for IT Loop, a digital marketing agency. The logo loops the two middle letters into a continuous stroke. The cover repeats that magenta across a service list and a large headline.",
    objective:
      "Give the agency a mark that suggests connection, then show how it behaves on a wide social cover.",
    approach:
      "The wordmark stays small and precise. The cover uses it as a corner signature and lets the headline and service list carry the layout.",
    creativeDirection:
      "Direct and commercial. Magenta on white for the mark, magenta on a pale field for the cover, with black type for the offer.",
    palette: [
      { name: "Magenta", hex: "#E0126D" },
      { name: "Ink", hex: "#1A1A1A" },
      { name: "White", hex: "#FFFFFF" },
    ],
    typographyNotes:
      "Custom lowercase wordmark. The cover pairs a heavy sans headline with a script line and a plain list of services.",
    coverImage: image(
      "/projects/branding/it-loop/cover.jpg",
      "IT Loop Facebook cover describing a creative digital marketing agency",
      { aspect: "wide", caption: "Social cover" },
    ),
    gallery: [
      image(
        "/projects/branding/it-loop/cover.jpg",
        "IT Loop Facebook cover describing a creative digital marketing agency",
        { aspect: "wide", caption: "Social cover" },
      ),
      image(
        "/projects/branding/it-loop/logo.jpg",
        "IT Loop wordmark in magenta with a continuous loop through the letters",
        { aspect: "wide", caption: "Wordmark" },
      ),
    ],
    featured: true,
    featuredOrder: 6,
    order: 3,
    year: "Undated",
    tags: ["identity", "logo", "social cover", "agency"],
    contentStatus: "archive",
  },
];
