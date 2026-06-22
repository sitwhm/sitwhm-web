import { sponsors } from "@/lib/content/sponsors"
import { Button } from "@/components/ui/Button"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import type { Sponsor } from "@/lib/types"
import Image from "next/image"

type Tier = Sponsor["tier"]

const TIER_CONFIG: Record<
  Tier,
  {
    label: string
    tileWidth: string
    pad: string
    logoBoxClass: string
    logoSize: { width: number; height: number }
  }
> = {
  platinum: {
    label: "Platinum Sponsors",
    tileWidth: "w-full max-w-3xl",
    pad: "px-10 py-12 md:px-16 md:py-14",
    logoBoxClass: "h-20 md:h-24",
    logoSize: { width: 480, height: 160 },
  },
  gold: {
    label: "Gold Sponsors",
    tileWidth: "w-full max-w-md",
    pad: "px-10 py-10",
    logoBoxClass: "h-16 md:h-20",
    logoSize: { width: 320, height: 160 },
  },
  silver: {
    label: "Silver Sponsors",
    tileWidth: "w-full max-w-xs",
    pad: "px-8 py-8",
    logoBoxClass: "h-12 md:h-14",
    logoSize: { width: 240, height: 120 },
  },
}

const TIER_ORDER: Tier[] = ["platinum", "gold", "silver"]

function isReal(s: Sponsor) {
  return s.logo && !s.logo.includes("placeholder")
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const cfg = TIER_CONFIG[sponsor.tier]
  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className={`block ${cfg.tileWidth}`}
      aria-label={`${sponsor.name}`}
    >
      <div
        className={`flex h-full items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-syntax-blue/20 hover:shadow-md ${cfg.pad}`}
      >
        <div className={`flex w-full items-center justify-center ${cfg.logoBoxClass}`}>
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={cfg.logoSize.width}
            height={cfg.logoSize.height}
            style={
              sponsor.logoScale && sponsor.logoScale !== 1
                ? { transform: `scale(${sponsor.logoScale})`, transformOrigin: "center" }
                : undefined
            }
            className="max-h-full w-auto max-w-full object-contain"
          />
        </div>
      </div>
    </a>
  )
}

function TierBlock({
  tier,
  list,
  delay,
}: {
  tier: Tier
  list: Sponsor[]
  delay: number
}) {
  const cfg = TIER_CONFIG[tier]
  return (
    <div className="mt-16 first:mt-16">
      <FadeDiv delay={delay}>
        <h3 className="mb-8 text-center text-2xl font-semibold text-gray-900">
          {cfg.label}
        </h3>
      </FadeDiv>
      <div className="flex flex-wrap items-stretch justify-center gap-6">
        {list.map((sponsor, i) => (
          <FadeDiv
            key={sponsor.id}
            delay={delay + 0.1 * (i + 1)}
            className={cfg.tileWidth}
          >
            <SponsorCard sponsor={sponsor} />
          </FadeDiv>
        ))}
      </div>
    </div>
  )
}

export function Sponsors() {
  const activeTiers = TIER_ORDER.map((tier) => ({
    tier,
    list: sponsors.filter((s) => s.tier === tier && isReal(s)),
  })).filter(({ list }) => list.length > 0)

  return (
    <section
      id="sponsors"
      className="bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Our Sponsors
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Thank you to the companies making this community event possible
              </p>
            </FadeDiv>
          </div>

          {activeTiers.map(({ tier, list }, i) => (
            <TierBlock key={tier} tier={tier} list={list} delay={0.2 + 0.2 * i} />
          ))}

          <FadeDiv delay={0.6} className="mt-16">
            <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                Interested in Sponsoring?
              </h3>
              <p className="mx-auto mb-6 max-w-xl text-gray-600">
                Support the SAP community and get your brand in front of 150+
                attendees.
              </p>
              <a href="mailto:team@sitwhm.de">
                <Button>Become a Sponsor</Button>
              </a>
            </div>
          </FadeDiv>
        </FadeContainer>
      </div>
    </section>
  )
}
