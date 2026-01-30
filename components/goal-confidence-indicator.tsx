import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"
import type { ConfidenceLevel } from "@/lib/types/goal.types"

interface GoalConfidenceIndicatorProps {
  level: ConfidenceLevel
  score: number
}

export function GoalConfidenceIndicator({ level, score }: GoalConfidenceIndicatorProps) {
  const indicators = {
    red: {
      icon: AlertCircle,
      label: "High Risk",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    yellow: {
      icon: AlertTriangle,
      label: "At Risk",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    green: {
      icon: CheckCircle,
      label: "On Track",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  }

  const config = indicators[level]
  const Icon = config.icon

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${config.bgColor}`}>
      <Icon className={`h-4 w-4 ${config.color}`} />
      <div>
        <p className={`text-sm font-semibold ${config.color}`}>{config.label}</p>
        <p className="text-xs text-muted-foreground">{score}/10</p>
      </div>
    </div>
  )
}
