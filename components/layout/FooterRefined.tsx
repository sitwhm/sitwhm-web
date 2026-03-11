import { siteConfig } from "@/app/siteConfig"

export function FooterRefined() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/40">
            <a
              href="/privacy"
              className="border-b border-transparent transition-colors hover:border-white/40 hover:text-white/60"
            >
              Privacy Policy
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs tracking-wider text-white/20">
            © {new Date().getFullYear()} #sitWHM
          </p>
        </div>
      </div>
    </footer>
  )
}
