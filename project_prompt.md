# Master Project Context Prompt
**Purpose:** Use this text as a system prompt or context window when working with AI tools, generating documentation, or explaining the project to stakeholders.

---

## 1. Project Overview
**Name:** NNMV Development Works Monitoring Dashboard
**Client:** Nagar Nigam Mathura-Vrindavan (Municipal Corporation)
**Tech Stack:** Vanilla JavaScript (Frontend) + Node.js/Express (Backend) + SQLite3 (Database) + Custom CSS/HTML.
**Core Objective:** To replace fragmented spreadsheets and WhatsApp reporting with a centralized, real-time, digital dashboard that monitors all municipal construction and development works across 70 Wards and 4 Zones.

## 2. The Problem It Solves
Historically, tracking municipal development works (like road construction, drainage, and lighting) was chaotic:
- Funding sources (15th Finance Commission, State Finance Commission) were tracked manually on separate portals (`nnmv.online`, `nnmvprojects.online`).
- Junior Engineers (JEs) reported progress via WhatsApp, leading to delays and lost photos.
- Councillors lacked geographic visibility into what funds were being spent in their specific wards.
- Lack of chronological audit logs meant statuses could be altered without accountability.

## 3. Core Features & Architecture
- **Unified Database:** A robust SQLite relational database linking Works -> Wards -> Departments -> Schemes.
- **Strict Role-Based Access Control (RBAC):** Secure login endpoint (`/api/login`) dictating exactly what each user can see and do.
- **Stage-Wise Milestone Tracking:** Dynamic progress bars based on the specific type of work being done.
- **Mandatory Visual Proof:** Support for Before, In-Progress, and Completion photographs tied directly to progress updates.
- **Mobile-First SPA:** Built as a Single Page Application (SPA) using a custom hash-based router so JEs can seamlessly use it on their phones while on the construction site.

## 4. User Roles & Views
The portal dynamically changes based on who logs in:
1. **Super Admin / Municipal Officer (Nagar Ayukt)**
   - **View:** 360-degree Global Dashboard.
   - **Capabilities:** Can see all 70 Wards, filter by any Scheme or Department, identify financial bottlenecks, and audit all JE activities.
2. **Junior Engineer (JE)**
   - **View:** Execution Dashboard.
   - **Capabilities:** Can ONLY view and edit works specifically assigned to their `jeId`. They are the data-entry layer, responsible for updating progress percentages and uploading site photos.
3. **Councillor (Parshad)**
   - **View:** Geographic Dashboard.
   - **Capabilities:** Read-only access geographically locked to their specific Ward ID. They can monitor ongoing work in their neighborhood to keep citizens informed, but cannot alter the data.

## 5. Primary Dashboard Modules (Pages)
- **Global KPI View:** High-level metrics showing "Total Sanctioned Amount," "Completed Works," and "Delayed Works."
- **Works Management Table:** A searchable, sortable list of every project. Features advanced multi-select filtering (e.g., "Show me all SFC-funded Road works that are Delayed").
- **Ward Analytics:** Drill-down views showing exactly how much money and effort is concentrated in specific geographic wards.
- **Scheme Analytics:** Financial tracking ensuring state/federal grants (like AMRUT or Swachh Bharat) are utilized before deadlines.
- **Audit Logs:** A chronological activity feed tracking every state change made by users.

## 6. How This Helps the Municipality (Business Value)
- **Absolute Transparency:** The "Who, What, Where, and When" of every taxpayer Rupee is tracked and visually verified.
- **Data-Driven Governance:** Executives can instantly reallocate resources if a specific Department (e.g., Sewerage) falls behind schedule.
- **Eliminates Ghost Projects:** Mandatory photo uploads and timestamped logs prevent fraudulent billing.
- **Fosters Political Trust:** Giving Councillors a live view of their wards stops misinformation and builds trust between the administration and local representatives.
