"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Shield,
  Eye,
  Palette,
  Clock,
  Mail,
  MessageSquare,
  Target,
  Award,
  Settings,
  ChevronRight,
} from "lucide-react"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("notifications")

  const settingsSections = [
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      description: "Manage notification preferences",
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      icon: Shield,
      description: "Control your privacy settings",
    },
    {
      id: "display",
      label: "Display & Theme",
      icon: Palette,
      description: "Customize appearance",
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: Settings,
      description: "General preferences",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings & Preferences</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and customize your experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="space-y-1">
            {settingsSections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeSection === section.id
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{section.label}</p>
                  </div>
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3">
          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Notifications</h2>
                <p className="text-sm text-muted-foreground">
                  Choose how you want to receive updates
                </p>
              </div>

              <Card className="p-6">
                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Mail className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Email Notifications</h3>
                    </div>
                    <div className="space-y-3 ml-8">
                      {[
                        { label: "Recognition notifications", enabled: true },
                        { label: "Goal milestones", enabled: true },
                        { label: "Performance reviews", enabled: true },
                        { label: "Team updates", enabled: false },
                        { label: "Weekly digest", enabled: true },
                      ].map((notif, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <Label className="font-normal cursor-pointer">
                            {notif.label}
                          </Label>
                          <Switch defaultChecked={notif.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4" />

                  {/* In-App Notifications */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Bell className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">In-App Notifications</h3>
                    </div>
                    <div className="space-y-3 ml-8">
                      {[
                        { label: "Mentions in posts", enabled: true },
                        { label: "Comments on my items", enabled: true },
                        { label: "New recognition received", enabled: true },
                        { label: "Goal reminders", enabled: false },
                      ].map((notif, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <Label className="font-normal cursor-pointer">
                            {notif.label}
                          </Label>
                          <Switch defaultChecked={notif.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4" />

                  {/* Notification Frequency */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Frequency</h3>
                    </div>
                    <div className="space-y-3 ml-8">
                      <div>
                        <Label className="text-sm">Digest frequency</Label>
                        <select className="w-full mt-2 px-3 py-2 rounded-lg border border-border bg-background">
                          <option>Immediate</option>
                          <option>Daily</option>
                          <option>Weekly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Privacy & Security Section */}
          {activeSection === "privacy" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Privacy & Security</h2>
                <p className="text-sm text-muted-foreground">
                  Control your privacy and security settings
                </p>
              </div>

              <Card className="p-6">
                <div className="space-y-6">
                  {/* Profile Visibility */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Eye className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Profile Visibility</h3>
                    </div>
                    <div className="space-y-3 ml-8">
                      {[
                        { label: "Make profile public", enabled: false },
                        { label: "Show recognition in profile", enabled: true },
                        { label: "Show goals in profile", enabled: true },
                        { label: "Allow messages from team", enabled: true },
                      ].map((setting, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <Label className="font-normal cursor-pointer">
                            {setting.label}
                          </Label>
                          <Switch defaultChecked={setting.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4" />

                  {/* Activity & Data */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Activity & Data</h3>
                    </div>
                    <div className="space-y-3 ml-8">
                      {[
                        { label: "Show online status", enabled: true },
                        { label: "Show when I'm typing", enabled: true },
                        { label: "Allow activity analytics", enabled: true },
                      ].map((setting, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <Label className="font-normal cursor-pointer">
                            {setting.label}
                          </Label>
                          <Switch defaultChecked={setting.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4" />

                  {/* Password & Security */}
                  <div>
                    <h3 className="font-semibold mb-4">Password & Security</h3>
                    <div className="space-y-3 ml-8">
                      <Button variant="outline" className="w-full">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full">
                        Review Active Sessions
                      </Button>
                      <Button variant="outline" className="w-full">
                        Enable Two-Factor Authentication
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Display & Theme Section */}
          {activeSection === "display" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Display & Theme</h2>
                <p className="text-sm text-muted-foreground">
                  Customize how GoalFlow appears
                </p>
              </div>

              <Card className="p-6">
                <div className="space-y-6">
                  {/* Theme Selection */}
                  <div>
                    <h3 className="font-semibold mb-4">Color Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: "Light", value: "light", bg: "bg-white border-2 border-primary" },
                        { name: "Dark", value: "dark", bg: "bg-slate-900 border border-border" },
                        { name: "Auto", value: "auto", bg: "bg-gradient-to-br from-white to-slate-900 border border-border" },
                      ].map((theme) => (
                        <button
                          key={theme.value}
                          className={`p-4 rounded-lg text-center transition-all cursor-pointer ${
                            theme.bg
                          }`}
                        >
                          <div className={`w-12 h-12 mx-auto mb-2 rounded-lg ${theme.bg}`} />
                          <p className="text-sm font-medium">{theme.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4" />

                  {/* Font Size */}
                  <div>
                    <h3 className="font-semibold mb-4">Font Size</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Small", value: "sm" },
                        { label: "Normal", value: "normal" },
                        { label: "Large", value: "lg" },
                      ].map((size) => (
                        <label key={size.value} className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="fontSize" defaultChecked={size.value === "normal"} />
                          <span className="text-sm">{size.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4" />

                  {/* Display Options */}
                  <div>
                    <h3 className="font-semibold mb-4">Display Options</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Compact mode", enabled: false },
                        { label: "Show avatars", enabled: true },
                        { label: "Show animations", enabled: true },
                      ].map((option, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <Label className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                          <Switch defaultChecked={option.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* General Preferences Section */}
          {activeSection === "preferences" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">General Preferences</h2>
                <p className="text-sm text-muted-foreground">
                  Configure your general application preferences
                </p>
              </div>

              <Card className="p-6">
                <div className="space-y-6">
                  {/* Language & Locale */}
                  <div>
                    <h3 className="font-semibold mb-4">Language & Location</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm">Language</Label>
                        <select className="w-full mt-2 px-3 py-2 rounded-lg border border-border bg-background">
                          <option>English (US)</option>
                          <option>English (UK)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-sm">Timezone</Label>
                        <select className="w-full mt-2 px-3 py-2 rounded-lg border border-border bg-background">
                          <option>UTC-8 (Pacific)</option>
                          <option>UTC-5 (Eastern)</option>
                          <option>UTC (London)</option>
                          <option>UTC+1 (Europe)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4" />

                  {/* Default Views */}
                  <div>
                    <h3 className="font-semibold mb-4">Default Views</h3>
                    <div className="space-y-4">
                      {[
                        { label: "Open goals in new tab", enabled: false },
                        { label: "Expand comments by default", enabled: false },
                        { label: "Show achievements dashboard", enabled: true },
                      ].map((pref, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <Label className="font-normal cursor-pointer">
                            {pref.label}
                          </Label>
                          <Switch defaultChecked={pref.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4" />

                  {/* Accessibility */}
                  <div>
                    <h3 className="font-semibold mb-4">Accessibility</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Enable high contrast", enabled: false },
                        { label: "Reduce motion", enabled: false },
                        { label: "Use keyboard shortcuts", enabled: true },
                      ].map((option, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <Label className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                          <Switch defaultChecked={option.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <Button>Save Changes</Button>
            <Button variant="outline">Discard</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
