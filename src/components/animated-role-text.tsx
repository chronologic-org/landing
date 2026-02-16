"use client"

import { useEffect, useRef } from "react"

const roles = ["Founder", "Executive", "Marketer", "Recruiter", "Investor", "Student", "Consultant", "Advisor"]

interface Props {
  onRoleChange: (role: string) => void
}

export default function AnimatedRoleText({ onRoleChange }: Props) {
  const callbackRef = useRef(onRoleChange)
  callbackRef.current = onRoleChange

  useEffect(() => {
    let cancelled = false
    let roleIndex = 0
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms)
        timeouts.push(id)
      })

    const run = async () => {
      // Show first word immediately
      callbackRef.current(roles[0])

      while (!cancelled) {
        await sleep(1500)
        if (cancelled) return

        const currentWord = roles[roleIndex]

        // Delete character by character
        for (let i = currentWord.length - 1; i >= 0; i--) {
          if (cancelled) return
          callbackRef.current(currentWord.slice(0, i) || " ")
          await sleep(55)
          if (cancelled) return
        }

        // Move to next word
        roleIndex = (roleIndex + 1) % roles.length
        const nextWord = roles[roleIndex]

        await sleep(200)
        if (cancelled) return

        // Type character by character
        for (let i = 1; i <= nextWord.length; i++) {
          if (cancelled) return
          callbackRef.current(nextWord.slice(0, i))
          await sleep(65)
          if (cancelled) return
        }
      }
    }

    run()

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return null
}
