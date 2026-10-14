import type { Project } from "@/types/portfolio";
import { image } from "../helpers";

/**
 * Social and thumbnail artwork from the local archive.
 */
export const socialMediaProjects: Project[] = [
  {
    id: "desi-talk",
    slug: "desi-talk",
    title: "Desi Talk — Podcast Creatives",
    category: "social-media",
    artworkLabel: "Desi Talk with Dilawar Haripur",
    shortDescription:
      "Thumbnail set for a daily podcast, built around one host portrait.",
    overview:
      "A set of podcast thumbnails for Desi Talk. Each cover keeps the same host portrait, microphone, and corner mark, then changes the headline, colour blocks, and layout so episodes can vary without looking unrelated.",
    objective:
      "Make the show identifiable in a crowded feed, and leave room for a new headline on every episode.",
    approach:
      "The portrait is cut out and outlined so it can sit on different grounds. Type is large, few words, and always the first thing a thumbnail has to survive at small size.",
    creativeDirection:
      "Bright and conversational. Teal, mint, and cobalt against purple, black, or a split photograph. The microphone is a repeated prop, not a new idea each time.",
    palette: [
      { name: "Teal", hex: "#2BBBAD" },
      { name: "Mint", hex: "#7DDEA0" },
      { name: "Cobalt", hex: "#2F80ED" },
      { name: "Ink", hex: "#1A1A1A" },
    ],
    typographyNotes:
      "Heavy rounded sans for the main headline, with a smaller bar for the host name or the episode question. The show mark stays in a corner.",
    coverImage: image(
      "/projects/social-media/desi-talk/daily-podcast.jpg",
      "Desi Talk daily podcast thumbnail with a teal headline and host portrait",
      { aspect: "wide", fit: "cover", caption: "Daily podcast thumbnail" },
    ),
    gallery: [
      image(
        "/projects/social-media/desi-talk/daily-podcast.jpg",
        "Desi Talk daily podcast thumbnail with a teal headline and host portrait",
        { aspect: "wide", fit: "cover", caption: "Daily podcast thumbnail" },
      ),
      image(
        "/projects/social-media/desi-talk/ready-for-talks.jpg",
        "Desi Talk thumbnail asking if the viewer is ready for Desi Talks",
        { aspect: "wide", fit: "cover", caption: "Episode thumbnail" },
      ),
      image(
        "/projects/social-media/desi-talk/split-cover.jpg",
        "Desi Talk split-screen podcast thumbnail with two portraits and a waveform",
        { aspect: "wide", fit: "cover", caption: "Split-screen thumbnail" },
      ),
    ],
    featured: true,
    featuredOrder: 3,
    order: 4,
    year: "Undated",
    tags: ["social", "thumbnail", "podcast"],
    contentStatus: "archive",
  },
];
