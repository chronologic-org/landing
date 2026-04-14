"use client"

import { useRef, useState, useCallback } from "react"
import NetworkCanvas from "./network-canvas"
import type { NetworkCanvasHandle } from "./network-canvas"
import AnimatedRoleText from "./animated-role-text"
import QueryInput from "./query-input"

export default function HeroSection() {
  const canvasRef = useRef<NetworkCanvasHandle>(null)
  const [centerLabel, setCenterLabel] = useState("founder")

  const handleRoleChange = useCallback((role: string) => {
    setCenterLabel(role)
  }, [])

  const handleQuery = useCallback((query: string) => {
    canvasRef.current?.simulateQuery(query)
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Network graph canvas — fades in on load */}
      <div className="absolute inset-0 animate-canvas-fadein">
        <NetworkCanvas ref={canvasRef} centerNodeLabel={centerLabel} />
      </div>

      {/* Hero headline + subtext overlay */}
      <div
        className="absolute inset-x-0 z-20 text-center pointer-events-none px-6"
        style={{ top: "23%" }}
      >
        <h1
          className="hero-headline text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-none mb-4"
          style={{ fontFamily: "'Unbounded', sans-serif" }}
        >
          Your network,<br />searchable.
        </h1>
        <p
          className="hero-subtext text-lg md:text-xl text-gray-900 font-light max-w-md mx-auto"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          AI-powered relationship intelligence for founders,<br className="hidden md:block" /> executives, builders, and operators.
        </p>
      </div>

      {/* Role text cycler */}
      <AnimatedRoleText onRoleChange={handleRoleChange} />

      {/* Query input */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-3xl px-4">
        <QueryInput onSubmit={handleQuery} />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20 bg-gradient-to-b from-transparent to-gray-100" />
    </section>
  )
}
