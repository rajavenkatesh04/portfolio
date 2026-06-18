import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { certifications } from "@/lib/certifications";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import ProjectCard from "@/app/components/ProjectCard";
import CertCard from "@/app/components/CertCard";
import Reveal from "@/app/components/Reveal";

// Skills grouped by category — compact, no progress bars. Edit freely.
const skillGroups: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Java", "JavaScript", "TypeScript", "Python", "SQL"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind", "Material UI"] },
  { category: "Backend", items: ["Node.js", "Express", "REST APIs"] },
  { category: "Data & AI", items: ["PostgreSQL", "MongoDB", "Firebase", "RAG", "LangChain", "FAISS"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "GCP", "Vercel"] },
];

// Home shows a curated preview (max 3); the full lists live behind "View all".
const featured = projects.filter((p) => p.featured);
const secondary = projects
  .filter((p) => !p.featured)
  .slice(0, Math.max(0, 3 - featured.length));
const previewCerts = certifications.slice(0, 3);
const latestPost = getAllPosts()[0];

// Shared section rhythm: identical horizontal frame + vertical padding so every
// section breathes the same. Anchor offset clears the sticky header.
const SECTION = "mx-auto max-w-5xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24";

export default function Home() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            {site.role}
          </p>
          <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.04] tracking-[-0.02em] sm:text-7xl">
            {site.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {site.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {/* Plain anchor (bare hash) = native smooth scroll, no router hash
                stacking. scroll-padding-top keeps it clear of the header. */}
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
            >
              View Projects
            </a>
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Download Résumé
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              GitHub ↗
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              LinkedIn ↗
            </a>
          </div>
        </Reveal>
      </section>

      {/* ===================== PROJECTS ===================== */}
      <section id="projects" className={SECTION}>
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionLabel>Projects</SectionLabel>
            <Link
              href="/projects"
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              View all →
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-5 sm:mt-12">
          {/* Flagship gets a full-width row for prominence. */}
          {featured.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
          {/* Secondary projects share an equal-height two-up grid. */}
          <div className="grid gap-5 sm:grid-cols-2">
            {secondary.map((project, i) => (
              <Reveal key={project.slug} delay={i * 70} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section id="about" className={SECTION}>
        <Reveal>
          <SectionLabel>About</SectionLabel>
          <p className="mt-8 max-w-2xl font-serif text-2xl leading-[1.5] tracking-[-0.01em] sm:text-[1.75rem]">
            I like taking an idea from a blank repo to something deployed and
            used by real people — whether that&apos;s an AI retrieval system or a
            high-traffic web app. I&apos;m strong in full-stack JavaScript and
            applied AI, and I&apos;m currently looking for a software engineering
            role where I can ship from day one.
          </p>
        </Reveal>
      </section>

      {/* ===================== SKILLS ===================== */}
      <section id="skills" className={SECTION}>
        <Reveal>
          <SectionLabel>Skills</SectionLabel>
        </Reveal>
        {/* Spec-sheet layout: category label, then the toolset as light pills. */}
        <dl className="mt-8 border-t border-border sm:mt-10">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 50}>
              <div className="grid grid-cols-1 gap-3 border-b border-border py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <dt className="font-serif text-lg font-medium tracking-tight text-accent">
                  {group.category}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ===================== EDUCATION ===================== */}
      <section id="education" className={SECTION}>
        <Reveal>
          <SectionLabel>Education</SectionLabel>
          <div className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-serif text-xl font-semibold tracking-tight sm:text-2xl">
                  B.Tech, Computer Science &amp; Engineering
                </h3>
                <p className="mt-1.5 text-muted">
                  SRM Institute of Science and Technology, Chennai
                </p>
                <p className="mt-3 text-sm text-muted">2022 – 2026</p>
              </div>
              <div className="shrink-0 self-start rounded-xl bg-surface-2 px-6 py-4 text-center sm:self-auto sm:min-w-[7rem]">
                <p className="font-serif text-3xl font-semibold tracking-tight">
                  7.98
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-wider text-muted">
                  CGPA / 10
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================== CERTIFICATIONS ===================== */}
      <section id="certifications" className={SECTION}>
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionLabel>Certifications</SectionLabel>
            <Link
              href="/certifications"
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {previewCerts.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 60} className="h-full">
              <CertCard cert={cert} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== FROM THE BLOG ===================== */}
      {latestPost && (
        <section id="writing" className={SECTION}>
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <SectionLabel>From the blog</SectionLabel>
              <Link
                href="/blog"
                className="text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                View all →
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <Link
              href={`/blog/${latestPost.slug}`}
              className="group mt-8 flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] sm:flex-row"
            >
              <div className="relative aspect-[16/9] shrink-0 bg-surface-2 sm:aspect-auto sm:w-2/5">
                {latestPost.coverImage && (
                  <Image
                    src={latestPost.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 40vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
                  <time dateTime={latestPost.date}>
                    {formatDate(latestPost.date)}
                  </time>
                  <span aria-hidden className="text-accent/50">
                    ·
                  </span>
                  <span>{latestPost.readingTime} min read</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                  {latestPost.title}
                </h3>
                <p className="mt-2.5 line-clamp-3 leading-relaxed text-muted">
                  {latestPost.excerpt}
                </p>
                <span className="mt-auto pt-6 text-sm font-medium text-accent">
                  Read post →
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
      {children}
    </p>
  );
}
