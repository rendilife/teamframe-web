import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import Header from "@/app/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeamFrame – plánovač směn (8h/12h) a výrobní dashboard",
  description:
    "TeamFrame je modulární systém pro plánování směn, řízení strojů, kvalifikace zaměstnanců a evidenci incidentů pro výrobní provoz.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <Header />

        {children}

        <GoogleAnalytics gaId="G-80VYCX7QV9" />

      </body>
    </html>
  );
}