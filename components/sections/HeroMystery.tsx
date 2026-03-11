"use client"

import { useEffect, useState } from "react"
import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/ui/Button"
import { RiCalendarLine, RiMapPinLine, RiArrowRightLine } from "@remixicon/react"

export function HeroMystery() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Calculate countdown to September 19, 2026
  useEffect(() => {
    setMounted(true)

    const targetDate = new Date('2026-09-19T09:00:00+02:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(6, 50, 160, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(6, 50, 160, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-syntax-blue/20 blur-[120px]"
          style={{ animationDuration: '8s' }}
        />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-syntax-cyan/20 blur-[100px]"
          style={{ animationDuration: '6s', animationDelay: '1s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20 md:px-6">
        {/* Event Badge with Reveal Animation */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-syntax-blue/30 bg-syntax-blue/10 px-4 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-syntax-cyan" />
            <span className="text-sm font-medium tracking-wider text-syntax-cyan">
              SAVE THE DATE
            </span>
          </div>
        </div>

        {/* Main Title with Staggered Reveal */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            <span
              className={`block transition-all duration-1000 ${
                mounted ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              SAP Inside Track
            </span>
            <span
              className={`block bg-gradient-to-r from-syntax-blue via-syntax-cyan to-syntax-blue bg-clip-text text-transparent transition-all duration-1000 ${
                mounted ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'
              }`}
              style={{
                transitionDelay: '600ms',
                backgroundSize: '200% auto',
                animation: 'gradient 8s ease infinite'
              }}
            >
              Weinheim 2026
            </span>
          </h1>

          <p
            className={`mx-auto max-w-2xl text-lg text-gray-400 transition-all duration-1000 sm:text-xl ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            A gathering of innovators, architects, and visionaries.
            <br />
            <span className="text-syntax-cyan">Something extraordinary is coming.</span>
          </p>
        </div>

        {/* Countdown Timer */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="grid grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit, index) => (
              <div
                key={unit.label}
                className="group relative"
                style={{ transitionDelay: `${1200 + index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-syntax-blue/20 to-syntax-cyan/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative rounded-lg border border-white/10 bg-gray-800/50 p-4 backdrop-blur-sm transition-all duration-300 group-hover:border-syntax-blue/50 sm:p-6">
                  <div className="text-3xl font-bold tabular-nums text-white sm:text-5xl">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400 sm:text-sm">
                    {unit.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div
          className={`mb-12 flex flex-col items-center gap-6 transition-all duration-1000 sm:flex-row sm:gap-12 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '1600ms' }}
        >
          <div className="group flex items-center gap-3 transition-transform duration-300 hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-syntax-blue to-syntax-blue/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-syntax-blue/50">
              <RiCalendarLine className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium uppercase tracking-wider text-gray-500">Date</div>
              <div className="text-lg font-semibold text-white">{siteConfig.event.date}</div>
            </div>
          </div>

          <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-700 to-transparent sm:h-12 sm:w-px sm:bg-gradient-to-b" />

          <div className="group flex items-center gap-3 transition-transform duration-300 hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-syntax-cyan to-syntax-cyan/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-syntax-cyan/50">
              <RiMapPinLine className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium uppercase tracking-wider text-gray-500">Location</div>
              <div className="text-lg font-semibold text-white">{siteConfig.event.city}, {siteConfig.event.country}</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`flex flex-col items-center gap-4 transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '1800ms' }}
        >
          <a href="#notify">
            <Button
              size="lg"
              className="group relative cursor-pointer overflow-hidden bg-gradient-to-r from-syntax-blue to-syntax-cyan text-base font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-syntax-blue/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Notified
                <RiArrowRightLine className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-syntax-cyan to-syntax-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </a>

          <p className="text-sm text-gray-500">
            Limited capacity · Free event
          </p>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '2000ms' }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-6 rounded-full border-2 border-gray-700 p-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-syntax-cyan"
                style={{ animationDuration: '2s' }}
              />
            </div>
            <span className="text-xs uppercase tracking-wider text-gray-600">Scroll</span>
          </div>
        </div>
      </div>

      {/* Gradient Animation Keyframes */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}
