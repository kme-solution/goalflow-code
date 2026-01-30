import { Target, Users, TrendingUp, Award, BarChart3, MessageSquare } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Goal Alignment",
    description: "Connect individual goals to company objectives with cascading OKRs and transparent tracking.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Award,
    title: "Recognition & Rewards",
    description: "Celebrate wins with peer-to-peer recognition tied to your company values and culture.",
    color: "text-[#f59e0b]",
    bgColor: "bg-[#f59e0b]/10",
  },
  {
    icon: TrendingUp,
    title: "Performance Reviews",
    description: "Streamline reviews with continuous feedback, self-assessments, and 360-degree insights.",
    color: "text-[#10b981]",
    bgColor: "bg-[#10b981]/10",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Foster teamwork with shared goals, cross-functional visibility, and collaborative check-ins.",
    color: "text-[#8b5cf6]",
    bgColor: "bg-[#8b5cf6]/10",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Make data-driven decisions with real-time dashboards and predictive performance analytics.",
    color: "text-[#d946ef]",
    bgColor: "bg-[#d946ef]/10",
  },
  {
    icon: MessageSquare,
    title: "Continuous Feedback",
    description: "Enable real-time feedback loops that replace annual reviews with ongoing conversations.",
    color: "text-[#06b6d4]",
    bgColor: "bg-[#06b6d4]/10",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything you need to drive <span className="text-primary">performance</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            A complete platform that brings strategy, recognition, and growth together in one seamless experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
