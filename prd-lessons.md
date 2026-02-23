# Product Requirements Document: Lessons Section

## Document Control

- Version: 2.0
- Status: Draft for implementation
- Owner: Product + Engineering
- Last updated: 2026-02-23

---

## 1) Objective

Build a new **Lessons** section in the Astro site with two lesson pages and a dedicated lesson-level top navigation that lets users switch among 8 display modes dynamically.

Lessons in scope:

1. `lean-5s` (source: `lesson-plan-1.md`)
2. `lean-8-wastes-walk` (source: `lesson-plan-2.md`)

Primary outcomes:

- Highly engaging and modern presentation styles
- Fast classroom usability
- Strong accessibility and mobile support
- Full source-content fidelity

---

## 2) Scope and Release Strategy

## Release 1 (MVP, required)

- New section and routes:
  - `/lessons`
  - `/lessons/[slug]`
- Two lesson pages rendered from a shared typed model
- Dedicated sticky lesson top nav with dynamic mode switching
- Mode switching reflected in URL query param (`view`)
- Implement modes 1-4:
  1. Storyboard Timeline
  2. Split-Screen Classroom
  3. Mission Control Dashboard
  4. Choose-Your-Route
- Full content fidelity pipeline (see Section 5)

## Release 2 (Advanced, required by this PRD)

- Implement modes 5-8:
  5. Simulator style
  6. Workshop Field Guide
  7. Card Deck Carousel
  8. Scrollytelling Narrative
- Mode-specific enhancements and visual polish

## Out of scope

- User authentication
- Cross-device account preferences
- CMS integration
- Runtime AI content generation

---

## 3) Success Metrics (must be measurable)

## Product and engagement

- Lesson open rate from `/lessons` to any lesson: baseline captured after launch
- Mode switch engagement: at least 35% of lesson sessions trigger >=1 mode switch
- Print usage rate tracked and reported (no target for first release)

## UX and performance

- Time to first meaningful lesson content (p75): <= 2.0s on typical broadband
- Mode switch response (p95): <= 150ms from click to visible layout update
- Cumulative Layout Shift (CLS): < 0.1 on lesson pages
- Largest Contentful Paint (LCP, p75): < 2.5s
- Interaction to Next Paint (INP, p75): < 200ms

## Accessibility quality

- Zero critical violations in automated accessibility checks on lesson pages
- Full keyboard completion for nav, view switching, and simulator alternatives

---

## 4) Users and Jobs-To-Be-Done

- Teacher/Lecturer
  - Quickly run a 55-minute lesson with timings, prompts, and differentiation
- Course Lead
  - Compare delivery styles and standardize classroom format
- Student Support / Industry Mentor
  - Review placement-focused sections and improvement actions

---

## 5) Source of Truth and Content Fidelity (critical)

The system must preserve and expose **all source content** from both markdown files.

Source files:

- `lesson-plan-1.md`
- `lesson-plan-2.md`

Mapping rules:

- Lesson slug `lean-5s` must include 100% of `lesson-plan-1.md`.
- Lesson slug `lean-8-wastes-walk` must include 100% of `lesson-plan-2.md`.
- Across the lessons section, both source files are fully represented with no omissions.

## Fidelity requirements (hard requirements)

1. **100% source coverage**
   - Every non-empty source line must map to at least one rendered content node.
2. **No silent omission**
   - No source paragraph, bullet, or sentence is dropped.
3. **Verbatim availability**
   - Each lesson page must include a "Full source transcript" section showing the exact markdown text.
4. **Cleaned + verbatim dual representation**
   - Main lesson view can use cleaned/normalized phrasing for readability.
   - Verbatim transcript must remain available for full fidelity.
5. **Line-level provenance**
   - Normalized data nodes include source references (`file`, `lineStart`, `lineEnd`).

## Artifact handling rule

- Citation artifacts and extraction noise (for example `+2`, source fragments) may be hidden from primary formatted sections, but must remain present in the verbatim transcript.

## Validation gate

