# API Integration Guide

This document provides guidelines for backend developers to implement the API endpoints that replace the mock data in GoalFlow Pro.

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

### POST /api/auth/login

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "user-001",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "employee",
    "department": "Engineering",
    "title": "Senior Engineer"
  },
  "token": "jwt-token-here"
}
```

### POST /api/auth/logout

Request: No body required

Response:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /api/auth/me

Response:
```json
{
  "success": true,
  "user": {
    "id": "user-001",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "employee"
  }
}
```

## Goals API

### GET /api/goals

Query Parameters:
- `userId` (optional): Filter by user ID
- `type` (optional): Filter by goal type (company, department, team, individual)
- `status` (optional): Filter by status (draft, active, completed, at_risk, archived)

Response:
```json
{
  "success": true,
  "goals": [
    {
      "id": "goal-001",
      "organizationId": "org-001",
      "title": "Increase Platform Performance",
      "description": "Optimize database queries",
      "type": "objective",
      "level": "company",
      "targetValue": 100,
      "currentValue": 65,
      "unit": "percentage",
      "confidence": 8,
      "confidenceLevel": "green",
      "startDate": "2025-01-01",
      "endDate": "2025-12-31",
      "status": "active",
      "ownerId": "user-001",
      "ownerName": "John Doe",
      "contributors": ["user-002", "user-003"],
      "progress": 65,
      "riskLevel": "low_risk",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-02-01T00:00:00Z",
      "progressHistory": []
    }
  ],
  "total": 25
}
```

### POST /api/goals/[id]/progress

Update the progress of a specific goal.

Request:
```json
{
  "newValue": 75,
  "confidence": 9,
  "comment": "Made significant progress on database optimization",
  "evidenceUrl": "https://example.com/evidence.pdf"
}
```

Response:
```json
{
  "success": true,
  "goal": {
    "id": "goal-001",
    "currentValue": 75,
    "confidence": 9,
    "confidenceLevel": "green",
    "progress": 75,
    "riskLevel": "low_risk",
    "updatedAt": "2025-02-10T10:00:00Z",
    "progressHistory": [
      {
        "id": "progress-001",
        "goalId": "goal-001",
        "previousValue": 65,
        "newValue": 75,
        "confidence": 9,
        "comment": "Made significant progress on database optimization",
        "evidenceUrl": "https://example.com/evidence.pdf",
        "userId": "user-001",
        "createdAt": "2025-02-10T10:00:00Z"
      }
    ]
  }
}
```

## Reviews API

### GET /api/reviews

Query Parameters:
- `employeeId` (optional): Filter by employee ID
- `managerId` (optional): Filter by manager ID
- `status` (optional): Filter by status

Response: See `lib/types/review.types.ts` for full schema

## Employees API

### GET /api/employees

Query Parameters:
- `departmentId` (optional): Filter by department
- `managerId` (optional): Filter by manager
- `status` (optional): Filter by status

Response: See `lib/types/employee.types.ts` for full schema

## Recognitions API

### GET /api/recognitions

Query Parameters:
- `userId` (optional): Filter recognitions for/from user
- `type` (optional): Filter by type (peer, manager, company)

Response:
```json
{
  "success": true,
  "recognitions": [
    {
      "id": "rec-001",
      "fromUserId": "user-001",
      "fromUserName": "John Doe",
      "toUserId": "user-002",
      "toUserName": "Jane Smith",
      "badge": "team_player",
      "message": "Great collaboration on the project!",
      "type": "peer",
      "isPublic": true,
      "createdAt": "2025-02-10T09:00:00Z"
    }
  ]
}
```

### POST /api/recognitions

Request:
```json
{
  "toUserId": "user-002",
  "badge": "team_player",
  "message": "Great collaboration!",
  "isPublic": true
}
```

Response:
```json
{
  "success": true,
  "recognition": {
    "id": "rec-001",
    "fromUserId": "user-001",
    "fromUserName": "John Doe",
    "toUserId": "user-002",
    "toUserName": "Jane Smith",
    "badge": "team_player",
    "message": "Great collaboration!",
    "type": "peer",
    "isPublic": true,
    "createdAt": "2025-02-10T09:00:00Z"
  }
}
```

## Analytics API

### GET /api/analytics/performance

Response: See `lib/types/analytics.types.ts` for full schema

## Notifications API

### GET /api/notifications

Query Parameters:
- `userId` (optional): Filter by user ID

Response:
```json
{
  "success": true,
  "notifications": [
    {
      "id": "notif-001",
      "userId": "user-001",
      "type": "goal",
      "priority": "high",
      "title": "Goal Progress Update",
      "message": "Your goal 'Implement Authentication System' is now 75% complete",
      "link": "/goals/my",
      "isRead": false,
      "createdAt": "2025-02-10T10:00:00Z"
    }
  ],
  "unreadCount": 3
}
```

## Error Handling

All API endpoints should return errors in this format:

```json
{
  "success": false,
  "error": "Error message here",
  "details": {}
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Data Types

All DTOs and types are defined in `lib/types/*.types.ts`. Backend implementations should match these interfaces exactly for seamless integration.

## Implementation Notes

- All dates should be in ISO 8601 format (e.g., "2025-02-10T10:00:00Z")
- Confidence levels use a 1-10 scale where 1-3 = red, 4-7 = yellow, 8-10 = green
- Progress is calculated as a percentage: (currentValue / targetValue) * 100
- User IDs should be consistent across all related entities
- All endpoints should implement proper input validation and sanitization
- Consider implementing rate limiting for public endpoints
- Use appropriate database indexes for frequently queried fields
