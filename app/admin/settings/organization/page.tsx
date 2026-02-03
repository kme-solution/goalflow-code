import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building, MapPin, Users, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

export default function OrganizationSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage company information, locations, and departments
        </p>
      </div>

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
            <Label className="text-sm font-medium mb-2 block">Company Name</Label>
            <Input defaultValue="GoalFlow Pro Inc." />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm font-medium mb-2 block">Industry</Label>
              <Input defaultValue="Technology" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Company Size</Label>
              <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                <option>201-500 employees</option>
                <option>51-200 employees</option>
                <option>501-1000 employees</option>
                <option>1000+ employees</option>
              </select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Company Website</Label>
            <Input defaultValue="https://goalflowpro.com" type="url" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm font-medium mb-2 block">Support Email</Label>
              <Input defaultValue="support@goalflowpro.com" type="email" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Phone</Label>
              <Input defaultValue="+1 (555) 123-4567" type="tel" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </Card>

      {/* Office Locations */}
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

      {/* Departments */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Departments</h3>
            <p className="text-sm text-muted-foreground">
              Manage organizational departments
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { name: "Engineering", members: 89 },
            { name: "Product", members: 34 },
            { name: "Sales", members: 56 },
            { name: "Marketing", members: 28 },
            { name: "People & Culture", members: 12 },
          ].map((dept, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-medium">{dept.name}</p>
                <p className="text-sm text-muted-foreground">{dept.members} members</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4">
          + Add Department
        </Button>
      </Card>
    </div>
  )
}
