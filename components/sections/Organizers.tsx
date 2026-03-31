import { organizers } from "@/lib/content/organizers"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiLinkedinBoxFill } from "@remixicon/react"
import Image from "next/image"

export function Organizers() {
  return (
    <section id="organizers" className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Section Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Organizers
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-white/50">
                The team making this event possible
              </p>
            </FadeDiv>
          </div>

          {/* Organizers Grid */}
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {organizers.map((organizer, index) => (
              <FadeDiv key={organizer.id} delay={0.05 * (index + 2)}>
                <div className="group h-full rounded-lg border border-white/10 bg-white/5 p-8 text-center transition-all hover:border-white/20 hover:-translate-y-0.5">
                  {/* Avatar */}
                  <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/20">
                    <Image
                      src={organizer.photo}
                      alt={organizer.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">
                    {organizer.name}
                  </h3>

                  {/* Title */}
                  <p className="mb-3 text-sm text-white/50">{organizer.title}</p>

                  {/* Bio */}
                  {organizer.bio && (
                    <p className="mb-4 text-sm leading-relaxed text-white/40">
                      {organizer.bio}
                    </p>
                  )}

                  {/* LinkedIn */}
                  {organizer.linkedin && (
                    <a
                      href={organizer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-white/30 transition-colors hover:text-white"
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
