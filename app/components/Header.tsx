"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/#overview", label: "Přehled" },
  { href: "/#architecture", label: "Architektura" },
  { href: "/#modules", label: "Moduly" },
  { href: "/#security", label: "Bezpečnost" },
  { href: "/#license", label: "Licence" },
  { href: "/updates", label: "Změny" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/docs", label: "Docs" },
  { href: "/download", label: "Download" },
  { href: "/#contact", label: "Kontakt" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#161B22] bg-[#0E1117]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-lg font-semibold tracking-wide">
          <Link href="/">
            Team<span className="text-[#00B3A4]">Frame</span>
          </Link>
        </div>

        <nav className="hidden gap-6 text-sm text-[#8B949E] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} className="transition hover:text-white" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          aria-expanded={menuOpen}
          aria-label="Menu"
          className="text-xl text-white md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          Menu
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-[#161B22] bg-[#0E1117] px-6 py-4 text-[#8B949E] md:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
