import { FadeContainer, FadeDiv } from "@/components/Fade"

export function AboutSitWHM() {
  return (
    <section className="bg-black px-4 py-12 md:px-6">
      <FadeContainer className="mx-auto max-w-3xl">
        <div className="border-t border-white/10 pt-12">

          <FadeDiv>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              What is #sitWHM?
            </p>
          </FadeDiv>

          <FadeDiv delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-white/80 sm:text-xl">
              SAP Inside Track Weinheim is a free, one-day community event
              bringing together SAP developers, consultants, architects, and
              anyone curious about the SAP ecosystem — from the Rhine-Neckar
              region and beyond.
            </p>
          </FadeDiv>

          <FadeDiv delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-white/50">
              Expect real-world technical talks, live demos, and plenty
              of room for conversations and networking. Sessions cover
              everything around AI, BTP, ABAP, UI5, cloud architecture,
              analytics, and whatever else our speakers are passionate about.
            </p>
          </FadeDiv>

          <FadeDiv delay={0.3}>
            <p className="mt-6 text-base leading-relaxed text-white/50">
              Organized entirely by volunteers — by the community, for the
              community.
            </p>
          </FadeDiv>

        </div>
      </FadeContainer>
    </section>
  )
}
