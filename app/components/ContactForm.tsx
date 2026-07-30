"use client";

import { useState } from "react";

export default function ContactForm({ accessKey }: { accessKey?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    if (accessKey) {
      formData.set("access_key", accessKey);
    }
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setToastMessage("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setToastMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setToastMessage("Something went wrong. Please try again.");
    }

    setTimeout(() => {
      setStatus("idle");
    }, 4000);
  };

  return (
      <>
        <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-5 rounded-2xl border border-border bg-surface-2 p-6 sm:p-8"
        >
          <h2 className="font-serif text-2xl font-semibold tracking-tight">Send a message</h2>

          {/* Optional Web3Forms configurations */}
          <input type="hidden" name="subject" value="New Submission from Portfolio" />
          <input type="hidden" name="from_name" value="Portfolio Contact Form" />

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-muted">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                required
                disabled={status === "loading"}
                className="rounded-lg border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-muted">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                required
                disabled={status === "loading"}
                className="rounded-lg border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                placeholder="john@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-muted">Message</label>
            <textarea
                name="message"
                id="message"
                rows={5}
                required
                disabled={status === "loading"}
                className="resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                placeholder="How can I help you?"
            ></textarea>
          </div>

          <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 inline-flex w-full justify-center rounded-xl bg-accent px-6 py-3 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

        </form>

        {/* Top-Right Toast Notification */}
        <div
            className={`fixed right-4 top-6 z-50 flex items-center gap-3 whitespace-nowrap rounded-lg border border-border bg-surface px-5 py-4 text-sm font-medium shadow-lg transition-all duration-300 sm:right-8 sm:top-8 ${
                status === "success" || status === "error"
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-8 opacity-0"
            }`}
        >
          {status === "success" && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs text-accent-contrast">✓</span>
          )}
          {status === "error" && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">✕</span>
          )}
          <span className="text-foreground">{toastMessage}</span>
        </div>
      </>
  );
}