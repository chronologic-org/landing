"use client"

import QueryInput from "./query-input"

export default function TryItSection() {


    return (
        <section id="try-it" className="bg-white py-14 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
                    Explore your network in real time
                </h2>

                <div
                    className="max-w-xl mx-auto cursor-pointer"
                    onClick={() => window.location.href = 'https://app.sckry.com'}
                >
                    <div className="pointer-events-none">
                        <QueryInput onSubmit={() => { }} />
                    </div>
                </div>
            </div>
        </section>
    )
}
