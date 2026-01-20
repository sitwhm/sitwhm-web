import { aboutCards } from "@/lib/content/about"
import { FadeContainer, FadeDiv } from "@/components/Fade"

export function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Section Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                About the Conference
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Everything you need to know about SAP Inside Track Weinheim
              </p>
            </FadeDiv>
          </div>

          {/* Cards Grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {aboutCards.map((card, index) => (
              <FadeDiv key={card.id} delay={0.1 * (index + 2)}>
                <div className="group h-full rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-4 text-5xl">{card.icon}</div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="leading-7 text-gray-600">{card.description}</p>
                </div>
              </FadeDiv>
            ))}
          </div>
        </FadeContainer>
      </div>
    </section>
  )
}
