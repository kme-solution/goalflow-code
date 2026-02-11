"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Target } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LoginForm } from "./login-form"

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const router = useRouter()

  const handleSuccess = () => {
    onOpenChange(false)
    router.push("/dashboard")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
        <div className="flex flex-col">
          <DialogHeader className="space-y-4 px-6 pt-6 pb-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Target className="h-7 w-7" />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold">Welcome back</DialogTitle>
              <DialogDescription>Sign in to your GoalFlow Pro account</DialogDescription>
            </div>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh]">
            <div className="px-6 pb-6">
              <LoginForm
                idPrefix="modal"
                dividerBgClass="bg-background"
                onSuccess={handleSuccess}
                onNavigateAway={() => onOpenChange(false)}
              />
            </div>
          </ScrollArea>

          <div className="flex justify-center border-t px-6 py-4 bg-muted/30">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
                onClick={() => onOpenChange(false)}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
