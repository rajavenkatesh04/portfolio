import type { Certification } from "@/lib/certifications";

/**
 * A single certification card, shared by the home section and /certifications.
 * Footer actions (verify link / PDF) are pinned to the bottom via mt-auto so
 * cards stay aligned in a grid.
 */
export default function CertCard({ cert }: { cert: Certification }) {
  const inProgress = cert.status === "in-progress";

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight">
          {cert.title}
        </h3>
        {inProgress && (
          <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-accent">
            In progress
          </span>
        )}
      </div>

      <p className="mt-1.5 text-sm text-muted">{cert.issuer}</p>
      <p className="mt-3 text-sm text-muted">{cert.date}</p>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm font-medium">
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-colors hover:text-accent-hover"
          >
            Verify ↗
          </a>
        )}
        {cert.pdf && (
          <a
            href={cert.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-accent"
          >
            Certificate (PDF) ↗
          </a>
        )}
        {inProgress && !cert.credentialUrl && !cert.pdf && (
          <span className="text-muted">Currently preparing</span>
        )}
      </div>
    </div>
  );
}
