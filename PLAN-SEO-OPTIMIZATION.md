# PLAN-SEO-OPTIMIZATION.md

## Section 1: What Claude Will Implement (Code Changes)

### Priority: CRITICAL -- Likely Preventing Indexing

#### 1.1 Fix Domain Mismatch: sitwhm.com to sitwhm.de

**File:** `/private/tmp/sitwhm-solar/app/siteConfig.ts`, line 4

Change:
```ts
url: "https://sitwhm.com",
```
To:
```ts
url: "https://sitwhm.de",
```

**Dependencies:** None. This is the single most important change because `siteConfig.url` propagates to `metadataBase`, all OpenGraph URLs, JSON-LD URLs, and canonical URLs throughout the entire site.

**Verification:** After building (`npm run build`), inspect `out/index.html` and confirm all URLs reference `sitwhm.de`, not `sitwhm.com`. Search the `out/` directory for any remaining occurrences of `sitwhm.com`.

---

#### 1.2 Fix Sponsor Email Domain

**File:** `/private/tmp/sitwhm-solar/components/sections/Sponsors.tsx`, line 134

Change:
```tsx
<a href="mailto:sponsors@sitwhm.com">
```
To:
```tsx
<a href="mailto:sponsors@sitwhm.de">
```

**Dependencies:** None.

**Verification:** Visual check on the Sponsors section; click the "Become a Sponsor" button and confirm the mailto link opens with `sponsors@sitwhm.de`.

---

#### 1.3 Create robots.txt

**File to create:** `/private/tmp/sitwhm-solar/public/robots.txt`

Content:
```
User-agent: *
Allow: /

Sitemap: https://sitwhm.de/sitemap.xml
```

**Important:** The `app/robots.ts` route handler approach does NOT work with `output: 'export'`. The file must be a static file in `public/`.

**Dependencies:** Depends on 1.1 (domain fix) being done first so the sitemap URL is correct.

**Verification:** After build, confirm `out/robots.txt` exists and contains the correct sitemap URL.

---

#### 1.4 Create sitemap.xml

**File to create:** `/private/tmp/sitwhm-solar/public/sitemap.xml`

Content:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sitwhm.de/</loc>
    <lastmod>2026-04-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sitwhm.de/privacy/</loc>
    <lastmod>2026-03-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://sitwhm.de/code-of-conduct/</loc>
    <lastmod>2026-03-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

Note: URLs use trailing slashes to match the `trailingSlash: true` config added in step 1.6. Update `lastmod` dates whenever content changes.

**Dependencies:** Depends on 1.1 (domain fix) and 1.6 (trailing slash config).

**Verification:** After build, confirm `out/sitemap.xml` exists. Validate with an XML validator or Google's sitemap testing tool.

---

#### 1.5 Add Canonical URLs to All Pages

**File:** `/private/tmp/sitwhm-solar/app/layout.tsx`, inside the `metadata` export (after line 21, within the object)

Add:
```ts
alternates: {
  canonical: "/",
},
```

**File:** `/private/tmp/sitwhm-solar/app/privacy/page.tsx`, inside the `metadata` export (after line 4)

Add:
```ts
alternates: {
  canonical: "/privacy",
},
```

**File:** `/private/tmp/sitwhm-solar/app/code-of-conduct/page.tsx`, inside the `metadata` export (after line 4)

Add:
```ts
alternates: {
  canonical: "/code-of-conduct",
},
```

**Dependencies:** Depends on 1.1 (domain fix) because `metadataBase` in layout.tsx constructs the full canonical URL from `siteConfig.url`.

**Verification:** After build, inspect `out/index.html`, `out/privacy/index.html`, and `out/code-of-conduct/index.html` for `<link rel="canonical" href="https://sitwhm.de/...">` tags.

---

#### 1.6 Add trailingSlash to next.config.ts

**File:** `/private/tmp/sitwhm-solar/next.config.ts`, line 4-8

Change:
```ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};
```
To:
```ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
};
```

**Dependencies:** None. However, after this change, the sitemap.xml URLs should include trailing slashes (accounted for in step 1.4).

**Verification:** After build, confirm that `out/privacy/index.html` exists (not `out/privacy.html`). Check that navigation to `/privacy` works correctly on the deployed site.

---

#### 1.7 Fix Broken Code of Conduct Link in Registration

**File:** `/private/tmp/sitwhm-solar/components/sections/Registration.tsx`, line 62

