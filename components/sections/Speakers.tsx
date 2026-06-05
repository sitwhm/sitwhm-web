"use client"

import { speakers } from "@/lib/content/speakers"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiLinkedinBoxFill, RiCloseLine, RiZoomInLine } from "@remixicon/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import type { Person } from "@/lib/types"

export function Speakers() {
  const [active, setActive] = useState<Person | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [active])

  return (
    <section id="speakers" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Section Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Speakers
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Learn from SAP experts and community leaders
              </p>
            </FadeDiv>
          </div>

          {/* Speakers Grid */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            {speakers.map((speaker, index) => {
              const hasPhoto = !speaker.photo.includes("placeholder")
              const cardContent = (
                <>
                  <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-gray-100 transition-all group-hover:ring-syntax-blue/40">
                    <Image
                      src={speaker.photo}
                      alt={`${speaker.name} - ${speaker.title} - Speaker at SAP Inside Track Weinheim 2026`}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {hasPhoto && (
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <RiZoomInLine className="h-6 w-6 text-white" />
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                    {speaker.name}
                  </h3>
                  <p className="text-sm leading-snug text-gray-700">{speaker.title}</p>
                  {speaker.company && (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {speaker.company}
                    </p>
                  )}
                  <div className="mb-3" />
                  {speaker.bio && (
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">
                      {speaker.bio}
                    </p>
                  )}
                  {speaker.linkedin && (
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center text-gray-400 transition-colors hover:text-syntax-blue"
                      aria-label={`${speaker.name} on LinkedIn`}
                    >
                      <RiLinkedinBoxFill className="h-5 w-5" />
                    </a>
                  )}
                </>
              )
              return (
                <FadeDiv key={speaker.id} delay={0.05 * (index + 2)} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
                  {hasPhoto ? (
                    <button
                      type="button"
                      onClick={() => setActive(speaker)}
                      aria-label={`View details for ${speaker.name}`}
                      className="group h-full w-full cursor-zoom-in rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-syntax-blue/20 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-syntax-blue/50"
                    >
                      {cardContent}
                    </button>
                  ) : (
                    <div className="group h-full rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                      {cardContent}
                    </div>
                  )}
                </FadeDiv>
              )
            })}
          </div>
        </FadeContainer>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} details`}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-8 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-syntax-blue"
            >
              <RiCloseLine className="h-6 w-6" />
            </button>
            <div className="mx-auto mb-6 h-64 w-64 overflow-hidden rounded-full ring-4 ring-syntax-blue/10">
              <Image
                src={active.photo}
                alt={`${active.name} - ${active.title}`}
                width={512}
                height={512}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              {active.name}
            </h3>
            <p className="mt-2 text-sm text-gray-700">{active.title}</p>
            {active.company && (
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-syntax-blue">
                {active.company}
              </p>
            )}
            {active.bio && (
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {active.bio}
              </p>
            )}
            {active.linkedin && (
              <a
                href={active.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-syntax-blue"
                aria-label={`${active.name} on LinkedIn`}
              >
                <RiLinkedinBoxFill className="h-5 w-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
