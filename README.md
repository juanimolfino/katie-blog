# What Katie Seas

Editorial travel and diving blog for Katie, built as a modern frontend that will evolve into a real publishing platform.

## Project Overview

`What Katie Seas` is a personal brand and content site centered on:

- travel
- diving
- ocean life
- wildlife
- photography and video
- lived experiences from around the world

The current version is a frontend-driven website with static content and placeholder areas still being replaced. The long-term goal is to grow this into a professional, searchable, SEO-ready blog with dynamic post pages, structured categories, an admin workflow for Katie, and future monetization paths.

For the product vision and brand direction, see [docs/project-brief.md](docs/project-brief.md).

## Current State

Today the project includes:

- `Home`
- `About`
- `Blog`
- dynamic blog post pages
- `Destinations`
- `Videos`
- `Contact`

`Gallery` is still mapped to an existing page while the real gallery experience is being defined.

Important current realities:

- content is mostly static and lives in source files
- many images are already local assets in `public/images`
- some page sections still contain placeholder copy or placeholder overlays
- the contact form is UI-only and does not submit to a backend
- the site is in the transition from concept site to real editorial product

## Product Goals

Short term:

- replace placeholder text, photos, and video with real Katie content
- strengthen the editorial feel of the site
- define blog structure, categories, and page patterns
- finish the static version before moving into app/admin mode

Medium term:

- refine dynamic blog templates
- refine search and filtering
- clarify the relationship between `Blog`, `Destinations`, and `Gallery`

Long term:

- move to an admin-managed publishing workflow
- improve SEO, accessibility, and production readiness
- prepare the site for ads, affiliates, and partnerships
- evolve from a static site into an application with authentication, database-backed content, and admin workflows
- leave room for future e-commerce capabilities

## Tech Stack

- `React 19`
- `TypeScript`
- `Vite`
- `React Router`
- `Tailwind CSS`
- `Radix UI` primitives and utility components
- `Lucide React` icons

## Future Architecture Direction

Even when implementing small frontend tasks, the project should be approached as a future app, not only as a static marketing site.

This means we should prefer decisions that will make it easier to migrate toward:

- authenticated access for Katie
- an admin interface or editorial dashboard
- a database-backed content model
- create/edit/delete workflows for posts and content
- structured categories, tags, destinations, and media relationships
- future monetization features
- possible future e-commerce features

Supabase is a strong likely path for this project because it can cover:

- authentication
- database
- storage
- row-level security
- simple app/backend workflows

Implementation guideline:

- when possible, shape components and content structures so they can later move from hardcoded data to database records with minimal rewriting
- avoid page-specific hacks that would make a future app migration harder
- prefer content models that can map cleanly to tables, slugs, categories, and media fields

## Getting Started

### Requirements

- `Node.js 20+` recommended
- `npm`

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```txt
.
├── public/                 Static assets such as images and video
├── src/
│   ├── components/         Layout, UI primitives, and homepage sections
│   ├── data/               Static site config, posts, destinations, categories
│   ├── hooks/              Shared hooks
│   ├── lib/                Utility helpers
│   ├── pages/              Route-level pages
│   ├── types/              Shared TypeScript types
│   ├── App.tsx             Main router
│   ├── index.css           Global styles and design tokens
│   └── main.tsx            App entrypoint
└── docs/
    ├── project-brief.md    Product, brand, and roadmap context
    └── post-model-guide.md Post fields, metadata, and editorial guidance
```

## Asset Organization

Static assets in `public/images` should be grouped by page or functional area instead of staying loose at the top level.

Current folders:

- `public/images/about/`
- `public/images/brand/`
- `public/images/home/`
- `public/images/destinations/`
- `public/images/videos/`
- `public/images/instagram/`

Recommended rule:

- If an image belongs to one page only, store it in that page folder
- If an image is part of the brand system, store it in `brand`
- If an image may be reused across many pages later, put it in the most stable shared folder only when that reuse is real

Recommended naming:

