"use client"

import { useState } from "react"
import Image from "next/image"
import { RiPlayFill } from "@remixicon/react"

/**
 * Click-to-load YouTube embed with a real thumbnail.
 *
 * The thumbnail is served from our own domain (public/thumbnails/<year>/),
 * downloaded once by `npm run thumbnails`. Pointing the <img> straight at
 * i.ytimg.com would show the same picture but fire a request to Google on
 * every page load, before the visitor has done anything, which is exactly what
 * click-to-load is meant to avoid. This way the page makes no third-party
 * request at all until someone presses play, and then it loads
 * youtube-nocookie.com, YouTube's own reduced-tracking domain.
 *
 * The literal id "PLACEHOLDER" renders a labelled grey box instead. That is
 * how demo content signals "no real video here yet".
 */
export function VideoEmbed({
  youtubeId,
  title,
  thumbnail,
}: {
  youtubeId: string
  title: string
  /** Path under /thumbnails/<year>/. Falls back to a plain tile if missing. */
  thumbnail?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const [thumbnailFailed, setThumbnailFailed] = useState(false)

  if (youtubeId === "PLACEHOLDER") {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-50">
        <div className="px-6 text-center">
          <p className="text-sm text-gray-500">Video placeholder</p>
          <p className="mt-1 text-sm text-gray-400">
            Set a real youtubeId in lib/content/2026/talks.ts
          </p>
        </div>
      </div>
    )
  }

  if (loaded) {
    return (
      <iframe
        className="aspect-video w-full rounded-lg"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  const showThumbnail = thumbnail && !thumbnailFailed

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Play video: ${title}`}
      className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-syntax-dark focus:outline-none focus:ring-2 focus:ring-syntax-blue/40 focus:ring-offset-2"
    >
      {showThumbnail && (
        <>
          <Image
            src={thumbnail}
            alt=""
            width={1280}
            height={720}
            // The thumbnail is decoration: the button's aria-label already
            // names the talk, so announcing it again would be noise.
            aria-hidden
            onError={() => setThumbnailFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {/* Keeps the play button readable over a bright frame. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/30"
          />
        </>
      )}

      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/20 transition-transform group-hover:scale-110">
        <RiPlayFill className="ml-0.5 h-8 w-8 text-white" />
      </span>
    </button>
  )
}
