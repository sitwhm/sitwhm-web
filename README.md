# sitwhm.de

Next.js 16 (App Router), static export, Tailwind v4, TypeScript.
Deployed to GitHub Pages on push to `main`.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

| Folder | What's in it |
|---|---|
| `app/` | Routes. `page.tsx` is the homepage, `2026/page.tsx` the permanent archive, `siteConfig.ts` holds URLs and the analytics token. |
| `lib/content/2026/` | Everything about the 2026 edition: talks, coverage links, photos, stats. This is the folder you edit. |
| `lib/editions.ts` | The year registry. Announcing 2027 is an edit here. |
| `components/sections/` | One file per page section. |
| `print-assets/` | HTML files meant to be printed to PDF (lanyard, parking flyer). |

The page you see is picked by `pageMode` in `app/featureFlags.ts`. It's on
`'recap'`, the post-event site. The other modes (`full`, `teaser`, `mystery`)
are the pre-event pages from earlier this year and still work.

---

## Adding a speaker's video and slides

Both live in one place: `lib/content/2026/talks.ts`. The title, speaker and
abstract come from `lib/content/agenda.ts` automatically, so you never retype them.

**Video:** upload to the sitWHM YouTube channel, then:

```ts
{
  id: "talk5",                 // must match the id in agenda.ts
  youtubeId: "dQw4w9WgXcQ",    // the bit after ?v= in the YouTube URL
  videoStatus: "published",
  ...
}
```

Then grab the thumbnail and commit it:

```bash
npm run thumbnails
```

That downloads the preview image for every `youtubeId` into
`public/thumbnails/2026/`. It has to run whenever you add or change a video,
otherwise that talk falls back to a plain dark tile. See the note below on why
the images are hosted here instead of loaded from YouTube.

Match videos to talks by their **title**, not by the order you received the
links in. The 2026 batch arrived out of agenda order.

**Slides:** two ways, pick one per talk.

A deck we host, which keeps working whatever happens to anyone else's account.
Drop the PDF into `public/slides/2026/`, then:

```ts
{
  slidesFile: "cedric-heisel.pdf", // the filename you just added
  slidesStatus: "published",
}
```

Or a deck the speaker publishes themselves:

```ts
{
  slidesUrl: "https://github.com/someone/their-talk",
  slidesStatus: "published",
}
```

If both are set, the hosted file wins. Either way `slidesStatus` has to be
`"published"` or nothing appears.

When a talk simply has no deck, say so rather than leaving it silent:

```ts
{ slidesStatus: "unavailable" }   // renders "No slides for this talk"
```

`"pending"` renders nothing at all. That is the default, and it is why the
section does not carry a column of identical "coming soon" lines.

If a speaker says no, set the status to `"declined"` and the page says "not
published at the speaker's request" instead of quietly dropping the talk.
`"pending"` shows "coming soon". Nothing goes live by accident: a talk stays
hidden until you set `published` **and** provide the id or filename.

## Adding photos

Originals go through `scripts/process-photos.py`, which develops them (white
balance, levels, tone curve, vibrance, resize, sharpen) and writes two sizes:
the full 2000px file and a 900px thumbnail for the grid.

One-off setup, these deps are not part of the site build:

```bash
python3 -m venv .photovenv && .photovenv/bin/pip install pillow pillow-heif numpy
```

Then:

```bash
.photovenv/bin/python scripts/process-photos.py --src ~/Downloads/your-photos
```

The script processes a curated `SELECTION` near the bottom of the file: a map
of source index to output slug. For a new batch, use `--all` to process
everything, look at the results, then rewrite that map. There is no clever way
around looking at the photos.

Finally list them in `lib/content/2026/photos.ts`. `src` is the filename only;
the gallery builds both the thumbnail and full-size URL from it. Write a real
`alt` for each: it is the caption shown in the lightbox.

### A note on the file format

The photos are committed as **WebP**, which is the default the script writes.
These are photographs: the same set was 68 MB as PNG against 4 MB as WebP with
no visible difference. PNG is the right choice for screenshots and line art,
not for photographs, and git keeps every version forever.

If you ever need PNG anyway:

```bash
.photovenv/bin/python scripts/process-photos.py --src ~/Downloads/your-photos --format png
```

Then delete the `.webp` files and change the extensions in `photos.ts`.

## Adding a sponsor

`lib/content/sponsors.ts`. Logo into `public/logos/`, then:

```ts
{
  id: "acme",
  name: "ACME GmbH",
  tier: "gold",              // platinum | gold | silver
  logo: "/logos/acme.svg",
  website: "https://acme.example",
  logoScale: 1.25,           // optional, for logos with lots of whitespace
}
```

Entries whose logo path contains `placeholder` are filtered out everywhere, so
you can leave the dummy rows in place.

## The 2027 sponsor pitch

Deliberately vague. The section says we're looking for sponsors and gives one
email address. No tiers, no prices, no benefit lists, no pack download, because
none of it is decided yet and a half-finished package invites questions we
can't answer.

There is deliberately no sponsor pack in the repo. A draft existed and was
removed along with its placeholder PDF: an unlinked document with TODO prices
in it is just something to trip over later. When you want one, write it fresh
once the tiers are actually decided.

## Announcing the 2027 date

`lib/editions.ts`. Change the 2027 entry's `status` from `'announced'` to
`'confirmed'` and fill in `dateLabel` and `isoDate`. The homepage band picks it
up on its own.

