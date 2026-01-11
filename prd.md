# Product Requirements Document

## Project Overview

**Client:** Technical Learning Company (TLC)
**Launch Date:** February 11th, 2026
**Purpose:** T-Level curriculum website for Engineering & Manufacturing education

A modern, fast static website connecting teachers, employers, and students through structured engineering curriculum content. The site prioritizes performance while delivering polished interactions expected from a professional education platform.

### Vision

Bridge the gap between classroom learning and industry reality:
- Teachers access industry footage to enhance classroom delivery
- Employers can fund plant-specific training content
- Students gain knowledge pathways toward apprenticeships

### MVP Scope (Feb 11th Demo)

| Deliverable | Priority | Description |
|-------------|----------|-------------|
| Learning path tree | HIGH | Animated node-graph visualization matching TLC molecular logo |
| Video integration | HIGH | Embed 6 YouTube videos linked to curriculum topics |
| Dedicated topic pages | HIGH | `/curriculum/[topic]` with video, description, related topics |
| Coming soon states | MEDIUM | Placeholder images + muted styling for topics without videos |
| TLC branding | HIGH | Optimized logos, colors, consistent visual identity |
| Responsive layout | HIGH | Mobile-first, tree adapts to all devices |
| Animated stats | MEDIUM | "56 topics, 3 pathways, 315+ placement hours" |
| Testimonials | LOW | Generated quotes from teacher/employer personas |
| Partner logos | LOW | East Durham College text + TLC logo (placeholders OK) |
| Related topics | MEDIUM | Auto-generated from same pathway |

**Removed from MVP:**
- ~~Video progress tracking~~ (requires auth/storage, deferred to post-MVP)

### Post-MVP (Funding Dependent)

| Feature | Description |
|---------|-------------|
| 3-tier membership | Teacher / Employer / Student access levels |
| Employer portal | Fund custom plant-specific content |
| Video progress tracking | Visual indicator of watched videos (requires auth) |
| Progress tracking | Track viewed content across sessions |
| Assessment pathway | Employer evaluation of students |

---

## Tech Stack

### Core

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Astro | Static site generation, partial hydration |
| Components | Svelte | Interactive UI components |
| Styling | TailwindCSS | Utility-first CSS, design system |
| Language | TypeScript | Type safety, developer experience |
| Hosting | Cloudflare Pages | Edge deployment, global CDN |
| Build | Makefile | Local build orchestration |
| Runtime | Bun | Fast package manager, runtime, bundler |

### Tooling

| Category | Tool | Purpose |
|----------|------|---------|
| Package Manager | Bun | Fast installs, native TypeScript |
| Linting/Formatting | Biome | All-in-one, fast (replaces ESLint+Prettier) |
| Unit/Component Tests | Vitest | Fast, Vite-native, TypeScript-first |
| Component Testing | @testing-library/svelte | DOM testing utilities |
| E2E Tests | Playwright | Cross-browser automation |
| Icons | Heroicons | Clean, Tailwind team, consistent |
| Animation | CSS animations + Svelte transitions | Pure CSS for performance, no JS dependencies |
| State | Nanostores | Tiny, works across Astro islands |
| Images | astro:assets | Built-in optimization |

### Astro Integrations

| Integration | Purpose |
|-------------|---------|
| @astrojs/svelte | Svelte component support |
| @astrojs/tailwind | Tailwind integration |
| @astrojs/sitemap | Auto sitemap generation |
| View Transitions | Smooth page transitions (built-in) |

---

## Development Approach

### Test-Driven Development (TDD)

- Write tests before implementation
- **Vitest** for unit tests and component logic
- **@testing-library/svelte** for component behavior
- **Playwright** for E2E and cross-browser testing
- Run tests via `make test`

### Build System

- Makefile-based local builds
- Bun as package manager and script runner
- Commands: `make dev`, `make build`, `make test`, `make lint`, `make format`
- CI-compatible targets

### Code Quality

- **Biome** for linting and formatting (single tool)
- TypeScript strict mode
- Path aliases: `@/` → `src/`
- Pre-commit hooks (optional)

---

## Design Philosophy

### Mobile-First Responsive

- Design for mobile viewport first
- Progressive enhancement for larger screens
- Touch-friendly tap targets (min 44x44px)

### Central Breakpoints

Defined once in Tailwind config, used everywhere:

| Name | Min Width | Device | CSS Variable |
|------|-----------|--------|--------------|
| `mobile` | 0px | Phones | `--bp-mobile: 0px` |
| `tablet` | 768px | Tablets | `--bp-tablet: 768px` |
| `desktop` | 1024px | Desktop+ | `--bp-desktop: 1024px` |

**Tailwind Config:**
```javascript
// tailwind.config.js
screens: {
  mobile: '0px',
  tablet: '768px',
  desktop: '1024px',
}
```

**Usage:**
```html
<div class="mobile:px-4 tablet:px-8 desktop:px-12">
```

All responsive logic references these three breakpoints only. No ad-hoc pixel values.

### Performance First

**Core Web Vitals Targets:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Optimizations:**
- Zero/minimal JavaScript by default (Astro islands)
- Optimized image formats (WebP, AVIF)
- Critical CSS inlining
- Lazy loading for below-fold content
- Preloading for critical resources

---

## Premium UX Requirements

### Micro Animations

- Subtle hover states on interactive elements
- Smooth page transitions
- Button press feedback
- Focus ring animations
- Scroll-triggered reveals (intersection observer)
- Loading state transitions

### Skeleton Loading

- Skeleton placeholders for async content
- Pulse animation matching content shape
- Smooth fade-in when content loads
- No layout shift during loading

### Polish Details

- Smooth scrolling behavior
- Haptic-quality click feedback
- Consistent easing curves (ease-out for entrances, ease-in for exits)
- Reduced motion support (`prefers-reduced-motion`)
- Dark mode support (`prefers-color-scheme`)

### Confirmed Premium Features

**Visual Feedback:**
- Toast notifications with slide + fade
- Inline form validation (real-time, not just on submit)
- Progress indicators for multi-step flows

**Micro-interactions:**
- Link hover underline animations
- Card lift on hover (subtle shadow + translate)
- Icon transitions (hamburger to X, etc.)
- Stat counters with scroll-triggered animation

**Error Handling:**
- Custom 404 page with helpful navigation back to main content

---

## Brand Identity

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-navy` | `#1E1B4B` | "TLC" lettering, tagline text, headings |
| `brand-mint` | `#50E8A8` | Primary accent, molecule nodes, CTAs |
| `brand-cyan` | `#50D8E8` | Secondary accent, "O" ring shape, highlights |
| `white` | `#FFFFFF` | Page backgrounds |
| `gray-50` | `#F9FAFB` | Section backgrounds, subtle areas |
| `gray-200` | `#E5E7EB` | Borders, dividers |
| `gray-600` | `#4B5563` | Secondary text, muted content |

### Gradients

```css
--gradient-primary: linear-gradient(135deg, #50E8A8 0%, #50D8E8 100%);
--gradient-dark: linear-gradient(135deg, #1E1B4B 0%, #2D2A5A 100%);
```

### Logo

| File | Usage |
|------|-------|
| `logo.png` | Primary, color on white |
| `pdf_image_001.png` | Color on transparent |
| `pdf_image_002.png` | White version for dark backgrounds |

**Logo Style:** Molecular/network icon (interconnected circles) - represents connected learning

### Favicon

- Use TLC logo mark (molecular icon), not cog
- Colors: Brand green on transparent, or navy
- Sizes: 16x16, 32x32, 180x180 (Apple touch), 192x192, 512x512
- Web manifest with `theme_color: #1E1B4B`

### Logo Optimization (Critical for Performance)

**Source files need optimization** before use:

| File | Current Size | Target Size | Action |
|------|--------------|-------------|--------|
| `logo.png` | 38KB | <10KB | Convert to SVG or optimize PNG |
| `pdf_image_001.png` | 40KB | <8KB | Convert to SVG (vector logo) |
| `pdf_image_002.png` | 17KB | <5KB | Convert to SVG (white version) |

