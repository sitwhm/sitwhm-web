"use client"

import { useState, useRef, useEffect } from "react"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiArrowDownSLine } from "@remixicon/react"

const faqs = [
  {
    question: "What is an SAP InsideTrack?",
    answer: "A free, community-driven event where SAP professionals share real-world experiences. No sales pitches, no marketing talks - just practitioners sharing what they've built, broken, fixed, and learned. Think of it as a conference organized by the community, for the community.",
  },
  {
    question: "Is it really free?",
    answer: "Yes, completely free! SAP InsideTracks are made possible by our generous sponsors and the volunteer work of the organizing team. No hidden fees, no strings attached.",
  },
  {
    question: "Will there be food and drinks?",
    answer: "Yes! Lunch and drinks are covered. Depending on sponsors and attendee numbers we may be able to offer more - stay tuned.",
  },
  {
    question: "What should I bring?",
    answer: "Curiosity (mandatory) and community stickers (highly encouraged). That's really all you need.",
  },
  {
    question: "Is the venue wheelchair accessible?",
    answer: "Yes! The venue is wheelchair accessible. If you have any specific requirements, feel free to reach out to us at team@sitwhm.de so we can make sure everything is set up for you.",
  },
  {
    question: "Will sessions be recorded?",
    answer: "No. This is an onsite-only event - no recordings, no livestream. If you want to catch the talks, come join us in person!",
  },
  {
    question: "What's an SAP CodeJam?",
    answer: "A CodeJam is a free, full-day hands-on workshop run by an SAP expert. You spend the day working through real exercises on a specific SAP technology with guidance right there in the room. It's not a lecture: you code, you ask questions, you learn by doing. Groups are small (around 25 people) so you get real face time with the expert. We host one the day before the main event - it's the perfect warm-up. Note: the CodeJam requires a separate signup, so make sure to register for it in addition to the main conference.",
  },
  {
    question: "Can I transfer my ticket?",
    answer: "Yes! If you can't make it, you can transfer your registration to someone else. Just drop us an email at team@sitwhm.de.",
  },
  {
    question: "What's the dress code?",
    answer: "Casual. Come as you are. Extra points for SAP community t-shirts, UI5 hoodies, or ABAP-themed socks.",
  },
  {
    question: "I've never been to a SIT - is that okay?",
    answer: "More than okay - it's great! Many attendees are joining for the first time. The SAP community is incredibly welcoming. You'll feel at home within minutes.",
  },
  {
    question: "What's the hashtag?",
    answer: "It's #sitWHM! Use it on LinkedIn, X/Twitter, or wherever you share your experience. We'd love to see your posts, photos, and takeaways from the event.",
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const getHeight = () => contentRef.current?.scrollHeight ?? 0

  return (
    <button
      type="button"
      className="w-full cursor-pointer border-b border-gray-200 py-5 text-left transition-colors hover:bg-gray-50/50"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-gray-900">{question}</h3>
        <RiArrowDownSLine
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? `${getHeight() + 16}px` : "0px", opacity: open ? 1 : 0 }}
      >
        <div ref={contentRef}>
          <p className="mt-3 pb-2 pr-8 text-sm leading-relaxed text-gray-600">
            {answer}
          </p>
        </div>
      </div>
    </button>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer>
          {/* Header */}
          <div className="text-center">
            <FadeDiv>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Frequently Asked Questions
              </h2>
            </FadeDiv>
            <FadeDiv delay={0.1}>
              <p className="mt-4 text-lg text-gray-600">
                Everything you need to know before the event
              </p>
            </FadeDiv>
          </div>

          {/* FAQ Items */}
          <FadeDiv delay={0.2} className="mx-auto mt-12 max-w-3xl">
            <div className="border-t border-gray-200">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </FadeDiv>

          {/* More questions */}
          <FadeDiv delay={0.3} className="mx-auto mt-8 max-w-3xl text-center">
            <p className="text-sm text-gray-400">
              Still have questions? Reach out to us at{" "}
              <a href="mailto:team@sitwhm.de" className="text-syntax-blue hover:underline">
                team@sitwhm.de
              </a>
            </p>
          </FadeDiv>
        </FadeContainer>
      </div>
    </section>
  )
}
