/**
 * CONCEPT 1: "The Spotlight"
 *
 * Dark navy section that breaks the page rhythm. A soft radial
 * spotlight effect behind the heading creates a "stage" feeling.
 * Three value-prop pills sit horizontally. Single bold CTA.
 * Feeling: confident, inviting, theatrical.
 */
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { Button } from "@/components/ui/Button"
import { RiMicLine, RiLightbulbLine, RiGroupLine, RiRocketLine } from "@remixicon/react"

const reasons = [
  { icon: RiLightbulbLine, text: "Share what you know" },
  { icon: RiGroupLine, text: "Inspire the community" },
  { icon: RiRocketLine, text: "Grow as a speaker" },
]

export function CallForSpeakersV1() {
  return (
    <section id="speakers-call" className="relative overflow-hidden bg-syntax-dark py-28">
      {/* Spotlight glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-syntax-blue/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[800px] -translate-x-1/2 translate-y-1/2 rounded-full bg-syntax-cyan/10 blur-[100px]" />
      </div>

      <FadeContainer className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-6">
        {/* Mic badge */}
        <FadeDiv className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-syntax-cyan backdrop-blur-sm">
            <RiMicLine className="h-4 w-4" />
            Call for Speakers
          </div>
        </FadeDiv>

        {/* Heading */}
        <FadeDiv delay={0.1}>
          <h2 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            We Want to Hear
            <br />
            <span className="bg-gradient-to-r from-syntax-cyan to-syntax-green bg-clip-text text-transparent">
              From You!
            </span>
          </h2>
        </FadeDiv>

        {/* Body */}
        <FadeDiv delay={0.2}>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-gray-400">
            Got a story, a lesson, or an idea worth sharing? Whether you&apos;re a
            seasoned speaker or stepping up for the first time — this stage is yours.
          </p>
        </FadeDiv>

        {/* Three reasons */}
        <FadeDiv delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            {reasons.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-gray-300"
              >
                <Icon className="h-4 w-4 text-syntax-cyan" />
                {text}
              </div>
            ))}
          </div>
        </FadeDiv>

        {/* First-timer note */}
        <FadeDiv delay={0.35}>
          <p className="mt-8 text-sm text-gray-500">
            First time speaking? You&apos;ll be among friends. Pick 15, 30, or 45 minutes — whatever feels right.
          </p>
        </FadeDiv>

        {/* CTA */}
        <FadeDiv delay={0.4}>
          <div className="mt-8">
            <a
              href="https://sessionize.com/sitwhm2026/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-syntax-cyan to-syntax-blue text-white shadow-lg shadow-syntax-cyan/20 hover:shadow-xl hover:shadow-syntax-cyan/30"
              >
                Submit Your Session
              </Button>
            </a>
            <p className="mt-3 text-xs text-gray-600">
              via Sessionize
            </p>
          </div>
        </FadeDiv>
      </FadeContainer>
    </section>
  )
}
