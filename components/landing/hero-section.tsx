import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Trust Badges */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#818cf8] to-[#4f46e5] rounded-full border-2 border-background" />
                <div className="w-8 h-8 bg-gradient-to-r from-[#34d399] to-[#10b981] rounded-full border-2 border-background" />
                <div className="w-8 h-8 bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] rounded-full border-2 border-background" />
                <div className="w-8 h-8 bg-gradient-to-r from-[#e879f9] to-[#d946ef] rounded-full border-2 border-background" />
              </div>
              <span className="text-sm text-muted-foreground ml-2">Trusted by 500+ teams worldwide</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Where <span className="text-primary">Strategy</span> Meets{" "}
              <span className="text-[#f59e0b]">Recognition</span> & <span className="text-[#10b981]">Growth</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-8 text-balance leading-relaxed">
              Align your team, recognize achievements, and drive performance—all in one mobile-first platform. Connect
              daily work to company goals with real-time feedback and meaningful growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg">
                <Link href="/register">Start Free Trial - 14 Days</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 gap-2 bg-transparent">
                <Play className="w-5 h-5" />
                Watch 2-min Demo
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card rounded-lg border border-border shadow-sm">
                <div className="text-2xl font-bold text-primary">3.2x</div>
                <div className="text-sm text-muted-foreground">Average ROI</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border shadow-sm">
                <div className="text-2xl font-bold text-[#10b981]">94%</div>
                <div className="text-sm text-muted-foreground">Upgrade Rate</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border shadow-sm">
                <div className="text-2xl font-bold text-[#d946ef]">25%</div>
                <div className="text-sm text-muted-foreground">Goal Completion Boost</div>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="bg-card rounded-2xl shadow-2xl p-6 border border-border animate-float">
              {/* Dashboard Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#10b981] rounded-full animate-pulse" />
                  <span className="font-semibold">Live Dashboard</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-[#f59e0b] rounded-full" />
                  <div className="w-2 h-2 bg-[#10b981] rounded-full" />
                  <div className="w-2 h-2 bg-[#8b5cf6] rounded-full" />
                </div>
              </div>

              {/* Goals Progress */}
              <div className="mb-6">
                <h3 className="font-semibold text-muted-foreground mb-3">Team Goals Progress</h3>
                <div className="space-y-4">
                  {/* Goal 1 */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Increase User Engagement</span>
                      <span className="font-semibold text-[#10b981]">85%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full gradient-success rounded-full" style={{ width: "85%" }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>
                        Confidence: <span className="font-semibold text-[#10b981]">High</span>
                      </span>
                      <span>Due: 2 weeks</span>
                    </div>
                  </div>

                  {/* Goal 2 */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Improve API Response Time</span>
                      <span className="font-semibold text-[#f59e0b]">65%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full gradient-encourage rounded-full" style={{ width: "65%" }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>
                        Confidence: <span className="font-semibold text-[#f59e0b]">Medium</span>
                      </span>
                      <span>Due: 1 month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recognition Feed */}
              <div className="mb-6">
                <h3 className="font-semibold text-muted-foreground mb-3">Recent Recognition</h3>
                <div className="space-y-3">
                  {/* Recognition 1 */}
                  <div className="flex items-start space-x-3 p-3 bg-[#ecfdf5] dark:bg-[#064e3b]/20 rounded-lg border border-[#a7f3d0] dark:border-[#064e3b]">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#34d399] to-[#10b981] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">S</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Great presentation to clients!</div>
                      <div className="text-sm text-muted-foreground">From Sarah to David • 2 hours ago</div>
                      <span className="inline-block px-2 py-1 bg-[#d1fae5] dark:bg-[#065f46] text-[#065f46] dark:text-[#d1fae5] text-xs rounded-full mt-1">
                        Quality
                      </span>
                    </div>
                  </div>

                  {/* Recognition 2 */}
                  <div className="flex items-start space-x-3 p-3 bg-[#f5f3ff] dark:bg-[#4c1d95]/20 rounded-lg border border-[#ddd6fe] dark:border-[#4c1d95]">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">M</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Innovative solution to scaling issue</div>
                      <div className="text-sm text-muted-foreground">From Mike to Lisa • 5 hours ago</div>
                      <span className="inline-block px-2 py-1 bg-[#ede9fe] dark:bg-[#5b21b6] text-[#5b21b6] dark:text-[#ede9fe] text-xs rounded-full mt-1">
                        Innovation
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-between gap-2">
                <Button
                  variant="secondary"
                  className="flex-1 bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
                >
                  Give Recognition
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20 dark:bg-[#10b981]/20 dark:hover:bg-[#10b981]/30"
                >
                  Update Progress
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
