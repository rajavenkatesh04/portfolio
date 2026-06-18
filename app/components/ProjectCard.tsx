import Link from "next/link";
import type { Project } from "@/lib/projects";

/**
 * Project card for the home page. Leads with impact (outcome), THEN the tech
 * stack, then links. Featured projects get extra visual prominence.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const { featured } = project;

  return (
    <article
      className={`group relative flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50 sm:p-8 ${
        featured ? "sm:p-10" : ""
      }`}
    >
      {featured && (
        <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
          Flagship project
        </span>
      )}

      <div className="flex items-baseline justify-between gap-4">
        <h3
          className={`font-serif font-semibold tracking-tight ${
            featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          }`}
        >
          {project.title}
        </h3>
      </div>
      <p className="mt-1 text-sm font-medium text-muted">{project.tagline}</p>

      {/* Lead with the real-world outcome. */}
      <p
        className={`mt-4 text-foreground/90 ${
          featured ? "text-lg leading-relaxed" : "leading-relaxed"
        }`}
      >
        {project.outcome}
      </p>

      {/* Then the stack. */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      {/* Then the links. */}
      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
        {project.links.liveUrl && (
          <a
            href={project.links.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-colors hover:text-accent-hover"
          >
            Live Demo ↗
          </a>
        )}
        {project.links.repoUrl && (
          <a
            href={project.links.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-accent"
          >
            GitHub ↗
          </a>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="ml-auto text-muted transition-colors hover:text-foreground"
        >
          Details →
        </Link>
      </div>
    </article>
  );
}
