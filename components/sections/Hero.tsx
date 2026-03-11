import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/ui/Button"
import { FadeContainer, FadeDiv, FadeSpan } from "@/components/Fade"
import { RiArrowRightLine, RiCalendarLine } from "@remixicon/react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pb-16 pt-28 sm:pb-20 sm:pt-32">
      <FadeContainer className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        {/* Event Badge */}
        <FadeDiv className="flex justify-center">
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

        {/* Main Heading - tighter line height, single line on larger screens */}
        <h1 className="mt-6 text-center text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
          <FadeSpan delay={0.1}>SAP Inside Track</FadeSpan>{" "}
          <span className="bg-gradient-to-r from-syntax-blue to-syntax-cyan bg-clip-text text-transparent">
            <FadeSpan delay={0.2}>Weinheim</FadeSpan>
          </span>
        </h1>

        {/* Subtitle - tighter margin */}
        <FadeDiv delay={0.3}>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-gray-600 sm:text-lg">
            Join SAP developers, architects, and consultants for a day of learning, networking, and innovation.
          </p>
        </FadeDiv>

        {/* Event Details - inline with subtle separators */}
        <FadeDiv delay={0.4} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <RiCalendarLine className="h-4 w-4 text-syntax-blue" />
            <span>{siteConfig.event.date}</span>
          </div>
          <span className="hidden text-gray-300 sm:inline">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-syntax-blue">@</span>
            <span>{siteConfig.event.venue}, {siteConfig.event.city}</span>
          </div>
        </FadeDiv>

        {/* CTAs - tighter spacing */}
        <FadeDiv delay={0.5} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
      </FadeContainer>

      {/* Background Decoration - positioned higher */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-syntax-blue/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-syntax-cyan/5 blur-3xl" />
      </div>
    </section>
  )
}
