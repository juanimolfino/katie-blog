# Post Model Guide

This document explains what information each blog post should have, why it matters, and how it will be used in the site.

For now, posts can be created manually in static data. Later, this same structure should become the basis for Katie's dashboard and database-backed workflow.

## Purpose

Each post needs two kinds of information:

- Editorial content
  The story, guide, reflections, images, and videos that the reader sees.

- Structured metadata
  The organized information that helps the website sort, filter, search, recommend, and display posts correctly.

This structure should help with:

- Blog category browsing
- Geographic browsing in `Destinations`
- Search by keyword
- SEO
- Related posts
- Future admin workflows

## Core Idea

A post should be flexible in content but consistent in structure.

That means:

- Katie should be free to write different kinds of stories and guides
- The website should still receive the same key fields every time

## Recommended Post Fields

### 1. `title`

What it is:
The main title of the post.

Why it matters:

- Used on the blog page
- Used on the post page
- Used for SEO and sharing

Example:

`Swimming with Hammerheads in the Galapagos`

### 2. `slug`

What it is:
A URL-friendly version of the title.

Why it matters:

- Used in the page URL
- Should be unique per post

Example:

`swimming-with-hammerheads-in-the-galapagos`

### 3. `excerpt`

What it is:
A short summary of the post.

Why it matters:

- Used on cards and listings
- Helps readers understand the post quickly

Example:

`A personal account of diving in the Galapagos, strong currents, and unforgettable hammerhead encounters.`

### 4. `coverImage`

What it is:
The main image shown for the post card and hero area.

Why it matters:

- Strong visual identity
- Important for blog cards and social sharing

Example:

`/images/blog/blog-galapagos-hammerheads-cover.jpg`

### 5. `publishedAt`

What it is:
The publication date.

Why it matters:

- Used for `Recent Posts`
- Useful for sorting

Example:

`2026-04-26`

### 6. `status`

What it is:
Whether the post is published or still a draft.

Why it matters:

- Important when the project becomes an app
- Prevents unfinished content from appearing live

Suggested values:

- `draft`
- `published`

### 7. `categories`

What it is:
The main editorial categories of the post.

Why it matters:

- Used in the main category filter at the top of the blog page
- A post should be allowed to have more than one category

Official categories for now:

- `travel`
- `diving`
- `encounters`
- `guides`
- `dive-instructor-life`

Example:

- `["travel", "diving", "encounters"]`

Guideline:

- Categories should stay relatively stable
- They describe the big editorial bucket of the post

### 8. `tags`

What it is:
Flexible keywords that describe the post in more detail.

Why it matters:

- Used for search
- Used for related content
- Helps readers find specific topics

Examples:

- `["galapagos", "hammerheads", "sharks", "drift-diving"]`
- `["budget", "hotels", "solo-travel"]`
- `["gear", "mask", "underwater-camera"]`

Guideline:

- Tags are more specific and flexible than categories
- Katie should be able to add as many as needed

### 9. `destination`

What it is:
The main place associated with the post.

Why it matters:

- Used in geographic filtering
- Helps power the future `Destinations` section

Examples:

- `Galapagos`
- `Raja Ampat`
- `Tenerife`

### 10. `country`

What it is:
The country connected to the post.

Why it matters:

- Supports search and filtering
- Useful for future destination pages

Examples:

- `Ecuador`
- `Indonesia`
- `Spain`

### 11. `continent`

What it is:
The continent linked to the post.

Why it matters:

- Useful for `Destinations`
- Allows higher-level geographic browsing

Suggested values:

- `asia`
- `europe`
- `oceania`
- `north-america`
- `central-america`
- `south-america`
- `africa`

### 12. `contentType`

What it is:
The type of editorial piece.

Why it matters:

- Helps distinguish stories from guides or informational posts
- Can help with filtering later

Suggested values:

- `story`
- `guide`
- `encounter`
- `journal`
- `tips`
- `review`

Example:

`story`

### 13. `featured`

What it is:
Whether the post should be highlighted somewhere special.

Why it matters:

- Useful for featured rails
- Useful for homepage and category highlights

Suggested values:

- `true`
- `false`

### 14. `readTime`

What it is:
Estimated reading time in minutes.

Why it matters:

- Good UX on cards and post pages

Example:

`8`

### 15. `seoTitle`

What it is:
The search-optimized title for Google and social previews.

Why it matters:

- Better SEO control

Example:

