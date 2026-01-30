"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function OrganizationPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Organization Settings</h1>

      <Card className="p-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" defaultValue="Your Company" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" placeholder="Software, Finance, etc." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Company Size</Label>
            <Input id="size" placeholder="Number of employees" />
          </div>

          <Button>Save Settings</Button>
        </form>
      </Card>
    </div>
  )
}
