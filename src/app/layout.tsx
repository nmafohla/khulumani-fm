import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khulumani FM 95.0 | Voice of the City of Kings & Queens",
  description:
    "Listen live to Khulumani FM 95.0 from Bulawayo, Zimbabwe. High-fidelity 192kbps live radio stream, weekly show guide, and direct WhatsApp studio hotline.",
  keywords: [
    "Khulumani FM",
    "95.0 FM",
    "Bulawayo Radio",
    "Zimbabwe Broadcasting Corporation",
    "ZBC radio",
    "Live radio stream",
    "Bulawayo music",
  ],
  openGraph: {
    title: "Khulumani FM 95.0 — Live Online Radio",
    description:
      "The Voice of the City of Kings and Queens, Bulawayo, Zimbabwe.",
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
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0d0f12" />
        <link
          rel="icon"
          href="https://www.khulumanifm.co.zw/wp-content/uploads/2021/10/cropped-favicon.png"
        />
      </head>
      <body className="min-h-screen bg-station-dark text-slate-100 antialiased selection:bg-station-gold selection:text-station-dark">
        {children}
      </body>
    </html>
  );
}
