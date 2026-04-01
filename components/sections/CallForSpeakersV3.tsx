/**
 * CONCEPT 3: "The Warm Card" — Registration color scheme
 *
 * Full syntax-blue background (matching "Join Us for Free"),
 * with cyan/white glows. Split card: left side stays blue with
 * heading, right side is a white card with copy + CTA.
 * Feeling: cohesive with Registration, personal, editorial.
 */
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { Button } from "@/components/ui/Button"
import { RiArrowRightLine } from "@remixicon/react"

export function CallForSpeakersV3() {
  return (
    <section id="speakers-call" className="relative overflow-hidden bg-syntax-blue py-24">
      {/* Background glows — matching Registration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-syntax-cyan/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <FadeContainer className="relative z-10 mx-auto max-w-5xl px-4 md:px-6">
        <FadeDiv>
          <div className="overflow-hidden rounded-2xl bg-white/10 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left — Big heading */}
              <div className="relative flex items-center px-8 py-12 md:px-12 md:py-16">
                {/* Subtle pattern overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative">
                  <p className="text-sm font-medium uppercase tracking-widest text-white/60">
                    Call for Speakers
                  </p>
                  <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                    Your Story
                    <br />
                    Belongs
                    <br />
                    <span className="text-syntax-cyan">on Stage</span>
                  </h2>
                </div>
              </div>

              {/* Right — White card with copy + CTA */}
              <div className="flex flex-col justify-center rounded-2xl bg-white px-8 py-12 md:px-12 md:py-16">
                <p className="text-lg leading-relaxed text-gray-600">
                  Whether it&apos;s a deep-dive, a success story, or a lesson
                  from a project that didn&apos;t go as planned — if you&apos;re
                  passionate about it, we want to hear it. First-timers
                  especially welcome — pick 20 or 40 minutes and go for it.
                </p>

                <div className="mt-8">
                  <a
                    href="https://sessionize.com/testconference5847/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="group gap-2">
                      Submit a Session
                      <RiArrowRightLine className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </a>
                  <p className="mt-3 text-xs text-gray-400">
                    via Sessionize
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeDiv>
      </FadeContainer>
    </section>
  )
}
