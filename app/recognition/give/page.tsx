"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function GiveRecognitionPage() {
  const [message, setMessage] = useState("")

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Give Recognition</h1>

      <Card className="p-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="recipient">Who do you want to recognize?</Label>
            <Input id="recipient" placeholder="Search team members..." />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex flex-wrap gap-2">
              {["Quality", "Teamwork", "Innovation", "Speed", "Customer Focus"].map((cat) => (
                <Button key={cat} variant="outline" type="button">
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Your message</Label>
            <Textarea
              id="message"
              placeholder="Share your appreciation..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <Button className="w-full">Send Recognition</Button>
        </form>
      </Card>
    </div>
  )
}
