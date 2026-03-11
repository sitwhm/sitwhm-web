"use client"

import { useEffect } from "react"

interface TitoWidgetProps {
  eventId: string
}

export function TitoWidget({ eventId }: TitoWidgetProps) {
  useEffect(() => {
    // Load Tito script
    const script = document.createElement("script")
    script.src = "https://js.tito.io/v2"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <tito-widget event={eventId}></tito-widget>
    </div>
  )
}
