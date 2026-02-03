import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Lock, Eye, AlertCircle, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage access controls, permissions, and data security
        </p>
      </div>

      {/* Authentication */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Authentication</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Require 2FA for all users</p>
              <p className="text-xs text-muted-foreground">Enforce two-factor authentication</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">SSO Integration</p>
              <p className="text-xs text-muted-foreground">Single Sign-On via SAML/OAuth</p>
            </div>
            <Badge variant="outline">Configured</Badge>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-sm">Password Policy</p>
              <p className="text-xs text-muted-foreground">Enforce strong password requirements</p>
            </div>
            <Badge>Active</Badge>
          </div>
        </div>
      </Card>

      {/* Data Privacy */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Data Privacy</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Data Retention Period</Label>
            <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
              <option>30 days</option>
              <option>90 days</option>
              <option>1 year</option>
              <option>Indefinite</option>
            </select>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">GDPR Compliance Mode</p>
                <p className="text-xs text-muted-foreground">Auto-delete data per GDPR rules</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Activity Logging</p>
                <p className="text-xs text-muted-foreground">Log all user actions</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Data Encryption at Rest</p>
                <p className="text-xs text-muted-foreground">Encrypt all stored data</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </Card>

      {/* Role-Based Access Control */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Role-Based Access Control</h3>
        </div>

        <div className="space-y-3">
          {[
            { role: "System Admin", permissions: "Full system access" },
            { role: "HR Admin", permissions: "People, performance, recognition" },
            { role: "Manager", permissions: "Team, goals, reviews" },
            { role: "Employee", permissions: "Own profile, feed, goals" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-medium text-sm">{item.role}</p>
                <p className="text-xs text-muted-foreground">{item.permissions}</p>
              </div>
              <Button variant="ghost" size="sm">
                Configure
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* IP Whitelisting */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">IP Whitelisting</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Only allow access from specific IP addresses</p>
            <Switch />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Allowed IP Addresses</Label>
            <textarea
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
              rows={4}
              placeholder="192.168.1.1&#10;192.168.1.2&#10;10.0.0.0/8"
              defaultValue="203.0.113.0/24"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </Card>

      {/* Audit Logs */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Audit Logs</h3>

        <div className="space-y-2">
          {[
            { action: "User created", user: "admin@company.com", date: "2 hours ago" },
            { action: "Settings updated", user: "admin@company.com", date: "5 hours ago" },
            { action: "Role changed", user: "admin@company.com", date: "1 day ago" },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded text-sm">
              <div>
                <p className="font-medium">{log.action}</p>
                <p className="text-xs text-muted-foreground">{log.user}</p>
              </div>
              <span className="text-xs text-muted-foreground">{log.date}</span>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4">
          View All Audit Logs
        </Button>
      </Card>
    </div>
  )
}
