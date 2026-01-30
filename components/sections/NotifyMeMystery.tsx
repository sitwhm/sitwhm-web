"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { RiMailLine, RiCheckLine, RiSparklingLine } from "@remixicon/react"

export function NotifyMeMystery() {
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
    <section id="notify" className="relative overflow-hidden bg-gray-900 py-24 sm:py-32">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(30, 230, 230, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(30, 230, 230, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 animate-pulse rounded-full bg-syntax-cyan/10 blur-[120px]"
          style={{ animationDuration: '8s' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="group relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-syntax-blue to-syntax-cyan opacity-20 blur-2xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-syntax-cyan/30 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 group-hover:border-syntax-cyan/60 group-hover:shadow-lg group-hover:shadow-syntax-cyan/30">
                <RiSparklingLine className="h-10 w-10 text-syntax-cyan" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Join the Waitlist
            </span>
          </h2>

          <p className="mx-auto mb-4 max-w-2xl text-lg text-gray-400">
            Be among the first to know when we reveal the full agenda, speakers, and registration details.
          </p>

          <div className="mb-12 flex items-center justify-center gap-2">
            <div className="h-1 w-1 rounded-full bg-syntax-cyan" />
            <span className="text-sm text-syntax-cyan">Exclusive early access for registered attendees</span>
            <div className="h-1 w-1 rounded-full bg-syntax-cyan" />
          </div>

          {/* Form */}
          {status === "success" ? (
            <div className="mx-auto max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="relative overflow-hidden rounded-2xl border border-syntax-green/30 bg-gradient-to-br from-syntax-green/10 to-syntax-green/5 p-8 backdrop-blur-sm">
                <div className="absolute right-0 top-0 h-32 w-32 bg-syntax-green/20 blur-3xl" />
                <div className="relative flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-syntax-green/20">
                    <RiCheckLine className="h-8 w-8 text-syntax-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">You're on the list!</h3>
                  <p className="text-gray-400">
                    We'll notify you when registration opens.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/*
                SETUP INSTRUCTIONS:
                1. Create a Google Form at https://forms.google.com/
                2. Add an "Email" question (make it required)
                3. Click "Send" → Get the pre-filled link
                4. Replace ACTION_URL below with: https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
                5. Replace ENTRY_ID below with: entry.YOUR_ENTRY_ID (from the prefilled link)
              */}
              <form
                action="YOUR_GOOGLE_FORM_ACTION_URL"
                method="POST"
                target="hidden_iframe"
                onSubmit={handleSubmit}
                className="mx-auto max-w-2xl"
              >
                {/* Email Input */}
                <div className="relative mb-6">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-syntax-blue to-syntax-cyan opacity-20 blur-lg" />
                  <div className="relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm sm:flex-row">
                    <div className="relative flex-1">
                      <RiMailLine className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        name="YOUR_ENTRY_ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full rounded-lg border border-white/10 bg-gray-900/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 transition-all duration-200 focus:border-syntax-cyan/50 focus:outline-none focus:ring-2 focus:ring-syntax-cyan/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={!consent}
                      className="group relative cursor-pointer overflow-hidden bg-gradient-to-r from-syntax-blue to-syntax-cyan px-8 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-syntax-cyan/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Notify Me
                        <RiSparklingLine className="h-5 w-5" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-syntax-cyan to-syntax-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Button>
                  </div>
                </div>

                {/* GDPR Consent Checkbox */}
                <div className="mb-6 text-left">
                  <label className="group flex cursor-pointer items-start gap-3 rounded-lg border border-white/5 bg-gray-800/30 p-4 transition-all duration-200 hover:border-white/10 hover:bg-gray-800/50">
                    <div className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-600 bg-gray-900 transition-all duration-200 checked:border-syntax-cyan checked:bg-syntax-cyan focus:outline-none focus:ring-2 focus:ring-syntax-cyan/50 focus:ring-offset-2 focus:ring-offset-gray-900"
                      />
                      {consent && (
                        <RiCheckLine className="pointer-events-none absolute h-4 w-4 text-gray-900" />
                      )}
                    </div>
                    <span className="text-sm leading-relaxed text-gray-400">
                      I consent to the processing of my email address for event notifications. My data
                      will be processed via Google Forms and stored according to the{" "}
                      <a
                        href="/privacy"
                        className="text-syntax-cyan underline decoration-syntax-cyan/30 transition-colors hover:decoration-syntax-cyan"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                      . I can withdraw my consent at any time.
                    </span>
                  </label>
                </div>

                {/* Privacy Note */}
                <p className="text-sm text-gray-500">
                  Your data is processed securely via Google Forms.{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 underline decoration-gray-600 transition-colors hover:text-gray-300 hover:decoration-gray-400"
                  >
                    Google Privacy Policy
                  </a>
                </p>

                {/* Hidden iframe to prevent redirect */}
                <iframe
                  name="hidden_iframe"
                  title="Hidden form submission"
                  style={{ display: 'none' }}
                />
              </form>
            </>
          )}

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <RiCheckLine className="h-4 w-4 text-syntax-cyan" />
              <span>Free Event</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-gray-700" />
            <div className="flex items-center gap-2">
              <RiCheckLine className="h-4 w-4 text-syntax-cyan" />
              <span>No Spam</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-gray-700" />
            <div className="flex items-center gap-2">
              <RiCheckLine className="h-4 w-4 text-syntax-cyan" />
              <span>Unsubscribe Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
