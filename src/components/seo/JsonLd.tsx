import { buildStructuredData } from "@/lib/structured-data";

export default function JsonLd() {
  // Escape "<" so the JSON can never close the script tag.
  const json = JSON.stringify(buildStructuredData()).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
