"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function FeaturesPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Feature Configuration</h1>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable Daily Check-ins</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Recognition</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Performance Reviews</Label>
            <Switch defaultChecked />
          </div>

          <Button className="mt-4">Save Configuration</Button>
        </div>
      </Card>
    </div>
  )
}
