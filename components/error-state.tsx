"use client"

import { AlertCircle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ErrorStateProps {
  message?: string
  retry?: () => void
}

export function ErrorState({ message = "Failed to load data", retry }: ErrorStateProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Error Loading Data</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {retry && (
          <Button onClick={retry} variant="outline" size="sm">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  )
}
