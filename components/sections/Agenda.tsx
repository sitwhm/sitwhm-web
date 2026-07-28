"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  RiArrowRightSLine,
  RiCameraLensLine,
  RiCloseLine,
  RiCupLine,
  RiMegaphoneLine,
} from "@remixicon/react"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { sessions } from "@/lib/content/agenda"
import { speakers } from "@/lib/content/speakers"
import type { Person, Session } from "@/lib/types"

const speakerMap = Object.fromEntries(speakers.map((s) => [s.id, s]))

function resolveSpeakers(speakerId?: string | string[]): Person[] {
  if (!speakerId) return []
  const ids = Array.isArray(speakerId) ? speakerId : [speakerId]
  return ids.map((id) => speakerMap[id]).filter(Boolean)
}

function startTime(session: Session): string {
  return session.time.split(" - ")[0]
}

function timeRange(session: Session): string {
  return session.time.replace(" - ", " – ")
}

/** Icons for hosted slots (welcome, closing) that have no dedicated speaker. */
const SESSION_ICONS: Record<string, typeof RiMegaphoneLine> = {
  welcome: RiMegaphoneLine,
  closing: RiCameraLensLine,
}

function SessionIconBadge({ session }: { session: Session }) {
  const Icon = SESSION_ICONS[session.id] ?? RiMegaphoneLine
  return (
    <div
      aria-hidden="true"
      className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-syntax-blue/10 to-syntax-cyan/10 ring-2 ring-gray-100 transition-all group-hover:ring-syntax-blue/40 sm:h-20 sm:w-20"
    >
      <Icon className="h-7 w-7 text-syntax-blue/70 transition-colors group-hover:text-syntax-blue sm:h-8 sm:w-8" />
    </div>
  )
}

/** The speaker photo is the hero of the row — large, circular, front and center. */
function SessionPhoto({ session }: { session: Session }) {
  const resolved = resolveSpeakers(session.speakerId)

  if (!resolved.length) {
    return <SessionIconBadge session={session} />
  }

  if (resolved.length === 1) {
    const sp = resolved[0]
    return (
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100 transition-all group-hover:ring-syntax-blue/40 sm:h-20 sm:w-20">
        <Image
          src={sp.photo}
          alt={sp.name}
          width={80}
          height={80}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-shrink-0 -space-x-5">
      {resolved.slice(0, 2).map((sp, i) => (
        <div
          key={sp.id}
          className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-white sm:h-20 sm:w-20"
          style={{ zIndex: resolved.length - i }}
        >
          <Image
            src={sp.photo}
            alt={sp.name}
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

function SessionByline({ session }: { session: Session }) {
  const resolved = resolveSpeakers(session.speakerId)

  if (!resolved.length) {
    return <p className="mt-1.5 text-sm font-medium text-gray-500">{session.speaker}</p>
  }

  // Show the company once if every speaker shares it, otherwise only for a single speaker.
  const sharedCompany =
    resolved.length === 1
      ? resolved[0].company
      : resolved.every((sp) => sp.company === resolved[0].company)
        ? resolved[0].company
        : undefined

  return (
    <p className="mt-1.5 truncate text-sm font-medium text-gray-600 sm:text-base">
      <span className="font-semibold text-gray-800">
        {resolved.map((sp) => sp.name).join(", ")}
      </span>
      {sharedCompany && <span className="text-gray-400"> · {sharedCompany}</span>}
    </p>
  )
}

function BreakRow({ session }: { session: Session }) {
  return (
    <div className="grid grid-cols-[3.5rem_1fr] gap-4 sm:grid-cols-[6.5rem_1fr] sm:gap-10">
      <p className="pt-0.5 text-right text-sm font-medium tabular-nums text-gray-400">
        {startTime(session)}
      </p>
      <div className="flex items-center gap-3 text-gray-500">
        <RiCupLine className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span className="whitespace-nowrap text-sm font-medium">
          {session.title}
        </span>
        <span className="h-px flex-1 border-t border-dashed border-gray-300" />
      </div>
    </div>
  )
}

function SessionRow({
  session,
  onSelect,
}: {
  session: Session
  onSelect: (session: Session) => void
}) {
  return (
    <div className="relative grid grid-cols-[3.5rem_1fr] gap-4 sm:grid-cols-[6.5rem_1fr] sm:gap-10">
      {/* Timeline dot, centered on the vertical rail */}
      <span
        aria-hidden="true"
        className="absolute left-16 top-[2.5rem] hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-syntax-blue bg-white sm:left-[7.5rem] sm:block"
      />
      <p className="pt-8 text-right text-sm font-semibold tabular-nums text-gray-900">
        {startTime(session)}
      </p>
      <button
        type="button"
        onClick={() => onSelect(session)}
        aria-haspopup="dialog"
        className="group w-full rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm ring-1 ring-gray-900/[0.04] transition-all hover:-translate-y-0.5 hover:border-syntax-blue/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-syntax-blue/50 sm:p-7"
      >
        <div className="flex items-center gap-5 sm:gap-6">
          <SessionPhoto session={session} />
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-syntax-blue sm:text-xl">
              {session.title}
            </h3>
            <SessionByline session={session} />
          </div>
        </div>
        <span className="mt-5 inline-flex items-center gap-0.5 text-sm font-bold text-syntax-blue">
          Session details
          <RiArrowRightSLine className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </button>
    </div>
  )
}

function SessionDialog({
  session,
  onClose,
}: {
  session: Session
  onClose: () => void
}) {
  const resolved = resolveSpeakers(session.speakerId)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${session.title} details`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
      >
        <div className="h-1.5 rounded-t-2xl bg-gradient-to-r from-syntax-blue to-syntax-cyan" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-5 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-syntax-blue"
        >
          <RiCloseLine className="h-6 w-6" />
        </button>

        <div className="p-8 sm:p-10">
          <span className="inline-flex items-center rounded-full bg-syntax-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-syntax-blue">
            {timeRange(session)}
          </span>
          <h3 className="mt-4 pr-8 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
            {session.title}
          </h3>

          {resolved.length ? (
            <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">
              {resolved.map((sp) => (
                <div key={sp.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-syntax-blue/10">
                    <Image
                      src={sp.photo}
                      alt={sp.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-gray-900">{sp.name}</p>
                    <p className="truncate text-sm text-gray-600">
                      {sp.title}
                      {sp.company ? ` · ${sp.company}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 border-t border-gray-100 pt-6 text-sm font-semibold text-gray-600">
              {session.speaker}
            </p>
          )}

          <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-gray-700">
            {session.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Agenda() {
  const [active, setActive] = useState<Session | null>(null)

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
    <section id="agenda" className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Conference Agenda
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Saturday, September 19, 2026 - A full day of sessions and networking
              </p>
            </FadeDiv>
          </div>

          {/* Timeline */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            {/* Vertical rail connecting the session dots */}
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-16 top-8 hidden w-px -translate-x-1/2 bg-gray-200 sm:left-[7.5rem] sm:block"
            />
            <div className="space-y-6">
              {sessions.map((session, index) => (
                <FadeDiv key={session.id} delay={0.1 + 0.04 * index}>
                  {session.isBreak ? (
                    <BreakRow session={session} />
                  ) : (
                    <SessionRow session={session} onSelect={setActive} />
                  )}
                </FadeDiv>
              ))}
            </div>
          </div>
        </FadeContainer>
      </div>

      {active && (
        <SessionDialog session={active} onClose={() => setActive(null)} />
      )}
    </section>
  )
}
