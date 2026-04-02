import { GeistSans } from "geist/font/sans"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { siteConfig } from "./siteConfig"
import { featureFlags } from "./featureFlags"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { NavbarTeaser } from "@/components/layout/NavbarTeaser"
import { FooterTeaser } from "@/components/layout/FooterTeaser"
import { NavbarRefined } from "@/components/layout/NavbarRefined"
import { FooterRefined } from "@/components/layout/FooterRefined"
import { FloatingCTA } from "@/components/layout/FloatingCTA"
import { PasswordGate } from "@/components/PasswordGate"

const isTeaserMode = featureFlags.pageMode === 'teaser' || featureFlags.pageMode === 'mystery'

export const viewport: Viewport = {
  themeColor: "#0632A0",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: isTeaserMode ? `Save the Date - ${siteConfig.name}` : siteConfig.name,
  description: isTeaserMode
    ? `Save the date for ${siteConfig.event.date}. ${siteConfig.description}`
    : siteConfig.description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "SAP Inside Track",
    "SAP Inside Track Weinheim",
    "#sitWHM",
    "SAP Community Conference",
    "SAP Developers Conference Germany",
    "SAP BTP",
    "ABAP",
    "SAP Fiori",
    "SAP UI5",
    "SAP CodeJam",
    "Weinheim",
    "Rhine-Neckar",
    "Free SAP Conference",
    "SAP Networking Event",
    "SAP Community Event 2026",
    "Syntax Auditorium",
  ],
  authors: [
    {
      name: "Max Streifeneder",
      url: "https://github.com/maxstreifeneder",
    },
  ],
  creator: "SAP Community",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: isTeaserMode ? `Save the Date - ${siteConfig.name}` : siteConfig.name,
    description: isTeaserMode
      ? `Save the date for ${siteConfig.event.date}. ${siteConfig.description}`
      : siteConfig.description,
    siteName: siteConfig.shortName,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "SAP Inside Track Weinheim 2026 - Free Community Conference, September 19, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: isTeaserMode ? `Save the Date - ${siteConfig.name}` : siteConfig.name,
    description: isTeaserMode
      ? `Save the date for ${siteConfig.event.date}. ${siteConfig.description}`
      : siteConfig.description,
    creator: siteConfig.social.twitter,
    images: [`${siteConfig.url}/og-image.jpg`],
  },
}

// Choose navbar based on mode
function getNavbar() {
  if (featureFlags.pageMode === 'mystery') return <NavbarRefined />
  if (featureFlags.pageMode === 'teaser') return <NavbarTeaser />
  return <Navbar />
}

// Choose footer based on mode
function getFooter() {
  if (featureFlags.pageMode === 'mystery') return <FooterRefined />
  if (featureFlags.pageMode === 'teaser') return <FooterTeaser />
  return <Footer />
}

