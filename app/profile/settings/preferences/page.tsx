'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Palette, Globe, Eye, Accessibility } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function PreferencesPage() {
  const [theme, setTheme] = useState('auto')
  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('America/Los_Angeles')
  const [preferences, setPreferences] = useState({
    compactMode: false,
    animationsEnabled: true,
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    showWeekends: true,
    startWeekOnMonday: true,
    timeFormat: '24h',
  })

  const handleToggle = (key: string) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Preferences</h1>
        <p className="text-muted-foreground mt-2">
          Customize your GoalFlow experience
        </p>
      </div>

      {/* Theme & Appearance */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Theme & Appearance</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-3 block">Color Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === 'light'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <div className="bg-white w-full h-8 rounded mb-2 border" />
                <p className="text-sm font-medium">Light</p>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <div className="bg-slate-900 w-full h-8 rounded mb-2" />
                <p className="text-sm font-medium">Dark</p>
              </button>
              <button
                onClick={() => setTheme('auto')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === 'auto'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <div className="w-full h-8 rounded mb-2 border bg-gradient-to-r from-white to-slate-900" />
                <p className="text-sm font-medium">Auto</p>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Compact Mode</p>
                <p className="text-xs text-muted-foreground">Reduce spacing and font sizes</p>
              </div>
              <Switch checked={preferences.compactMode} onCheckedChange={() => handleToggle('compactMode')} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Animations</p>
                <p className="text-xs text-muted-foreground">Enable smooth transitions</p>
              </div>
              <Switch checked={preferences.animationsEnabled} onCheckedChange={() => handleToggle('animationsEnabled')} />
            </div>
          </div>
        </div>
      </Card>

      {/* Localization */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Localization</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Language</Label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Timezone</Label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background"
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Time Format</Label>
            <div className="flex gap-3">
              <button
                onClick={() => setPreferences(prev => ({ ...prev, timeFormat: '12h' }))}
                className={`flex-1 px-4 py-2 rounded-lg border transition-all ${
                  preferences.timeFormat === '12h'
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                12-hour
              </button>
              <button
                onClick={() => setPreferences(prev => ({ ...prev, timeFormat: '24h' }))}
                className={`flex-1 px-4 py-2 rounded-lg border transition-all ${
                  preferences.timeFormat === '24h'
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                24-hour
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Calendar & Time */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Calendar & Time</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Show Weekends</p>
              <p className="text-xs text-muted-foreground">Display Saturday and Sunday</p>
            </div>
            <Switch checked={preferences.showWeekends} onCheckedChange={() => handleToggle('showWeekends')} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-sm">Start Week on Monday</p>
              <p className="text-xs text-muted-foreground">Calendar begins with Monday</p>
            </div>
            <Switch checked={preferences.startWeekOnMonday} onCheckedChange={() => handleToggle('startWeekOnMonday')} />
          </div>
        </div>
      </Card>

      {/* Accessibility */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Accessibility className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Accessibility</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">High Contrast Mode</p>
              <p className="text-xs text-muted-foreground">Increase color contrast for better readability</p>
            </div>
            <Switch checked={preferences.highContrast} onCheckedChange={() => handleToggle('highContrast')} />
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium text-sm">Reduce Motion</p>
              <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
            </div>
            <Switch checked={preferences.reducedMotion} onCheckedChange={() => handleToggle('reducedMotion')} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-sm">Large Text</p>
              <p className="text-xs text-muted-foreground">Increase default text size</p>
            </div>
            <Switch checked={preferences.largeText} onCheckedChange={() => handleToggle('largeText')} />
          </div>
        </div>
      </Card>

      {/* Save Changes */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Preferences</Button>
      </div>
    </div>
  )
}
