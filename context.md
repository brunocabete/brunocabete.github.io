# Context — Cleaning the AstroPaper template into a simple blog

> **Status: DRAFT — awaiting validation.** This file records the goal, the theme
> feature inventory, and the removal plan for stripping the AstroPaper theme down
> to a simple blog. Check the boxes below as features are removed.

## Goal

This project is based on the **AstroPaper** theme (satnaing/astro-paper). The goal
is to turn it into a **very simple blog platform**:

- Remove the features we don't need (i18n, RSS, search, archives, tags, complex
  dynamic page generation, etc.).
- **Keep the styling mostly the same** (Tailwind setup, layout, global/theme/typography
  CSS, light/dark mode, fonts).
- Keep it a basic blog: home page with recent posts, individual post pages, an
  about page, a 404 page.

Basic Astro features that **stay** as the foundation:

- Static site generation and Markdown/MDX content.
- Content collections for `posts` and `pages`.
- The base `Layout`, `Header`, `Footer`, `Card`, `Datetime` components.
- `astro check`, `astro build`, dev server.

## Theme features inventory (added by AstroPaper, not core Astro)

| # | Feature | Area | Verdict |
|---|---------|------|---------|
| 1 | i18n / multi-language (pt-BR + en, locale switcher, `astro:i18n`, `src/i18n/`) | Routing, header | **REMOVE** |
| 2 | RSS feed (`@astrojs/rss`, `src/pages/rss.xml.ts`, feed link in hero/layout) | Pages | **REMOVE** |
| 3 | Search (Pagefind — `src/pages/search.astro`, build step, `public/pagefind/`) | Pages, build | **REMOVE** |
| 4 | Archives page (`src/pages/archives/`, grouped by year/month) | Pages | **REMOVE** |
| 5 | Tags system (tag index + per-tag paginated pages, `Tag` component) | Pages | **REMOVE** |
| 6 | Pagination (`posts/[...page].astro`, `Pagination` component) | Pages | **REMOVE** (single-page list) |
| 7 | Sitemap + `robots.txt` (`@astrojs/sitemap`, `src/pages/robots.txt.ts`) | Pages, config | **REMOVE** |
| 8 | Dynamic OG images (`og.png.ts`, `posts/[...slug]/index.png.ts`, satori, sharp) | Pages, deps | **REMOVE** |
| 9 | Google site verification env schema (`astro:env`) | Config | **REMOVE** |
| 10 | Edit-post (GitHub) link (`EditPost.astro`, `editPost` config) | Post page | **REMOVE** |
| 11 | Share links (`ShareLinks.astro`, social share icons) | Post page | **REMOVE** |
| 12 | Adjacent post nav (prev/next, `AdjacentPostNav.astro`) | Post page | **REMOVE** |
| 13 | Back button (`BackButton.astro`, `showBackButton` config) | Post page | **REMOVE** |
| 14 | Back-to-top button (`BackToTopButton.astro`) | Post page | **REMOVE** |
| 15 | Reading progress bar (inline script on post page) | Post page | **REMOVE** |
| 16 | Image lightbox / zoom (inline script on post page) | Post page | **REMOVE** |
| 17 | Copy-code buttons (inline script on post page) | Post page | **REMOVE** |
| 18 | Heading anchor links (inline script on post page) | Post page | **REMOVE** |
| 19 | Featured posts (`featured` frontmatter, hero section on home) | Home | **REMOVE** |
| 20 | Scheduled posts (`scheduledPostMargin` config) | Config | **REMOVE** |
| 21 | Breadcrumbs (`Breadcrumb.astro`) | Pages | **REMOVE** |
| 22 | Markdown TOC/callouts (`remark-toc`, `remark-collapse`, `rehype-callouts`) | Markdown | **REMOVE** |
| 23 | View Transitions (`ClientRouter`, `toTransitionName`) | Layout | **KEEP** (subtle, no content) |
| 24 | Light/dark mode toggle (`scripts/theme.ts`, FOUC script) | Styling | **KEEP** |
| 25 | Custom font (Atkinson Hyperlegible, `astro:assets` `fonts`) | Styling | **KEEP** |
| 26 | Tailwind CSS + typography setup | Styling | **KEEP** |
| 27 | MDX integration (`@astrojs/mdx`) | Content | **KEEP** |
| 28 | Code highlighting (shiki themes, notation diff/highlight/word, file-name transformer) | Styling | **KEEP** |
| 29 | Social links (`Socials.astro`, github/linkedin icons) | Header/footer | **KEEP** |
| 30 | A11y extras (skip-to-content, focus states) | Layout | **KEEP** |
| 31 | Custom 404 page (`src/pages/404.astro`) | Pages | **KEEP** |
| 32 | About page (content collection `pages`) | Pages | **KEEP** |

