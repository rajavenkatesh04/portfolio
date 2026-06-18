import { site } from "@/lib/site";

/**
 * Full contact footer — the closing "Contact" section of the home page
 * (anchor: #contact, linked from the nav). The oversized email link is the
 * signature element: the single, obvious way to reach out.
 */
export default function ContactFooter() {
  const social = [
    { label: "GitHub", href: site.links.github },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "LeetCode", href: site.links.leetcode },
  ];

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-border bg-surface/40"
    >
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Contact
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-5xl">
          Open to opportunities
        </h2>
        <p className="mt-5 max-w-xl text-muted">
          I&apos;m looking for a software engineering role where I can ship from
          day one. The fastest way to reach me is email — I reply to every
          message.
        </p>

        {/* Signature element: the email, large and unmissable. */}
        <a
          href={`mailto:${site.email}`}
          className="group mt-10 inline-flex items-baseline gap-3 font-serif text-3xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-5xl"
        >
          <span className="break-all underline decoration-border decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-accent">
            {site.email}
          </span>
          <span aria-hidden className="text-accent text-2xl sm:text-3xl">
            ↗
          </span>
        </a>

        {/* Secondary links + résumé. */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {s.label}
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

        {/* Bottom bar. */}
        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}.
          </p>
          <p>Designed &amp; built with Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
