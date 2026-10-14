import type { Project } from "@/types/portfolio";
import { image } from "../helpers";

/**
 * Promotional posters from the local archive.
 * Copy describes the layouts. It does not repeat the offers as verified claims.
 */
export const posterProjects: Project[] = [
  {
    id: "sunrise-study",
    slug: "sunrise-study-posters",
    title: "Sunrise Group — Study Posters",
    category: "posters",
    artworkLabel: "Sunrise Group Travel & Immigration",
    shortDescription:
      "Country posters for Greece, Spain, and New Zealand study campaigns.",
    overview:
      "A set of promotional posters for Sunrise Group Travel & Immigration. Each country gets its own scene, flag, and headline, while the logo, badge, and contact bar stay in the same places so the series is recognisable.",
    objective:
      "Announce a study destination in one glance, then keep fees, process, and contact details findable without a second poster.",
    approach:
      "A large country name leads. Supporting points sit in a grid or a checklist. A destination scene fills the remaining field, and a dark contact band closes the bottom edge.",
    creativeDirection:
      "Campaign-bright and informational. Blue dominates, with gold seals and the destination’s own colours — Greek blue, the Spanish flag, the New Zealand silver fern.",
    palette: [
      { name: "Campaign blue", hex: "#0B3D91" },
      { name: "Gold", hex: "#E2B43A" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Sunrise orange", hex: "#F5A623" },
    ],
    typographyNotes:
      "Extra-bold condensed sans for the country name. Smaller rounded labels carry the supporting points. A script line is used once per poster, never as the main headline.",
    coverImage: image(
      "/projects/posters/study-abroad/greece.jpg",
      "Sunrise Group poster for studying in Greece, with Santorini and the Parthenon",
      { aspect: "square", fit: "cover", caption: "Study in Greece" },
    ),
    gallery: [
      image(
        "/projects/posters/study-abroad/greece.jpg",
        "Sunrise Group poster for studying in Greece, with Santorini and the Parthenon",
        { aspect: "square", fit: "cover", caption: "Study in Greece" },
      ),
      image(
        "/projects/posters/study-abroad/spain.jpg",
        "Sunrise Group poster for studying in Spain, with a city scene and student illustration",
        { aspect: "square", fit: "cover", caption: "Study in Spain" },
      ),
      image(
        "/projects/posters/study-abroad/new-zealand.jpg",
        "Sunrise Group poster for studying in New Zealand, with the Sky Tower and mountains",
        { aspect: "square", fit: "cover", caption: "Study in New Zealand" },
      ),
    ],
    featured: true,
    featuredOrder: 4,
    order: 5,
    year: "Undated",
    tags: ["poster", "campaign", "education"],
    contentStatus: "archive",
  },
];
