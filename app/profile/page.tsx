"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10" />
            <div>
              <div className="text-xl font-semibold">{user?.name || "User Name"}</div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
              <Badge className="mt-2">{user?.role}</Badge>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Stats</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-muted-foreground">Recognition Given</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">18</div>
                <div className="text-xs text-muted-foreground">Recognition Received</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-muted-foreground">Active Goals</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
