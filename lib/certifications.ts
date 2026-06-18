/**
 * Certifications — the single source of truth for the home "Certifications"
 * section and the /certifications page.
 *
 * To add one, append to the array below. Nothing else to touch.
 *
 * Field guide:
 * - title:         Certification name
 * - issuer:        Who issued it (AWS, NPTEL, Coursera, …)
 * - date:          Display string ("2024", "Issued May 2025", "Expected 2026")
 * - status:        "completed" (default) or "in-progress"
 * - credentialUrl: Public verification / credential link (optional)
 * - pdf:           Path under /public to the certificate PDF (optional)
 *
 * For PDFs, drop the file in /public/Certifications and point `pdf` at it.
 * URL-encode spaces in the path (e.g. "%20").
 */

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  status?: "completed" | "in-progress";
  credentialUrl?: string;
  pdf?: string;
};

export const certifications: Certification[] = [
  {
    title: "AWS ML Foundations",
    issuer: "Amazon Web Services",
    date: "2024",
    status: "completed",
    credentialUrl:
        "https://www.credly.com/badges/398d2325-e033-4ac4-9497-563902975173/linked_in_profile",
  },
  {
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Amazon Web Services",
    date: "Expected 2026",
    status: "in-progress",
    // Add credentialUrl / pdf once earned.
  },
  {
    title: "Programming in Java",
    issuer: "NPTEL",
    date: "2024",
    status: "completed",
    pdf: "/Certifications/Programming%20In%20Java.pdf",
  },
  {
    title: "Database Management with MySQL",
    issuer: "Meta",
    date: "2024",
    status: "completed",
    credentialUrl:
        "https://coursera.org/share/7f3dc90ffdefedcdb725302c9e0ee9a9",
  },
  {
    title: "React Foundations",
    issuer: "Next.js / Vercel",
    date: "2025",
    status: "completed",
    credentialUrl:
        "https://nextjs.org/learn/certificate?course=react-foundations&user=13211&certId=react-foundations-13211-1751929866052",
  },
  {
    title: "Next.js App Router",
    issuer: "Next.js / Vercel",
    date: "2025",
    status: "completed",
    credentialUrl:
        "https://nextjs.org/learn/certificate?course=dashboard-app&user=13211&certId=dashboard-app-13211-1752407713062",
  },
];