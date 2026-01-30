import type { Recognition } from "@/lib/types/recognition.types"

export const MOCK_RECOGNITIONS: Recognition[] = [
  {
    id: "rec-001",
    fromUserId: "mgr-001",
    fromUserName: "Michael Chen",
    fromUserAvatar: "/engineering-manager.png",
    toUserId: "emp-001",
    toUserName: "Emily Rodriguez",
    toUserAvatar: "/software-engineer-workspace.png",
    type: "manager",
    badge: "innovator",
    message:
      "Outstanding work on implementing the new authentication system! Your attention to security details was exceptional.",
    isPublic: true,
    createdAt: "2025-03-15T10:30:00Z",
    likes: 12,
    likedBy: ["emp-002", "emp-003"],
    comments: [
      {
        id: "c1",
        userId: "emp-002",
        userName: "John Smith",
        message: "Well deserved! Great work Emily!",
        createdAt: "2025-03-15T11:00:00Z",
      },
    ],
  },
  {
    id: "rec-002",
    fromUserId: "emp-002",
    fromUserName: "John Smith",
    toUserId: "emp-001",
    toUserName: "Emily Rodriguez",
    toUserAvatar: "/software-engineer-workspace.png",
    type: "peer",
    badge: "team_player",
    message: "Thanks for helping me debug that tricky CSS issue yesterday! You're always willing to help.",
    isPublic: true,
    createdAt: "2025-03-14T15:20:00Z",
    likes: 8,
  },
]
