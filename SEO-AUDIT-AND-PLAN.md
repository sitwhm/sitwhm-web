# SEO Audit & Improvement Plan: sitwhm.de

**Site:** SAP Inside Track Weinheim 2026
**Domain:** sitwhm.de (currently misconfigured as sitwhm.com in code)
**Framework:** Next.js 16 with static export (`output: 'export'`)
**Hosting:** GitLab Pages
**Audit Date:** April 2026

---

## Executive Summary

Neither `sitwhm.de` nor `sitwhm.com` is currently indexed by Google. A search for "SAP Inside Track Weinheim 2026" returns zero results for this site. There are several critical issues preventing indexing, including a domain mismatch in the codebase, missing `robots.txt` and `sitemap.xml`, and no evidence of Google Search Console registration. This audit identifies 28 actionable items across three priority levels.

---

## Priority 1 -- CRITICAL (Likely Preventing Indexing)

### 1.1 Domain Mismatch: siteConfig says `sitwhm.com`, actual domain is `sitwhm.de`

**Impact:** All canonical URLs, OpenGraph URLs, JSON-LD URLs, and `metadataBase` point to the wrong domain. Search engines may be confused or indexing the wrong domain entirely.

**File:** `/app/siteConfig.ts` (line 4)

**Fix:**
```ts
// BEFORE
url: "https://sitwhm.com",

// AFTER
url: "https://sitwhm.de",
```

Also check `/components/sections/Sponsors.tsx` line 134 which has a hardcoded `sponsors@sitwhm.com` email -- change to `sponsors@sitwhm.de`.

---

### 1.2 Missing `robots.txt`

**Impact:** Without a `robots.txt`, search engines have no explicit permission signal and no pointer to the sitemap. While crawlers will still attempt to crawl, the missing file is a red flag and means the sitemap is not discoverable.

**File to create:** `/public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://sitwhm.de/sitemap.xml
```

Since the site uses `output: 'export'`, the `app/robots.ts` route handler approach will NOT work. The file must be placed in `public/` so it is copied to `out/` at build time.

---

### 1.3 Missing `sitemap.xml`

**Impact:** Without a sitemap, Google has no map of the site's pages. For a small site this is less critical, but combined with zero backlinks and no Search Console submission, it means Google may never discover the pages.

**File to create:** `/public/sitemap.xml`

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
    <loc>https://sitwhm.de/privacy</loc>
    <lastmod>2026-03-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://sitwhm.de/code-of-conduct</loc>
    <lastmod>2026-03-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

Update `lastmod` dates whenever content changes. When more pages are added (e.g., speaker pages, blog), add them here.

---

### 1.4 Register with Google Search Console

**Impact:** Without Search Console, Google has no notification that the site exists, no sitemap submission, and no way to monitor indexing issues.

**Action items (manual, not code):**
1. Go to https://search.google.com/search-console
2. Add property for `https://sitwhm.de`
3. Verify ownership (DNS TXT record or HTML file method)
4. Submit the sitemap URL: `https://sitwhm.de/sitemap.xml`
5. Request indexing of the homepage

---

### 1.5 Register with Bing Webmaster Tools

**Action:** Same as above but at https://www.bing.com/webmasters. Bing is used by many enterprise/corporate users who are the target audience.

---

### 1.6 No Canonical URL on Pages

**Impact:** Without explicit canonical tags, search engines may treat different URL variants (with/without trailing slash, with query parameters) as separate pages, diluting ranking signals.

**File:** `/app/layout.tsx`

The `metadataBase` is set, which helps Next.js generate canonical URLs, but there is no explicit `alternates.canonical` in the metadata. Add it:

```ts
// In the metadata export in layout.tsx, add:
alternates: {
  canonical: siteConfig.url,
},
```

For subpages (`/privacy`, `/code-of-conduct`), add page-specific canonical URLs in their metadata exports:

```ts
// In /app/privacy/page.tsx
export const metadata: Metadata = {
  title: "Privacy Policy - SAP Inside Track Weinheim 2026",
  description: "Privacy policy for SAP Inside Track Weinheim 2026",
  alternates: {
    canonical: "https://sitwhm.de/privacy",
  },
}
```

Same for `/app/code-of-conduct/page.tsx`.

---

## Priority 2 -- IMPORTANT (Will Significantly Improve Rankings)

### 2.1 Incomplete JSON-LD Event Schema

