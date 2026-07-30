"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Lock body scroll when the full-screen menu is open
    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [isOpen]);

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
                <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-serif text-lg font-bold tracking-tight"
                        onClick={() => setIsOpen(false)}
                    >
                        Raja<span className="text-accent">.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-sm transition-colors ${
                                        isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        <span className="h-5 w-px bg-border" />
                        <ThemeToggle />
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-accent/40 px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background"
                        >
                            Résumé
                        </a>
                    </div>

                    {/* Mobile Controls (Header) */}
                    <div className="flex items-center gap-3 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
                            aria-label="Open menu"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Full-screen Mobile Menu Sheet */}
            <div
                className={`fixed inset-0 z-[60] flex flex-col bg-background transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
                aria-hidden={!isOpen}
            >
                {/* Mobile Menu Header */}
                <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="font-serif text-lg font-bold tracking-tight"
                    >
                        Raja<span className="text-accent">.</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
                        aria-label="Close menu"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Large Serif Links (Centered) */}
                <nav className="flex flex-1 flex-col justify-center px-6 sm:px-8">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                // Dynamic delay: The first word animates after the sheet opens.
                                // Each subsequent word adds a staggered delay (index * 75ms).
                                style={{
                                    transitionDelay: isOpen ? `${60 + index * 45}ms` : "0ms",
                                }}
                                className={`group flex items-center justify-between border-b border-border/60 py-4 font-serif text-3xl font-semibold tracking-tight transition-all duration-300 sm:text-4xl ${
                                    isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                                } ${isActive ? "text-accent" : "text-foreground hover:text-accent"}`}
                            >
                                <span>{item.label}</span>
                                <span
                                    aria-hidden
                                    className="translate-x-0 text-accent opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                                >
                  →
                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom CTA Section */}
                <div className="shrink-0 px-6 pb-10 pt-6 sm:px-8">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 font-medium text-background transition-colors hover:opacity-90"
                    >
                        Download Résumé
                    </a>
                </div>
            </div>
        </>
    );
}