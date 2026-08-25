"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// TODO: replace with real site name / logo asset
const SITE_NAME = "Bossert Immobilien";

const NAV_LINKS = [
  { href: "/property", label: "Property" },
  { href: "/owner", label: "Owner" },
  { href: "/interested-party", label: "Interested Party" },
  { href: "/evaluate", label: "Evaluate" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-foreground/10 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo / Site name */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-wide hover:opacity-80 transition-opacity"
          aria-label={`${SITE_NAME} — Home`}
        >
          {/* TODO: swap text for <Image> logo when asset is ready */}
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "text-sm transition-opacity hover:opacity-80",
                  isActive
                    ? "font-semibold underline underline-offset-4"
                    : "opacity-70",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger button */}
        <button
          id="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded hover:bg-foreground/5 transition-colors"
        >
          {/* Three bars — simple CSS hamburger */}
          <span
            className={[
              "block h-0.5 w-6 bg-current transition-transform duration-200",
              menuOpen ? "translate-y-2 rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-0.5 w-6 bg-current transition-opacity duration-200",
              menuOpen ? "opacity-0" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-0.5 w-6 bg-current transition-transform duration-200",
              menuOpen ? "-translate-y-2 -rotate-45" : "",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Mobile menu drawer */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="md:hidden border-t border-foreground/10 bg-background"
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "block text-base transition-opacity hover:opacity-80",
                    isActive
                      ? "font-semibold underline underline-offset-4"
                      : "opacity-70",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
