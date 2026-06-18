# rajavenkatesh.dev

Personal portfolio of **Guthula Raja Venkatesh** — a clean, fast, content-first site built with Next.js. A single-page main site plus dedicated routes for project detail pages and a Markdown-powered blog.

- **Single-page main site** — Hero → Projects → About → Skills → Education → Contact
- **Project detail pages** at `/projects/[slug]`
- **Blog** at `/blog` and `/blog/[slug]`, powered by Markdown files you just drop in
- **Light / dark mode** with no flash on load (respects system preference)
- **Fully static** — every route is prerendered at build time for top performance and SEO

## Tech stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) + React 19 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) with CSS-variable design tokens |
| Fonts | Inter (UI) · Fraunces (serif display & reading) · JetBrains Mono (code) — self-hosted via `next/font` |
| Content | Markdown + frontmatter via `gray-matter` and the `remark`/`rehype` pipeline |
| Language | TypeScript |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build (prerenders every page)
npm start       # serve the production build
npm run lint    # ESLint
```

## Project structure

```
app/
  layout.tsx              Root layout: fonts, no-flash theme script, base SEO, header/footer
  globals.css             Design tokens, dark theme, prose + code-block styles
  page.tsx                Main single page (Hero, Projects, About, Skills, Education)
  not-found.tsx           Styled 404
  sitemap.ts / robots.ts  SEO files (auto-generated from your data)
  components/             Header, Footer, ThemeToggle, ProjectCard, Reveal
  projects/[slug]/        Project detail pages
  blog/                   Blog index and post pages
lib/
  site.ts                 Name, tagline, links, résumé path, nav  ← edit me
  projects.ts             All project data                        ← edit me
  posts.ts                Blog engine (frontmatter, reading time, Markdown → HTML)
  format.ts               Deterministic date formatting
content/blog/             Your blog posts as Markdown files       ← add files here
public/                   Static assets (résumé, screenshots, OG images, favicon)
```

## Customizing

Most edits happen in three places — **you rarely need to touch the layout/components.**

### 1. Site basics — `lib/site.ts`
Your name, role, tagline, social links, résumé path, and the top-nav items.

### 2. Accent color — `app/globals.css`
The entire site is themed from a single CSS variable. Change it in one place:

```css
:root {
  --accent: #b5502e; /* light mode */
}
[data-theme="dark"] {
  --accent: #e08a6c; /* dark mode */
}
```

All other colors are semantic tokens (`--background`, `--foreground`, `--muted`, `--border`, `--surface`) that automatically swap between light and dark.

### 3. Projects — `lib/projects.ts`
Add or edit entries in the `projects` array. Each project automatically gets a card on the home page and a detail page at `/projects/<slug>`. Set `featured: true` to give a project visual prominence. Use `relatedPost` to link a project to its blog deep-dive.

## Adding a blog post

Drop a new `.md` file into `content/blog/`. It **automatically** appears in the blog index (newest first) and gets its own page at `/blog/<filename>` — no code changes needed.

```markdown
---
title: "Your post title"
date: "2026-06-18"
excerpt: "A short summary shown in the index and used for SEO/social previews."
coverImage: "/blog/your-cover.png"   # optional
relatedProject: "project-slug"        # optional — cross-links to a project page
---

Your content in **Markdown**. Code blocks get subtle, theme-aware
syntax highlighting:

```python
print("hello")
```
```

Reading time is estimated automatically. Keep project pages as short summaries and put the long narrative in the blog post — the two cross-link to each other.

## Placeholder assets to add

These are referenced by the site; the build works without them, but they'll 404 until you drop them in:

- `public/resume.pdf` — your résumé (the "Download Résumé" buttons)
- `public/projects/rag-system.png`, `public/projects/hostels.png`, `public/projects/serene-events.png` — project screenshots (~16:10)
- `public/blog/…` — cover images referenced by posts
- `app/favicon.ico` — already present; optionally add `app/icon.svg` and `app/opengraph-image.png` (1200×630) for richer link previews
- Update `site.url` in `lib/site.ts` if your domain differs

## Deploying

Optimized for [Vercel](https://vercel.com/new) — push the repo and import it. Any static host works too, since the site builds to static output.