When 2027 becomes the live event, flip `pageMode` back to `'full'`. The 2026
material stays reachable at `/2026/` forever. That URL is what sponsors and
speakers link to, so don't move it.

---

## Deliberately incomplete

Nothing below is broken or a placeholder. Each one is a choice, and each one
is a small edit away from changing.

- **Six of the eight videos are held back on purpose.** Only DJ Adams and
  Christian Lechner are live. The rest keep their `youtubeId` in `talks.ts`
  but sit on `videoStatus: "pending"`, so the page says "Publishing soon".
  Releasing one is a single word: change it to `"published"`. The hero card
  counts what is live, so "2 of 8 sessions online" updates itself.
- **Slides.** Christian Lechner's deck is published. DJ Adams has none, which
  his entry states with `"unavailable"`. The other six are `"pending"` and
  therefore silent; if a speaker sends a deck, drop it into
  `public/slides/2026/` and fill in `slidesFile`.
- **Attendee numbers.** Everything in `stats.ts` is commented out, so the block
  doesn't render at all. Fill in attendees and companies from the Tito export
  and it appears, labelled "sitWHM 2026 in numbers" so nobody mistakes last
  year's figures for a 2027 promise. Leaving it as-is is a deliberate choice,
  not an oversight.
- **One coverage post is not a recap.** Holger Bruchelt's entry in
  `coverage.ts` is about no-shows at free community events and the catering
  they waste. Honest community feedback, flagged with a `TODO(max)` so nobody
  publishes it without having read it.

## Decisions worth knowing

- **Videos are click-to-load, with self-hosted thumbnails.** The preview images
  live in `public/thumbnails/`, fetched once by `npm run thumbnails`. Pointing
  an `<img>` at `i.ytimg.com` would look identical but hand Google every
  visitor's IP address on page load, which is the thing click-to-load exists to
  prevent. As built, the page makes no third-party request at all until someone
  presses play, and then it's `youtube-nocookie.com`. That's why there's no
  cookie banner.
- **Slides are plain PDFs on our own domain.** No SlideShare, no Speaker Deck,
  no third-party account. The files are in git, so they can't disappear.
- **Coverage is hand-curated, not scraped.** LinkedIn has no public hashtag API
  and scraping it breaks and violates their terms. Write your own one-line
  summary per post, and don't paste the author's text, it's their copyright.
- **2027 leads the page.** Announcement bar under the navbar, then the hero,
  then the 2027 and sponsor section, before the recap material. The navbar CTA
  points at it too. To stop that burying the recap, the hero carries two large
  entry cards straight into the talks and the photos. Those two are what most
  visitors arrive for, so they are the biggest clickable thing on the first
  screen. The talk count in the card is read from `talks.ts`, not typed.
- **2027 shows a season, not a date.** A date we later move costs more
  credibility with sponsors than no date does.
- **The sponsor ask is intentionally unspecific.** One sentence and one email
  address. Tiers and prices come later, in the conversation.
- **Section headers come from `components/ui/SectionHeading.tsx`.** Small
  uppercase eyebrow, large title, optional lede, matching the sections that
  were already on the site. Reuse it for anything new.
- **The type scale is five roles, one typeface.** `text-5xl sm:text-7xl` for
  the page title, `text-4xl sm:text-5xl` for section headings, `text-xl` for
  card and talk titles, `text-base` for body, `text-sm` for meta and captions.
  Letter-spacing is only ever `tracking-tight` on headings or
  `tracking-[0.2em]` on uppercase eyebrows. Adding a sixth size needs a reason.
- **Photos have a takedown link** under the grid. These are identifiable
  people; make sure there was a photography notice at registration.

## Open questions

1. Whether a photography notice was actually shown at registration. The
   published photos show identifiable attendees, mostly from behind, and the
   speakers clearly. The takedown mailto is live either way.
2. Whether the LinkedIn embeds should keep loading with the page. They do
   right now, which is what a visitor expects, but it contacts LinkedIn on
   every page view and sets their cookies, so a consent banner is expected for
   a German site. `featureFlags.linkedinEmbeds: 'click-to-load'` switches it.

Settled on purpose, so nobody reopens them by accident: no analytics of any
kind, no sponsor pack, no full-gallery link, no attendee numbers, and 2027
stays a season rather than a date.

---

## Deployment

**Production:** GitHub Pages at https://sitwhm.de (custom domain, HTTPS enforced)

- Source: GitHub Actions workflow (`.github/workflows/nextjs.yml`)
- Trigger: push to `main` on `sitwhm/sitwhm-web`
- Build: `npm ci && next build` → static export in `out/`
- Custom domain set via Settings → Pages (also pinned by `public/CNAME`)

**Staging:** GitLab Pages (`.gitlab-ci.yml` included)

### HTTPS / TLS certificate

GitHub Pages issues and **auto-renews** the certificate via Let's Encrypt (~30
days before the 90-day expiry). No manual action needed as long as:

- DNS A records for `sitwhm.de` stay on GitHub Pages IPs (`185.199.108-111.153`)
- Domain remains "verified" in repo Settings → Pages
- "Enforce HTTPS" stays enabled

If auto-renew ever fails: remove and re-add the custom domain in Settings →
Pages to trigger a fresh cert request. Let's Encrypt certs cannot be extended
beyond 90 days, and GitHub Pages does not support uploading custom certificates.

## Design

See `DESIGN_PROMPT.md`. Keep it minimal. No gradients-for-the-sake-of-it, no
glassmorphism.
