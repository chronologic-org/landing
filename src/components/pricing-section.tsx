const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    features: [
      "Up to 50 connections",
      "Basic search",
      "Network visualization",
    ],
    cta: "Get Started",
    href: "#",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$30",
    period: "/mo",
    features: [
      "Unlimited connections",
      "AI-powered search",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Start Pro",
    href: "#",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "API access",
      "Dedicated support",
    ],
    cta: "Contact Us",
    href: "https://calendly.com/raeedz/chronologic",
    highlighted: false,
    external: true,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-gray-50 py-28 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Simple, transparent pricing
        </h2>
        <p className="text-gray-500 mb-14 max-w-lg mx-auto text-base">
          Start free and scale as your network grows.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 text-left flex flex-col ${plan.highlighted
                ? "bg-white border-2 border-[#5885ec] shadow-xl"
                : "bg-white border border-gray-200 shadow-sm"
                }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5885ec] text-white text-xs font-bold px-4 py-1 rounded-full tracking-wide">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-base font-bold text-gray-900 mb-2 tracking-tight">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 tracking-tight">{plan.price}</span>
                {plan.period && <span className="text-gray-400 text-sm">{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5885ec" strokeWidth="2.5" className="mt-0.5 shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                {...(plan.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`block text-center py-3 rounded-xl font-bold text-sm transition-colors tracking-wide ${plan.highlighted
                  ? "bg-[#5885ec] text-white hover:bg-[#4a74d4]"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