- use lowercase
- use hyphens
- keep the page prefix when it helps searchability
- prefer descriptive names over generic numbered files

Examples:

- `public/images/about/about-hero.jpg`
- `public/images/about/about-first-steps-1.jpeg`
- `public/images/home/newsletter-bg.jpg`
- `public/images/brand/logo-con-nombre.png`

Avoid when possible:

- loose files directly inside `public/images/`
- names like `final-final-2.jpg`
- names that hide where the asset belongs

Practical workflow:

1. Katie chooses or exports the real asset
2. Save it in the matching page folder
3. Use a clear descriptive filename
4. Replace the route in the component immediately so the repo stays tidy

## Key Files

- [src/App.tsx](src/App.tsx): application routes
- [src/data/site.ts](src/data/site.ts): site branding, navigation, author metadata
- [src/data/content.ts](src/data/content.ts): current mock posts and destinations
- [src/pages/About.tsx](src/pages/About.tsx): long-form editorial biography page
- [src/pages/Blog.tsx](src/pages/Blog.tsx): static blog archive with category browsing and search
- [src/pages/BlogPostPage.tsx](src/pages/BlogPostPage.tsx): reusable static post template driven by post metadata
- [src/pages/Destinations.tsx](src/pages/Destinations.tsx): geographic browsing by continent, country, and destination keyword
- [src/components/sections/Hero.tsx](src/components/sections/Hero.tsx): homepage hero
- [src/index.css](src/index.css): global styles, fonts, color tokens, utility classes
- [tailwind.config.js](tailwind.config.js): theme extensions for color, typography, and animation

## Routing Snapshot

Current routes in the app:

- `/` -> Home
- `/about` -> About
- `/blog` -> Blog
- `/blog/:slug` -> BlogPostPage
- `/destinations` -> Destinations
- `/gallery` -> currently points to Home
- `/videos` -> Videos
- `/contact` -> Contact

This is an intentional in-progress state, not a finished information architecture.

## Content Model Today

Content is currently stored directly in code:

- site-level metadata in `src/data/site.ts`
- mock blog posts in `src/data/content.ts`
- mock destinations in `src/data/content.ts`
- page-specific editorial content directly inside some page files, especially `src/pages/About.tsx`

That means changes right now often happen in two places:

1. structured content files in `src/data`
2. hardcoded page-level content inside route components

## Design Direction

The current visual system is based on:

- serif-heavy editorial body typography
- clean sans-serif display type
- ocean blues, terracotta accents, and cream backgrounds
- large photography and image-led storytelling
- minimalist spacing with subtle motion

The intended tone is:

- modern
- subtle
- fresh
- oceanic
- natural
- polished

## Known Gaps

The following are still to be built or refined:

- final Katie-approved copy and image selection
- real gallery experience
- search and filtering UX polish
- CMS or admin workflow
- SEO metadata strategy
- backend-connected contact workflow
- production hardening and security review

## Working Notes

When contributing to this repo, prefer:

- real content over placeholders
- reusable content structures over one-off hacks
- editorial clarity over decorative complexity
- changes that make a future CMS migration easier

Keep the brand grounded in ocean, travel, nature, and authenticity.

Current collaboration context:

- Juani is working with Katie directly on content, missing images, and text corrections
- the `About` page is currently in an active refinement pass
- the static `Blog`, `BlogPostPage`, and `Destinations` foundations are in place
- after the static site is approved with Katie, the next major phase is app/admin mode
- while a page is being refined, keep changes scoped and avoid unnecessary structural churn
- future implementation choices should assume the site will later become a real app with auth, database, and admin tooling
- whenever product, architecture, taxonomy, or workflow decisions are made, update `README.md`, `docs/project-brief.md`, `docs/post-model-guide.md`, or `info.md` as needed so context survives future chat loss

## Documentation

- Product and brand context: [docs/project-brief.md](docs/project-brief.md)
- Post metadata and editorial structure: [docs/post-model-guide.md](docs/post-model-guide.md)
- Technical setup and repo orientation: this `README.md`
