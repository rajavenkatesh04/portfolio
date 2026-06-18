import Link from "next/link";
import { site } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/**
 * Accessible breadcrumb trail for nested routes (project + blog pages).
 * The last item is the current page (no link). Also emits BreadcrumbList
 * JSON-LD so search engines show the trail in results.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="max-w-[60vw] truncate text-foreground sm:max-w-xs"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="text-accent/50">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
