import { useEffect, useRef, useState } from "react"

/**
 * Reveals an element with a fade-up transition when it enters the viewport.
 * Uses IntersectionObserver + CSS transitions (interruptible, per Emil philosophy).
 */
export function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 600ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms, transform 600ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
    } as React.CSSProperties,
  }
}
