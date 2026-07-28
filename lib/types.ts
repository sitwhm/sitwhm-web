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
