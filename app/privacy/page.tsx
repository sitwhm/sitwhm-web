import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy - SAP Inside Track Weinheim 2026",
  description: "Privacy policy for SAP Inside Track Weinheim 2026",
  alternates: {
    canonical: "/privacy",
  },
}

export default function Privacy() {
  return (
    <main className="min-h-screen bg-white px-4 py-24 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sitwhm.de/" },
              { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://sitwhm.de/privacy/" }
            ]
          })
        }}
      />
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-16 border-b border-gray-200 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-400">Last updated: March 2026</p>
        </div>

        <div className="space-y-12">

          {/* 1. Data Controller */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              1. Data Controller
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              The person responsible for data processing on this website is:
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Max Streifeneder<br />
              <a
                href="mailto:team@sitwhm.de"
                className="text-syntax-blue underline underline-offset-2 hover:text-syntax-blue/80"
              >
                team@sitwhm.de
              </a>
            </p>
          </section>

          {/* 2. Hosting */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              2. Hosting
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              This website is hosted via <span className="font-medium text-gray-900">GitHub Pages</span>,
              a service provided by GitHub Inc., 88 Colin P Kelly Jr St,
              San Francisco, CA 94107, USA, a subsidiary of Microsoft Corporation.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              When you visit this website, GitHub automatically processes
              technical data in server log files, including:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                IP address of the requesting device
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Date and time of access
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Requested URL
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Browser type and operating system
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Referring URL
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Legal basis: Art. 6(1)(f) GDPR (legitimate interest in secure
              and reliable website delivery). Logs are deleted after a maximum
              of 30 days.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              GitHub Inc. is certified under the{" "}
              <span className="font-medium text-gray-900">EU–US Data Privacy Framework (DPF)</span>.
              The European Commission established by adequacy decision of
              10 July 2023 that DPF-certified US companies provide an adequate
              level of data protection. SCCs pursuant to Art. 46(2)(c) GDPR
              apply additionally. See:{" "}
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-syntax-blue underline underline-offset-2 hover:text-syntax-blue/80"
              >
                GitHub Privacy Statement
              </a>
            </p>
          </section>

          {/* 3. Email Notifications */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              3. Email Notifications
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              This website offers the option to sign up for event notifications
              via <span className="font-medium text-gray-900">Google Forms</span>, a service
              provided by Google Ireland Limited, Gordon House, Barrow Street,
              Dublin 4, Ireland.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              When you sign up, the following data is collected and transmitted
              to Google:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Email address
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Timestamp of submission
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Technical data (IP address, browser) - processed by Google
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Legal basis: your explicit consent pursuant to Art. 6(1)(a) GDPR
              and § 25(1) TDDDG. You may withdraw your consent at any time by
              contacting{" "}
              <a
                href="mailto:team@sitwhm.de"
                className="text-syntax-blue underline underline-offset-2 hover:text-syntax-blue/80"
              >
                team@sitwhm.de
              </a>
              . Withdrawal does not affect the lawfulness of prior processing.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Google LLC is certified under the{" "}
              <span className="font-medium text-gray-900">EU–US Data Privacy Framework (DPF)</span>.
              The European Commission established by adequacy decision of
              10 July 2023 that DPF-certified US companies provide an adequate
              level of data protection. SCCs pursuant to Art. 46(2)(c) GDPR
              apply additionally. See:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-syntax-blue underline underline-offset-2 hover:text-syntax-blue/80"
              >
                policies.google.com/privacy
              </a>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Your email address is used solely for notifications about SAP
              Inside Track Weinheim 2026 and will be deleted no later than
              3 months after the event.
            </p>
          </section>

          {/* 4. Your Rights */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              4. Your Rights
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Under applicable data protection law, you have the following rights:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Right of access (Art. 15 GDPR)
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Right to rectification (Art. 16 GDPR)
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Right to erasure (Art. 17 GDPR)
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Right to restriction of processing (Art. 18 GDPR)
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Right to data portability (Art. 20 GDPR)
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                Right to withdraw consent (Art. 7(3) GDPR)
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              To exercise your rights:{" "}
              <a
                href="mailto:team@sitwhm.de"
                className="text-syntax-blue underline underline-offset-2 hover:text-syntax-blue/80"
              >
                team@sitwhm.de
              </a>
            </p>
          </section>

          {/* 5. Supervisory Authority */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              5. Supervisory Authority
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              You have the right to lodge a complaint with a data protection
              supervisory authority. The competent authority is:
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              <span className="font-medium text-gray-900">LfDI Baden-Württemberg</span>
              <br />
              Postfach 10 29 32, 70025 Stuttgart, Germany
              <br />
              <a
                href="https://www.baden-wuerttemberg.datenschutz.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-syntax-blue underline underline-offset-2 hover:text-syntax-blue/80"
              >
                www.baden-wuerttemberg.datenschutz.de
              </a>
            </p>
          </section>

          {/* 6. Security */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
              6. Security
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              This website uses HTTPS/TLS encryption. All data transmitted
              between your browser and our servers is protected against
              third-party access.
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            &larr; Back to #sitWHM
          </Link>
        </div>
      </div>
    </main>
  )
}
