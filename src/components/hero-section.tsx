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

  const handleQuery = useCallback(() => {
    canvasRef.current?.simulateQuery()
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Network graph canvas */}
      <NetworkCanvas ref={canvasRef} centerNodeLabel={centerLabel} />

      {/* Role text cycler */}
      <AnimatedRoleText onRoleChange={handleRoleChange} />

      {/* Query input */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-10 w-full max-w-3xl px-4">
        <QueryInput onSubmit={handleQuery} />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20 bg-gradient-to-b from-transparent to-gray-100" />
    </section>
  )
}
