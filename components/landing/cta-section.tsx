import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section id="cta-section" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-primary via-[#8b5cf6] to-[#d946ef] rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Ready to transform your team's performance?
          </h2>
          <p className="text-xl text-white/90 mb-8 text-balance">
            Start your 14-day free trial today. No credit card required. Cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-lg">
              <Link href="/register">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 bg-transparent"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
          <p className="text-sm text-white/80 mt-6">Join 500+ teams already using GoalFlow Pro</p>
        </div>
      </div>
    </section>
  )
}
