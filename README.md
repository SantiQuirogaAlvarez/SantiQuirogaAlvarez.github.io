## SantiQuirogaAlvarez.github.io

Personal site built with Astro and Tailwind CSS. It uses Astro Content Collections for blog posts and notes, supports GitHub‑Flavored Markdown, and renders LaTeX math via KaTeX.

### Tech

- Astro 5
- Tailwind CSS 4 via `@tailwindcss/vite`
- Content Collections (`blog`, `notes`) with Zod schemas
- `remark-gfm`, `remark-math`, `rehype-katex`

## Getting Started

1) Install dependencies

```
npm install
```

2) Start dev server

```
npm run dev
```

3) Build for production

```
npm run build
```

4) Preview the build

```
npm run preview
```

## Content Structure

```
src/
  content/
    blog/           # Markdown posts
    notes/          # Markdown notes
  pages/
    blog/           # Blog list + dynamic post page
    notes/          # Notes list + dynamic note page
  layouts/          # Base + content wrappers
  components/       # UI components
  styles/           # Tailwind + theme variables
```

### Blog Frontmatter

```
---
title: "Post Title"
description: "Short summary"
date: "2025-09-13"    # ISO8601 string
tags: ["WebDev", "Notes"]
layout: BlogNoteLayoutAlt   # optional, defaults to BlogNoteLayout
---
```

### Notes Frontmatter

```
---
title: "Note Title"
subject: "Course or Topic"
date: "2025-09-13"
---
```

### Math and GFM

- Inline math: `$a^2 + b^2 = c^2$`
- Block math:

```
$$
\int_a^b f(x)\,dx
$$
```

## Routing

- Blog posts are available at `/blog/<file-name>`
- Notes are available at `/notes/<file-name>`

The `<file-name>` is the Markdown filename without extension inside its collection.

## Deployment (GitHub Pages)

- This repo name suggests a user site (`<username>.github.io`). For user sites, keep `base: '/'` in `astro.config.mjs` (already set).
- If you ever use a project site (repo ≠ `<username>.github.io`), set `base: '/<repo>/'`.
- Deploy with GitHub Pages using a GitHub Action that builds to `dist` and publishes to `gh-pages`.

## Editing Tips

- Duplicate any Markdown in `src/content/blog` or `src/content/notes` to add new entries.
- Use ISO date (`YYYY-MM-DD`) for consistent sorting.
- Tags are optional; add a few relevant ones to help future filtering.

## Developer Experience

- Type-checking: `astro check` requires `@astrojs/check` and `typescript`. Install:

```
npm i -D @astrojs/check typescript
```

Then run:

```
npm run astro check
```

---

## Further Improvements (Suggestions)

- Content slugs: Add a `slug` field in schemas to avoid relying on filenames and enable URL changes without renaming files.
- Dates as real dates: Change `date` to `z.string().datetime()` or `z.date()` with a transform for safer typing and formatting.
- Centralized metadata: Create `src/lib/site.ts` for site title, description, and socials; import in layouts and pages.
- SEO & feeds: Add sitemap, RSS for blog, and Open Graph tags. Astro integrations make this easy.
- Shared Post layout: Unify blog and notes rendering through one `<PostLayout>` to reduce duplication.
- Tag pages: Generate `/tags/<tag>` listing pages and link tags there.
- Prettier & ESLint: Add a minimal Prettier config and an Astro‑aware ESLint setup to standardize formatting.
- Remove console logs: Clean up `console.log` in `src/pages/blog/[id].astro` once debugging is done.
- Drafts: Support `draft: true` in schemas and filter them out of lists and builds.
- Images: Support an `image` field in blog posts and use Astro’s `<Image />` for optimization.

---

Happy hacking!
