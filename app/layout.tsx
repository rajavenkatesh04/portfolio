import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";

// Sans for UI/body, Fraunces serif for display + reading, mono for code.
// Variable fonts, self-hosted by next/font => no layout shift, no Google calls.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "Guthula Raja Venkatesh",
    "full-stack developer",
    "AI developer",
    "RAG",
    "Next.js",
    "software engineer",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

/*
 * Runs synchronously in <head> before first paint:
 *  - marks <html> with `js` so scroll-reveal can safely hide-then-show content
 *  - sets data-theme from saved preference, falling back to the OS setting
 * This prevents any flash of the wrong theme. See AGENTS guide:
 * preventing-flash-before-hydration.
 */
const themeScript = `(function(){try{document.documentElement.classList.add('js');var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',t||(d?'dark':'light'));}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
