import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "sckry - Your Network, Visualized",
  description: "Visualize, search, and leverage your professional connections with AI-powered insights.",
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
