import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const title = "Matheus Moraes | Advocacia e Assessoria Jurídica em Santos, SP";
const description =
  "Advocacia em Santos, SP, com atendimento presencial e online em todo o Brasil. Direito de Família, Direito Médico, Direito Criminal e Concursos Públicos.";
const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Matheus Moraes — Advocacia & Assessoria Jurídica, Santos, SP",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Matheus Moraes Advocacia",
    locale: "pt_BR",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1117",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfairDisplay.variable} ${jost.variable}`}
    >
      <body className="bg-bg-primary text-text-primary font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
