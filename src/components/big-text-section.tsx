"use client"

export default function BigTextSection() {
    return (
        <section className="relative bg-gray-100 w-full min-h-screen flex items-center overflow-hidden">
            <div className="w-full px-5 md:px-16 lg:px-24 py-16 md:py-24">
                <h2
                    className="text-left leading-[0.92] md:leading-[0.9] tracking-tighter text-gray-900 font-bold"
                    style={{
                        fontFamily: '"HelveticaNeueLTPro-Bd", "Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontSize: "clamp(13vw, 12vw, 14rem)",
                    }}
                >
                    everyone<br />
                    you have<br />
                    ever known<br />
                    <span className="text-gray-300">in </span>
                    <a
                        href="https://app.sckry.com"
                        className="text-gray-300 underline decoration-[#5885ec] underline-offset-8 hover:text-[#5885ec] transition-colors duration-200"
                    >
                        one place
                    </a>
                    <span className="text-gray-300">.</span>
                </h2>
            </div>
        </section>
    )
}
