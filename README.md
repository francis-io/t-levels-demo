# TLC - T-Level Engineering Learning Platform

A modern web platform connecting T-Level Engineering students with industry-relevant curriculum content. TLC bridges classroom learning with real-world engineering practice.

**Live site:** Pending
**Demo:** [t-levels-demo.pages.dev](https://t-levels-demo.pages.dev)

## About

TLC provides curriculum content for the T-Level Engineering & Manufacturing qualification, featuring:

- **Core Knowledge** - 16 essential engineering topics
- **Core Skills** - 8 practical skill areas
- **Specialist Pathways** - Maintenance, Manufacturing, and Design tracks
- **Industry Placement** - Resources for the 315-hour placement requirement

The platform helps educators access authentic industry content and connects students to meaningful career pathways.

See the full [Product Requirements Document](prd.md) for detailed specifications.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Astro 5](https://astro.build) | Static site generator with island architecture |
| [Svelte 5](https://svelte.dev) | Interactive component framework |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Biome](https://biomejs.dev) | Linting and formatting |
| [Vitest](https://vitest.dev) | Unit testing |
| [nanostores](https://github.com/nanostores/nanostores) | Lightweight state management |

### Fonts

- **Titillium Web** - Display headings
- **Inter** - Body text
- **IBM Plex Mono** - Code/monospace

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run Biome linter |
| `npm run format` | Format code with Biome |
| `npm run check` | Run Biome linter + formatter checks |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Project Structure

```
src/
├── components/
│   ├── base/          # Reusable UI components (Button, Card, Badge, etc.)
│   ├── effects/       # Visual effects (ParticleBackground)
│   ├── layout/        # Header, Footer, Container
│   ├── sections/      # Page sections (Hero, Testimonials, etc.)
│   └── trees/         # Curriculum tree components
├── layouts/           # Astro page layouts
├── lib/
│   ├── data/          # Curriculum and video data
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── pages/             # Astro pages (file-based routing)
│   ├── curriculum/    # Curriculum topic pages
│   ├── about.astro
│   ├── index.astro
│   └── 404.astro
└── styles/            # Global CSS
```

## Hosting

The site is hosted on **Cloudflare Pages** with automatic deployments:

- **Production:** Deploys automatically on merge to `master`
- **Previews:** Branch deployments for pull requests
- **Build command:** `npm run build`
- **Output directory:** `dist`

The site is configured for static output (`output: 'static'` in Astro config).

## Development

```bash
# Clone the repository
git clone <repo-url>
cd t-levels-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server runs at `http://localhost:4321` with hot module reloading.

## Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage
```

## License

All rights reserved.