**Optimization strategy:**

1. **Convert to SVG** (Recommended)
   - Logo is vector-based (circles, lines, text)
   - SVG will be ~2-4KB, infinitely scalable
   - Can be inlined in HTML for instant render
   - Use `astro-icon` or inline `<svg>` component

2. **If keeping PNG:**
   ```bash
   # Resize to max needed dimensions
   convert logo.png -resize 400x -quality 85 logo-optimized.png

   # Further compress with pngquant
   pngquant --quality=65-80 logo-optimized.png
   ```

3. **Generate responsive sizes:**
   | Context | Size | Format |
   |---------|------|--------|
   | Header (mobile) | 120px wide | SVG or WebP |
   | Header (desktop) | 180px wide | SVG or WebP |
   | Footer | 100px wide | SVG |
   | Open Graph | 1200x630 | PNG (OG requires PNG) |

4. **Astro asset handling:**
   ```astro
   ---
   import { Image } from 'astro:assets';
   import logo from '@/assets/logo.svg'; // or .png
   ---
   <Image src={logo} alt="TLC - Technical Learning Company" width={180} height={60} />
   ```

**Inline SVG for header (fastest):**
```astro
<!-- src/components/Logo.astro -->
<svg viewBox="0 0 200 60" class="h-10 w-auto" aria-label="TLC - Technical Learning Company">
  <!-- Molecular icon circles -->
  <circle cx="20" cy="20" r="8" fill="#50E8A8" />
  <circle cx="35" cy="35" r="8" fill="#50E8A8" />
  <!-- ... connection lines and text ... -->
</svg>
```

---

## Page Inventory

### MVP Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, value prop, pathway overview |
| Curriculum | `/curriculum` | Full curriculum tree navigation |
| Topic Detail | `/curriculum/[topic]` | Individual topic with video embed |
| About | `/about` | TLC mission, team, contact |
| 404 | `/404` | Friendly error page |

### Curriculum Structure

```
Core Knowledge (19 sections)
├── Health & Safety
├── Materials Science
├── Mathematics for Engineering
├── Mechanical Principles ← has video
├── Electrical & Electronic
├── ... (14 more)

Pathways (choose one)
├── Maintenance, Installation & Repair
├── Manufacturing, Processing & Control ← focus pathway
│   ├── Manufacturing Workflow ← has video
│   ├── Process Control ← has video
│   ├── Lean Manufacturing ← has 2 videos
│   ├── Automation & Robotics ← has video
│   └── ... (6 more topics)
└── Design & Development
```

### Content States

| State | Visual Treatment |
|-------|------------------|
| Has video | Play icon, mint accent, glowing node, clickable |
| Placeholder | Muted cyan, "Preview" badge, placeholder video |
| Coming soon | Gray, locked icon, not clickable |

---

## Learning Path Tree Visualization

### Design Principle

The tree visualization **mirrors TLC's molecular logo** - interconnected nodes representing connected learning. This creates brand consistency and a memorable, distinctive UI.

### 3 Implementation Approaches

Choose ONE approach based on timeline and complexity appetite.

---

### APPROACH 1: CSS Grid Molecular Tree (RECOMMENDED)

**Build time:** Fast | **Mobile:** Excellent | **Animation:** Smooth

Pure CSS/HTML with Svelte for interactions. No SVG complexity.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│    DESKTOP VIEW                                                         │
│    ════════════                                                         │
│                                                                         │
│                         ┌─────────────────┐                             │
│                         │  CORE KNOWLEDGE │                             │
│                         │    (16 topics)  │                             │
│                         └────────┬────────┘                             │
│                                  │                                      │
│           ┌──────────────────────┼──────────────────────┐               │
│           │                      │                      │               │
│           ▼                      ▼                      ▼               │
│    ┌─────────────┐      ┌───────────────┐      ┌─────────────┐          │
│    │   ○ ○ ○     │      │   ◉ ◉ ◉ ◉    │      │   ○ ○ ○     │          │
│    │   ○ ○ ○     │      │   ◉ ◉ ◉ ◉    │      │   ○ ○ ○     │          │
│    │   ○ ○ ○ ○   │      │   ◉ ◉         │      │   ○ ○ ○ ○   │          │
│    │             │      │               │      │             │          │
│    │ Maintenance │      │★MANUFACTURING │      │   Design    │          │
│    │  (muted)    │      │ (highlighted) │      │  (muted)    │          │
│    └─────────────┘      └───────────────┘      └─────────────┘          │
│                                                                         │
│    Legend: ◉ = Has video (mint, glowing)                                │
│            ○ = Coming soon (gray, muted)                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│    MOBILE VIEW (vertical scroll)                                        │
│    ════════════════════════════                                         │
│                                                                         │
│    ┌─────────────────────────┐                                          │
│    │     CORE KNOWLEDGE      │                                          │
│    │  ◉ ─ ○ ─ ○ ─ ○ ─ ○     │  ← horizontal scroll row                 │
│    │  └─┬─┘                  │                                          │
│    │    ↓ tap to expand      │                                          │
│    └─────────────────────────┘                                          │
│              │                                                          │
│              ▼                                                          │
│    ┌─────────────────────────┐                                          │
│    │  ★ MANUFACTURING        │  ← expanded pathway                      │
│    │  ┌───┐ ┌───┐ ┌───┐     │                                          │
│    │  │ ◉ │ │ ◉ │ │ ◉ │     │  ← tappable cards                        │
│    │  │wkf│ │ctl│ │len│     │                                          │
│    │  └───┘ └───┘ └───┘     │                                          │
│    │  ┌───┐                  │                                          │
│    │  │ ◉ │                  │                                          │
│    │  │aut│                  │                                          │
│    │  └───┘                  │                                          │
│    └─────────────────────────┘                                          │
│              │                                                          │
│    ┌─────────────────────────┐                                          │
│    │     MAINTENANCE         │  ← collapsed (tap to expand)             │
│    │  ○ ─ ○ ─ ○ ─ ○ ─ ○     │                                          │
│    └─────────────────────────┘                                          │
│              │                                                          │
│    ┌─────────────────────────┐                                          │
│    │     DESIGN              │  ← collapsed                             │
│    │  ○ ─ ○ ─ ○ ─ ○ ─ ○     │                                          │
│    └─────────────────────────┘                                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Implementation:**
```html
<div class="grid grid-cols-3 gap-8">  <!-- Desktop: 3-column -->
  <PathwayBranch pathway="maintenance" status="muted" />
  <PathwayBranch pathway="manufacturing" status="featured" />
  <PathwayBranch pathway="design" status="muted" />
</div>
```

**Pros:**
- Fastest to build (pure CSS Grid + Flexbox)
- Perfect responsive behavior with Tailwind breakpoints
- No SVG/canvas complexity
- Accessible by default (semantic HTML)
- Easy hover/focus states

**Cons:**
- Connection lines between nodes require pseudo-elements or SVG overlay
- Less "organic" than true graph visualization

**Animations:**
- Node pulse: `@keyframes pulse` on `:hover`
- Card lift: `transform: translateY(-4px)` on hover
- Expand/collapse: Svelte `transition:slide`

---

### APPROACH 2: SVG Network Graph

**Build time:** Medium | **Mobile:** Good | **Animation:** Excellent

