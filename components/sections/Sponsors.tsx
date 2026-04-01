import { sponsors } from "@/lib/content/sponsors"
import { Button } from "@/components/ui/Button"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import Image from "next/image"

export function Sponsors() {
  const platinumSponsors = sponsors.filter((s) => s.tier === "platinum")
  const goldSponsors = sponsors.filter((s) => s.tier === "gold")
  const silverSponsors = sponsors.filter((s) => s.tier === "silver")

  return (
    <section id="sponsors" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Section Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Our Sponsors
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Thank you to our amazing sponsors who make this event possible
              </p>
            </FadeDiv>
          </div>

          {/* Platinum Sponsors */}
          {platinumSponsors.length > 0 && (
            <div className="mt-16">
              <FadeDiv delay={0.2}>
                <h3 className="mb-8 text-center text-2xl font-semibold text-gray-900">
                  Platinum Sponsors
                </h3>
              </FadeDiv>
              <div className="grid gap-8 md:grid-cols-1">
                {platinumSponsors.map((sponsor, index) => (
                  <FadeDiv key={sponsor.id} delay={0.1 * (index + 3)}>
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer"
                    >
                      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-syntax-blue/20 hover:shadow-md hover:-translate-y-0.5">
                        <div className="flex flex-col items-center gap-6 text-center">
                          <div className="flex h-32 items-center justify-center">
                            {sponsor.logo && !sponsor.logo.includes("placeholder") ? (
                              <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                width={280}
                                height={70}
                                className="h-16 w-auto object-contain"
                              />
                            ) : (
                              <div className="text-4xl font-bold text-syntax-blue">
                                {sponsor.name}
                              </div>
                            )}
                          </div>
                          {sponsor.description && (
                            <p className="max-w-2xl text-gray-600">
                              {sponsor.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  </FadeDiv>
                ))}
              </div>
            </div>
          )}

          {/* Gold Sponsors */}
          {goldSponsors.length > 0 && (
            <div className="mt-16">
              <FadeDiv delay={0.4}>
                <h3 className="mb-8 text-center text-xl font-semibold text-gray-900">
                  Gold Sponsors
                </h3>
              </FadeDiv>
              <div className="grid gap-8 md:grid-cols-2">
                {goldSponsors.map((sponsor, index) => (
                  <FadeDiv key={sponsor.id} delay={0.1 * (index + 5)}>
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer"
                    >
                      <div className="flex h-full items-center justify-center rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-syntax-blue/20 hover:shadow-md hover:-translate-y-0.5">
                        <div className="text-2xl font-semibold text-gray-900">
                          {sponsor.name}
                        </div>
                      </div>
                    </a>
                  </FadeDiv>
                ))}
              </div>
            </div>
          )}

          {/* Silver Sponsors */}
          {silverSponsors.length > 0 && (
            <div className="mt-16">
              <FadeDiv delay={0.6}>
                <h3 className="mb-8 text-center text-lg font-semibold text-gray-900">
                  Silver Sponsors
                </h3>
              </FadeDiv>
              <div className="grid gap-6 md:grid-cols-3">
                {silverSponsors.map((sponsor, index) => (
                  <FadeDiv key={sponsor.id} delay={0.05 * (index + 7)}>
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer"
                    >
                      <div className="flex h-full items-center justify-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-syntax-blue/20 hover:shadow-md hover:-translate-y-0.5">
                        <div className="text-lg font-medium text-gray-600">
                          {sponsor.name}
                        </div>
                      </div>
                    </a>
                  </FadeDiv>
                ))}
              </div>
            </div>
          )}

          {/* Become a Sponsor CTA */}
          <FadeDiv delay={0.8} className="mt-16 text-center">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-8">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                Interested in Sponsoring?
              </h3>
              <p className="mb-6 text-gray-600">
                Support the SAP community and get your brand in front of{" "}
                {150}+ attendees
              </p>
              <a href="mailto:team@sitwhm.de">
                <Button>
                  Become a Sponsor
                </Button>
              </a>
            </div>
          </FadeDiv>
        </FadeContainer>
      </div>
    </section>
  )
}