Change:
```tsx
<a href="#" className="text-syntax-blue hover:underline">
  Code of Conduct
</a>
```
To:
```tsx
<a href="/code-of-conduct" className="text-syntax-blue hover:underline">
  Code of Conduct
</a>
```

**Dependencies:** None.

**Verification:** Click the "Code of Conduct" link in the Registration section and confirm it navigates to `/code-of-conduct`.

---

### Priority: IMPORTANT -- Will Significantly Improve Rankings

#### 2.1 Enhance JSON-LD Event Schema

**File:** `/private/tmp/sitwhm-solar/app/layout.tsx`, lines 83-121

Replace the existing Event JSON-LD block (the `JSON.stringify(...)` argument) with an expanded version. The current schema is missing: `geo` coordinates, `performer` array, `validFrom` on offers, `isAccessibleForFree`, `maximumAttendeeCapacity`, `inLanguage`, `sameAs`, full postal address with postal code and region.

New JSON-LD object to replace the existing one:
```ts
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": siteConfig.name,
  "description": siteConfig.description,
  "startDate": "2026-09-19T09:00:00+02:00",
  "endDate": "2026-09-19T18:00:00+02:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": siteConfig.event.venue,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Syntax Systems GmbH",
      "addressLocality": "Weinheim an der Bergstrasse",
      "postalCode": "69469",
      "addressRegion": "Baden-Wuerttemberg",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 49.54,
      "longitude": 8.66
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "SAP Inside Track Weinheim",
    "url": siteConfig.url,
    "sameAs": [
      `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`,
      `https://github.com/${siteConfig.social.github}`
    ]
  },
  "performer": [
    { "@type": "Person", "name": "Dr. Sarah Martinez", "jobTitle": "SAP BTP Architect & Cloud Innovation Lead" },
    { "@type": "Person", "name": "Michael Chen", "jobTitle": "Senior SAP Developer & Community Expert" },
    { "@type": "Person", "name": "Lisa Hoffmann", "jobTitle": "SAP Fiori Specialist & UX Designer" },
    { "@type": "Person", "name": "James Wilson", "jobTitle": "SAP Integration Architect" },
    { "@type": "Person", "name": "Anna Kowalski", "jobTitle": "SAP ABAP & RAP Developer" },
    { "@type": "Person", "name": "David Kumar", "jobTitle": "SAP Security & Compliance Consultant" },
    { "@type": "Person", "name": "Emma Rodriguez", "jobTitle": "SAP AI & Machine Learning Specialist" },
    { "@type": "Person", "name": "Thomas Bauer", "jobTitle": "SAP Basis Administrator & DevOps Engineer" }
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "url": siteConfig.registration.url,
    "validFrom": "2026-01-01"
  },
  "image": `${siteConfig.url}/og-image.png`,
  "url": siteConfig.url,
  "inLanguage": "en",
  "isAccessibleForFree": true,
  "maximumAttendeeCapacity": siteConfig.event.capacity,
  "typicalAgeRange": "18-"
}
```

**Dependencies:** Depends on 1.1 (domain fix). The `image` field references `og-image.png` which the user must create (see Section 2). Until then, use `/icon.png` or omit if no icon exists.

**Verification:** Paste the built HTML into Google Rich Results Test (https://search.google.com/test/rich-results) and confirm the Event schema validates with no errors.

---

#### 2.2 Add WebSite and Organization JSON-LD Schemas

**File:** `/private/tmp/sitwhm-solar/app/layout.tsx`, inside `<head>`, after the existing Event JSON-LD block (after line 121), add two new `<script>` blocks.

Add these inside the same `{featureFlags.pageMode === 'full' && (...)}` conditional, or outside it if you want them in all modes:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteConfig.name,
      "alternateName": "#sitWHM",
      "url": siteConfig.url
    })
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SAP Inside Track Weinheim",
      "alternateName": "#sitWHM",
      "url": siteConfig.url,
      "logo": `${siteConfig.url}/icon.png`,
      "sameAs": [
        `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`,
        `https://github.com/${siteConfig.social.github}`
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "team@sitwhm.de",
        "contactType": "customer service"
      }
    })
  }}
