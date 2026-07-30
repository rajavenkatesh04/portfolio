import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/format";

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readingTime: number;
    coverImage?: string;
};

export default function BlogCard({ post }: { post: Post }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row gap-5 sm:gap-6 rounded-2xl border border-border bg-surface p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)]"
        >
            {/* Image Container: Aspect-video on mobile, fixed width on tablet/desktop */}
            <div className="relative aspect-video sm:aspect-[4/3] sm:w-56 md:w-64 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                {post.coverImage && (
                    <Image
                        src={post.coverImage}
                        alt=""
                        fill
                        loading="eager"
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                )}
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col">
                <h2 className="mb-3 font-serif text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                    {post.title}
                </h2>

                <p className="mb-4 line-clamp-2 sm:line-clamp-3 flex-1 leading-relaxed text-muted">
                    {post.excerpt}
                </p>

                {/* Infobox */}
                <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span aria-hidden className="text-accent/50">
              ·
            </span>
                        <span>{post.readingTime} min read</span>
                    </div>

                    <span className="text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
            Read →
          </span>
                </div>
            </div>
        </Link>
    );
}