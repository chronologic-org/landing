"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const companies = [
  { id: "google", name: "Google", src: "/logos/google.png", w: 28, h: 28 },
  { id: "amazon", name: "Amazon", src: "/logos/amazon.png", w: 42, h: 28 },
  { id: "microsoft", name: "Microsoft", src: "/logos/microsoft.png", w: 28, h: 28 },
  { id: "goldman", name: "Goldman Sachs", src: "/logos/goldman.png", w: 36, h: 36 },
]

export default function TrustBar() {
  const [contactCount, setContactCount] = useState(0)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    fetch("/api/contacts/count")
      .then((r) => r.json())
      .then((data) => setContactCount(data.count ?? 0))
      .catch(() => setContactCount(0))
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
    if (!started || contactCount <= 0) return
    const duration = 2000
    const steps = 60
    const increment = contactCount / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= contactCount) {
        setCount(contactCount)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, contactCount])

  return (
    <section ref={ref} className="bg-gray-100 py-10 px-6 border-t border-b border-gray-200">
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {companies.map((co, i) => (
              <div
                key={co.id}
                className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-white flex items-center justify-center"
                style={{ zIndex: 5 - i }}
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
            {contactCount > 0 ? (
              <>
                <span className="font-bold text-gray-900 tabular-nums">
                  {count.toLocaleString()}
                </span>
                {" "}contacts entrusted to Sckry
              </>
            ) : (
              "Trusted by teams everywhere"
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
