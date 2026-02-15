"use client"

export default function BigTextSection() {
    return (
        <section className="relative bg-gray-100 w-full min-h-screen flex items-center overflow-hidden">
            <div className="w-full max-w-[90vw] px-8 md:px-16 lg:px-24 py-24">
                <h2
                    className="text-left leading-[0.9] tracking-tighter text-gray-900 font-bold"
                    style={{
                        fontFamily: '"HelveticaNeueLTPro-Bd", "Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontSize: "clamp(4rem, 12vw, 14rem)",
                    }}
                >
                    everyone<br />
                    you have<br />
                    ever known<br />
                    <span className="text-gray-300">in one place.</span>
                </h2>
            </div>
        </section>
    )
}
