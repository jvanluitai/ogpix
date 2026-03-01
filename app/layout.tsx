import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OGPix — Dynamic OG Image Generation API",
  description:
    "Generate beautiful social share images on-the-fly via API. One HTTP request returns a production-ready 1200×630 PNG. 5 templates, REST API, free tier.",
  keywords: ["og image", "open graph", "social share image", "api", "seo"],
  openGraph: {
    title: "OGPix — Dynamic OG Image Generation API",
    description: "Generate beautiful social share images on-the-fly via API.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OGPix — Dynamic OG Image Generation API",
    description: "Generate beautiful social share images on-the-fly via API.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
