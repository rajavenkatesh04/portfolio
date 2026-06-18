import { site } from "@/lib/site";

/**
 * Global footer = the Contact section (anchor: #contact, linked from the nav).
 * "Open to opportunities" line + one-click contact links + résumé download.
 */
export default function Footer() {
  const contacts = [
    { label: "Email", href: `mailto:${site.email}`, external: false },
    { label: "GitHub", href: site.links.github, external: true },
    { label: "LinkedIn", href: site.links.linkedin, external: true },
    { label: "LeetCode", href: site.links.leetcode, external: true },
  ];

  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-border bg-surface/40"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Contact
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Open to opportunities
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          I&apos;m looking for a software engineering role where I can ship from
          day one. The fastest way to reach me is email — I reply to every
          message.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {c.label}
            </a>
          ))}
          <a
            href={site.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
          >
            Download Résumé
          </a>
        </div>

        <p className="mt-14 text-sm text-muted">
          © {new Date().getFullYear()} {site.name}.
        </p>
      </div>
    </footer>
  );
}