// Choose body classes based on mode
function getBodyClasses() {
  const base = `${GeistSans.className} min-h-screen overflow-x-hidden antialiased`

  if (featureFlags.pageMode === 'mystery') {
    return `${base} bg-gray-900 selection:bg-syntax-cyan/30 selection:text-white`
  }

  return `${base} bg-gray-50 selection:bg-syntax-cyan/20 selection:text-syntax-blue`
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* TODO GOLIVE: Remove this meta tag - staging-only, blocks all search indexing */}
        <meta name="robots" content="noindex, nofollow" />
        {featureFlags.pageMode === 'full' && (
          <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Event",
                "name": siteConfig.name,
                "description": siteConfig.description,
                "startDate": "2026-09-19T09:00:00+02:00",
                "endDate": "2026-09-19T18:00:00+02:00",
                "eventStatus": "https://schema.org/EventScheduled",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "location": {
                  "@type": "Place",
                  "name": siteConfig.event.venue,
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Syntax Systems GmbH & Co. KG",
                    "addressLocality": "Weinheim an der Bergstrasse",
                    "postalCode": "69469",
                    "addressRegion": "Baden-Wuerttemberg",
                    "addressCountry": "DE"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 49.5576133,
                    "longitude": 8.6648559
                  }
                },
                "organizer": {
                  "@type": "Organization",
                  "name": "SAP Inside Track Weinheim",
                  "url": siteConfig.url,
                  "sameAs": [
                    "https://twitter.com/sitwhm",
                    "https://github.com/maxstreifeneder/sitwhm"
                  ]
                },
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "EUR",
                  "availability": "https://schema.org/InStock",
                  "url": siteConfig.registration.url,
                  "validFrom": "2026-01-01"
                },
                "image": `${siteConfig.url}/og-image.jpg`,
                "url": siteConfig.url,
                "inLanguage": "en",
                "isAccessibleForFree": true,
                "maximumAttendeeCapacity": siteConfig.event.capacity,
                "typicalAgeRange": "18-"
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": siteConfig.name,
                "alternateName": "#sitWHM",
                "url": siteConfig.url
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "SAP Inside Track Weinheim",
                "alternateName": "#sitWHM",
                "url": siteConfig.url,
                "logo": `${siteConfig.url}/icon.png`,
                "sameAs": [
                  "https://twitter.com/sitwhm",
                  "https://github.com/maxstreifeneder/sitwhm"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "email": "team@sitwhm.de",
                  "contactType": "customer service"
                }
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is an SAP InsideTrack?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A free, community-driven event where SAP professionals share real-world experiences. No sales pitches, no marketing talks - just practitioners sharing what they've built, broken, fixed, and learned. Think of it as a conference organized by the community, for the community."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is it really free?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, completely free! SAP InsideTracks are made possible by generous sponsors and the volunteer work of the organizing team. No hidden fees, no strings attached."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Will there be food and drinks?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Absolutely. We provide breakfast, lunch, coffee, and drinks throughout the day. Nobody should have to think on an empty stomach."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What should I bring?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A laptop (optional), curiosity (mandatory), and community stickers (highly encouraged). If you're attending the CodeJam on Friday, a laptop with the prerequisites installed is required."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is the venue wheelchair accessible?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Please contact us at team@sitwhm.de for details about accessibility at the venue. We want to make sure everyone can participate comfortably."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Will sessions be recorded?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We plan to record sessions and make them available on YouTube after the event. Speakers can opt out of recording if they prefer."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I transfer my ticket?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes! If you can't make it, you can transfer your registration to someone else. Just drop us an email at team@sitwhm.de."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What's the dress code?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Casual. Come as you are. Extra points for SAP community t-shirts, UI5 hoodies, or ABAP-themed socks."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "I've never been to a SIT - is that okay?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "More than okay - it's great! Many attendees are joining for the first time. The SAP community is incredibly welcoming. You'll feel at home within minutes."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What's the hashtag?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It's #sitWHM! Use it on LinkedIn, X/Twitter, or wherever you share your experience. We'd love to see your posts, photos, and takeaways from the event."
                    }
                  }
                ]
              })
            }}
          />
          </>
        )}
        <link rel="alternate" hrefLang="en" href="https://sitwhm.de/" />
        <link rel="alternate" hrefLang="de" href="https://sitwhm.de/" />
        <link rel="alternate" hrefLang="x-default" href="https://sitwhm.de/" />
        <meta name="geo.region" content="DE-BW" />
        <meta name="geo.placename" content="Weinheim an der Bergstrasse" />
        <meta name="geo.position" content="49.5576133;8.6648559" />
        <meta name="ICBM" content="49.5576133, 8.6648559" />
        <link rel="dns-prefetch" href="https://js.tito.io" />
        <link rel="dns-prefetch" href="https://ti.to" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={getBodyClasses()}>
        <PasswordGate>
          {getNavbar()}
          {children}
          {getFooter()}
          {featureFlags.pageMode === 'full' && <FloatingCTA />}
        </PasswordGate>
      </body>
    </html>
  )
}
