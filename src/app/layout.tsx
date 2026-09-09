import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Bossert Immobilien | Premium Real Estate Rhein-Main",
  description: "Bossert Immobilien — Discretion and precision in every transaction. Premium residential real estate in the Rhein-Main region since 1991.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const theSeasons = localFont({
  src: [
    {
      path: "../../public/fonts/TheSeasons-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/TheSeasons-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/TheSeasons-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/TheSeasons-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/TheSeasons-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/TheSeasons-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-seasons",
  display: "swap",
});

import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${theSeasons.variable}`}>
        <LanguageProvider>
          <SmoothScroll>
            {children}
            {modal}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
