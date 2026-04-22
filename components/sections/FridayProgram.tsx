import { FadeContainer, FadeDiv } from "@/components/Fade"
import { Button } from "@/components/ui/Button"
import { siteConfig } from "@/app/siteConfig"
import { RiCodeSSlashLine, RiGlassesLine, RiCalendarLine, RiTimeLine, RiMapPinLine, RiGroupLine, RiMacbookLine } from "@remixicon/react"

export function FridayProgram() {
  return (
    <section id="friday" className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Friday Program
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Arrive a day early for hands-on learning and relaxed networking
              </p>
            </FadeDiv>
          </div>

          {/* Two Cards */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* CodeJam Card */}
            <FadeDiv delay={0.2}>
              <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-syntax-blue/10 p-3">
                    <RiCodeSSlashLine className="h-6 w-6 text-syntax-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      SAP CodeJam
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Hands-on workshop led by SAP experts
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiCalendarLine className="h-4 w-4 text-gray-400" />
                    <span>Friday, September 18, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiTimeLine className="h-4 w-4 text-gray-400" />
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiMapPinLine className="h-4 w-4 text-gray-400" />
                    <span>Syntax Auditorium, Weinheim</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiGroupLine className="h-4 w-4 text-gray-400" />
                    <span>Limited to ~25 participants</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 text-sm leading-relaxed text-gray-600">
                  A CodeJam is a free, full-day hands-on workshop where you work through
                  real-world exercises on a specific SAP technology. An SAP expert guides
                  you through the material, answers questions, and helps you troubleshoot -
                  right there in the room. It's the best way to get practical experience
                  with a technology you've been curious about.
                </p>

                {/* Prerequisites note */}
                <div className="mt-4 rounded-lg bg-gray-50 p-4">
                  <p className="flex items-start gap-2 text-xs text-gray-400">
                    <RiMacbookLine className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    Bring your own laptop. Prerequisites will be shared before the event.
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-6">
                  <a
                    href={siteConfig.codejam.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button size="md" className="w-full">
                      Register for CodeJam
                    </Button>
                  </a>
                </div>
              </div>
            </FadeDiv>

            {/* Pre-Evening Card */}
            <FadeDiv delay={0.3}>
              <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-syntax-cyan/10 p-3">
                    <RiGlassesLine className="h-6 w-6 text-syntax-cyan" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Pre-Evening Get-Together
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Casual dinner and drinks the night before
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiCalendarLine className="h-4 w-4 text-gray-400" />
                    <span>Friday, September 18, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiTimeLine className="h-4 w-4 text-gray-400" />
                    <span>From 7:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RiMapPinLine className="h-4 w-4 text-gray-400" />
                    <span>TBD - Weinheim</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 text-sm leading-relaxed text-gray-600">
                  Join us the evening before the main event for a relaxed dinner with
                  fellow attendees, speakers, and organizers. It's the perfect way to
                  break the ice, make new connections, and kick off the weekend in
                  good company. No agenda, no slides - just good food, cold drinks,
                  and great conversations.
                </p>

                {/* Note */}
                <div className="mt-4 rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Food and drinks at your own expense. We'll reserve seats once we
                    know how many people are interested.
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-6">
                  <Button size="md" variant="secondary" className="w-full opacity-60 cursor-not-allowed" disabled>
                    Details Coming Soon
                  </Button>
                </div>
              </div>
            </FadeDiv>
          </div>
        </FadeContainer>
      </div>
    </section>
  )
}
