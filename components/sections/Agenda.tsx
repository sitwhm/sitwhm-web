import { FadeContainer, FadeDiv } from "@/components/Fade"
import { Button } from "@/components/ui/Button"
import { RiCalendarLine } from "@remixicon/react"

export function Agenda() {
  return (
    <section id="agenda" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Conference Agenda
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Saturday, September 19, 2026 - A full day of sessions and networking
              </p>
            </FadeDiv>
          </div>

          {/* Placeholder */}
          <FadeDiv delay={0.2} className="mt-12">
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
              <RiCalendarLine className="mx-auto h-10 w-10 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold text-gray-700">
                Agenda coming soon
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                The detailed schedule will be published once our Call for Speakers
                has closed and sessions have been selected. In the meantime -
                why not submit a talk?
              </p>
              <div className="mt-6">
                <a href="#speakers-call">
                  <Button variant="secondary" size="md">
                    Submit a Session
                  </Button>
                </a>
              </div>
            </div>
          </FadeDiv>
        </FadeContainer>
      </div>
    </section>
  )
}
