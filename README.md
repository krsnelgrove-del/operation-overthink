# Operation-Overthink — System Telemetry & Analytics Dashboard

A high-performance, real-time system telemetry and analytics web application engineered with Next.js (App Router), TypeScript, Prisma ORM, and PostgreSQL. The application provides continuous observation of visitor interactions, active session lifecycles, real-time server latency, memory utilization gauges, breach attempt tracking via interactive vector maps, and geographical user demographic aggregation through asynchronous client-server polling.

## 1. Comprehensive Architecture & File Inventory

The repository follows a clean, decoupled client-server architecture separating database contracts, API route handlers, state management stores, and modular UI components.

### Route Handlers (`src/app/api/`)

* **`src/app/api/activeUsers/route.ts`** — Queries the active session table via Prisma to return connected user profiles, roles, and online timestamps.

* **`src/app/api/attempts/route.ts`** — Aggregates breach attempts and threat vector occurrences.

* **`src/app/api/demographic/route.ts`** — Computes server-side groupings of user distribution mapped by country of origin.

* **`src/app/api/memory/route.ts`** — Exposes system memory capacity and real-time usage metrics.

* **`src/app/api/network/route.ts`** — Calculates network telemetry and ping diagnostics.

* **`src/app/api/visitorCount/route.ts`** — Manages visitor activity telemetry and session registration counters.

### Client Utilities & State Store (`src/app/(utils)/`)

* **`src/app/(utils)/useMetricsStore.ts`** — Centralized Zustand state store managing global telemetry state across all dashboard widgets without triggering cascading React re-renders.

* **`src/app/(utils)/systemMetricsPoller.tsx`** — Background polling orchestrator maintaining multi-tier asynchronous cadences (1000ms for high-frequency resource probes, 5000ms for aggregate demographic polling).

### Core Layout & Navigation Components (`src/app/dashboard/` & `src/components/`)

* **`src/app/dashboard/page.tsx`** — Main dashboard container orchestrating the 12-column grid layout and child panels.

* **`src/app/dashboard/(config)/dashboardCards.tsx`** — Configuration mapping registry pairing UI component references with initial data props and grid spans.

* **`src/components/header.tsx`** — Top-level navigation container featuring brand identification, real-time system status indicators, server info integration, and session termination routing.

* **`src/components/navigationBar.tsx`** — Vertical sidebar navigation providing route switching between Overview, Analytics, and Logs utilizing `lucide-react` iconography.

* **`src/components/header-elements/serverInfo.tsx`** — Node metadata display rendering active server region configuration.

* **`src/components/latencyBadge.tsx`** — Dynamic connection status badge reflecting real-time ping thresholds.

* **`src/components/latencyGraph.tsx`** — Time-series latency visualizer.

* **`src/components/ui/listItem.tsx`** — Reusable list item primitive for active session rows.

### Standardized Dashboard Cards (`src/components/cards/`)

* **`activeSessions.tsx`** — Scrollable active user list featuring custom CSS fade-out masks (`[mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]`) and live session count badges.

* **`breachAttemptsCard.tsx`** — Vector map container utilizing `react-simple-maps` to plot geo-coordinate threat lines between global attack nodes.

* **`demographicMap.tsx`** — Regional distribution table calculating percentage shares and aggregating origin counts.

* **`radialChart.tsx`** — Recharts-powered radial capacity gauge featuring dynamic gradient fills, SVG drop-shadow filters, and threshold alerts.

* **`serverLatencyCard.tsx`** — Real-time latency monitor integrating `LatencyBadge` and `LatencyGraph`.

### Database & Infrastructure (`prisma/`)

* **`prisma/schema.prisma`** — Primary data contract defining models for visitors, sessions, demographics, and metrics.

* **`prisma/seed.ts`** — Database initialization script seeding initial mock telemetry states.

## 2. Technology Stack

* **Framework & Core:** Next.js 16 (App Router), React 19, TypeScript

* **State Management:** Zustand

* **Styling & Design System:** Tailwind CSS v4, Lucide React

* **Data Visualization & GIS:** Recharts, `react-simple-maps`, `world-atlas`

* **Database & ORM:** PostgreSQL (Supabase), Prisma v8 ORM

* **Runtime Utilities:** Temporal API polyfills, SVG Drop-Shadow filter effects

## 3. Engineering Challenges & Technical Pain Points

Building a real-time, multi-tier telemetry interface required resolving complex architectural hurdles during development:

### 1. Vector Map Coordinate Projection Alignment

* **The Challenge:** Integrating `react-simple-maps` with custom threat vector lines (`[longitude, latitude]` coordinate pairs) presented significant spatial projection difficulties. Initial implementations suffered from coordinate translation misalignment, causing threat arcs to render detached from geographic landmass nodes during responsive scaling.

* **The Resolution:** Configured an explicit `geoNaturalEarth1` projection scale with fixed center points (`[-50, 20]`) and standardized dimensions (`width={400}, height={200}`), wrapping the map in an absolute-positioned container with SVG line stroke dasharrays to maintain stable spatial anchoring across breakpoints.

### 2. Database Schema Drift & Type Contract Discrepancies

* **The Challenge:** During iterative backend development integrating with a live Supabase PostgreSQL instance, the project experienced severe database schema drift. TypeScript contract interfaces diverged from the actual live database schema state, resulting in silent serialization failures and runtime query exceptions during aggregate data mapping.

* **The Resolution:** Conducted a rigorous schema reconciliation audit. Synchronized the Prisma client definitions with Supabase DDL migrations, enforced strict typing on database response payloads, and resolved type mismatch discrepancies between client-side store models and server route responses.

### 3. Runtime Temporal API Instantiation Errors

* **The Challenge:** Server-side route handlers utilizing modern date-time operations triggered `500` execution errors in Node.js/Edge runtime environments due to native API availability gaps.

* **The Resolution:** Injected robust `Temporal` polyfill definitions directly into `globalThis` during application bootstrap, ensuring consistent execution across server route handlers and client hooks.

## 4. Future Roadmap & Planned Implementations

* **Overview View Integration:** Implement dedicated top-level system summaries and aggregate operational health metrics under the `../overview` route.
* **System Logs Subsystem:** Build out the `../logs` route and interface handler to stream real-time diagnostic audit trails and database event logs.
* **WebSocket / SSE Streaming:** Migrate client-polling architectures to persistent WebSockets or Server-Sent Events to optimize high-frequency data throughput.
* **Automated Integration Testing:** Introduce comprehensive end-to-end tests for telemetry API route handlers and store state synchronization.

## 5. Setup & Local Development

1. **Clone the Repository:**

   ```bash
   git clone -b Dashboard-Implementation https://github.com/krsnelgrove-del/operation-overthink.git
   cd operation-overthink
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:

   ```bash
   DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?schema=public"
   ```

4. **Initialize Database & Run Development Server:**

   ```bash
   npx prisma db push
   npm run dev
   ```

5. Access `http://localhost:3000` to interact with the telemetry dashboard.