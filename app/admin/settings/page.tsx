import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { Layout } from "@/components/layout"
import { Settings, Building, MapPin, Shield, Zap, Database, Bell } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function SystemSettingsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <DashboardHeader
          title="System Settings & Configuration"
          description="Manage system-wide settings and features"
        />

        <Tabs defaultValue="organization" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Organization Settings Tab */}
          <TabsContent value="organization" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Company Information</h3>
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
                    <Input defaultValue="201-500 employees" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Website</label>
                  <Input defaultValue="https://goalflowpro.com" />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Location Management</h3>
              </div>

              <div className="space-y-3">
                {[
                  { name: "San Francisco HQ", address: "123 Market St, San Francisco, CA", employees: 147 },
                  { name: "New York Office", address: "456 Broadway, New York, NY", employees: 68 },
                  { name: "Austin Office", address: "789 Congress Ave, Austin, TX", employees: 32 },
                ].map((location, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">{location.name}</p>
                      <p className="text-sm text-muted-foreground">{location.address}</p>
                      <p className="text-xs text-muted-foreground mt-1">{location.employees} employees</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Add Location
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Department Structure</h3>
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
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="font-medium">{dept}</span>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Add Department
              </Button>
            </Card>
          </TabsContent>

          {/* Features Configuration Tab */}
          <TabsContent value="features" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Feature Configuration</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <p className="text-sm font-medium">Goal Management</p>
                  <div className="space-y-3">
                    {[
                      { label: "Allow employees to create goals", enabled: true },
                      { label: "Require manager approval for goals", enabled: true },
                      { label: "Enable goal templates", enabled: true },
                      { label: "Allow goal cascading", enabled: true },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">{feature.label}</span>
                        <Switch defaultChecked={feature.enabled} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <p className="text-sm font-medium">Recognition</p>
                  <div className="space-y-3">
                    {[
                      { label: "Enable peer-to-peer recognition", enabled: true },
                      { label: "Allow anonymous recognition", enabled: false },
                      { label: "Require manager approval", enabled: false },
                      { label: "Enable recognition categories", enabled: true },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">{feature.label}</span>
                        <Switch defaultChecked={feature.enabled} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <p className="text-sm font-medium">Performance Reviews</p>
                  <div className="space-y-3">
                    {[
                      { label: "Enable 360-degree feedback", enabled: true },
                      { label: "Require self-assessment", enabled: true },
                      { label: "Enable peer feedback requests", enabled: true },
                      { label: "Auto-generate review documents", enabled: true },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">{feature.label}</span>
                        <Switch defaultChecked={feature.enabled} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Custom Recognition Categories</h3>
              </div>

              <div className="space-y-2">
                {["Excellence", "Team Player", "Innovation", "Going Above & Beyond", "Leadership"].map(
                  (category, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="font-medium">{category}</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ),
                )}
              </div>

              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Add Category
              </Button>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Integration Management</h3>
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
                  <div key={i} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{integration.name}</p>
                          {integration.status === "connected" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-success/10 text-success">
                              Connected
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                              Not Connected
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Provider: {integration.provider}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {integration.status === "connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Security & Compliance Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Permission Matrix</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Permission</th>
                      <th className="text-center p-2 font-medium">Employee</th>
                      <th className="text-center p-2 font-medium">Manager</th>
                      <th className="text-center p-2 font-medium">HR Admin</th>
                      <th className="text-center p-2 font-medium">CEO</th>
                      <th className="text-center p-2 font-medium">Sys Admin</th>
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
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="p-2">{row.permission}</td>
                        {row.roles.map((enabled, j) => (
                          <td key={j} className="p-2 text-center">
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

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Data Retention Policies</h3>
              </div>

              <div className="space-y-3">
                {[
                  { type: "Goal data", retention: "7 years" },
                  { type: "Recognition records", retention: "5 years" },
                  { type: "Performance reviews", retention: "7 years" },
                  { type: "Check-in logs", retention: "3 years" },
                  { type: "Audit logs", retention: "10 years" },
                ].map((policy, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">{policy.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{policy.retention}</span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Audit Log Settings</h3>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Log user authentication", enabled: true },
                  { label: "Log permission changes", enabled: true },
                  { label: "Log data exports", enabled: true },
                  { label: "Log system configuration changes", enabled: true },
                  { label: "Send alerts for suspicious activity", enabled: true },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">{setting.label}</span>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View Audit Logs
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
