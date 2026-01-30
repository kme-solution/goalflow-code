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
- `status` (optional): Filter by status (not_started, on_track, at_risk, behind, completed)

Response:
```json
{
  "success": true,
  "goals": [
    {
      "id": "goal-001",
      "title": "Increase Platform Performance",
      "description": "Optimize database queries",
      "type": "company",
      "status": "on_track",
      "priority": "high",
      "progress": 65,
      "ownerId": "user-001",
      "ownerName": "John Doe",
      "startDate": "2025-01-01",
      "dueDate": "2025-12-31",
      "metrics": [
        {
          "id": "m1",
          "name": "Page Load Time",
          "target": 1.5,
          "current": 2.1,
          "unit": "seconds"
        }
      ]
    }
  ]
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

## Analytics API

### GET /api/analytics/performance

Response: See `lib/types/analytics.types.ts` for full schema

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
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Data Types

All DTOs and types are defined in `lib/types/*.types.ts`. Backend implementations should match these interfaces exactly for seamless integration.
