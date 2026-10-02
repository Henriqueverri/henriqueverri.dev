---
title: AUGE
headline: From shipping the MVP fast to a frontend that stays consistent and easy to maintain
summary: AUGE is a platform for selling digital products. I worked on the frontend from the early stage, while the product grew from courses only into many types of products. I noticed the inconsistency that fast growth created and took the initiative to address it through componentization, technical layout reviews and documented adoption rules — work that later led to a versioned Design System in a Nuxt Layer.
type: professional
category: Digital products platform
detail: case
status: published
featured: true
order: 2
accent: '#c2410c'
company: AUGE
companyContext: Platform for selling digital products
role: Frontend Engineer
team: A product built by a team; I was the first engineer dedicated to the frontend.
scope:
  - Componentization
  - Design System
  - Frontend architecture
  - Technical design review
  - API contracts
  - International checkout
stack:
  - nuxt
  - vue
  - typescript
  - pinia
  - tailwindcss
  - vitest
  - figma
confidentiality: restricted
visuals: none
disclosure: The product repositories are private, so this case exposes no commits, pull requests or internal documents. Code examples were generalized, and proprietary details — business rules, infrastructure and internal names — were removed. Colleagues are not named.
phases:
  - title: Mapping by family
    subtitle: Components, not pages
    icon: lucide:boxes
    description: I worked by component family, not by page. I mapped the duplicated patterns in inputs, buttons, tabs, search and modals.
    points:
      - At one point, the code had four parallel APIs for a text input.
      - The same happened with file input, radio, checkbox, modal and button.
  - title: Canonical component
    subtitle: One per family
    icon: lucide:component
    description: I defined one canonical component per family. When the canonical one had a real gap, I extended it instead of creating yet another variation.
    points:
      - Knowing one component starts to help with the next one.
      - A fix in the canonical component reaches every place that uses it.
  - title: Incremental migration
    subtitle: Domain by domain
    icon: lucide:git-pull-request
    description: I migrated incrementally, domain by domain, in steps small enough to be reviewed and validated with QA.
    points:
      - Authentication inputs moved to DsTextInput.
      - Product editor forms migrated one by one.
      - Main CTAs moved to DsButtonAction.
      - Legacy tabs, submenus and admin search bars migrated.
  - title: Tokens
    subtitle: Colors out of hex
    icon: lucide:layers
    description: Creating a light theme required migrating hardcoded colors to tokens across the whole application.
    points:
      - I created the semantic line token for borders and dividers, which later became widely used.
  - title: Adoption rules
    subtitle: Documentation
    icon: lucide:file-text
    description: I wrote a usage guide, an adoption audit and a roadmap. "Which component do I use?" got a documented answer.
    points:
      - For each family, the audit records the canonical component, the adoption level, what is still legacy and the migration risk.
decisions:
  - decision: Incremental migration, not big-bang
    tradeoff: Legacy and canonical components coexisted for a while. In return, each step was small enough to be reviewed and validated with QA.
  - decision: Order followed risk
    tradeoff: The audit rated the checkout inputs as high risk. They stayed on the legacy input while lower-risk areas migrated first.
  - decision: Not everything became a shared component
    tradeoff: Specialized wrappers (currency, phone and document inputs) were kept separate for evaluation instead of becoming extra props on the canonical input.
  - decision: Mocked data before the contract
    tradeoff: Frontend and QA moved forward without waiting for the backend. The risk of the mock drifting from the real contract was handled with explicit alignment before and validation after integration.
  - decision: Country identity separated from market rules
    tradeoff: Serving another country becomes configuration, not another flow. The first version covers a reduced scope for international buyers, enough to validate the flow.
outcomes:
  - Pages became more consistent with each other, with fewer duplicated components and less divergence between implementations of the same component.
  - Development became more predictable, and new pages started from existing components.
  - Maintenance got easier, because a fix in the canonical component reaches every place that uses it.
  - In my perception, recurring component issues stopped coming back in QA once a component had been approved.
  - Design and Frontend started working with better-aligned patterns.
  - Onboarding new frontend engineers became more structured, and code review became part of the flow.
