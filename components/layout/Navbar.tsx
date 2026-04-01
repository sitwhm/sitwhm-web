"use client"

import { featureFlags } from "@/app/featureFlags"
import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/ui/Button"
import { titoPopupHref } from "@/components/TitoPopup"
import { RiCloseLine, RiMenuLine } from "@remixicon/react"
import Link from "next/link"
import { useEffect, useState } from "react"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#agenda", label: "Agenda" },
  { href: "#speakers", label: "Speakers" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
]

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
          <a href={featureFlags.titoMode === 'b' ? siteConfig.registration.url : "#registration"} {...(featureFlags.titoMode === 'b' ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            <Button size="sm">Save Your Free Spot</Button>
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
              href={featureFlags.titoMode === 'b' ? siteConfig.registration.url : "#registration"}
              {...(featureFlags.titoMode === 'b' ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button className="w-full">Save Your Free Spot</Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
