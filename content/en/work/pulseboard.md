---
title: PulseBoard
headline: A multi-tenant SaaS for sales management and analytics, from database to deploy
summary: Catalog, customers and sales per organization, with a dashboard and metrics computed in the backend, in each organization's time zone. It is live with a public demo, technical documentation, automated tests and CI-gated API deploys.
type: personal
category: Multi-tenant SaaS · Analytics
detail: case
status: published
featured: true
order: 1
accent: '#4f46e5'
role: Author — product, frontend, backend and deploy
period:
  start: '2026'
scope:
  - Multi-tenancy
  - Sanctum SPA authentication
  - SQL analytics
  - Per-organization time zone
  - Testing
  - CI/CD
stack:
  - nuxt
  - vue
  - typescript
  - pinia
  - tailwindcss
  - laravel
  - php
  - postgresql
  - vitest
  - playwright
  - githubactions
  - docker
  - cloudflare
links:
  live: https://app.henriqueverri.dev
  github: https://github.com/Henriqueverri/pulseboard
  docs: https://github.com/Henriqueverri/pulseboard/blob/main/docs/architecture.md
confidentiality: public
visuals: screenshots
cover:
  src: /images/work/pulseboard/dashboard.png
  alt: PulseBoard dashboard with KPIs compared to the previous period, daily revenue, status distribution and rankings
  width: 1440
  height: 1240
gallery:
  - src: /images/work/pulseboard/analytics-customers.png
    alt: Customer analytics with total, active, new and returning customers and a ranking
    width: 1440
    height: 1000
    caption: Customer analytics — active, new and returning, always next to the previous period.
  - src: /images/work/pulseboard/transactions.png
    alt: Transaction list with filters by status, customer and period
    width: 1440
    height: 900
    caption: Transactions with filters in the URL — shareable links, back and forward work.
  - src: /images/work/pulseboard/dashboard-mobile.png
    alt: PulseBoard dashboard on a phone screen
    width: 780
    height: 1688
    caption: The same dashboard on a phone. The product interface is in Portuguese.
phases:
  - title: Multi-tenancy
    subtitle: Layered isolation
    icon: lucide:shield-check
    description: A shared database with organization_id on every domain table. The X-Organization-Id header selects the context but does not authorize on its own — middleware validates membership on every request.
    points:
      - Session (401), membership (403), route model binding (404, without revealing existence), Form Requests (422), models and policies.
      - The tenant never comes from the client — organization_id in the payload or query is rejected.
      - Dedicated tests check that another organization's data shows up neither in lists nor in aggregated numbers.
  - title: Authentication
    subtitle: Sanctum SPA
    icon: lucide:lock
    description: Session in an httpOnly, Secure, SameSite=Lax cookie, with CSRF via XSRF-TOKEN and automatic retry on 419. No credentials in localStorage; Pinia only holds UI state.
    points:
      - Accepted consequence — frontend and API must be on the same site (app. and api. under henriqueverri.dev).
      - CORS restricted to the frontend's exact origin, and rate limiting on login and sign-up.
  - title: Analytics
    subtitle: One metric definition
    icon: lucide:network
    description: Everything is aggregated in SQL in the backend, one service per endpoint; the frontend recalculates nothing. Each screen's summary is the same number as the dashboard by construction.
    points:
      - A previous period of the same length for every metric.
      - Money as a decimal string in the API, never a float.
      - A fixed number of queries per endpoint, locked by a test.
      - Cross-endpoint consistency is tested — dashboard revenue equals the time series and ranking totals.
  - title: Time zone
    subtitle: The business calendar
    icon: lucide:globe
    description: The database stores UTC; the business calendar is the organization's IANA time zone. Day, ISO week and month buckets are grouped in local time by PostgreSQL, with correct daylight saving time — tested in CI.
    points:
      - The client never picks the time zone; the frontend computes "today" and the presets in the same zone.
  - title: Delivery
    subtitle: CI before deploy
    icon: lucide:workflow
    description: GitHub Actions runs Pint and PHPUnit on PostgreSQL, ESLint, typecheck, Vitest, the static build and an E2E smoke test with Playwright against the production build.
    points:
      - Frontend on Cloudflare Pages; API in Docker on Render, published only after the checks pass.
      - If the container fails to start, it takes no traffic and the previous version stays live.
