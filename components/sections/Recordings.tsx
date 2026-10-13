import { FadeContainer, FadeDiv } from "@/components/Fade"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { VideoEmbed } from "@/components/VideoEmbed"
import { Abstract } from "@/components/Abstract"
import { talks, sessions, speakers, year } from "@/lib/content/2026"
import type { AssetStatus, Talk } from "@/lib/types"
import {
  RiFilePdfLine,
  RiSlideshowLine,
  RiArrowRightUpLine,
} from "@remixicon/react"

/**
 * What we tell visitors when an asset isn't there. Never just hide it
 * silently: "coming soon" is information, a missing row is confusing.
 *
 * 'published' is in here too, so a talk marked published but missing its id or
 * filename falls through to this note rather than rendering a broken embed.
 */
const VIDEO_NOTE: Record<AssetStatus, string> = {
  published: "Publishing soon",
  pending: "Publishing soon",
  declined: "Not published at the speaker's request",
  unavailable: "This talk wasn't recorded",
}

const SLIDES_NOTE: Record<AssetStatus, string> = {
  published: "Coming soon",
  pending: "Coming soon",
  declined: "Not published at the speaker's request",
  unavailable: "No slides for this talk",
}

function speakerNames(speakerId?: string | string[]) {
  const ids = Array.isArray(speakerId) ? speakerId : speakerId ? [speakerId] : []
  return ids
    .map((id) => speakers.find((s) => s.id === id)?.name)
    .filter(Boolean)
    .join(" & ")
}

/**
 * The slides row under a talk.
 *
 * Renders a button for a deck we host, a link for one the speaker publishes
 * themselves, a plain note when there is no deck at all, and nothing while a
 * deck is merely pending. That last case is deliberate: a column of identical
 * "Slides: coming soon" lines tells the reader nothing and makes the section
 * look half-finished.
 */
function SlidesLink({ talk }: { talk: Talk }) {
  const linkClass =
    "inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-syntax-blue shadow-sm transition-all hover:border-syntax-blue/30 hover:bg-syntax-blue/5"

  if (talk.slidesStatus === "published") {
    // A file we host wins over an external link: it keeps working whatever
    // happens to someone else's account.
    if (talk.slidesFile) {
      return (
        <div className="mt-auto pt-6">
          <a
            href={`/slides/${year}/${talk.slidesFile}`}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <RiFilePdfLine className="h-4 w-4" />
            Slides (PDF)
          </a>
        </div>
      )
    }
    if (talk.slidesUrl) {
      return (
        <div className="mt-auto pt-6">
          <a
            href={talk.slidesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <RiSlideshowLine className="h-4 w-4" />
            Slides
            <RiArrowRightUpLine className="h-4 w-4 text-gray-300" />
          </a>
        </div>
      )
    }
    // Marked published but nothing to point at: say nothing rather than
    // render a dead button.
    return null
  }

  if (talk.slidesStatus === "unavailable" || talk.slidesStatus === "declined") {
    return (
      <p className="mt-auto pt-6 text-sm text-gray-400">
        {SLIDES_NOTE[talk.slidesStatus]}
      </p>
    )
  }

  return null
}

export function Recordings() {
  // Join the post-event material onto the real agenda so titles and speakers
  // are never retyped. A talk with no entry in talks.ts simply doesn't appear.
  const items = talks
    .map((talk) => ({ talk, session: sessions.find((s) => s.id === talk.id) }))
    .filter((item) => !!item.session)

  return (
    <section
      id="recordings"
      className="bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <SectionHeading
          eyebrow={`${year} · Watch again`}
          title="Talks & Slides"
          lede="Every session from the day. Videos load from YouTube only when you press play."
        />

        <FadeContainer>
          <div className="mt-16 space-y-6">
            {items.map(({ talk, session }, i) => (
              <FadeDiv key={talk.id} delay={0.2 + 0.05 * i}>
                <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8">
                  <div className="grid gap-6 md:grid-cols-5 md:gap-8">
                    <div className="md:col-span-3">
                      {talk.videoStatus === "published" && talk.youtubeId ? (
                        <VideoEmbed
                          youtubeId={talk.youtubeId}
                          title={session!.title}
                          thumbnail={`/thumbnails/${year}/${talk.youtubeId}.jpg`}
                        />
                      ) : (
                        <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-50">
                          <p className="px-6 text-center text-sm text-gray-500">
                            {VIDEO_NOTE[talk.videoStatus]}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col md:col-span-2">
                      <h3 className="text-xl font-semibold leading-snug text-gray-900">
                        {session!.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-syntax-blue">
                        {speakerNames(session!.speakerId) || session!.speaker}
                      </p>
                      <Abstract text={session!.description} />

                      <SlidesLink talk={talk} />
                    </div>
                  </div>
                </article>
              </FadeDiv>
            ))}
          </div>
        </FadeContainer>
      </div>
    </section>
  )
}
