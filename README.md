# KIAAN All-in-One SaaS Platform for Businesses (BusinessOS)

> **Frontend / UI Implementation** — Strictly based on the Master Product Requirements Document and Master Prompt.

A complete, modern, professional, scalable SaaS frontend/UI designed as a single **Business Operating System** where a business can manage digital presence, website, AI builder, ecommerce, CRM, POS, payments, Panama fiscal billing, inventory, purchasing, delivery, HR, attendance, marketing, affiliates, and business intelligence without needing disconnected systems.

---

## 🛠 Technology Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Custom Enterprise Design System Tokens
- **Icons**: Zero-dependency optimized Lucide-matching SVG icon library (`src/components/icons.tsx`)
- **State Architecture**: Centralized React Context (`useSaaS()`) providing multi-tenancy, POS cart, leads pipeline, AI copilot, notifications, and mock CRUD operations.
- **Scope**: Frontend-only with structured mock datasets, completely ready for future REST / Supabase / Panama PAC API integration.

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

To verify the production build:

```bash
npm run build
```

---

## 🗺 Platform Modules & Routes

| Module | Route | Key Features & Screens |
| :--- | :--- | :--- |
| **Main Dashboard** | `/` or `/dashboard` | Executive KPI cards, sales trajectory charts, AI summary, recent orders, operational alerts |
| **Onboarding Flow** | `/onboarding` | Complete 10-step wizard: Account → Industry → Profile → Products → Channels → AI Generation Simulation → Preview → Approve → Publish → Continue with AI |
| **Website + AI Builder** | `/website` | Page canvas, desktop/tablet/mobile device switcher, reusable sections library, AI section generator, template library, SEO settings, custom domains & SSL |
| **Ecommerce & Storefront** | `/ecommerce` | Catalog table, add product modal, categories, SKUs & variants, orders management with detail drawer, coupons, interactive customer storefront preview with cart & checkout |
| **CRM & Sales Pipeline** | `/crm` | 360° customer profile drawer, interactive Kanban deal stages (New, Contacted, Qualified, Proposal, Negotiation, Won, Lost), lead modal, AI follow-up suggestions |
| **Point of Sale (POS)** | `/pos` | Desktop/tablet-optimized terminal, product search & category filters, interactive cart with quantity modifiers & discounts, payment modal (Cash with change calculator, Card, Yappy), 80mm receipt preview with CUFE barcode, cash register shift reconciliation (X/Z reports) |
| **Payments & Links** | `/payments` | Transactions log, Payment Link Generator with WhatsApp / Email / SMS share buttons, recurring subscriptions, refund & dispute representations |
| **Panama Fiscal Billing** | `/fiscal` | Electronic invoicing compliant with Panama DGI, CUFE code generator, PAC provider selection (The Factory HKA, Digifact, E-Sign PAC, GuruSoft), transmission logs, retry queue, test PAC handshake |
| **Inventory & Stock** | `/inventory` | Multi-warehouse inventory tracking (Colon Free Zone, Calle 50, David Chiriqui), safety stock alerts, stock movements log, inter-warehouse stock transfer modal |
| **Purchasing & Suppliers**| `/purchasing` | Vendor directory with ratings & lead times, Purchase Orders workflow (Draft → Ordered → Partially Received → Received), PO issuance modal |
| **Delivery & Logistics** | `/delivery` | Dispatch board, courier driver assignments, delivery status progression (Received → Prepared → Shipped → Out for Delivery → Delivered), proof of delivery with digital signature and drop-off photo |
| **HR & Directory** | `/hr` | Staff records, departments, shift schedules, employee dossier drawer with punctuality scores, staff enrollment modal |
| **Attendance & QR** | `/attendance` | In-store Dynamic QR kiosk screen that automatically regenerates cryptographic tokens every 15s with countdown timer, anti-screenshot protection, GPS geofencing parameters, check-in simulation |
| **Marketing & WhatsApp** | `/marketing` | Campaign creation wizard (Name, Channel, Audience, Content, Schedule, Launch), AI copy assistant, approved Meta WhatsApp templates, customer loyalty rewards program |
| **Affiliates & Partners** | `/partners` | Partner portal, custom referral codes, click & conversion attribution, commission calculations, payout tracking, influencer enrollment modal |
| **Multichannel Sales** | `/multichannel` | Central omnichannel matrix connecting Web, POS, WhatsApp, Payment Links, Mobile App, and Social to one single unified database |
| **Analytics & BI** | `/analytics` | Filterable by date range and branch, branch revenue comparison, product velocity breakdown, AI diagnostic analysis, export BI PDF report |
| **Module Configuration** | `/modules-config` | Client-specific feature flags table per business tenant with enable/disable toggles, plan requirements, and industry presets |
| **Settings & Security** | `/settings` | Business legal profile & RUC/DV, team directory, Granular RBAC Permission Matrix (Create, View, Edit, Approve, Export, Delete across 10 roles), MFA security, active sessions, developer API keys & webhooks, data portability export |
| **Audit Logs** | `/audit-logs` | Immutable audit trail with user, role, action, module, entity, IP address, and status filters |
| **Help & Support** | `/support` | Ticket management, ticket creation modal, FAQ accordion, emergency WhatsApp concierge and hotline |

---

## 🧠 Global Application Shell Capabilities

- **Business Switcher**: Easily switch between *Acme Retail & Tech*, *Acme Advisory Services*, and *Bistro Gourmet Panama*.
- **Branch / Location Switcher**: Toggle active branch context across *Calle 50 Flagship*, *Multiplaza Mall Branch*, *Colon Free Zone Hub*, and *David Chiriqui Express*.
- **Role Switcher**: Test granular role-based UI perspectives (*Owner, Administrator, Manager, Sales, Cashier, Inventory, Finance, HR, Marketing, Partner*).
- **Global Search (`⌘K`)**: Instant search modal indexing products, customers, orders, leads, employees, and direct module jump links.
- **AI Business Copilot**: Always-accessible floating assistant panel providing business analysis, suggested inquiries, and owner-approval flows for automated operational tasks.
- **Quick Create (`+`)**: Global modal to instantly create new Leads, Products, Customers, Payment Links, or Support Tickets from anywhere in the application.
