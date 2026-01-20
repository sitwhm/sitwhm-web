import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import "./globals.css"
import { siteConfig } from "./siteConfig"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
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
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.social.twitter,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${GeistSans.className} min-h-screen overflow-x-hidden bg-gray-50 antialiased selection:bg-syntax-cyan/20 selection:text-syntax-blue`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
