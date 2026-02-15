export default function DemoSection() {
  return (
    <section id="demo" className="bg-gray-100 py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          See sckry in action
        </h2>
        <p className="text-gray-500 mb-12 max-w-lg mx-auto text-base">
          Watch how sckry transforms the way you manage and leverage your professional network.
        </p>
        <div className="aspect-video rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
          <div className="text-gray-400 flex flex-col items-center gap-3">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span className="text-sm">Demo video coming soon</span>
          </div>
        </div>
      </div>
    </section>
  )
}
