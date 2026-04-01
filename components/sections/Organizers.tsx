import { organizers } from "@/lib/content/organizers"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiLinkedinBoxFill } from "@remixicon/react"
import Image from "next/image"

export function Organizers() {
  return (
    <section id="organizers" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Section Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Organizers
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                The team making this event possible
              </p>
            </FadeDiv>
          </div>

          {/* Organizers - flexbox so last row centers naturally */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            {organizers.map((organizer, index) => (
              <FadeDiv key={organizer.id} delay={0.05 * (index + 2)} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
                <div className="group h-full rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-syntax-blue/20">
                  {/* Avatar */}
                  <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-gray-100 transition-all group-hover:ring-syntax-blue/30">
                    <Image
                      src={organizer.photo}
                      alt={organizer.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                    {organizer.name}
                  </h3>

                  {/* Title */}
                  <p className="mb-3 text-sm text-gray-600">{organizer.title}</p>

                  {/* Bio */}
                  {organizer.bio && (
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">
                      {organizer.bio}
                    </p>
                  )}

                  {/* LinkedIn */}
                  {organizer.linkedin && (
                    <a
                      href={organizer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center justify-center text-gray-400 transition-colors hover:text-syntax-blue"
                      aria-label={`${organizer.name} on LinkedIn`}
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