**Impact:** The current Event schema is missing several recommended fields that Google uses for rich results.

**File:** `/app/layout.tsx` (lines 83-121)

**Missing fields to add:**

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "SAP Inside Track Weinheim 2026",
  "description": "Free community tech conference for SAP developers, architects, and consultants. September 19th, 2026 at Syntax Auditorium, Weinheim.",
  "startDate": "2026-09-19T09:00:00+02:00",
  "endDate": "2026-09-19T18:00:00+02:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Syntax Auditorium",
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
    "url": "https://sitwhm.de",
    "sameAs": [
      "https://twitter.com/sitwhm",
      "https://github.com/maxstreifeneder/sitwhm"
    ]
  },
  "performer": [
    {
      "@type": "Person",
      "name": "Dr. Sarah Martinez",
      "jobTitle": "SAP BTP Architect & Cloud Innovation Lead"
    }
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "url": "https://ti.to/sitwhm/2026",
    "validFrom": "2026-01-01"
  },
  "image": "https://sitwhm.de/icon.png",
  "url": "https://sitwhm.de",
  "inLanguage": "en",
  "isAccessibleForFree": true,
  "maximumAttendeeCapacity": 150,
  "typicalAgeRange": "18-"
}
```

**Key additions:**
- `geo` coordinates for the venue (enables Google Maps integration)
- `performer` array with speaker names
- `validFrom` on offers
- `isAccessibleForFree`
- `maximumAttendeeCapacity`
- `inLanguage`
- `sameAs` for social profiles
- Full postal address with postal code and region

---

### 2.2 Add WebSite and Organization JSON-LD Schemas

**Impact:** Helps Google understand the site entity and can trigger sitelinks and knowledge panels.

**File:** `/app/layout.tsx` -- add these as additional `<script type="application/ld+json">` blocks inside `<head>`:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SAP Inside Track Weinheim 2026",
  "alternateName": "#sitWHM",
  "url": "https://sitwhm.de"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SAP Inside Track Weinheim",
  "alternateName": "#sitWHM",
  "url": "https://sitwhm.de",
  "logo": "https://sitwhm.de/icon.png",
  "sameAs": [
    "https://twitter.com/sitwhm",
    "https://github.com/maxstreifeneder/sitwhm"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "team@sitwhm.de",
    "contactType": "customer service"
  }
}
```

---

### 2.3 Add FAQPage JSON-LD Schema

**Impact:** The FAQ section has excellent content that can appear as rich results (FAQ snippets) in Google Search, dramatically increasing SERP visibility.

**File:** `/components/sections/FAQ.tsx` -- add a `<script>` tag or move to layout.tsx

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an SAP InsideTrack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A free, community-driven event where SAP professionals share real-world experiences. No sales pitches, no marketing talks - just practitioners sharing what they've built, broken, fixed, and learned."
      }
    },
    {
      "@type": "Question",
      "name": "Is it really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, completely free! SAP InsideTracks are made possible by generous sponsors and the volunteer work of the organizing team."
      }
    }
  ]
}
```

Include all 10 FAQ items in the schema.

---

### 2.4 Expand Keywords and Meta Description

**Impact:** Current keywords are too generic. The description is good but could be richer.

**File:** `/app/layout.tsx`

```ts
// BEFORE
keywords: ["SAP", "Conference", "Inside Track", "Community", "Weinheim", "BTP", "Developers"],

// AFTER
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

Update description to be more keyword-rich while remaining natural:

```ts
description: "SAP Inside Track Weinheim (#sitWHM) 2026 - Free community tech conference for SAP developers, architects, and consultants. Join us September 19, 2026 at Syntax Auditorium, Weinheim, Germany for sessions on BTP, ABAP, Fiori, AI, and more.",
```

Also update this in `siteConfig.ts` so it propagates everywhere.

---

### 2.5 Missing OpenGraph Image (`og:image`)

**Impact:** Without an OG image, social shares on LinkedIn, Twitter, Slack, etc. will show no preview image, resulting in dramatically lower click-through rates. This is critical for an event that relies on community sharing.

**Action:**
1. Create a 1200x630px OG image with the event name, date, and branding
2. Save as `/public/og-image.png`
3. Add to metadata in `/app/layout.tsx`:

