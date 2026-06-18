import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import Reveal from "@/app/components/Reveal";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on building things — project deep-dives, applied AI, and lessons from shipping software people actually use.",
  openGraph: {
    title: "Blog",
    description:
      "Project deep-dives, applied AI, and lessons from shipping software people actually use.",
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        />
        <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Writing
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Project deep-dives and notes on building software — the long-form
          stories behind the work.
        </p>
      </Reveal>

      {posts.length === 0 ? (
        <p className="mt-16 text-muted">No posts yet. Check back soon.</p>
      ) : (
        <ul className="mt-12 flex flex-col">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 60}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block border-t border-border py-8 transition-colors"
                >
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-muted">{post.excerpt}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-accent">
                    Read post →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
