"use client"

import { useFadeUp } from "@/lib/hooks"

// Layout constants — keep in sync with the platform icon size/gap
const ICON_H = 76
const GAP = 20
const SVG_W = 110
const SVG_H = ICON_H * 3 + GAP * 2 // 268
const MID_Y = SVG_H / 2             // 134 — vertical center (Sckry node)
const IC_Y = [
  ICON_H / 2,                               // 38  (LinkedIn)
  ICON_H + GAP + ICON_H / 2,                // 134 (X)
  ICON_H * 2 + GAP * 2 + ICON_H / 2,        // 230 (Instagram)
]

const platforms = [
  {
    id: "linkedin",
    bg: "#E8F0FE",
    boxOffset: -20,
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "twitter",
    bg: "#F2F2F2",
    boxOffset: -55,
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#0F0F0F">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    bg: "#FDF0F7",
    boxOffset: 10,
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="ig-flow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <path fill="url(#ig-flow)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
]

function FlowConnector() {
  return (
    <svg
      width={SVG_W}
      height={SVG_H}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      style={{ flexShrink: 0, overflow: "visible" }}
      aria-hidden="true"
    >
      {/* Dashed track lines */}
      {IC_Y.map((y, i) => (
        <path
          key={`track-${i}`}
          d={`M0,${MID_Y} L${SVG_W},${y}`}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          opacity="0.65"
        />
      ))}

      {/* Dots: Sckry → platform (bright, crisp) */}
      {IC_Y.map((y, i) => (
        <circle key={`out-${i}`} r="3" fill="#4A6CF7" opacity="0.85">
          <animateMotion
            dur="2.6s"
            begin={`${i * 0.75}s`}
            repeatCount="indefinite"
            path={`M0,${MID_Y} L${SVG_W},${y}`}
          />
        </circle>
      ))}

      {/* Dots: platform → Sckry (dimmer, slightly slower) */}
      {IC_Y.map((y, i) => (
        <circle key={`in-${i}`} r="2.5" fill="#4A6CF7" opacity="0.35">
          <animateMotion
            dur="3.0s"
            begin={`${i * 0.9 + 1.3}s`}
            repeatCount="indefinite"
            path={`M${SVG_W},${y} L0,${MID_Y}`}
          />
        </circle>
      ))}
    </svg>
  )
}

export default function IntegrationsSection() {
  const headFade = useFadeUp(0)

  return (
    <section className="bg-gray-100 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Left: copy */}
          <div ref={headFade.ref} style={headFade.style}>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6"
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              Integrate with your current{" "}
              <span className="underline decoration-[2px] underline-offset-[5px] decoration-gray-400 transition-colors duration-200 ease-out hover:text-[#4A6CF7] hover:decoration-[#4A6CF7] cursor-default">
                workflow
              </span>.
            </h2>
            <p
              className="text-gray-500 text-[20px] font-light leading-relaxed max-w-sm"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Sckry automatically picks up signals from the tools you already use, surfacing exactly who you need and how to reach them, without changing how you work.
            </p>
          </div>

          {/* Right: connection diagram */}
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(88,133,236,0.15)",
              boxShadow: "0 4px 24px rgba(74,108,247,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Sckry hub node */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center" style={{ height: SVG_H }}>
                <span
                  className="font-bold text-gray-900 leading-none"
                  style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "1.75rem" }}
                >
                  Sckry
                </span>
              </div>

              {/* Animated flow lines */}
              <FlowConnector />

              {/* Platform icons */}
              <div className="flex-shrink-0 flex flex-col gap-5">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="w-[76px] h-[76px] rounded-2xl flex items-center justify-center transition-transform duration-200 ease-out hover:scale-[1.05] cursor-default"
                    style={{
                      backgroundColor: platform.bg,
                      transform: "boxOffset" in platform && platform.boxOffset ? `translateX(${platform.boxOffset}px)` : undefined,
                    }}
                  >
                    {platform.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
