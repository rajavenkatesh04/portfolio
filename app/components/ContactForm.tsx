"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

export default function ContactForm({ accessKey }: { accessKey?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resultMessage, setResultMessage] = useState("");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status === "success" || status === "error") {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setStatus("idle");
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [status]);

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
        setResultMessage("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setResultMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setResultMessage("Something went wrong. Please try again.");
    }

    setCountdown(5);
  };

  return (
      <div className="flex w-full min-h-[480px] flex-col rounded-2xl border border-border bg-surface-2 p-6 sm:p-8">

        {status === "success" || status === "error" ? (
            // --- STATUS SCREEN ---
            // 'relative' allows the absolute positioning of the countdown,
            // keeping the main content perfectly centered in the container.
            <div className="relative flex flex-1 animate-in fade-in zoom-in-95 duration-500 flex-col items-center justify-center text-center">

              <div className="flex flex-col items-center gap-5">
                {status === "success" ? (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-sm">
                      <Check className="h-8 w-8" strokeWidth={2.5} />
                    </div>
                ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-sm">
                      <X className="h-8 w-8" strokeWidth={2.5} />
                    </div>
                )}
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">
                    {status === "success" ? "Thank You!" : "Oops!"}
                  </h2>
                  <p className="text-foreground">{resultMessage}</p>
                </div>
              </div>

              {/* Countdown pinned elegantly to the bottom */}
              <div className="absolute bottom-0 w-full">
                <p className="text-sm font-medium text-muted">
                  Resetting form in {countdown}...
                </p>
              </div>

            </div>
        ) : (
            // --- FORM SCREEN ---
            <form
                onSubmit={handleSubmit}
                className="flex h-full animate-in fade-in duration-500 flex-col gap-5"
            >
              <h2 className="font-serif text-2xl font-semibold tracking-tight">Send a message</h2>

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

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="message" className="text-sm font-medium text-muted">Message</label>
                <textarea
                    name="message"
                    id="message"
                    rows={5}
                    required
                    disabled={status === "loading"}
                    className="h-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
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
        )}
      </div>
  );
}