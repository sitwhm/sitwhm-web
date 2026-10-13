/**
 * The edition registry.
 *
 * Every year sitWHM runs is one entry here. This is the only place that knows
 * which year is "current" and which years are archived, so announcing a new
 * edition is an edit to this file plus a new folder under lib/content/.
 *
 * See README.md → "Announcing a new year".
 */

export type EditionStatus =
  /** Already happened. Has a recap page under /<year>/. */
  | 'past'
  /** Announced, no confirmed date yet. Shows the season, collects interest. */
  | 'announced'
  /** Date confirmed, registration open or opening. */
  | 'confirmed'

export interface Edition {
  year: number
  status: EditionStatus
  /**
   * What we show visitors. For 'announced' editions this is deliberately a
   * season, not a date. See README. For 'past'/'confirmed', a real date.
   */
  dateLabel: string
  /** ISO date. Only set once status is 'confirmed'. Drives countdowns, schema.org. */
  isoDate?: string
  venue?: string
  city: string
  /** Where the recap lives. Undefined for editions that haven't happened. */
  recapPath?: string
}

export const editions: Edition[] = [
  {
    year: 2026,
    status: 'past',
    dateLabel: 'September 19, 2026',
    isoDate: '2026-09-19',
    venue: 'Syntax Auditorium',
    city: 'Weinheim an der Bergstraße',
    recapPath: '/2026/',
  },
  {
    year: 2027,
    status: 'announced',
    // TODO(max): once the date is fixed, set status to 'confirmed', put the
    // real date in dateLabel and isoDate, and the site flips over on its own.
    dateLabel: 'Autumn 2027',
    city: 'Weinheim an der Bergstraße',
  },
]

/** The edition the site is currently pointing at, the next one that hasn't happened. */
export const upcomingEdition: Edition | undefined = editions.find(
  (e) => e.status !== 'past',
)

/** The most recent edition that actually took place. Drives the recap on the homepage. */
export const latestPastEdition: Edition = editions
  .filter((e) => e.status === 'past')
  .sort((a, b) => b.year - a.year)[0]
