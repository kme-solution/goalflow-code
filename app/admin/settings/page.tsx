import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { Layout } from "@/components/layout"
import {
  Settings,
  Building,
  MapPin,
  Shield,
  Zap,
  Database,
  Bell,
  Users,
  Lock,
  Server,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function SystemSettingsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <DashboardHeader
          title="System Settings & Configuration"
          description="Manage system-wide settings, features, and integrations for your organization"
        />

        <Tabs defaultValue="organization" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* ORGANIZATION SETTINGS TAB */}
          <TabsContent value="organization" className="space-y-4 mt-6">
            {/* Company Information */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Company Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic company details and contact information
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Company Name</label>
                  <Input defaultValue="GoalFlow Pro Inc." />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Industry</label>
                    <Input defaultValue="Technology" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Company Size</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                      <option>201-500 employees</option>
                      <option>51-200 employees</option>
                      <option>501-1000 employees</option>
                      <option>1000+ employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Company Website</label>
                  <Input defaultValue="https://goalflowpro.com" type="url" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Support Email</label>
                    <Input defaultValue="support@goalflowpro.com" type="email" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input defaultValue="+1 (555) 123-4567" type="tel" />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </Card>

            {/* Location Management */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Office Locations</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your company's office locations
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: "San Francisco HQ", address: "123 Market St, San Francisco, CA", employees: 147, primary: true },
                  { name: "New York Office", address: "456 Broadway, New York, NY", employees: 68, primary: false },
                  { name: "Austin Office", address: "789 Congress Ave, Austin, TX", employees: 32, primary: false },
                ].map((location, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{location.name}</p>
                        {location.primary && (
                          <Badge variant="secondary" className="text-xs">
                            Primary
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{location.address}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {location.employees} employees
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                + Add Location
              </Button>
            </Card>

            {/* Department Structure */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Department Structure</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure your organizational departments
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  "Engineering",
                  "Sales",
                  "Marketing",
                  "Product",
                  "Human Resources",
                  "Operations",
                  "Finance",
                  "Customer Success",
                ].map((dept, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium">{dept}</span>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                + Add Department
              </Button>
            </Card>
          </TabsContent>

          {/* FEATURES CONFIGURATION TAB */}
          <TabsContent value="features" className="space-y-4 mt-6">
            {/* Feature Toggles - Goal Management */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Goal Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure goal-related features
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Allow employees to create goals", enabled: true, description: "Let team members create their own goals" },
                  { label: "Require manager approval for goals", enabled: true, description: "Managers must approve all new goals" },
                  { label: "Enable goal templates", enabled: true, description: "Provide pre-defined goal templates" },
                  { label: "Allow goal cascading", enabled: true, description: "Align goals up and down the organization" },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{feature.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                    <Switch defaultChecked={feature.enabled} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Recognition Features */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Recognition System</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure peer recognition features
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Enable peer-to-peer recognition", enabled: true, description: "Allow all employees to recognize each other" },
                  { label: "Allow anonymous recognition", enabled: false, description: "Let users give recognition anonymously" },
                  { label: "Require manager approval", enabled: false, description: "Manager approval before recognition is visible" },
                  { label: "Enable recognition categories", enabled: true, description: "Use custom recognition value categories" },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{feature.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                    <Switch defaultChecked={feature.enabled} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Reviews */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Performance Reviews</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure review workflow options
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Enable 360-degree feedback", enabled: true, description: "Collect feedback from multiple perspectives" },
                  { label: "Require self-assessment", enabled: true, description: "Employees must complete self-assessments" },
                  { label: "Enable peer feedback requests", enabled: true, description: "Request feedback from peers" },
                  { label: "Auto-generate review documents", enabled: true, description: "Automatically create review summaries" },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{feature.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                    <Switch defaultChecked={feature.enabled} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Recognition Categories */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Custom Recognition Categories</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage recognition value categories
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {["Excellence", "Team Player", "Innovation", "Going Above & Beyond", "Leadership"].map(
                  (category, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium">{category}</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ),
                )}
              </div>

              <Button variant="outline" className="w-full mt-4">
                + Add Category
              </Button>
            </Card>
          </TabsContent>

          {/* INTEGRATIONS TAB */}
          <TabsContent value="integrations" className="space-y-4 mt-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Integration Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect external systems and services
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "HRIS Integration",
                    description: "Sync employee data with your HRIS system",
                    status: "connected",
                    provider: "BambooHR",
                  },
                  {
                    name: "Calendar Sync",
                    description: "Sync meetings and schedules",
                    status: "connected",
                    provider: "Google Calendar",
                  },
                  {
                    name: "Single Sign-On (SSO)",
                    description: "Enable SSO for secure authentication",
                    status: "connected",
                    provider: "Okta",
                  },
                  {
                    name: "Slack Integration",
                    description: "Send notifications to Slack channels",
                    status: "not-connected",
                    provider: "Slack",
                  },
                  {
                    name: "Data Warehouse",
                    description: "Export data to your warehouse",
                    status: "not-connected",
                    provider: "Snowflake",
                  },
                ].map((integration, i) => (
                  <div key={i} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{integration.name}</p>
                          {integration.status === "connected" ? (
                            <Badge className="bg-success/10 text-success hover:bg-success/10">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Not Connected
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">Provider: {integration.provider}</p>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0">
                        {integration.status === "connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* SECURITY TAB */}
          <TabsContent value="security" className="space-y-4 mt-6">
            {/* Permission Matrix */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Permission Matrix</h3>
                  <p className="text-sm text-muted-foreground">
                    Define role-based permissions
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Permission</th>
                      <th className="text-center p-3 font-medium">Employee</th>
                      <th className="text-center p-3 font-medium">Manager</th>
                      <th className="text-center p-3 font-medium">HR Admin</th>
                      <th className="text-center p-3 font-medium">CEO</th>
                      <th className="text-center p-3 font-medium">Sys Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { permission: "View own goals", roles: [true, true, true, true, true] },
                      { permission: "Create goals", roles: [true, true, true, true, true] },
                      { permission: "View team goals", roles: [false, true, true, true, true] },
                      { permission: "Give recognition", roles: [true, true, true, true, true] },
                      { permission: "View analytics", roles: [false, true, true, true, true] },
                      { permission: "Manage users", roles: [false, false, true, false, true] },
                      { permission: "System settings", roles: [false, false, false, false, true] },
                    ].map((row, i) => (
                      <tr key={i} className="border-b hover:bg-muted/30">
                        <td className="p-3 font-medium text-sm">{row.permission}</td>
                        {row.roles.map((enabled, j) => (
                          <td key={j} className="p-3 text-center">
                            <div className="flex justify-center">
                              <Switch defaultChecked={enabled} />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Data Retention Policies */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Server className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Data Retention Policies</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure data retention periods
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { type: "Goal data", retention: "7 years" },
                  { type: "Recognition records", retention: "5 years" },
                  { type: "Performance reviews", retention: "7 years" },
                  { type: "Check-in logs", retention: "3 years" },
                  { type: "Audit logs", retention: "10 years" },
                ].map((policy, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <span className="text-sm font-medium">{policy.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{policy.retention}</span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Audit Log Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Audit Logging & Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure system audit and alerting
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Log user authentication", enabled: true },
                  { label: "Log permission changes", enabled: true },
                  { label: "Log data exports", enabled: true },
                  { label: "Log system configuration changes", enabled: true },
                  { label: "Send alerts for suspicious activity", enabled: true },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <span className="text-sm font-medium">{setting.label}</span>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View Audit Logs
              </Button>
            </Card>
          </TabsContent>

          {/* SYSTEM TAB */}
          <TabsContent value="system" className="space-y-4 mt-6">
            {/* System Status */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Server className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">System Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor system health and performance
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: "API Status", status: "operational", uptime: "99.99%" },
                  { name: "Database", status: "operational", uptime: "99.95%" },
                  { name: "Real-time Services", status: "operational", uptime: "99.98%" },
                  { name: "Email Service", status: "operational", uptime: "99.99%" },
                ].map((service, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
                    </div>
                    <Badge className="bg-success/10 text-success hover:bg-success/10">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {service.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Storage & Limits */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Storage & Limits</h3>
                  <p className="text-sm text-muted-foreground">
                    View current storage usage and limits
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Total Storage Used", usage: "45.2 GB", limit: "100 GB", percentage: 45 },
                  { name: "Active Users", usage: "287", limit: "500", percentage: 57 },
                  { name: "API Calls (Monthly)", usage: "2.5M", limit: "10M", percentage: 25 },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.usage} / {item.limit}
                      </p>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Updates */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">System Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage system upgrades and versions
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Version: 3.4.2</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Latest stable release installed
                      </p>
                    </div>
                    <Badge className="bg-success/10 text-success hover:bg-success/10">
                      Up to date
                    </Badge>
                  </div>
                </div>

                <Button className="w-full">Check for Updates</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
