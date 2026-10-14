export type Service = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  deliverables: string[];
  suitableFor: string;
  category?: "branding" | "logos" | "social-media" | "packaging" | "posters" | "print-design";
};

/**
 * Service descriptions. Pricing is intentionally not listed.
 * Every service uses "Request a Quote" until real pricing is added.
 */
export const services: Service[] = [
  {
    slug: "logo-design",
    title: "Logo Design",
    summary: "A distinctive mark that still reads clearly at small sizes.",
    overview:
      "A logo project covers the mark, wordmark, and the few lockups you will actually use. The aim is a symbol that feels specific to the business and holds up on a card, a sign, and a profile picture.",
    deliverables: [
      "Primary logo and practical lockups",
      "Colour and single-colour versions",
      "Clear-space guidance",
      "Files for print and screen",
    ],
    suitableFor: "New businesses, rebrands, and anyone whose current mark no longer fits.",
    category: "logos",
  },
  {
    slug: "brand-identity",
    title: "Brand Identity Design",
    summary: "A visual system that keeps every piece recognisably yours.",
    overview:
      "Identity work extends a logo into colour, type, and the everyday pieces a business repeats. The result is a small system, not a stack of unrelated graphics.",
    deliverables: [
      "Logo suite",
      "Colour palette and type direction",
      "Social and print applications",
      "A short guide for using the system",
    ],
    suitableFor: "Studios, local businesses, and growing brands that need consistency.",
    category: "branding",
  },
  {
    slug: "social-media",
    title: "Social Media Design",
    summary: "Posts, covers, and campaigns with a steady visual voice.",
    overview:
      "Social design for feeds, stories, thumbnails, and campaign sets. Each piece is made to be readable on a phone and still belong to the same brand.",
    deliverables: [
      "Feed posts and story frames",
      "Cover images and thumbnails",
      "Campaign sets in a shared style",
      "Export sizes for the platforms you use",
    ],
    suitableFor: "Businesses that publish often and want the feed to look intentional.",
    category: "social-media",
  },
  {
    slug: "packaging",
    title: "Packaging Design",
    summary: "Packs and labels that explain the product and feel considered.",
    overview:
      "Packaging design for labels, boxes, and product presentation. The work focuses on hierarchy, materials, and how the pack looks on a shelf or in a photograph. No fixed package price is listed — request a quote for the format you need.",
    deliverables: [
      "Front and supporting panel designs",
      "Dieline-ready artwork when a template is supplied",
      "Colour and type direction",
      "Print-ready files",
    ],
    suitableFor: "Food, beauty, and product businesses preparing a pack or a refresh.",
    category: "packaging",
  },
  {
    slug: "posters",
    title: "Posters and Promotional Creatives",
    summary: "Posters and campaign visuals with a strong first read.",
    overview:
      "Promotional posters, event creatives, and announcement graphics. The layout leads with one idea, then makes the details easy to find.",
    deliverables: [
      "Poster or promotional key visual",
      "Adapted sizes for print or social",
      "Type and image hierarchy",
      "Print or screen-ready files",
    ],
    suitableFor: "Events, admissions campaigns, launches, and local promotions.",
    category: "posters",
  },
  {
    slug: "print",
    title: "Business Cards and Print Design",
    summary: "Cards, booklets, and print pieces that feel finished in the hand.",
    overview:
      "Print design for business cards, booklets, menus, and other pieces that leave the screen. Attention goes to margins, contrast, and how the information is ordered.",
    deliverables: [
      "Card fronts and backs, or the agreed print piece",
      "Print-ready PDF",
      "Bleed and safe-area setup",
      "A screen preview for approval",
    ],
    suitableFor: "Studios, shops, and service businesses that still hand something over.",
    category: "print-design",
  },
  {
    slug: "marketing-collateral",
    title: "Marketing Collateral",
    summary: "Brochures, checklists, and leave-behinds that explain an offer.",
    overview:
      "Collateral for proposals, service brochures, and information sheets. The design keeps a long explanation readable without looking like a template.",
    deliverables: [
      "Brochure, flyer, or multi-page collateral",
      "Consistent use of the existing identity",
      "Print-ready and shareable PDF",
      "Image and icon treatment",
    ],
    suitableFor: "Teams that need to explain a service clearly in a leave-behind.",
    category: "print-design",
  },
  {
    slug: "custom",
    title: "Custom Graphic Design",
    summary: "A focused design project that does not fit a single category.",
    overview:
      "For a one-off piece, a mixed set of deliverables, or a brief that crosses logo, social, and print. The scope is agreed before the work begins.",
    deliverables: [
      "A written scope before design starts",
      "The agreed pieces, prepared for their end use",
      "Revisions within that scope",
      "Organised final files",
    ],
    suitableFor: "Clients who know the problem and want a designer to shape the format.",
  },
];
