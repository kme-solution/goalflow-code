'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Lock, Smartphone, Clock, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function SecurityPage() {
  const [twoFaEnabled, setTwoFaEnabled] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Chrome on macOS', location: 'San Francisco, CA', lastActive: '2 minutes ago' },
    { id: 2, device: 'Safari on iOS', location: 'San Francisco, CA', lastActive: '1 hour ago' },
    { id: 3, device: 'Firefox on Windows', location: 'San Jose, CA', lastActive: '3 days ago' },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account security and privacy controls
        </p>
      </div>

      {/* Password */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Password</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Current Password</Label>
            <Input type="password" placeholder="Enter current password" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">New Password</Label>
            <Input type="password" placeholder="Enter new password" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Confirm Password</Label>
            <Input type="password" placeholder="Confirm new password" />
          </div>
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
            Password strength: Strong (at least 12 characters with uppercase, lowercase, numbers, and symbols)
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline">Cancel</Button>
            <Button>Update Password</Button>
          </div>
        </div>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">Add extra security to your account</p>
            </div>
          </div>
          <Badge variant={twoFaEnabled ? 'default' : 'secondary'}>
            {twoFaEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Authenticator App</p>
              <p className="text-xs text-muted-foreground">Use Google Authenticator, Authy, or Microsoft Authenticator</p>
            </div>
            <Switch checked={twoFaEnabled} onCheckedChange={setTwoFaEnabled} />
          </div>

          {twoFaEnabled && (
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                Your 2FA is set up with backup codes. Keep them in a safe place.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Biometric Login */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Biometric Login</h3>
              <p className="text-sm text-muted-foreground">Use fingerprint or face recognition</p>
            </div>
          </div>
          <Badge variant={biometricEnabled ? 'default' : 'secondary'}>
            {biometricEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>

        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="font-medium text-sm">Allow Biometric Authentication</p>
            <p className="text-xs text-muted-foreground">Faster login with fingerprint or face ID</p>
          </div>
          <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
        </div>
      </Card>

      {/* Active Sessions */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Active Sessions</h3>
        </div>

        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">{session.device}</p>
                <p className="text-xs text-muted-foreground">{session.location}</p>
                <p className="text-xs text-muted-foreground">Last active: {session.lastActive}</p>
              </div>
              <Button variant="ghost" size="sm">
                Sign Out
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 border-t mt-4">
          <Button variant="outline">Sign Out All Other Sessions</Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200 dark:border-red-800">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <h3 className="font-semibold text-lg text-red-600">Danger Zone</h3>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Deactivate Account
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Delete Account Permanently
          </Button>
        </div>
      </Card>
    </div>
  )
}
