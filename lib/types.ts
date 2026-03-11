export interface Session {
  id: string
  time: string
  title: string
  speaker: string
  description: string
  track?: string
}

export interface Sponsor {
  id: string
  name: string
  tier: 'platinum' | 'gold' | 'silver'
  logo: string
  website: string
  description?: string
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
  bio?: string
  photo: string
  linkedin?: string
}
