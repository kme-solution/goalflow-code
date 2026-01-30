import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "VP of People Operations",
    company: "TechCorp",
    avatar: "SJ",
    rating: 5,
    text: "GoalFlow Pro transformed how we manage performance. Our team engagement increased by 40% in just 3 months. The recognition features are a game-changer.",
  },
  {
    name: "Michael Chen",
    role: "Head of HR",
    company: "Innovate Labs",
    avatar: "MC",
    rating: 5,
    text: "Finally, a performance management tool that people actually enjoy using. The mobile-first approach means our remote team stays connected and aligned.",
  },
  {
    name: "Emily Rodriguez",
    role: "Chief People Officer",
    company: "GrowthCo",
    avatar: "ER",
    rating: 5,
    text: "The analytics and insights help us make better decisions about talent development. ROI was clear within the first quarter. Highly recommended!",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Loved by <span className="text-primary">teams</span> worldwide
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            See what HR leaders and team managers are saying about GoalFlow Pro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-[#8b5cf6] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
