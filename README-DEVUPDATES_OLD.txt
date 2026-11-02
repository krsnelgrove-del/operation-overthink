========================================================================
🐶 CODE CRACKING DASHBOARD PROJECT - ARCHITECTURE & DEPENDENCY MANIFEST
========================================================================

---
🚀 CORE FRAMEWORK & RUNTIME
---
* React 19.3.0
  Leverages native performance optimizations, stable concurrent features,
  and native support for Web View Transition APIs.
  
* Next.js 16.3.x (App Router)
  Utilizes the Turbopack compilation engine for immediate HMR and 
  decoupled server/client boundary tracking.

* Node.js v24.20.0+
  Enables native environment file synchronization (`--env-file`) without 
  requiring third-party runtime parsing modules.

---
📦 PACKAGE MANAGEMENT & RUNTIME ISOLATION
---
* pnpm v11
  Enforces modern, strict multi-package topological graphing via 
  `pnpm-workspace.yaml` overrides to prevent dependency trees from collapsing.
  Strictly secures supply-chain vulnerability surfaces through explicit
  build execution authorizations (`pnpm approve-builds`).

---
🎨 GRAPHICS & ANIMATION DECK
---
* Motion (Formerly Framer Motion) v13.4.0+
  Migrated to independent `"motion/react"` layouts. Integrates natively
  with React 19.3's `<ViewTransition>` snapshots, eliminating layout 
  thread recalculation bottlenecks.

* OGL v1.0.11
  High-performance, minimal WebGL library used for powering smooth canvas
  render loops and custom 3D mesh layers.

* Tailwind CSS v4
  Engineered with a streamlined modern PostCSS compilation layer for immediate 
  utility layout computation.

---
🗄️ DATABASE & DATA CONTRACTS
---
* Prisma ORM v8 (Release Candidate)
  Architected entirely on a modular data-contract system (`contract.prisma`)
  compiled straight into offline machine-readable schema artifacts via 
  `prisma contract emit`, completely deprecating classic schemas.

* Supabase (PostgreSQL Platform)
  Cloud database interface supporting a transactional engine topology.
  Decoupled via a serverless network pooler backend (`DATABASE_URL:6543`) 
  to cleanly manage parallel high-volume serverless app processes.

---
⚙️ UTILITIES & STATE MANAGEMENT
---
* Zustand v5.0.15: Light weight, decoupled client atomic store mechanics.
* Phosphor Icons React v2.1.10: Complete SVG custom typography icon sheets.
* Recharts v3.10.1: Fluid UI chart visualizations.
* Shadcn v4.21.0 & Radix primitives: Accessible client interface elements.

========================================================================
Read-Me Updated on: 2026-10-01
========================================================================
