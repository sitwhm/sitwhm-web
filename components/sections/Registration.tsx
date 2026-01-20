import { siteConfig } from "@/app/siteConfig"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { TitoWidget } from "@/components/TitoWidget"
import { RiCheckLine } from "@remixicon/react"

const includedItems = [
  "Full day access to all sessions",
  "Lunch and refreshments",
  "Networking opportunities",
  "Conference swag bag",
  "Access to speaker Q&A",
]

export function Registration() {
  return (
    <section id="registration" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Section Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Join Us for Free
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Limited to {siteConfig.event.capacity} attendees - register early!
              </p>
            </FadeDiv>
          </div>

          {/* Registration Card */}
          <FadeDiv delay={0.2} className="mx-auto mt-12 max-w-2xl">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm md:p-12">
              <div className="mb-8 text-center">
                <div className="text-5xl font-bold text-syntax-blue">FREE</div>
                <p className="mt-2 text-gray-600">Community-supported event</p>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  What&apos;s Included:
                </h3>
                <ul className="space-y-3">
                  {includedItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <RiCheckLine className="h-5 w-5 shrink-0 text-syntax-green" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tito.io Widget */}
              <TitoWidget eventId="sitwhm/2026" />

              {/* Note */}
              <p className="mt-6 text-center text-sm text-gray-500">
                By registering, you agree to our{" "}
                <a href="#" className="text-syntax-blue hover:underline">
                  Code of Conduct
                </a>
              </p>
            </div>
          </FadeDiv>
        </FadeContainer>
      </div>
    </section>
  )
}
