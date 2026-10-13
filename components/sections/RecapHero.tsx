import Image from "next/image"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { latestPastEdition } from "@/lib/editions"
import { talks, photos, heroPhotoIds, year } from "@/lib/content/2026"
import {
  RiPlayCircleLine,
  RiImage2Line,
  RiArrowRightLine,
} from "@remixicon/react"

/**
 * The hero photos, in the order given by `heroPhotoIds`. Entries without a
 * file are dropped rather than rendered as grey boxes: a placeholder is fine
 * inside the gallery, but the top of the page has to look finished.
 */
const PREVIEW = heroPhotoIds
  .map((id) => photos.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => !!p && !!p.src)

/**
 * The two things a visitor arriving from someone's LinkedIn post actually
 * wants: the recordings and the photos. They used to be small text links,
 * which buried them under the 2027 announcement. Now they're the largest
 * clickable thing on the first screen.
 */
/**
 * Counted, not typed. The videos are released in stages, so a hard-coded
 * "all 8 sessions" would promise more than the page delivers the moment one
 * of them is still on 'pending'.
 */
const liveTalks = talks.filter(
  (t) => t.videoStatus === "published" && t.youtubeId,
).length

const ENTRY_POINTS = [
  {
    href: "#recordings",
    Icon: RiPlayCircleLine,
    title: "Talks & Slides",
    description:
      liveTalks === talks.length
        ? `All ${talks.length} sessions from the day, free to watch.`
        : `${liveTalks} of ${talks.length} sessions online, the rest are coming.`,
  },
  {
    href: "#photos",
    Icon: RiImage2Line,
    title: "Photos",
    description: "Impressions from the venue, the talks and the breaks.",
  },
]

export function RecapHero() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white pb-20 pt-16 md:pt-20">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <FadeContainer>
          <FadeDiv delay={0.1}>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              sitWHM {latestPastEdition.year}
            </h1>
          </FadeDiv>

          <FadeDiv delay={0.15}>
            <p className="mt-5 text-base text-gray-500">
              {latestPastEdition.dateLabel} · {latestPastEdition.venue} ·{" "}
              {latestPastEdition.city}
            </p>
          </FadeDiv>

          <FadeDiv delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600">
              Thank you to everyone who showed up, spoke, and made it happen.
            </p>
          </FadeDiv>

          {/*
            Three frames from the gallery. The page used to open with nothing
            but type, which is a poor advertisement for an event whose whole
            argument is that it was worth being in the room. These link into
            the gallery rather than opening a viewer of their own, so the hero
            stays a signpost and the photos section stays the destination.
          */}
          {PREVIEW.length > 0 && (
            <div
              className={`mt-10 grid gap-3 md:gap-4 ${
                PREVIEW.length === 2 ? "grid-cols-2" : "grid-cols-3"
              }`}
            >
              {PREVIEW.map((photo, i) => (
                <FadeDiv key={photo.id} delay={0.25 + 0.07 * i}>
                  <a
                    href="#photos"
                    aria-label="Jump to the photo gallery"
                    className="block overflow-hidden rounded-xl border border-gray-100 bg-gray-100 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <Image
                      src={`/photos/${year}/thumbs/${photo.src}`}
                      alt={photo.alt}
                      width={1400}
                      height={1050}
                      priority={i === 0}
                      // 3:2 rather than 4:3: the group photo is a wide frame,
                      // and a squarer tile would crop people off both ends.
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </a>
                </FadeDiv>
              ))}
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {ENTRY_POINTS.map((entry, i) => (
              <FadeDiv key={entry.href} delay={0.25 + 0.1 * i}>
                <a
                  href={entry.href}
                  className="group flex h-full items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-syntax-blue/20 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-syntax-blue/10">
                    <entry.Icon className="h-6 w-6 text-syntax-blue" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xl font-semibold text-gray-900">
                      {entry.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-gray-500">
                      {entry.description}
                    </span>
                  </span>
                  <RiArrowRightLine className="h-5 w-5 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-syntax-blue" />
                </a>
              </FadeDiv>
            ))}
          </div>

          {/*
            A row of secondary links used to sit here. "sitWHM 2027" and
            "#sitWHM" repeated the navbar word for word two lines below it,
            and the navbar is always on screen. The archive link moved to the
            footer, which already carries it.
          */}
        </FadeContainer>
      </div>
    </section>
  )
}