## Removal plan (one by one)

Ordered so the site stays buildable after each step.

- [x] 1. Remove i18n (single locale pt-BR): delete `src/i18n/`, drop `i18n` config, inline UI strings, remove `getRelativeLocaleUrl` usage.
- [ ] 2. Remove RSS feed: delete `src/pages/rss.xml.ts`, remove `@astrojs/rss`, remove feed links.
- [ ] 3. Remove Search: delete `src/pages/search.astro`, drop `pagefind` from build script + `public/pagefind/`, remove `@pagefind/default-ui`, `pagefind` deps.
- [ ] 4. Remove Tags: delete `src/pages/tags/`, `Tag.astro`, `getUniqueTags`, `slugify` utils, tags in posts.
- [ ] 5. Remove Archives: delete `src/pages/archives/`, `IconArchive`, archives nav item.
- [ ] 6. Remove Pagination: collapse `posts/[...page].astro` into a single `/posts` listing, delete `Pagination.astro`, `posts.perPage` config.
- [ ] 7. Remove sitemap + robots.txt: drop `@astrojs/sitemap`, delete `src/pages/robots.txt.ts`, sitemap link in layout.
- [ ] 8. Remove dynamic OG images: delete `og.png.ts` + `index.png.ts`, drop `satori`, `sharp`, `getFontPathByWeight`, `dynamicOgImage` config.
- [ ] 9. Remove Google site verification env schema + `googleVerification` config.
- [ ] 10. Remove edit-post link (`EditPost.astro`, `editPost` config, `hideEditPost` frontmatter).
- [ ] 11. Remove share links (`ShareLinks.astro`, `shareLinks` config, share icons).
- [ ] 12. Remove adjacent post nav (`AdjacentPostNav.astro`).
- [ ] 13. Remove back button (`BackButton.astro`, `showBackButton` config).
- [ ] 14. Remove back-to-top button (`BackToTopButton.astro`).
- [ ] 15. Remove post-page inline scripts: progress bar, lightbox, copy-code, heading anchors (keep clean `<Content />`).
- [ ] 16. Remove featured posts: drop `featured` frontmatter, `featuredPosts` hero section on home.
- [ ] 17. Remove scheduled-post config (`scheduledPostMargin`, `postsConfig`).
- [ ] 18. Remove breadcrumbs (`Breadcrumb.astro`).
- [ ] 19. Remove markdown TOC/callouts/collapse (`remark-toc`, `remark-collapse`, `rehype-callouts` + deps).
- [ ] 20. Prune unused assets/deps: leftover SVG icons, `dayjs`/`lodash.kebabcase` if unused, `@types/*`, etc.
- [ ] 21. Final cleanup: simplify `astro-paper.config.ts`, `src/config.ts`, `src/types/config.ts`, `astro.config.ts` to only what the simple blog needs.
- [ ] 22. Re-validate: run `npm run build`, `npm run lint`, `npm run format:check`; confirm styling is unchanged.

## Dependencies to prune (from `package.json`)

`@astrojs/rss`, `@astrojs/sitemap`, `@pagefind/default-ui`, `pagefind`, `satori`,
`sharp`, `remark-toc`, `remark-collapse`, `rehype-callouts`, and any now-unused
`@types/*` packages.

## Validation

- [ ] User reviewed this document and the removal plan.
