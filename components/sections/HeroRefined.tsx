"use client"

import { useEffect, useState } from "react"
import { siteConfig } from "@/app/siteConfig"
import { RiCalendarLine, RiMapPinLine } from "@remixicon/react"

export function HeroRefined() {
  const [mounted, setMounted] = useState(false)

  // Calculate days until September 19, 2026 (static calculation)
  const targetDate = new Date('2026-09-19T09:00:00+02:00')
  const now = new Date()
  const daysLeft = Math.ceil((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-black">
      {/* Subtle grid - very minimal */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 md:px-6">
        {/* Save the Date - inline with year */}
        <div
          className={`mb-12 transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
            Save the Date - September 19, 2026
          </p>
        </div>

        {/* Main Title - bold, minimal, no gradients */}
        <div className="mb-16 text-center">
          <h1
            className={`text-5xl font-bold leading-[1.1] tracking-tight text-white transition-all duration-700 sm:text-6xl ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            SAP Inside Track Weinheim
          </h1>

          <p
            className={`mt-8 text-2xl font-medium text-white/60 transition-all duration-700 sm:text-3xl ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            #sitWHM
          </p>
        </div>

        {/* Days until event */}
        <div
          className={`mb-16 transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl font-light tabular-nums text-white sm:text-7xl">
              {daysLeft}
            </div>
            <div className="mt-2 text-xs font-medium uppercase tracking-wider text-white/40">
              Days to Go
            </div>
          </div>
        </div>

        {/* Event Details - simple text */}
        <div
          className={`mb-16 flex flex-col items-center gap-4 text-white/60 transition-all duration-700 sm:flex-row sm:gap-6 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="flex items-center gap-2 text-sm">
            <RiCalendarLine className="h-4 w-4" />
            <span>September 19, 2026</span>
          </div>
          <span className="hidden text-white/20 sm:inline">·</span>
          <div className="flex items-center gap-2 text-sm">
            <RiMapPinLine className="h-4 w-4" />
            <a
              href="https://www.google.com/maps/search/Weinheim+an+der+Bergstra%C3%9Fe"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white/20 transition-colors hover:border-white/60"
            >
              {siteConfig.event.city}
            </a>
          </div>
        </div>

        {/* CTA - minimal underline style */}
        <div
          className={`transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <a
            href="#notify"
            className="group inline-block border-b-2 border-white pb-1 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-white/40 hover:text-white/60"
          >
            Get Notified
          </a>
        </div>
      </div>
    </section>
  )
}
