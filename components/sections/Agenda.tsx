import { sessions } from "@/lib/content/agenda"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiCupLine, RiTeamLine, RiRestaurantLine } from "@remixicon/react"
import { AgendaCard } from "@/components/sections/AgendaCard"

type SessionType = "talk" | "break" | "social" | "meta"

function getSessionType(session: (typeof sessions)[0]): SessionType {
  if (["break1", "break2"].includes(session.id)) return "break"
  if (["lunch"].includes(session.id)) return "social"
  if (["registration", "closing"].includes(session.id)) return "meta"
  return "talk"
}

export function Agenda() {
  return (
    <section id="agenda" className="bg-black py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <FadeContainer>
          {/* Section Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Conference Agenda
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-white/50">
                A full day of sessions, workshops, and networking
              </p>
            </FadeDiv>
          </div>

          {/* Sessions */}
          <div className="mt-16 space-y-3">
            {sessions.map((session, index) => {
              const type = getSessionType(session)
              const isTalk = type === "talk"

              if (!isTalk) {
                return (
                  <FadeDiv key={session.id} delay={0.04 * index}>
                    <div className="flex items-center gap-6 py-3 px-2">
                      {/* Time */}
                      <div className="w-28 flex-shrink-0 text-right">
                        <span className="text-sm font-bold tabular-nums text-white/30">
                          {session.time}
                        </span>
                      </div>
                      {/* Dot */}
                      <div className="flex flex-col items-center self-stretch">
                        <div className="h-2.5 w-2.5 rounded-full border-2 border-white/20 bg-black" />
                        <div className="flex-1 w-px bg-white/10" />
                      </div>
                      {/* Label */}
                      <div className="flex items-center gap-2 text-sm text-white/30">
                        {type === "break" && <RiCupLine className="h-4 w-4" />}
                        {type === "social" && <RiRestaurantLine className="h-4 w-4" />}
                        {type === "meta" && <RiTeamLine className="h-4 w-4" />}
                        <span>{session.title}</span>
                      </div>
                    </div>
                  </FadeDiv>
                )
              }

              return (
                <FadeDiv key={session.id} delay={0.04 * index}>
                  <div className="flex items-start gap-6">
                    {/* Time column */}
                    <div className="w-28 flex-shrink-0 pt-7 text-right">
                      <p className="text-xl font-bold tabular-nums text-white leading-none">
                        {session.time.split(" - ")[0]}
                      </p>
                      <p className="text-sm tabular-nums text-white/30 mt-1.5">
                        {session.time.split(" - ")[1]}
                      </p>
                    </div>

                    {/* Timeline dot + line */}
                    <div className="flex flex-col items-center self-stretch pt-8">
                      <div className="h-3.5 w-3.5 rounded-full bg-white shadow-md shadow-white/20 ring-4 ring-white/10 flex-shrink-0" />
                      <div className="flex-1 w-px bg-gradient-to-b from-white/30 to-transparent mt-1" />
                    </div>

                    {/* Card */}
                    <div className="flex-1 mb-3">
                      <AgendaCard session={session} />
                    </div>
                  </div>
                </FadeDiv>
              )
            })}
          </div>
        </FadeContainer>
      </div>
    </section>
  )
}