outcomeNote: There are no quantitative metrics for these results. They are presented qualitatively on purpose.
learnings:
  - "Componentization needs context. The useful question is not \"can this be reused?\", but \"is it the same concept, with the same rules, everywhere it appears?\"."
  - A Design System needs adoption rules. Components alone did not solve the inconsistency; usage rules, the audit of what was still legacy and code review did.
  - The frontend should take part in API contract decisions. Starting with mocks made the contract discussion begin from a validated screen, not from a guess.
  - Consistency is cheaper to fix before the code. A missing token or an undefined state is easier to fix in Figma than later, as three slightly different implementations.
  - Maintenance is part of the feature. A feature that creates a fourth way to render an input has a cost, even if it works.
seo:
  title: AUGE — Frontend engineering case
  description: How the inconsistency of a growing frontend was addressed through componentization, technical design review and adoption rules, up to a versioned Design System.
---

## Context

AUGE started as a platform for selling online courses. Over time, it began offering many kinds of digital products and experiences: ebooks, landing pages, communities, members' areas, gamification, AI features and events.

I joined in the early stage of development and followed that growth. Each new product type brought new pages and flows, plus new variations of components that already existed. Several developers built this in parallel, under MVP pressure. Most of the engineering decisions in this case came from there.

### My role

I worked as a Frontend Engineer. Day to day, my work involved:

- building features across several domains, such as gamification, community, the ambassador/affiliate area, reports, dashboard and the product editor;
- componentization, refactoring legacy UI, and adopting and migrating to the Design System;
- technical review of layouts before development;
- API integration and contract discussions with the Backend;
- testing and QA support;
- code review and collaboration with the other frontend engineers;
- organizing and planning frontend tasks.

The product was built by a team. When a decision or an area belonged to another engineer, I say so in the section where the subject comes up.

## The problem: frontend inconsistency at scale

I noticed the problem by comparing my screens with the ones other frontend engineers were building.

A screen of mine used a text input with a certain API, behavior and style. A colleague's screen implemented the same concept differently. Each version made sense on its own. Once both reached the development branch, though, the product had two components, visually and structurally different, for the same job. At one point the code had **four parallel APIs for a text input**: a legacy input, an alias of it, a wrapper over an old Design System input and the canonical input.

The visual difference was only the visible part. Underneath it there were:

- **duplicated components** solving the same problem;
- **different APIs and props** for the same concept, so knowing one component did not help with the next;
- **local styles** spread across pages;
- **hardcoded values**, including brand colors in hex instead of tokens;
- **very large files** mixing layout, state and business rules;
- **fixes that did not propagate**, because every page had its own copy of the problem.

Fixing screen by screen would not work, because the next feature could bring the same divergence back. What was missing was a consistent way to build the frontend: shared components, rules about when to use them and a way to catch divergence before it reached the code.

## From componentization to Design System adoption

An initial version of the Design System already existed, created by another engineer at the start of the project. Adoption was partial, and parallel implementations kept growing next to it. I took the initiative to address the inconsistency through componentization and led the adoption work that followed.

::case-phases
::

::case-decisions
::

### From adoption to a versioned Nuxt Layer

As adoption progressed, another engineer decided to move the Design System out of the application into a separate, versioned Nuxt Layer. I worked on preparing and executing that change:

- I classified components into primitives, domain components, legacy code and utilities;
- I removed the primitives' dependency on the application's stores and domain types, which turned out to be most of the work;
- I set up semantic versioning tags and a changelog;
- I integrated the versioned layer back into the application.

The layer uses tokens organized in layers (core, semantic, component and theme) and typed component variants. The extraction was completed on the development branch and was not yet part of any production release the last time I worked on it.

## Design → Frontend: technical design review

Consistent components in code only last if the design is consistent too. So I started reviewing the layout in Figma before each frontend task went into development. The review was not about aesthetics. I looked for problems that would become code problems:

- inputs and other elements that were not componentized;
- duplicated components, drawn as one-off pieces when they should reuse something existing;
- brand colors applied in hex instead of tokens;
- inconsistent spacing and containers with different patterns across equivalent screens;
- missing variants and states;
- components that could lead to different implementations across pages.

