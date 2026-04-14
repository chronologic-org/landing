"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const companies = [
  { id: "google", name: "Google", src: "/logos/google.png", w: 28, h: 28, circleSize: 40 },
  { id: "amazon", name: "Amazon", src: "/logos/amazon.png", w: 38, h: 24, circleSize: 40 },
  { id: "microsoft", name: "Microsoft", src: "/logos/microsoft.png", w: 28, h: 28, circleSize: 40 },
  { id: "goldman", name: "Goldman Sachs", src: "/logos/goldman.png", w: 38, h: 38, circleSize: 40 },
]

const FALLBACK_BASE = 119_777

export default function TrustBar() {
  const [contactCount, setContactCount] = useState(0)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const liveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    fetch("/api/contacts/count")
      .then((r) => r.json())
      .then((data) => { setContactCount(data.count ?? 0); setLoaded(true) })
      .catch(() => { setContactCount(0); setLoaded(true) })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || !loaded) return

    const target = contactCount > 0 ? contactCount : FALLBACK_BASE
    const startValue = Math.max(target - 200, 0)

    setCount(startValue)

    // Phase 1: rapid count-up to target over ~2s
    const duration = 2000
    const steps = 60
    const increment = (target - startValue) / steps
    let current = startValue

    const burstTimer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(burstTimer)

        // Phase 2: slow live increment ~2-3/second
        liveTimerRef.current = setInterval(() => {
          setCount((c) => c + (Math.random() < 0.5 ? 2 : 3))
        }, 400)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => {
      clearInterval(burstTimer)
      if (liveTimerRef.current) clearInterval(liveTimerRef.current)
    }
  }, [started, loaded, contactCount])

  return (
    <section ref={ref} className="bg-gray-100 py-10 px-6 border-t border-b border-gray-200">
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2 items-center">
            {companies.map((co, i) => (
              <div
                key={co.id}
                className="rounded-full border-2 border-white overflow-hidden bg-white flex items-center justify-center"
                style={{ zIndex: 5 - i, width: co.circleSize, height: co.circleSize }}
                title={co.name}
              >
                <Image src={co.src} alt={co.name} width={co.w} height={co.h} className="object-contain" />
              </div>
            ))}
            {/* YC circle */}
            <div
              className="w-10 h-10 rounded-full border-2 border-white overflow-hidden flex items-center justify-center"
              style={{ zIndex: 0, backgroundColor: "#FF6600" }}
              title="Y Combinator"
            >
              <svg width="20" height="23" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h4.8l6.5 13.5L17.7 0H22l-9 18v8h-4v-8L0 0z" fill="white"/>
              </svg>
            </div>
          </div>
          <p
            className="text-gray-700 text-base md:text-lg tracking-tight"
            style={{ fontFamily: "'Unbounded', sans-serif" }}
          >
            <span className="font-bold text-gray-900 tabular-nums">
              {count > 0 ? count.toLocaleString() : <span className="opacity-0 select-none">—</span>}
            </span>
            {count > 0 && " contacts entrusted to Sckry"}
          </p>
        </div>
      </div>
    </section>
  )
}
