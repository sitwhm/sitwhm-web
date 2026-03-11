import { siteConfig } from "@/app/siteConfig"

export function FooterTeaser() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
            <a
              href="/imprint"
              className="transition-colors hover:text-syntax-blue"
            >
              Impressum
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="/privacy"
              className="transition-colors hover:text-syntax-blue"
            >
              Datenschutz / Privacy
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {siteConfig.shortName}. A SAP Community Event.
          </p>
        </div>
      </div>
    </footer>
  )
}
