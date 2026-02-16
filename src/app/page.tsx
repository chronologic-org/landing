"use client"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import TrustBar from "@/components/trust-bar"
import DemoSection from "@/components/demo-section"
import PricingSection from "@/components/pricing-section"
import BigTextSection from "@/components/big-text-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <DemoSection />
      <PricingSection />
      <BigTextSection />
      <Footer />
    </>
  )
}
