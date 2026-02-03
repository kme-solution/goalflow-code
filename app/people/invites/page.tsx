"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  UserPlus,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Copy,
  RefreshCw,
  Trash2,
} from "lucide-react"
import { MOCK_DEPARTMENTS } from "@/lib/mock-data/organization"

interface Invite {
  id: string
  email: string
  name?: string
  role: string
  departmentId?: string
  status: "pending" | "accepted" | "expired" | "cancelled"
  sentAt: string
  expiresAt: string
}

const MOCK_INVITES: Invite[] = [
  {
    id: "inv-001",
    email: "alex.johnson@example.com",
    name: "Alex Johnson",
    role: "employee",
    departmentId: "dept-eng",
    status: "pending",
    sentAt: "2026-02-01T10:00:00Z",
    expiresAt: "2026-02-08T10:00:00Z",
  },
  {
    id: "inv-002",
    email: "sarah.williams@example.com",
    name: "Sarah Williams",
    role: "manager",
    departmentId: "dept-marketing",
    status: "accepted",
    sentAt: "2026-01-25T14:30:00Z",
    expiresAt: "2026-02-01T14:30:00Z",
  },
  {
    id: "inv-003",
    email: "mike.brown@example.com",
    role: "employee",
    departmentId: "dept-sales",
    status: "expired",
    sentAt: "2026-01-15T09:00:00Z",
    expiresAt: "2026-01-22T09:00:00Z",
  },
]

export default function PeopleInvitesPage() {
  const [invites, setInvites] = useState<Invite[]>(MOCK_INVITES)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newInvite, setNewInvite] = useState({
    emails: "",
    role: "employee",
    departmentId: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)

  const handleSendInvites = async () => {
    setIsSending(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    const emails = newInvite.emails.split(/[,\n]/).map((e) => e.trim()).filter(Boolean)
    const newInvites: Invite[] = emails.map((email, index) => ({
      id: `inv-new-${Date.now()}-${index}`,
      email,
      role: newInvite.role,
      departmentId: newInvite.departmentId || undefined,
      status: "pending" as const,
      sentAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }))

    setInvites([...newInvites, ...invites])
    setNewInvite({ emails: "", role: "employee", departmentId: "", message: "" })
    setIsSending(false)
    setIsDialogOpen(false)
  }

  const handleResend = (invite: Invite) => {
    setInvites(
      invites.map((i) =>
        i.id === invite.id
          ? {
              ...i,
              status: "pending" as const,
              sentAt: new Date().toISOString(),
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            }
          : i
      )
    )
  }

  const handleCancel = (inviteId: string) => {
    setInvites(invites.filter((i) => i.id !== inviteId))
  }

  const getStatusBadge = (status: Invite["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "accepted":
        return (
          <Badge variant="default" className="gap-1 bg-success text-success-foreground">
            <CheckCircle className="h-3 w-3" />
            Accepted
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Expired
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="gap-1">
            <XCircle className="h-3 w-3" />
            Cancelled
          </Badge>
        )
    }
  }

  const pendingCount = invites.filter((i) => i.status === "pending").length
  const acceptedCount = invites.filter((i) => i.status === "accepted").length

  return (
    <ProtectedRoute allowedRoles={["hr_admin"]}>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Invitations</h1>
              <p className="text-muted-foreground mt-1">
                Invite new people to join your organization
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Invite People
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Invite People</DialogTitle>
                  <DialogDescription>
                    Send invitations to join your organization. They will receive an email with
                    instructions to get started.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="emails">Email Addresses</Label>
                    <Textarea
                      id="emails"
                      placeholder="Enter email addresses (one per line or comma-separated)"
                      value={newInvite.emails}
                      onChange={(e) => setNewInvite({ ...newInvite, emails: e.target.value })}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      You can enter multiple emails separated by commas or new lines
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={newInvite.role}
                        onValueChange={(value) => setNewInvite({ ...newInvite, role: value })}
                      >
                        <SelectTrigger id="role">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employee">Employee</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="team_lead">Team Lead</SelectItem>
                          <SelectItem value="hr_admin">HR Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={newInvite.departmentId}
                        onValueChange={(value) =>
                          setNewInvite({ ...newInvite, departmentId: value })
                        }
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Optional" />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_DEPARTMENTS.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Personal Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Add a personal note to the invitation..."
                      value={newInvite.message}
                      onChange={(e) => setNewInvite({ ...newInvite, message: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSendInvites}
                    disabled={!newInvite.emails.trim() || isSending}
                    className="gap-2"
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Invitations
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Invites</p>
                  <p className="text-2xl font-semibold">{invites.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-semibold">{pendingCount}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accepted</p>
                  <p className="text-2xl font-semibold">{acceptedCount}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invites Table */}
          <Card>
            <CardHeader>
              <CardTitle>Invitation History</CardTitle>
              <CardDescription>Track and manage all sent invitations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invites.map((invite) => {
                    const dept = MOCK_DEPARTMENTS.find((d) => d.id === invite.departmentId)
                    return (
                      <TableRow key={invite.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{invite.email}</p>
                            {invite.name && (
                              <p className="text-sm text-muted-foreground">{invite.name}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{invite.role.replace("_", " ")}</TableCell>
                        <TableCell>{dept?.name || "-"}</TableCell>
                        <TableCell>{getStatusBadge(invite.status)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(invite.sentAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {invite.status === "pending" && (
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Copy className="h-4 w-4" />
                              </Button>
                            )}
                            {(invite.status === "expired" || invite.status === "pending") && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleResend(invite)}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            )}
                            {invite.status !== "accepted" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleCancel(invite.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {invites.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Mail className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 font-semibold">No invitations yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Click "Invite People" to send your first invitation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
