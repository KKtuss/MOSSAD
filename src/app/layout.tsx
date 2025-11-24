import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chubGothic = localFont({
  src: "../fonts/ChubGothic-Regular.ttf",
  variable: "--font-chub",
  display: "swap",
});

const font1955 = localFont({
  src: "../fonts/1955 Medium.otf",
  variable: "--font-1955",
  display: "swap",
});

const sebino = localFont({
  src: "../fonts/Sebino-Regular.ttf",
  variable: "--font-sebino",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MOSSAD - The High-Performance Hebrew-Market-Maker-Machine",
  description: "Mossad is the chosen, next-generation, debt-compatible ledger. We're delivering 10,000 TPS, sub-second finality, and a scalable, decentralized network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${chubGothic.variable} ${font1955.variable} ${sebino.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
