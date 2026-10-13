import type { Metadata } from "next"
import { siteConfig } from "@/app/siteConfig"
import { Recordings } from "@/components/sections/Recordings"
import { EventPhotos } from "@/components/sections/EventPhotos"
import { Agenda } from "@/components/sections/Agenda"
import { Speakers } from "@/components/sections/Speakers"
import { Sponsors } from "@/components/sections/Sponsors"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { latestPastEdition } from "@/lib/editions"

export const metadata: Metadata = {
  title: `sitWHM ${latestPastEdition.year}: Talks, Slides & Photos`,
  description: `Recordings, slide decks and photos from SAP Inside Track Weinheim ${latestPastEdition.year}, ${latestPastEdition.dateLabel} at ${latestPastEdition.venue}, ${latestPastEdition.city}.`,
  alternates: { canonical: latestPastEdition.recapPath ?? "/2026/" },
  openGraph: {
    title: `sitWHM ${latestPastEdition.year}: Talks, Slides & Photos`,
    url: `${siteConfig.url}${latestPastEdition.recapPath ?? "/2026/"}`,
    images: [`${siteConfig.url}/og-image.jpg`],
  },
}

/**
 * The permanent archive for one edition.
 *
 * This URL is what sponsors and speakers link to, so it must not move. When
 * 2027 takes over the homepage, this page keeps everything exactly where it is.
 */
export default function Edition2026() {
  return (
    <main className="relative">
      <section className="bg-gradient-to-b from-gray-50 to-white pb-14 pt-32 md:pt-40">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <FadeContainer>
            <FadeDiv>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-syntax-blue">
                Archive
              </p>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                sitWHM {latestPastEdition.year}
              </h1>
            </FadeDiv>
            <FadeDiv delay={0.15}>
              <p className="mt-5 text-base text-gray-500">
                {latestPastEdition.dateLabel} · {latestPastEdition.venue} ·{" "}
                {latestPastEdition.city}
              </p>
            </FadeDiv>
          </FadeContainer>
        </div>
      </section>

      <Recordings />
      <EventPhotos />
      <Agenda />
      <Speakers />
      <Sponsors />
    </main>
  )
}
