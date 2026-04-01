import { FadeContainer, FadeDiv } from "@/components/Fade"
import { Button } from "@/components/ui/Button"
import { RiMicLine } from "@remixicon/react"

const topics = [
  "S/4HANA", "BTP", "ABAP", "Fiori / UI5", "AI / Joule",
  "Integration", "DevOps", "Clean Core", "Analytics", "Career & Soft Skills",
]

export function CallForSpeakers() {
  return (
    <section id="speakers-call" className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Call for Speakers
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Share your experience with the community
              </p>
            </FadeDiv>
          </div>

          {/* Content */}
          <FadeDiv delay={0.2} className="mt-12">
            <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
              <div className="mb-4 inline-flex rounded-full bg-syntax-blue/10 p-3">
                <RiMicLine className="h-6 w-6 text-syntax-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                We want to hear from you!
              </h3>
              <p className="mt-2 leading-relaxed text-gray-600">
                Whether it's a deep-dive into ABAP, a BTP success story, a lesson
                learned from a failed migration, or something completely different -
                if it's SAP and you're passionate about it, we want to hear it.
              </p>

              {/* First-timer encouragement */}
              <div className="mt-6 rounded-lg bg-gray-50 p-4">
                <p className="text-sm leading-relaxed text-gray-700">
                  <span className="font-semibold">First-time speaker?</span> Don't
                  worry - you'll be among friends! We actively encourage new voices.
                  Sessions can be 15, 30, or 45 minutes. Pick whatever feels right.
                </p>
              </div>

              {/* Topics */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-gray-500">
                  Topics we'd love to see:
                </p>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <a
                  href="https://sessionize.com/testconference5847/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg">
                    Submit a Session
                  </Button>
                </a>
                <p className="mt-3 text-sm text-gray-400">
                  Submissions are handled via Sessionize
                </p>
              </div>
            </div>
          </FadeDiv>
        </FadeContainer>
      </div>
    </section>
  )
}