Full SVG-based visualization with animated connection lines.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│    SVG CANVAS                                                           │
│    ══════════                                                           │
│                                                                         │
│                              CORE                                       │
│                               ●                                         │
│                          ╱    │    ╲                                    │
│                      ╱        │        ╲                                │
│                  ●────────────●────────────●                            │
│                 ╱│            │            │╲                           │
│               ╱  │            │            │  ╲                         │
│             ╱    │            │            │    ╲                       │
│           ●──●   │      ◉─────◉─────◉     │   ●──●                      │
│          ╱   │   │      │     │     │     │   │   ╲                     │
│        ●     ●   │      ◉     ◉     ◉     │   ●     ●                   │
│        │     │   │      │           │     │   │     │                   │
│        ●     ●   │      ◉           ◉     │   ●     ●                   │
│        │         │            │           │         │                   │
│        PATH 1    │         PATH 2         │      PATH 3                 │
│      Maintenance │      ★Manufacturing    │       Design                │
│                  │                        │                             │
│    ○ = inactive  │  ◉ = has video (glow)  │  ● = core topic             │
│                  │                        │                             │
│    Connection lines animate like electricity flowing ⚡                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Implementation:**
```svelte
<svg viewBox="0 0 800 600" class="w-full h-auto">
  <!-- Connection lines -->
  <path d="M400,50 L400,150" class="connection-line animate-flow" />

  <!-- Nodes -->
  <g class="node" on:click={() => goto('/curriculum/core-mechanical')}>
    <circle cx="400" cy="200" r="20" class="fill-mint glow" />
    <text>Mechanical</text>
  </g>
</svg>
```

**Pros:**
- Most visually impressive - true network graph
- Animated connection lines (stroke-dashoffset)
- Matches logo aesthetic perfectly
- Smooth zooming/panning possible

**Cons:**
- SVG responsive sizing requires viewBox management
- Touch interactions more complex
- Accessibility requires extra ARIA work
- Mobile may need separate simplified view

**Animations:**
```css
@keyframes flow {
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
}
.connection-line {
  stroke: #50E8A8;
  stroke-dasharray: 8 4;
  animation: flow 2s linear infinite;
}
```

---

### APPROACH 3: Hybrid Card-Tree

**Build time:** Fast | **Mobile:** Excellent | **Animation:** Good

Cards arranged in tree structure with CSS pseudo-element connectors.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│    DESKTOP                                                              │
│    ═══════                                                              │
│                                                                         │
│    ┌─────────────────────────────────────────────────────────┐          │
│    │                    CORE KNOWLEDGE                        │          │
│    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │          │
│    │  │Health│ │Mater-│ │ Maths│ │◉Mech-│ │Elec- │ │Mecha-│ │          │
│    │  │Safety│ │ials  │ │      │ │anical│ │tric  │ │trnics│ │          │
│    │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ │          │
│    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │          │
│    │  │Fluid │ │ CAD  │ │  QA  │ │Manuf-│ │Maint-│ │Projct│ │          │
│    │  │Power │ │      │ │      │ │actrng│ │enance│ │Mgmt  │ │          │
│    │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ │          │
│    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                   │          │
│    │  │Sustai│ │Busins│ │Digitl│ │Problm│                   │          │
│    │  │nabil.│ │      │ │ Tech │ │Solvng│                   │          │
│    │  └──────┘ └──────┘ └──────┘ └──────┘                   │          │
│    └─────────────────────────────────────────────────────────┘          │
│                              │                                          │
│           ┌──────────────────┼──────────────────┐                       │
│           │                  │                  │                       │
│           ▼                  ▼                  ▼                       │
│    ┌────────────┐    ┌────────────────┐   ┌────────────┐                │
│    │ MAINTENANCE│    │★MANUFACTURING │   │   DESIGN   │                │
│    │            │    │ (5 videos!)   │   │            │                │
│    │  10 topics │    │ ┌────┐ ┌────┐ │   │  10 topics │                │
│    │  ○○○○○     │    │ │◉wkf│ │◉ctl│ │   │  ○○○○○     │                │
│    │  ○○○○○     │    │ └────┘ └────┘ │   │  ○○○○○     │                │
│    │            │    │ ┌────┐ ┌────┐ │   │            │                │
│    │ [Explore →]│    │ │◉lea│ │◉aut│ │   │ [Explore →]│                │
│    │            │    │ └────┘ └────┘ │   │            │                │
│    └────────────┘    │               │   └────────────┘                │
│                      │ [Start Here →]│                                  │
│                      └────────────────┘                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Implementation:**
```html
<section class="core-section">
  <h2>Core Knowledge</h2>
  <div class="grid grid-cols-6 gap-3">
    {#each coreTopics as topic}
      <TopicCard {topic} size="sm" />
    {/each}
  </div>
</section>

<section class="pathways grid grid-cols-3 gap-8 mt-12">
  <PathwayCard pathway="maintenance" featured={false} />
  <PathwayCard pathway="manufacturing" featured={true} />
  <PathwayCard pathway="design" featured={false} />
</section>
```

**Pros:**
- Most practical for 56+ topics
- Cards are naturally accessible
- Easy content updates
- Best for showing topic details (titles, descriptions)
- Fastest to implement

**Cons:**
- Less visually distinctive than node graph
- Connection lines need pseudo-elements

**Animations:**
- Card hover lift with shadow
- Featured pathway glow/pulse
- Staggered card entrance on page load

---

### DECISION: Recommended Approach

**Use APPROACH 1 (CSS Grid Molecular Tree)** because:
1. Best balance of visual impact and build speed
2. Excellent mobile experience without separate view
3. Nodes can be styled to match logo molecular aesthetic
4. Connection lines achievable with `::before`/`::after` pseudo-elements
5. Svelte transitions handle expand/collapse beautifully

**Enhancement for "wow" factor:**
- Add floating molecular nodes in hero background (SVG, like logo)
- Connection lines between pathway columns animate on scroll
- "Electricity flow" effect on hover paths using `stroke-dashoffset`

---

### Node Visual States

| State | Fill | Border | Glow | Icon | Cursor |
|-------|------|--------|------|------|--------|
| **Has video** | `#50E8A8` (mint) | none | `0 0 12px rgba(80,232,168,0.6)` | ▶ play | pointer |
| **Placeholder** | transparent | `#50D8E8` (cyan) 2px | subtle | 📷 image | pointer |
| **Coming soon** | `#E5E7EB` (gray-200) | `#9CA3AF` (gray-400) 1px | none | 🔒 lock | default |
| **Hover (any)** | +10% brightness | - | intensify | - | - |
| **Focus** | - | ring-2 ring-mint | - | - | - |

### Connection Line Styles

```css
/* Connecting lines between nodes */
.connection {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, #50E8A8, #50D8E8);
  opacity: 0.4;
}

/* Animated electricity effect */
.connection-active {
  background: linear-gradient(90deg,
    transparent 0%,
    #50E8A8 20%,
    #50D8E8 80%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: electricity 1.5s ease-in-out infinite;
}

@keyframes electricity {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
```

### Placeholder Images for Topics Without Video

For topics without videos, display a **placeholder thumbnail** instead of embedding YouTube:

| Source | Usage |
|--------|-------|
| **Option A:** Static SVG | Brand-colored placeholder with topic icon |
| **Option B:** Unsplash/Pexels | Free stock images matching topic (manufacturing, safety, etc.) |
| **Option C:** Generated gradient | Navy-to-mint gradient with topic title overlay |

**Recommended: Option A (Static SVG)**
```svg
<svg viewBox="0 0 320 180" class="placeholder-thumb">
  <rect fill="#1E1B4B" width="320" height="180" />
  <circle cx="160" cy="70" r="30" fill="none" stroke="#50E8A8" stroke-width="2" />
  <path d="M150,60 L175,70 L150,80 Z" fill="#50E8A8" /> <!-- play icon -->
  <text x="160" y="130" fill="#9CA3AF" text-anchor="middle">Coming Soon</text>
</svg>
```

---

## Layout Design Philosophy

### Core Concept: "Precision Engineering Aesthetic"

A visual language that communicates **competency**, **technical mastery**, and **institutional authority** while remaining inviting for students. Not generic corporate—this is *engineering excellence made visible*.

### Design Pillars

| Pillar | Expression | Why |
|--------|------------|-----|
| **Precision** | Geometric shapes, exact spacing, grid alignment | Engineers value accuracy |
| **Connection** | Node graphs, flowing lines, molecular patterns | Matches TLC's logo, represents learning pathways |
| **Contrast** | Bold dark sections with bright accents | Commands attention, professional gravitas |
| **Motion** | Subtle CSS animations (never distracting) | Living, active platform—not a static brochure |

---

## Visual System

### Background Treatments

