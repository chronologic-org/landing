import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "sckry - Your Network, Visualized",
  description: "Visualize, search, and leverage your professional connections with AI-powered insights. See everyone you've ever known in one place.",
  keywords: ["professional network", "network visualization", "AI search", "connections", "contact management", "relationship intelligence", "networking tool"],
  authors: [{ name: "sckry" }],
  creator: "sckry",
  metadataBase: new URL("https://sckry.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sckry.com",
    siteName: "sckry",
    title: "sckry - Your Network, Visualized",
    description: "Visualize, search, and leverage your professional connections with AI-powered insights. See everyone you've ever known in one place.",
  },
  twitter: {
    card: "summary_large_image",
    title: "sckry - Your Network, Visualized",
    description: "Visualize, search, and leverage your professional connections with AI-powered insights.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
