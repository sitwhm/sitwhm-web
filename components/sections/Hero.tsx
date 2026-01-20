import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/ui/Button"
import { FadeContainer, FadeDiv, FadeSpan } from "@/components/Fade"
import { RiArrowRightLine, RiCalendarLine } from "@remixicon/react"

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-32">
      <FadeContainer className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center px-4 md:px-6">
        {/* Event Badge */}
        <FadeDiv>
          <a
            href="#about"
            className="inline-flex items-center gap-3 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-black/10 backdrop-blur-sm transition-all hover:bg-syntax-blue/5 hover:ring-syntax-blue/20"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
              <RiCalendarLine className="h-3.5 w-3.5" />
              {siteConfig.event.date}
            </span>
            <span className="flex items-center gap-1">
              Free Community Conference
              <RiArrowRightLine className="h-4 w-4" />
            </span>
          </a>
        </FadeDiv>

        {/* Main Heading */}
        <h1 className="mt-8 text-center text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl md:text-8xl">
          <FadeSpan delay={0.1}>SAP</FadeSpan>{" "}
          <FadeSpan delay={0.2}>Inside</FadeSpan>
          <br />
          <FadeSpan delay={0.3}>Track</FadeSpan>{" "}
          <span className="bg-gradient-to-r from-syntax-blue to-syntax-cyan bg-clip-text text-transparent">
            <FadeSpan delay={0.4}>Weinheim</FadeSpan>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-center text-lg text-gray-600 sm:text-xl">
          <FadeSpan delay={0.5}>
            Join SAP developers, architects, and consultants for a day of learning,
          </FadeSpan>{" "}
          <FadeSpan delay={0.6}>
            networking, and innovation at Syntax IdeaFactory.
          </FadeSpan>
        </p>

        {/* CTAs */}
        <FadeDiv delay={0.7} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a href="#registration">
            <Button size="lg">
              Register for Free
            </Button>
          </a>
          <a href="#agenda">
            <Button size="lg" variant="secondary">
              View Agenda
            </Button>
          </a>
        </FadeDiv>

        {/* Event Details */}
        <FadeDiv delay={0.8} className="mt-12 flex flex-col gap-6 text-center text-sm text-gray-600 sm:flex-row sm:gap-12">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">📅</span>
            <span>{siteConfig.event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">📍</span>
            <span>{siteConfig.event.venue}, {siteConfig.event.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">👥</span>
            <span>{siteConfig.event.capacity}+ Attendees</span>
          </div>
        </FadeDiv>
      </FadeContainer>

      {/* Background Decoration - Simple gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-syntax-blue/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-syntax-cyan/5 blur-3xl" />
      </div>
    </section>
  )
}
