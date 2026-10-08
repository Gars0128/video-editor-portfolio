import localFont from "next/font/local";
import type { Metadata } from "next";
import { siteMeta } from "@/lib/content";
import "./globals.css";

const displayFont = localFont({
  src: [
    { path: "../public/fonts/cormorant.woff2", weight: "400 600", style: "normal" },
    { path: "../public/fonts/cormorant-italic.woff2", weight: "400 600", style: "italic" },
  ],
  variable: "--font-editorial",
  display: "swap",
  fallback: ["Georgia"],
});
const bodyFont = localFont({
  src: "../public/fonts/manrope.woff2",
  weight: "400 700",
  variable: "--font-interface",
  display: "swap",
  fallback: ["Arial"],
});

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  keywords: [
    "Marta Vaitkevich",
    "UGC creator",
    "video editor",
    "beauty UGC",
    "TikTok ads",
    "Instagram Reels",
    "short-form editing"
  ],
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased">
        <noscript><style>{`[data-reveal], [data-entrance] { opacity: 1 !important; transform: none !important; }`}</style></noscript>
        {children}
      </body>
    </html>
  );
}
