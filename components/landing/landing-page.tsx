"use client"

import { useState } from "react"
import { Navigation } from "@/components/landing/navigation"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { PWAInstaller } from "@/components/pwa-installer"
import { LoginModal } from "@/components/auth"

export function LandingPage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Navigation onLoginClick={() => setLoginModalOpen(true)} />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection onLoginClick={() => setLoginModalOpen(true)} />
      <Footer />
      <PWAInstaller />
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </main>
  )
}
