import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Compact footer for inner pages (projects, blog). Keeps quick contact links
 * one tap away without repeating the full home-page contact section.
 */
export default function MiniFooter() {
  const links = [
    { label: "Contact", href: "/#contact", external: false },
    { label: "Email", href: `mailto:${site.email}`, external: false },
    { label: "GitHub", href: site.links.github, external: true },
    { label: "LinkedIn", href: site.links.linkedin, external: true },
  ];

  return (
    <footer className="mt-8 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {links.map((l) =>
            l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </footer>
  );
}
