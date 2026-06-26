---
title: "Building a hostel platform for 22,000+ students"
date: "2025-04-15"
excerpt: "How a simple hostel finder evolved from a traditional database-backed application into a statically generated platform capable of serving admission-day traffic efficiently."
coverImage: "/blog/hostels.png"
relatedProject: "hostels-selection-platform"
---

## Building a hostel platform for 22,000+ students

Every year, thousands of incoming students at SRM have to choose where they'll live before they've even stepped onto campus.

The information existed but it was scattered across PDFs, WhatsApp groups, seniors' advice, and multiple college website pages. Comparing hostels meant opening several tabs and piecing everything together yourself.

I wanted one website that answered a simple question:

> **"Which hostel should I choose?"**

That idea eventually became a platform serving **22,000+ students** and **120,000+ page views** over two years.

---

## Version 1: The obvious solution

Like most developers building their first production application, I reached for the architecture I already knew.

- **Next.js 14**
- **Supabase**
- A `hostels` table
- A `rooms` table linked through foreign keys
- API routes fetching hostel information on every request

It worked well.

Each hostel lived in the database, room configurations were normalized, and every page fetched fresh data before rendering.

Coming from CRUD applications, it felt like the *correct* architecture.

Until real users arrived.

---

## When production teaches you something

The platform slowly grew from a few hundred visitors to **1,000**, then **5,000**, eventually crossing **10,000+ users** during hostel booking.

That's when I started hitting Vercel's free-tier function limits.

At first, I assumed traffic was the problem.

It wasn't.

After profiling the application, I realized every hostel page, even though its content almost never changed, still executed server functions and queried Supabase.

```text
Browser
    ↓
Server Function
    ↓
Supabase Query
    ↓
Return Hostel Data
```

Every page load or refresh repeated this flow. I had built a dynamic application for data that was effectively static. The database wasn't helping anymore. It had become unnecessary infrastructure, this shaped how V2 will be built.


---

## Rethinking the architecture

Instead of asking:

> **"How do I optimize my database?"**

I asked a much simpler question:

> **"Do I need a database at all?"**

The answer was **no**.

Hostel information changes only a handful of times each academic year.

There are:

- No authenticated users
- No user-generated content
- No writes
- Almost no frequently changing data

Nearly every request is simply someone reading the exact same information, so I deleted the backend entirely. Instead of fetching data from a database, I stored everything in a strongly typed TypeScript file.

```ts
export const kattankulathurHostels: Hostel[] = [
  {
    slug: "n-block",
    name: "N Block",
    rooms: [
      { sharing: 2, ac: true, price: 200000 },
      { sharing: 3, ac: true, price: 180000 }
    ]
  }
];
```

No database.

No API.

No network requests.

Just structured data that ships with the application. Ironically, removing technology made the platform faster, simpler, and easier to maintain.

---

## Static generation instead of dynamic rendering

Once the data became static, the rendering strategy naturally changed too. Using `generateStaticParams`, every hostel page is generated during the build.

```text
next build

● /hostels/[slug]
├── n-block
├── adhiyaman
├── green-pearl
└── ...
```

When a student opens a hostel page:

- No server function runs.
- No database query executes.
- The page is served directly from Vercel's CDN.

Whether **10 students** visit the page or **10,000 students** visit simultaneously, the workload is effectively the same.

That single architectural decision eliminated almost every serverless invocation that had been consuming my quota.

---

## Small engineering decisions that added up

Deleting the database wasn't the only optimization. I also looked for every unnecessary millisecond.

- Walking distances are calculated during the build instead of runtime.
- Images are optimized with Next.js.
- Every hostel page is statically generated.
- Deployments run in the India region, reducing latency for people accessing from India.

None of these decisions are groundbreaking individually. Together, they made the platform feel noticeably faster.

---

## What I learned

This project fundamentally changed how I think about software architecture. I started by assuming every application needed a database because that's how most tutorials are built, production traffic taught me otherwise.

The biggest optimization wasn't better indexes or caching or scaling infrastructure. It was removing infrastructure I didn't need.

### Three lessons have stayed with me ever since.

1. Don't build infrastructure you don't need. Static data doesn't require dynamic architecture, the simplest solution is often the fastest one.

2. Design around real usage patterns, traffic comes in short bursts. Optimizing for CDN delivery mattered far more than optimizing database throughput. Understanding how people use a product is just as important as writing the code.

3. Performance is an architectural decision, users don't care whether an application uses React, Next.js, or Supabase. They care whether it loads instantly on a mobile connection. Most performance gains come from decisions made long before writing optimization code.

---

## Looking ahead

There are still features I'd like to add:

- Hostel comparison
- Better search across room configurations
- Richer structured metadata for SEO
- Lightweight analytics to understand what students compare most often

The architecture is intentionally simple now.

It's easier to maintain, significantly cheaper to host, and scales better than the original version.

> Sometimes the best engineering decision isn't adding another service.
>
> It's realizing you don't need one in the first place.
