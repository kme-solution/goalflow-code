"use client"

import { CheckCircle2, Circle, Clock, Calendar, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { TimelineEvent } from "@/lib/types/mobile-activity.types"

interface TimelineViewProps {
  events: TimelineEvent[]
}

export function TimelineView({ events }: TimelineViewProps) {
  const groupedByPeriod = {
    morning: events.filter((e) => e.period === "morning"),
    afternoon: events.filter((e) => e.period === "afternoon"),
    evening: events.filter((e) => e.period === "evening"),
  }

  const periodLabels = {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
  }

  const periodColors = {
    morning: "from-orange-50 to-amber-50",
    afternoon: "from-blue-50 to-cyan-50",
    evening: "from-purple-50 to-indigo-50",
  }

  if (events.length === 0) {
    return (
      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground">No timeline events</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {(Object.keys(groupedByPeriod) as Array<keyof typeof groupedByPeriod>).map(
        (period) => {
          const periodEvents = groupedByPeriod[period]
          if (periodEvents.length === 0) return null

          return (
            <div key={period}>
              {/* Period Header */}
              <div className={`bg-gradient-to-r ${periodColors[period]} rounded-lg p-2 mb-2`}>
                <p className="text-xs font-semibold text-foreground">
                  {periodLabels[period]}
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-2 ml-2">
                {periodEvents.map((event, index) => (
                  <TimelineItem
                    key={event.id}
                    event={event}
                    isLast={index === periodEvents.length - 1}
                  />
                ))}
              </div>
            </div>
          )
        },
      )}
    </div>
  )
}

function TimelineItem({
  event,
  isLast,
}: {
  event: TimelineEvent
  isLast: boolean
}) {
  const getIcon = (type: string, status: string) => {
    if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-success" />
    if (status === "in_progress") return <Clock className="w-5 h-5 text-primary animate-pulse" />
    if (status === "upcoming") return <Circle className="w-5 h-5 text-muted-foreground" />
    return <AlertCircle className="w-5 h-5 text-yellow-500" />
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "focus":
        return "bg-blue-500/10 border-blue-500/20 text-blue-700"
      case "meeting":
        return "bg-purple-500/10 border-purple-500/20 text-purple-700"
      case "task":
        return "bg-green-500/10 border-green-500/20 text-green-700"
      case "milestone":
        return "bg-orange-500/10 border-orange-500/20 text-orange-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/20 text-success"
      case "in_progress":
        return "bg-primary/20 text-primary"
      case "upcoming":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-yellow-500/20 text-yellow-700"
    }
  }

  return (
    <div className="flex gap-3 pb-2">
      {/* Timeline Connector */}
      <div className="flex flex-col items-center">
        {getIcon(event.type, event.status)}
        {!isLast && <div className="w-0.5 h-8 bg-muted my-1" />}
      </div>

      {/* Event Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        <Card
          className={`p-2 border ${getTypeColor(event.type)} hover:shadow-sm transition`}
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{event.title}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3" />
                {event.time}
              </p>
            </div>
            <Badge variant="outline" className={`text-xs flex-shrink-0 ${getStatusBadge(event.status)}`}>
              {event.status === "completed"
                ? "Done"
                : event.status === "in_progress"
                  ? "Now"
                  : "Later"}
            </Badge>
          </div>
        </Card>
      </div>
    </div>
  )
}
