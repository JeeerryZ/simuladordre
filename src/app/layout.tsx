import { AvatarProvider } from "@/contexts/avatarContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simulador de Tarifa de Concessão",
  description:
    "Simule tarifas de concessão de serviços públicos com base em diversos parâmetros e obtenha resultados precisos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <AvatarProvider>
        <body className={`${inter.variable} antialiased`}>
          {children}
          <SpeedInsights />
        </body>
      </AvatarProvider>
    </html>
  );
}
