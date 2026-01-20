import { sessions } from "@/lib/content/agenda"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiTimeLine } from "@remixicon/react"

export function Agenda() {
  return (
    <section id="agenda" className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Section Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Conference Agenda
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                A full day of sessions, workshops, and networking
              </p>
            </FadeDiv>
          </div>

          {/* Timeline */}
          <div className="relative mt-16">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 hidden w-px bg-gradient-to-b from-syntax-blue via-syntax-cyan to-syntax-green md:block" />

            {/* Sessions */}
            <div className="space-y-8">
              {sessions.map((session, index) => (
                <FadeDiv key={session.id} delay={0.05 * index}>
                  <div className="relative md:ml-12">
                    {/* Timeline dot */}
                    <div className="absolute -left-12 top-3 hidden h-6 w-6 rounded-full border-4 border-white bg-syntax-blue shadow-md md:block" />

                    {/* Session Card */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-syntax-blue">
                            <RiTimeLine className="h-4 w-4" />
                            {session.time}
                          </div>
                          <h3 className="mb-1 text-xl font-semibold text-gray-900">
                            {session.title}
                          </h3>
                          <p className="mb-2 text-sm text-gray-500">
                            Speaker: {session.speaker}
                          </p>
                          <p className="leading-7 text-gray-600">
                            {session.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeDiv>
              ))}
            </div>
          </div>
        </FadeContainer>
      </div>
    </section>
  )
}