- Build/test must fail if source coverage drops below 100% for either lesson.

---

## 6) Information Architecture and Routing

## Routes

- `src/pages/lessons/index.astro`
- `src/pages/lessons/[slug].astro`

Supported slugs:

- `lean-5s`
- `lean-8-wastes-walk`

## Global navigation update

- Add `Lessons` link to `src/components/layout/Header.svelte`
- Active state must work for `/lessons` and `/lessons/[slug]`

## URL format for modes

- Query param is mandatory for deep-link behavior: `?view=<mode-key>`
- Canonical lesson URL excludes query params for SEO (see Section 14)

---

## 7) View State Contract (URL, local state, fallback)

Allowed `view` keys:

- `storyboard`
- `split-screen`
- `mission-control`
- `route`
- `simulator`
- `field-guide`
- `card-deck`
- `scrollytelling`

State precedence:

1. `view` from URL query (highest priority)
2. lesson-specific last mode in `localStorage` (if enabled)
3. default mode: `storyboard`

Behavior rules:

- If `view` is missing, app initializes to `storyboard` and writes it with `replaceState`.
- If `view` is invalid, fallback to `storyboard` and replace invalid query.
- Mode change updates URL via History API without full reload.
- `Copy link` copies the full URL including `view`.
- `Reset view` returns to `storyboard`.

---

## 8) Dedicated Lesson Top Nav Bar

Component: `src/components/lessons/LessonTopNav.svelte`

## Functional requirements

- Sticky under global header, with explicit offset token:
  - `top: var(--header-height)`
- Shows:
  - condensed lesson title
  - mode switcher controls (8)
  - quick actions: `Print`, `Copy link`, `Reset view`
- Switching mode is in-place and does not reload the page

## Accessibility requirements for nav

- Use `role="tablist"` for mode controls
- Each mode button uses `role="tab"`
- Active panel uses `role="tabpanel"` and is properly labeled
- Keyboard interactions:
  - Left/Right arrows move between tabs
  - Home/End jumps to first/last tab
  - Enter/Space activates selected tab
- Visible focus ring on all controls

## Mobile behavior

- Horizontal, scrollable tab strip
- Active tab auto-scrolled into view
- Minimum touch target 44x44px

---

## 9) Mode Definitions and Content Parity Contract

All 8 modes must show equivalent core lesson information.

Core info that must be present in every mode:

- lesson title and duration
- aims and outcomes
- full timed blocks (start and end mins)
- teacher actions and learner actions
- year 1/year 2 differentiation where applicable
- placement links and resources
- link/access to full source transcript

If a mode is highly visual (simulator/scrollytelling), a persistent "Details" rail or expandable panel must expose the same structured content.

## Mode contracts

1. **Storyboard Timeline (`storyboard`)**
   - Vertical timed blocks with clear phase transitions
2. **Split-Screen (`split-screen`)**
   - Left timeline nav, right active detail panel
3. **Mission Control (`mission-control`)**
   - KPI/meta header + modular action cards
4. **Choose-Your-Route (`route`)**
   - Year 1 / Year 2 / mixed toggles with context-aware emphasis
5. **Simulator (`simulator`)**
   - Clickable area map + mandatory non-visual list/table equivalent
6. **Field Guide (`field-guide`)**
   - Procedure/manual style with checklists and quick checks
7. **Card Deck (`card-deck`)**
   - Swipe/step card sequence with keyboard alternatives
8. **Scrollytelling (`scrollytelling`)**
   - Scroll narrative with sticky companion panel and reduced-motion fallback

---

## 10) Data Model (typed and provenance-aware)

File: `src/lib/data/lessons.ts`

