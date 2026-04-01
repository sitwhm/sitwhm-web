"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { motion } from "motion/react"
import { RiCheckboxCircleLine } from "@remixicon/react"
import { cn } from "@/lib/utils"

interface TitoWidgetInlineProps {
  eventId: string
  testMode?: boolean
  discountCode?: string
  releases?: string[]
}

export function TitoWidgetInline({
  eventId,
  testMode = false,
  discountCode,
  releases,
}: TitoWidgetInlineProps) {
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [reference, setReference] = useState<string>("")

  const scriptSrc = testMode
    ? "https://js.tito.io/v2/with/inline,test_mode,development_mode/without/widget-css"
    : "https://js.tito.io/v2/with/inline/without/widget-css"

  useEffect(() => {
    // Initialize the tito callback queue
    window.tito =
      window.tito ||
      function (...args: unknown[]) {
        ;(window.tito as any).q = (window.tito as any).q || []
        ;(window.tito as any).q.push(args)
      }

    window.tito("on:widget:loaded", () => {
      // Widget is ready
    })

    window.tito("on:registration:complete", (data: { reference?: string }) => {
      setRegistrationComplete(true)
      setReference(data?.reference ?? "")
    })
  }, [])

  if (registrationComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="rounded-xl bg-syntax-green/10 px-6 py-8 text-center ring-1 ring-syntax-green/20"
      >
        <div className="flex justify-center">
          <RiCheckboxCircleLine className="h-12 w-12 text-syntax-green" />
        </div>
        <h3 className="mt-3 text-lg font-bold text-gray-900">You&apos;re registered!</h3>
        {reference && (
          <p className="mt-1 text-sm text-gray-500">
            Reference: <span className="font-medium text-gray-700">{reference}</span>
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500">Check your email for confirmation details.</p>
      </motion.div>
    )
  }

  return (
    <div className={cn("tito-inline-widget-container rounded-xl")}>
      <Script src={scriptSrc} strategy="lazyOnload" />
      <tito-widget
        event={eventId}
        {...(discountCode ? { "discount-code": discountCode } : {})}
        {...(releases && releases.length > 0 ? { releases: releases.join(",") } : {})}
      />
    </div>
  )
}
