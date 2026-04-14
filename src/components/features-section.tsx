"use client"

import { useFadeUp } from "@/lib/hooks"

const features = [
  {
    id: "search",
    headline: "Ask your network anything.",
    colorA: "#4A6CF7",
    colorB: "#7C9EFA",
  },
  {
    id: "remember",
    headline: "Remember the context.",
    colorA: "#7C3AED",
    colorB: "#A78BFA",
  },
  {
    id: "met",
    headline: "Never forget how you met.",
    colorA: "#059669",
    colorB: "#34D399",
  },
]

function VennIcon({ colorA, colorB }: { colorA: string; colorB: string }) {
  return (
    <div className="venn-icon flex items-center justify-center" style={{ width: 56, height: 40 }}>
      <svg width="56" height="40" viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
        <circle
          className="venn-l"
          cx="20"
          cy="20"
          r="16"
          fill={colorA}
          fillOpacity="0.55"
          style={{ transformOrigin: "20px 20px" }}
        />
        <circle
          className="venn-r"
          cx="36"
          cy="20"
          r="16"
          fill={colorB}
          fillOpacity="0.55"
          style={{ transformOrigin: "36px 20px" }}
        />
      </svg>
    </div>
  )
}

export default function FeaturesSection() {
  const f0 = useFadeUp(0)
  const f1 = useFadeUp(120)
  const f2 = useFadeUp(240)
  const fadeUps = [f0, f1, f2]

  return (
    <section id="features" className="bg-gray-100 pt-24 pb-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 md:gap-14">
          {features.map((f, i) => {
            const { ref, style } = fadeUps[i]
            return (
              <div
                key={f.id}
                ref={ref}
                style={style}
                className="flex flex-col items-center text-center py-10 md:py-0"
              >
                <VennIcon colorA={f.colorA} colorB={f.colorB} />
                <h3
                  className="mt-6 text-gray-900 font-bold leading-tight tracking-tight"
                  style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  }}
                >
                  {f.headline}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
