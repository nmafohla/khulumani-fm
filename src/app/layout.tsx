import type { Metadata } from "next";
import "./globals.css";
import { RadioPlayerProvider } from "@/context/RadioPlayerContext";
import { SiteContentProvider } from "@/context/SiteContentContext";
import { PreviewModeBar } from "@/components/PreviewModeBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyPlayerBar } from "@/components/StickyPlayerBar";

export const metadata: Metadata = {
  title: "Khulumani FM 95.0 | Izwi Lethu, Igugu Lethu — Bulawayo",
  description:
    "Listen live to Khulumani FM 95.0 from Montrose Studios in Bulawayo, Zimbabwe. Uninterrupted 192kbps live radio stream, 7-day show schedule, charts, personalities, and studio contacts.",
  keywords: [
    "Khulumani FM",
    "95.0 FM",
    "Izwi Lethu Igugu Lethu",
    "Bulawayo Radio",
    "Zimbabwe Broadcasting Corporation",
    "ZBC radio",
    "Live radio stream",
  ],
  openGraph: {
    title: "Khulumani FM 95.0 — Izwi Lethu, Igugu Lethu",
    description:
      "The leading community radio station for the youth and young at heart in Bulawayo, Zimbabwe.",
    type: "website",
    locale: "en_ZW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1c9f56" />
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-khulumani-bg text-khulumani-ink antialiased selection:bg-khulumani-green selection:text-white">
        <SiteContentProvider>
          <RadioPlayerProvider>
            <PreviewModeBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <StickyPlayerBar />
          </RadioPlayerProvider>
        </SiteContentProvider>
      </body>
    </html>
  );
}
