/**
 * Blog engine (server-only).
 *
 * Posts are plain Markdown files in `content/blog/`. Drop a new `.md` (or
 * `.mdx`) file in that folder and it AUTOMATICALLY appears in the blog index
 * and gets its own page at /blog/<filename> — no layout edits required.
 *
 * Frontmatter (YAML at the top of each file):
 *   title:          (required) post title
 *   date:           (required) ISO date, e.g. 2026-05-20
 *   excerpt:        (required) short summary for the index + meta description
 *   coverImage:     (optional) path under /public, e.g. /blog/cover.png
 *   relatedProject: (optional) project slug to cross-link back to its detail page
 *
 * The long-form narrative lives here; the project detail page stays a short
 * summary. Don't duplicate content between the two.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  relatedProject?: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: number; // minutes
};

export type Post = PostMeta & {
  html: string;
};

/** ~200 wpm is a standard average reading speed. */
function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function readPostFile(fileName: string) {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  return { slug, data: data as PostFrontmatter, content };
}

/** All posts, newest first, without the rendered HTML body. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((fileName) => {
      const { slug, data, content } = readPostFile(fileName);
      return {
        slug,
        ...data,
        readingTime: estimateReadingTime(content),
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

/** A single post with its Markdown rendered to HTML. */
export async function getPost(slug: string): Promise<Post | null> {
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPath)
    ? mdPath
    : fs.existsSync(mdxPath)
      ? mdxPath
      : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    ...(data as PostFrontmatter),
    readingTime: estimateReadingTime(content),
    html: String(processed),
  };
}