/>
```

**Dependencies:** Depends on 1.1 (domain fix).

**Verification:** Validate at https://validator.schema.org/ after build.

---

#### 2.3 Add FAQPage JSON-LD Schema

**File:** `/private/tmp/sitwhm-solar/components/sections/FAQ.tsx`

Since this is a client component (`"use client"`), the cleanest approach is to add the JSON-LD in the `<head>` of `layout.tsx` rather than inside this component. Alternatively, add it as a `<script>` tag rendered within the FAQ component's returned JSX (which will work in the body -- valid for JSON-LD).

**Recommended approach:** Add to `/private/tmp/sitwhm-solar/app/layout.tsx` inside `<head>`, within the `featureFlags.pageMode === 'full'` block:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an SAP InsideTrack?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A free, community-driven event where SAP professionals share real-world experiences. No sales pitches, no marketing talks - just practitioners sharing what they've built, broken, fixed, and learned. Think of it as a conference organized by the community, for the community."
          }
        },
        {
          "@type": "Question",
          "name": "Is it really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, completely free! SAP InsideTracks are made possible by generous sponsors and the volunteer work of the organizing team. No hidden fees, no strings attached."
          }
        },
        {
          "@type": "Question",
          "name": "Will there be food and drinks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We provide breakfast, lunch, coffee, and drinks throughout the day. Nobody should have to think on an empty stomach."
          }
        },
        {
          "@type": "Question",
          "name": "What should I bring?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A laptop (optional), curiosity (mandatory), and community stickers (highly encouraged). If you're attending the CodeJam on Friday, a laptop with the prerequisites installed is required."
          }
        },
        {
          "@type": "Question",
          "name": "Is the venue wheelchair accessible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Please contact us at team@sitwhm.de for details about accessibility at the venue. We want to make sure everyone can participate comfortably."
          }
        },
        {
          "@type": "Question",
          "name": "Will sessions be recorded?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We plan to record sessions and make them available on YouTube after the event. Speakers can opt out of recording if they prefer."
          }
        },
        {
          "@type": "Question",
          "name": "Can I transfer my ticket?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! If you can't make it, you can transfer your registration to someone else. Just drop us an email at team@sitwhm.de."
          }
        },
        {
          "@type": "Question",
          "name": "What's the dress code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Casual. Come as you are. Extra points for SAP community t-shirts, UI5 hoodies, or ABAP-themed socks."
          }
        },
        {
          "@type": "Question",
          "name": "I've never been to a SIT - is that okay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "More than okay - it's great! Many attendees are joining for the first time. The SAP community is incredibly welcoming. You'll feel at home within minutes."
          }
        },
        {
          "@type": "Question",
          "name": "What's the hashtag?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It's #sitWHM! Use it on LinkedIn, X/Twitter, or wherever you share your experience. We'd love to see your posts, photos, and takeaways from the event."
          }
        }
      ]
    })
  }}
/>
```

**Dependencies:** None (the FAQ content is static).

**Verification:** Validate with Google Rich Results Test. Expect FAQPage rich result eligibility.

---

#### 2.4 Expand Keywords and Update Meta Description

**File:** `/private/tmp/sitwhm-solar/app/siteConfig.ts`, line 6

Change `description` to:
```ts
description: "SAP Inside Track Weinheim (#sitWHM) 2026 - Free community tech conference for SAP developers, architects, and consultants. Join us September 19, 2026 at Syntax Auditorium, Weinheim, Germany for sessions on BTP, ABAP, Fiori, AI, and more.",
```

**File:** `/private/tmp/sitwhm-solar/app/layout.tsx`, line 22

Change `keywords` to:
```ts
keywords: [
  "SAP Inside Track",
  "SAP Inside Track Weinheim",
  "#sitWHM",
  "SAP Community Conference",
  "SAP Developers Conference Germany",
  "SAP BTP",
  "ABAP",
  "SAP Fiori",
  "SAP UI5",
  "SAP CodeJam",
  "Weinheim",
  "Rhine-Neckar",
  "Free SAP Conference",
  "SAP Networking Event",
  "SAP Community Event 2026",
  "Syntax Auditorium",
],
```

**Dependencies:** None.

**Verification:** Inspect `out/index.html` `<meta name="keywords">` and `<meta name="description">` tags.

---

#### 2.5 Add OG Image Metadata

**File:** `/private/tmp/sitwhm-solar/app/layout.tsx`, lines 29-38 (openGraph section)

Replace the existing `openGraph` block with:
```ts
openGraph: {
  type: "website",
  locale: "en_US",
  url: siteConfig.url,
  title: isTeaserMode ? `Save the Date - ${siteConfig.name}` : siteConfig.name,
  description: isTeaserMode
    ? `Save the date for ${siteConfig.event.date}. ${siteConfig.description}`
    : siteConfig.description,
  siteName: siteConfig.shortName,
  images: [
    {
      url: `${siteConfig.url}/og-image.png`,
      width: 1200,
      height: 630,
      alt: "SAP Inside Track Weinheim 2026 - Free Community Conference, September 19, 2026",
    },
  ],
},
```

