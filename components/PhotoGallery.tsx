"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import type { Photo } from "@/lib/types"
import {
  RiImageLine,
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react"

/**
 * Photo grid with a lightbox.
 *
 * No carousel library: a gallery of eight stills is not worth a dependency,
 * and an auto-advancing carousel would move the picture out from under anyone
 * still looking at it. Instead a mosaic grid, where the opening frame runs
 * double width so the block has a focal point, and a full-screen viewer on
 * click with keyboard navigation.
 *
 * The grid loads thumbnails only. The 2000px file is fetched when the
 * lightbox opens, so the section costs a few hundred KB up front rather than
 * the whole set.
 */
export function PhotoGallery({
  photos,
  year,
}: {
  photos: Photo[]
  year: number
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const isOpen = openIndex !== null
  const current = isOpen ? photos[openIndex] : null

  const close = useCallback(() => setOpenIndex(null), [])

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) =>
        i === null ? i : (i + delta + photos.length) % photos.length,
      ),
    [photos.length],
  )

  // Keyboard: escape closes, arrows move. Registered only while open so the
  // page keeps its normal key handling the rest of the time.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight") step(1)
      else if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, close, step])

  // Stop the page behind the overlay from scrolling, and put focus somewhere
  // sensible so keyboard users aren't stranded at the top of the document.
  useEffect(() => {
    if (!isOpen) return
    lastFocused.current = document.activeElement as HTMLElement | null
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
      lastFocused.current?.focus()
    }
  }, [isOpen])

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {photos.map((photo, i) => {
          // The opening frame earns the big tile; the rest are equal.
          const featured = i === 0
          const tile = featured
            ? "col-span-2 row-span-2 aspect-square"
            : "aspect-[4/3]"

          if (!photo.src) {
            return (
              <div
                key={photo.id}
                className={`flex ${tile} w-full flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50 px-3 text-center`}
              >
                <RiImageLine className="h-6 w-6 text-gray-300" />
                <p className="mt-2 text-sm leading-tight text-gray-400">
                  {photo.alt}
                </p>
              </div>
            )
          }

          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open photo: ${photo.alt}`}
              className={`group relative ${tile} w-full cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-gray-100 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-syntax-blue/40 focus:ring-offset-2`}
            >
              <Image
                src={`/photos/${year}/thumbs/${photo.src}`}
                alt={photo.alt}
                width={900}
                height={675}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          )
        })}
      </div>

      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex flex-col bg-black/95"
          onClick={close}
        >
          <div className="flex shrink-0 items-center justify-between px-4 py-4 md:px-6">
            <span className="text-sm text-white/50">
              {openIndex + 1} / {photos.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="cursor-pointer rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <RiCloseLine className="h-6 w-6" />
            </button>
          </div>

          {/* Clicking the backdrop closes; clicking the photo itself must not. */}
          <div
            className="flex min-h-0 flex-1 items-center justify-center px-4 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={current.id}
              src={`/photos/${year}/${current.src}`}
              alt={current.alt}
              width={2000}
              height={1500}
              priority
              className="max-h-full w-auto max-w-full rounded-lg object-contain"
            />
          </div>

          {/*
            No caption under the photo. `alt` stays on the image itself, where
            screen readers and the tile's aria-label still use it, but the
            picture speaks for itself on screen.
          */}
          {current.credit && (
            <div
              className="shrink-0 px-4 pb-6 pt-4 text-center md:px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm text-white/40">Photo: {current.credit}</p>
            </div>
          )}

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 md:left-4 md:p-3"
              >
                <RiArrowLeftSLine className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 md:right-4 md:p-3"
              >
                <RiArrowRightSLine className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
