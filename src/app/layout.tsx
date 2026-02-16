import type { Metadata } from "next"
import "./globals.css"

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
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },

  // ── Alternates & canonical ────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Categorization ────────────────────────────────────
  category: "Technology",

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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1200",
    bestRating: "5",
    worstRating: "1",
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
      </body>
    </html>
  )
}
