import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Code of Conduct - SAP Inside Track Weinheim 2026",
  description: "Code of Conduct for SAP Inside Track Weinheim 2026. We are committed to providing a welcoming and safe environment for everyone.",
  alternates: {
    canonical: "/code-of-conduct",
  },
}

export default function CodeOfConduct() {
  return (
    <main className="min-h-screen bg-white px-4 py-24 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sitwhm.de/" },
              { "@type": "ListItem", "position": 2, "name": "Code of Conduct", "item": "https://sitwhm.de/code-of-conduct/" }
            ]
          })
        }}
      />
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-16 border-b border-gray-200 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">Community</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">Code of Conduct</h1>
          <p className="mt-2 text-sm text-gray-400">SAP Inside Track Weinheim 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-12">

          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              Purpose
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              A primary goal of SAP Inside Track Weinheim is to be inclusive to the largest
              number of contributors, with the most varied and diverse backgrounds possible.
              As such, we are committed to providing a friendly, safe, and welcoming
              environment for all, regardless of gender, sexual orientation, ability,
              ethnicity, socioeconomic status, and religion (or lack thereof).
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              Expected Behavior
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Participate in an authentic and active way
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Exercise consideration and respect in your speech and actions
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Attempt collaboration before conflict
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Refrain from demeaning, discriminatory, or harassing behavior and speech
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Be mindful of your surroundings and of your fellow participants
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Alert the organizing team if you notice a dangerous situation, someone in distress, or violations of this Code of Conduct
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              Unacceptable Behavior
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Unacceptable behaviors include: intimidating, harassing, abusive,
              discriminatory, derogatory, or demeaning speech or actions by any
              participant at our event, online or in person. Event venues may be
              shared with members of the public; please be respectful to all patrons
              of these locations.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Harassment includes: harmful or prejudicial verbal or written comments
              related to gender, sexual orientation, race, religion, disability;
              inappropriate use of nudity and/or sexual images in public spaces;
              deliberate intimidation, stalking or following; harassing photography
              or recording; sustained disruption of talks or other events;
              inappropriate physical contact, and unwelcome sexual attention.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              Consequences
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Anyone asked to stop unacceptable behavior is expected to comply
              immediately. If a participant engages in unacceptable behavior, the
              organizing team may take any action they deem appropriate, up to and
              including a temporary ban or permanent expulsion from the event without
              warning.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              Reporting
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              If you are subject to or witness unacceptable behavior, or have any
              other concerns, please notify a member of the organizing team as soon
              as possible.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              You can reach us at:{" "}
              <a href="mailto:team@sitwhm.de" className="text-syntax-blue underline underline-offset-2 hover:text-syntax-blue/80">
                team@sitwhm.de
              </a>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              The organizing team will also be identifiable at the event and available
              for in-person reports throughout the day.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              Attribution
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              This Code of Conduct is based on the{" "}
              <a
                href="https://berlincodeofconduct.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-syntax-blue underline underline-offset-2 hover:text-syntax-blue/80"
              >
                Berlin Code of Conduct
              </a>
              , which is distributed under a Creative Commons Attribution-ShareAlike
              4.0 International license.
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            &larr; Back to #sitWHM
          </Link>
        </div>
      </div>
    </main>
  )
}
