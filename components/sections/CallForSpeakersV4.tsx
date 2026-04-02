/**
 * CONCEPT 4: "The Open Mic"
 *
 * Centered, airy layout with a large decorative mic icon as a
 * watermark behind the text. Two side-by-side compact cards:
 * one for "What to talk about", one for "Why speak". Everything
 * floats in generous whitespace. Elegant and breathable.
 * Feeling: open, airy, modern, magazine-like.
 */
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { Button } from "@/components/ui/Button"
import { RiMicLine, RiChat3Line, RiStarLine } from "@remixicon/react"

export function CallForSpeakersV4() {
  return (
    <section id="speakers-call" className="relative overflow-hidden py-28">
      {/* Large watermark mic */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <RiMicLine className="h-[320px] w-[320px] text-syntax-blue/[0.03] sm:h-[420px] sm:w-[420px]" />
      </div>

      <FadeContainer className="relative z-10 mx-auto max-w-4xl px-4 md:px-6">
        {/* Header */}
        <div className="text-center">
          <FadeDiv>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              We Want to Hear
              <span className="block text-syntax-blue">From You!</span>
            </h2>
          </FadeDiv>
          <FadeDiv delay={0.1}>
            <p className="mx-auto mt-5 max-w-lg text-lg text-gray-500">
              The best talks come from real experience. If you&apos;ve built it,
              fixed it, or learned from it - we&apos;d love you to share.
            </p>
          </FadeDiv>
        </div>

        {/* Two cards */}
        <FadeDiv delay={0.2}>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Card: What to talk about */}
            <div className="rounded-xl border border-gray-100 bg-white p-7 shadow-sm">
              <div className="inline-flex rounded-lg bg-syntax-blue/[0.06] p-2.5">
                <RiChat3Line className="h-5 w-5 text-syntax-blue" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                Talk about anything SAP
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Technical deep-dives, project war stories, career lessons,
                demos, architecture decisions - if it matters to you,
                it matters to us.
              </p>
            </div>

            {/* Card: Why speak */}
            <div className="rounded-xl border border-gray-100 bg-white p-7 shadow-sm">
              <div className="inline-flex rounded-lg bg-syntax-cyan/10 p-2.5">
                <RiStarLine className="h-5 w-5 text-syntax-cyan" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                First-timers welcome
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Never spoken at a conference? This is your chance. A friendly
                audience, flexible formats (15–45 min), and zero pressure.
                Just be yourself.
              </p>
            </div>
          </div>
        </FadeDiv>

        {/* CTA */}
        <FadeDiv delay={0.3} className="mt-12 text-center">
          <a
            href="https://sessionize.com/sitwhm2026/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="shadow-lg shadow-syntax-blue/15 hover:shadow-xl hover:shadow-syntax-blue/25">
              Submit Your Session
            </Button>
          </a>
          <p className="mt-3 text-sm text-gray-400">
            Submissions via Sessionize
          </p>
        </FadeDiv>
      </FadeContainer>
    </section>
  )
}
