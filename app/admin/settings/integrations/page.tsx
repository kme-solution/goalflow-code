import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, ExternalLink, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function IntegrationsSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground mt-2">
          Connect third-party services and manage integrations
        </p>
      </div>

      {/* Connected Integrations */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-6">Connected Integrations</h3>

        <div className="space-y-3">
          {[
            {
              name: "Microsoft Teams",
              description: "Send notifications to Teams channels",
              status: "connected",
              icon: "🎯",
            },
            {
              name: "Slack",
              description: "Post updates and reminders",
              status: "connected",
              icon: "💬",
            },
            {
              name: "Zapier",
              description: "Automate workflows",
              status: "connected",
              icon: "⚡",
            },
            {
              name: "Google Workspace",
              description: "Sync calendars and documents",
              status: "disconnected",
              icon: "📊",
            },
          ].map((integration, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{integration.icon}</span>
                <div>
                  <p className="font-medium">{integration.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {integration.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    integration.status === "connected" ? "default" : "secondary"
                  }
                >
                  {integration.status === "connected" ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <XCircle className="w-3 h-3 mr-1" />
                  )}
                  {integration.status === "connected"
                    ? "Connected"
                    : "Disconnected"}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  {integration.status === "connected" ? "Configure" : "Connect"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Available Integrations */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-6">Available Integrations</h3>

        <div className="space-y-3">
          {[
            {
              name: "HubSpot",
              description: "CRM and marketing automation",
              category: "CRM",
            },
            {
              name: "Salesforce",
              description: "Enterprise CRM platform",
              category: "CRM",
            },
            {
              name: "Workday",
              description: "HRIS and people management",
              category: "HR",
            },
            {
              name: "ADP",
              description: "Payroll and benefits",
              category: "HR",
            },
          ].map((integration, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium">{integration.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-muted-foreground">
                    {integration.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {integration.category}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Install
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Webhooks */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Webhooks</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Webhook URL</Label>
            <Input
              placeholder="https://example.com/webhook"
              defaultValue="https://api.example.com/goalflow/webhooks"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Events</Label>
            <div className="space-y-2">
              {[
                "goal.created",
                "goal.completed",
                "review.submitted",
                "user.created",
              ].map((event) => (
                <label key={event} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-border"
                  />
                  <span className="text-sm">{event}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline">Cancel</Button>
            <Button>Save Webhook</Button>
          </div>
        </div>
      </Card>

      {/* API Keys */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-6">API Keys</h3>

        <div className="space-y-3 mb-4">
          {[
            {
              name: "Production",
              key: "sk_live_4eC39HqLyjWDarht...",
              created: "Jan 15, 2024",
            },
            {
              name: "Development",
              key: "sk_test_4eC39HqLyjWDarht...",
              created: "Dec 1, 2023",
            },
          ].map((apiKey, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div>
                <p className="font-medium text-sm">{apiKey.name}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  {apiKey.key}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Created: {apiKey.created}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Regenerate
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  Revoke
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          + Generate New API Key
        </Button>
      </Card>
    </div>
  )
}
