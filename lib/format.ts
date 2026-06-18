/**
 * Deterministic date formatting. We pin the locale to en-US and the timezone
 * to UTC so the output is identical on the server and the client — no
 * hydration mismatch and no flash, without needing an inline correction script.
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
