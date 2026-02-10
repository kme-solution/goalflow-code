import { type NextRequest } from "next/server"

interface RouteParams {
  params: { userId: string }
}

// WebSocket connections storage (in production, use Redis or similar)
const connections = new Map<string, WebSocket[]>()

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = params.userId

    // Check if WebSocket is supported
    if (!request.headers.get("upgrade")?.includes("websocket")) {
      return new Response("Expected WebSocket connection", { status: 400 })
    }

    // Create WebSocket pair
    const { 0: client, 1: server } = new WebSocketPair()

    // Store the connection
    if (!connections.has(userId)) {
      connections.set(userId, [])
    }
    connections.get(userId)!.push(server)

    // Handle WebSocket messages
    server.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data)

        // Handle different message types
        switch (data.type) {
          case "ping":
            server.send(JSON.stringify({
              type: "pong",
              timestamp: new Date().toISOString(),
            }))
            break

          case "subscribe":
            server.send(JSON.stringify({
              type: "subscribed",
              userId,
              timestamp: new Date().toISOString(),
            }))
            break

          default:
            server.send(JSON.stringify({
              type: "error",
              message: "Unknown message type",
              timestamp: new Date().toISOString(),
            }))
        }
      } catch (error) {
        server.send(JSON.stringify({
          type: "error",
          message: "Invalid message format",
          timestamp: new Date().toISOString(),
        }))
      }
    })

    // Handle connection close
    server.addEventListener("close", () => {
      const userConnections = connections.get(userId) || []
      const index = userConnections.indexOf(server)
      if (index > -1) {
        userConnections.splice(index, 1)
        if (userConnections.length === 0) {
          connections.delete(userId)
        }
      }
    })

    // Send initial connection message
    server.send(JSON.stringify({
      type: "connected",
      message: "WebSocket connection established",
      userId,
      timestamp: new Date().toISOString(),
    }))

    return new Response(null, {
      status: 101,
      webSocket: client,
    })
  } catch (error) {
    console.error("WebSocket connection error:", error)
    return new Response("WebSocket connection failed", { status: 500 })
  }
}

// Function to broadcast notifications to specific users
export function broadcastToUser(userId: string, data: any) {
  const userConnections = connections.get(userId) || []
  const message = JSON.stringify({
    ...data,
    timestamp: new Date().toISOString(),
  })

  userConnections.forEach(connection => {
    try {
      connection.send(message)
    } catch (error) {
      console.error("Error sending message to user:", userId, error)
    }
  })
}

// Function to broadcast to all users in an organization
export function broadcastToOrganization(organizationId: string, data: any) {
  // This would require maintaining organization -> user mappings
  // For now, we'll broadcast to all connected users
  const message = JSON.stringify({
    ...data,
    timestamp: new Date().toISOString(),
  })

  connections.forEach((userConnections) => {
    userConnections.forEach(connection => {
      try {
        connection.send(message)
      } catch (error) {
        console.error("Error broadcasting message:", error)
      }
    })
  })
}