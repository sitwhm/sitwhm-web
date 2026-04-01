"use client"

import { useEffect } from "react"
import Script from "next/script"

interface TitoPopupProps {
  children: React.ReactNode
  eventId: string
  testMode?: boolean
}

export function TitoPopup({ children, eventId: _eventId, testMode = false }: TitoPopupProps) {
  const scriptSrc = testMode
    ? "https://js.tito.io/v2/with/test_mode"
    : "https://js.tito.io/v2"

  useEffect(() => {
    // Initialize the tito callback queue
    window.tito =
      window.tito ||
      function (...args: unknown[]) {
        ;(window.tito as any).q = (window.tito as any).q || []
        ;(window.tito as any).q.push(args)
      }

    window.tito("on:registration:complete", (_data: unknown) => {
      // Registration completed — can extend with toast/analytics here
    })
  }, [])

  return (
    <>
      <Script src={scriptSrc} strategy="lazyOnload" />
      {children}
    </>
  )
}

/**
 * Returns the href for an anchor link that opens the Tito popup overlay.
 * Usage: <a href={titoPopupHref("sitwhm/2026")}>Register</a>
 */
export function titoPopupHref(eventId: string): string {
  return `#/tito/${eventId}/en/registrations/new`
}
