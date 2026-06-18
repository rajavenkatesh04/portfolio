import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { getPostSlugs } from "@/lib/posts";

// Auto-generated sitemap covering the home page, every project, and every post.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticRoutes = [
    { url: base, priority: 1 },
    { url: `${base}/projects`, priority: 0.8 },
    { url: `${base}/blog`, priority: 0.8 },
    { url: `${base}/certifications`, priority: 0.6 },
  ];

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    priority: 0.7,
  }));

  const postRoutes = getPostSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    priority: 0.6,
  }));

  const now = new Date();
  return [...staticRoutes, ...projectRoutes, ...postRoutes].map((r) => ({
    ...r,
    lastModified: now,
  }));
}
