import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import Reveal from "@/app/components/Reveal";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import BlogCard from "@/app/components/BlogCard";

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
            <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16">
              {posts.map((post, i) => (
                  <Reveal key={post.slug} delay={i * 60} className="h-full">
                    <BlogCard post={post} />
                  </Reveal>
              ))}
            </div>
        )}
      </div>
  );
}