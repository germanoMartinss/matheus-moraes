/**
 * Single source of truth for the firm's data. Every component reads from here.
 *
 * Fields left empty ("") are data the client has not confirmed yet. Components
 * skip whatever is empty, so never fill them with placeholders.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://matheus-moraes.vercel.app"
).replace(/\/$/, "");

export const site = {
  url: SITE_URL,
  name: "Matheus Moraes",
  brand: "Advocacia & Assessoria Jurídica",
  legalName: "Matheus Moraes · Advocacia e Assessoria Jurídica",

  oab: {
    // Número de inscrição, ex.: "123.456". Vazio até o cliente informar.
    // Obrigatório na publicidade (art. 44 do Código de Ética da OAB).
    number: "",
    state: "SP",
  },

  // Ano de início na advocacia, ex.: "2018". Vazio até o cliente informar.
  practiceSince: "",

  // Formação, ex.: "Graduado em Direito pela Universidade X". Vazio até o
  // cliente informar.
  education: "",

  phone: {
    display: "(13) 99676-4688",
    e164: "+5513996764688",
  },

  whatsapp: {
    number: "5513996764688",
    defaultMessage: "Olá! Vim pelo site e gostaria de agendar uma conversa.",
  },

  email: "matheusmoraesadvogado@gmail.com",

  address: {
    street: "Av. Conselheiro Nébias, 756",
    complement: "cj. 2421",
    building: "Helbor Offices",
    district: "Vila Rica",
    city: "Santos",
    state: "SP",
    // CEP, ex.: "11015-002". Vazio até o cliente confirmar.
    postalCode: "",
    country: "BR",
  },

  // Ex.: "Segunda a sexta, das 9h às 18h". Vazio até o cliente confirmar.
  openingHours: "",

  instagram: {
    handle: "matheusmoraesadvogado",
    url: "https://www.instagram.com/matheusmoraesadvogado/",
  },

  google: {
    // Place ID (formato "ChIJ…") da ficha "Matheus Moraes Advogados e
    // Assessoria Jurídica". Vazio até ser obtido — ver README.
    placeId: "",
    profileUrl: "https://share.google/Mtv0NExxCI1pMbFvJ",
  },
} as const;

export function whatsappUrl(message: string = site.whatsapp.defaultMessage) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsapp.number}${text}`;
}

/** "OAB/SP nº 123.456", or "" while the number is not filled in. */
export function oabLabel() {
  return site.oab.number ? `OAB/${site.oab.state} nº ${site.oab.number}` : "";
}

export const phoneUrl = `tel:${site.phone.e164}`;
export const emailUrl = `mailto:${site.email}`;