```ts
openGraph: {
  type: "website",
  locale: "en_US",
  url: siteConfig.url,
  title: siteConfig.name,
  description: siteConfig.description,
  siteName: siteConfig.shortName,
  images: [
    {
      url: `${siteConfig.url}/og-image.png`,
      width: 1200,
      height: 630,
      alt: "SAP Inside Track Weinheim 2026 - Free Community Conference",
    },
  ],
},
twitter: {
  card: "summary_large_image",
  title: siteConfig.name,
  description: siteConfig.description,
  creator: siteConfig.social.twitter,
  images: [`${siteConfig.url}/og-image.png`],
},
```

---

### 2.6 HTML Language Attribute Should Be `en` with `hreflang` Consideration

**Impact:** The site is in English but targets an event in Germany. Many potential attendees will search in German.

**File:** `/app/layout.tsx` (line 80)

Currently `<html lang="en">` which is correct for the content language. However, add an `hreflang` meta tag to signal that this English page is also relevant for German-speaking users:

```tsx
<head>
  <link rel="alternate" hrefLang="en" href="https://sitwhm.de/" />
  <link rel="alternate" hrefLang="de" href="https://sitwhm.de/" />
  <link rel="alternate" hrefLang="x-default" href="https://sitwhm.de/" />
  {/* ... existing head content */}
</head>
```

This tells Google the same URL serves both English and German audiences (since the SAP community operates in English even in Germany).

---

### 2.7 Missing `<title>` Differentiation for Subpages

**Impact:** The privacy and code-of-conduct pages have decent titles, but they could follow a consistent brand pattern.

**Fix:** Already acceptable. Ensure the pattern is `Page Name - SAP Inside Track Weinheim 2026` consistently. Current implementation is fine.

---

### 2.8 Heading Hierarchy Issues

**Impact:** Proper heading hierarchy is important for both accessibility and SEO.

**Current state analysis:**
- Homepage H1: "SAP Inside Track Weinheim" (in Hero.tsx) -- GOOD, single H1
- Each section has an H2 -- GOOD
- H3 used for sub-sections -- GOOD
- Privacy page: H1 "Privacy Policy" -- GOOD
- Code of Conduct page: H1 "Code of Conduct" -- GOOD
- Hashtag section: H2 "#sitWHM" -- could be more descriptive

**Fix for Hashtag section** (`/components/sections/Hashtag.tsx`):
The H2 is `#sitWHM` which is not descriptive. Consider:
```tsx
<h2 className="...">
  Join the #sitWHM Community
</h2>
```

---

### 2.9 Speaker Photos Use External Placeholder URLs

**Impact:** Images from `i.pravatar.cc` are placeholder/dummy images. This creates several SEO issues:
- External dependency means slow loading
- No real content for image search
- Google Image search cannot index meaningful speaker photos
- Signals low-quality/placeholder content to crawlers

**File:** `/lib/content/speakers.ts`

**Fix:** Replace placeholder photos with real speaker photos stored in `/public/people/`. Also add descriptive alt text beyond just the name:

```ts
photo: "/people/sarah-martinez.jpg",  // instead of pravatar.cc URL
```

For alt text on images in `Speakers.tsx`, enhance:
```tsx
// BEFORE
alt={speaker.name}

// AFTER
alt={`${speaker.name} - ${speaker.title} - Speaker at SAP Inside Track Weinheim 2026`}
```

---

### 2.10 SAP Community Listing

**Impact:** SAP Inside Track events from other cities (NRW, Madrid, Melbourne, Wroclaw, etc.) are all listed on community.sap.com. The Weinheim event is NOT listed there, missing a major source of backlinks and discoverability.

**Action items (manual):**
1. Create a listing at https://community.sap.com under the appropriate regional group
2. Create a blog post announcement on SAP Community
3. Create an event listing on community.sap.com/events
4. List on https://dev.events (aggregator that already lists other SAP Inside Tracks)
5. Submit to Sessionize event listing (already have a Sessionize page for CFS)

---

### 2.11 Code of Conduct Link in Registration is Broken

**Impact:** The link in Registration.tsx points to `#` instead of `/code-of-conduct`, which is a broken internal link.

**File:** `/components/sections/Registration.tsx` (line 62)

```tsx
// BEFORE
<a href="#" className="text-syntax-blue hover:underline">
  Code of Conduct
</a>

// AFTER
<a href="/code-of-conduct" className="text-syntax-blue hover:underline">
  Code of Conduct
</a>
```

---

