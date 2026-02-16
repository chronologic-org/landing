"use client"

import { useState } from "react"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl rounded-full px-6 py-5 flex items-center transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:scale-[1.01]"
      style={{
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2.5 shrink-0">
        <svg width="32" height="32" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#nav-clip)">
            <path d="M96 96L122.93 3.85L140.64 11.01Z" fill="#4a90e2" />
            <path d="M96 96L85.61 0.56L104.72 0.4Z" fill="#4a90e2" />
            <path d="M96 96L0.56 106.39L0.4 87.28Z" fill="#4a90e2" />
            <path d="M96 96L11.8 142.12L4.34 124.53Z" fill="#4a90e2" />
            <path d="M96 96L35.86 170.83L22.23 157.44Z" fill="#4a90e2" />
            <path d="M96 96L69.07 188.15L51.36 180.99Z" fill="#4a90e2" />
            <path d="M96 96L106.39 191.44L87.28 191.6Z" fill="#4a90e2" />
            <path d="M96 96L191.44 85.61L191.6 104.72Z" fill="#4a90e2" />
            <path d="M96 96L180.2 49.88L187.66 67.47Z" fill="#4a90e2" />
            <path d="M96 96L156.14 21.17L169.77 34.56Z" fill="#4a90e2" />
          </g>
          <defs>
            <clipPath id="nav-clip"><rect width="192" height="192" /></clipPath>
          </defs>
        </svg>
        <span className="text-gray-900 font-medium text-xl tracking-tight leading-none translate-y-[0.5px]">Sckry</span>
      </a>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-6 ml-8 text-sm font-medium tracking-wide text-gray-400">
        <a href="#demo" className="hover:text-gray-900 transition-colors duration-200">Demo</a>
        <a href="#pricing" className="hover:text-gray-900 transition-colors duration-200">Pricing</a>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Desktop auth buttons */}
      <div className="hidden md:flex items-center gap-3">
        <a
          href="https://app.sckry.com/login"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-5 py-2 rounded-xl font-medium"
          style={{
            background: "rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          Log In
        </a>
        <a
          href="https://app.sckry.com/signup"
          className="text-sm text-white bg-[#5885ec] hover:bg-[#4a74d4] transition-colors px-5 py-2 rounded-xl font-semibold"
        >
          Sign Up
        </a>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden ml-auto w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        style={{ color: "rgba(0,0,0,0.5)" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          {mobileOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-2xl p-4 flex flex-col gap-1 md:hidden"
          style={{
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <a href="#demo" className="text-gray-600 hover:text-gray-900 hover:bg-black/[0.03] text-sm py-2.5 px-3 rounded-xl font-medium transition-colors" onClick={() => setMobileOpen(false)}>Demo</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 hover:bg-black/[0.03] text-sm py-2.5 px-3 rounded-xl font-medium transition-colors" onClick={() => setMobileOpen(false)}>Pricing</a>
          <hr className="border-gray-100 my-1.5" />
          <div className="flex gap-2 mt-1">
            <a href="https://app.sckry.com/login" className="flex-1 text-gray-600 hover:text-gray-900 text-sm py-2.5 font-medium text-center rounded-xl transition-colors" style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}>Log In</a>
            <a href="https://app.sckry.com/signup" className="flex-1 text-sm text-white bg-[#5885ec] hover:bg-[#4a74d4] transition-colors py-2.5 rounded-xl font-semibold text-center">Sign Up</a>
          </div>
        </div>
      )}
    </nav>
  )
}
