"use client"

import { AlertCircle, AlertTriangle, Info, Clock, TrendingDown, Flag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { DailyAlert, AlertType } from "@/lib/types/mobile-activity.types"

interface AlertHubProps {
  alerts: DailyAlert[]
  onDismiss?: (alertId: string) => void
  onAction?: (alertId: string, url?: string) => void
}

export function AlertHub({ alerts, onDismiss, onAction }: AlertHubProps) {
  if (alerts.length === 0) {
    return (
      <Card className="p-4 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
            <Flag className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">All clear</p>
            <p className="text-xs text-muted-foreground">No alerts for today</p>
          </div>
        </div>
      </Card>
    )
  }

  const criticalAlerts = alerts.filter((a) => a.severity === "critical")
  const warningAlerts = alerts.filter((a) => a.severity === "warning")
  const infoAlerts = alerts.filter((a) => a.severity === "info")

  return (
    <div className="space-y-2">
      {/* Critical Alerts */}
      {criticalAlerts.map((alert) => (
        <AlertItem
          key={alert.id}
          alert={alert}
          onDismiss={onDismiss}
          onAction={onAction}
        />
      ))}

      {/* Warning Alerts */}
      {warningAlerts.map((alert) => (
        <AlertItem
          key={alert.id}
          alert={alert}
          onDismiss={onDismiss}
          onAction={onAction}
        />
      ))}

      {/* Info Alerts */}
      {infoAlerts.map((alert) => (
        <AlertItem
          key={alert.id}
          alert={alert}
          onDismiss={onDismiss}
          onAction={onAction}
        />
      ))}
    </div>
  )
}

function AlertItem({
  alert,
  onDismiss,
  onAction,
}: {
  alert: DailyAlert
  onDismiss?: (id: string) => void
  onAction?: (id: string, url?: string) => void
}) {
  const getAlertConfig = (type: AlertType, severity: string) => {
    const baseConfig = {
      icon: Info,
      bgClass: "bg-muted/50 border-muted",
      badgeClass: "bg-muted text-muted-foreground",
    }

    if (severity === "critical") {
      return {
        ...baseConfig,
        icon: AlertCircle,
        bgClass: "bg-destructive/10 border-destructive/20",
        badgeClass: "bg-destructive text-white",
      }
    }

    if (severity === "warning") {
      return {
        ...baseConfig,
        icon: AlertTriangle,
        bgClass: "bg-yellow-500/10 border-yellow-500/20",
        badgeClass: "bg-yellow-500 text-white",
      }
    }

    return baseConfig
  }

  const config = getAlertConfig(alert.type, alert.severity)
  const IconComponent = config.icon

  return (
    <Card className={`p-3 border ${config.bgClass}`}>
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-foreground truncate">
              {alert.title}
            </p>
            {alert.daysUntil !== undefined && alert.daysUntil >= 0 && (
              <Badge variant="outline" className="text-xs flex-shrink-0">
                <Clock className="w-3 h-3 mr-1" />
                {alert.daysUntil === 0 ? "Today" : `${alert.daysUntil}d`}
              </Badge>
            )}
          </div>

          {alert.description && (
            <p className="text-xs text-muted-foreground mb-2">
              {alert.description}
            </p>
          )}

          <div className="flex gap-2">
            {alert.actionRequired && alert.actionUrl && (
              <Button
                size="sm"
                variant="default"
                className="h-7 text-xs"
                onClick={() => onAction?.(alert.id, alert.actionUrl)}
              >
                Take Action
              </Button>
            )}

            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs"
              onClick={() => onDismiss?.(alert.id)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
