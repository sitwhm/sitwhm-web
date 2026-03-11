import { siteConfig } from "@/app/siteConfig"

export function FooterMystery() {
  return (
    <footer className="relative border-t border-white/10 bg-gray-900 py-12">
      {/* Subtle gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo/Branding */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-syntax-blue to-syntax-cyan" />
            <span className="text-xl font-bold text-white">{siteConfig.shortName}</span>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
            <a
              href="/imprint"
              className="text-gray-400 transition-colors hover:text-syntax-cyan"
            >
              Impressum
            </a>
            <span className="text-gray-700">·</span>
            <a
              href="/privacy"
              className="text-gray-400 transition-colors hover:text-syntax-cyan"
            >
              Privacy Policy
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} {siteConfig.shortName}. A SAP Community Event.
          </p>
        </div>
      </div>
    </footer>
  )
}
