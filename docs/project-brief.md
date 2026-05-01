# Katie Blog - Project Brief

## 1. Project Summary

This project is the website and future publishing platform for Katie's travel and diving blog, currently branded as `What Katie Seas`.

The site is meant to feel beautiful, personal, editorial, and professional. It should communicate ocean life, travel, wildlife, curiosity, and lived experience. The long-term business goal is to turn the blog into a real traffic-generating publication that can support passive income through content, partnerships, affiliates, and later product sales.

Today the project is a frontend-first site with static content. Over time it should evolve into a dynamic publishing platform with structured blog categories, searchable content, admin tools, SEO foundations, and monetization-ready page architecture.

## 2. Who Katie Is

Katie is a traveler, dive professional, and storyteller who wants to share her real experiences from different parts of the world.

Diving is the core of the project, but Katie's world is broader than diving alone. The blog should also make room for:

- Travel experiences
- Wildlife and animals
- Nature
- Life on the road and near the ocean
- Photography and video
- Personal stories and reflections

Katie is also an artist. In the future, the website may include a way to showcase and sell her designs, but that is not a current priority.

## 3. Brand Personality

The brand should feel:

- Ocean-inspired
- Travel-driven
- Nature-connected
- Animal-aware
- Subtle
- Fresh
- Minimalist
- Modern
- Elegant without feeling luxury-for-luxury's-sake

Color direction:

- Sea tones
- Natural tones
- Sober, calm color palette
- Modern, clean contrast
- Avoid loud, flashy, overly saturated styling

Emotional direction:

- Inspires people to travel
- Conveys freedom, movement, and wonder
- Feels personal and authentic
- Feels feminine in a subtle and mature way, not overly cute or decorative

## 4. Product Goals

Primary goals:

- Publish Katie's real stories, images, and videos
- Build a polished and memorable brand presence
- Make the content easy to browse and discover
- Support future organic traffic growth through SEO
- Create a base for future monetization

Business goals:

- Generate traffic through valuable content
- Create passive income through views
- Support future monetization through ads, affiliate relationships, and travel partnerships
- Leave room for future creative/product sales

## 5. Content Principles

Content should be:

- Real
- Personal
- Visually rich
- Based on Katie's own experiences
- Supported by Katie's own photos and videos whenever possible

Assets:

- Images are expected to be Katie's own
- Videos are expected to be Katie's own
- Text should move toward real written content instead of placeholders

Current priority is to replace placeholder content with real content.

Operational note:

- Juani is currently working with Katie in real time on content refinement
- the active focus right now is completing the `About` page with final text and missing real images
- the static blog archive, reusable static post template, destinations browsing structure, and gallery foundation have been created
- the first admin/auth slice has started with Supabase Auth: `/admin/login` signs in with email/password, `/admin` is protected, `/admin/posts` has first-pass create/edit/delete screens backed by Supabase `posts` plus `post_blocks` tables, `/admin/gallery` manages Supabase `gallery_items`, `/blog` and `/destinations` show only published Supabase posts, `/gallery` shows only visible Supabase gallery items, and `/blog/:slug` can render published Supabase posts before falling back to static data for legacy/static posts
- `/admin/settings` now manages editable site/page settings through Supabase `site_settings`: site name, tagline, description, public email, logo URLs/uploads, Home hero YouTube IDs or URLs, Home fallback image, Home about teaser, Home Up Next image/copy/destinations, About hero image/title, and Instagram/YouTube/Pinterest links. Public header/footer branding, selected Home sections, About hero, contact email/social links, and blog/destinations hero text should read through this settings layer with local defaults as fallback.
- Home recent posts read from published Supabase posts rather than the legacy static post list.
- Home destinations also read from published Supabase posts with destination/country metadata, linking visitors to the related blog post.
- Admin access has two layers: a frontend email allowlist through `VITE_ADMIN_EMAILS`, and a required Supabase RLS hardening script in `docs/supabase-admin-security.sql` that limits database/storage writes to emails in `public.admin_users`.
- Supabase Storage is the chosen media direction; authenticated admin users can upload post cover images, post block images, and gallery images to the public `media` bucket
- Admin image uploads should be optimized for web performance, not stored at original camera size. Non-GIF uploads are always converted to a WebP derivative before storage. Current targets are cover/gallery images around 900 KB and inline post images around 800 KB, using iterative WebP compression with sensible width/quality floors.
- Published Supabase posts should show related posts at the bottom, selected from other published posts with shared categories, tags, and continent.
- Public social/contact details are whatkatieseas@gmail.com, Instagram `whatkatie.seas`, YouTube `@whatkatieseas`, and Pinterest `whatkatieseas`.
- Recommended next build steps: run the admin security SQL in Supabase, optionally polish gallery batch ordering, add preview/draft messaging, and review production auth settings.
- After adding site settings, run `docs/supabase-site-settings.sql` in Supabase SQL Editor after the admin security SQL so public reads and admin-only writes work.
- `Destinations` should stay minimal and ocean/editorial in feel, using a world map with recognizable continent shapes
- `Gallery` should be image-led, simple, and filterable by continent; the long-term source should be Katie-owned uploads, with Pinterest used primarily to drive traffic back to the site
- Admin gallery ordering uses drag/drop in `/admin/gallery`. Dropping one photo card over another rewrites all visible admin list positions to normalized `sort_order` values of 10, 20, 30, and so on, then saves them to Supabase.
- Global page UX should include a floating bottom-right back-to-top button on long pages.
- Mobile navigation uses a dark fullscreen overlay, so menu text and branding should remain white/light for legibility.
- while this phase is active, the best support is small, precise changes that help close the page cleanly

