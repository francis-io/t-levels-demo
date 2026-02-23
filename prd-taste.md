# Styling Direction PRD (Taste Pass)

## Objective

Evolve the UI from a bright startup aesthetic to a refined industrial-editorial system while preserving the product's engineering identity and readability.

## Scope

- In scope: homepage (`/`) and lessons surfaces (`/lessons` and lesson detail view shell).
- Supporting scope: shared style tokens and component-level primitives used by those routes.
- Out of scope: curriculum/about full redesign, content copy rewrite, and data model changes.

## Canonical Design Rules (Single Source of Truth)

These rules apply globally. Route sections must reference these rules instead of redefining them.

### R1. Accent hierarchy

- Use one primary accent for CTA and active states.
- Keep the secondary accent for informational data only.
- Remove glow-heavy accent treatments.

Current references:

- `src/styles/global.css` (`.glow-mint`)
- `src/components/sections/Hero.svelte` (`.glow-mint-btn`)

### R2. Typography system

- Replace default-generic body typography with a more distinctive sans stack.
- Keep heading rhythm consistent via weight/spacing, not size inflation.
- Remove serif styling in product-facing UI surfaces.

Current references:

- `tailwind.config.mjs` (`fontFamily`)
- `src/components/sections/TestimonialCard.svelte` (`font-serif`)

### R3. Hero composition and viewport stability

- Prefer asymmetric split composition on desktop for primary hero sections.
- Use `min-h-[100dvh]` for full-height hero treatment patterns.
- Keep a shared background language for hero surfaces (same gradient family/tokens).

Current references:

- `src/components/sections/Hero.svelte`
- `src/pages/lessons/index.astro`
- `src/pages/curriculum/index.astro`
- `src/pages/about.astro`

### R4. Card discipline

- Use elevation only when it communicates hierarchy.
- Prefer separators (`divide-y`, borders, spacing rhythm) for dense content lists.
- Avoid generic repeated card grids where list/timeline structure communicates better.

Current references:

- `src/components/trees/PathwayCard.svelte`
- `src/pages/lessons/index.astro`
- `src/components/lessons/LessonDetailsPanel.svelte`

### R5. Motion discipline

- Keep one signature animated surface on homepage (hero).
- Reduce repeated ambient animation on secondary surfaces.
- Ensure async transitions never render visually blank states.

Current references:

- `src/components/sections/Hero.svelte`
- `src/components/effects/ParticleBackground.svelte`
- `src/components/lessons/LessonViewHost.svelte`

## Route Requirements

## Homepage (`/`)

### H1. Hero layout

- Shift hero to a stronger asymmetric desktop layout while preserving mobile single-column collapse.
- Replace current `min-h-[80vh]` usage with `min-h-[100dvh]` for hero viewport stability.
- Remove CTA glow treatment and align button states to R1.

References:

- `src/components/sections/Hero.svelte`

### H2. Pathway section structure

- Replace current generic 3-column pathway composition with a defined asymmetric 2+1 arrangement on desktop.
- Required desktop behavior: one emphasized feature column + two supporting columns.
- Required mobile/tablet behavior: collapse to single-column flow below desktop breakpoint.

References:

- `src/components/sections/PathwaySelector.svelte`
- `src/components/trees/PathwayCard.svelte`

### H3. Testimonials styling

- Remove serif quote styling and keep testimonial treatment consistent with the technical UI voice.
- Reduce decorative card emphasis where it does not add information hierarchy.

References:

- `src/components/sections/Testimonials.svelte`
- `src/components/sections/TestimonialCard.svelte`

## Lessons (`/lessons`)

### L1. Hero consistency (required)

- `/lessons` hero typography, layout, and background must match the same hero system used on homepage/curriculum/about.
- Use the same container rhythm (`max-w-7xl`, `mx-auto`, horizontal padding pattern, vertical spacing scale).
- Keep heading/subheading style hierarchy equivalent to other hero sections.
- Use the same brand navy gradient family as peer hero sections.

References:

- `src/pages/lessons/index.astro`
- `src/pages/curriculum/index.astro`
- `src/pages/about.astro`

### L2. Lesson list information architecture

- Replace repeated card-grid feeling with a clearer list/timeline rhythm for scannability.
- Use separators and spacing rhythm to group metadata, title, audience, outcome, and CTA.
- Keep tap target and visual affordance parity with current accessibility expectations.

References:

- `src/pages/lessons/index.astro`

### L3. Lesson detail view states and density

- Add explicit loading placeholders for lazy-loaded lesson mode views.
- Remove nested box-over-box styling in details side panel where separators are sufficient.
- Keep accent usage consistent across mode tabs, chips, and list markers.

