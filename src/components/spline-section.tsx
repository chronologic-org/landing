"use client"

import dynamic from "next/dynamic"

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <span className="text-gray-500 text-sm animate-pulse">Loading 3D scene...</span>
    </div>
  ),
})

export default function SplineSection() {
  return (
    <section id="explore" className="relative bg-gray-900 w-full h-screen overflow-hidden">
      <Spline
        scene="https://prod.spline.design/oi02qKfsybHg5gDR/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
      />
    </section>
  )
}
