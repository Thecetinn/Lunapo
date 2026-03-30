import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lunapo.nl"),
  title: { default: "Lunapo | Premium Collectibles NL & DE", template: "%s | Lunapo" },
  description: "Premium voetbalkaarten, Pokémon TCG, One Piece TCG, figuren en diecast. Gratis verzending v.a. €50 in NL & DE.",
  openGraph: { siteName: "Lunapo", locale: "nl_NL", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={inter.className}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
