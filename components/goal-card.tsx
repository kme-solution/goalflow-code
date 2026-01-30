import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import type { Goal } from "@/lib/types/goal.types"

interface GoalCardProps {
  goal: Goal
}

export function GoalCard({ goal }: GoalCardProps) {
  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    active: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    at_risk: "bg-red-100 text-red-800",
    archived: "bg-gray-100 text-gray-800",
  }

  const confidenceColors = {
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
  }

  return (
    <Link href={`/goals/${goal.id}`}>
      <Card className="cursor-pointer transition-all hover:shadow-lg p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold line-clamp-2">{goal.title}</h3>
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
          </div>

          {goal.description && <p className="text-sm text-muted-foreground line-clamp-2">{goal.description}</p>}

          <div className="flex items-center gap-2">
            <Badge className={statusColors[goal.status]}>{goal.status.replace("_", " ")}</Badge>
            <Badge className={confidenceColors[goal.confidenceLevel]}>{goal.confidenceLevel}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">{Math.round(goal.progress)}%</span>
            </div>
            <Progress value={goal.progress} />
          </div>

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{goal.ownerName}</span>
            <span>{new Date(goal.endDate).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
