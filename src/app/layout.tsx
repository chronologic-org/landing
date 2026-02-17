import type { Metadata } from "next"
import "./globals.css"
import { HonchTracker } from "@/components/honch-tracker"

const SITE_URL = "https://sckry.com"
const SITE_NAME = "Sckry"
const TITLE = "Sckry — Your Professional Network, Visualized & Searchable"
const DESCRIPTION =
  "Sckry lets you visualize, search, and leverage every professional connection you've ever made. AI-powered relationship intelligence that turns your network into your most powerful asset."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ── Core ──────────────────────────────────────────────
  title: {
    default: TITLE,
    template: "%s | Sckry",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  keywords: [
    "professional network",
    "network visualization",
    "AI networking tool",
    "relationship intelligence",
    "contact management",
    "CRM alternative",
    "AI-powered search",
    "professional connections",
    "network graph",
    "people search",
    "career networking",
    "business relationships",
    "contact insights",
    "personal CRM",
    "networking platform",
    "connection tracker",
    "AI contact manager",
  ],

  authors: [{ name: "Sckry", url: SITE_URL }],
  creator: "Sckry",
  publisher: "Sckry",

  // ── Indexing ──────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sckry — visualize and search your professional network",
        type: "image/png",
      },
    ],
  },

  // ── Twitter ───────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@sckryapp",
    site: "@sckryapp",
  },

  // ── Icons ─────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // ── Manifest ─────────────────────────────────────────
  manifest: "/manifest.webmanifest",

  // ── Alternates & canonical ────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Categorization ────────────────────────────────────
  category: "Technology",

  // ── Other meta tags ─────────────────────────────────
  other: {
    "theme-color": "#5885ec",
    "msapplication-TileColor": "#0a0a0a",
  },

  // ── Verification (fill in once you have codes) ────────
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },
}

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "30",
    offerCount: "3",
  },
  featureList: [
    "AI-powered professional network search",
    "Interactive network visualization",
    "Relationship intelligence and insights",
    "Contact management and organization",
  ],
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  sameAs: [
    "https://twitter.com/sckryapp",
    "https://linkedin.com/company/sckry",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <HonchTracker />
      </body>
    </html>
  )
}
