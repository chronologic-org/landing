"use client"

import { useEffect, useRef, useState } from "react"

function useAnimatedCount(target: number, duration = 2000) {
    const [count, setCount] = useState(0)
    const rafRef = useRef<number | null>(null)

    useEffect(() => {
        if (target <= 0) return

        const start = performance.now()

        function easeOutCubic(t: number) {
            return 1 - Math.pow(1 - t, 3)
        }

        function tick(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = easeOutCubic(progress)
            setCount(Math.floor(eased * target))

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick)
            } else {
                setCount(target)
            }
        }

        rafRef.current = requestAnimationFrame(tick)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [target, duration])

    return count
}

export default function TrustBar() {
    const [contactCount, setContactCount] = useState(0)
    const animatedCount = useAnimatedCount(contactCount)

    useEffect(() => {
        fetch("/api/contacts/count")
            .then((r) => r.json())
            .then((data) => setContactCount(data.count ?? 0))
            .catch(() => setContactCount(0))
    }, [])

    return (
        <section className="bg-gray-100 py-8 px-6 border-t border-b border-gray-200">
            <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
                <div className="flex -space-x-2">
                    {/* Google */}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center" style={{ zIndex: 5 }}>
                        <svg width="16" height="16" viewBox="0 0 48 48">
                            <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.6 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 4.1 29.6 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.2-2.7-.5-4z"/>
                            <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16 19.1 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                            <path fill="#FBBC05" d="M24 44c5.4 0 10.2-1.8 14-4.9l-6.8-5.6C29 35.3 26.6 36 24 36c-6 0-11.1-4-12.9-9.5l-7 5.4C7.6 38.1 15.2 44 24 44z"/>
                            <path fill="#EA4335" d="M44 24c0-1.3-.2-2.7-.5-4H24v8.5h11.7c-.5 2.7-2 5-4.2 6.6l6.8 5.6C42.1 37.4 44 31.1 44 24z"/>
                        </svg>
                    </div>
                    {/* Microsoft */}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center" style={{ zIndex: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 21 21">
                            <rect fill="#F25022" x="0" y="0" width="10" height="10"/>
                            <rect fill="#7FBA00" x="11" y="0" width="10" height="10"/>
                            <rect fill="#00A4EF" x="0" y="11" width="10" height="10"/>
                            <rect fill="#FFB900" x="11" y="11" width="10" height="10"/>
                        </svg>
                    </div>
                    {/* Goldman Sachs */}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-[#7399C6] flex items-center justify-center" style={{ zIndex: 3 }}>
                        <svg width="16" height="16" viewBox="0 0 32 32">
                            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14" fontFamily="Georgia, serif" fontWeight="bold">GS</text>
                        </svg>
                    </div>
                    {/* Apple */}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-black flex items-center justify-center" style={{ zIndex: 2 }}>
                        <svg width="14" height="14" viewBox="0 0 384 512">
                            <path fill="white" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-62.1 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                        </svg>
                    </div>
                    {/* Amazon */}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-[#232F3E] flex items-center justify-center" style={{ zIndex: 1 }}>
                        <svg width="16" height="16" viewBox="-30 -2 70 24">
                            <path fill="#FF9900" d="M27.3 12.5c-6.2 4.6-15.2 7-22.9 7-10.8 0-20.6-4-28-10.7-.6-.5-.1-1.2.6-.8 8 4.6 17.8 7.4 28 7.4 6.9 0 14.4-1.4 21.3-4.4 1-.5 1.9.7.9 1.5z"/>
                            <path fill="#FF9900" d="M29.8 9.7c-.8-1-5.2-.5-7.2-.2-.6.1-.7-.5-.2-.8 3.5-2.5 9.3-1.8 10-.9.7.8-.2 6.6-3.5 9.3-.5.4-1 .2-.8-.3.7-1.9 2.4-6.1 1.6-7.1z"/>
                        </svg>
                    </div>
                </div>
                {contactCount > 0 ? (
                    <p className="text-gray-700 text-sm md:text-base tracking-tight">
                        <span className="font-bold text-gray-900 tabular-nums">
                            {animatedCount.toLocaleString()}
                        </span>
                        {" "}contacts entrusted to Sckry
                    </p>
                ) : (
                    <p className="text-gray-700 text-sm md:text-base tracking-tight">
                        Trusted by teams everywhere
                    </p>
                )}
            </div>
        </section>
    )
}
