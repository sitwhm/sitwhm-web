import { siteConfig } from "@/app/siteConfig"
import { RiHeartFill } from "@remixicon/react"
import Link from "next/link"

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#agenda", label: "Agenda" },
  { href: "#registration", label: "Registration" },
  { href: "#location", label: "Location" },
  { href: "#speakers", label: "Speakers" },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-400">SAP Inside Track</span>
              <span className="bg-gradient-to-r from-syntax-cyan to-syntax-green bg-clip-text text-lg font-bold text-transparent">
                SITWHM 2026
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-syntax-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Legal
            </h3>
            <div className="space-y-2">
              <Link
                href="/code-of-conduct"
                className="block text-sm text-gray-400 hover:text-syntax-cyan"
              >
                Code of Conduct
              </Link>
              <Link
                href="/privacy"
                className="block text-sm text-gray-400 hover:text-syntax-cyan"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SAP Inside Track Weinheim. Built with{" "}
            <RiHeartFill className="inline h-4 w-4 text-red-400" aria-label="love" />{" "}
            for the SAP Community.
          </p>
        </div>
      </div>
    </footer>
  )
}