```ts
type SourceRef = {
  file: 'lesson-plan-1.md' | 'lesson-plan-2.md';
  lineStart: number;
  lineEnd: number;
};

type LessonBlock = {
  id: string;
  title: string;
  startMin: number;
  endMin: number;
  teacherActions: string[];
  learnerActions: string[];
  outputs?: string[];
  differentiation?: {
    year1?: string[];
    year2?: string[];
    mixed?: string[];
  };
  sourceRefs: SourceRef[];
};

type Lesson = {
  slug: 'lean-5s' | 'lean-8-wastes-walk';
  title: string;
  durationMins: number;
  audience: string;
  aims: string[];
  outcomes: string[];
  blocks: LessonBlock[];
  placementLinks?: string[];
  resources?: string[];
  fullSourceMarkdown: string;
  fullSourceRefs: SourceRef[];
};
```

---

## 11) Content Transformation and Validation Pipeline

## Ingestion steps

1. Read raw source markdown files.
2. Create normalized lesson objects with source references.
3. Preserve exact raw markdown text in `fullSourceMarkdown`.
4. Generate coverage map by source line.

## Validation steps

- Coverage check: every non-empty line appears in at least one reference.
- Schema check: required fields present and typed.
- Rendering check: each mode displays core info blocks.

## Failure behavior

- Any coverage gap or schema error fails CI.

---

## 12) UI Architecture

## Pages

- `src/pages/lessons/index.astro`
- `src/pages/lessons/[slug].astro`

## Components

- `src/components/lessons/LessonTopNav.svelte`
- `src/components/lessons/LessonViewHost.svelte`
- `src/components/lessons/LessonMetaHeader.svelte`
- `src/components/lessons/LessonDetailsPanel.svelte`
- `src/components/lessons/FullSourceTranscript.svelte`
- `src/components/lessons/views/StoryboardTimeline.svelte`
- `src/components/lessons/views/SplitScreenView.svelte`
- `src/components/lessons/views/MissionControlView.svelte`
- `src/components/lessons/views/ChooseRouteView.svelte`
- `src/components/lessons/views/SimulatorView.svelte`
- `src/components/lessons/views/FieldGuideView.svelte`
- `src/components/lessons/views/CardDeckView.svelte`
- `src/components/lessons/views/ScrollytellingView.svelte`

Hydration approach:

- Hydrate `LessonViewHost` and `LessonTopNav` together as a single lesson island.

---

## 13) Accessibility Requirements

## Global

- WCAG 2.1 AA minimum
- semantic heading hierarchy preserved in all modes
- all controls keyboard-operable
- visible focus states throughout

## Mode-specific

- Simulator must provide equivalent non-visual table/list path
- Card deck must support keyboard next/previous controls
- Scrollytelling must not hide required info behind scroll-only events

## Announcements and focus

- On mode switch, update a polite live region: "View changed to <mode>."
- Keep keyboard focus on selected tab after switch
- Do not trap focus in any mode

---

## 14) Performance and SEO Requirements

## Performance budgets

- Lesson page hydrated JS budget (gzip): <= 90 KB for MVP, <= 130 KB with all advanced modes loaded lazily
- Non-active modes should be code-split and lazy-loaded
- LCP < 2.5s (p75), INP < 200ms (p75), CLS < 0.1
- Mode switch visual response <= 150ms p95

## SEO and metadata

- Per lesson page:
  - unique title and description
  - Open Graph title/description
  - canonical URL without `view` query
- Query variants (`?view=...`) should not create duplicate indexable pages

---

## 15) Analytics and Telemetry

Track at minimum:

- `lesson_opened` (slug)
- `lesson_mode_changed` (from_mode, to_mode, slug)
- `lesson_print_clicked` (slug, mode)
- `lesson_copy_link_clicked` (slug, mode)
- `lesson_transcript_opened` (slug, mode)

Purpose:

- Understand which modes provide value and where to optimize/remove complexity.

---

## 16) Testing Strategy and Quality Gates

## Unit tests

- data parsing and normalization
- source coverage validator
- view state resolver (URL/localStorage/default)

## Integration tests

- mode switch updates panel and URL
- invalid `view` fallback behavior
- nav keyboard interactions

## E2E tests (Playwright)

- `/lessons` to lesson navigation
- switching all 8 modes on desktop and mobile viewport
- print action opens printable layout
- deep link landing with each `?view=`

