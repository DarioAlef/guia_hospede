import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seazone — Guia Digital do Hóspede",
  description: "Seu guia personalizado de experiências locais",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 min-h-screen">{children}</body>
    </html>
  );
}