`Swimming with Hammerheads in the Galapagos | What Katie Seas`

### 16. `seoDescription`

What it is:
The meta description for search engines.

Why it matters:

- Helps with click-through from search results

Example:

`Katie shares her Galapagos diving experience, hammerhead shark encounters, and what made the trip unforgettable.`

## Helpful Optional Fields

These are not required for the first static version, but they are smart to keep in mind.

### `animals`

Examples:

- `["hammerheads", "sharks", "manta-rays"]`

Useful for:

- Search
- Encounters filtering
- Future animal-related landing pages

### `diveType`

Examples:

- `["drift", "liveaboard", "reef"]`

Useful for:

- Specialized diving filters

### `travelStyle`

Examples:

- `["solo-travel", "budget", "island-life"]`

Useful for:

- Travel discovery and recommendations

### `gear`

Examples:

- `["mask", "fins", "camera", "wetsuit"]`

Useful for:

- Guides
- Packing posts
- Future affiliate or e-commerce opportunities

### `relatedPostSlugs`

Examples:

- `["galapagos-dive-guide", "best-time-to-dive-galapagos"]`

Useful for:

- Internal linking
- Keeping people exploring the site

## Categories vs Tags

This is the most important distinction.

### Categories

- Few
- Stable
- Editorial
- Broad

Examples:

- `travel`
- `diving`
- `encounters`

### Tags

- Many
- Flexible
- Detailed
- Search-oriented

Examples:

- `hammerheads`
- `sharks`
- `gear`
- `galapagos`
- `hotels`

## How Blog and Destinations Relate

The same post should be visible through two different browsing systems.

### Blog

Used to explore content by:

- category
- keyword
- recency
- tags

### Destinations

Used to explore content by:

- continent
- country
- destination

This means `Destinations` is not separate content. It is another way of navigating the same posts.

## Example Post

```json
{
  "title": "Swimming with Hammerheads in the Galapagos",
  "slug": "swimming-with-hammerheads-in-the-galapagos",
  "excerpt": "A personal account of diving in the Galapagos, strong currents, and unforgettable hammerhead encounters.",
  "coverImage": "/images/blog/blog-galapagos-hammerheads-cover.jpg",
  "publishedAt": "2026-04-26",
  "status": "published",
  "categories": ["travel", "diving", "encounters"],
  "tags": ["galapagos", "hammerheads", "sharks", "drift-diving"],
  "destination": "Galapagos",
  "country": "Ecuador",
  "continent": "south-america",
  "contentType": "story",
  "featured": true,
  "readTime": 8,
  "seoTitle": "Swimming with Hammerheads in the Galapagos | What Katie Seas",
  "seoDescription": "Katie shares her Galapagos diving experience, hammerhead shark encounters, and what made the trip unforgettable.",
  "animals": ["hammerheads", "sharks"],
  "diveType": ["drift", "liveaboard"],
  "travelStyle": ["adventure-travel"],
  "gear": ["wetsuit", "camera"],
  "relatedPostSlugs": ["galapagos-dive-guide"]
}
```

## What Katie Needs to Fill In

When Katie creates a post in the future, the minimum she should be ready to define is:

- Title
- Slug
- Excerpt
- Cover image
- Publish date
- Categories
- Tags
- Destination
- Country
- Continent

Good optional additions:

- Animals
- Dive type
- Travel style
- Gear
- SEO title
- SEO description

## Future Dashboard Note

In the future app version, Katie should not have to think in raw JSON.

The dashboard should present friendly fields like:

- Title
- Slug
- Excerpt
- Categories
- Tags
- Destination
- Country
- Continent
- Images
- Videos

Later, the post body itself can evolve into a flexible block-based editor. That block system is a later phase. For now, the most important thing is to define the metadata structure correctly.

## Future Block Editor Direction

The app/admin phase should let Katie create posts through guided content blocks rather than raw code or JSON.

Likely block types:

- Text section
- Image
- Image gallery
- Quote
- Video
- Practical info
- Location/destination note
- Related posts

Katie should have some design choice inside approved limits. For example, she may choose image layout, section order, quote emphasis, or gallery style, but the system should keep typography, spacing, colors, and responsive behavior consistent with the brand.

## Documentation Memory Rule

When the project defines or changes post metadata, taxonomy, admin workflow, block behavior, design constraints, or app architecture, update this guide and the other context docs in the same session. The docs are the durable memory for future Codex chats.
