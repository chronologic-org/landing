"use client"

import { useState } from "react"

const APP_URL = "https://app.sckry.com"

const freePlan = {
  name: "Free",
  price: "$0",
  subtitle: "Forever free",
  features: [
    "5 searches per hour",
    "Network graph visualization",
    "Industry clustering view",
    "Add contacts with photo parsing",
    "Unlimited Tags",
    "Unlimited inter-network connections",
  ],
  cta: "Get Started",
  href: APP_URL,
  highlighted: true,
}

const proPlan = {
  name: "Pro",
  monthly: { price: "$30", period: "/month", subtitle: "14-day free trial, then billed monthly" },
  yearly: { price: "$25", period: "/month", subtitle: "14-day free trial, then billed yearly" },
  features: [
    "Everything in Free",
    "25x More Searches",
    "Improved AI-powered search",
    "Unlimited CSV downloads",
    "Advanced network insights",
  ],
  cta: "Start Free 14-Day Trial",
  href: APP_URL,
  highlighted: true,
  badge: "POPULAR",
}

const enterprisePlan = {
  name: "Enterprise",
  price: "Custom",
  subtitle: "Tailored for your team",
  features: [
    "Everything in Pro",
    "Unlimited everything",
    "Priority support",
    "White-labeling",
    "Custom integrations",
    "API access",
  ],
  cta: "Contact Us",
  href: "https://calendly.com/raeedz/chronologic",
  external: true,
  highlighted: false,
}

function CheckIcon({ color = "#5885ec" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const pro = billing === "yearly" ? proPlan.yearly : proPlan.monthly

  return (
    <section id="pricing" className="bg-gray-50 pt-20 pb-28 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Simple, transparent pricing
        </h2>
        <p className="text-gray-500 mb-14 max-w-lg mx-auto text-base">
          Start free and scale as your network grows.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {/* Free */}
          <div className="rounded-2xl p-8 text-left flex flex-col bg-white border border-gray-200 shadow-sm h-full">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">{freePlan.name}</h3>
            <div className="mt-2 mb-1">
              <span className="text-4xl font-bold text-gray-900 tracking-tight">{freePlan.price}</span>
            </div>
            <p className="text-sm text-gray-400 mb-8">{freePlan.subtitle}</p>
            <ul className="space-y-4 mb-8 flex-1">
              {freePlan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={freePlan.href}
              className="block text-center py-3 rounded-xl font-bold text-sm bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors tracking-wide"
            >
              {freePlan.cta}
            </a>
          </div>

          {/* Pro */}
          <div className="relative rounded-2xl p-8 text-left flex flex-col bg-[#5885ec] text-white shadow-xl h-full">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">👑</span>
              <h3 className="text-lg font-bold tracking-tight">Pro</h3>
            </div>
            <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              POPULAR
            </span>
            <div className="mt-2 mb-1">
              <span className="text-4xl font-bold tracking-tight">{pro.price}</span>
              <span className="text-white/70 text-sm">{pro.period}</span>
            </div>
            <p className="text-sm text-white/60 mb-5">{pro.subtitle}</p>

            {/* Billing toggle */}
            <div className="flex items-center gap-1 mb-6 bg-white/15 rounded-full p-1 w-fit">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${billing === "monthly" ? "bg-white text-[#5885ec]" : "text-white/70 hover:text-white"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${billing === "yearly" ? "bg-white text-[#5885ec]" : "text-white/70 hover:text-white"}`}
              >
                Yearly
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${billing === "yearly" ? "bg-green-100 text-green-700" : "bg-green-500/30 text-green-200"}`}>
                  Save 17%
                </span>
              </button>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {proPlan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/90">
                  <CheckIcon color="#ffffff" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={proPlan.href}
              className="block text-center py-3.5 rounded-xl font-bold text-sm bg-white text-[#5885ec] hover:bg-gray-100 transition-colors tracking-wide"
            >
              {proPlan.cta}
            </a>
          </div>

          {/* Enterprise */}
          <div className="rounded-2xl p-8 text-left flex flex-col bg-white border border-gray-200 shadow-sm h-full">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🏢</span>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">{enterprisePlan.name}</h3>
            </div>
            <div className="mt-2 mb-1">
              <span className="text-4xl font-bold text-gray-900 tracking-tight">{enterprisePlan.price}</span>
            </div>
            <p className="text-sm text-gray-400 mb-8">{enterprisePlan.subtitle}</p>
            <ul className="space-y-4 mb-8 flex-1">
              {enterprisePlan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={enterprisePlan.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 rounded-xl font-bold text-sm bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors tracking-wide"
            >
              {enterprisePlan.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
