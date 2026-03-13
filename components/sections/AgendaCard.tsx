"use client"

import { useState } from "react"
import Image from "next/image"
import { RiArrowDownSLine } from "@remixicon/react"
import { speakers } from "@/lib/content/speakers"
import { Session } from "@/lib/types"

const speakerMap = Object.fromEntries(speakers.map((s) => [s.id, s]))

function SpeakerChip({ speakerId }: { speakerId: string | string[] }) {
  const ids = Array.isArray(speakerId) ? speakerId : [speakerId]
  const resolved = ids.map((id) => speakerMap[id]).filter(Boolean)
  if (!resolved.length) return null

  if (resolved.length === 1) {
    const sp = resolved[0]
    return (
      <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-100">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md">
          <Image src={sp.photo} alt={sp.name} width={56} height={56} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-base font-semibold text-gray-900">{sp.name}</p>
          <p className="text-sm text-gray-500 mt-0.5">{sp.title}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-100">
      <div className="flex -space-x-3.5">
        {resolved.map((sp, i) => (
          <div
            key={sp.id}
            className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md"
            style={{ zIndex: resolved.length - i }}
          >
            <Image src={sp.photo} alt={sp.name} width={56} height={56} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <div>
        <p className="text-base font-semibold text-gray-900">
          {resolved.map((s) => s.name.split(" ")[0]).join(", ")}
        </p>
        <p className="text-sm text-gray-500 mt-0.5">Panel speakers</p>
      </div>
    </div>
  )
}

export function AgendaCard({ session }: { session: Session }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="group flex-1 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-lg cursor-pointer"
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Title */}
      <h3 className="text-xl font-bold leading-snug text-gray-900 group-hover:text-syntax-blue transition-colors duration-200 pr-8">
        {session.title}
      </h3>

      {/* Abstract */}
      <div className="mt-3 relative">
        <p
          className={[
            "text-base leading-relaxed text-gray-500 transition-all duration-300",
            expanded ? "" : "line-clamp-3",
          ].join(" ")}
        >
          {session.description}
        </p>

        {/* Fade gradient — only when collapsed */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {/* Read more / less button */}
      <button
        className="mt-3 flex items-center gap-1 text-sm font-medium text-syntax-blue hover:text-syntax-blue/70 transition-colors"
        onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v) }}
      >
        {expanded ? "Show less" : "Read more"}
        <RiArrowDownSLine
          className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Speaker */}
      {session.speakerId && (
        <SpeakerChip speakerId={session.speakerId} />
      )}
    </div>
  )
}
