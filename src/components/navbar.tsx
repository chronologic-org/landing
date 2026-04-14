"use client"

import { useState } from "react"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className="animate-nav-enter fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[78%] max-w-3xl rounded-full px-6 py-3 flex items-center transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:scale-[1.01]"
      style={{
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      {/* Logo */}
      <a href="#" className="flex items-center shrink-0">
        <span
          className="text-gray-900 font-bold leading-none"
          style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "1.4375rem" }}
        >
          Sckry
        </span>
      </a>

      {/* Desktop nav links */}
      <div
        className="hidden md:flex items-center gap-6 ml-8 text-sm font-medium tracking-wide text-gray-400"
        style={{ fontFamily: "'Geist', sans-serif" }}
      >
        <a href="#features" className="hover:text-gray-900 transition-colors duration-200">Features</a>
        <a href="#pricing" className="hover:text-gray-900 transition-colors duration-200">Pricing</a>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Desktop auth buttons */}
      <div
        className="hidden md:flex items-center gap-3"
        style={{ fontFamily: "'Geist', sans-serif" }}
      >
        <a
          href="https://app.sckry.com/login"
          className="btn-ghost text-sm text-gray-700 hover:text-gray-900 hover:bg-black/5 px-[22px] py-[10px] rounded-full font-medium"
          style={{ border: "1.5px solid rgba(0,0,0,0.15)" }}
        >
          Log In
        </a>
        <a
          href="https://app.sckry.com/signup"
          className="btn-primary text-sm text-white px-[22px] py-[10px] rounded-full font-semibold hover:opacity-90"
          style={{ backgroundColor: "#4A6CF7" }}
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
            fontFamily: "'Geist', sans-serif",
          }}
        >
          <a href="#features" className="text-gray-600 hover:text-gray-900 hover:bg-black/[0.03] text-sm py-2.5 px-3 rounded-xl font-medium transition-colors" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 hover:bg-black/[0.03] text-sm py-2.5 px-3 rounded-xl font-medium transition-colors" onClick={() => setMobileOpen(false)}>Pricing</a>
          <hr className="border-gray-100 my-1.5" />
          <div className="flex gap-2 mt-1">
            <a
              href="https://app.sckry.com/login"
              className="btn-ghost flex-1 text-gray-700 text-sm py-2.5 font-medium text-center rounded-full transition-colors hover:bg-black/5"
              style={{ border: "1.5px solid rgba(0,0,0,0.15)" }}
            >
              Log In
            </a>
            <a
              href="https://app.sckry.com/signup"
              className="btn-primary flex-1 text-sm text-white py-2.5 rounded-full font-semibold text-center hover:opacity-90"
              style={{ backgroundColor: "#4A6CF7" }}
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