Replace the existing `twitter` block (lines 39-46) with:
```ts
twitter: {
  card: "summary_large_image",
  title: isTeaserMode ? `Save the Date - ${siteConfig.name}` : siteConfig.name,
  description: isTeaserMode
    ? `Save the date for ${siteConfig.event.date}. ${siteConfig.description}`
    : siteConfig.description,
  creator: siteConfig.social.twitter,
  images: [`${siteConfig.url}/og-image.png`],
},
```

**Dependencies:** Depends on 1.1 (domain fix). The user must create the actual `/public/og-image.png` file (see Section 2).

**Verification:** After deploy, test at https://www.opengraph.xyz/ with the site URL. Confirm the image renders correctly.

---

#### 2.6 Add hreflang Tags

**File:** `/private/tmp/sitwhm-solar/app/layout.tsx`, inside `<head>` (after line 81)

Add:
```tsx
<link rel="alternate" hrefLang="en" href="https://sitwhm.de/" />
<link rel="alternate" hrefLang="de" href="https://sitwhm.de/" />
<link rel="alternate" hrefLang="x-default" href="https://sitwhm.de/" />
```

**Dependencies:** Depends on 1.1 (domain fix).

**Verification:** Inspect `out/index.html` for the three `<link rel="alternate">` tags.

---

#### 2.7 Add Geo Meta Tags for Local SEO

**File:** `/private/tmp/sitwhm-solar/app/layout.tsx`, inside `<head>`

Add:
```tsx
<meta name="geo.region" content="DE-BW" />
<meta name="geo.placename" content="Weinheim an der Bergstrasse" />
<meta name="geo.position" content="49.54;8.66" />
<meta name="ICBM" content="49.54, 8.66" />
```

**Dependencies:** None.

**Verification:** Inspect built HTML `<head>` for the four meta tags.

---

#### 2.8 Add theme-color to Metadata

**File:** `/private/tmp/sitwhm-solar/app/layout.tsx`, inside the `metadata` export object

Add:
```ts
themeColor: "#0632A0",
```

**Dependencies:** None.

**Verification:** Inspect `out/index.html` for `<meta name="theme-color" content="#0632A0">`.

---

#### 2.9 Improve Hashtag Section Heading

**File:** `/private/tmp/sitwhm-solar/components/sections/Hashtag.tsx`, line 17-19

Change:
```tsx
<h2 className="mt-4 text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl">
  #sitWHM
</h2>
```
To:
```tsx
<h2 className="mt-4 text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl">
  Join the <span aria-label="sit WHM">#sitWHM</span> Community
</h2>
```

**Dependencies:** None.

**Verification:** Visual check; confirm the heading text reads "Join the #sitWHM Community". Check accessibility with a screen reader -- the `aria-label` ensures correct pronunciation.

---

#### 2.10 Improve Speaker Image Alt Text

**File:** `/private/tmp/sitwhm-solar/components/sections/Speakers.tsx`, line 34

Change:
```tsx
alt={speaker.name}
```
To:
```tsx
alt={`${speaker.name} - ${speaker.title} - Speaker at SAP Inside Track Weinheim 2026`}
```

**Dependencies:** None.

**Verification:** Inspect the rendered `<img>` tags and confirm alt text includes name, title, and event context.

---

### Priority: NICE TO HAVE -- Incremental Improvements

#### 3.1 Add DNS-Prefetch Hints

**File:** `/private/tmp/sitwhm-solar/app/layout.tsx`, inside `<head>`

Add:
```tsx
<link rel="dns-prefetch" href="https://js.tito.io" />
<link rel="dns-prefetch" href="https://ti.to" />
```

Note: Do NOT add `dns-prefetch` for `i.pravatar.cc` since those placeholder images should be replaced (user task).

**Dependencies:** None.

**Verification:** Inspect `out/index.html` `<head>` for the prefetch links.

---

#### 3.2 Create Web App Manifest

**File to create:** `/private/tmp/sitwhm-solar/public/manifest.json`

