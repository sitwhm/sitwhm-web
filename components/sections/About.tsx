import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiMicLine, RiTeamLine, RiLightbulbLine } from "@remixicon/react"

const highlights = [
  {
    icon: RiMicLine,
    title: "Real Talks",
    text: "Technical deep-dives, live demos, and honest lessons learned from the field.",
  },
  {
    icon: RiTeamLine,
    title: "Community First",
    text: "Organized by volunteers. No sales pitches, no marketing - just practitioners.",
  },
  {
    icon: RiLightbulbLine,
    title: "Wide Topics",
    text: "AI, BTP, ABAP, UI5, cloud architecture, analytics, and whatever else our speakers are passionate about.",
  },
]

export function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          <FadeDiv>
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              What is <span className="text-syntax-blue">#sitWHM</span>?
            </h2>
          </FadeDiv>

          <FadeDiv delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-gray-600">
              SAP Inside Track Weinheim is a free, one-day community event
              bringing together SAP developers, consultants, architects, and
              anyone curious about the SAP ecosystem.
            </p>
          </FadeDiv>

          {/* Highlight cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {highlights.map((item, i) => (
              <FadeDiv key={item.title} delay={0.15 * (i + 1)}>
                <div className="group h-full rounded-xl border border-gray-100 bg-gray-50/50 p-8 transition-all hover:border-syntax-blue/20 hover:bg-white hover:shadow-md hover:-translate-y-0.5">
                  <div className="mb-4 inline-flex rounded-xl bg-syntax-blue/10 p-3">
                    <item.icon className="h-5 w-5 text-syntax-blue" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.text}</p>
                </div>
              </FadeDiv>
            ))}
          </div>
        </FadeContainer>
      </div>
    </section>
  )
}
