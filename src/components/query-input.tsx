"use client"

import { useState, useEffect } from "react"

interface Props {
  onSubmit: () => void
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

  useEffect(() => {
    let cancelled = false
    let queryIndex = 0
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms)
        timeouts.push(id)
      })

    const run = async () => {
      await sleep(600)

      while (!cancelled) {
        const query = queries[queryIndex]

        // Type
        for (let i = 1; i <= query.length; i++) {
          if (cancelled) return
          setPlaceholder(query.slice(0, i) + "|")
          await sleep(45)
          if (cancelled) return
        }

        // Pause
        setPlaceholder(query + "|")
        await sleep(2200)
        if (cancelled) return

        // Delete
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
      timeouts.forEach(clearTimeout)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onSubmit()
      setValue("")
    }
  }

  return (
    <div
      className="rounded-full px-7 py-6 flex items-center gap-4 w-full transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:scale-[1.01] cursor-text"
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
    </div>
  )
}
