import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs } from "@/lib/posts";
import { getProject } from "@/lib/projects";
import { formatDate } from "@/lib/format";
import Breadcrumbs from "@/app/components/Breadcrumbs";

type Params = { params: Promise<{ slug: string }> };

// Prerender a page for every Markdown file in content/blog.
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// Only the slugs above exist; anything else 404s.
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const relatedProject = post.relatedProject
    ? getProject(post.relatedProject)
    : undefined;

  return (
    // Centered reading column capped at ~700px for comfortable line length.
    <article className="mx-auto w-full px-5 py-16 sm:py-24" style={{ maxWidth: "calc(700px + 2.5rem)" }}>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      {/* Title leads; meta sits below a divider so the header can breathe. */}
      <header className="mt-10">
        <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <div className="mt-8 flex items-center gap-3 border-t border-border pt-5 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden className="text-accent/50">
            ·
          </span>
          <span>{post.readingTime} min read</span>
        </div>
      </header>

      {post.coverImage && (
        <div className="relative mt-12 aspect-video overflow-hidden rounded-2xl border border-border bg-surface-2">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={700}
            height={394}
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Rendered Markdown. Styling + syntax highlighting live in globals.css. */}
      <div
        className="prose mt-12"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {/* Cross-link back to the project detail page. */}
      {relatedProject && (
        <Link
          href={`/projects/${relatedProject.slug}`}
          className="mt-16 flex items-center justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
        >
          <span>
            <span className="block text-xs font-medium uppercase tracking-wider text-muted">
              Related project
            </span>
            <span className="mt-1 block font-serif text-lg font-semibold tracking-tight">
              {relatedProject.title}
            </span>
          </span>
          <span className="ml-4 shrink-0 text-accent">View →</span>
        </Link>
      )}

      {/* Back affordance so readers don't have to scroll up after a long read. */}
      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/blog"
          className="text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}
