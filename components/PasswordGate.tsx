"use client"

import { useEffect, useState } from "react"

const COOKIE_NAME = "sitwhm_preview_auth"
const COOKIE_DAYS = 7
const PASSWORD_HASH = process.env.NEXT_PUBLIC_PREVIEW_PASSWORD_HASH

async function sha256(text: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  )
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`
}

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [input, setInput] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  // If no hash configured, gate is disabled (production)
  const gateEnabled = Boolean(PASSWORD_HASH)

  useEffect(() => {
    if (!gateEnabled) {
      setAuthenticated(true)
      setChecking(false)
      return
    }
    const cookie = getCookie(COOKIE_NAME)
    if (cookie === PASSWORD_HASH) {
      setAuthenticated(true)
    }
    setChecking(false)
  }, [gateEnabled])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const hash = await sha256(input)
    if (hash === PASSWORD_HASH) {
      setCookie(COOKIE_NAME, hash, COOKIE_DAYS)
      setAuthenticated(true)
    } else {
      setError(true)
      setInput("")
    }
    setLoading(false)
  }

  if (checking) return null

  if (authenticated) return <>{children}</>

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0632A0] mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">#sitWHM Preview</h1>
          <p className="text-sm text-gray-500 mt-1">Enter the password to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false) }}
            placeholder="Password"
            autoFocus
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
              ${error
                ? "border-red-400 bg-red-50 focus:border-red-500"
                : "border-gray-200 bg-white focus:border-[#0632A0]"
              }`}
          />
          {error && (
            <p className="text-xs text-red-500 px-1">Wrong password. Try again.</p>
          )}
          <button
            type="submit"
            disabled={!input || loading}
            className="w-full py-3 rounded-xl bg-[#0632A0] text-white text-sm font-medium
              hover:bg-[#0632A0]/90 active:scale-[0.98] transition-all
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Checking…" : "Continue"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          SAP Inside Track Weinheim 2026
        </p>
      </div>
    </div>
  )
}
