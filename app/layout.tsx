import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";

export const metadata: Metadata = {
  title: "Aguia – Plataforma de Estudos para Concursos",
  description: "Planejamento personalizado para concursos públicos com acompanhamento de professor.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full dark">
      <body className="h-full bg-[var(--bg)] text-[var(--text-1)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