Content:
```json
{
  "name": "SAP Inside Track Weinheim 2026",
  "short_name": "SITWHM 2026",
  "description": "Free community tech conference for SAP developers",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0632A0",
  "icons": [
    {
      "src": "/icon.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

Then add to `/private/tmp/sitwhm-solar/app/layout.tsx` inside `<head>`:
```tsx
<link rel="manifest" href="/manifest.json" />
```

**Dependencies:** Requires that `icon.png` exists in `/public/`. Currently it does NOT exist. The user must create it (see Section 2).

**Verification:** After build, confirm `out/manifest.json` exists. Use Chrome DevTools > Application > Manifest to verify it loads correctly.

---

#### 3.3 Add BreadcrumbList Schema to Subpages

**File:** `/private/tmp/sitwhm-solar/app/privacy/page.tsx`

Add inside the component's returned JSX (e.g., as the first child inside `<main>`):
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sitwhm.de/" },
        { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://sitwhm.de/privacy/" }
      ]
    })
  }}
/>
```

**File:** `/private/tmp/sitwhm-solar/app/code-of-conduct/page.tsx`

Same pattern:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sitwhm.de/" },
        { "@type": "ListItem", "position": 2, "name": "Code of Conduct", "item": "https://sitwhm.de/code-of-conduct/" }
      ]
    })
  }}
/>
```

**Dependencies:** Depends on 1.1 (domain fix) and 1.6 (trailing slash).

**Verification:** Validate with Google Rich Results Test.

---

#### 3.4 Fix Missing rel="noopener noreferrer" on Internal Links with target="_blank"

**File:** `/private/tmp/sitwhm-solar/components/sections/NotifyMe.tsx`, lines 98-101

Change:
```tsx
<a
  href="/privacy"
  className="text-syntax-blue hover:underline"
  target="_blank"
>
```
To:
```tsx
<a
  href="/privacy"
  className="text-syntax-blue hover:underline"
  target="_blank"
  rel="noopener noreferrer"
>
```

**File:** `/private/tmp/sitwhm-solar/components/sections/NotifyMeMystery.tsx`, lines 145-151

Change:
```tsx
<a
  href="/privacy"
  className="text-syntax-cyan underline decoration-syntax-cyan/30 transition-colors hover:decoration-syntax-cyan"
  target="_blank"
>
```
To:
```tsx
<a
  href="/privacy"
  className="text-syntax-cyan underline decoration-syntax-cyan/30 transition-colors hover:decoration-syntax-cyan"
  target="_blank"
  rel="noopener noreferrer"
>
```

**Dependencies:** None.

**Verification:** Inspect rendered HTML for the `rel` attribute on these links.

---

#### 3.5 Create _headers File for Security Headers

**File to create:** `/private/tmp/sitwhm-solar/public/_headers`

Content:
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
```

Note: This only works if GitLab Pages supports the `_headers` file convention. If not, these headers must be set in `.gitlab-ci.yml` or the GitLab Pages configuration. Test after deployment.

**Dependencies:** None.

**Verification:** After deployment, use browser DevTools > Network tab to inspect response headers on the homepage.

---

### Implementation Order (Dependency Graph)

```
Step 1.1 (domain fix) -- MUST BE FIRST
    |
    +-- Step 1.2 (sponsor email) -- independent
    +-- Step 1.6 (trailingSlash) -- independent
    |       |
    |       +-- Step 1.4 (sitemap.xml) -- depends on 1.1 + 1.6
    |
    +-- Step 1.3 (robots.txt) -- depends on 1.1
    +-- Step 1.5 (canonical URLs) -- depends on 1.1
    +-- Step 2.1 (Event JSON-LD) -- depends on 1.1
    +-- Step 2.2 (WebSite + Org JSON-LD) -- depends on 1.1
    +-- Step 2.4 (keywords + description) -- independent
    +-- Step 2.5 (OG image metadata) -- depends on 1.1
    +-- Step 2.6 (hreflang) -- depends on 1.1

Independent steps (no dependencies):
    Step 1.7, 2.3, 2.7, 2.8, 2.9, 2.10, 3.1, 3.2, 3.3, 3.4, 3.5
```

---

## Section 2: What You (the User) Need to Do Manually

These are tasks that require human judgment, external service registration, or design work that cannot be done through code changes alone.

### Immediate (This Week)

- [ ] **Register Google Search Console** -- Go to https://search.google.com/search-console, add property for `https://sitwhm.de`, verify ownership via DNS TXT record or HTML file method, submit `https://sitwhm.de/sitemap.xml`, and request indexing of the homepage.

