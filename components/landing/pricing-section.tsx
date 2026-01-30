import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "$5",
    period: "per user/month",
    description: "Perfect for small teams getting started with performance management",
    features: [
      "Up to 25 team members",
      "Goal tracking & OKRs",
      "Basic recognition",
      "Performance reviews",
      "Mobile app access",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$12",
    period: "per user/month",
    description: "For growing teams that need advanced features and analytics",
    features: [
      "Unlimited team members",
      "Advanced goal cascading",
      "Custom recognition badges",
      "360-degree feedback",
      "Advanced analytics",
      "API access",
      "Priority support",
      "Custom integrations",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "Tailored solutions for large organizations with specific needs",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom onboarding",
      "Advanced security (SSO, SAML)",
      "Custom analytics & reporting",
      "SLA guarantee",
      "White-label options",
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Simple, transparent <span className="text-primary">pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Choose the plan that fits your team size and needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-card rounded-xl p-8 border ${
                plan.highlighted ? "border-primary shadow-xl ring-2 ring-primary/20" : "border-border shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">{plan.description}</p>
              <Button
                asChild
                className={`w-full mb-6 ${
                  plan.highlighted ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"
                }`}
              >
                <Link href="/register">{plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}</Link>
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
