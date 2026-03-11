import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - SAP Inside Track Weinheim 2026",
  description: "Privacy policy for SAP Inside Track Weinheim 2026",
}

export default function Privacy() {
  return (
    <main className="min-h-screen bg-black px-4 py-24 md:px-6">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-white/30">Last updated: March 2026</p>
        </div>

        <div className="space-y-12">

          {/* 1. Data Controller */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-white/30">
              1. Data Controller
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              The person responsible for data processing on this website is:
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Max Streifeneder<br />
              <a
                href="mailto:team@sitwhm.de"
                className="text-white/80 underline underline-offset-2 transition-colors hover:text-white"
              >
                team@sitwhm.de
              </a>
            </p>
          </section>

          {/* 2. Hosting */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-white/30">
              2. Hosting
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              This website is hosted via <span className="text-white/80">GitLab Pages</span>,
              a service provided by GitLab Inc., 268 Bush Street, Suite 350,
              San Francisco, CA 94104, USA.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              When you visit this website, GitLab automatically processes
              technical data in server log files, including:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/60">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                IP address of the requesting device
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Date and time of access
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Requested URL
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Browser type and operating system
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Referring URL
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Legal basis: Art. 6(1)(f) GDPR (legitimate interest in secure
              and reliable website delivery). Logs are deleted after a maximum
              of 30 days.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              As GitLab Inc. is based in the United States, data is transferred
              to the USA on the basis of Standard Contractual Clauses (SCCs)
              pursuant to Art. 46(2)(c) GDPR. See:{" "}
              <a
                href="https://about.gitlab.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline underline-offset-2 transition-colors hover:text-white"
              >
                about.gitlab.com/privacy
              </a>
            </p>
          </section>

          {/* 3. Email Notifications */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-white/30">
              3. Email Notifications
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              This website offers the option to sign up for event notifications
              via <span className="text-white/80">Google Forms</span>, a service
              provided by Google Ireland Limited, Gordon House, Barrow Street,
              Dublin 4, Ireland.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              When you sign up, the following data is collected and transmitted
              to Google:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/60">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Email address
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Timestamp of submission
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Technical data (IP address, browser) — processed by Google
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Legal basis: your explicit consent pursuant to Art. 6(1)(a) GDPR
              and § 25(1) TDDDG. You may withdraw your consent at any time by
              contacting{" "}
              <a
                href="mailto:team@sitwhm.de"
                className="text-white/80 underline underline-offset-2 transition-colors hover:text-white"
              >
                team@sitwhm.de
              </a>
              . Withdrawal does not affect the lawfulness of prior processing.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Google LLC is certified under the{" "}
              <span className="text-white/80">EU–US Data Privacy Framework (DPF)</span>.
              The European Commission established by adequacy decision of
              10 July 2023 that DPF-certified US companies provide an adequate
              level of data protection. SCCs pursuant to Art. 46(2)(c) GDPR
              apply additionally. See:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline underline-offset-2 transition-colors hover:text-white"
              >
                policies.google.com/privacy
              </a>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Your email address is used solely for notifications about SAP
              Inside Track Weinheim 2026 and will be deleted no later than
              3 months after the event.
            </p>
          </section>

          {/* 4. Your Rights */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-white/30">
              4. Your Rights
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Under applicable data protection law, you have the following rights:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/60">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Right of access (Art. 15 GDPR)
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Right to rectification (Art. 16 GDPR)
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Right to erasure (Art. 17 GDPR)
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Right to restriction of processing (Art. 18 GDPR)
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Right to data portability (Art. 20 GDPR)
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                Right to withdraw consent (Art. 7(3) GDPR)
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              To exercise your rights:{" "}
              <a
                href="mailto:team@sitwhm.de"
                className="text-white/80 underline underline-offset-2 transition-colors hover:text-white"
              >
                team@sitwhm.de
              </a>
            </p>
          </section>

          {/* 5. Supervisory Authority */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-white/30">
              5. Supervisory Authority
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              You have the right to lodge a complaint with a data protection
              supervisory authority. The competent authority is:
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              <span className="text-white/80">LfDI Baden-Württemberg</span>
              <br />
              Postfach 10 29 32, 70025 Stuttgart, Germany
              <br />
              <a
                href="https://www.baden-wuerttemberg.datenschutz.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline underline-offset-2 transition-colors hover:text-white"
              >
                www.baden-wuerttemberg.datenschutz.de
              </a>
            </p>
          </section>

          {/* 6. Security */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-white/30">
              6. Security
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              This website uses HTTPS/TLS encryption. All data transmitted
              between your browser and our servers is protected against
              third-party access.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
