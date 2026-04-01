"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiMailLine, RiCheckLine } from "@remixicon/react"

export function NotifyMe() {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Form will submit to Google Forms via the action attribute
    // Show success message
    setStatus("success")
    setEmail("")
    setConsent(false)

    // Reset after 5 seconds
    setTimeout(() => setStatus("idle"), 5000)
  }

  return (
    <section id="notify" className="relative overflow-hidden bg-white py-20 sm:py-24">
      <FadeContainer className="relative z-10 mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <FadeDiv>
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-syntax-blue/10">
              <RiMailLine className="h-8 w-8 text-syntax-blue" />
            </div>
          </FadeDiv>

          <FadeDiv delay={0.1}>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Stay in the Loop
            </h2>
          </FadeDiv>

          <FadeDiv delay={0.2}>
            <p className="mt-4 text-lg text-gray-600">
              Be the first to know when registration opens and the full agenda is released.
            </p>
          </FadeDiv>

          <FadeDiv delay={0.3} className="mt-8">
            {status === "success" ? (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-syntax-green/10 px-6 py-4 text-syntax-green">
                <RiCheckLine className="h-5 w-5" />
                <span className="font-medium">Thanks! We'll keep you updated.</span>
              </div>
            ) : (
              <>
                <form
                  action="YOUR_GOOGLE_FORM_ACTION_URL"
                  method="POST"
                  target="hidden_iframe"
                  onSubmit={handleSubmit}
                  className="mx-auto max-w-md"
                >
                  {/* Email Input */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      name="YOUR_ENTRY_ID"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-syntax-blue focus:outline-none focus:ring-2 focus:ring-syntax-blue/20"
                    />
                    <Button
                      type="submit"
                      disabled={!consent}
                      className="cursor-pointer whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Notify Me
                    </Button>
                  </div>

                  {/* GDPR Consent Checkbox */}
                  <div className="mt-4 text-left">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300 text-syntax-blue focus:ring-2 focus:ring-syntax-blue/20"
                      />
                      <span className="text-sm text-gray-600">
                        I consent to the processing of my email address for event notifications. My data
                        will be processed via Google Forms and stored according to the{" "}
                        <a
                          href="/privacy"
                          className="text-syntax-blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </a>
                        . I can withdraw my consent at any time by contacting the organizer.
                      </span>
                    </label>
                  </div>

                  {/* Hidden iframe to prevent redirect */}
                  <iframe
                    name="hidden_iframe"
                    title="Hidden form submission"
                    style={{ display: 'none' }}
                  />
                </form>
              </>
            )}
          </FadeDiv>

          <FadeDiv delay={0.4} className="mt-6">
            <p className="text-sm text-gray-400">
              No spam. Your data is processed by Google Forms according to{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
                Google's Privacy Policy
              </a>.
            </p>
          </FadeDiv>
        </div>
      </FadeContainer>

      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-syntax-cyan/5 blur-3xl" />
      </div>
    </section>
  )
}

