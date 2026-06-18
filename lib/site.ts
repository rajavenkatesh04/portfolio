/**
 * Global site configuration.
 *
 * Edit your name, tagline, links, and résumé path here — these values flow
 * into the header, footer, hero, and SEO metadata across the whole site.
 *
 * NOTE: The single accent colour lives in `app/globals.css` as the
 * `--accent` CSS variable. Change it there to re-theme the entire site.
 */

export const site = {
  name: "Guthula Raja Venkatesh",
  shortName: "Raja Venkatesh",
  // Used as the <title> suffix and for SEO.
  role: "Full-stack & AI Developer",
  // The one-line positioning statement shown in the hero.
  tagline:
    "Full-stack & AI developer — I build web apps people actually use, from a multilingual RAG system to platforms serving 20,000+ users.",
  description:
    "Guthula Raja Venkatesh — final-year CS student and full-stack & AI developer. I build web apps people actually use, from a multilingual RAG system to high-traffic platforms.",
  // Canonical production URL — used for Open Graph / absolute links.
  url: "https://rajavenkatesh.dev",
  locale: "en_US",

  // Résumé lives in /public. Drop your file here (see README at end of build).
  resumePath: "/resume.pdf",

  // Contact + social links. `email` powers the one-click mailto.
  email: "grv.9604@gmail.com",
  links: {
    github: "https://github.com/rajavenkatesh04",
    linkedin: "https://linkedin.com/in/guthularajavenkatesh",
    leetcode: "https://leetcode.com/u/rajavenkatesh20",
  },
} as const;

// Top navigation. Each `href` points to a section id on the home page.
export const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
] as const;
