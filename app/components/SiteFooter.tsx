"use client";

import { usePathname } from "next/navigation";
import ContactFooter from "./ContactFooter";
import MiniFooter from "./MiniFooter";

/**
 * Route-aware footer: the full contact section closes the home page, while
 * every other route gets the minimal footer.
 */
export default function SiteFooter() {
  const pathname = usePathname();
  return pathname === "/" ? <ContactFooter /> : <MiniFooter />;
}
