import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/ui/Button"
import { FadeContainer, FadeDiv, FadeSpan } from "@/components/Fade"
import { RiArrowRightLine, RiCalendarLine } from "@remixicon/react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-28 sm:pb-20 sm:pt-32">
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      <FadeContainer className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        {/* Event Badge */}
        <FadeDiv className="flex justify-center">
          <a
            href="#about"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 px-3 py-1.5 text-sm font-medium text-white/80 transition-all hover:border-white/20"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
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
        <h1 className="mt-6 text-center text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
          <FadeSpan delay={0.1}>SAP Inside Track</FadeSpan>{" "}
          <span className="text-white/60">
            <FadeSpan delay={0.2}>Weinheim</FadeSpan>
          </span>
        </h1>

        {/* Subtitle */}
        <FadeDiv delay={0.3}>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-white/50 sm:text-lg">
            Join SAP developers, architects, and consultants for a day of learning, networking, and innovation.
          </p>
        </FadeDiv>

        {/* Event Details */}
        <FadeDiv delay={0.4} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
          <div className="flex items-center gap-1.5">
            <RiCalendarLine className="h-4 w-4 text-white/40" />
            <span>{siteConfig.event.date}</span>
          </div>
          <span className="hidden text-white/20 sm:inline">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-white/40">@</span>
            <span>{siteConfig.event.venue}, {siteConfig.event.city}</span>
          </div>
        </FadeDiv>

        {/* CTAs */}
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
    </section>
  )
}
