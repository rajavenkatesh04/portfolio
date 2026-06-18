import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";
import Reveal from "@/app/components/Reveal";

type Params = { params: Promise<{ slug: string }> };

// Prerender every project at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.tagline}`;
  return {
    title: project.title,
    description: project.outcome,
    openGraph: {
      title,
      description: project.outcome,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // Resolve the related blog post (if the slug exists as an actual post).
  const relatedPost =
    project.relatedPost &&
    getAllPosts().find((p) => p.slug === project.relatedPost);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <Link
          href="/#projects"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Back to projects
        </Link>

        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-2 text-lg text-muted">{project.tagline}</p>
      </Reveal>

      {/* Screenshot. Drop your image at public{project.screenshot}. */}
      <Reveal delay={60}>
        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface-2">
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      </Reveal>

      {/* One-paragraph overview. */}
      <Reveal delay={80}>
        <p className="mt-10 text-lg leading-relaxed">{project.summary}</p>
      </Reveal>

      {/* Key metrics. */}
      <Reveal delay={100}>
        <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-surface p-5">
              <dt className="text-xs font-medium uppercase tracking-wider text-muted">
                {m.label}
              </dt>
              <dd className="mt-1.5 font-serif text-xl font-semibold tracking-tight">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Tech stack. */}
      <Reveal delay={120}>
        <div className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
            Tech stack
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Links. */}
      <Reveal delay={140}>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
          {project.links.liveUrl && (
            <a
              href={project.links.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-5 py-2 text-accent-contrast transition-colors hover:bg-accent-hover"
            >
              Live Demo ↗
            </a>
          )}
          {project.links.repoUrl && (
            <a
              href={project.links.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2 transition-colors hover:border-accent hover:text-accent"
            >
              View Code ↗
            </a>
          )}
        </div>
      </Reveal>

      {/* Read the full story -> blog post. */}
      {relatedPost && (
        <Reveal delay={160}>
          <Link
            href={`/blog/${relatedPost.slug}`}
            className="mt-14 flex items-center justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <span>
              <span className="block text-xs font-medium uppercase tracking-wider text-muted">
                The full story
              </span>
              <span className="mt-1 block font-serif text-lg font-semibold tracking-tight">
                {relatedPost.title}
              </span>
            </span>
            <span className="ml-4 shrink-0 text-accent">Read →</span>
          </Link>
        </Reveal>
      )}
    </article>
  );
}
