# src/ — Site Theme & Custom Pages

Parent: `../AGENTS.md`. Read it first for stack, content map, and brand source of truth.

## Purpose

All site-chrome code: the homepage, global brand CSS, and any custom React pages/components. This is where the visual redesign lives. Article content stays in the content dirs (`sxp/`, `hr/`, etc.), not here.

## Ownership

- `src/data/products.tsx` — **single source of truth** for the seven products (id, name, route, group, Carbon icon or official D365 icon) + `ProductMark`, `productFromPath`. Everything product-aware reads from here.
- `src/pages/index.tsx` + `index.module.css` — homepage (concept C): serif hero + search, three audience sections (staff / parents / students) with hand-picked task links, Dynamics 365 band → `/admin`.
- `src/pages/admin.tsx` + `admin.module.css` — Dynamics 365 admin guides landing (F&O, HR, SCM).
- `src/components/LiveSearch/` — live search dropdown (see Local Contracts).
- `src/components/ProductSwitcher/` — navbar item `type: 'custom-productSwitcher'` (registered in `src/theme/NavbarItem/ComponentTypes.tsx`): grouped dropdown on desktop, grouped list in the mobile drawer. Replaces the old seven navbar links.
- `src/components/QuickAnswer/` — renders a doc's `summary:` front matter under its H1 (wired via the `h1` override in `src/theme/MDXComponents.tsx`).
- `src/components/ZoomImage/` — click-to-zoom screenshots on the per-app gradient mat; shows a "Screenshot coming soon" placeholder when an image fails.
- `src/components/Steps/` — numbered step rail for articles.
- `src/theme/` swizzles: `DocBreadcrumbs/Items/Home` (first crumb = product), `DocSidebar/Desktop/Content` (product header + article count), `NotFound/Content` (404 with search, popular tasks, products), `SearchBar` (navbar → LiveSearch), `Root.tsx` (hides non-zoom broken images), `Icon/*`.
- `src/css/custom.css` — global theme: Infima overrides, brand + type-scale tokens (`--tmrw-serif`, `--tmrw-h1/h3/h4/h6`, `--tmrw-surface`), navbar, sidebar, search-page restyle (incl. product label per result via `a[href^=…]::before`), footer, 404.

## Local Contracts

- Override brand through Infima CSS custom properties (`--ifm-color-primary`, etc.) and brand tokens in `custom.css`. Avoid swizzling theme components unless an override genuinely can't reach it.
- Product list/routes live only in `src/data/products.tsx`; keep it in sync with the parent Content Map. Homepage/404 task links are hand-picked real routes — re-check them when content is renamed.
- Headings: Plex Serif Light 300 for hero (`--tmrw-h1`, homepage only), page titles (`--tmrw-h3`) and section headings (`--tmrw-h4`, weight `--tmrw-section-weight`: Regular 400 in light mode, Light 300 in dark, per the designguide's slide rule); below ~24px use Plex Sans 600 (`--tmrw-h6`). Never above weight 600. Nothing below 12.8px.
- Product marks: XP products = monochrome Carbon icons (no gradient tiles, no colour dots). D365 apps = official Microsoft icons, unmodified, **only in admin contexts** (switcher D365 group, drawer, admin band/page, admin-guide breadcrumb/sidebar); shared contexts (search results, 404 list) show D365 products as text only.
- Search UI = `src/components/LiveSearch/` (variants `hero` for homepage + 404, `navbar` via the `src/theme/SearchBar` swizzle). It uses the search plugin's index/worker (`searchByWorker`, `highlight*` from `@easyops-cn/docusaurus-search-local/dist/client/...`, typed in `src/types/search-local.d.ts`) and renders its own dropdown: one row per article (title, snippet, product label; D365 as text only). Deep imports into plugin internals → re-test search after any plugin upgrade. Works in production builds only (`npm run build && npm run serve`); `npm start` returns no results by plugin design.
- The homepage hero owns search: `html.page-home` (set via `<Head>`) hides the navbar LiveSearch there, and ⌘K targets the hero. On phones the navbar search is an icon link to the live `/search` page.
- `/search` page is still the plugin's `SearchPage`, restyled in `custom.css` (product label per result via `a[href^=…]::before`).
- Fonts via Google Fonts CDN for now; self-host via `static/` + `@font-face` is still owed.
- Map brand tokens to both `:root` (light) and `[data-theme='dark']` — never mix light/dark tokens in one block.

## Work Guidance

- Brand tokens come from the `tmrw-theme` skill and `~/Documents/GitHub/tmrw/designguide/`. Blue is a signal, not decoration — use sparingly.
- Per-product gradients belong only to screenshot mats (ZoomImage), not UI chrome.
- Design prototypes and decisions: `_internal/prototypes/2026-09-23-concept-c/` (gitignored).

## Verification

- `npm start` and eyeball homepage + a doc page in light and dark mode.
- `npm run build` must still pass.

## Child DOX Index

- None yet.
