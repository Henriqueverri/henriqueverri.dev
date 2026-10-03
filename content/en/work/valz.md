---
title: Valz
headline: Frontend for a B2B hub of data lookups, campaigns and payments
summary: Valz brings batch data lookups, SMS campaigns, PIX payments and AI agents into a single dashboard. I worked on the frontend with another engineer, creating the lookup and campaign flows, the payment batch tracking, the notifications and the mobile layout, and bringing the dark theme to the whole app.
type: professional
category: B2B fintech
detail: case
status: published
featured: false
order: 3
accent: '#6366f1'
company: Valz
companyContext: B2B hub for data lookups, SMS campaigns, PIX payments and AI agents
role: Frontend Engineer
period:
  start: 2025-11
  end: 2026-02
team: Frontend shared with another engineer, who created the project's foundation, authentication, the dashboard, prepaid credits, the onboarding and the PWA.
scope:
  - Lookups and campaigns
  - Batch payments
  - Responsive layout
  - Dark theme
  - Spreadsheet exports
stack:
  - nuxt
  - vue
  - typescript
  - pinia
  - tailwindcss
confidentiality: restricted
visuals: screenshots
disclosure: The product repository is private, so this case exposes no commits, pull requests or internal documents. The screens were captured from a local run of the product with fictitious data — no real companies, people or transactions appear. The colleague I shared the frontend with is not named.
cover:
  src: /images/work/valz/payments.png
  alt: Valz payments screen with the balance, the payment spreadsheet upload and the batch history with each batch's progress
  width: 1440
  height: 900
gallery:
  - src: /images/work/valz/campaign-new.png
    alt: New SMS campaign send modal, on the first step, uploading a spreadsheet with message and phone number
    width: 1440
    height: 900
    caption: Creating an SMS campaign step by step — a flow I created.
  - src: /images/work/valz/account-dark.png
    alt: My account page in the dark theme, with available credits, a top-up button and a statement of incoming and outgoing entries
    width: 1440
    height: 900
    caption: My account in the dark theme. The page and the credits belong to the other engineer; I redid the layout and the statement table and applied the theme.
  - src: /images/work/valz/payments-mobile.png
    alt: Payments screen on a phone, with the batch history stacked
    width: 780
    height: 1688
    caption: Payments on a phone, part of the responsive layout work.
phases:
  - title: Lookups and payments
    subtitle: Upload, tracking and history
    description: I created the batch data lookup flow — spreadsheet upload, review and tracking — already wired to the endpoints. On the payments page, which already existed, I built the history, the payment flow via PIX QR code and, later, a new batch progress layout.
    points:
      - Batch history with status, progress and filters
      - Download of the detailed spreadsheet and of a spreadsheet with only the failed rows
      - Separate composables to create, track and list the history of each batch type
    icon: lucide:wallet
  - title: SMS campaigns
    subtitle: Step-by-step flow
    description: I created the flow to build and send campaigns in a step-by-step modal, with the history, the filters and the detail modal for each send.
    points:
      - Four steps — spreadsheet upload, data review, payment via PIX QR code and confirmation
      - Send details with spreadsheet export
    icon: lucide:message-square
  - title: Mobile and notifications
    subtitle: Sidebar, navbar and notifications panel
    description: I adapted the layout for phones — sidebar and navbar — and created the notifications panel, so the dashboard's operations also worked on small screens.
    points: []
    icon: lucide:smartphone
  - title: Dark theme and components
    subtitle: Palettes, tokens and shared pieces
    description: On top of the light and dark theme base created by the other engineer, I defined the color palettes and tokens, applied them across the app's screens and reviewed tables and modals for both themes.
    points:
      - Shared buttons, alerts and toasts
      - History table and pagination reused across modules
    icon: lucide:moon
outcomes:
  - Payments, lookups and campaigns now show each batch's progress and export the details as a spreadsheet, including only the rows that failed.
  - The dashboard gained a mobile layout and a dark theme on every screen.
outcomeNote: No metrics — the case describes what was delivered, based on the repository history.
seo:
  title: Valz — Frontend for a B2B hub of lookups, campaigns and payments
  description: Batch lookup and SMS campaign flows, PIX payment tracking, a mobile layout and a dark theme in a B2B fintech built with Nuxt.
---

## Context

Valz is a B2B hub: in the same dashboard, companies run batch data lookups, send SMS campaigns, make batch PIX payments and configure AI agents per channel. Most operations start with a spreadsheet upload and end with tracking the processing and exporting the result.

### My role

I worked on the frontend from November 2025 to February 2026, sharing the work with another engineer. He created the project's foundation, authentication, the dashboard, prepaid credits, the onboarding and the PWA; in those areas, my part was layout adjustments.

::case-gallery
::

## What I built

::case-phases
::

I also created the AI agents page and the services page, reworked the help center, added the AI columns to the lookup spreadsheets, terms of use and "remember me" on login and the PWA install prompt, and took part in the QA adjustment rounds.

::case-outcome
::

## Evidence and limitations

The repository is private. The screens come from a local run with mocked API responses and fictitious data. There are no usage or business metrics in this case.
