export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  context: string;
  /** Demo quotes are layout samples. They are not real client testimonials. */
  isDemo: true;
};

/**
 * DEMO CONTENT.
 * These quotes are written as layout samples so the section has a shape.
 * They are not statements from real clients. Replace every entry before
 * presenting this section as client feedback. If you have no testimonials yet,
 * remove the entries and the homepage will hide the quote list.
 */
export const testimonialsNote =
  "Sample quotes for layout preview. These are not real client testimonials. Replace them in data/testimonials.ts before publishing them as feedback.";

export const testimonials: Testimonial[] = [
  {
    id: "sample-identity",
    quote:
      "The identity felt specific. We could use it on a card, a post, and a sign without starting over each time.",
    attribution: "Sample client",
    context: "Placeholder — brand identity project",
    isDemo: true,
  },
  {
    id: "sample-print",
    quote:
      "The print pieces were easy to follow. The important line was obvious, and the rest of the page stayed quiet.",
    attribution: "Sample client",
    context: "Placeholder — print design project",
    isDemo: true,
  },
  {
    id: "sample-social",
    quote:
      "The social set finally looked like one brand. People could tell the posts belonged together.",
    attribution: "Sample client",
    context: "Placeholder — social creatives",
    isDemo: true,
  },
];
