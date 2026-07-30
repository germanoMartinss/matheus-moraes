import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl = "https://www.matheusmoraesadvocacia.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Matheus Moraes | Advocacia e Assessoria Jurídica em Santos, SP",
  description:
    "Advocacia em Santos, SP com atuação nacional. Assessoria jurídica personalizada em Direito de Família, Direito Médico, Direito Criminal e Concursos Públicos.",
  keywords: [
    "advogado Santos SP",
    "advocacia Santos",
    "Direito de Família",
    "Direito Médico",
    "Direito Criminal",
    "Concursos Públicos",
    "Matheus Moraes advogado",
  ],
  openGraph: {
    title: "Matheus Moraes | Advocacia e Assessoria Jurídica",
    description:
      "Defesa séria e dedicada dos seus interesses. Assessoria jurídica personalizada em Santos, SP e em todo o território nacional.",
    url: siteUrl,
    siteName: "Matheus Moraes Advocacia",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/assets/matheus-oval.png",
        width: 800,
        height: 800,
        alt: "Matheus Moraes, advogado",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
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
