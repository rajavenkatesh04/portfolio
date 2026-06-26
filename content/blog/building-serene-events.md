---
title: "Building Serene Events"
date: "2026-03-02"
excerpt: "An event platform with real-time chat, QR-code check-in, and live admin dashboards — and what it taught me about building on real-time data at scale."
coverImage: "/blog/serene-events.jpg"
relatedProject: "serene-events-platform"
---


Events generate a flood of small, time-sensitive interactions: messages, check-ins, status changes. Serene Events is my attempt to make all of that feel instant for attendees and legible for organisers — a platform that served **15,000+ users** across **36,000+ page views**.

## What the platform does

Three things, done well:

- **Real-time chat** — attendees and organisers talk in the moment, no refresh.
- **QR-code check-in** — scan to admit, view the event notice board, attendance updates live.
- **Live admin dashboards** — organisers watch registrations, check-ins, and engagement update in real time and feedbacm submissions.

It's built on [Next.js](https://nextjs.org) for the app and [Firebase](https://firebase.google.com) for real-time FCM notifications, auth, and storage.

## The interesting part: real-time notifications and notices

Real-time UIs are deceptively hard. The happy path — a value changes, the screen updates — is easy. The edges are where the work is.

**Subscriptions have a cost.** Naively, every open dashboard listens to everything. That doesn't scale. The fix was scoping each listener tightly to exactly the data a view needs, and tearing it down the moment the view unmounts.

```ts
// Illustrative: scope the listener, and always clean it up.
useEffect(() => {
  const q = query(collection(db, "checkins"), where("eventId", "==", eventId));
  const unsub = onSnapshot(q, (snap) => {
    setCheckins(snap.docs.map((d) => d.data()));
  });
  return () => unsub(); // detach on unmount — no leaked listeners
}, [eventId]);
```

**Optimistic, but honest.** Chat feels best when your own message appears instantly, before the server confirms it. The trick is reconciling that optimistic state with the real write — and handling the case where the write fails without silently dropping the message.

**The dashboard is a read-heavy view of a write-heavy system.** Organisers want totals and trends, not raw documents. Aggregating on read kept the write path simple while still giving dashboards something fast to render.

> The lesson I keep relearning: real-time isn't "push every change everywhere." It's deciding, per view, what truly needs to be live.

## What I learned

- **Clean up your subscriptions.** Leaked listeners are the silent killer of real-time apps.
- **Design the read model deliberately.** What the dashboard shows shaped how I stored data.
- **Latency is perceived, not just measured.** Optimistic updates made the app *feel* faster than any backend tweak did.

## Future improvements

- Move heavy aggregation into scheduled jobs or a derived store.
- Add presence ("who's online") without hammering the database.
- Offline-friendly check-in for venues with poor connectivity.

For the condensed version with the stack and metrics, see the [project page](/projects/serene-events-platform).
