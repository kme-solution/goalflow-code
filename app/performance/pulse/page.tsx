"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function PulsePage() {
  const data = [
    { name: "Great 🎉", value: 5 },
    { name: "Good 😊", value: 12 },
    { name: "Neutral 😐", value: 4 },
    { name: "Struggling 😞", value: 1 },
  ]

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Team Pulse</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Average Mood</div>
          <div className="text-3xl font-bold">😊</div>
          <div className="text-xs text-muted-foreground mt-1">22 check-ins this week</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Check-in Rate</div>
          <div className="text-3xl font-bold">85%</div>
          <div className="text-xs text-muted-foreground mt-1">Of team members</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Average Energy</div>
          <div className="text-3xl font-bold">7.2</div>
          <div className="text-xs text-muted-foreground mt-1">Out of 10</div>
        </Card>
      </div>

      <Card className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
