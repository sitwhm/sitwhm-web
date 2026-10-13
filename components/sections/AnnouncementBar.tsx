import { upcomingEdition } from "@/lib/editions"

/**
 * The "we're doing it again" bar.
 *
 * Sits directly under the navbar so the 2027 message lands before the visitor
 * has scrolled. One line, solid brand blue, no ornament.
 */
export function AnnouncementBar() {
  if (!upcomingEdition) return null

  return (
    <div className="relative z-30 mt-[60px] bg-syntax-blue">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-3 text-center md:px-6">
        <p className="text-sm text-white">
          <span className="font-semibold">
            sitWHM {upcomingEdition.year} is happening.
          </span>{" "}
          <span className="text-white/80">
            {upcomingEdition.dateLabel} in {upcomingEdition.city}.
          </span>
        </p>
        <a
          href="#next"
          className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
        >
          We&apos;re looking for sponsors
        </a>
      </div>
    </div>
  )
}
