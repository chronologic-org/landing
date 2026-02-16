"use client"

import { useState, useEffect, useRef } from "react"

interface Props {
  onSubmit: (query: string) => void
}

const queries = [
  "Who do I know that works in marketing?",
  "Who are the investors in my network?",
  "Find me connections at Google",
  "Who's hiring in AI right now?",
  "Introduce me to someone in healthcare",
]

export default function QueryInput({ onSubmit }: Props) {
  const [value, setValue] = useState("")
  const [placeholder, setPlaceholder] = useState("|")
  const cancelledRef = useRef(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Cycling placeholder — only runs when value is empty
  useEffect(() => {
    if (value !== "") {
      setPlaceholder("|")
      return
    }

    cancelledRef.current = false
    const timeouts = timeoutsRef.current
    timeouts.length = 0
    let cancelled = false

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms)
        timeouts.push(id)
      })

    let queryIndex = 0
    const run = async () => {
      await sleep(600)

      while (!cancelled) {
        const query = queries[queryIndex]

        for (let i = 1; i <= query.length; i++) {
          if (cancelled) return
          setPlaceholder(query.slice(0, i) + "|")
          await sleep(45)
          if (cancelled) return
        }

        setPlaceholder(query + "|")
        await sleep(2200)
        if (cancelled) return

        for (let i = query.length - 1; i >= 0; i--) {
          if (cancelled) return
          setPlaceholder(query.slice(0, i) + "|")
          await sleep(25)
          if (cancelled) return
        }

        setPlaceholder("|")
        await sleep(400)
        if (cancelled) return

        queryIndex = (queryIndex + 1) % queries.length
      }
    }

    run()
    return () => {
      cancelled = true
      cancelledRef.current = true
      timeouts.forEach(clearTimeout)
    }
  }, [value === "" ? "empty" : "filled"])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onSubmit(value)
    }
  }

  const handleClear = () => {
    setValue("")
    onSubmit("")
  }

  return (
    <div
      className="relative rounded-full px-5 py-4 md:px-7 md:py-6 flex items-center gap-3 md:gap-4 w-full transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:scale-[1.01] cursor-text"
      style={{
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(0,0,0,0.12)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="bg-transparent outline-none flex-1 text-base"
        style={{
          fontFamily: '"HelveticaNeueLTPro-Bd", "Helvetica Neue", Helvetica, Arial, sans-serif',
          caretColor: "#5885ec",
          color: "rgba(0,0,0,0.85)",
          fontWeight: 400,
        }}
      />
      {value && (
        <button
          onClick={handleClear}
          className="flex items-center justify-center w-6 h-6 rounded-full transition-colors hover:bg-black/10"
          style={{ color: "rgba(0,0,0,0.4)" }}
          aria-label="Clear search"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