## Accessibility tests

- automated axe checks on each mode
- keyboard-only journey for nav and main interactions

## CI gates

- all tests pass
- no critical accessibility issues
- source coverage = 100% for both files
- performance budgets not exceeded

---

## 17) Delivery Plan

## Phase 0: Data and fidelity foundation

- Implement normalized data model with provenance
- Implement full source transcript support
- Add 100% source coverage validator in CI

## Phase 1: Section and shell

- Add `/lessons` and `/lessons/[slug]`
- Add global header `Lessons` nav item
- Implement lesson top nav and URL state contract

## Phase 2: MVP modes (1-4)

- Implement Storyboard, Split-Screen, Mission Control, Route
- Add analytics events for open and mode change

## Phase 3: Advanced modes (5-8)

- Implement Simulator, Field Guide, Card Deck, Scrollytelling
- Ensure parity with core lesson info and transcript access

## Phase 4: QA and release hardening

- Accessibility full pass
- Performance budget verification
- Mobile behavior final check

---

## 18) Risks and Mitigations

- Risk: too much UI surface across 8 modes
  - Mitigation: shared primitives, strict mode contracts, lazy loading
- Risk: accidental content loss during normalization
  - Mitigation: provenance model + 100% line coverage validator + transcript
- Risk: advanced modes degrade performance
  - Mitigation: code splitting, motion limits, budget enforcement
- Risk: inconsistent interactions across modes
  - Mitigation: shared top nav/state contract and unified test suite

---

## 19) Acceptance Criteria

1. `/lessons` exists and links to both lessons.
2. Lesson routes use `/lessons/[slug]` and support slugs:
   - `lean-5s`
   - `lean-8-wastes-walk`
3. Each lesson has a dedicated sticky top nav with 8 mode controls.
4. Switching mode updates content dynamically and updates `?view=` in URL.
5. Invalid or missing `?view` resolves to `storyboard` predictably.
6. All modes are usable on mobile and desktop.
7. Accessibility checks pass for nav, mode interactions, and simulator alternatives.
8. Performance budgets are met.
9. **`lean-5s` contains all content from `lesson-plan-1.md` and `lean-8-wastes-walk` contains all content from `lesson-plan-2.md`, via normalized sections plus full source transcript; validator reports 100% coverage for both.**
10. No significant visual regression against existing site branding.

---

## 20) Implementation Notes

- Use composition, not duplicated mode-specific data mappings.
- Keep `storyboard` as default first-load mode.
- Preserve reduced-motion behavior across all transitions.
- Keep print stylesheet simple and legible; include timings and activity steps.

---

## 21) Implementation Task Breakdown (file-by-file)

Use this as the execution checklist. A task is complete only when its tests pass and acceptance criteria are still met.

## 21.1 Foundation: data model and source fidelity

- [ ] Create `src/lib/types/lessons.ts` with `Lesson`, `LessonBlock`, `SourceRef`, and `ViewMode` types.
- [ ] Create `src/lib/data/lessons.ts` with normalized data for:
  - [ ] `lean-5s` from `lesson-plan-1.md`
  - [ ] `lean-8-wastes-walk` from `lesson-plan-2.md`
- [ ] Include `fullSourceMarkdown` and `sourceRefs` for all normalized nodes.
- [ ] Create `src/lib/utils/lessons/contentCoverage.ts` to validate line-level source coverage.
- [ ] Add CI-enforced source coverage check for both lesson files.

## 21.2 Routing and top-level navigation

- [ ] Update `src/components/layout/Header.svelte` to add `Lessons` nav link and active state behavior.
- [ ] Create `src/pages/lessons/index.astro` landing page.
- [ ] Create `src/pages/lessons/[slug].astro` dynamic lesson page.
- [ ] Add slug guard and fallback behavior for unsupported slugs.

## 21.3 Shared lesson shell and state contract

