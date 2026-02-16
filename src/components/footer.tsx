export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 items-start">
        {/* Left: Logo + tagline */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <svg width="24" height="24" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#footer-clip)">
                <path d="M96 96L122.93 3.85L140.64 11.01Z" fill="#4a90e2" />
                <path d="M96 96L85.61 0.56L104.72 0.4Z" fill="#4a90e2" />
                <path d="M96 96L0.56 106.39L0.4 87.28Z" fill="#4a90e2" />
                <path d="M96 96L11.8 142.12L4.34 124.53Z" fill="#4a90e2" />
                <path d="M96 96L35.86 170.83L22.23 157.44Z" fill="#4a90e2" />
                <path d="M96 96L69.07 188.15L51.36 180.99Z" fill="#4a90e2" />
                <path d="M96 96L106.39 191.44L87.28 191.6Z" fill="#4a90e2" />
                <path d="M96 96L191.44 85.61L191.6 104.72Z" fill="#4a90e2" />
                <path d="M96 96L180.2 49.88L187.66 67.47Z" fill="#4a90e2" />
                <path d="M96 96L156.14 21.17L169.77 34.56Z" fill="#4a90e2" />
              </g>
              <defs>
                <clipPath id="footer-clip"><rect width="192" height="192" /></clipPath>
              </defs>
            </svg>
            <span className="font-normal text-lg tracking-tight">sckry</span>
          </div>
          <p className="text-gray-500 text-sm">
            Your professional network, visualized and searchable.
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex flex-col gap-2.5 text-sm">
          <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
          <a
            href="https://calendly.com/raeedz/chronologic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Right: Auth buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
          <a
            href="https://app.sckry.com/login"
            className="text-sm text-white/80 hover:text-white transition-colors px-5 py-2 rounded-xl font-medium text-center"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            Log In
          </a>
          <a href="https://app.sckry.com/signup" className="text-sm text-white bg-[#5885ec] hover:bg-[#4a74d4] transition-colors px-5 py-2 rounded-xl font-bold text-center">
            Sign Up
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} sckry. All rights reserved.
      </div>
    </footer>
  )
}
