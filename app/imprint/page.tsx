import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum - SAP Inside Track Weinheim 2026",
  description: "Legal information and imprint for SAP Inside Track Weinheim 2026",
}

export default function Imprint() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 md:py-24">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Impressum</h1>
      <p className="mt-2 text-sm text-gray-500">Legal Information / Imprint</p>

      <div className="mt-12 space-y-12 text-gray-700">
        {/* Legal Information */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            Angaben gemäß § 5 TMG
          </h2>
          <p className="mt-4 leading-relaxed">
            [YOUR NAME]<br />
            [YOUR STREET ADDRESS]<br />
            [YOUR POSTAL CODE] [YOUR CITY]<br />
            Deutschland
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Kontakt / Contact</h2>
          <p className="mt-4 leading-relaxed">
            E-Mail: [YOUR EMAIL]<br />
            Telefon: [YOUR PHONE NUMBER]
          </p>
        </section>

        {/* Responsible for Content */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p className="mt-4 leading-relaxed">
            [YOUR NAME]<br />
            [YOUR STREET ADDRESS]<br />
            [YOUR POSTAL CODE] [YOUR CITY]<br />
            Deutschland
          </p>
        </section>

        {/* EU Dispute Resolution */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            EU-Streitschlichtung / EU Dispute Resolution
          </h2>
          <p className="mt-4 leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-syntax-blue hover:underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            .<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
          <p className="mt-4 leading-relaxed text-sm">
            <em>
              The European Commission provides a platform for online dispute resolution (ODR):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-syntax-blue hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              . Our email address can be found above in the imprint.
            </em>
          </p>
        </section>

        {/* Consumer Dispute Resolution */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            Verbraucherstreitbeilegung / Consumer Dispute Resolution
          </h2>
          <p className="mt-4 leading-relaxed">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          <p className="mt-4 leading-relaxed text-sm">
            <em>
              We are not willing or obliged to participate in dispute resolution proceedings before a
              consumer arbitration board.
            </em>
          </p>
        </section>

        {/* Liability for Content */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            Haftung für Inhalte / Liability for Content
          </h2>
          <p className="mt-4 leading-relaxed">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach
            den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
            jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
            oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p className="mt-4 leading-relaxed">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
            allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
            ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
            entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </section>

        {/* Liability for Links */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            Haftung für Links / Liability for Links
          </h2>
          <p className="mt-4 leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
            Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
            Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar.
          </p>
          <p className="mt-4 leading-relaxed">
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
            Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Links umgehend entfernen.
          </p>
        </section>

        {/* Copyright */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            Urheberrecht / Copyright
          </h2>
          <p className="mt-4 leading-relaxed">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
            deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
            jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
            privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p className="mt-4 leading-relaxed">
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
            Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
            bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
            wir derartige Inhalte umgehend entfernen.
          </p>
        </section>
      </div>
    </main>
  )
}
