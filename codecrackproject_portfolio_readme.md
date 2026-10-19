# Codecrackproject — Engineering Portfolio README

## 1. Project Overview

**Codecrackproject** is a full-stack, real-time analytics and telemetry dashboard built with Next.js App Router, React, TypeScript, and PostgreSQL. 

The project explores the engineering challenges of building high-frequency client-server telemetry systems. It implements a reactive dashboard that tracks visitor activity, system resource utilization, user demographics, and application interaction metrics through dynamic polling and state orchestration. Designed as both a performance playground and a diagnostic interface, Codecrackproject demonstrates production-aligned patterns for data aggregation, asynchronous state management, and real-time visualization.

---

## 2. Key Features

* **Real-Time Telemetry Dashboard:** A responsive analytics suite featuring live metric visualization powered by Recharts, providing instant feedback on system state and user engagement.
* **Granular Polling Architecture:** Multi-tier client polling separating high-frequency resource metrics (every 1 second) from lower-frequency aggregate metrics (every 5 seconds) to optimize throughput.
* **Visitor Tracking & Lifecycle Management:** Automated visitor registration, session tracking, and active-user state management via dedicated API route handlers.
* **Demographic Aggregation:** Server-side grouping and real-time calculation of user distribution by country of origin.
* **Interactive Visualizations & Graphics:** Integrated UI motion effects, WebGL graphics rendering via OGL, and clean iconography for an immersive user experience.

---

## 3. Technology Stack

* **Framework:** Next.js 16 (App Router)
* **UI Library:** React 19, Tailwind CSS 4
* **Language:** TypeScript
* **State Management:** Zustand
* **Data Visualization:** Recharts
* **Graphics & Animation:** Motion, OGL
* **Database & ORM:** PostgreSQL, Prisma

---

## 4. Architecture & Data Flow

Codecrackproject adopts a decoupled client-server pattern where browser-side polling hooks query Next.js Route Handlers, updating a centralized global state store that drives the UI.

```text
Home page / visitor activity
            |
            v
      API route handlers (src/app/api/)
            |
            v
      PostgreSQL database
            |
            v
    Metrics polling component (systemMetricsPoller.tsx)
            |
            v
       Zustand Store (useMetricsStore.tsx)
            |
            v
      Dashboard UI & Recharts Visualizations
```

### Core Structural Layout
- **`src/app/api/`** — Server-side route handlers managing isolated data domains (active users, attempts, demographics, memory, network, visitor counts).
- **`src/app/(utils)/`** — Client orchestration layer containing the Zustand store and background polling logic.
- **`src/prisma/`** — Data contract definitions, connection initializers, and development seeding scripts.

---

## 5. Key Engineering Decisions

* **Zustand for Client State:** Chosen for its lightweight footprint and minimal boilerplate compared to Redux or React Context, allowing high-frequency metric updates to propagate directly to dashboard components without triggering unnecessary React tree re-renders.
* **Asynchronous Tiered Polling:** Separating high-cadence probes (memory/network metrics at 1s intervals) from low-cadence aggregation queries (demographics/active users at 5s intervals) prevents thread starvation and database connection saturation.
* **Next.js App Router & Route Handlers:** Leveraged native backend routing to co-locate API endpoints cleanly within the application structure, streamlining data contracts between the database and client components.

---

## 6. Challenges and Improvements

During development and code review, several architectural constraints and edge cases were identified and addressed:

* **HTTP Method Semantic Leak:** The original implementation of `GET /api/visitorCount` introduced a write side-effect by incrementing the counter on every read request. *Improvement:* Noted for refactoring to strict CQRS principles (separating read queries from write mutations).
* **Network Metric Precision:** The `networkMetric` endpoint originally measured database query execution duration rather than true end-to-end network latency. *Improvement:* Documented explicitly to prevent metric misinterpretation and guide future client-ping implementation.
* **Credential Hygiene:** Identified and remediated hardcoded database configuration credentials by migrating fully to environment-variable-driven connection strings.

---

## 7. Demo and Screenshots

*(Include screenshots of the active dashboard, real-time Recharts visualizations, and a link to a recorded video demo or live deployment here.)*

---

## 8. My Contributions and Next Steps

* **Contributions:** Designed and built the complete full-stack architecture from database schema definition (Prisma/PostgreSQL) to API route creation, custom polling hooks, Zustand state integration, and the reactive Recharts dashboard interface.
* **Known Limitations:** Polling-based updates scale effectively for moderate loads but face connection overhead at high user volumes; migration to WebSockets or Server-Sent Events (SSE) is a planned architectural upgrade.
* **Next Steps:** 
  1. Refactor query endpoints to eliminate read-side mutations.
  2. Implement comprehensive automated integration testing for telemetry endpoints.
  3. Explore WebSockets for sub-second streaming metrics.