import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tutor de Concursos",
    template: "%s | Tutor de Concursos",
  },
  description:
    "Prepare-se para concursos públicos com questões geradas por IA, correção imediata e tutor inteligente para tirar suas dúvidas.",
  keywords: [
    "concursos públicos",
    "questões",
    "tutor IA",
    "CEBRASPE",
    "FGV",
    "preparatório",
    "estudo",
  ],
  authors: [{ name: "Tutor de Concursos" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Tutor de Concursos",
    title: "Tutor de Concursos com IA",
    description:
      "Questões por matéria/banca, correção automática e tutor IA em tempo real.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preconnect para Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
