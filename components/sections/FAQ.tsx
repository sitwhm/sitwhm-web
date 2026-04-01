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
    answer: "Absolutely. We provide breakfast, lunch, coffee, and drinks throughout the day. Nobody should have to think on an empty stomach.",
  },
  {
    question: "What should I bring?",
    answer: "A laptop (optional), curiosity (mandatory), and community stickers (highly encouraged). If you're attending the CodeJam on Friday, a laptop with the prerequisites installed is required.",
  },
  {
    question: "Is the venue wheelchair accessible?",
    answer: "Please contact us at team@sitwhm.de for details about accessibility at the venue. We want to make sure everyone can participate comfortably.",
  },
  {
    question: "Will sessions be recorded?",
    answer: "We plan to record sessions and make them available on YouTube after the event. Speakers can opt out of recording if they prefer.",
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
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [answer])

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
        style={{ maxHeight: open ? `${height}px` : "0px", opacity: open ? 1 : 0 }}
      >
        <div ref={contentRef}>
          <p className="mt-3 pr-8 text-sm leading-relaxed text-gray-600">
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
