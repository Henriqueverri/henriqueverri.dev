---
title: Zen
headline: An outside look at a credit platform already in motion
summary: Zen was a credit platform for banking correspondents, with proposals, FGTS, a wallet and a sales ranking. I joined with the product already in motion and was first asked to review the system with the eyes of someone coming from outside. The work was more about review, Design System standards and QA than new features.
type: professional
category: Credit platform
detail: case
status: published
featured: false
order: 4
accent: '#1d4ed8'
company: Zen
companyContext: Credit platform for banking correspondents
role: Frontend Engineer
team: An established product team; I joined with the platform already in motion.
scope:
  - System review
  - Design System
  - QA
stack:
  - nuxt
  - vue
  - typescript
  - tailwindcss
confidentiality: restricted
visuals: screenshots
disclosure: The repositories are private and I no longer have access to the app. The images show real components from Zen's Design System, rendered on a demo page with fictitious text and values — they are not product screens. Colleagues are not named.
cover:
  src: /images/work/zen/components-dark.png
  alt: Zen Design System components in the dark theme — data cards, buttons, filters, status badges, a progress bar and form fields
  width: 1440
  height: 900
gallery:
  - src: /images/work/zen/components-light.png
    alt: The same Zen Design System components in the light theme
    width: 1440
    height: 900
    caption: The same components in the light theme. The dark theme became the app's default in one of my changes.
  - src: /images/work/zen/bottom-sheet-mobile.png
    alt: BottomSheet open on a phone, with options for a proposal and a close button
    width: 780
    height: 1688
    caption: The BottomSheet, whose transition and spacing I adjusted. A demo page, not an app screen.
phases:
  - title: System review
    subtitle: An outside look
    description: In the first month, the team asked me for a general review of the platform, because they valued the view of a developer from outside. I went through the system, fixed what could be fixed right away and turned the rest into cards for the team.
    points:
      - Fixes and hotfixes for what I found in the review
      - Cards with the remaining issues for the team to prioritize
    icon: lucide:scan-search
  - title: Design System
    subtitle: Standards and adjustments to existing components
    description: In Zen's Design System, a Nuxt Layer shared across the projects, I worked on components that already existed and had been created by other people on the team.
    points:
      - Dark theme as the app's default
      - BottomSheet transition rebuilt, with the backdrop and the panel animated separately
      - BottomSheet spacing when there is no footer
      - Loading animation following the light or dark theme
    icon: lucide:component
  - title: QA
    subtitle: The platform as a whole
    description: Beyond the initial review, I did QA on the platform as a whole, not only on the areas I was working on.
    points: []
    icon: lucide:clipboard-check
outcomes:
  - The initial review turned into immediate fixes and a list of cards for the team to work on.
  - Shared Design System components became more consistent across themes and on phones.
outcomeNote: No metrics. I worked at Zen for about three months, until the company shut down after changes to the FGTS rules.
seo:
  title: Zen — System review, Design System and QA on a credit platform
  description: A general review of a credit platform for banking correspondents, Design System standards in a Nuxt Layer and QA across the whole platform.
---

## Context

Zen was a credit platform for banking correspondents: proposals, FGTS, a wallet and a sales ranking. The projects shared their own Design System, distributed as a Nuxt Layer.

### My role

I worked at Zen for about three months, in 2025, until the company shut down after changes to the FGTS rules. It was different work from what I did on other products: more review, standards and QA than new features. In the Design System repository this shows up as a few commits; most of the review became cards and fixes for the team.

::case-gallery
::

## What I did

::case-phases
::

::case-outcome
::

## Evidence and limitations

The repositories are private and my access has ended. The images come from a demo page built with the Design System components, not from the app. There are no metrics in this case.
