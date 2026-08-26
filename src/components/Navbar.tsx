"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const SITE_TAGLINE = "REAL ESTATE";

const NAV_LINKS = [
  { href: "/",            label: "Home"        },
  { href: "/properties",  label: "Properties"  },
  { href: "/for-owners",  label: "For Owners"  },
  { href: "/services",    label: "Services"    },
  { href: "/about",       label: "About"       },
  { href: "/references",  label: "References"  },
  { href: "/knowledge",   label: "Knowledge"   },
  { href: "/contact",     label: "Contact"     },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled 
          ? "top-3 left-4 right-4 md:left-10 md:right-10 rounded-full border border-[rgba(254,252,246,0.15)] shadow-[0_12px_40px_rgba(0,0,0,0.3)]" 
          : "top-0 left-0 right-0 border-transparent"
      }`}
      style={{ 
        background: isScrolled ? "rgba(4, 36, 51, 0.70)" : "rgba(4, 36, 51, 0.15)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)"
      }}
      role="banner"
    >
      <div className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10 transition-all duration-500 ${isScrolled ? 'py-3.5 md:py-4' : 'py-5 md:py-6'}`}>

        {/* Logo */}
        <Link
          href="/"
          aria-label="Bossert Immobilien — Home"
          className="flex items-center gap-4 group"
        >
          <Image 
            src="/logo.webp" 
            alt="Bossert Logo" 
            width={48} 
            height={48} 
            className="opacity-90 group-hover:opacity-100 transition-opacity object-contain"
          />
          <div className="flex flex-col leading-none">
            <span
              className="text-[1.15rem] md:text-[1.3rem] font-bold tracking-[0.22em] text-[#FEFCF6] transition-opacity group-hover:opacity-80 font-display"
            >
              BOSSERT
            </span>
            <span
              className="text-[0.55rem] tracking-[0.3em] text-[#AF8C53] mt-0.5 font-display"
            >
              {SITE_TAGLINE}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link-hero${isActive ? " active" : ""} font-body`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Lang Switcher & Mobile Hamburger */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Language Switcher (Desktop Only) */}
          <div 
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(254,252,246,0.15)] hover:border-[#AF8C53] transition-colors group cursor-default" 
            style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(254,252,246,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#AF8C53] transition-colors">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <div className="flex items-center gap-1.5 text-[0.65rem] tracking-[0.15em] font-body">
              <button className="text-[#FEFCF6] font-bold transition-colors hover:text-[#AF8C53] cursor-pointer">EN</button>
              <span className="text-[rgba(254,252,246,0.3)]">/</span>
              <button className="text-[rgba(254,252,246,0.6)] transition-colors hover:text-[#FEFCF6] cursor-pointer">DE</button>
            </div>
          </div>

          {/* Hamburger (Mobile Only) */}
          <button
            id="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(254,252,246,0.25)] hover:border-[#AF8C53] transition-colors"
          >
            {menuOpen ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#FEFCF6" strokeWidth="1.8" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="#FEFCF6" strokeWidth="1.8" strokeLinecap="round">
                <line x1="0" y1="1" x2="16" y2="1" />
                <line x1="0" y1="6" x2="16" y2="6" />
                <line x1="0" y1="11" x2="16" y2="11" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[rgba(254,252,246,0.10)]"
          style={{ background: "rgba(4,36,51,0.96)", backdropFilter: "blur(12px)" }}
        >
          <ul className="flex flex-col px-6 py-6 gap-5">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`nav-link-hero text-base${isActive ? " active" : ""} font-body`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
