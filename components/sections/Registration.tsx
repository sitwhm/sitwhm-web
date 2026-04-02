import { siteConfig } from "@/app/siteConfig"
import { featureFlags } from "@/app/featureFlags"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { TitoWidgetInline } from "@/components/TitoWidgetInline"
import { RiCheckLine, RiGroupLine } from "@remixicon/react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const includedItems = [
  "Full day access to all sessions",
  "Catering throughout the day",
  "Networking opportunities",
  "Access to speaker Q&A",
]

const testMode = process.env.NEXT_PUBLIC_TITO_TEST_MODE === "true"

const buttonClasses = cn(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200",
  "focus:outline-none focus:ring-2 focus:ring-syntax-blue/40 focus:ring-offset-2",
  "bg-syntax-blue text-white hover:bg-[#052885] shadow-md hover:shadow-lg active:scale-[0.98]",
  "w-full px-8 py-3.5 text-sm sm:text-lg",
)

export function Registration() {
  return (
    <section id="registration" className="relative overflow-hidden bg-syntax-blue py-24">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-syntax-cyan/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <FadeContainer className="relative z-10 mx-auto max-w-5xl px-4 md:px-6">
        <FadeDiv>
          <div className="overflow-hidden rounded-2xl bg-white/10 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left - Big heading */}
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
                    Registration
                  </p>
                  <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                    Join Us
                    <br />
                    <span className="text-syntax-cyan">for Free</span>
                  </h2>
                  <p className="mt-4 text-sm text-white/60">
                    Limited to {siteConfig.event.capacity} attendees - register early!
                  </p>
                </div>
              </div>

              {/* Right - White card with content */}
              <div className="flex flex-col justify-center rounded-2xl bg-white px-8 py-12 md:px-12 md:py-16">
                {/* FREE badge */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-syntax-blue">FREE</div>
                  <p className="mt-1 text-sm text-gray-400">Community-supported event</p>
                </div>

                {/* Spots indicator */}
                <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-amber-50 px-4 py-3 ring-1 ring-amber-200/60">
                  <RiGroupLine className="h-5 w-5 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">
                    Limited to {siteConfig.event.capacity} spots - secure yours now
                  </span>
                </div>

                {/* What's Included */}
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    What&apos;s Included:
                  </h3>
                  <ul className="space-y-2.5">
                    {includedItems.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-syntax-green/10">
                          <RiCheckLine className="h-3.5 w-3.5 text-syntax-green" />
                        </div>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tito Integration - switch between Option A and Option B */}
                <div className="mt-6">
                  {featureFlags.titoMode === "a" ? (
                    <TitoWidgetInline
                      eventId={siteConfig.registration.titoEventId}
                      testMode={testMode}
                      discountCode={siteConfig.registration.discountCode}
                      releases={siteConfig.registration.releases}
                    />
                  ) : (
                    <a
                      href={siteConfig.registration.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClasses}
                    >
                      Save Your Free Spot
                    </a>
                  )}
                </div>

                {/* Note */}
                <p className="mt-4 text-center text-xs text-gray-400">
                  By registering, you agree to our{" "}
                  <Link href="/code-of-conduct" className="text-syntax-blue hover:underline">
                    Code of Conduct
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </FadeDiv>
      </FadeContainer>
    </section>
  )
}
