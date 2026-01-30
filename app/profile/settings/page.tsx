"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Preferences</h1>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notif">Email Notifications</Label>
                <Switch id="email-notif" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="recognition-notif">Recognition Alerts</Label>
                <Switch id="recognition-notif" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="goal-notif">Goal Updates</Label>
                <Switch id="goal-notif" defaultChecked />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Privacy</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="public-profile">Make Profile Public</Label>
                <Switch id="public-profile" />
              </div>
            </div>
          </div>

          <Button className="w-full md:w-auto">Save Preferences</Button>
        </div>
      </Card>
    </div>
  )
}