## 6. Site Structure

Current or planned sections:

- `Home`
  A strong editorial landing page that introduces Katie, highlights recent content, and sets the visual tone of the brand.

- `About`
  Katie's story, background, and voice. This should feel intimate, visual, and editorial rather than corporate.

- `Blog`
  A full archive of blog posts with filtering and search. This needs to support different kinds of content such as locations, dive sites, wildlife, gear, and experiences.

- `Destinations`
  A browsing entry point based on places and travel/dive locations. This may overlap with blog categories but should likely use a different browsing logic and presentation.

- `Gallery`
  A space for photos, visual storytelling, selected products, or future creative work.

- `Admin`
  A private workflow for Katie to log in and create, edit, delete, draft, and publish content. It also includes first-pass gallery and site settings management. Supabase is the chosen backend direction for authentication, database storage, and media storage unless a later requirement proves Express/custom API logic is necessary.

Future sections may emerge as the editorial structure becomes clearer.

## 7. Current Priorities

Right now the focus is on:

- Real text
- Real images
- Real videos
- Replacing placeholders
- Strengthening the editorial identity of the site

Not the priority yet:

- Selling Katie's art/design work
- Full e-commerce
- Advanced monetization implementation

## 8. Roadmap

### Stage 1: Build the Core Blog Experience

- Define the structure of the blog
- Improve the content quality across current pages
- Replace placeholder text and placeholder media
- Make the site feel coherent and polished
- Finish the static site so Katie can review copy, images, layout, and editorial flow

### Stage 2: Category Logic and Dynamic Blog Templates

- Define categories and taxonomy
- Create reusable blog post templates
- Create dynamic blog post pages
- Build filtered archive pages
- Keep the static post model aligned with the future admin/database model

### Stage 3: Move From Static Content to Admin-Managed Content

- Introduce an admin panel or CMS
- Allow Katie to create, edit, and delete posts
- Support category assignment and structured metadata
- Enable search and filtering for users
- Begin the transition from site to app
- Build a guided post editor where Katie creates content through structured blocks
- Give Katie limited design choices so she has creative control without breaking the visual system

### Stage 4: Professionalization

- Improve SEO foundations
- Review performance and security
- Improve accessibility and site robustness
- Prepare the site for production-quality publishing

### Stage 5: Monetization

- Ads
- Affiliate integrations such as travel platforms
- Partnerships and sponsored opportunities
- Potential future product/design sales

## 9. UX and Design Guidelines

The site should not feel generic or template-driven. It should feel intentional and calm.

Design guidance:

- Editorial rather than corporate
- Minimal but not empty
- Visual storytelling is central
- Large, confident imagery
- Image cards should avoid permanent text beneath the image when the image is the main object; reveal title/location metadata on hover/focus with a dark ocean-toned overlay and light blue accent text
- Clean typography
- Strong spacing and rhythm
- Real content should lead the design

The interface should help users:

- Discover stories easily
- Filter by interest
- Browse by place or topic
- Move naturally between posts, destinations, and media

## 10. Technical Direction

Current technical state:

- Frontend built with React, TypeScript, Vite, and Tailwind CSS
- Static content currently stored in code
- Basic routing already exists
- Placeholder pages and content still exist

Planned technical evolution:

- Move blog content into dynamic templates
- Introduce structured content management
- Add search/filter logic
- Add SEO metadata strategy
- Harden the site for production
- Add authentication for Katie
- Add database-backed content management
- Add media/storage workflows
- Keep room for future e-commerce

Likely backend/app direction:

- A future version of this project should be treated as an app, not only a static site
- Katie should eventually have a login and a private area to manage content
- Posts, categories, destinations, gallery items, and media references should eventually live in a database
- Supabase is a strong candidate because it can support auth, database, storage, and app workflows with relatively low overhead

Implementation mindset for current work:

- Build presentational code in a way that can later consume real records from a backend
- Prefer reusable schemas and clear content shapes over deeply hardcoded page logic
- Keep slugs, categories, metadata, and media relationships easy to map to future tables
- Avoid choices that make the future app migration unnecessarily painful
- Use the post model documented in `docs/post-model-guide.md` as the source of truth for current static post examples and future app migration
- Treat documentation as project memory: when a meaningful decision is made, update the relevant docs in the same work session

Asset organization rule:

- Store images by page or shared function inside `public/images`
- Avoid leaving page-specific images loose at the top level
- Use descriptive lowercase hyphenated filenames
- Keep filenames readable enough that a person can guess where they belong without opening the file

## 11. Working Rules for Codex

When making product or design decisions, prefer:

- Real content over placeholder structure
- Editorial clarity over flashy UI
- Simple scalable architecture over premature complexity
- Reusable content models when they help future CMS migration
- Searchability and categorization as first-class concerns for the blog
- Decisions that keep the future Supabase/app migration straightforward
- Updating context docs whenever scope, taxonomy, architecture, workflow, or product decisions change

When context is ambiguous, optimize for:

- Katie's voice
- Ocean/travel/nature identity
- A modern, subtle, polished experience
- A future-ready content architecture

## 12. Open Questions to Resolve Over Time

- Final category taxonomy for blog posts
- Relationship between `Blog` and `Destinations`
- How `Gallery` should behave in phase 1 vs later phases
- Which CMS or admin approach best fits Katie's workflow
- Exact block types and design controls Katie should have in the future post editor
- Monetization placements that fit the brand without hurting the reading experience