| Zone | Treatment | CSS |
|------|-----------|-----|
| **Hero** | Dark navy gradient with subtle dot grid overlay | `linear-gradient(135deg, #1E1B4B, #2D2A5A)` + dot pattern |
| **Content** | Clean white with faint engineering grid | `#FFFFFF` with `#E5E7EB` 1px grid lines |
| **Featured** | Navy bands with gradient glow | Gradient border-top/bottom |
| **Alternating** | Light gray sections break monotony | `#F9FAFB` every other section |

### The Blueprint Grid

A faint engineering paper grid appears on light sections:
- 1px lines at 32px intervals
- Color: `rgba(229, 231, 235, 0.5)`
- Only visible on hover or in specific "technical" zones
- Creates subliminal precision feeling

```css
.blueprint-grid {
  background-image:
    linear-gradient(rgba(229, 231, 235, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(229, 231, 235, 0.5) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

### Diagonal Cuts

Breaking the standard horizontal layout with angled section dividers:

```
┌─────────────────────────────────────────────┐
│ DARK SECTION (Navy)                         │
│                                             │
│                                          ╱──│
│                                     ╱───    │
│                               ╱────         │
│                         ╱─────              │
└────────────────────╱───────────────────────┘
┌───────────╱────────────────────────────────┐
│ LIGHT SECTION (White)                       │
│                                             │
```

- Use `clip-path: polygon()` for clean diagonal transitions
- 5-10 degree angles (subtle, not extreme)
- Applied to hero → stats transition, testimonials → footer

### Asymmetric Layouts

Reject centered-everything layouts. Use intentional asymmetry:

**Hero Layout (Desktop)**
```
┌──────────────────────────────────────────────────────────┐
│ ┌────────────────────────────────┐  ┌─────────────────┐  │
│ │                                │  │                 │  │
│ │  ENGINEERING EDUCATION,        │  │    ◉──◉        │  │
│ │  CONNECTED                     │  │   ╱    ╲       │  │
│ │                                │  │  ◉      ◉──◉   │  │
│ │  Subtext here with more        │  │   ╲    ╱   ╲   │  │
│ │  detail about the platform     │  │    ◉──◉    ◉  │  │
│ │                                │  │                 │  │
│ │  [Explore] [Learn More]        │  │  (Node Graph)  │  │
│ └────────────────────────────────┘  └─────────────────┘  │
│                                                          │
│  55% width                          45% width (offset)   │
└──────────────────────────────────────────────────────────┘
```

- Text block: 55% width, left-aligned, generous whitespace
- Visual: 45% width, slightly overlapping grid, offset vertically
- Creates tension and visual interest

**Pathway Cards (Desktop)**
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  ┌─────────────┐                                         │
│  │ Maintenance │◀────── Smaller, muted                   │
│  └─────────────┘                                         │
│                    ┌─────────────────────┐               │
│                    │ ★ MANUFACTURING     │◀── Larger,    │
│                    │   5 videos ready    │    prominent  │
│                    │   [Start Here]      │               │
│                    └─────────────────────┘               │
│                                           ┌─────────────┐│
│                                           │   Design    ││
│                                           └─────────────┘│
└──────────────────────────────────────────────────────────┘
```

- Staggered vertical positions (not aligned tops)
- Manufacturing card 20% larger, elevated shadow
- Visual hierarchy through size differential

### Dark Mode Sections

Strategic dark sections for emphasis (not full site dark mode):

| Section | Background | Text | Purpose |
|---------|------------|------|---------|
| Hero | Navy gradient | White | Commanding first impression |
| Stats bar | Dark navy | Mint numbers | High contrast data |
| CTA band | Navy | White + mint button | Strong call to action |
| Footer | Charcoal (`#1F2937`) | Gray text | Recedes visually |

### Typography Treatments

**Headline Hierarchy**
```
H1: Titillium Web 700, 48px/56px mobile → 72px/80px desktop
    Letter-spacing: -0.02em (tightened)
    Color: White (on dark) or Navy (on light)

H2: Titillium Web 600, 32px/40px mobile → 48px/56px desktop
    All-caps option for section headers
    Underline accent: 4px mint bar, 48px wide

H3: Titillium Web 600, 24px/32px
    Used for card titles, subsections
```

**Technical Accents**
- Code snippets: IBM Plex Mono, navy bg, mint syntax highlighting
- Stats: Tabular figures, mono-spaced alignment
- Labels/badges: All-caps, tight tracking (0.05em), small (12-14px)

### Iconography Style

| Element | Treatment |
|---------|-----------|
| **Navigation icons** | Outline style, 24px, navy |
| **Feature icons** | Filled style, 32-48px, mint or cyan |
| **Status icons** | Solid circles for nodes, outline for inactive |
| **Decorative** | Molecular connections, circuit-like paths |

### Spacing System

Base unit: 8px (0.5rem)

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 4px | Icon padding, tight gaps |
| `space-sm` | 8px | Inline spacing |
| `space-md` | 16px | Component padding |
| `space-lg` | 24px | Card padding |
| `space-xl` | 32px | Section margins (mobile) |
| `space-2xl` | 48px | Section margins (tablet) |
| `space-3xl` | 64px | Section margins (desktop) |
| `space-4xl` | 96px | Hero padding, major breaks |

---

## CSS Animation System

### Animation Philosophy

