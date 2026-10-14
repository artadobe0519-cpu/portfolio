import { buildJsonLd, serializeJsonLd } from "@/lib/seo";

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }}
    />
  );
}
