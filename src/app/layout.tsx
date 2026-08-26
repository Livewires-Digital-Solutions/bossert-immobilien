import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Bossert Immobilien – Exclusive Real Estate in the Rhine-Main Region",
  description:
    "Your partner for exclusive real estate in the Rhine-Main region since 1991. Buy, sell, or evaluate – Bossert Immobilien.",
  icons: {
    icon: "/logo.webp",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} h-full antialiased`}
    >
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollRevealProvider />
        <Navbar />
        <div className="page-enter flex flex-col flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
