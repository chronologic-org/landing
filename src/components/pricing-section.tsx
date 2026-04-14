"use client"

import { useFadeUp } from "@/lib/hooks"

const APP_URL = "https://app.sckry.com"

const plans = [
  {
    id: "individual",
    name: "Individual",
    price: "$14",
    period: "/mo",
    subtitle: "2-week free trial included",
    features: [
      "Unlimited searches",
      "Network graph visualization",
      "AI-powered relationship queries",
      "Contact enrichment",
      "CSV exports",
      "Email + calendar sync",
    ],
    cta: "Start Free Trial",
    href: APP_URL,
    highlighted: false,
  },
  {
    id: "business",
    name: "Business",
    price: "$35",
    period: "/mo",
    subtitle: "Per seat, billed monthly",
    features: [
      "Everything in Individual",
      "Team-shared network graph",
      "Collaborative notes & context",
      "CRM integrations",
      "Priority support",
      "Admin controls & audit log",
    ],
    cta: "Get Started",
    href: APP_URL,
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    subtitle: "Tailored for your organization",
    features: [
      "Everything in Business",
      "White-labeling",
      "API access",
      "Custom integrations",
      "Dedicated success manager",
      "SLA & compliance support",
    ],
    cta: "Contact Us",
    href: "https://calendly.com/raeedz/chronologic",
    highlighted: false,
    external: true,
  },
]

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 stroke-[#5885ec] transition-colors duration-200 group-hover/feat:stroke-[#4A6CF7]"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function PlanCard({ plan, fadeRef, fadeStyle }: { plan: typeof plans[0]; fadeRef: React.RefObject<HTMLDivElement | null>; fadeStyle: React.CSSProperties }) {
  return (
    <div
      ref={fadeRef}
      style={{
        ...fadeStyle,
        ...(plan.highlighted
          ? { border: "2px solid #4A6CF7", boxShadow: "0 0 0 4px rgba(74,108,247,0.07), 0 8px 32px rgba(74,108,247,0.13)" }
          : {}),
      }}
      className={`relative rounded-2xl p-8 text-left flex flex-col h-full ${
        plan.highlighted ? "bg-white" : "bg-white border border-gray-200 shadow-sm"
      }`}
    >
      {plan.highlighted && (
        <span
          className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase text-[#4A6CF7]"
          style={{ backgroundColor: "rgba(74,108,247,0.1)", fontFamily: "'Geist', sans-serif" }}
        >
          POPULAR
        </span>
      )}

      <p
        className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3"
        style={{ fontFamily: "'Geist', sans-serif" }}
      >
        {plan.name}
      </p>

      <div className="flex items-end gap-1 mb-1">
        <span
          className="text-5xl font-bold tracking-tight"
          style={{
            fontFamily: "'Geist', sans-serif",
            color: plan.highlighted ? "#4A6CF7" : "#111827",
          }}
        >
          {plan.price}
        </span>
        {plan.period && (
          <span className="text-gray-400 text-base mb-1.5" style={{ fontFamily: "'Geist', sans-serif" }}>
            {plan.period}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-8" style={{ fontFamily: "'Geist', sans-serif" }}>
        {plan.subtitle}
      </p>

      <ul className="space-y-3.5 mb-8 flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="group/feat flex items-start gap-2.5 text-sm text-gray-600 cursor-default" style={{ fontFamily: "'Geist', sans-serif" }}>
            <CheckIcon />
            {feat}
          </li>
        ))}
      </ul>

      <a
        href={plan.href}
        {...(plan.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`block text-center py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 ${
          plan.highlighted
            ? "btn-primary text-white hover:opacity-90"
            : "btn-ghost text-gray-700 hover:bg-black/5"
        }`}
        style={{
          fontFamily: "'Geist', sans-serif",
          ...(plan.highlighted
            ? { backgroundColor: "#4A6CF7" }
            : { border: "1.5px solid rgba(0,0,0,0.15)" }),
        }}
      >
        {plan.cta}
      </a>
    </div>
  )
}

export default function PricingSection() {
  const f0 = useFadeUp(0)
  const f1 = useFadeUp(100)
  const f2 = useFadeUp(200)
  const fades = [f0, f1, f2]

  return (
    <section id="pricing" className="bg-gray-50 pt-24 pb-28 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
          style={{ fontFamily: "'Unbounded', sans-serif" }}
        >
          Simple, transparent pricing
        </h2>
        <p
          className="text-gray-500 mb-14 max-w-lg mx-auto text-2xl font-light"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          Start with a 2-week free trial. No credit card required.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} fadeRef={fades[i].ref} fadeStyle={fades[i].style} />
          ))}
        </div>
      </div>
    </section>
  )
}