- [ ] Create `src/components/lessons/LessonTopNav.svelte`.
- [ ] Create `src/components/lessons/LessonViewHost.svelte`.
- [ ] Create `src/components/lessons/LessonMetaHeader.svelte`.
- [ ] Create `src/components/lessons/LessonDetailsPanel.svelte`.
- [ ] Create `src/components/lessons/FullSourceTranscript.svelte`.
- [ ] Implement state precedence:
  - [ ] URL `view`
  - [ ] optional `localStorage`
  - [ ] default `storyboard`
- [ ] Implement invalid `view` fallback and `replaceState` normalization.
- [ ] Implement top-nav actions: `Print`, `Copy link`, `Reset view`.

## 21.4 View modes 1-4 (MVP)

- [ ] Create `src/components/lessons/views/StoryboardTimeline.svelte`.
- [ ] Create `src/components/lessons/views/SplitScreenView.svelte`.
- [ ] Create `src/components/lessons/views/MissionControlView.svelte`.
- [ ] Create `src/components/lessons/views/ChooseRouteView.svelte`.
- [ ] Ensure each mode exposes full core info parity (Section 9).

## 21.5 View modes 5-8 (advanced)

- [ ] Create `src/components/lessons/views/SimulatorView.svelte`.
- [ ] Create `src/components/lessons/views/FieldGuideView.svelte`.
- [ ] Create `src/components/lessons/views/CardDeckView.svelte`.
- [ ] Create `src/components/lessons/views/ScrollytellingView.svelte`.
- [ ] Implement simulator adaptation:
  - [ ] 8-wastes zone map for `lean-8-wastes-walk`
  - [ ] 5S zone map for `lean-5s`
- [ ] Provide non-visual equivalent table/list path in simulator mode.

## 21.6 Accessibility implementation tasks

- [ ] Implement proper `tablist`/`tab`/`tabpanel` semantics in lesson top nav.
- [ ] Implement keyboard controls: Left/Right, Home/End, Enter/Space.
- [ ] Add polite live region announcement on mode changes.
- [ ] Ensure focus-visible styling and no focus traps.
- [ ] Verify heading hierarchy in every mode.

## 21.7 Performance and loading tasks

- [ ] Lazy-load non-active modes (code splitting at mode component level).
- [ ] Keep hydrated JS within budget (Section 14).
- [ ] Validate mode-switch response target (<=150ms p95).
- [ ] Add reduced-motion handling for all animated mode transitions.

## 21.8 SEO and metadata tasks

- [ ] Add per-lesson title/description/OG metadata in `src/pages/lessons/[slug].astro`.
- [ ] Set canonical lesson URLs without `view` query variants.
- [ ] Ensure query variants do not generate duplicate indexable pages.

## 21.9 Analytics instrumentation tasks

- [ ] Add `lesson_opened` event on lesson page load.
- [ ] Add `lesson_mode_changed` event on mode switch.
- [ ] Add `lesson_print_clicked` event.
- [ ] Add `lesson_copy_link_clicked` event.
- [ ] Add `lesson_transcript_opened` event.

## 21.10 Testing tasks

- [ ] Unit: `src/lib/utils/lessons/contentCoverage` coverage logic.
- [ ] Unit: view-state resolver for URL/localStorage/default precedence.
- [ ] Integration: mode switch updates rendered panel and URL query.
- [ ] Integration: invalid `view` fallback behavior.
- [ ] Integration: transcript section availability and content parity checks.
- [ ] E2E: `/lessons` -> lesson navigation for both slugs.
- [ ] E2E: switch all 8 modes on desktop and mobile viewports.
- [ ] E2E: deep-link landing for each valid `view` key.
- [ ] E2E: print and copy-link actions.
- [ ] Accessibility: automated axe checks for all modes.

## 21.11 Final release checklist

- [ ] All Section 19 acceptance criteria pass.
- [ ] Source coverage validator reports 100% for both source files.
- [ ] No critical accessibility issues remain.
- [ ] Performance budgets met in CI/local verification.
- [ ] Visual QA complete across mobile/tablet/desktop.
