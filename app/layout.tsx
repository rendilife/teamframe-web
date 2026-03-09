"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useState } from "react";
import "./globals.css";

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

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="cs">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* TOP BAR */}
        <header className="sticky top-0 z-40 border-b border-[#161B22] bg-[#0E1117]/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <div className="text-lg font-semibold tracking-wide">
              <a href="/">
                Team<span className="text-[#00B3A4]">Frame</span>
              </a>
            </div>

            <nav className="hidden md:flex gap-6 text-sm text-[#8B949E]">
              <a className="hover:text-white transition" href="/#overview">Přehled</a>
              <a className="hover:text-white transition" href="/#architecture">Architektura</a>
              <a className="hover:text-white transition" href="/#modules">Moduly</a>
              <a className="hover:text-white transition" href="/#security">Bezpečnost</a>
              <a className="hover:text-white transition" href="/#license">Licence</a>
              <a className="hover:text-white transition" href="/updates">Změny</a>
              <a className="hover:text-white transition" href="/roadmap">Roadmap</a>
              <a className="hover:text-white transition" href="/docs">Docs</a>
              <a className="hover:text-white transition" href="/download">Download</a>
              <a className="hover:text-white transition" href="/#contact">Kontakt</a>
            </nav>

            <button
              className="md:hidden text-white text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden border-t border-[#161B22] bg-[#0E1117] px-6 py-4 flex flex-col gap-4 text-[#8B949E]">
              <a href="/#overview" onClick={() => setMenuOpen(false)}>Přehled</a>
              <a href="/#architecture" onClick={() => setMenuOpen(false)}>Architektura</a>
              <a href="/#modules" onClick={() => setMenuOpen(false)}>Moduly</a>
              <a href="/updates" onClick={() => setMenuOpen(false)}>Změny</a>
              <a href="/roadmap" onClick={() => setMenuOpen(false)}>Roadmap</a>
              <a href="/docs" onClick={() => setMenuOpen(false)}>Docs</a>
              <a href="/download" onClick={() => setMenuOpen(false)}>Download</a>
              <a href="/#contact" onClick={() => setMenuOpen(false)}>Kontakt</a>
              <a href="/#license" onClick={() => setMenuOpen(false)}>Licence</a>
            </div>
          )}
        </header>

        {children}

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-80VYCX7QV9" />

      </body>
    </html>
  );
}