Using Node.js 20, Tailwind CSS v3.4.19, and Vite v7.2.4

Tailwind CSS has been set up with the shadcn theme

Setup complete: /mnt/okcomputer/output/app

Project memory rule:
  Whenever product direction, architecture, taxonomy, workflow, post metadata, or admin/editor behavior is defined, update the relevant context files before closing the task. Use README.md for repo/current-state orientation, docs/project-brief.md for product and roadmap decisions, docs/post-model-guide.md for post metadata and editor structure, and info.md for short operational reminders.

Current product phase:
  The static site is being completed first, and the app/admin transition has started. Supabase Auth protects /admin, and the first posts CRUD screens are in place at /admin/posts, /admin/posts/new, and /admin/posts/:id/edit. The edit form supports first-pass content blocks for heading, paragraph, image, quote, and link, plus Save all, preview, duplicate block, and block move/delete controls. /admin/gallery manages uploaded gallery photos. Public /blog, /destinations, Home recent posts, and Home destinations now show published Supabase posts, and public /gallery shows only visible Supabase gallery items. Public /blog/:slug loads a published Supabase post first, then falls back to static post data only for legacy/static slugs.

Supabase admin setup:
  The browser client lives in src/lib/supabase.ts and reads VITE_SUPABASE_URL plus VITE_SUPABASE_ANON_KEY. Keep service role keys and user passwords out of the frontend and out of committed example files. Local public project config belongs in .env.local, using .env.example as the template.
  The first posts schema is stored in docs/supabase-posts.sql and should be run in Supabase SQL Editor before testing post CRUD. Re-run it when post_blocks or public read policies change; it is written to be safe/idempotent for the current development phase. Public read policies allow anon users to read only published posts and blocks for published posts.
  Admin access uses frontend VITE_ADMIN_EMAILS plus database/storage RLS hardening in docs/supabase-admin-security.sql. Run that SQL after posts/gallery/storage SQL. The real protection is Supabase RLS; the frontend allowlist is only UX. docs/admin-security-guide.md explains how to add/remove admins and which Supabase signup setting to disable.
  Media uploads use a public Supabase Storage bucket named media. Run docs/supabase-storage.sql in SQL Editor before testing uploads. Authenticated users can upload/update/delete media; anyone can read media files. Run docs/supabase-gallery.sql to enable /admin/gallery and public /gallery database reads.
  Admin uploads automatically optimize JPG/PNG/WebP images in the browser before upload and now target web-size files rather than only fixed dimensions. Non-GIF uploads are always converted to a WebP derivative before being stored, so Lightroom/camera originals are not saved directly. Covers/gallery images start at max width 1600 / ~0.78 WebP quality and iterate down toward about 900 KB, with a 1200px width floor. Inline block images start at max width 1400 / ~0.76 quality and target about 800 KB, with a 1100px width floor. The optimizer may reduce quality further to about 0.58-0.60 if the file remains too heavy. GIFs are uploaded as-is if under 10 MB. HEIC/iPhone photos should be exported as JPG first because browsers usually cannot decode them.

Recommended next steps:
  1. Run docs/supabase-admin-security.sql in Supabase and disable public signups before production.
  2. Add gallery editor polish if Katie needs batch reordering or bulk visibility changes.
  3. Add clearer draft/preview messaging in the post editor if Katie finds preview confusing.
  4. Consider code-splitting admin routes later to reduce the production bundle warning.

Recent polish decisions:
  Dynamic Supabase blog posts should show related posts at the bottom, chosen from other published posts by shared categories, tags, and continent. Gallery hover should keep the image visually unchanged and reveal only title/location text over the photo. Home travel teaser copy uses "Up Next" as the main heading, without repeating it as an eyebrow. Admin list/edit surfaces should include clear back navigation to the dashboard or parent admin screen. Public contact details are whatkatieseas@gmail.com, Instagram https://www.instagram.com/whatkatie.seas, YouTube https://www.youtube.com/@whatkatieseas, and Pinterest https://www.pinterest.com/whatkatieseas.
  Home Destinations should use a simple even grid of up to 6 published destination posts, all with the same 4:3 card ratio, instead of a large featured-card layout. This keeps the section more forgiving for Katie's uploaded post covers and avoids requiring special vertical crops.

Destinations taxonomy:
  Use English continent groups: Asia, Europe, Oceania, North America, Central America, South America, and Africa.

Destinations map:
  The interactive world map uses d3-geo and topojson-client with https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json. Countries are mapped by numeric ISO IDs into the project's continent slugs. Avoid react-simple-maps because it introduced a React 19 peer conflict and vulnerable d3-zoom chain.

Gallery:
  The static Gallery page uses a slim hero, continent filters, a masonry-style image grid, and a click-to-open lightbox carousel. Placeholder images can use local assets, but the long-term plan is Katie-owned uploaded photos. Pinterest should be treated as a traffic/distribution channel rather than the source of images embedded on the site.

Image card style:
  For image-led cards, avoid always-visible title/location text below the image. Reveal metadata on hover/focus with a dark ocean overlay and light blue accent text, so the photo stays visually clean by default.

About image captions:
  About page photos support per-image hover captions in src/pages/About.tsx. Use these for personal context such as age, place, memory, or a short story from Katie, without adding permanent text below the image.
  In the "What You'll Find Here" block, the horizontal image should use the full available content width, and the list should feel more editorial than plain line-separated bullets.

Global navigation helpers:
  All pages include a floating bottom-right back-to-top button via src/components/ScrollToTopButton.tsx. The mobile fullscreen menu uses a black overlay, so its logo and navigation labels must stay white/light for contrast.

Home hero video:
  The homepage hero uses Katie's selected YouTube background videos: desktop c9dRw1KIfDk and mobile y-B9ReggOfM. It keeps /images/home/hero-bg.jpg underneath as a visual fallback while the embed loads or if the embed cannot render.

Components (40+):
  accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb,
  button-group, button, calendar, card, carousel, chart, checkbox, collapsible,
  command, context-menu, dialog, drawer, dropdown-menu, empty, field, form,
  hover-card, input-group, input-otp, input, item, kbd, label, menubar,
  navigation-menu, pagination, popover, progress, radio-group, resizable,
  scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner,
  spinner, switch, table, tabs, textarea, toggle-group, toggle, tooltip

Usage:
  import { Button } from '@/components/ui/button'
  import { Card, CardHeader, CardTitle } from '@/components/ui/card'

Structure:
  src/sections/        Page sections
  src/hooks/           Custom hooks
  src/types/           Type definitions
  src/App.css          Styles specific to the Webapp
  src/App.tsx          Root React component
  src/index.css        Global styles
  src/main.tsx         Entry point for rendering the Webapp
  index.html           Entry point for the Webapp
  tailwind.config.js   Configures Tailwind's theme, plugins, etc.
  vite.config.ts       Main build and dev server settings for Vite
  postcss.config.js    Config file for CSS post-processing tools
