/**
 * CONCEPT 2: "Three Steps"
 *
 * Ultra-clean, bright section. The main hook is a 3-step visual
 * flow: "Pick a topic → Submit your idea → Take the stage"
 * connected by a subtle dashed line. Big heading, minimal copy,
 * scannable in 3 seconds.
 * Feeling: effortless, approachable, no-nonsense.
 */
"use client"

import { FadeContainer, FadeDiv } from "@/components/Fade"
import { Button } from "@/components/ui/Button"
import { RiLightbulbLine, RiSendPlaneLine, RiPresentationLine } from "@remixicon/react"

const steps = [
  {
    icon: RiLightbulbLine,
    number: "1",
    title: "Pick a topic",
    desc: "SAP, tech, career — anything you're passionate about",
  },
  {
    icon: RiSendPlaneLine,
    number: "2",
    title: "Submit your idea",
    desc: "A short abstract is all we need to get started",
  },
  {
    icon: RiPresentationLine,
    number: "3",
    title: "Take the stage",
    desc: "15, 30, or 45 minutes — you choose the format",
  },
]

export function CallForSpeakersV2() {
  return (
    <section id="speakers-call" className="bg-white py-28">
      <FadeContainer className="mx-auto max-w-5xl px-4 md:px-6">
        {/* Header */}
        <div className="text-center">
          <FadeDiv>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              We Want to Hear From You!
            </h2>
          </FadeDiv>
          <FadeDiv delay={0.1}>
            <p className="mx-auto mt-4 max-w-md text-lg text-gray-500">
              Got a story worth sharing? The stage is yours.
              First-time speakers especially welcome.
            </p>
          </FadeDiv>
        </div>

        {/* Steps */}
        <FadeDiv delay={0.2}>
          <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
            {/* Connecting line (desktop) */}
            <div className="pointer-events-none absolute top-10 right-[16.7%] left-[16.7%] hidden h-px md:block">
              <div className="h-full w-full border-t-2 border-dashed border-syntax-blue/15" />
            </div>

            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-syntax-blue/[0.06] ring-1 ring-syntax-blue/10">
                  <step.icon className="h-8 w-8 text-syntax-blue" />
                </div>
                {/* Number */}
                <span className="mt-1 text-[11px] font-bold uppercase tracking-widest text-syntax-blue/40">
                  Step {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-[240px] text-sm leading-relaxed text-gray-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeDiv>

        {/* CTA */}
        <FadeDiv delay={0.3} className="mt-14 text-center">
          <a
            href="https://sessionize.com/sitwhm2026/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg">
              Submit a Session
            </Button>
          </a>
          <p className="mt-3 text-sm text-gray-400">
            Submissions via Sessionize
          </p>
        </FadeDiv>
      </FadeContainer>
    </section>
  )
}