- [ ] **Register Bing Webmaster Tools** -- Go to https://www.bing.com/webmasters, add and verify `https://sitwhm.de`, submit the sitemap. Bing is used heavily by enterprise/corporate SAP users.

- [ ] **Create OG image** -- Design a 1200x630px image with the event name ("SAP Inside Track Weinheim 2026"), date ("September 19, 2026"), venue ("Syntax Auditorium"), and branding. Save as `/public/og-image.png`. This is referenced by the code changes in step 2.5. Without this file, social shares will show a broken image.

- [ ] **Create icon.png** -- Currently no `icon.png` exists in `/public/`. Create a 192x192px (minimum) icon/logo for the event and save as `/public/icon.png`. This is referenced by the JSON-LD schemas and the web manifest.

- [ ] **Generate favicon variants** -- Use https://realfavicongenerator.net/ to generate `apple-touch-icon.png` (180x180), `favicon-32x32.png`, `favicon-16x16.png`, and `favicon.ico` from the icon. Save all to `/public/`. Then add the corresponding `<link>` tags to `layout.tsx` `<head>`:
  ```tsx
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  ```

### Soon (This Month)

- [ ] **Replace placeholder speaker photos** -- All 8 speakers currently use `https://i.pravatar.cc/300` placeholder images. Get real photos from each speaker, resize to at least 300x300px, save to `/public/people/` (e.g., `sarah-martinez.jpg`), and update `/lib/content/speakers.ts` to use local paths like `"/people/sarah-martinez.jpg"` instead of the pravatar.cc URLs.

- [ ] **Create SAP Community listing** -- Other SAP Inside Tracks (NRW, Madrid, Melbourne, Wroclaw) are all listed on community.sap.com. Create a listing at https://community.sap.com under the appropriate regional group. Also create a blog post announcement and an event listing at community.sap.com/events.

- [ ] **Submit to event directories:**
  - https://dev.events -- Other SAP Inside Tracks are already listed here
  - https://meetup.com -- Create a meetup group or event
  - https://eventbrite.com -- Even if not using for registration, creates a backlink
  - https://luma.co -- Popular for tech events
  - LinkedIn Events -- Create an event on a LinkedIn company page
  - Sessionize -- Ensure the event page is public (you already have a CFS page)
  - Local Weinheim/Rhein-Neckar event listings

- [ ] **Verify Google Maps embed coordinates** -- The current embed in `Location.tsx` (line 84) uses placeholder coordinates. Confirm the actual Syntax Auditorium location in Weinheim and update the iframe `src` with the correct Google Maps embed URL including the real place ID.

### Ongoing

- [ ] **Social media presence** -- Ensure https://twitter.com/sitwhm exists and has `sitwhm.de` in the bio. Post regularly with the #sitWHM hashtag. Create or update a LinkedIn company page that links to sitwhm.de.

- [ ] **Monitor indexing weekly:**
  - Search `site:sitwhm.de` in Google weekly until pages appear
  - Check Google Search Console "Coverage" report for indexing status
  - Run https://pagespeed.web.dev/ to check performance scores
  - Validate JSON-LD regularly at https://search.google.com/test/rich-results

- [ ] **Update sitemap.xml `lastmod` dates** -- Whenever you make content changes, update the `lastmod` values in `/public/sitemap.xml` to reflect the current date.

- [ ] **Consider creating blog content** -- Even 2-3 blog posts ("Why Attend SAP Inside Track Weinheim", "Meet Our Speakers", "What to Expect") would create indexable content targeting long-tail keywords. This could be implemented as a `/blog` route with markdown files.

- [ ] **Consider individual speaker pages** -- Pages like `/speakers/sarah-martinez` would create more indexable content, allow speakers to share their own page (generating backlinks), and enable Person schema per speaker.

- [ ] **DNS/domain considerations** -- Ensure `sitwhm.de` DNS is properly configured. If `sitwhm.com` was ever used, set up a 301 redirect from `sitwhm.com` to `sitwhm.de` to avoid split authority. Verify HTTPS is working correctly on the production domain.

---

### Critical Files for Implementation
- /private/tmp/sitwhm-solar/app/siteConfig.ts
- /private/tmp/sitwhm-solar/app/layout.tsx
- /private/tmp/sitwhm-solar/next.config.ts
- /private/tmp/sitwhm-solar/components/sections/Registration.tsx
- /private/tmp/sitwhm-solar/components/sections/Sponsors.tsx
