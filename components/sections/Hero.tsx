"use client"

import { siteConfig } from "@/app/siteConfig"
import { featureFlags } from "@/app/featureFlags"
import { Button } from "@/components/ui/Button"
import { FadeContainer, FadeDiv, FadeSpan } from "@/components/Fade"
import { titoPopupHref } from "@/components/TitoPopup"
import { RiArrowRightLine, RiCalendarLine, RiMapPinLine, RiTimeLine } from "@remixicon/react"
import { useEffect, useState } from "react"

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate).getTime()
    const update = () => {
      const now = Date.now()
      const diff = Math.max(0, target - now)
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur-sm sm:h-20 sm:w-20">
        <span className="text-2xl font-bold tabular-nums text-syntax-blue sm:text-2xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs font-medium uppercase tracking-wider text-gray-400">
        {label}
      </span>
    </div>
  )
}

export function Hero() {
  const countdown = useCountdown("2026-09-19T09:00:00+02:00")

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 pb-16 pt-28 sm:pb-20 sm:pt-32">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-syntax-blue/[0.07] blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-syntax-cyan/[0.06] blur-3xl" />
      </div>

      <FadeContainer className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 md:px-6">
        {/* Event Badge */}
        <FadeDiv className="flex justify-center">
          <a
            href="#about"
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-black/10 backdrop-blur-sm transition-all hover:bg-syntax-blue/5 hover:ring-syntax-blue/20 hover:shadow-md"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-syntax-blue/10 px-3 py-1 text-xs font-semibold text-syntax-blue">
              <RiCalendarLine className="h-3.5 w-3.5" />
              {siteConfig.event.date}
            </span>
            <span className="flex items-center gap-1 text-gray-600 transition-colors group-hover:text-syntax-blue">
              Free Community Conference
              <RiArrowRightLine className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </FadeDiv>

        {/* Main Heading */}
        <h1 className="mt-8 text-center text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl md:text-7xl lg:text-7xl">
          <FadeSpan delay={0.1}>SAP Inside Track</FadeSpan>
          <br />
          <span className="bg-gradient-to-r from-syntax-blue via-syntax-cyan to-syntax-blue bg-[length:200%_auto] bg-clip-text text-transparent">
            <FadeSpan delay={0.2}>Weinheim 2026</FadeSpan>
          </span>
        </h1>

        {/* Subtitle */}
        <FadeDiv delay={0.3}>
          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-gray-600 sm:text-lg">
            Join SAP developers, architects, and consultants for a day of learning, networking, and innovation.
          </p>
        </FadeDiv>

        {/* Event Details - inline */}
        <FadeDiv delay={0.35} className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <RiCalendarLine className="h-4 w-4 text-syntax-blue/60" />
            <span>{siteConfig.event.date}</span>
          </div>
          <span className="hidden text-gray-300 sm:inline">|</span>
          <div className="flex items-center gap-1.5">
            <RiTimeLine className="h-4 w-4 text-syntax-blue/60" />
            <span>{siteConfig.event.time}</span>
          </div>
          <span className="hidden text-gray-300 sm:inline">|</span>
          <div className="flex items-center gap-1.5">
            <RiMapPinLine className="h-4 w-4 text-syntax-blue/60" />
            <span>{siteConfig.event.venue}, {siteConfig.event.city}</span>
          </div>
        </FadeDiv>

        {/* Countdown Timer */}
        <FadeDiv delay={0.4} className="mt-10">
          <div className="flex items-center gap-3 sm:gap-5">
            <CountdownUnit value={countdown.days} label="Days" />
            <span className="mt-[-1.25rem] text-xl font-medium text-gray-300 sm:mt-[-1.5rem]">:</span>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <span className="mt-[-1.25rem] text-xl font-medium text-gray-300 sm:mt-[-1.5rem]">:</span>
            <CountdownUnit value={countdown.minutes} label="Mins" />
            <span className="mt-[-1.25rem] text-xl font-medium text-gray-300 sm:mt-[-1.5rem]">:</span>
            <CountdownUnit value={countdown.seconds} label="Secs" />
          </div>
        </FadeDiv>

        {/* CTAs */}
        <FadeDiv delay={0.5} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {/* Option B opens Tito overlay directly; Option A scrolls to the inline widget */}
          <a href={featureFlags.titoMode === 'b' ? siteConfig.registration.url : "#registration"} {...(featureFlags.titoMode === 'b' ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            <Button size="lg" className="cursor-pointer shadow-lg shadow-syntax-blue/20 transition-all hover:shadow-xl hover:shadow-syntax-blue/30">
              Save Your Free Spot
            </Button>
          </a>
          <a href="#agenda">
            <Button size="lg" variant="secondary" className="cursor-pointer">
              View Agenda
            </Button>
          </a>
        </FadeDiv>
      </FadeContainer>
    </section>
  )
}
