import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Zap, Target, Award, BarChart3, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function FeaturesSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Feature Management</h1>
        <p className="text-muted-foreground mt-2">
          Enable or disable features for your organization
        </p>
      </div>

      {/* Goals Management */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Goals Management</h3>
              <p className="text-sm text-muted-foreground">
                Enable goal setting, tracking, and progress monitoring
              </p>
            </div>
          </div>
          <Badge>Enabled</Badge>
        </div>

        <div className="space-y-3 pl-8">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Allow team members to set goals</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable goal alignment</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Show progress tracking</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable quarterly reviews</span>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Recognition System */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Recognition System</h3>
              <p className="text-sm text-muted-foreground">
                Manage peer recognition, kudos, and badges
              </p>
            </div>
          </div>
          <Badge>Enabled</Badge>
        </div>

        <div className="space-y-3 pl-8">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable peer recognition</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Allow custom values</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Show recognition leaderboards</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable badge system</span>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Performance Reviews */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Performance Reviews</h3>
              <p className="text-sm text-muted-foreground">
                Manage review cycles and evaluation templates
              </p>
            </div>
          </div>
          <Badge>Enabled</Badge>
        </div>

        <div className="space-y-3 pl-8">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable self-assessments</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable manager reviews</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable peer feedback (360)</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable calibration sessions</span>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Check-ins */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Check-ins</h3>
              <p className="text-sm text-muted-foreground">
                Enable regular check-in conversations
              </p>
            </div>
          </div>
          <Badge>Enabled</Badge>
        </div>

        <div className="space-y-3 pl-8">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable daily check-ins</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Show mood tracking</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable manager access</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Show team pulse</span>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Activity Feed */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Activity Feed</h3>
              <p className="text-sm text-muted-foreground">
                Manage social activity and notifications
              </p>
            </div>
          </div>
          <Badge>Enabled</Badge>
        </div>

        <div className="space-y-3 pl-8">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable main feed</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Enable team feed</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Allow comments and reactions</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Show real-time notifications</span>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>
    </div>
  )
}
