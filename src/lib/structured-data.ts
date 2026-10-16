import { practiceAreas } from "@/data/areas";
import { SITE_URL, site } from "@/lib/site";

const { address } = site;

/**
 * schema.org graph for the firm (Attorney, a LegalService subtype) and the
 * lawyer. Deliberately has no aggregateRating: client reviews in structured
 * data read as advertising under OAB rules. Empty fields are left out.
 */
export function buildStructuredData() {
  const firmId = `${SITE_URL}/#escritorio`;
  const personId = `${SITE_URL}/#advogado`;

  const person = {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    jobTitle: "Advogado",
    image: `${SITE_URL}/assets/matheus-oval.png`,
    worksFor: { "@id": firmId },
    ...(site.oab.number
      ? {
          identifier: {
            "@type": "PropertyValue",
            propertyID: `OAB/${site.oab.state}`,
            value: site.oab.number,
          },
        }
      : {}),
  };

  const firm = {
    "@type": ["LegalService", "Attorney"],
    "@id": firmId,
    name: `${site.name} Advocacia e Assessoria Jurídica`,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og.jpg`,
    telephone: site.phone.e164,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.complement} — ${address.building}`,
      addressLocality: address.city,
      addressRegion: address.state,
      addressCountry: address.country,
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
    },
    areaServed: [
      { "@type": "City", name: `${address.city}, ${address.state}` },
      { "@type": "Country", name: "Brasil" },
    ],
    knowsAbout: practiceAreas.map((area) => area.title),
    founder: { "@id": personId },
    sameAs: [site.instagram.url, site.google.profileUrl],
  };

  return { "@context": "https://schema.org", "@graph": [firm, person] };
}
