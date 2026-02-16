export default function DemoSection() {
  return (
    <section id="demo" className="bg-gray-100 py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          See Sckry in action
        </h2>
        <p className="text-gray-500 mb-12 max-w-lg mx-auto text-base">
          Watch how Sckry transforms the way you manage and leverage your professional network.
        </p>
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg bg-gray-100">
          <img
            src="https://sat3peltpqobrnds.public.blob.vercel-storage.com/demo.gif"
            alt="Sckry demo — ask questions about your network and see it visualized"
            className="w-full h-auto block"
            style={{ imageRendering: "auto", WebkitFontSmoothing: "antialiased" }}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
