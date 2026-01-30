import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import "./globals.css"
import { siteConfig } from "./siteConfig"
import { NavbarTeaser } from "@/components/layout/NavbarTeaser"
import { FooterTeaser } from "@/components/layout/FooterTeaser"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `Save the Date - ${siteConfig.name}`,
  description: `Save the date for ${siteConfig.event.date}. ${siteConfig.description}`,
  keywords: ["SAP", "Conference", "Inside Track", "Community", "Weinheim", "BTP", "Developers", "Save the Date"],
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
    title: `Save the Date - ${siteConfig.name}`,
    description: `Save the date for ${siteConfig.event.date}. ${siteConfig.description}`,
    siteName: siteConfig.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: `Save the Date - ${siteConfig.name}`,
    description: `Save the date for ${siteConfig.event.date}. ${siteConfig.description}`,
    creator: siteConfig.social.twitter,
  },
}

export default function TeaserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${GeistSans.className} min-h-screen overflow-x-hidden bg-gray-50 antialiased selection:bg-syntax-cyan/20 selection:text-syntax-blue`}
      >
        <NavbarTeaser />
        {children}
        <FooterTeaser />
      </body>
    </html>
  )
}
