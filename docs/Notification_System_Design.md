# Campus Notification Platform Architecture

## Problem Statement

A university requires a highly scalable notification platform capable of delivering placement alerts, examination updates, event announcements, internship opportunities, and emergency notifications to thousands of students simultaneously while maintaining low latency and high reliability.

The system must:

* Support large user volumes
* Deliver notifications reliably
* Minimize database load
* Prioritize important notifications
* Scale during placement seasons and examination periods

---

# Stage 1 — REST API Design

## Create Notification

```http
POST /api/v1/notifications
```

Purpose:
Create a new notification for one or more students.

Request:

```json
{
  "title": "Microsoft Internship Drive",
  "message": "Registration closes tomorrow",
  "category": "placement",
  "priority": 10,
  "targetAudience": ["CSE", "IT"]
}
```

Response:

```json
{
  "success": true,
  "notificationId": "uuid"
}
```

---

## Fetch User Notifications

```http
GET /api/v1/users/{userId}/notifications
```

Returns notifications sorted by importance and recency.

---

## Mark Notification As Read

```http
PATCH /api/v1/notifications/{notificationId}/read
```

---

## Delete Notification

```http
DELETE /api/v1/notifications/{notificationId}
```

---

# Stage 2 — Database Design

## Database Selection

### PostgreSQL

I selected PostgreSQL because:

* Strong ACID guarantees
* Excellent indexing capabilities
* Transaction support
* High reliability for academic systems
* Better consistency compared to NoSQL alternatives

---

## Core Tables

### Users

```sql
CREATE TABLE users(
    id UUID PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255),
    department VARCHAR(50),
    semester INTEGER
);
```

### Notifications

```sql
CREATE TABLE notifications(
    id UUID PRIMARY KEY,
    title VARCHAR(255),
    message TEXT,
    category VARCHAR(50),
    priority INTEGER,
    created_at TIMESTAMP
);
```

### UserNotifications

```sql
CREATE TABLE user_notifications(
    user_id UUID,
    notification_id UUID,
    is_read BOOLEAN DEFAULT FALSE,
    delivered_at TIMESTAMP,
    PRIMARY KEY(user_id, notification_id)
);
```

---

# Stage 3 — Query Optimization Strategy

### High Frequency Query

```sql
SELECT *
FROM user_notifications
WHERE user_id = ?
AND is_read = FALSE;
```

Without optimization, database scans become expensive as notification volume increases.

### Solution

Composite Index

```sql
CREATE INDEX idx_user_read
ON user_notifications(user_id, is_read);
```

### Why Composite Index?

Most application requests simultaneously filter:

* user_id
* is_read

A composite index directly accelerates the exact query pattern used by the application.

---

# Stage 4 — Caching Layer

## Challenge

Thousands of students repeatedly opening the notification page can generate excessive database reads.

## Proposed Solution

Redis Cache Layer

### Architecture

Student App
↓
Notification API
↓
Redis
↓
PostgreSQL

### Flow

1. User requests notifications.
2. System checks Redis first.
3. Cache hit → immediate response.
4. Cache miss → query PostgreSQL.
5. Store result back in Redis.

### Benefits

* Lower database load
* Faster response time
* Improved scalability

---

# Stage 5 — Reliable Delivery Mechanism

## Problem

During placement drives, a notification may need to reach 20,000+ students.

Synchronous delivery introduces:

* Timeout risks
* Partial failures
* High response latency

---

## Proposed Architecture

Notification API
↓
Message Queue
↓
Worker Cluster
↓
Email / Push Service

### Technology Choice

RabbitMQ

Reason:

* Reliable acknowledgements
* Retry support
* Dead Letter Queues
* Simpler operational complexity

---

## Failure Handling

If delivery fails:

1. Message remains in queue.
2. Worker retries automatically.
3. Failed messages move to Dead Letter Queue.
4. Administrators can inspect and reprocess failures.

This prevents notification loss.

---

# Stage 6 — Smart Notification Ranking

## Requirement

Students should immediately see the most relevant notifications.

Examples:

* Placement deadline tomorrow
* Exam postponed
* Internship registration closes today

must rank above:

* Old club announcements

---

## Ranking Formula

Importance Score:

```text
Score =
(0.7 × Priority)
+
(0.3 × Recency)
```

Priority reflects urgency.

Recency reflects freshness.

---

## Data Structure

Min Heap

Reason:

Instead of sorting all notifications:

```text
O(n log n)
```

Maintain only top 10 entries:

```text
O(n log 10)
```

which is effectively linear.

---

# Scalability Enhancements

Future improvements:

* WebSocket real-time notifications
* Notification preference settings
* Multi-channel delivery (Email, SMS, Push)
* Analytics dashboard
* Notification scheduling

---

# Final Production Architecture

Student Web App / Mobile App
↓
API Gateway
↓
Notification Service
↓
Redis Cache
↓
PostgreSQL

Notification Service
↓
RabbitMQ
↓
Worker Cluster
↓
Email Service / Push Notification Service

This architecture prioritizes reliability, scalability, fault tolerance, and low latency while remaining simple enough to operate within a university environment.
