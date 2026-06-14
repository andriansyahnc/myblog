# Hire Me Page Design

**Date:** 2026-06-14  
**Status:** Approved

## Goal

Add a consulting lead pipeline page that funnels visitors to Upwork (primary) or email (secondary). Targets backend engineering contracts.

## Page Structure (`app/hire-me/page.tsx`)

Static server component. Three blocks:

1. **Header** — Amber availability badge ("Limited availability · Open to the right project"), headline "Work with Me", one-line pitch.
2. **Services** — 4 cards: Microservices & API Design, System Architecture Review, Backend Consulting, Code & Team Review.
3. **CTA** — Primary Upwork button + secondary email link + stats row (15+ yrs, 25+ microservices, 180K+ users).

## Files Changed

- `app/hire-me/page.tsx` — new page
- `data/headerNavLinks.ts` — add Hire Me nav entry

## Non-Goals

- No contact form, no pricing tiers, no testimonials (add later if leads come in)
