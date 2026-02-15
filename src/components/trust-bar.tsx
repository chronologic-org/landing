"use client"

import { useEffect, useState } from "react"

export default function TrustBar() {
    const [count, setCount] = useState(0)
    const target = 12847

    useEffect(() => {
        // Animate counting up
        const duration = 2000
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="bg-gray-100 py-8 px-6 border-t border-gray-200">
            <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                    {/* Stacked avatar circles */}
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="w-8 h-8 rounded-full border-2 border-white"
                                style={{
                                    background: `hsl(${200 + i * 30}, 60%, ${55 + i * 5}%)`,
                                    zIndex: 6 - i,
                                }}
                            />
                        ))}
                    </div>
                </div>
                <p className="text-gray-700 text-sm md:text-base tracking-tight">
                    <span className="font-bold text-gray-900 tabular-nums">
                        {count.toLocaleString()}
                    </span>
                    {" "}contacts entrusted to sckry
                </p>
            </div>
        </section>
    )
}
