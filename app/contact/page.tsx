import type { Metadata } from "next";
import { site } from "@/lib/site";
import Reveal from "@/app/components/Reveal";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ContactForm from "@/app/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
      "Get in touch. I'm looking for a software engineering role where I can ship from day one.",
  openGraph: {
    title: "Contact",
    description:
        "Get in touch. I'm looking for a software engineering role where I can ship from day one.",
    type: "website",
  },
};

export default function ContactPage() {
  const social = [
    { label: "GitHub", href: site.links.github },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "LeetCode", href: site.links.leetcode },
  ];

  return (
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        {/* Header Section */}
        <Reveal>
          <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
          <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            I&apos;m looking for a software engineering role where I can ship from
            day one. The fastest way to reach me is email — I reply to every
            message.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Left Side: Form (Strictly Separate) */}
          <Reveal delay={60} className="w-full">
            {/* Rendered directly to prevent the double-box/double-title issue */}
            <ContactForm accessKey={process.env.web3_ACCESS} />
          </Reveal>

          {/* Right Side: Email and Grouped Links */}
          <div className="flex flex-col gap-6">

            {/* Top Block: Email (Strictly Separate) */}
            <Reveal delay={120}>
              <a
                  href={`mailto:${site.email}`}
                  className="group flex flex-col justify-center rounded-3xl border border-border bg-surface-2 p-6 transition-all hover:border-accent hover:bg-surface hover:shadow-sm sm:p-8"
              >
                <p className="mb-2 text-sm font-medium text-muted">Email directly</p>
                <div className="inline-flex items-baseline gap-2 font-serif text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:gap-3 sm:text-4xl">
                <span className="break-all underline decoration-border decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-accent">
                  {site.email}
                </span>
                  <span aria-hidden className="shrink-0 text-xl text-accent sm:text-3xl">
                  ↗
                </span>
                </div>
              </a>
            </Reveal>

            {/* Bottom Block: Rest (Grouped neatly into one container) */}
            <Reveal delay={180}>
              <div className="flex flex-col gap-2 rounded-3xl border border-border bg-surface-2 p-3 sm:p-4">

                {/* Social Links */}
                {social.map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-2xl px-5 py-4 transition-all hover:bg-surface hover:shadow-sm"
                    >
                      <span className="font-medium text-foreground">{s.label}</span>
                      <span className="text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent">
                    ↗
                  </span>
                    </a>
                ))}

                {/* Résumé Button Grouped at the bottom */}
                <a
                    href={site.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-2 flex items-center justify-between rounded-2xl bg-accent px-5 py-4 text-accent-contrast transition-all hover:bg-accent-hover hover:shadow-sm"
                >
                  <span className="font-medium">Download Résumé</span>
                  <span className="transition-transform group-hover:translate-y-1">
                  ↓
                </span>
                </a>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
  );
}