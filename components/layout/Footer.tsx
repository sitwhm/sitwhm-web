import { siteConfig } from "@/app/siteConfig"
import { RiGithubFill, RiLinkedinBoxFill, RiTwitterXFill } from "@remixicon/react"

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#agenda", label: "Agenda" },
  { href: "#registration", label: "Registration" },
  { href: "#location", label: "Location" },
  { href: "#sponsors", label: "Sponsors" },
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
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-syntax-cyan"
                aria-label="Twitter"
              >
                <RiTwitterXFill className="h-6 w-6" />
              </a>
              <a
                href={`https://linkedin.com/${siteConfig.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-syntax-cyan"
                aria-label="LinkedIn"
              >
                <RiLinkedinBoxFill className="h-6 w-6" />
              </a>
              <a
                href={`https://github.com/${siteConfig.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-syntax-cyan"
                aria-label="GitHub"
              >
                <RiGithubFill className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-6">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-syntax-cyan"
              >
                Code of Conduct
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SAP Inside Track Weinheim. Built with ❤️ for the SAP Community.
          </p>
        </div>
      </div>
    </footer>
  )
}
