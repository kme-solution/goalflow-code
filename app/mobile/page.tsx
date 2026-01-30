import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { Layout } from "@/components/layout"
import { Target, Award, TrendingUp, Calendar, MessageSquare, CheckCircle, Plus, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function MobileHomePage() {
  return (
    <Layout>
      <div className="space-y-6 pb-24 md:pb-6">
        <DashboardHeader title="Today" description="Your daily overview" />

        {/* Today View - Mobile Optimized */}
        <div className="grid gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Today's Priority</h3>
              <Button size="sm" variant="ghost" className="h-8">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Complete dashboard wireframes</p>
                  <p className="text-xs text-muted-foreground">Due today • High priority</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <Calendar className="w-5 h-5 text-encourage flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">1:1 with Manager</p>
                  <p className="text-xs text-muted-foreground">Today at 2:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                <Target className="w-5 h-5 text-destructive flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Blocker: API documentation</p>
                  <p className="text-xs text-muted-foreground">Waiting on backend team</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions Bar - Mobile Optimized */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button className="h-auto py-4 flex-col gap-2">
                <Award className="w-5 h-5" />
                <span className="text-xs">Recognize</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <Target className="w-5 h-5" />
                <span className="text-xs">Update Goal</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs">Check-in</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs">Team Pulse</span>
              </Button>
            </div>
          </Card>

          {/* My Goals - Mobile Optimized */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">My Goals</h3>
              <Button size="sm" variant="ghost" className="h-8 text-xs">
                View All
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { title: "React Workshop", progress: 90, dueIn: "3 days", confidence: "high" },
                { title: "Dashboard Redesign", progress: 75, dueIn: "12 days", confidence: "medium" },
                { title: "Mentor Developers", progress: 50, dueIn: "45 days", confidence: "medium" },
              ].map((goal, i) => (
                <div key={i} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium truncate flex-1">{goal.title}</p>
                    <Badge
                      variant="outline"
                      className={`ml-2 text-xs ${goal.confidence === "high" ? "border-success text-success" : "border-encourage text-encourage"
                        }`}
                    >
                      {goal.progress}%
                    </Badge>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-primary" style={{ width: `${goal.progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">Due in {goal.dueIn}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity - Mobile Optimized */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Recent Activity</h3>

            <div className="space-y-3">
              {[
                {
                  icon: Award,
                  color: "encourage",
                  title: "Sarah recognized you",
                  subtitle: "Outstanding Code Quality",
                  time: "2h ago",
                },
                {
                  icon: CheckCircle,
                  color: "success",
                  title: "Alex completed goal",
                  subtitle: "Launch mobile app",
                  time: "5h ago",
                },
                {
                  icon: Target,
                  color: "primary",
                  title: "Jessica updated progress",
                  subtitle: "Design system v2",
                  time: "1d ago",
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-${activity.color}/10 flex items-center justify-center flex-shrink-0`}
                  >
                    <activity.icon className={`w-5 h-5 text-${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.subtitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications Summary - Mobile Optimized */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <Badge variant="destructive">3</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 p-2 rounded-lg bg-muted">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Goal review due tomorrow</p>
                  <p className="text-xs text-muted-foreground">Q4 Performance Review</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-lg bg-muted">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">New recognition received</p>
                  <p className="text-xs text-muted-foreground">From Emily Foster</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-lg bg-muted">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Team meeting in 1 hour</p>
                  <p className="text-xs text-muted-foreground">Weekly sync</p>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
              View All Notifications
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
