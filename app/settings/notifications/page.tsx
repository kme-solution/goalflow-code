'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Bell, Mail, MessageSquare } from 'lucide-react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState({
    emailGoalUpdates: true,
    emailRecognition: true,
    emailReviews: true,
    emailCheckIns: false,
    emailWeeklySummary: true,
    pushGoalUpdates: true,
    pushRecognition: true,
    pushMentions: true,
    pushUrgent: true,
    inAppAll: true,
    inAppGoals: true,
    inAppRecognition: true,
    inAppMessages: true,
  })

  const handleToggle = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notification Preferences</h1>
        <p className="text-muted-foreground mt-2">
          Choose how you want to receive notifications
        </p>
      </div>

      {/* Email Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Email Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Goal Updates</p>
              <p className="text-xs text-muted-foreground">Updates on goals you're tracking</p>
            </div>
            <Switch
              checked={notifications.emailGoalUpdates}
              onCheckedChange={() => handleToggle('emailGoalUpdates')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Recognition</p>
              <p className="text-xs text-muted-foreground">When someone recognizes you</p>
            </div>
            <Switch
              checked={notifications.emailRecognition}
              onCheckedChange={() => handleToggle('emailRecognition')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Performance Reviews</p>
              <p className="text-xs text-muted-foreground">Review cycle notifications</p>
            </div>
            <Switch
              checked={notifications.emailReviews}
              onCheckedChange={() => handleToggle('emailReviews')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Check-in Reminders</p>
              <p className="text-xs text-muted-foreground">Daily check-in reminders</p>
            </div>
            <Switch
              checked={notifications.emailCheckIns}
              onCheckedChange={() => handleToggle('emailCheckIns')}
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-sm">Weekly Summary</p>
              <p className="text-xs text-muted-foreground">Weekly activity summary</p>
            </div>
            <Switch
              checked={notifications.emailWeeklySummary}
              onCheckedChange={() => handleToggle('emailWeeklySummary')}
            />
          </div>
        </div>
      </Card>

      {/* Push Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Push Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Goal Updates</p>
              <p className="text-xs text-muted-foreground">Important goal milestones</p>
            </div>
            <Switch
              checked={notifications.pushGoalUpdates}
              onCheckedChange={() => handleToggle('pushGoalUpdates')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Recognition</p>
              <p className="text-xs text-muted-foreground">New recognition badges</p>
            </div>
            <Switch
              checked={notifications.pushRecognition}
              onCheckedChange={() => handleToggle('pushRecognition')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">@Mentions</p>
              <p className="text-xs text-muted-foreground">When someone mentions you</p>
            </div>
            <Switch
              checked={notifications.pushMentions}
              onCheckedChange={() => handleToggle('pushMentions')}
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-sm">Urgent Messages</p>
              <p className="text-xs text-muted-foreground">High-priority notifications only</p>
            </div>
            <Switch
              checked={notifications.pushUrgent}
              onCheckedChange={() => handleToggle('pushUrgent')}
            />
          </div>
        </div>
      </Card>

      {/* In-App Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">In-App Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">All Notifications</p>
              <p className="text-xs text-muted-foreground">Show all notification types</p>
            </div>
            <Switch
              checked={notifications.inAppAll}
              onCheckedChange={() => handleToggle('inAppAll')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Goals</p>
              <p className="text-xs text-muted-foreground">Goal-related notifications</p>
            </div>
            <Switch
              checked={notifications.inAppGoals}
              onCheckedChange={() => handleToggle('inAppGoals')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Recognition</p>
              <p className="text-xs text-muted-foreground">Recognition and kudos</p>
            </div>
            <Switch
              checked={notifications.inAppRecognition}
              onCheckedChange={() => handleToggle('inAppRecognition')}
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-sm">Messages</p>
              <p className="text-xs text-muted-foreground">Direct messages and comments</p>
            </div>
            <Switch
              checked={notifications.inAppMessages}
              onCheckedChange={() => handleToggle('inAppMessages')}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
