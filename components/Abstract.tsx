"use client"

import { useState } from "react"
import { RiArrowDownSLine } from "@remixicon/react"

/**
 * Collapsible talk abstract.
 *
 * Collapsed to three lines by default so eight talks don't turn the page into
 * a wall of text, expandable in place for anyone who wants the detail.
 *
 * In place rather than in a modal on purpose: the abstract is a few sentences,
 * and a dialog for that costs a focus trap, an escape handler, a scroll lock
 * and a worse time on mobile, while taking the reader away from the video and
 * title the text is about. Expanding keeps the context visible and the whole
 * thing is one piece of state.
 *
 * Abstracts in agenda.ts use blank lines as paragraph breaks, so the expanded
 * view renders them as real paragraphs instead of one run-on block.
 */
export function Abstract({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)

  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  if (paragraphs.length === 0) return null

  // Only offer the toggle when there is actually something hidden. The
  // character count is a rough stand-in for "longer than three lines".
  const isTruncated = paragraphs.length > 1 || paragraphs[0].length > 200

  return (
    <div className="mt-4">
      {expanded ? (
        <div className="space-y-3 text-sm leading-relaxed text-gray-600">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
          {paragraphs[0]}
        </p>
      )}

      {isTruncated && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="mt-2 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-syntax-blue transition-colors hover:text-syntax-cyan"
        >
          {expanded ? "Show less" : "Read the full abstract"}
          <RiArrowDownSLine
            aria-hidden
            className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  )
}
