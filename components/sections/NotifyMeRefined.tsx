"use client"

import { useState, useEffect } from "react"
import { RiCheckLine } from "@remixicon/react"

export function NotifyMeRefined() {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  // Check if user already submitted on mount
  useEffect(() => {
    const stored = localStorage.getItem("sitwhm_submitted_email")
    if (stored) {
      setSubmittedEmail(stored)
      setStatus("success")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address")
      return
    }

    if (!consent) {
      setStatus("error")
      setErrorMessage("Please accept the privacy policy")
      return
    }

    // Set loading state
    setStatus("loading")
    setErrorMessage("")

    try {
      // Create FormData
      const formData = new FormData()
      formData.append("entry.949304648", email)

      // Submit to Google Forms
      const response = await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdvnH7H4u4xr0eg5ChBOCkpxVB620-YjLlB4DOMJJ8mJunoxQ/formResponse",
        {
          method: "POST",
          body: formData,
          mode: "no-cors", // Google Forms doesn't support CORS, but submission still works
        }
      )

      // With no-cors, we can't check response status, so assume success
      // If it fails, user will notice email isn't in their responses
      setStatus("success")

      // Store submitted email in localStorage to prevent duplicates
      localStorage.setItem("sitwhm_submitted_email", email)
      setSubmittedEmail(email)

      setEmail("")
      setConsent(false)

      // Keep success state - don't auto-reset
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus("error")
      setErrorMessage("Something went wrong. Please try again or contact us directly.")

      // Reset error after 5 seconds
      setTimeout(() => {
        setStatus("idle")
        setErrorMessage("")
      }, 5000)
    }
  }

  return (
    <section id="notify" className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-2xl px-4 md:px-6">
        <div className="text-center">
          {/* Heading */}
          <div className="mb-12 border-b border-white/10 pb-6">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Join Waitlist
            </h2>
          </div>

          <p className="mb-12 text-white/60">
            Be notified when registration opens and speakers are announced.
          </p>

          {/* Form */}
          {status === "success" ? (
            <div className="border border-white/10 bg-white/5 p-8">
              <div className="flex flex-col items-center gap-3">
                <RiCheckLine className="h-8 w-8 text-white" />
                <p className="text-white">Added to waitlist</p>
                {submittedEmail && (
                  <p className="text-sm text-white/40">{submittedEmail}</p>
                )}
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    disabled={status === "loading"}
                    className="w-full border-b-2 border-white/20 bg-transparent py-3 text-white placeholder-white/40 transition-colors focus:border-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {/* GDPR Consent Checkbox */}
                <div className="mb-8 text-left">
                  <label className="group flex cursor-pointer items-start gap-3">
                    <div className="relative mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        disabled={status === "loading"}
                        className="h-5 w-5 cursor-pointer appearance-none border-2 border-white/20 bg-transparent transition-all duration-200 checked:border-white checked:bg-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {consent && (
                        <RiCheckLine className="pointer-events-none absolute h-4 w-4 text-black" />
                      )}
                    </div>
                    <span className="text-sm leading-relaxed text-white/60">
                      I consent to email notifications. See{" "}
                      <a
                        href="/privacy"
                        className="border-b border-white/40 text-white transition-colors hover:border-white"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                {/* Error Message */}
                {status === "error" && errorMessage && (
                  <div className="mb-6 border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {errorMessage}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!consent || status === "loading"}
                  className="w-full cursor-pointer border border-white bg-white py-3 text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black sm:w-auto sm:px-12"
                >
                  {status === "loading" ? "Sending..." : "Submit"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