Pure CSS animations—no JavaScript animation libraries. Prioritize:
- Performance (compositor-only: transform, opacity)
- Subtlety (enhance, don't distract)
- Purpose (every animation has a reason)

### Core Animations

**Node Pulse (Curriculum Tree)**
```css
@keyframes node-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(80, 232, 168, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(80, 232, 168, 0);
    transform: scale(1.05);
  }
}

.node-active {
  animation: node-pulse 2s ease-in-out infinite;
}
.node-active:hover {
  animation-play-state: paused;
  transform: scale(1.15);
}
```

**Card Lift (Hover)**
```css
.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(30, 27, 75, 0.15);
}
```

**Stat Counter (Scroll-triggered via CSS)**
```css
@keyframes count-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.stat {
  animation: count-up 600ms ease-out forwards;
  animation-delay: calc(var(--index) * 100ms); /* Staggered */
}
```
Note: Actual number animation uses Svelte + intersection observer.

**Connection Lines (Electricity Effect)**
```css
@keyframes flow {
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
}

.connection-line {
  stroke: #50E8A8;
  stroke-width: 2;
  stroke-dasharray: 8 4;
  animation: flow 1s linear infinite;
}
```

**Page Transition (View Transitions API)**
```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 200ms;
  animation-timing-function: ease-out;
}

::view-transition-old(root) {
  animation: fade-out 200ms ease-out;
}

::view-transition-new(root) {
  animation: fade-in 200ms ease-out;
}
```

### Hover States

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Buttons | Background color, slight scale (1.02) | 150ms | ease-out |
| Cards | Lift + shadow | 200ms | ease-out |
| Links | Underline slide-in | 200ms | ease-in-out |
| Nodes | Scale (1.15) + glow | 200ms | ease-out |
| Icons | Color transition | 150ms | ease |

### Reduced Motion

Respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Distinctive Design Elements

### 1. The "Circuit Board" Hero

Hero section features animated SVG paths connecting floating nodes—like a technical schematic coming to life:

```
   ┌───────────────────────────────────────┐
   │  ○ ─────────────── ○                  │
   │  │                 │                  │
   │  │   ENGINEERING   └───── ○           │
   │  │   EDUCATION,          │            │
   │  │   CONNECTED      ○ ───┘            │
   │  │                  │                 │
   │  ○ ──── ○ ──────────┘                 │
   │                                       │
   │  [Explore]  [Learn More]              │
   └───────────────────────────────────────┘
```

- SVG paths animate with `stroke-dashoffset`
- Nodes pulse subtly
- Lines glow on hover
- Creates "living schematic" feeling

### 2. Molecular Progress Indicator

Video progress shown as connected nodes (like a molecule):

```
   ◉ ─── ◉ ─── ○ ─── ○ ─── ○
   │     │
   ▼     ▼
  10%   25%        (3 of 5 complete)
```

- Filled nodes = watched
- Current = pulsing
- Future = outline only
- Line connecting fills as progress

### 3. Pathway Selector as Blueprint

A "schematic" toggle between pathways:

```
┌─────────────────────────────────────────────────┐
│                    ╭─[Maintenance]              │
│                   ╱                             │
│  [CORE] ─────────┼─────[Manufacturing]──(★)    │
│                   ╲                             │
│                    ╰─[Design]                   │
└─────────────────────────────────────────────────┘
```

- Click pathway to expand that branch
- Other branches recede (smaller, muted)
- Connection lines animate on selection

### 4. "Technical Data" Stats Section

Stats presented like engineering specifications:

```
┌──────────────────────────────────────────────────┐
│ SPECIFICATION                                     │
│ ───────────────────────────────────────────────   │
│                                                   │
│  TOPICS .............. 56     PATHWAYS ...... 3  │
│  VIDEOS ............... 6     PLACEMENT .. 315h  │
│                                                   │
│ ────────────────────────────────────────────────  │
└──────────────────────────────────────────────────┘
```

- Dotted leaders (like spec sheets)
- Mono-spaced alignment
- Navy background, mint accent on numbers

### 5. Video Card "Blueprint" Overlay

On hover, topic cards reveal a schematic overlay:

```
Default:                    Hover:
┌──────────────┐           ┌──────────────┐
│ 🎥            │           │ ┌─────┐  ▶  │
│              │    →      │ │ ╲│╱ │      │
│ Topic Title  │           │ └─────┘      │
│ 2 videos     │           │ WATCH NOW    │
└──────────────┘           └──────────────┘
```

- Blueprint-style line drawing appears
- Creates "reveal the machinery" moment
- Subtle but memorable

---

## Code Principles

### DRY (Don't Repeat Yourself)

- **Central components** for all repeated UI patterns
- **Shared utilities** in `src/lib/` for common logic
- **Design tokens** via Tailwind config (colors, spacing, typography)
- **Layouts** for consistent page structure
- **Slots / props** for component variations (not copy-paste)

### Component Architecture

| Type | Location | Purpose |
|------|----------|---------|
| Base components | `src/components/base/` | Button, Input, Card, Image, etc. |
| Composite components | `src/components/` | Header, Footer, Hero, etc. |
| Page sections | `src/components/sections/` | Reusable page blocks |
| Layouts | `src/layouts/` | Page templates |

---

## Image System

### Central `<Image>` Component

All images use Astro's built-in `astro:assets` via a wrapper component. No raw `<img>` tags elsewhere.

```astro
---
// src/components/base/Image.astro
import { Image } from 'astro:assets';

interface Props {
  src: ImageMetadata;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  class?: string;
}
---
<Image {...Astro.props} />
```

### Astro Asset Optimization

`astro:assets` handles optimization automatically at build time:

- **Formats:** WebP, AVIF with fallbacks
- **Sizes:** Responsive `srcset` generation
- **Quality:** Configurable compression
- **LQIP:** Use `placeholder="blur"` for blur-up effect

**Usage:**
```astro
---
import heroImage from '@/assets/images/hero.jpg';
import Image from '@/components/base/Image.astro';
---
<Image src={heroImage} alt="Hero" sizes="(max-width: 768px) 100vw, 50vw" />
```

### Image Breakpoints

Aligned with central breakpoints for `sizes` attribute:

| Breakpoint | Typical Size |
|------------|--------------|
| mobile | `100vw` (full width) |
| tablet | `50vw` or `100vw` |
| desktop | `33vw`, `50vw`, or fixed |

---

## Typography

### Font Stack

| Role | Font | Style |
|------|------|-------|
| **Headings** | Titillium Web | Technical/aerospace, engineering aesthetic |
| **Body** | Inter | Clean geometric sans, excellent readability |
| **Code** | IBM Plex Mono | Technical, pairs well with engineering aesthetic |

<!-- Alternative heading fonts to consider:
- Barlow: Industrial grotesque, closest to DIN
- IBM Plex Sans: Professional, engineering heritage
- Archivo: Mechanical precision, grotesque
-->

### Implementation

Self-hosted via **Fontsource** (faster than Google Fonts CDN):

```bash
bun add @fontsource-variable/inter
bun add @fontsource/titillium-web
bun add @fontsource/ibm-plex-mono
```

```css
/* src/styles/fonts.css */
@import '@fontsource-variable/inter';
@import '@fontsource/titillium-web/400.css';
@import '@fontsource/titillium-web/600.css';
@import '@fontsource/titillium-web/700.css';
@import '@fontsource/ibm-plex-mono';
```

### Font Loading Strategy (Critical for Performance)

**Use `font-display: swap`** to prevent font-blocking:

```css
/* Override Fontsource defaults in src/styles/fonts.css */
@font-face {
  font-family: 'Titillium Web';
  font-display: swap; /* Show fallback immediately, swap when loaded */
}

@font-face {
  font-family: 'Inter Variable';
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Mono';
  font-display: optional; /* Code font less critical - skip if slow */
}
```

**Fallback stack ensures instant text render:**
- Headings: `Titillium Web` → `system-ui` → `Arial` (similar geometric)
- Body: `Inter` → `system-ui` → `Segoe UI` (similar proportions)
- Code: `IBM Plex Mono` → `Consolas` → `monospace`

**Preload critical fonts in `<head>`:**
```html
<link rel="preload" href="/fonts/titillium-web-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossorigin>
```

**Tailwind Config:**
```javascript
fontFamily: {
  sans: ['Inter Variable', 'system-ui', 'sans-serif'],
  display: ['Titillium Web', 'system-ui', 'sans-serif'],
  mono: ['IBM Plex Mono', 'monospace'],
}
```

**Usage:**
```html
<h1 class="font-display">Heading</h1>
<p class="font-sans">Body text</p>
<code class="font-mono">code</code>
```

---

## Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Screen reader optimized
- Color contrast ratios meeting standards
- Focus management for interactive elements

---

## Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- No IE11 support

---

## Project Structure

```
/
├── src/
│   ├── assets/
│   │   └── images/         # Source images (originals)
│   ├── components/
│   │   ├── base/           # Base components (Button, Image, Card, Input)
│   │   ├── sections/       # Reusable page sections
│   │   └── ...             # Composite components (Header, Footer, etc.)
│   ├── layouts/            # Astro layouts
│   ├── pages/              # Astro pages
│   ├── styles/             # Global styles, Tailwind config
│   └── lib/                # Shared utilities, types, helpers
├── tests/                  # Test files
├── public/                 # Static assets (favicon, robots.txt)
├── scripts/                # Build scripts (image optimization, etc.)
├── Makefile                # Build commands
└── prd.md                  # This document
```

---

## MVP Deliverables Checklist

### Core Pages
- [ ] Home page with hero, value prop, pathway cards, animated stats
- [ ] Curriculum page with expandable tree navigation
- [ ] Topic detail pages (`/curriculum/[topic]`) with video, related topics
- [ ] About page
- [ ] 404 page

### Components
- [ ] Header with logo, nav, mobile menu
- [ ] Footer with links, copyright
- [ ] Curriculum tree (expandable/collapsible)
- [ ] Topic card (video available / coming soon states)
- [ ] Video player wrapper (YouTube embed with progress indicator)
- [ ] Related topics section (grid of linked topic cards)
- [ ] Breadcrumbs for navigation
- [ ] Hero section
- [ ] Pathway cards (3 pathways overview)
- [ ] Animated stat counter (scroll-triggered)
- [ ] Testimonial card (placeholder content OK)
- [ ] Partner logo strip (placeholder logos OK)

### Content & Data
- [ ] Curriculum data structure (JSON/TypeScript)
- [ ] 6 video mappings to topics
- [ ] Related topics mapping (manual or by pathway)
- [ ] Placeholder testimonials (1-2 quotes)
- [ ] Partner logos (East Durham College + placeholders)
- [ ] Copy for home, about pages
- [ ] SEO meta tags per page

### Polish
- [ ] Page transitions (View Transitions API)
- [ ] Skeleton loading for video embeds
- [ ] Hover states on all interactive elements
- [ ] Mobile navigation (hamburger menu)
- [ ] Favicon set generated from TLC logo
- [ ] Video progress bar/indicator

### Infrastructure
- [ ] Cloudflare Pages deployment
- [ ] Sitemap generation
- [ ] robots.txt
- [ ] Open Graph / social meta

---

## Future Enhancements (Post-MVP)

> Nice-to-haves if time permits or for next phase

### Quick Wins

| Feature | Why |
|---------|-----|
| **Search/filter** | Let users find topics quickly in curriculum |
| **Email capture** | "Get notified when new content launches" |
| **Employer CTA** | "Interested in funding content? Contact us" |
| **Video count badge** | Dynamic "6 videos available" counter |

### UX Improvements

| Feature | Why |
|---------|-----|
| **Keyboard navigation** | Arrow keys to navigate curriculum tree |
| **Deep linking** | Share links to specific topics (already have with routes) |
| **Print stylesheet** | Teachers may want to print curriculum overview |
| **Back to top** | Smooth scroll for long pages |

### Content Enhancements

| Feature | Why |
|---------|-----|
| **Video metadata** | Duration, thumbnail, description for each video |
| **Transcript/notes** | Text content alongside videos for accessibility |
| **Download resources** | PDF handouts, worksheets per topic |

---

## Curriculum Data (from T_level_Spec.md)

### Structure

| Section | Items | Videos |
|---------|-------|--------|
| Core Knowledge | 16 topics | 1 (Mechanical Principles) |
| Core Skills | 8 skills | 0 |
| Employer-Set Project | 1 project | 0 |
| Industry Placement | 1 placement | 0 |
| Pathway 1: Maintenance | 10 topics | 0 |
| Pathway 2: Manufacturing | 10 topics | 5 |
| Pathway 3: Design | 10 topics | 0 |
| **Total** | **56** | **6** |

**Note:** Total of 56 curriculum items includes all navigable sections. If counting only knowledge/skill topics (excluding ESP and Placement), total is 54.

### Video Mappings

| Topic ID | Topic | Video Title | YouTube ID |
|----------|-------|-------------|------------|
| `core-mechanical` | Mechanical Principles | Mechanical principles part 01 | `-42Z-_Kq0QU` |
| `path2-workflow` | Manufacturing Operations and Workflow | Factory Workflow: From Quotation to Delivery | `r5teJxtTxlk` |
| `path2-control` | Process Control Systems | Understanding Control System | `2BwUMk10WqI` |
| `path2-lean` | Lean Manufacturing | Toyota Kaizen Clip | `wot9DFzFRLU` |
| `path2-lean` | Lean Manufacturing | Learning from Toyota - Simon Sinek | `mm8_8EDITNU` |
| `path2-automation` | Automation and Robotics | Factory acceptance test of Compact Robot Cell | `C5jEFwVpZyo` |

### TypeScript Data Structure

```typescript
// src/lib/types/curriculum.ts

type TopicStatus = 'active' | 'placeholder' | 'coming-soon';
type SectionType =
  | 'core-knowledge'
  | 'core-skills'
  | 'esp'
  | 'placement'
  | 'pathway-1'
  | 'pathway-2'
  | 'pathway-3';

interface Video {
  id: string;
  title: string;
  youtubeId: string;
  duration?: string;        // e.g., "12:34"
  thumbnailUrl?: string;    // Auto-generated from YouTube
}

interface Topic {
  id: string;               // URL-safe slug, e.g., "mechanical-principles"
  title: string;
  section: SectionType;
  status: TopicStatus;
  videos?: Video[];         // Can have multiple videos (e.g., Lean has 2)
  description?: string;     // Short description for cards
  relatedTopics?: string[]; // Array of topic IDs
}

interface Section {
  id: SectionType;
  title: string;
  description: string;
  icon?: string;            // Heroicon name
  topics: Topic[];
}

interface Curriculum {
  sections: Section[];
  totalTopics: number;
  totalVideos: number;
}
```

### Placeholder Video

For topics without real videos, use a "Coming Soon" static state:
- No video embed
- Show topic description + "Video coming soon" badge
- Muted styling (gray border, reduced opacity)

---

## Complete Topic Data

### Topic ID Convention

All topics use a consistent ID scheme for URLs and data:

| Section | Pattern | Example |
|---------|---------|---------|
| Core Knowledge | `core-{topic}` | `core-mechanical`, `core-materials` |
| Core Skills | `skill-{topic}` | `skill-safety`, `skill-comms` |
| Employer-Set Project | `esp` | `esp` |
| Industry Placement | `placement` | `placement` |
| Pathway 1 | `path1-{topic}` | `path1-diagnostic`, `path1-install` |
| Pathway 2 | `path2-{topic}` | `path2-workflow`, `path2-lean` |
| Pathway 3 | `path3-{topic}` | `path3-cad`, `path3-prototype` |

### Core Knowledge Topics (16 topics)

| ID | Topic | Description |
|----|-------|-------------|
| `core-health` | Health and Safety | Risk and hazard identification. COSHH, RIDDOR, HASAWA compliance. PPE and safe working practices. Fire safety and manual handling. Lock-out/tag-out procedures. |
| `core-materials` | Materials Science | Metals (ferrous and non-ferrous), plastics, polymers, composites. Material properties: mechanical, electrical, thermal, magnetic. Material selection and testing methods. Heat treatments and surface treatments. |
| `core-maths` | Mathematics for Engineering | Algebra, geometry, trigonometry. Calculus (differential and integral). Statistics and probability. Binary, octal, hexadecimal number systems. |
| `core-mechanical` | Mechanical Principles | Newton's laws of motion. Forces, momentum, friction. Simply supported beams. Energy storage and transfer. Kinetic and potential energy. **Has video.** |
| `core-electrical` | Electrical and Electronic Principles | Ohm's law, Kirchhoff's laws. AC/DC circuits. Capacitance, inductance, resistance. Analogue and digital electronics. Semiconductors. |
| `core-mechatronics` | Mechatronics | Integrated mechanical and electrical systems. Programmable logic controllers (PLCs). Hydraulics and pneumatics integration. |
| `core-fluid` | Fluid Power | Pneumatic systems design and operation. Hydraulic systems design and operation. Flow, pressure, viscosity principles. |
| `core-cad` | Engineering Drawings and CAD | Technical drawing interpretation. Dimensioning and tolerancing. CAD software usage. BS and ISO standards compliance. |
| `core-qa` | Quality Assurance | QA vs QC principles. 6S methodology. Inspection and testing methods. Non-destructive testing (NDT). |
| `core-manufacturing` | Manufacturing Processes | Machining, casting, moulding. Welding, brazing, soldering. Assembly and fitting. CNC and CAM operations. |
| `core-maintenance` | Maintenance Strategies | Planned vs reactive maintenance. Condition monitoring techniques. Asset lifecycle management. |
| `core-project` | Project Management | Planning and scheduling. Resource allocation. Risk management. Budget and cost control. |
| `core-sustainability` | Sustainability | Circular economy principles. Waste reduction and recycling. Environmental regulations. Product lifecycle considerations. |
| `core-business` | Business Awareness | Commercial principles. Supply chain management. Tendering and contracts. Financial literacy. |
| `core-digital` | Digital Technologies | Industry 4.0 concepts. AI and robotics applications. Automation and smart manufacturing. IoT in manufacturing. |
| `core-problem` | Problem Solving | Root cause analysis. Fault diagnosis techniques. Six Sigma methodology. Kaizen and continuous improvement. |

### Core Skills (8 skills)

| ID | Skill | Description |
|----|-------|-------------|
| `skill-safety` | Working Safely | Apply health and safety regulations. Risk assessment and mitigation. Safe use of equipment and tools. |
| `skill-comms` | Communication and Teamwork | Technical communication. Collaborative working. Documentation and reporting. |
| `skill-data` | Data Analysis | Interpret engineering data. Statistical analysis. Data-driven decision making. |
| `skill-planning` | Planning and Prioritisation | Task scheduling. Resource management. Meeting deadlines. |
| `skill-digital` | Digital Tools | Engineering software proficiency. CAD/CAM tools. Data management systems. |
| `skill-maths` | Applying Engineering Maths | Mathematical problem solving. Calculations for engineering applications. Unit conversions and tolerances. |
| `skill-fault` | Fault-Finding and Decision-Making | Diagnostic reasoning. Systematic troubleshooting. Evidence-based decisions. |
| `skill-professional` | Professional Behaviours | Workplace ethics. Continuous professional development. Industry standards compliance. |

### Employer-Set Project (ESP)

| ID | Component | Description |
|----|-----------|-------------|
| `esp` | Employer-Set Project | Real-world project requiring students to interpret a brief, plan and schedule work, produce engineering documentation, apply technical knowledge, and present findings with justified decisions. Assessed through practical and written tasks. |

### Industry Placement

| ID | Component | Description |
|----|-----------|-------------|
| `placement` | Industry Placement | Minimum 315 hours of real engineering work. Exposure to workplace systems and processes. Professional behaviours development. Health and safety compliance in real settings. Evidence log and reflective practice requirements. |

### Pathway 1: Maintenance, Installation and Repair (10 topics)

| ID | Topic | Description |
|----|-------|-------------|
| `path1-diagnostic` | Diagnostic Techniques | Diagnostic methods for mechanical, electrical and fluid power systems. |
| `path1-planned` | Planned and Reactive Maintenance | Scheduled maintenance vs breakdown response. Maintenance planning systems. |
| `path1-condition` | Condition Monitoring | Vibration analysis, thermal imaging, oil analysis. Predictive maintenance techniques. |
| `path1-install` | Installation and Commissioning | Equipment installation procedures. Commissioning and handover processes. |
| `path1-testing` | System Testing and Calibration | Test procedures and equipment. Calibration standards and documentation. |
| `path1-drawings` | Interpreting Technical Drawings | Reading mechanical and electrical drawings. Using technical manuals. |
| `path1-tools` | Hand Tools and Equipment | Safe use of hand tools, power tools and specialist equipment. |
| `path1-fault` | Fault-Finding on Automated Systems | PLC diagnostics. Automated system troubleshooting. |
| `path1-isolation` | Safe Isolation and LOTO | Lock-out/tag-out procedures. Electrical isolation protocols. |
| `path1-reporting` | Reporting and Compliance | Documentation standards. Regulatory compliance. Maintenance records. |

### Pathway 2: Manufacturing, Processing and Control (10 topics)

**Primary demo pathway** - contains 5 of 6 available videos.

| ID | Topic | Video | Description |
|----|-------|-------|-------------|
| `path2-workflow` | Manufacturing Operations and Workflow | **Yes** | Production flow management. From quotation to delivery processes. |
| `path2-control` | Process Control Systems | **Yes** | Control system fundamentals. Sensors, actuators, and feedback loops. |
| `path2-planning` | Production Planning and Scheduling | - | Capacity planning. Production scheduling systems. |
| `path2-lean` | Lean Manufacturing | **Yes (x2)** | Waste elimination. Kaizen principles. Toyota Production System. Continuous improvement. |
| `path2-quality` | Quality Inspection and Metrology | - | Measurement techniques. Quality inspection processes. |
| `path2-machine` | Machine Operation and Set-up | - | Machine preparation. Tooling and fixtures. Operating procedures. |
| `path2-automation` | Automation and Robotics | **Yes** | Industrial robotics. Automated production systems. Robot cell operation. |
| `path2-spc` | Statistical Process Control | - | Control charts. Process capability. Variation analysis. |
| `path2-materials` | Material Handling and Logistics | - | Material flow. Storage systems. Internal logistics. |
| `path2-environment` | Environmental Considerations | - | Sustainability in manufacturing. Waste management. Energy efficiency. |

### Pathway 3: Design and Development (10 topics)

| ID | Topic | Description |
|----|-------|-------------|
| `path3-lifecycle` | Product Design Lifecycle | Concept to production journey. Design phases and gates. |
| `path3-cad` | CAD Modelling and Simulation | 3D modelling techniques. FEA and simulation tools. |
| `path3-drawings` | Engineering Drawings and Tolerances | GD&T principles. Drawing standards. Tolerance stack-up. |
| `path3-prototype` | Prototyping and Testing | Rapid prototyping methods. Test protocols and validation. |
| `path3-dfm` | Design for Manufacture (DfM) | Manufacturability considerations. Cost-effective design. |
| `path3-dfa` | Design for Assembly (DfA) | Assembly efficiency. Component reduction. Modular design. |
| `path3-systems` | Systems Design and Integration | System architecture. Component integration. Interface design. |
| `path3-materials` | Materials Selection | Material selection criteria. Cost-performance trade-offs. |
| `path3-docs` | Project Documentation | Technical reporting. Design documentation standards. |
| `path3-client` | Client Communication | Design reviews. Stakeholder presentations. Requirements gathering. |

### Assessment Structure

| Assessment | Type | Description |
|------------|------|-------------|
| Core Exam 1 | Written | Engineering principles |
| Core Exam 2 | Written | Manufacturing and business principles |
| Employer-Set Project | Practical + Written | Applied project work |
| Occupational Specialism | Synoptic | Pathway-specific practical project |

---

## Content & Copy

### Navigation

| Link | Label | Route |
|------|-------|-------|
| Home | Home | `/` |
| Curriculum | Curriculum | `/curriculum` |
| About | About TLC | `/about` |

### Hero Section

```
Headline: "Engineering Education, Connected"
Subtext: "Explore the T-Level Engineering & Manufacturing curriculum with real industry videos"
CTA Primary: "Explore Curriculum"
CTA Secondary: "Learn More"
```

### Stats (Animated)

| Stat | Number | Label |
|------|--------|-------|
| Topics | 56 | Curriculum Topics |
| Videos | 6 | Industry Videos |
| Pathways | 3 | Career Pathways |
| Hours | 315+ | Industry Placement |

### Testimonials

See **Testimonials (Generated)** section below for full quotes. Summary:

| Persona | Name | Org | Theme |
|---------|------|-----|-------|
| Teacher | Sarah Mitchell | East Durham College | Visual learning transforms teaching |
| Employer | James Thornton | Northeast Manufacturing Ltd | Talent pipeline and sector support |
| Student | Anonymous | T-Level Engineering | Placement preparation confidence |

### Footer

| Section | Links |
|---------|-------|
| Navigation | Home, Curriculum, About |
| Legal | Privacy Policy (placeholder), Terms (placeholder) |
| Contact | info@tlc-learning.co.uk (placeholder) |
| Copyright | 2026 Technical Learning Company |

### 404 Page

```
Headline: "Page Not Found"
Subtext: "The page you're looking for doesn't exist or has been moved."
CTA: "Back to Home"
```

### About Page Copy

**Hero:**
```
Headline: "Bridging Classrooms and Shop Floors"
Subtext: "TLC connects engineering education with real industry practice"
```

**Mission Section:**
```
Title: "Our Mission"

Engineering excellence starts with understanding. Too often, students learn theory without seeing how it applies on the factory floor. Teachers deliver curriculum without witnessing the machinery in action. And employers struggle to find apprentices who truly grasp what manufacturing demands.

Technical Learning Company was founded to bridge these gaps.

We believe that when teachers walk the shop floor, they teach with conviction. When students see real processes, they learn with purpose. And when employers engage with education, they build their future workforce.

Our platform brings industry footage directly into the classroom—making the T-Level curriculum come alive with real-world context.
```

**What We Do Section:**
```
Title: "What We Do"

FOR TEACHERS
Access curated video content aligned with T-Level curriculum topics. See the processes you teach. Bring industry into your classroom.

FOR EMPLOYERS
Invest in education that matters. Fund content specific to your facilities. Identify promising students for apprenticeship pathways.

FOR STUDENTS
Connect your learning to real careers. See where your knowledge leads. Prepare for industry placements with confidence.
```

**T-Levels Section:**
```
Title: "About T-Levels"

T-Levels are two-year technical qualifications designed in partnership with employers. They combine classroom learning with substantial industry placements—giving students the skills that industry actually needs.

The Engineering and Manufacturing T-Level covers:
• Core engineering principles (mechanical, electrical, materials)
• Practical skills (CAD, quality assurance, problem-solving)
• Specialist pathways (Maintenance, Manufacturing, or Design)
• 315+ hours of real industry placement

TLC's curriculum platform maps directly to the official T-Level specification, making it easy to find relevant content for any topic.
```

**Partner Section:**
```
Title: "Our Partners"

We work with forward-thinking colleges and employers across the UK who share our vision of connected learning.

Launch Partner: East Durham College
[Additional partners welcome - contact us]
```

**Contact Section:**
```
Title: "Get In Touch"

Interested in partnering with TLC?
Email: info@tlc-learning.co.uk

Teachers: Request curriculum access
Employers: Explore content sponsorship
Colleges: Discuss integration
```

### Testimonials (Generated)

```
Quote 1:
"The platform transforms how I teach mechanical principles. Instead of describing a hydraulic press, I can show one in operation. Students get it immediately."
— Sarah Mitchell, Engineering Lecturer, East Durham College

Quote 2:
"We've been looking for ways to connect with local colleges. TLC gives us a direct line to future talent while supporting their education. It's exactly what the sector needs."
— James Thornton, Operations Director, Northeast Manufacturing Ltd

Quote 3 (optional):
"Before my placement, I was nervous about walking into a real factory. Watching the workflow videos helped me understand what to expect. I felt prepared."
— Student Testimonial, T-Level Engineering
```

---

## Homepage Structure

### Section Order (Top to Bottom)

```
┌─────────────────────────────────────────────────┐
│ HEADER                                          │
│ Logo | Home | Curriculum | About                │
├─────────────────────────────────────────────────┤
│ HERO                                            │
│ Headline + Subtext + CTAs                       │
│ [Explore Curriculum]  [Learn More]              │
├─────────────────────────────────────────────────┤
│ STATS BAR                                       │
│ 56 Topics | 6 Videos | 3 Pathways | 315+ Hours  │
├─────────────────────────────────────────────────┤
│ PATHWAY CARDS (3 columns on desktop)            │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │Maintain.│ │★Manufac.│ │ Design  │             │
│ │0 videos │ │5 videos │ │0 videos │             │
│ └─────────┘ └─────────┘ └─────────┘             │
│ Pathway 2 highlighted as "Start Here"           │
├─────────────────────────────────────────────────┤
│ CURRICULUM PREVIEW                              │
│ Mini tree showing Pathway 2 topics with videos  │
│ [View Full Curriculum →]                        │
├─────────────────────────────────────────────────┤
│ TESTIMONIALS                                    │
│ 2 cards, side by side on desktop                │
├─────────────────────────────────────────────────┤
│ PARTNER LOGOS                                   │
│ East Durham College | TLC | Placeholder         │
├─────────────────────────────────────────────────┤
│ FOOTER                                          │
│ Nav | Legal | Contact | Copyright               │
└─────────────────────────────────────────────────┘
```

### Topic Detail Page Structure

```
┌─────────────────────────────────────────────────┐
│ HEADER                                          │
├─────────────────────────────────────────────────┤
│ BREADCRUMBS                                     │
│ Home > Curriculum > Pathway 2 > Topic Name      │
├─────────────────────────────────────────────────┤
│ TOPIC HEADER                                    │
│ Section badge | Topic Title                     │
├─────────────────────────────────────────────────┤
│ VIDEO PLAYER (if available)                     │
│ YouTube embed with skeleton loading             │
│ - or -                                          │
│ "Video Coming Soon" placeholder                 │
├─────────────────────────────────────────────────┤
│ TOPIC DESCRIPTION                               │
│ 2-3 sentences about the topic                   │
├─────────────────────────────────────────────────┤
│ RELATED TOPICS                                  │
│ Grid of 3-4 topic cards from same pathway       │
├─────────────────────────────────────────────────┤
│ FOOTER                                          │
└─────────────────────────────────────────────────┘
```

---

## Component States

### Topic Card

| State | Visual |
|-------|--------|
| **Default** | White bg, navy border, mint accent on video badge |
| **Hover** | Lift (shadow-lg, translate-y-[-2px]), border-mint |
| **Active (has video)** | Green play icon, "Watch Video" text |
| **Placeholder** | Muted colors, "Coming Soon" badge, cursor-default |
| **Focus** | Ring-2 ring-mint ring-offset-2 |

### Video Player

| State | Visual |
|-------|--------|
| **Loading** | Skeleton with pulse animation, aspect-video |
| **Ready** | YouTube embed visible |
| **Error** | "Video unavailable" message + retry button |

### Curriculum Tree Node

| State | Visual |
|-------|--------|
| **Default** | Circle outline, section color |
| **Has Video** | Filled circle, glow effect, play icon |
| **Hover** | Scale 1.1, tooltip with title |
| **Selected** | Ring highlight, connected nodes glow |

### Mobile Menu

| State | Visual |
|-------|--------|
| **Closed** | Hamburger icon (3 lines) |
| **Open** | X icon, slide-in panel from right |
| **Animating** | 200ms ease-out transition |

---

## Open Questions

> *To be clarified with Martin*

- [ ] East Durham College: Need their logo for partner strip?
- [ ] Additional videos: Any more links beyond the 6 provided?
- [ ] Contact info: Email address or contact form for About page?
- [x] Curriculum: Use simplified spec (56 items total, 54 knowledge/skill topics) - complete topic data added
- [x] Pathways: Show all 3 (videos concentrated in Pathway 2)
- [x] Typography: Titillium Web (headings) + Inter (body) + IBM Plex Mono (code)
- [x] Colors: Mint (#50E8A8), Cyan (#50D8E8), Navy (#1E1B4B)
- [x] Site purpose: T-Level Engineering curriculum platform

---

## Revision History

| Date | Changes |
|------|---------|
| 2026-01-11 | **Major update:** Added 3 Learning Path Tree visualization approaches (CSS Grid Molecular, SVG Network Graph, Hybrid Card-Tree) with ASCII diagrams, pros/cons, and implementation guidance. Recommended Approach 1 (CSS Grid). Added logo optimization section with size targets. Added font-display: swap and font loading strategy. Added comprehensive About page copy, generated testimonials. Removed video progress tracking from MVP (deferred to post-MVP). Added placeholder image strategy using branded SVG. Updated stats to show 56 topics. |
| 2026-01-11 | Added Complete Topic Data section: 16 Core Knowledge topics with descriptions, 8 Core Skills with IDs, ESP and Placement descriptions, all 3 pathways with full topic lists, standardized topic ID convention (core-xxx, path1/2/3-xxx), assessment structure. Updated video mappings with topic IDs. Clarified topic count (56 total, 54 excluding ESP/Placement). |
| 2026-01-11 | Added comprehensive Layout Design Philosophy section with "Precision Engineering Aesthetic" concept, visual system, CSS animation specs, and 5 distinctive design elements. Removed Motion One (CSS-only animations). |
| 2026-01-11 | Added TypeScript data structures, Content & Copy section, Homepage/Topic wireframes, Component States definitions |
| 2026-01-11 | Updated colors (mint #50E8A8, cyan #50D8E8), added MVP features (stats, testimonials, related topics, video progress), curriculum data with video mappings |
| 2026-01-11 | Added TLC project context, brand colors, page inventory, MVP checklist, suggested additions |
| 2026-01-11 | Typography finalized: Titillium Web + Inter + IBM Plex Mono |
| 2026-01-11 | Full tooling stack: Bun, Biome, Vitest, Playwright, Heroicons, Nanostores, astro:assets. No analytics. |
| 2026-01-11 | Central breakpoints (mobile/tablet/desktop), favicon spec, confirmed features |
| 2026-01-11 | Added premium baseline, DRY principles, Image system, LQIP |
| 2026-01-11 | Initial draft - tech stack and design requirements |
