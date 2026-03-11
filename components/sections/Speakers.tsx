import { speakers } from "@/lib/content/speakers"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiLinkedinBoxFill } from "@remixicon/react"
import Image from "next/image"

export function Speakers() {
  return (
    <section id="speakers" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Section Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Speakers
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Learn from SAP experts and community leaders
              </p>
            </FadeDiv>
          </div>

          {/* Speakers Grid */}
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {speakers.map((speaker, index) => (
              <FadeDiv key={speaker.id} delay={0.05 * (index + 2)}>
                <div className="group h-full rounded-lg border border-gray-200 bg-white p-8 text-center transition-all hover:shadow-md hover:-translate-y-0.5">
                  {/* Avatar */}
                  <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200">
                    <Image
                      src={speaker.photo}
                      alt={speaker.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                    {speaker.name}
                  </h3>

                  {/* Title */}
                  <p className="mb-3 text-sm text-gray-600">{speaker.title}</p>

                  {/* Bio */}
                  {speaker.bio && (
                    <p className="mb-4 text-sm leading-relaxed text-gray-500">
                      {speaker.bio}
                    </p>
                  )}

                  {/* LinkedIn */}
                  {speaker.linkedin && (
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-gray-400 transition-colors hover:text-syntax-blue"
                      aria-label={`${speaker.name} on LinkedIn`}
                    >
                      <RiLinkedinBoxFill className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </FadeDiv>
            ))}
          </div>
        </FadeContainer>
      </div>
    </section>
  )
}
