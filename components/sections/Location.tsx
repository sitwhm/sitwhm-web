import { siteConfig } from "@/app/siteConfig"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiMapPinLine, RiParkingBoxLine, RiSubwayLine } from "@remixicon/react"

export function Location() {
  const venueDetails = [
    {
      icon: RiMapPinLine,
      title: "Address",
      description: "Syntax Auditorium, Weinheim, Germany",
    },
    {
      icon: RiSubwayLine,
      title: "Public Transport",
      description: "5 min walk from Weinheim train station",
    },
    {
      icon: RiParkingBoxLine,
      title: "Parking",
      description: "Free parking available on-site",
    },
  ]

  return (
    <section id="location" className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Section Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Venue & Location
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-white/50">
                Find us at the innovative Syntax Auditorium in Weinheim
              </p>
            </FadeDiv>
          </div>

          {/* Content Grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Venue Details */}
            <FadeDiv delay={0.2}>
              <div className="h-full rounded-lg border border-white/10 bg-white/5 p-8">
                <h3 className="mb-6 text-2xl font-semibold text-white">
                  {siteConfig.event.venue}
                </h3>
                <div className="space-y-6">
                  {venueDetails.map((detail) => (
                    <div key={detail.title} className="flex gap-4">
                      <div className="shrink-0">
                        <detail.icon className="h-6 w-6 text-white/40" />
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-white">
                          {detail.title}
                        </h4>
                        <p className="text-white/50">{detail.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <a
                    href="https://www.google.com/maps/search/Syntax+Weinheim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/60 border-b border-white/20 hover:text-white hover:border-white transition-colors"
                  >
                    <RiMapPinLine className="h-4 w-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </FadeDiv>

            {/* Map */}
            <FadeDiv delay={0.3}>
              <div className="h-full min-h-[400px] overflow-hidden rounded-lg border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.123456789!2d8.66!3d49.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDMyJzI0LjAiTiA4wrAzOSczNi4wIkU!5e0!3m2!1sen!2sde!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venue Location Map"
                />
              </div>
            </FadeDiv>
          </div>
        </FadeContainer>
      </div>
    </section>
  )
}
