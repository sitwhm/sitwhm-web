import { siteConfig } from "@/app/siteConfig"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiMapPinLine, RiParkingBoxLine, RiSubwayLine } from "@remixicon/react"

export function Location() {
  const venueDetails = [
    {
      icon: RiMapPinLine,
      title: "Address",
      description: "Syntax IdeaFactory, Weinheim, Germany",
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
    <section id="location" className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Section Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Venue & Location
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Find us at the innovative Syntax IdeaFactory in Weinheim
              </p>
            </FadeDiv>
          </div>

          {/* Content Grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Venue Details */}
            <FadeDiv delay={0.2}>
              <div className="h-full rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                  {siteConfig.event.venue}
                </h3>
                <div className="space-y-6">
                  {venueDetails.map((detail) => (
                    <div key={detail.title} className="flex gap-4">
                      <div className="shrink-0">
                        <detail.icon className="h-6 w-6 text-syntax-blue" />
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-gray-900">
                          {detail.title}
                        </h4>
                        <p className="text-gray-600">{detail.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <a
                    href="https://www.google.com/maps/search/Syntax+Weinheim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-syntax-blue hover:underline"
                  >
                    <RiMapPinLine className="h-4 w-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </FadeDiv>

            {/* Map */}
            <FadeDiv delay={0.3}>
              <div className="h-full min-h-[400px] overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.123456789!2d8.66!3d49.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDMyJzI0LjAiTiA4wrAzOSczNi4wIkU!5e0!3m2!1sen!2sde!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
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