When I found relevant problems, I held the card before it reached development and raised the issue so the layout could be adjusted first. It was not a formal company policy: it was a working practice I led, and it depended on alignment with Design, the PO and the other frontend engineers.

My role was not to reproduce Figma exactly as drawn. It was to make sure the design could be implemented consistently with what already existed.

## Frontend collaboration and code review

I was the first engineer dedicated to the frontend. When other frontend engineers joined, I already knew the code and the decisions behind it, and I helped onboard them. We aligned on frontend standards and project structure, when and how to use shared components, and the expected flow from task to review.

From then on, code review became a required step before merging frontend changes, reviewed by at least one frontend engineer. Review was where componentization and code rules were applied day to day. This was collaboration around shared standards, not people management.

::case-outcome
::

## Contracts between Frontend and Backend

Most features I built involved API integration. The frontend did not define contracts alone; the typical flow was:

1. build the screen with **mocked data**;
2. validate layout and behavior, including with QA;
3. understand what data the screen needed to receive and send;
4. tell the Backend how the frontend expected to consume that data;
5. align the contract;
6. the Backend implements the API;
7. replace the mocks with the real integration;
8. validate again and fix any differences between the mock and the real contract.

The project history shows this sequence in several domains I worked on: community, the ambassador/affiliate area, event tickets, co-production and reports. The contract discussion started from an already validated screen, which made communication with the Backend clearer. The Backend implemented the agreed contract and was responsible for that implementation.

## Sub-case: international checkout

> This work was implemented on the development branch. It is presented as an engineering case, not as a statement about what is in production today.

**Problem.** The checkout was built for the Brazilian market. It assumed a Brazilian tax document, address lookup by postal code, Brazilian phone format and Brazilian payment methods. The goal was to serve buyers from other countries without duplicating the checkout.

**Division of work.** The checkout is a shared implementation. Another engineer built the backend for this work and most of the payment core. My contribution was mainly on the frontend of the international evolution: the rules for Brazil and for international buyers, country selection, the international phone input, masks and form behavior, the request payload, API integration and tests.

**Decision: separate country identity from market rules.**

```text
PhoneCountryCatalog      →  country identity
  (ISO code, name, flag, dialing code)

CheckoutCountryConfig    →  market behavior
  (payment methods, document requirement, address mode)
```

The UI reads both configurations and adjusts which fields, validations and payment options it shows. Brazil keeps the full behavior; other countries use a simplified address mode and their own rules. Serving another country means adding configuration, not building another flow.

**Problems that came up**

- **ISO code vs. dialing code.** I used `libphonenumber-js` to normalize phone numbers. Different countries can share the same code — the United States and Canada use `+1` —, so the country is stored as an ISO identity and never inferred from the dialing code.
- **Autofill vs. manual choice.** Logged-in buyers get the form prefilled from their profile, which could overwrite a country the buyer had just picked. I started recording whether the country came from autofill or from the buyer, to preserve the manual choice.
- **Switching countries.** Switching from Brazil to another country must not wipe fields already filled in. The country of residence is also independent from the phone input.

**Tests.** Dedicated test files cover per-country configuration, phone normalization (including the shared `+1`), the international payload and form behavior: ignoring Brazilian document and address rules, keeping fields when switching countries and preserving the manual choice.

## Frontend architecture

A typical feature followed this path:

```text
Page → Composable → Repository / API layer → Backend API
```

Around that flow, the project has stores (Pinia), types, utils, mappers, middleware and plugins. It is a simplified view, not a rule followed strictly everywhere: some pages call the API layer directly, mappers cover only part of the domains and some files grew too large during the MVP. In refactors, I moved the code closer to this structure where it was worth it, instead of rewriting everything to fit it.

**Engineering practices:** TypeScript across the application; unit and component tests with Vitest, written alongside features and refactors; CI running lint, typecheck and tests; required code review before merge; QA validation as part of the delivery flow; technical documentation on Design System usage, adoption and extraction.

::case-learnings
::

## Evidence and limitations

The technical statements are based on analysis of the project's code and version history. The statements about process — design review, onboarding and contract discussions — describe how the work was organized in practice.

This case describes my individual contribution to a larger product built by a team. Internal implementation details, business rules, infrastructure and private repositories were intentionally left out.
