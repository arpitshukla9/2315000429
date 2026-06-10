# AffordMed Backend Round

Hello 

I'm **Arpit Shukla**, and this repository contains my solution for the **AffordMed Backend Assessment**.

I selected the **Backend Track** and completed both required deliverables:

* Vehicle Maintenance Scheduler Microservice
* Campus Notification System Design

---

# Deliverable 1 - Vehicle Maintenance Scheduler

## Overview

The goal of this task was to build a backend service that fetches depot and vehicle maintenance information from the AffordMed evaluation APIs and generates an optimized maintenance schedule.

The optimization objective is to maximize maintenance impact while staying within the mechanic hour constraints available at each depot.

---

## Approach

After analyzing the problem, I mapped it to the classic **0/1 Knapsack Problem**.

| Maintenance Scheduling | Knapsack Equivalent |
| ---------------------- | ------------------- |
| Mechanic Hours         | Capacity            |
| Duration               | Weight              |
| Impact                 | Value               |
| Vehicle Task           | Item                |

Using Dynamic Programming, the scheduler calculates the best combination of maintenance tasks for each depot.

---

## Features Implemented

* Depot API Integration
* Vehicle API Integration
* Dynamic Programming Based Optimization
* Structured Logging Utility
* Error Handling
* REST API Endpoint
* Output Verification Screenshots

---

## API Endpoint

### Generate Optimized Schedule

```http
GET /api/v1/schedule
```

### Sample Response

```json
{
  "success": true,
  "schedules": [
    {
      "depotId": "DEPOT_1",
      "mechanicHours": 20,
      "totalImpact": 42,
      "selectedTasks": [
        "TASK_1",
        "TASK_2"
      ]
    }
  ]
}
```

---

## Project Structure

```text
AffordMed/
│
├── docs/
│   └── Notification_System_Design.md
│
├── logs/
│   └── app.log
│
├── output/
│
├── src/
│   ├── config/
│   │   └── axios.js
│   │
│   ├── controllers/
│   │   └── scheduler.controller.js
│   │
│   ├── middleware/
│   │   └── logger.js
│   │
│   ├── routes/
│   │   └── scheduler.routes.js
│   │
│   ├── services/
│   │   ├── depot.service.js
│   │   ├── vehicle.service.js
│   │   └── knapsack.service.js
│   │
│   └── test.js
│
├── server.js
├── package.json
└── README.md
```

---

## Logging

A reusable logging utility was implemented and integrated throughout the application.

Logs are generated for:

* API Requests
* Successful Operations
* Error Scenarios
* Scheduler Execution Flow

Example:

```json
{
  "timeStamp": "2026-06-10T07:38:49.858Z",
  "stack": "backend",
  "level": "info",
  "package": "scheduler-controller",
  "message": "Optimization completed successfully"
}
```

---

## Debugging & Development Notes

While building the solution, I intentionally preserved execution logs generated during development.

These logs capture the complete debugging journey, including:

### Authentication Issue

```text
Request failed with status code 401
```

Resolved by correcting token usage and authentication configuration.

### Optimization Result Issue

```text
selectedTasks is not defined
```

Resolved by aligning the optimizer response structure with the controller requirements.

### Mapping Error

```text
Cannot read properties of undefined (reading 'map')
```

Resolved by fixing the response object returned from the optimization service.

### Final Successful Execution

```text
Starting optimization
Fetching depots
Depots fetched successfully
Fetching vehicles
Vehicles fetched successfully
Optimization completed successfully
```

The final logs demonstrate successful end-to-end execution of the scheduler workflow.

---

# Deliverable 2 - Campus Notification System Design

## Objective

Design a scalable notification platform capable of handling:

* Placement Notifications
* Examination Updates
* Event Announcements
* Emergency Alerts
* Department Specific Notifications

---

## Design Goals

* Scalability
* Reliability
* Low Latency
* Fault Tolerance
* Efficient Notification Ranking

---

## Proposed Architecture

```text
Student Application
        │
        ▼
   API Gateway
        │
        ▼
Notification Service
   ┌───────────────┐
   ▼               ▼
 Redis        PostgreSQL
   │
   ▼
 RabbitMQ
   │
   ▼
 Worker Cluster
   │
   ▼
 Email / Push Notification Services
```

---

## Key Design Decisions

### PostgreSQL

Selected for:

* ACID Compliance
* Strong Consistency
* Reliable Transactions
* Efficient Query Optimization

### Redis

Selected for:

* Fast Reads
* Reduced Database Load
* Improved Response Times

### RabbitMQ

Selected for:

* Reliable Notification Delivery
* Retry Mechanisms
* Dead Letter Queue Support
* High Throughput Processing

### Notification Ranking

A Min Heap based ranking approach is proposed to efficiently retrieve the Top 10 most important notifications.

---

## Documentation

Detailed architecture and system design documentation is available in:

```text
docs/Notification_System_Design.md
```

---

## Output Evidence

The `output/` directory contains screenshots demonstrating:

* Authentication Setup
* Depot API Response
* Vehicle API Response
* Scheduler API Output
* Logging Output

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run dev
```

Access:

```http
GET http://localhost:5000/api/v1/schedule
```

---

## Final Note

This assessment was approached with a focus on correctness, maintainability, and system design principles.

In addition to the final working implementation, the repository also preserves the debugging and problem-solving process through structured logs, providing visibility into how issues were identified and resolved during development.

Thank you for reviewing my submission.

**Arpit Shukla**
