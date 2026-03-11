import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/ui/Button"
import { FadeContainer, FadeDiv, FadeSpan } from "@/components/Fade"
import { RiCalendarLine, RiMapPinLine, RiNotificationLine } from "@remixicon/react"

export function HeroTeaser() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <FadeContainer className="relative z-10 mx-auto max-w-4xl px-4 py-20 md:px-6">
        {/* Save the Date Badge */}
        <FadeDiv className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-syntax-blue/10 px-4 py-2 text-sm font-medium text-syntax-blue ring-1 ring-syntax-blue/20">
            <RiNotificationLine className="h-4 w-4" />
            Save the Date
          </div>
        </FadeDiv>

        {/* Main Heading */}
        <h1 className="mt-8 text-center text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl">
          <FadeSpan delay={0.1}>SAP Inside Track</FadeSpan>
          <br />
          <span className="bg-gradient-to-r from-syntax-blue to-syntax-cyan bg-clip-text text-transparent">
            <FadeSpan delay={0.2}>Weinheim 2026</FadeSpan>
          </span>
        </h1>

        {/* Event Details - Clean & Minimal */}
        <FadeDiv delay={0.3} className="mt-12 space-y-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-syntax-blue/10">
                <RiCalendarLine className="h-6 w-6 text-syntax-blue" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-500">Date</div>
                <div className="text-lg font-semibold text-gray-900">{siteConfig.event.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-syntax-cyan/10">
                <RiMapPinLine className="h-6 w-6 text-syntax-cyan" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-500">Location</div>
                <div className="text-lg font-semibold text-gray-900">{siteConfig.event.city}, {siteConfig.event.country}</div>
              </div>
            </div>
          </div>
        </FadeDiv>

        {/* Subtitle */}
        <FadeDiv delay={0.4}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-gray-600 sm:text-xl">
            A free community conference for SAP developers, architects, and consultants.
            <br />
            <span className="mt-2 inline-block text-base text-gray-500">More details coming soon.</span>
          </p>
        </FadeDiv>

        {/* CTA */}
        <FadeDiv delay={0.5} className="mt-10 flex justify-center">
          <a href="#notify">
            <Button size="lg" className="cursor-pointer text-base">
              Get Notified
            </Button>
          </a>
        </FadeDiv>

        {/* Community Info */}
        <FadeDiv delay={0.6} className="mt-16 text-center">
          <p className="text-sm text-gray-400">
            Organized by the SAP Community
          </p>
        </FadeDiv>
      </FadeContainer>

      {/* Background Decoration - Subtle & Elevated */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-syntax-blue/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-syntax-cyan/5 blur-3xl" />
      </div>
    </section>
  )
}