### 2.12 Add `noopener noreferrer` Consistently to External Links

**Impact:** Security and minor SEO signal.

Most external links already have `rel="noopener noreferrer"`. Check that all do, especially:
- Tito registration link
- Sessionize CFS link
- Google Maps link in Location

---

## Priority 3 -- NICE TO HAVE (Incremental Improvements)

### 3.1 Add `apple-touch-icon` and Favicon Variants

**Impact:** Better appearance in bookmarks, home screens, and social shares.

**File:** Create multiple favicon sizes and add to `/app/layout.tsx` head:

```tsx
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
```

Currently only `icon.png` exists. Generate variants using a tool like https://realfavicongenerator.net/.

---

### 3.2 Add `manifest.json` (Web App Manifest)

**Impact:** Enables "Add to Home Screen" on mobile and signals to search engines that this is a web app.

**File to create:** `/public/manifest.json`

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

Reference it in layout.tsx:
```tsx
<link rel="manifest" href="/manifest.json" />
```

---

### 3.3 Performance: Tito Script Loading

**Impact:** The Tito widget script (`https://js.tito.io/v2`) is loaded via `document.createElement("script")` in a `useEffect`. This is fine for non-blocking loading, but consider adding `rel="dns-prefetch"` in the head to speed up DNS resolution:

**File:** `/app/layout.tsx`

```tsx
<head>
  <link rel="dns-prefetch" href="https://js.tito.io" />
  <link rel="dns-prefetch" href="https://i.pravatar.cc" />
  {/* Remove the pravatar one once real images are used */}
</head>
```

---

### 3.4 Performance: Font Loading Optimization

**Impact:** The Geist font is loaded via the `geist` npm package which handles font loading well. No major issues here, but ensure the font file is self-hosted (it is, via the npm package) rather than loaded from Google Fonts.

**Status:** Already optimal. No changes needed.

---

### 3.5 Add `<meta name="geo.*">` Tags for Local SEO

**Impact:** Helps with local search visibility for users searching near Weinheim.

**File:** `/app/layout.tsx` -- add to `<head>`:

```tsx
<meta name="geo.region" content="DE-BW" />
<meta name="geo.placename" content="Weinheim an der Bergstrasse" />
<meta name="geo.position" content="49.54;8.66" />
<meta name="ICBM" content="49.54, 8.66" />
```

---

### 3.6 Add `theme-color` Meta Tag

**Impact:** Controls browser chrome color on mobile. Minor UX/branding signal.

**File:** `/app/layout.tsx` metadata:

```ts
other: {
  "theme-color": "#0632A0",
},
```

Or in metadata:
```ts
themeColor: "#0632A0",
```

---

### 3.7 Improve Google Maps Embed

**Impact:** The current Google Maps embed uses placeholder coordinates. Fix with real venue coordinates for better local SEO signals.

**File:** `/components/sections/Location.tsx` (line 84)

Update the iframe `src` with the actual Syntax Auditorium, Weinheim coordinates and proper place ID once confirmed.

---

### 3.8 Add Structured Data for BreadcrumbList

**Impact:** Enables breadcrumb display in Google search results for subpages.

Add to `/app/privacy/page.tsx` and `/app/code-of-conduct/page.tsx`:

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sitwhm.de/" },
    { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://sitwhm.de/privacy" }
  ]
}) }} />
```

---

### 3.9 Consider Adding a Blog/News Section

**Impact:** A blog with posts like "Why Attend SAP Inside Track Weinheim", "Meet Our Speakers", "What to Expect" would create indexable content that targets long-tail keywords and generates organic traffic.

**Recommendation:** Even 2-3 blog posts before the event would help. Could be implemented as a `/blog` route with markdown files.

---

### 3.10 Consider Individual Speaker Pages

**Impact:** Individual speaker pages (e.g., `/speakers/sarah-martinez`) would:
- Create more indexable content
- Allow speakers to share their own page (backlinks)
- Enable Person schema markup per speaker
- Target long-tail searches like "Sarah Martinez SAP conference"

**Recommendation:** Medium effort, high value. Each page would include the speaker's bio, session title, and link back to the main agenda.

---

### 3.11 Submit to Event Directories

**Action items (manual):**
1. **dev.events** -- Other SAP Inside Tracks are already listed here
2. **meetup.com** -- Create a meetup group or event
3. **eventbrite.com** -- Even if not using for registration, a listing creates a backlink
4. **luma.co** -- Popular for tech events
5. **LinkedIn Events** -- Create an event on the company LinkedIn page
6. **SAP Community** -- Blog post + event listing (see 2.10)
7. **Sessionize** -- Already have a CFS page, ensure the event page is public
8. **Local Weinheim/Rhein-Neckar event listings** -- Chamber of commerce, regional tech community sites

---

### 3.12 Social Media Structured Presence

**Impact:** The Twitter handle `@sitwhm` and LinkedIn profile should be active and linking back to the site for backlink signals.

**Action items:**
- Ensure https://twitter.com/sitwhm exists and has the website URL in bio
- Post regularly with #sitWHM hashtag
- LinkedIn company page should link to sitwhm.de

---

### 3.13 `next.config.ts` -- Add Security Headers

**Impact:** Minor ranking signal (HTTPS is already handled) but good practice.

**File:** `/next.config.ts`

Note: Since the site uses `output: 'export'`, Next.js headers configuration will NOT work (headers are a server feature). Security headers must be configured at the GitLab Pages level or via a `_headers` file if supported.

**File to create:** `/public/_headers` (if GitLab Pages supports it, or configure in GitLab CI):

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
```

