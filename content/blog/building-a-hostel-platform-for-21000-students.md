---
title: "SRM Hostel picker platform"
date: "2025-04-15"
excerpt: "How a simple idea — help incoming freshmen actually choose their rooms from array of options — turned into a platform serving 22,000+ students and 118,000+ page views over an year."
coverImage: "/blog/hostels.jpg"
relatedProject: "hostels-selection-platform"
---


Every incoming batch of students faces the same blind decision: pick a hostel before you've ever set foot on campus. The official information was scattered across PDFs, notice boards, and word of mouth. I wanted to put it all in one place — clear, searchable, and fast on a phone.

This is the story of how that turned into a platform that served **21,000+ students** and **118,000+ page views** in production.

## Why I built it

The problem was concrete: freshmen were choosing where they'd live for the year based on a grainy photo and a rumour. There was no single, trustworthy place to compare blocks, room types, amenities, and proximity to academic buildings.

I scoped it down to one job: **help a student confidently pick a hostel in a few minutes**, on whatever device they happen to have open.

## How it works

The platform is intentionally simple from the outside:

- Browse every hostel block with photos, room types, and key details.
- Filter and compare options side by side.
- Drill into a single block for the full picture.

Under the hood it's a [Next.js](https://nextjs.org) and React app, optimized for fast first loads and smooth navigation — because most of the traffic came from phones during a narrow admissions window.

## A couple of technical challenges

**Traffic that arrives all at once.** The usage wasn't spread evenly — it spiked hard the moment hostel allocation opened. Serving mostly static, prerendered content meant the site stayed fast under that load instead of buckling.

**Mobile-first, genuinely.** "Responsive" is easy to claim and hard to earn. The bulk of sessions were on mid-range phones on patchy networks, so image sizes, layout shift, and bundle size were the things that actually mattered.

```tsx
// Illustrative: keep the heavy stuff static so spikes stay cheap.
export const dynamic = "force-static";

export default function HostelList({ hostels }: { hostels: Hostel[] }) {
  return (
    <ul>
      {hostels.map((h) => (
        <HostelCard key={h.id} hostel={h} />
      ))}
    </ul>
  );
}
```

## What I learned

- **Shipping beats polishing.** The version that helped 21,000 students wasn't the prettiest one I imagined — it was the one that went live before allocation opened.
- **Performance is a feature.** On real phones and real networks, speed was the difference between a student using the site and bouncing.
- **Constraints clarify scope.** "Help someone pick a hostel" kept feature creep out.

## What I'd improve

- Real comparison tooling (save and contrast a shortlist).
- Structured data instead of hand-maintained content.
- Lightweight analytics to learn what students actually compared.

If you want the short version with the stack and the numbers, the [project page](/projects/hostels-selection-platform) has it.
