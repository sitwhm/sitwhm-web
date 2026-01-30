"use client"

import { useEffect, useState } from "react"
import { siteConfig } from "@/app/siteConfig"
import { RiSparklingLine } from "@remixicon/react"

export function NavbarMystery() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-gray-900/80 shadow-xl shadow-black/20 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <a href="/" className="group flex items-center gap-3 transition-transform duration-300 hover:scale-105">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-lg bg-gradient-to-br from-syntax-blue to-syntax-cyan opacity-50 blur-md" />
            <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-syntax-blue to-syntax-cyan" />
          </div>
          <span className="text-xl font-bold text-white">{siteConfig.shortName}</span>
        </a>

        {/* CTA */}
        <a href="#notify">
          <button className="group relative overflow-hidden rounded-lg border border-syntax-cyan/30 bg-gradient-to-r from-syntax-blue/20 to-syntax-cyan/20 px-6 py-2.5 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-syntax-cyan/60 hover:shadow-lg hover:shadow-syntax-cyan/30">
            <span className="relative z-10 flex items-center gap-2">
              Get Notified
              <RiSparklingLine className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-syntax-cyan/20 to-syntax-blue/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </a>
      </div>
    </nav>
  )
}