---

### 3.14 Trailing Slash Configuration

**Impact:** Inconsistent trailing slashes can cause duplicate content issues.

**File:** `/next.config.ts`

```ts
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  trailingSlash: true,  // ADD THIS - important for static hosting on GitLab Pages
};
```

GitLab Pages serves directories by looking for `index.html`. Setting `trailingSlash: true` ensures Next.js generates `/privacy/index.html` instead of `/privacy.html`, which is the standard GitLab Pages expects.

---

## Implementation Checklist (Ordered by Priority)

### Do First (This Week)
- [ ] Fix domain in `siteConfig.ts`: `sitwhm.com` to `sitwhm.de`
- [ ] Fix email in `Sponsors.tsx`: `sponsors@sitwhm.com` to `sponsors@sitwhm.de`
- [ ] Create `/public/robots.txt`
- [ ] Create `/public/sitemap.xml`
- [ ] Register with Google Search Console and submit sitemap
- [ ] Register with Bing Webmaster Tools
- [ ] Add canonical URLs to all pages
- [ ] Create and add OG image (`/public/og-image.png`)
- [ ] Fix broken Code of Conduct link in Registration.tsx
- [ ] Add `trailingSlash: true` to next.config.ts

### Do Next (This Month)
- [ ] Enhance JSON-LD Event schema with full address, geo, performers, capacity
- [ ] Add WebSite and Organization JSON-LD schemas
- [ ] Add FAQPage JSON-LD schema
- [ ] Expand keywords in metadata
- [ ] Improve meta description
- [ ] Replace placeholder speaker photos with real ones
- [ ] Enhance image alt text
- [ ] Create SAP Community listing and blog post
- [ ] Submit to dev.events and other directories
- [ ] Add hreflang tags
- [ ] Add geo meta tags

### Do When Time Permits
- [ ] Add apple-touch-icon and favicon variants
- [ ] Add web app manifest
- [ ] Add dns-prefetch hints
- [ ] Add BreadcrumbList structured data to subpages
- [ ] Fix Google Maps embed with real coordinates
- [ ] Consider blog section for content marketing
- [ ] Consider individual speaker pages
- [ ] Submit to additional event directories
- [ ] Add security headers via _headers file
- [ ] Create and maintain active social media presence

---

## Monitoring

After implementing Priority 1 and 2 items:

1. **Google Search Console** -- Check "Coverage" report weekly for indexing status
2. **Google Rich Results Test** -- Validate JSON-LD at https://search.google.com/test/rich-results
3. **Schema Validator** -- Validate at https://validator.schema.org/
4. **PageSpeed Insights** -- Run at https://pagespeed.web.dev/ (current static export should score well)
5. **Social Preview** -- Test OG tags at https://www.opengraph.xyz/
6. **Search for `site:sitwhm.de`** weekly until pages appear in index

---

## Key Competitive Insight

Other SAP Inside Track events (NRW, Madrid, Melbourne, Wroclaw, Columbus, Tokyo) all have presence on `community.sap.com` with event listings and blog posts. This is the single most important off-site action for discoverability within the SAP community. The Weinheim event is currently invisible in this ecosystem.