References:

- `src/components/lessons/LessonViewHost.svelte`
- `src/components/lessons/LessonDetailsPanel.svelte`
- `src/components/lessons/LessonMetaHeader.svelte`

## Acceptance Matrix (Pass/Fail)

## Global

- [ ] G1: No glow utility is used for primary CTA emphasis on homepage or lessons surfaces.
- [ ] G2: Primary CTA/active state accent is singular; secondary accent is informational only.
- [ ] G3: Body typography stack is updated from default-generic baseline and applied consistently.
- [ ] G4: No serif styling remains in functional product UI elements on reviewed routes.

## Homepage

- [ ] H-AC1: Hero uses asymmetric desktop composition and single-column mobile collapse.
- [ ] H-AC2: Hero height uses `min-h-[100dvh]` pattern (no `min-h-[80vh]` for the primary hero).
- [ ] H-AC3: Pathway section is not a generic equal 3-column layout on desktop.
- [ ] H-AC4: Pathway hover/elevation treatment is toned down to hierarchy-driven emphasis.
- [ ] H-AC5: Testimonial quote presentation avoids serif decorative styling.

## Lessons

- [ ] L-AC1: `/lessons` hero layout and typography align with homepage/curriculum/about hero system.
- [ ] L-AC2: `/lessons` hero background uses the same brand navy gradient family as peer hero sections.
- [ ] L-AC3: Lessons list structure reads as a grouped list/timeline rhythm rather than repeated generic cards.
- [ ] L-AC4: Lesson mode async imports show an explicit loading placeholder state.
- [ ] L-AC5: Lesson details panel reduces nested boxed sections in favor of separators/spacing.

## Implementation Checklist (Step-by-Step)

Use this as the execution tracker.

### Phase 0 - Baseline and inventory

- [ ] 0.1 Snapshot current visuals for `/`, `/lessons`, and one lesson detail page.
- [ ] 0.2 Confirm all style tokens/classes currently driving accent, hero, card, and motion behaviors.
- [ ] 0.3 Record existing hero parity points across homepage/curriculum/about/lessons.

### Phase 1 - Shared design primitives

- [ ] 1.1 Update typography stacks in `tailwind.config.mjs` per R2.
- [ ] 1.2 Remove or deprecate glow utilities in `src/styles/global.css` per R1.
- [ ] 1.3 Align shared button/interactive accent usage with primary-vs-secondary rules.

### Phase 2 - Homepage

- [ ] 2.1 Refactor `src/components/sections/Hero.svelte` to asymmetric desktop layout.
- [ ] 2.2 Replace hero height with `min-h-[100dvh]` and validate mobile viewport behavior.
- [ ] 2.3 Remove glow CTA styling and tune hover/active states.
- [ ] 2.4 Refactor `src/components/sections/PathwaySelector.svelte` to 2+1 desktop composition.
- [ ] 2.5 Reduce heavy scaling/halo card behavior in `src/components/trees/PathwayCard.svelte`.
- [ ] 2.6 Remove serif quote treatment in `src/components/sections/TestimonialCard.svelte`.

### Phase 3 - Lessons index

- [ ] 3.1 Align `/lessons` hero container, typography scale, and spacing with shared hero system.
- [ ] 3.2 Align `/lessons` hero background treatment to brand navy gradient family used in peer hero sections.
- [ ] 3.3 Refactor lesson list structure in `src/pages/lessons/index.astro` toward list/timeline grouping.

### Phase 4 - Lesson detail shell

- [ ] 4.1 Add pending/loading placeholder UI for async mode imports in `src/components/lessons/LessonViewHost.svelte`.
- [ ] 4.2 Reduce nested boxed styling in `src/components/lessons/LessonDetailsPanel.svelte`.
- [ ] 4.3 Normalize accent usage in `src/components/lessons/LessonMetaHeader.svelte` and `src/components/lessons/LessonTopNav.svelte`.

### Phase 5 - QA and sign-off

- [ ] 5.1 Validate all Acceptance Matrix items (G*, H-AC*, L-AC*).
- [ ] 5.2 Verify responsive behavior at mobile/tablet/desktop on homepage and lessons routes.
- [ ] 5.3 Run lint/type/tests/build checks and resolve regressions.
- [ ] 5.4 Capture after screenshots and annotate what changed per acceptance item.

## Delivery Notes

- Keep implementation scoped to this PRD; avoid expanding into unrelated full-site redesign.
- If a checklist item requires tradeoffs, document the decision next to the item before marking it complete.
