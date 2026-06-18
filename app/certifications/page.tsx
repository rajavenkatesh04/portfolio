import type { Metadata } from "next";
import { certifications } from "@/lib/certifications";
import CertCard from "@/app/components/CertCard";
import Reveal from "@/app/components/Reveal";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Professional certifications and credentials — completed and in progress.",
  openGraph: {
    title: "Certifications",
    description:
      "Professional certifications and credentials — completed and in progress.",
    type: "website",
  },
};

export default function CertificationsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Certifications" }]}
        />
        <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Certifications
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Credentials I&apos;ve earned and ones I&apos;m currently working
          toward. Links and PDFs where available.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 60} className="h-full">
            <CertCard cert={cert} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
