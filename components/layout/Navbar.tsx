"use client"

import { Button } from "@/components/ui/Button"
import { RiCloseLine, RiMenuLine } from "@remixicon/react"
import Link from "next/link"
import { useEffect, useState } from "react"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#agenda", label: "Agenda" },
  { href: "#registration", label: "Registration" },
  { href: "#location", label: "Location" },
  { href: "#sponsors", label: "Sponsors" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-600">SAP Inside Track</span>
            <span className="bg-gradient-to-r from-syntax-blue to-syntax-cyan bg-clip-text text-lg font-bold text-transparent">
              SITWHM 2026
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-syntax-blue"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#registration">
            <Button size="sm">
              Register
            </Button>
          </a>
        </div>

        <button
          className="md:hidden"
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

      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="flex flex-col space-y-4 px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-gray-700 hover:text-syntax-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#registration" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full">
                Register
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
