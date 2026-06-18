import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    // Same width as the rest of the site; reading width is reserved for posts.
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
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
        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 60} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)]"
              >
                {/* Cover image (drop the file in public/blog/). */}
                <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden className="text-accent/50">
                      ·
                    </span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h2 className="mt-3 font-serif text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 line-clamp-3 leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-6 text-sm font-medium text-accent">
                    Read post →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
