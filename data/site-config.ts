/**
 * Central profile, contact, SEO, and editable website copy.
 * Change Rajni's details here — do not hardcode them in components.
 *
 * Social URLs stay empty until a real profile link is provided.
 * Do not replace them with invented addresses.
 */

export const siteConfig = {
  name: "Rajni Goswami",
  profession: "Graphic Designer & Visual Brand Designer",
  availability: "Available for selected freelance projects",
  copyrightYear: 2026,
  location: {
    area: "Purani Abadi",
    city: "Sri Ganganagar",
    state: "Rajasthan",
    country: "India",
    display: "Purani Abadi, Sri Ganganagar, Rajasthan, India",
    short: "Sri Ganganagar, India",
  },
  phone: {
    display: "+91 94621 01167",
    /** E.164 digits for tel: links. */
    tel: "+919462101167",
    /** WhatsApp international format, digits only. */
    whatsapp: "919462101167",
  },
  email: {
    address: "artadobe0519@gmail.com",
    isPlaceholder: false,
  },
  /**
   * Leave href as an empty string until a real profile exists.
   * Empty links are not rendered. Do not invent profile URLs.
   */
  social: [
    { id: "instagram", label: "Instagram", href: "" },
    { id: "behance", label: "Behance", href: "" },
    { id: "linkedin", label: "LinkedIn", href: "" },
    { id: "facebook", label: "Facebook", href: "" },
  ],
  nav: [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  stats: [
    {
      id: "projects",
      value: "50+",
      label: "Projects delivered",
      isDemo: false,
    },
    {
      id: "clients",
      value: "30+",
      label: "Happy clients",
      isDemo: true,
      demoNote:
        "Placeholder metric. Update this number in data/site-config.ts when you have a verified count.",
    },
    {
      id: "categories",
      value: "8+",
      label: "Design categories",
      isDemo: false,
    },
  ],
  /**
   * Enquiry brackets for the contact form. These are not published prices.
   */
  budgetRanges: [
    { id: "under-15", label: "Under ₹15,000" },
    { id: "15-30", label: "₹15,000 – ₹30,000" },
    { id: "30-60", label: "₹30,000 – ₹60,000" },
    { id: "60-plus", label: "₹60,000 and above" },
    { id: "unsure", label: "I need guidance" },
  ],
  hero: {
    eyebrow: "Independent Graphic Designer · Sri Ganganagar, India",
    headline: "Designs That Make Brands Impossible to Ignore.",
    intro:
      "I shape logos, brand systems, print, and social creatives with a clear point of view — work that feels considered, specific, and ready to live in the world.",
  },
  about: {
    lead: "I am an independent graphic designer working from Purani Abadi, Sri Ganganagar. I help businesses look as deliberate as the work they do.",
    philosophy:
      "A brand should be recognisable before anyone reads the name. I start with the feeling the work needs to carry, then build the mark, the type, the colour, and the pieces around it so they belong together.",
    approach:
      "Most of my days move between identity, logos, social creatives, posters, and print. I like work that can sit on a shopfront, a phone screen, and a business card without losing its character.",
  },
  process: [
    {
      id: "discover",
      index: "01",
      title: "Discover",
      text: "We talk through the business, the audience, and what the work needs to do. References and practical constraints come before decoration.",
    },
    {
      id: "concept",
      index: "02",
      title: "Concept",
      text: "I explore directions in mark, type, and colour, then narrow them to a route that feels ownable rather than familiar.",
    },
    {
      id: "design",
      index: "03",
      title: "Design",
      text: "The chosen direction is drawn out across the pieces you actually need — logo, social, print, or a fuller identity.",
    },
    {
      id: "deliver",
      index: "04",
      title: "Deliver",
      text: "You receive organised files for print and screen, with the context to use them consistently after the project ends.",
    },
  ],
  seo: {
    defaultTitle: "Rajni Goswami | Graphic Designer in Sri Ganganagar",
    description:
      "Rajni Goswami is an independent graphic designer and visual brand designer in Sri Ganganagar, Rajasthan. Logo design, brand identity, social creatives, posters, and print.",
    keywords: [
      "Graphic Designer in Sri Ganganagar",
      "Graphic Designer in Sri Ganganagar Rajasthan",
      "Logo Designer in Sri Ganganagar",
      "Brand Identity Designer in Rajasthan",
      "Social Media Designer in Sri Ganganagar",
      "Packaging Designer in Rajasthan",
      "Freelance Graphic Designer in India",
    ],
  },
} as const;

export type BudgetRangeId = (typeof siteConfig.budgetRanges)[number]["id"];
