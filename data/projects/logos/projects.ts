import type { Project } from "@/types/portfolio";
import { image } from "../helpers";

/**
 * Logo artwork from the local archive.
 * Names match the marks themselves. No business results are claimed.
 */
export const logoProjects: Project[] = [
  {
    id: "fusion-kebab",
    slug: "fusion-kebab",
    title: "Fusion Kebab — Logo",
    category: "logos",
    artworkLabel: "Fusion Kebab",
    shortDescription: "A skewer-and-flame mark beside a high-contrast wordmark.",
    overview:
      "Logo for Fusion Kebab. A vertical skewer and a red flame sit beside the name, with “Fusion” in script and “Kebab” in a tall serif.",
    objective:
      "Make the food obvious without relying on a photograph, and keep the name large enough to read on a sign.",
    approach:
      "The illustration and the wordmark share one baseline rhythm. The flame is the only decorative gesture, so the skewer stays readable.",
    creativeDirection:
      "Hot, graphic, and restaurant-facing. Red and charcoal on white, with no extra scenery.",
    palette: [
      { name: "Kebab red", hex: "#C0392B" },
      { name: "Charcoal", hex: "#2B2B2B" },
      { name: "White", hex: "#FFFFFF" },
    ],
    typographyNotes:
      "A script word for Fusion, set above a high-contrast serif for Kebab. The script is smaller so it does not compete with the food mark.",
    coverImage: image(
      "/projects/logos/fusion-kebab/logo.jpg",
      "Fusion Kebab logo with a black skewer, red flame, and red serif wordmark",
      { aspect: "wide", caption: "Primary logo" },
    ),
    gallery: [
      image(
        "/projects/logos/fusion-kebab/logo.jpg",
        "Fusion Kebab logo with a black skewer, red flame, and red serif wordmark",
        { aspect: "wide", caption: "Primary logo" },
      ),
    ],
    featured: true,
    featuredOrder: 7,
    order: 7,
    year: "Undated",
    tags: ["logo", "restaurant", "wordmark"],
    contentStatus: "archive",
  },
  {
    id: "nz-sikh-games",
    slug: "nz-sikh-games",
    title: "NZ Sikh Games — Event Mark",
    category: "logos",
    artworkLabel: "Auckland NSG",
    shortDescription:
      "A torchbearing runner over a track, drawn for the Auckland games.",
    overview:
      "Event mark for the NZ Sikh Games in Auckland. A gradient runner carries a torch above a curved track, with the Sky Tower suggested inside the NSG monogram.",
    objective:
      "Combine sport, place, and celebration in one emblem that can sit on posters and apparel.",
    approach:
      "The figure is a silhouette so it stays bold at small sizes. Colour does the storytelling: flame, track, and the Southern Cross on the torso.",
    creativeDirection:
      "Celebratory and athletic. The black field lets the orange, blue, and green read as a medal ribbon.",
    palette: [
      { name: "Flame", hex: "#F15A24" },
      { name: "Track blue", hex: "#1E4FA0" },
      { name: "Field green", hex: "#2E8B3A" },
      { name: "Black", hex: "#111111" },
    ],
    typographyNotes:
      "NSG is a custom monogram with a small tower in the counter of the N. “Auckland” sits above it in a compact sans.",
    coverImage: image(
      "/projects/logos/nz-sikh-games/logo.png",
      "NZ Sikh Games logo of an orange runner with a torch over a blue and green track",
      { aspect: "portrait", frame: "dark", caption: "Event mark" },
    ),
    gallery: [
      image(
        "/projects/logos/nz-sikh-games/logo.png",
        "NZ Sikh Games logo of an orange runner with a torch over a blue and green track",
        { aspect: "portrait", frame: "dark", caption: "Event mark" },
      ),
    ],
    featured: false,
    order: 8,
    year: "Undated",
    tags: ["logo", "event", "sports"],
    contentStatus: "archive",
  },
  {
    id: "pukerimu-nursery",
    slug: "pukerimu-nursery",
    title: "Pukerimu Nursery — Logo",
    category: "logos",
    artworkLabel: "Pukerimu Nursery and Landscape",
    shortDescription: "A landscape emblem of trees, path, and open sky.",
    overview:
      "Logo for Pukerimu Nursery and Landscape. A circular scene of trees and layered fields sits beside a stacked wordmark in green and soil brown.",
    objective:
      "Show nursery and landscape work in the symbol itself, while keeping the full name legible.",
    approach:
      "The circle is a simple illustration, not a photograph. A vertical rule separates the scene from the name so each can be used with more air if needed.",
    creativeDirection:
      "Open and horticultural. Sky blue, two greens, and brown are enough. No extra ornament.",
    palette: [
      { name: "Pine", hex: "#1B5E20" },
      { name: "Leaf", hex: "#7CB342" },
      { name: "Soil", hex: "#8D5A2B" },
      { name: "Sky", hex: "#7EC8E3" },
    ],
    typographyNotes:
      "Stacked sans in three weights. The word “and” is a small script so it does not look like a fourth line of the name.",
    coverImage: image(
      "/projects/logos/pukerimu-nursery/logo.jpg",
      "Pukerimu Nursery and Landscape logo with a circular field and tree emblem",
      { aspect: "wide", caption: "Primary logo" },
    ),
    gallery: [
      image(
        "/projects/logos/pukerimu-nursery/logo.jpg",
        "Pukerimu Nursery and Landscape logo with a circular field and tree emblem",
        { aspect: "wide", caption: "Primary logo" },
      ),
    ],
    featured: false,
    order: 9,
    year: "Undated",
    tags: ["logo", "landscape", "nursery"],
    contentStatus: "archive",
  },
  {
    id: "prime-punjabi-tv",
    slug: "prime-punjabi-television",
    title: "Prime Punjabi Television — Logo",
    category: "logos",
    artworkLabel: "Prime Punjabi Television",
    shortDescription: "A red globe and Punjab map paired with two lockups.",
    overview:
      "Logo sheet for Prime Punjabi Television. A striped red globe sits with the name, and the counter of the i is drawn as a map of Punjab. Two arrangements are shown: globe beside the name, and globe above it.",
    objective:
      "Signal a television channel and a region without a long explanation.",
    approach:
      "The globe is the constant. The sheet tests a horizontal lockup and a stacked lockup so the mark can fit a wide title and a square avatar.",
    creativeDirection:
      "Broadcast red on white. The globe has enough stripes to feel in motion, and the map is a small detail rather than a second logo.",
    palette: [
      { name: "Broadcast red", hex: "#D0122D" },
      { name: "Deep red", hex: "#8E1020" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#FFFFFF" },
    ],
    typographyNotes:
      "Prime is a high-contrast serif. Punjabi is a thin sans set directly under it, with Television in a smaller black line.",
    coverImage: image(
      "/projects/logos/prime-punjabi-tv/logo.jpg",
      "Prime Punjabi Television logo sheet with a red striped globe and two lockups",
      { aspect: "square", caption: "Logo sheet" },
    ),
    gallery: [
      image(
        "/projects/logos/prime-punjabi-tv/logo.jpg",
        "Prime Punjabi Television logo sheet with a red striped globe and two lockups",
        { aspect: "square", caption: "Logo sheet" },
      ),
    ],
    featured: false,
    order: 10,
    year: "Undated",
    tags: ["logo", "broadcast", "wordmark"],
    contentStatus: "archive",
  },
  {
    id: "melbourne-taxi",
    slug: "melbourne-taxi",
    title: "1300 Melbourne Cabs — Logo Concepts",
    category: "logos",
    artworkLabel: "1300 Melbourne Cabs",
    shortDescription: "Taxi logo concepts built around an orange cab and a fare arc.",
    overview:
      "Logo concepts for 1300 Melbourne Cabs. The developed direction shows an orange taxi under a segmented arc, with the name in a wide serif and “Cabs” in a smaller script.",
    objective:
      "Explore a mark that reads as a taxi company before the name is read.",
    approach:
      "The car is simplified to a side view with a checker band. The arc above it suggests a meter or a road sweeping overhead. Alternate concept sheets from the same set are included in the gallery.",
    creativeDirection:
      "Civic and immediate. Orange and black, the familiar taxi colours, on a clean ground.",
    palette: [
      { name: "Taxi orange", hex: "#F5A623" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#FFFFFF" },
    ],
    typographyNotes:
      "A wide serif for “1300 Melbourne”, underlined, with a script “Cabs” at the end of the line.",
    coverImage: image(
      "/projects/logos/melbourne-taxi/concept-5.jpg",
      "1300 Melbourne Cabs logo concept with an orange taxi under a segmented arc",
      { aspect: "square", caption: "Logo concept" },
    ),
    gallery: [
      image(
        "/projects/logos/melbourne-taxi/concept-5.jpg",
        "1300 Melbourne Cabs logo concept with an orange taxi under a segmented arc",
        { aspect: "square", caption: "Concept five" },
      ),
      image(
        "/projects/logos/melbourne-taxi/concept-4.jpg",
        "Alternate 1300 Melbourne taxi logo concept from the archive",
        { aspect: "landscape", caption: "Concept four" },
      ),
      image(
        "/projects/logos/melbourne-taxi/concept-3.jpg",
        "Earlier 1300 Melbourne taxi logo concept from the archive",
        { aspect: "landscape", caption: "Concept three" },
      ),
    ],
    featured: false,
    order: 11,
    year: "Undated",
    tags: ["logo", "transport", "concepts"],
    contentStatus: "archive",
  },
  {
    id: "easy-cleaning",
    slug: "easy-cleaning",
    title: "Easy Cleaning — Logo",
    category: "logos",
    artworkLabel: "Easy Cleaning",
    shortDescription: "A gold line illustration framed by laurel branches.",
    overview:
      "Logo for Easy Cleaning. A fine gold illustration of a cleaner and supplies sits in a partial frame, flanked by laurel branches, with the name in spaced capitals below.",
    objective:
      "Feel polished rather than purely utilitarian, while still showing the service.",
    approach:
      "Everything is drawn in one line weight and one metallic colour. The laurels add ceremony without introducing a second palette.",
    creativeDirection:
      "Quiet luxury for a domestic service. Gold on white, lots of margin, no drop shadows.",
    palette: [
      { name: "Gold", hex: "#D4B24A" },
      { name: "White", hex: "#FFFFFF" },
    ],
    typographyNotes:
      "Wide-tracked capitals for the name, with a smaller line underneath for the tagline “Crystal clean everytime”.",
    coverImage: image(
      "/projects/logos/easy-cleaning/logo.png",
      "Easy Cleaning logo in gold line art with laurel branches",
      { aspect: "square", caption: "Primary logo" },
    ),
    gallery: [
      image(
        "/projects/logos/easy-cleaning/logo.png",
        "Easy Cleaning logo in gold line art with laurel branches",
        { aspect: "square", caption: "Primary logo" },
      ),
    ],
    featured: false,
    order: 12,
    year: "Undated",
    tags: ["logo", "cleaning", "illustration"],
    contentStatus: "archive",
  },
  {
    id: "bansal-hospital",
    slug: "bansal-hospital",
    title: "Bansal Hospital — Symbol",
    category: "logos",
    artworkLabel: "Bansal Hospital",
    shortDescription: "A geometric figure built from teal, amber, green, and gold.",
    overview:
      "Symbol mark from the archive file named for Bansal Hospital. The image is a geometric person: a teal head, amber and green arms, and a gold body. A separate wordmark is not part of this file.",
    objective:
      "Reduce a care organisation to a single human figure that still feels constructed and calm.",
    approach:
      "Flat shapes meet at the centre. Colour separates head, arms, and body so the figure reads before the outline does.",
    creativeDirection:
      "Abstract and optimistic. The palette is medical without using a red cross or a literal building.",
    palette: [
      { name: "Teal", hex: "#0E6E6A" },
      { name: "Amber", hex: "#F28C28" },
      { name: "Green", hex: "#2ECC71" },
      { name: "Gold", hex: "#F4D03F" },
    ],
    typographyNotes:
      "This file is a symbol only. Any wordmark would need to be set apart from the figure so the geometry stays intact.",
    coverImage: image(
      "/projects/logos/bansal-hospital/mark.png",
      "Geometric person symbol in teal, amber, green, and gold for Bansal Hospital",
      { aspect: "square", frame: "dark", caption: "Symbol mark" },
    ),
    gallery: [
      image(
        "/projects/logos/bansal-hospital/mark.png",
        "Geometric person symbol in teal, amber, green, and gold for Bansal Hospital",
        { aspect: "square", frame: "dark", caption: "Symbol mark" },
      ),
    ],
    featured: false,
    order: 13,
    year: "Undated",
    tags: ["logo", "symbol", "healthcare"],
    contentStatus: "archive",
  },
];