decisions:
  - decision: Sanctum SPA with an httpOnly cookie
    why: Credentials out of JavaScript's reach, native CSRF and no extra BFF.
    tradeoff: Frontend and API must share the registrable domain; Pages previews cannot authenticate.
  - decision: Nuxt as a static SPA
    why: The session is an API cookie; SSR would add nothing and would require a Node server.
    tradeoff: No server rendering — irrelevant for an authenticated area.
  - decision: Multi-tenancy by organization_id
    why: Simple to operate, with isolation enforced in layers and covered by tests.
    tradeoff: Isolation depends on the application, not the database — no schema per tenant, no RLS.
  - decision: Analytics aggregated in the backend
    why: One metric definition for every screen; the frontend only presents it.
    tradeoff: Every request hits the database, with no cache.
  - decision: Playwright against the production build
    why: It validates the artifact shipped to Pages, with a real API and PostgreSQL.
    tradeoff: A smoke test of the main flow, not an extensive E2E suite.
outcomes:
  - A public demo at app.henriqueverri.dev, with owner and member accounts to explore the permission differences.
  - Isolation between organizations enforced in six layers and verified by dedicated tests.
  - Numbers consistent across screens by construction, and checked by cross-consistency tests.
  - Technical documentation for architecture, API, testing and deploy in the repository.
metrics:
  - label: Analytics queries over 30 days
    value: ~2–45 ms
    context: Per query, via EXPLAIN ANALYZE on PostgreSQL 16, on a disposable database with 200k transactions and 500k items.
    source: docs/architecture.md, Performance section
  - label: Queries per analytics endpoint
    value: 1 to 4
    context: A fixed number, regardless of volume, period or granularity.
    source: README, locked by AnalyticsQueryBudgetTest
  - label: API tests
    value: '376'
    context: PHPUnit — auth, isolation between organizations, CRUD, analytics, time zone and operations.
    source: Repository README, Testing section
    period: September 2026
  - label: Frontend tests
    value: '168'
    context: Vitest and @nuxt/test-utils — utilities, API client, session, composables and pages.
    source: Repository README, Testing section
    period: September 2026
seo:
  title: PulseBoard — Multi-tenant SaaS for sales management and analytics
  description: Nuxt 4, Laravel 12 and PostgreSQL — layered multi-tenancy, Sanctum SPA, SQL analytics, per-organization time zone, tests and CI-gated deploys.
---

## What PulseBoard is

An application to follow a business's sales operation: *how much did I sell this period compared to the previous one, which products drive revenue, how many customers came back*.

- **Organizations and roles** — sign-up creates the user, the organization and the `owner` membership; `owner` and `member` have different permissions, enforced by the API.
- **Products and customers** — CRUD with search, detail pages with sales metrics and deletion that preserves history.
- **Transactions** — read-only sales history, with items and the price at the time of sale.
- **Dashboard and analytics** — revenue, orders, average ticket and customers, revenue by day, week or month, rankings and status distribution, always next to the previous period.
- **State in the URL** — period, filters, sorting and pagination live in the query string.

::case-gallery
::

## Technical decisions

::case-phases
::

::case-decisions
::

## Architecture

```text
Browser
   │
   ▼
Static Nuxt 4 SPA ─────────── Cloudflare Pages · app.henriqueverri.dev
   page → composable → repository → useApiClient
   │
   │  REST + session cookie (Sanctum SPA, CSRF) + X-Organization-Id
   ▼
Laravel 12 API ────────────── Render · Docker · api.henriqueverri.dev
   tenant middleware → Form Request → Controller
     → Policy → Service (SQL aggregations) → API Resource
   │
   ▼
PostgreSQL ────────────────── Supabase
```

On the frontend, no component makes HTTP calls directly: access goes through repositories and `useApiClient`, which centralizes credentials, the organization header, CSRF and error normalization. Pinia only for the session; screen data via `useAsyncData` keyed by organization.

::case-outcome
::

## Scope and next steps

PulseBoard is a personal project built as a product: there is no company or real customers behind it. Transactions come from a demo data generator, the infrastructure runs on free plans (the API can take up to about a minute on the first request after being idle) and the interface is in Portuguese only.

What the current architecture would ask for first to run with real traffic — not implemented yet:

- **Observability:** error tracking, per-endpoint latency and alerts, beyond today's logs and health check.
- **Rate limiting beyond authentication**, starting with the analytics endpoints.
- **Staging and managed backups**, to validate migrations before production.
- **Analytics caching or pre-aggregation** for large organizations — the path the measurements point to, rather than new indexes.
