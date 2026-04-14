"use client"

import { useRef, useState, useCallback, useEffect } from "react"
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

  const handleUndim = useCallback(() => {
    canvasRef.current?.undim()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) canvasRef.current?.undim()
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
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
        <div style={{ width: "fit-content", margin: "0 auto", textAlign: "center" }}>
          <h1
            className="hero-headline text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 tracking-tight leading-tight"
            style={{ fontFamily: "'Unbounded', sans-serif" }}
          >
            Ask your network anything.
            <br />
            Get answers instantly.
          </h1>
          <p
            className="hero-subtext font-light block w-full"
            style={{ fontFamily: "'Geist', sans-serif", fontSize: "clamp(1.35rem, 2.1vw, 1.65rem)", marginTop: "4vh", color: "#111111" }}
          >
            Sckry remembers every contact and turns them into opportunities.
          </p>
        </div>
      </div>

      {/* Role text cycler */}
      <AnimatedRoleText onRoleChange={handleRoleChange} />

      {/* Query input */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-30 w-[78%] max-w-3xl">
        <QueryInput onSubmit={handleQuery} onFocus={handleUndim} />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20 bg-gradient-to-b from-transparent to-gray-100" />
    </section>
  )
}
