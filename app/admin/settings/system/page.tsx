import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Database, HardDrive, Activity, FileText, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground mt-2">
          Monitor system health, storage, and maintenance
        </p>
      </div>

      {/* System Status */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-lg">System Status</h3>
            <p className="text-sm text-muted-foreground">
              Real-time system health monitoring
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { service: "API Server", status: "operational", uptime: "99.98%" },
            { service: "Database", status: "operational", uptime: "99.99%" },
            { service: "Cache Layer", status: "operational", uptime: "99.97%" },
            {
              service: "Email Service",
              status: "operational",
              uptime: "99.95%",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div>
                <p className="font-medium text-sm">{service.service}</p>
                <p className="text-xs text-muted-foreground">
                  Uptime: {service.uptime}
                </p>
              </div>
              <Badge variant="default" className="gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {service.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Storage & Capacity */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <HardDrive className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Storage & Capacity</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Database Storage</p>
              <span className="text-sm text-muted-foreground">234.5 GB / 500 GB</span>
            </div>
            <Progress value={46.9} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">File Storage</p>
              <span className="text-sm text-muted-foreground">156.2 GB / 1 TB</span>
            </div>
            <Progress value={15.6} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Backup Storage</p>
              <span className="text-sm text-muted-foreground">89.3 GB / 500 GB</span>
            </div>
            <Progress value={17.9} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">User Quota</p>
              <span className="text-sm text-muted-foreground">287 / 500 users</span>
            </div>
            <Progress value={57.4} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Database */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Database</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm font-medium">Version</span>
            <Badge variant="outline">PostgreSQL 15.2</Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm font-medium">Last Backup</span>
            <span className="text-sm text-muted-foreground">2 hours ago</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm font-medium">Backup Status</span>
            <Badge variant="default">Healthy</Badge>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" size="sm">
              Run Maintenance
            </Button>
            <Button variant="outline" size="sm">
              Force Backup
            </Button>
          </div>
        </div>
      </Card>

      {/* Version & Updates */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Server className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Version & Updates</h3>
            <p className="text-sm text-muted-foreground">
              Platform version and update information
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm font-medium">Current Version</span>
            <Badge>4.2.1</Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <span className="text-sm font-medium">Latest Version</span>
            <Badge variant="outline">4.3.0</Badge>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              A new version is available. Updates will be applied during the next
              maintenance window.
            </p>
          </div>
        </div>
      </Card>

      {/* Maintenance */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Maintenance</h3>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Schedule maintenance windows for system updates and backups
          </p>

          <div className="space-y-2">
            {[
              { day: "Sunday", time: "02:00 AM - 03:00 AM", status: "scheduled" },
              { day: "Wednesday", time: "02:00 AM - 03:00 AM", status: "scheduled" },
            ].map((maintenance, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div>
                  <p className="font-medium text-sm">{maintenance.day}</p>
                  <p className="text-xs text-muted-foreground">{maintenance.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Reschedule
                </Button>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4">
            + Schedule Maintenance
          </Button>
        </div>
      </Card>

      {/* Logs */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">System Logs</h3>
        </div>

        <div className="space-y-2 mb-4">
          {[
            {
              timestamp: "2024-01-20 15:30",
              level: "INFO",
              message: "Backup completed successfully",
            },
            {
              timestamp: "2024-01-20 14:15",
              level: "WARN",
              message: "Database response time elevated",
            },
            {
              timestamp: "2024-01-20 12:00",
              level: "INFO",
              message: "Maintenance window completed",
            },
          ].map((log, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Badge
                variant={log.level === "WARN" ? "secondary" : "outline"}
                className="mt-0.5"
              >
                {log.level}
              </Badge>
              <div>
                <p className="text-sm font-mono text-muted-foreground">
                  {log.timestamp}
                </p>
                <p className="text-sm">{log.message}</p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          View All Logs
        </Button>
      </Card>
    </div>
  )
}
