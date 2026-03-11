import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import "./globals.css"
import { siteConfig } from "./siteConfig"
import { featureFlags } from "./featureFlags"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { NavbarTeaser } from "@/components/layout/NavbarTeaser"
import { FooterTeaser } from "@/components/layout/FooterTeaser"
import { NavbarRefined } from "@/components/layout/NavbarRefined"
import { FooterRefined } from "@/components/layout/FooterRefined"

const isTeaserMode = featureFlags.pageMode === 'teaser' || featureFlags.pageMode === 'mystery'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: isTeaserMode ? `Save the Date - ${siteConfig.name}` : siteConfig.name,
  description: isTeaserMode
    ? `Save the date for ${siteConfig.event.date}. ${siteConfig.description}`
    : siteConfig.description,
  keywords: ["SAP", "Conference", "Inside Track", "Community", "Weinheim", "BTP", "Developers"],
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
  },
  twitter: {
    card: "summary_large_image",
    title: isTeaserMode ? `Save the Date - ${siteConfig.name}` : siteConfig.name,
    description: isTeaserMode
      ? `Save the date for ${siteConfig.event.date}. ${siteConfig.description}`
      : siteConfig.description,
    creator: siteConfig.social.twitter,
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
      <body className={getBodyClasses()}>
        {getNavbar()}
        {children}
        {getFooter()}
      </body>
    </html>
  )
}
