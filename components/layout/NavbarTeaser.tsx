import { siteConfig } from "@/app/siteConfig"

export function NavbarTeaser() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">{siteConfig.shortName}</span>
        </a>

        {/* Simple CTA */}
        <a
          href="#notify"
          className="rounded-lg bg-syntax-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-syntax-blue/90"
        >
          Get Notified
        </a>
      </div>
    </nav>
  )
}
