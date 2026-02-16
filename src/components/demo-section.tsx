export default function DemoSection() {
  return (
    <section id="demo" className="bg-gray-100 pt-16 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          See Sckry in action
        </h2>
        <p className="text-gray-500 mb-12 max-w-lg mx-auto text-base">
          Watch how Sckry transforms the way you manage and leverage your professional network.
        </p>
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg bg-gray-100 mb-12">
          <img
            src="/demo%20(1).gif"
            alt="Sckry demo — ask questions about your network and see it visualized"
            className="w-full h-auto block"
            style={{ imageRendering: "auto", WebkitFontSmoothing: "antialiased" }}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="https://app.sckry.com"
            className="group relative px-14 py-5 rounded-full bg-white/60 backdrop-blur-md border border-black/10 text-[#5885ec] text-2xl md:text-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:bg-[#5885ec] hover:text-white hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(88,133,236,0.3)] hover:border-[#5885ec] tracking-tighter font-bold"
            style={{
              fontFamily: '"HelveticaNeueLTPro-Bd", "Helvetica Neue", Helvetica, Arial, sans-serif'
            }}
          >
            Try Sckry for free
          </a>
        </div>
      </div>
    </section>
  )
}
