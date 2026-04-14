"use client"

import { useFadeUp } from "@/lib/hooks"

export default function Footer() {
  const c0 = useFadeUp(0)
  const c1 = useFadeUp(100)
  const c2 = useFadeUp(200)
  const c3 = useFadeUp(300)
  const cols = [c0, c1, c2, c3]

  return (
    <footer className="relative overflow-hidden bg-[#0D1117] text-white pt-20 pb-10 px-6">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Col 0: Logo + tagline + social */}
          <div ref={cols[0].ref} style={cols[0].style} className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="font-bold text-lg text-white leading-none"
                style={{ fontFamily: "'Unbounded', sans-serif" }}
              >
                Sckry
              </span>
            </div>
            <p
              className="text-gray-500 text-sm mb-5 leading-relaxed"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Your professional network, visualized and searchable.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/sckryapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-white transition-colors duration-200"
                aria-label="X / Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/sckry"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 1: Product */}
          <div ref={cols[1].ref} style={cols[1].style}>
            <h4
              className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Product
            </h4>
            <ul className="space-y-3" style={{ fontFamily: "'Geist', sans-serif" }}>
              <li><a href="#features" className="text-gray-500 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="#pricing" className="text-gray-500 hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="https://app.sckry.com" className="text-gray-500 hover:text-white transition-colors text-sm">Dashboard</a></li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div ref={cols[2].ref} style={cols[2].style}>
            <h4
              className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Company
            </h4>
            <ul className="space-y-3" style={{ fontFamily: "'Geist', sans-serif" }}>
              <li>
                <a
                  href="https://calendly.com/raeedz/chronologic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div ref={cols[3].ref} style={cols[3].style}>
            <h4
              className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Legal
            </h4>
            <ul className="space-y-3" style={{ fontFamily: "'Geist', sans-serif" }}>
              <li><a href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div
          className="border-t border-white/10 pt-6 text-center text-xs text-gray-600"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          &copy; {new Date().getFullYear()} Sckry. All rights reserved.
        </div>
      </div>

      {/* Watermark */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none select-none flex items-end justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-bold leading-none"
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: "clamp(6rem, 16vw, 14rem)",
            color: "white",
            opacity: 0.06,
            letterSpacing: "-0.04em",
            userSelect: "none",
          }}
        >
          Sckry
        </span>
      </div>
    </footer>
  )
}
