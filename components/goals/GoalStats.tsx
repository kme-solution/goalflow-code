"use client"

import { Card } from "@/components/ui/card"
import { Target, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface GoalStatsProps {
  totalGoals: number
  completedGoals: number
  atRiskGoals: number
  averageProgress: number
  className?: string
}

export function GoalStats({
  totalGoals,
  completedGoals,
  atRiskGoals,
  averageProgress,
  className,
}: GoalStatsProps) {
  const stats = [
    {
      label: "Total Goals",
      value: totalGoals,
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Avg Progress",
      value: `${averageProgress}%`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "At Risk",
      value: atRiskGoals,
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Completed",
      value: completedGoals,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10",
    },
  ]

  return (
    <div className={cn("grid grid-cols-2 gap-3 md:grid-cols-4", className)}>
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="flex items-center gap-3 p-4 transition-all hover:shadow-md"
        >
          <div className={cn("rounded-lg p-2.5", stat.bgColor)}>
            <stat.icon className={cn("h-5 w-5", stat.color)} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            <p className="truncate text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
