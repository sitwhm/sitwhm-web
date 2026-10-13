import Image from "next/image"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { Button } from "@/components/ui/Button"
import { siteConfig } from "@/app/siteConfig"
import { upcomingEdition, latestPastEdition } from "@/lib/editions"
import { sponsors, stats } from "@/lib/content/2026"

const TIER_LABEL = {
  platinum: "Platinum",
  gold: "Gold",
  silver: "Silver",
} as const

function isReal(logo: string) {
  return logo && !logo.includes("placeholder")
}

/**
 * The numbers a sponsor cares about. Renders only the fields that are filled
 * in, and returns null when none are, so no invented numbers reach the page.
 */
function StatsStrip() {
  const entries = [
    stats.attendees && { value: `${stats.attendees}`, label: "Attendees" },
    stats.companies && { value: `${stats.companies}`, label: "Companies" },
    stats.talks && { value: `${stats.talks}`, label: "Talks, all recorded" },
  ].filter(Boolean) as { value: string; label: string }[]

  if (entries.length === 0) return null

  return (
    <FadeDiv delay={0.25}>
      {/* The year label is not optional. These are last year's numbers sitting
          under a headline about next year, and without it the figures read as
          2027 promises. */}
      <p className="mt-14 text-center text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
        sitWHM {latestPastEdition.year} in numbers
      </p>
      <dl className="mx-auto mt-6 flex max-w-2xl flex-wrap items-start justify-center gap-x-16 gap-y-8">
        {entries.map((e) => (
          /* col-reverse puts the number on top visually while keeping the
             dt/dd order the spec wants, so the label isn't announced twice. */
          <div key={e.label} className="flex flex-col-reverse text-center">
            <dt className="mt-2 text-sm text-gray-400">{e.label}</dt>
            <dd className="text-4xl font-bold tracking-tight text-white">
              {e.value}
            </dd>
          </div>
        ))}
      </dl>
      {stats.audienceNote && (
        <p className="mt-6 text-center text-sm text-gray-400">
          {latestPastEdition.year} audience: {stats.audienceNote}
        </p>
      )}
    </FadeDiv>
  )
}

export function NextEdition() {
  if (!upcomingEdition) return null

  const realSponsors = sponsors.filter((s) => isReal(s.logo))

  return (
    <section
      id="next"
      className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer className="text-center">
          <FadeDiv>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
              We&apos;re doing it again
            </p>
          </FadeDiv>

          <FadeDiv delay={0.1}>
            <h2 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-7xl">
              sitWHM{" "}
              <span className="bg-gradient-to-r from-syntax-cyan to-syntax-green bg-clip-text text-transparent">
                {upcomingEdition.year}
              </span>
            </h2>
          </FadeDiv>

          <FadeDiv delay={0.15}>
            {/*
              A season, not a date. Sponsors plan budgets in Q1 and need the
              signal now, and a precise date we later move is what actually
              costs credibility. Flip lib/editions.ts to 'confirmed' when it
              is real.
            */}
            <p className="mx-auto mt-5 max-w-xl text-base text-gray-300">
              {upcomingEdition.dateLabel} in {upcomingEdition.city}.
              {upcomingEdition.status === "announced" &&
                " The exact date lands in early 2027."}
            </p>
          </FadeDiv>

          <StatsStrip />
        </FadeContainer>

        {/* ----------------------------------------------------------------
            Sponsor block.

            Deliberately vague: we're looking for sponsors, and that's the
            whole message. No tiers, no benefit lists, no pack download. None
            of it is decided yet, and publishing a half-finished package
            invites questions we can't answer. The conversation starts by
            email and we work it out there.
            ---------------------------------------------------------------- */}
        <FadeContainer>
          <FadeDiv delay={0.3}>
            <div className="mt-20 border-t border-white/10 pt-16 text-center">
              <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                We&apos;re looking for sponsors
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
                Sponsorship is the only reason the event is free to attend. It
                pays for the room, the catering and the recordings. If that
                sounds like something your company would back, get in touch and
                we&apos;ll figure out the rest together.
              </p>
            </div>
          </FadeDiv>

          <FadeDiv delay={0.4}>
            <div className="mt-10 flex justify-center">
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=Sponsoring%20sitWHM%20${upcomingEdition.year}`}
              >
                <Button size="lg">Talk to us about sponsoring</Button>
              </a>
            </div>
          </FadeDiv>

          <FadeDiv delay={0.5}>
            <p className="mt-6 text-center text-sm text-gray-500">
              Not a sponsor, just want to come?{" "}
              <a
                href={siteConfig.notifyFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-300 underline decoration-gray-600 underline-offset-4 hover:text-white"
              >
                Get notified when the date is set
              </a>
            </p>
          </FadeDiv>

          {realSponsors.length > 0 && (
            <FadeDiv delay={0.75}>
              <div className="mt-20 border-t border-white/10 pt-12">
                <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                  {latestPastEdition.year} was made possible by
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  {realSponsors.map((sponsor) => (
                    <a
                      key={sponsor.id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${sponsor.name}, ${TIER_LABEL[sponsor.tier]} sponsor`}
                      className="flex h-16 w-40 items-center justify-center rounded-xl bg-white px-5 transition-transform hover:-translate-y-0.5"
                    >
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={240}
                        height={100}
                        style={
                          sponsor.logoScale && sponsor.logoScale !== 1
                            ? {
                                transform: `scale(${sponsor.logoScale})`,
                                transformOrigin: "center",
                              }
                            : undefined
                        }
                        className="max-h-9 w-auto max-w-full object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </FadeDiv>
          )}
        </FadeContainer>
      </div>
    </section>
  )
}
