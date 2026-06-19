import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/ui/Header";

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
      <body className="bg-seazone-background min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}
