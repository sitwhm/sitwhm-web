import { Talk } from "@/lib/types"

/**
 * Post-event material for the 2026 talks.
 *
 * `id` must match a `Session.id` in lib/content/agenda.ts. Title, speaker and
 * abstract are read from there, so you never retype them here.
 *
 * The youtubeId values were matched to talks by reading each video's title
 * from YouTube, not by assuming the order they were sent in. They were not in
 * agenda order.
 *
 * STAGED RELEASE: videos go live as they are published on YouTube. The ones
 * still held back keep their youtubeId but sit on `videoStatus: "pending"`,
 * so the page says "Publishing soon" instead of embedding them. Releasing one
 * is a single word: change its videoStatus to "published". The hero card
 * counts what is live, so the "x of 8 sessions online" line follows along.
 *
 * SLIDES: two ways to link a deck, pick one per talk.
 *
 *   slidesFile: "christian-lechner.pdf"   a PDF we host, dropped into
 *                                         public/slides/2026/
 *   slidesUrl:  "https://github.com/..."  the speaker's own published copy
 *
 * Either way, set `slidesStatus: "published"` or nothing appears. Prefer
 * `slidesFile` when the speaker just hands you a file: it keeps working
 * whatever happens to anyone else's account.
 *
 * The other status values, for both video and slides:
 *   "pending"     nothing is shown beyond a short note. The quiet default.
 *   "unavailable" the page states there is none, e.g. a talk with no deck.
 *   "declined"    the page says the speaker asked us not to publish it.
 */
export const talks: Talk[] = [
  {
    id: "talk1", // DJ Adams: Local-first development with CAP Node.js
    youtubeId: "iNBMszJ5vR0",
    videoStatus: "published",
    // Confirmed: there is no deck for this one.
    slidesStatus: "unavailable",
  },
  {
    id: "talk2", // Christian Lechner: Platform Engineering on BTP
    youtubeId: "sC90Z2jbIrM",
    videoStatus: "published",
    slidesFile: "christian-lechner-platform-engineering-on-btp.pdf",
    slidesStatus: "published",
  },
  {
    id: "talk3", // Daniel Hutzel & Sebastian van Syckel: CAP Best Practices and AI
    youtubeId: "lOu8F0_qX1w",
    videoStatus: "published",
    slidesFile: "hutzel-van-syckel-cap-best-practices-and-ai.pdf",
    slidesStatus: "published",
  },
  {
    id: "talk4", // Holger Bruchelt: SAP AI and Microsoft AI
    youtubeId: "tNvSRY4lvA0",
    videoStatus: "pending",
    slidesStatus: "pending",
  },
  {
    id: "talk5", // Cedric Heisel: CAP App vs. Integration Suite
    youtubeId: "y3mFFpdLyEU",
    videoStatus: "pending",
    slidesStatus: "pending",
  },
  {
    id: "talk6", // Morten Wittrock: GitHub and Cloud Integration
    youtubeId: "li8zP-GKAYo",
    videoStatus: "published",
    slidesFile: "morten-wittrock-github-and-cloud-integration.pdf",
    slidesStatus: "published",
  },
  {
    id: "talk7", // Marian Zeis: AI-Assisted SAP Development with MCP
    youtubeId: "VBuJJafeG8g",
    videoStatus: "pending",
    slidesStatus: "pending",
  },
  {
    id: "talk8", // Matthias Steiner: The Long Arc of Enterprise Engineering
    youtubeId: "o9gyACc3-6E",
    videoStatus: "published",
    slidesFile: "matthias-steiner-the-long-arc-of-enterprise-engineering.pdf",
    slidesStatus: "published",
  },
]
