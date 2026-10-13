export interface Session {
  id: string
  time: string
  title: string
  speaker: string
  description: string
  speakerId?: string | string[]
  track?: string
  /** Coffee/lunch breaks: rendered as non-interactive break blocks in the agenda calendar grid. */
  isBreak?: boolean
}

export interface Sponsor {
  id: string
  name: string
  tier: 'platinum' | 'gold' | 'silver'
  logo: string
  website: string
  description?: string
  /** Per-logo optical scale (1 = default). Use to compensate for logos with internal whitespace. */
  logoScale?: number
}

export interface AboutCard {
  id: string
  icon: string
  title: string
  description: string
}

export interface Person {
  id: string
  name: string
  title: string
  company?: string
  bio?: string
  photo: string
  linkedin?: string
}

/**
 * Publication state of a talk's material. Every talk carries one per asset so
 * the page can say *why* something is missing instead of silently hiding it.
 *
 * - 'published'   : we have it and we're allowed to show it
 * - 'pending'     : recorded/handed over, not processed or not yet approved
 * - 'declined'    : speaker asked us not to publish this
 * - 'unavailable' : never existed (camera failed, no deck, lightning talk)
 */
export type AssetStatus = 'published' | 'pending' | 'declined' | 'unavailable'

/**
 * Post-event material for one talk. `id` matches the `Session.id` in the
 * agenda so the recap can reuse the real titles and speakers.
 */
export interface Talk {
  id: string
  /** YouTube video id, e.g. "dQw4w9WgXcQ". Only read when videoStatus is 'published'. */
  youtubeId?: string
  videoStatus: AssetStatus

  /**
   * A deck we host ourselves: the filename of a PDF in
   * public/slides/<year>/, e.g. "christian-lechner.pdf".
   *
   * Preferred when the speaker just hands us a file, because it keeps working
   * whatever happens to anyone else's account.
   */
  slidesFile?: string
  /**
   * A deck the speaker publishes themselves: a full URL to GitHub, their blog,
   * Speaker Deck, wherever. Use this instead of `slidesFile` when they would
   * rather point at their own copy.
   *
   * If both are set, the hosted file wins.
   */
  slidesUrl?: string
  /**
   * Only 'published' shows a link, and only when one of the two fields above
   * is filled in. 'unavailable' means there is no deck for this talk at all,
   * which the page states plainly. 'pending' is the silent default.
   */
  slidesStatus: AssetStatus
}

/** One hand-picked post about the event. Curated, never scraped. */
export interface CoveragePost {
  id: string
  /** Who wrote it. Use the name they post under. */
  author: string
  authorRole?: string
  platform: 'linkedin' | 'bluesky' | 'mastodon' | 'blog' | 'sap-community'
  /**
   * Link to the post. An entry with an empty url is treated as unfinished and
   * is not rendered, so a half-filled row can sit in the file safely.
   */
  url: string
  /**
   * ISO date. Optional, and only a label: the list renders in array order, so
   * you can sequence posts by editing the file rather than by getting dates
   * exactly right.
   */
  date?: string
  /**
   * LinkedIn's own embed id, e.g. "urn:li:share:7123456789012345678".
   *
   * Get it from the post's "..." menu -> Embed this post, which gives an
   * iframe whose src ends in this urn. When present, the card can show the
   * whole post in place, served by LinkedIn, with the author's name and
   * picture attached. That is the only way to show a full post without
   * copying someone else's words onto our server.
   */
  linkedinEmbedUrn?: string
}

/** One published event photo. Keep the committed set small and resized. */
export interface Photo {
  id: string
  /**
   * Filename produced by scripts/process-photos.py, without a path. The
   * gallery builds both URLs from it:
   *   /photos/<year>/<file>          full size, opened in the lightbox
   *   /photos/<year>/thumbs/<file>   grid thumbnail
   * An empty string renders a labelled grey box instead.
   */
  src: string
  alt: string
  credit?: string
}

/**
 * The numbers we show sponsors. Every field is optional: the stats strip
 * renders only the fields that are filled in, and disappears entirely when
 * none are. No placeholder numbers ever reach the page.
 */
export interface EditionStats {
  attendees?: number
  companies?: number
  talks?: number
  /** Free-text, e.g. "mostly developers, architects and consultants". */
  audienceNote?: string
}
