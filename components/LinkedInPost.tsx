"use client"

import { useState } from "react"
import { featureFlags } from "@/app/featureFlags"
import { RiLinkedinBoxFill, RiArrowRightUpLine } from "@remixicon/react"

/**
 * A post shown through LinkedIn's own embed.
 *
 * The iframe renders the author's actual post, with their name and picture,
 * served by LinkedIn. That is the only honest way to show someone's writing
 * on our pages: we never copy their text onto our own server, and a long post
 * is truncated by LinkedIn itself with its own "see more" link.
 *
 * `featureFlags.linkedinEmbeds` decides whether it loads with the page or on
 * click. Loading directly is what a visitor expects, but it contacts LinkedIn
 * on every page view. See the flag for the trade-off.
 */
export function LinkedInPost({
  urn,
  url,
  author,
}: {
  urn: string
  url: string
  author: string
}) {
  const [revealed, setRevealed] = useState(
    featureFlags.linkedinEmbeds === "direct",
  )

  return (
    <div>
      {revealed ? (
        /*
          The fallback sits behind the iframe rather than beside it. An embed
          that fails to render leaves a transparent frame, so whatever is
          underneath shows through: without this, a blocked or deleted post
          would leave a 580px white hole on the page. When the embed does
          load, LinkedIn's own white background covers this completely.
        */
        <div className="relative h-[580px] w-full overflow-hidden rounded-lg border border-gray-200">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50 px-6 text-center">
            <RiLinkedinBoxFill className="h-6 w-6 text-gray-300" />
            <p className="text-sm text-gray-500">
              This post can&apos;t be shown here.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-syntax-blue hover:underline"
            >
              Read it on LinkedIn
            </a>
          </div>
          <iframe
            src={`https://www.linkedin.com/embed/feed/update/${urn}`}
            title={`LinkedIn post by ${author}`}
            className="relative h-full w-full"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          aria-expanded={false}
          className="flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm font-medium text-syntax-blue transition-colors hover:border-syntax-blue/40 hover:bg-syntax-blue/5"
        >
          <RiLinkedinBoxFill className="h-6 w-6" />
          Show this post
          <span className="text-sm font-normal text-gray-400">
            Loads from LinkedIn on click
          </span>
        </button>
      )}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-syntax-blue hover:underline"
      >
        View the full post on LinkedIn
        <RiArrowRightUpLine className="h-4 w-4" />
      </a>
    </div>
  )
}
