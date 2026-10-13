"use client"

import { featureFlags } from "@/app/featureFlags"
import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/ui/Button"
import { titoPopupHref } from "@/components/TitoPopup"
import { RiCloseLine, RiMenuLine } from "@remixicon/react"
import Link from "next/link"
import { useEffect, useState } from "react"

const isRecap = featureFlags.pageMode === 'recap'

// In recap mode the live-event anchors (#agenda, #registration, ...) don't
// exist on the page, so the nav points at the post-event sections instead.
const navLinks = isRecap
  ? [
      { href: "#recordings", label: "Talks & Slides" },
      { href: "#photos", label: "Photos" },
      { href: "#next", label: "2027" },
      { href: "#coverage", label: "#sitWHM" },
    ]
  : [
      { href: "#about", label: "About" },
      { href: "#agenda", label: "Agenda" },
      { href: "#speakers", label: "Speakers" },
      { href: "#friday", label: "Friday" },
      { href: "#location", label: "Location" },
      { href: "#sponsors", label: "Sponsors" },
      { href: "#faq", label: "FAQ" },
    ]

// Registration is closed once the event is over, so the CTA becomes "tell me
// about next year" instead of a dead Tito link.
const cta = isRecap
  ? {
      // Sponsors are what we're actively looking for right now, so the one
      // button in the navbar points at them. Attendee sign-up lives inside
      // the 2027 section.
      href: "#next",
      label: "Sponsor 2027",
      external: false,
    }
  : {
      href:
        featureFlags.titoMode === 'b'
          ? siteConfig.registration.url
          : "#registration",
      label: "Save Your Free Spot",
      external: featureFlags.titoMode === 'b',
    }

const ctaLinkProps = cta.external
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 md:px-6">
        <Link href="/" className="flex cursor-pointer items-center gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
              SAP Inside Track
            </span>
            <span className="bg-gradient-to-r from-syntax-blue to-syntax-cyan bg-clip-text text-lg font-bold leading-tight text-transparent">
              SITWHM 2026
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cursor-pointer text-sm font-medium text-gray-600 transition-colors hover:text-syntax-blue"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href={cta.href} {...ctaLinkProps}>
            <Button size="sm">{cta.label}</Button>
          </a>
        </div>

        <button
          className="cursor-pointer rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <RiCloseLine className="h-6 w-6" />
          ) : (
            <RiMenuLine className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu with slide animation */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="flex flex-col space-y-1 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-syntax-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={cta.href}
              {...ctaLinkProps}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button className="w-full">{cta.label}</Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
