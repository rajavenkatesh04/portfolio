import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectCard from "@/app/components/ProjectCard";
import Reveal from "@/app/components/Reveal";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things I've built and shipped — from a multilingual RAG system to high-traffic web platforms.",
  openGraph: {
    title: "Projects",
    description:
      "Things I've built and shipped — from a multilingual RAG system to high-traffic web platforms.",
    type: "website",
  },
};

// Flagship first, then the rest — mirrors the home page hierarchy.
const featured = projects.filter((p) => p.featured);
const secondary = projects.filter((p) => !p.featured);

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        />
        <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Things I&apos;ve built and shipped — each one leads with what it does
          and the real-world outcome, then the stack.
        </p>
      </Reveal>

      <div className="mt-12 flex flex-col gap-5 sm:mt-16">
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
    </div>
  );
}
