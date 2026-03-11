"use client"

import { siteConfig } from "@/app/siteConfig"

export function NavbarRefined() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <a href="/" className="text-sm font-medium tracking-wider text-white transition-colors hover:text-white/60">
          #sitWHM
        </a>

        {/* CTA */}
        <a
          href="#notify"
          className="border-b border-white pb-0.5 text-sm uppercase tracking-wider text-white transition-colors hover:border-white/40 hover:text-white/60"
        >
          Notify Me
        </a>
      </div>
    </nav>
  )
}
