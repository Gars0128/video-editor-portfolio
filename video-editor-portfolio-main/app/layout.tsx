import type { Metadata } from "next";
import { siteMeta } from "@/lib/content";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
