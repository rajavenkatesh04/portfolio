"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

/** Nav labels that map to a real route, used to light up the active item. */
const ROUTE_FOR: Record<string, string> = {
  Projects: "/projects",
  Certifications: "/certifications",
  Blog: "/blog",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll + close on Escape while the full-screen menu is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /**
   * Section links ("/#about"): on the home page we scroll manually and write a
   * SINGLE clean hash via replaceState — avoiding the App Router quirk where
   * successive hash navigations stack fragments (/#about#projects). Off the
   * home page we let the Link navigate home to the hash. Always closes the menu.
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

  const isActive = (label: string) => {
    const route = ROUTE_FOR[label];
    return route ? pathname.startsWith(route) : false;
  };

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        {/* Brand with an accent mark as a small signature. */}
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-7 text-sm">
            {navItems.map((item) => {
              const active = isActive(item.label);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleSectionClick(e, item.href)}
                    aria-current={active ? "page" : undefined}
                    className={`group relative transition-colors ${
                      active ? "text-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {/* Accent underline grows from the left on hover/active. */}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <span aria-hidden className="h-5 w-px bg-border" />
          <ThemeToggle />
          <a
            href={site.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent/40 px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-contrast"
          >
            Résumé
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
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
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>
    </header>

      {/* Full-screen mobile menu — rendered OUTSIDE the blurred header so the
          fixed overlay is positioned against the viewport, not the header.
          Slides in from the right. */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-background motion-safe:animate-[slideInRight_0.28s_cubic-bezier(0.22,1,0.36,1)] lg:hidden">
          <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-serif text-lg font-semibold tracking-tight"
            >
              {site.shortName}
              <span className="text-accent">.</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
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
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Large serif links */}
          <nav className="flex flex-1 flex-col justify-center px-6 sm:px-8">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleSectionClick(e, item.href)}
                style={{ animationDelay: `${60 + i * 45}ms` }}
                className="group flex items-center justify-between border-b border-border/60 py-4 font-serif text-3xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent motion-safe:animate-[menuItemIn_0.3s_ease-out_both] sm:text-4xl"
              >
                <span>{item.label}</span>
                <span
                  aria-hidden
                  className="translate-x-0 text-accent opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>
              </Link>
            ))}
          </nav>

          {/* Résumé CTA + quick links pinned to the bottom */}
          <div className="shrink-0 px-6 pb-10 pt-6 sm:px-8">
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
            >
              Download Résumé
            </a>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-foreground"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
