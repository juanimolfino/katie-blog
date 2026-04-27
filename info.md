Using Node.js 20, Tailwind CSS v3.4.19, and Vite v7.2.4

Tailwind CSS has been set up with the shadcn theme

Setup complete: /mnt/okcomputer/output/app

Project memory rule:
  Whenever product direction, architecture, taxonomy, workflow, post metadata, or admin/editor behavior is defined, update the relevant context files before closing the task. Use README.md for repo/current-state orientation, docs/project-brief.md for product and roadmap decisions, docs/post-model-guide.md for post metadata and editor structure, and info.md for short operational reminders.

Current product phase:
  The static site is being completed first. Blog, reusable static post pages, and Destinations are already in place. After Katie reviews and approves static copy, images, and layout, the project should move toward app/admin mode with login, create/edit/delete posts, and a guided block-based post editor with limited design controls.

Destinations taxonomy:
  Use English continent groups: Asia, Europe, Oceania, North America, Central America, South America, and Africa.

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
