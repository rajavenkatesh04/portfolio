---
title: "Building DeeperWeave"
date: "2026-07-30"
excerpt: "How i built the meticulous ledger for film, television, and anime."
coverImage: "/blog/deeperweave.png"
relatedProject: "DeeperWeave"
---

DeeperWeave started with a very specific itch: I wanted a platform for cinephiles that felt like Letterboxd, but featured iOS-polished profile widgets and catered specifically to a South Asian audience[cite: 1]. I wanted regional language films, India-first region detection, and localized INR pricing right out of the box[cite: 1].

Building it turned into a massive lesson in caching, data synchronization, and optimistic UI. Here is a look under the hood.

## The Stack

I decided to go all-in on the modern React ecosystem. The core application runs on Next.js 16 (App Router) and React 19[cite: 1].

For the backend, I leaned on Supabase[cite: 1]. Having PostgreSQL 17, Row Level Security (RLS), Auth, and Storage all bundled together allowed me to move fast without managing infrastructure[cite: 1]. External media data comes from the TMDB (The Movie Database) API, while styling is handled by Tailwind CSS v4 and shadcn/ui[cite: 1].

## Architectural "Aha" Moments

When you're building a highly interactive, data-heavy application, you run into bottlenecks quickly. I had to adopt a few core patterns to keep the app snappy:

### 1. The Lazy Mirror Pattern
Relying entirely on TMDB as the source of truth sounds great until you need to enforce foreign key constraints in your database.

To solve this, I implemented a "Lazy Mirror" pattern. Before attaching any TMDB entity to a user's record—whether it's a review, a saved item, or a queue entry—the application intercepts the request and upserts that entity into my local database's mirror tables (`movies`, `tv_shows`, `people`)[cite: 1]. This ensures my local Foreign Keys remain intact while keeping a warm cache of popular media[cite: 1].

### 2. Aggressive Caching
Hitting TMDB for every page load would destroy performance. I wrapped all TMDB fetches in Next.js's `unstable_cache()` with a 24-hour revalidation window and assigned them named tags[cite: 1].

Profile data is similarly cached per-username[cite: 1]. When a user mutates data via Server Actions, I just call `revalidateTag()` to surgically bust the relevant cache, leaving everything else untouched[cite: 1].

### 3. Server Components + Optimistic UI
I kept client-side JavaScript to an absolute minimum. All data fetching happens in Server Components, and mutations are piped through Server Actions[cite: 1]. However, for social features—like the `use-like`, `use-follow`, and `use-saved` hooks—I implemented optimistic UI updates[cite: 1]. The UI reacts instantly to a user's click, and only rolls back if the server returns an error[cite: 1].

## The Widget System

The feature I'm most proud of is the profile widget system. I wanted profiles to feel less like static pages and more like interactive, iOS-style stackable cards[cite: 1].

*   **Currently Watching:** Users can pin exactly what TV show they are grinding through, tracking season and episode progress alongside a quick 140-character note[cite: 1]. Clicking "Mark as Watched" instantly pulls up a pre-filled review form[cite: 1].
*   **Up Next (Watch Queue):** A drag-to-reorder list of upcoming media[cite: 1]. To prevent database messiness, I added a unique constraint on the user and media IDs to ensure there are no duplicate entries[cite: 1].

Both of these widgets are paid features, editable only by users on the Auteur or Cineaste subscription tiers, though they remain visible to anyone visiting the public profile[cite: 1].

## Looking Forward

Building DeeperWeave forced me to think deeply about how data flows between an external API, a local database, and the client. Getting the tier-based access control, the content-preference gates, and the lazy mirroring to play nicely together was a grind, but it resulted in an incredibly snappy user experience.