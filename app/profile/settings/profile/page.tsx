'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { User, Upload, Mail, Phone, Briefcase, MapPin } from 'lucide-react'

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Senior Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
  })

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal profile information and avatar
        </p>
      </div>

      {/* Profile Picture */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-2">Profile Picture</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload a profile photo to personalize your account
            </p>
          </div>
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex gap-3 pt-4">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo
          </Button>
          <Button variant="outline" size="sm">
            Remove
          </Button>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Personal Information</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
          <div>
            <Label className="text-sm font-medium mb-2 block">First Name</Label>
            <Input
              value={profile.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Last Name</Label>
            <Input
              value={profile.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t mt-6">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Contact Information</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
          <div>
            <Label className="text-sm font-medium mb-2 block">Email Address</Label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Phone Number</Label>
            <Input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t mt-6">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </Card>

      {/* Work Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Work Information</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
          <div>
            <Label className="text-sm font-medium mb-2 block">Job Title</Label>
            <Input
              value={profile.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Department</Label>
            <Input
              value={profile.department}
              onChange={(e) => handleChange('department', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Location</Label>
          <Input
            value={profile.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t mt-6">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
  )
}
