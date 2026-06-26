/**
 * Project data — the single source of truth for both the home page cards
 * and the /projects/[slug] detail pages.
 *
 * To add or edit a project, change this file only. No layout edits needed.
 *
 * Field guide:
 * - slug:        URL segment -> /projects/<slug>
 * - title:       Project name
 * - tagline:     One line describing what it IS
 * - outcome:     Lead with real-world impact (shown prominently on cards)
 * - summary:     One-paragraph overview for the detail page
 * - stack:       Tech used (kept short; impact comes first)
 * - metrics:     Key numbers shown on the detail page
 * - featured:    true => given visual prominence on the home page
 * - links:       liveUrl + repoUrl ("" hides the link)
 * - screenshot:  path under /public (drop the image in; placeholder until then)
 * - relatedPost: blog slug for the "Read the full story" link (optional)
 */

export type Metric = { label: string; value: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  outcome: string;
  summary: string;
  stack: string[];
  metrics: Metric[];
  featured: boolean;
  links: { liveUrl: string; repoUrl: string };
  screenshot: string;
  relatedPost?: string;
};

export const projects: Project[] = [
  {
    slug: "code-mixed-rag-disaster-relief-chatbot",
    title: "Code-Mixed RAG System",
    tagline: "Disaster Relief Chatbot",
    outcome:
      "An AI assistant that answers disaster-relief queries in Tamil, English, and code-mixed Tanglish — grounded in official government documents through retrieval-augmented generation.",
    summary:
      "A retrieval-augmented generation (RAG) assistant built to make official disaster-relief information accessible to everyone, regardless of how they type. It understands questions in Tamil, English, and code-mixed Tanglish, retrieves relevant passages from official government documents with a FAISS vector index, and grounds a Llama-3.3-70B model's answers in that source material to avoid hallucination. This is my flagship project — an end-to-end applied-AI system from document ingestion to a multilingual conversational interface.",
    stack: ["Python", "LangChain", "FAISS", "Llama-3.3-70B"],
    metrics: [
      { label: "Languages", value: "Tamil · English · Tanglish" },
      { label: "Grounding", value: "Official govt. documents" },
      { label: "Approach", value: "Retrieval-augmented generation" },
    ],
    featured: true,
    links: { liveUrl: "", repoUrl: "https://github.com/rajavenkatesh04" },
    screenshot: "/projects/rag-system.png",
    relatedPost: "rag-system-for-code-mixed-tamil-queries",
  },
  {
    slug: "hostels-selection-platform",
    title: "Hostels",
    tagline: "Hostel Selection Platform",
    outcome:
      "Helped 21,000+ incoming college students browse and pick their dorm, serving 118,000+ page views in production.",
    summary:
      "A high-traffic platform that helps incoming college students browse, compare, and choose their hostel before arriving on campus. Built with Next.js and React for speed and a clean mobile experience, it served tens of thousands of students during the admissions window and handled real production traffic at scale.",
    stack: ["Next.js", "React"],
    metrics: [
      { label: "Students served", value: "21,000+" },
      { label: "Page views", value: "118,000+" },
      { label: "Status", value: "Shipped to production" },
    ],
    featured: false,
    links: { liveUrl: "https://hostel-livid.vercel.app/", repoUrl: "https://github.com/rajavenkatesh04/hostels" },
    screenshot: "/projects/hostels.png",
    relatedPost: "building-a-hostel-platform-for-21000-students",
  },
  {
    slug: "serene-events-platform",
    title: "Serene Events",
    tagline: "Event Management Platform",
    outcome:
      "Powered real-time chat, QR-code check-in, and live admin dashboards for events serving 15,000+ users.",
    summary:
      "An event management platform with real-time chat, QR-code check-in, and live admin dashboards. Built on Next.js and Firebase for real-time data sync, it gave organisers live visibility into attendance and engagement while serving thousands of attendees across events.",
    stack: ["Next.js", "Firebase"],
    metrics: [
      { label: "Users served", value: "15,000+" },
      { label: "Features", value: "Real-time chat · QR check-in" },
      { label: "Dashboards", value: "Live admin analytics" },
    ],
    featured: false,
    links: { liveUrl: "https://serene-events.vercel.app/", repoUrl: "https://github.com/rajavenkatesh04/serene-events" },
    screenshot: "/projects/serene-events.png",
    relatedPost: "building-serene-events",
  },
  {
    slug: "Deeperweave-film-history-platform",
    title: "DeeperWeave",
    tagline: "Watch history tracker",
    outcome:
        "Made a film & series watch history tracker.",
    summary:
        "An event management platform with real-time chat, QR-code check-in, and live admin dashboards. Built on Next.js and Firebase for real-time data sync, it gave organisers live visibility into attendance and engagement while serving thousands of attendees across events.",
    stack: ["Next.js", "Firebase"],
    metrics: [
      { label: "Users served", value: "15,000+" },
      { label: "Features", value: "Real-time chat · QR check-in" },
      { label: "Dashboards", value: "Live admin analytics" },
    ],
    featured: false,
    links: { liveUrl: "https://deeperweave.com/", repoUrl: "https://github.com/rajavenkatesh04/deeperweave" },
    screenshot: "/projects/deeperweave.png",
    relatedPost: "building-deeperweave",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
