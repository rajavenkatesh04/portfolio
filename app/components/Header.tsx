"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, site } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

/**
 * Sticky, minimal top nav. Links smooth-scroll to home-page sections (and to
 * /blog). Collapses to a toggle menu on mobile.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /**
   * Handle clicks on section links (e.g. "/#about").
   * On the home page we scroll manually and write a SINGLE clean hash via
   * replaceState — this avoids the App Router quirk where successive hash
   * navigations stack fragments (e.g. /#about#projects). On other pages we let
   * the Link navigate home to the hash normally.
   */
  function handleSectionClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    setOpen(false);
    if (!href.startsWith("/#") || pathname !== "/") return;

    const el = document.getElementById(href.slice(2));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {site.shortName}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => handleSectionClick(e, item.href)}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col px-5 py-2 sm:px-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => handleSectionClick(e, item.href)}
                  className="block py-2.5 text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
