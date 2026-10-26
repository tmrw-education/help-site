# src/ — Site Theme & Custom Pages

Parent: `../AGENTS.md`. Read it first for stack, content map, and brand source of truth.

## Purpose

All site-chrome code: the homepage, global brand CSS, and any custom React pages/components. This is where the visual redesign lives. Article content stays in the content dirs (`sxp/`, `hr/`, etc.), not here.

## Ownership

- `src/data/redirects.json` — old page address → new one (see parent AGENTS.md, Content Map notes).
- `src/data/products.tsx` — **single source of truth** for the seven live products (id, name, route, group, Carbon icon or official D365 icon) + `ProductMark`, `productFromPath`. Everything product-aware reads from here.
- `src/pages/index.tsx` + `index.module.css` — homepage (concept C): serif hero + search, two audience sections (staff / parents; Students returns with LearnerXP) with hand-picked task links (staff includes one GrowthXP link and ends with one "All guides: StaffXP · EmployeeXP · GrowthXP" row, since a single "all" link can't serve three products), Dynamics 365 band → `/admin`.
- `src/pages/admin.tsx` + `admin.module.css` — Dynamics 365 admin guides landing (F&O, HR, SCM).
- `src/components/LiveSearch/` — live search dropdown (see Local Contracts).
- `src/components/ProductSwitcher/` — navbar item `type: 'custom-productSwitcher'` (registered in `src/theme/NavbarItem/ComponentTypes.tsx`): grouped dropdown on desktop, grouped list in the mobile drawer. Replaces the old seven navbar links.
- `src/components/QuickAnswer/` — renders a doc's `summary:` front matter under its H1 (wired via the `h1` override in `src/theme/MDXComponents.tsx`). Skipped for any doc whose URL contains `/Troubleshooting/` (one-problem pages are only Cause and Fix, so the box would repeat them); their summary is still written, for Felix.
- `src/components/ZoomImage/` — click-to-zoom screenshots on the per-app gradient mat (one class per product, chosen by route in `appFromPath`; unknown routes fall back to StaffXP's); shows a "Screenshot coming soon" placeholder when an image fails.
- `src/components/Steps/` — numbered step rail for articles.
- `src/theme/` swizzles: `DocBreadcrumbs/Items/Home` (first crumb = product), `DocSidebar/Desktop/Content` (product header + article count), `NotFound/Content` (404 with search, popular tasks, products), `SearchBar` (navbar → LiveSearch), `Root.tsx` (hides non-zoom broken images), `Icon/*` (colour-mode icons).
- No footer (removed 2026-10-25): a footer holding only the tmrw logo repeated the navbar's brand. Open follow-up: the site runs Microsoft Clarity, so when a public privacy policy URL exists, bring back a one-link footer ("Privacy") in `docusaurus.config.ts` `themeConfig.footer`.
- `src/css/custom.css` — global theme: Infima overrides, brand + type-scale tokens (`--tmrw-serif`, `--tmrw-h1/h3/h4/h6`, `--tmrw-surface`), navbar, sidebar, search-page restyle (incl. product label per result via `a[href^=…]::before`), 404.

## Local Contracts

- Override brand through Infima CSS custom properties (`--ifm-color-primary`, etc.) and brand tokens in `custom.css`. Avoid swizzling theme components unless an override genuinely can't reach it.
- Product list/routes live only in `src/data/products.tsx`; keep it in sync with the parent Content Map. Homepage/404 task links are hand-picked real routes — re-check them when content is renamed.
- Headings: Plex Serif Light 300 for hero (`--tmrw-h1`, homepage only), page titles (`--tmrw-h3`) and section headings (`--tmrw-h4`, weight `--tmrw-section-weight`: Regular 400 in light mode, Light 300 in dark, per the designguide's slide rule); below ~24px use Plex Sans 600 (`--tmrw-h6`). Never above weight 600. Nothing below 12.8px.
- Product marks: XP products = monochrome Carbon icons (no gradient tiles, no colour dots). D365 apps = official Microsoft icons, unmodified, **only in admin contexts** (switcher D365 group, drawer, admin band/page, admin-guide breadcrumb/sidebar); shared contexts (search results, 404 list) show D365 products as text only.
- Search UI = `src/components/LiveSearch/` (variants `hero` for homepage + 404, `navbar` via the `src/theme/SearchBar` swizzle). It uses the search plugin's index/worker (`searchByWorker`, `highlight*` from `@easyops-cn/docusaurus-search-local/dist/client/...`, typed in `src/types/search-local.d.ts`) and renders its own dropdown: one row per article (title, snippet, product label; D365 as text only). Deep imports into plugin internals → re-test search after any plugin upgrade. Works in production builds only (`npm run build && npm run serve`); `npm start` returns no results by plugin design.
- Homepage composition (impeccable critique, 2026-10-25): the Popular chips are a `<nav aria-label="Popular tasks">` with no visible label, held to the search field's 640px so they centre on its axis at every width; each chip links straight to its article, never to a search (searches for "Reset password" and "View payslip" found nothing). Keep chip labels short enough for one row at 640px. The audience grid and Dynamics band share an 880px frame; with two audiences the columns are equal halves (`repeat(2, 1fr)`); spread edge to edge, two `max-content` columns left a hole in the middle. With three again, go back to `repeat(3, max-content)` + `space-between`, so the first column's text starts on the frame's left edge and the last one's ends on its right. Do not centre-align the lists. `html { overflow-x: clip }` guards the centred column against anything widening the page. No "coming soon" filler: a product with no real articles gets no column (LearnerXP is unwired until it has some).
- The homepage hero owns search: `html.page-home` (set via `<Head>`) hides the navbar LiveSearch there, and ⌘K targets the hero. On phones the navbar search is an icon link to the live `/search` page.
- `/search` page is still the plugin's `SearchPage`, restyled in `custom.css` (product label per result via `a[href^=…]::before`).
- Fonts via Google Fonts CDN for now; self-host via `static/` + `@font-face` is still owed.
- Map brand tokens to both `:root` (light) and `[data-theme='dark']` — never mix light/dark tokens in one block.
- Colour (decided in a live lab, 2026-10-25): light page `#FDFEFF` (the ramp's raised step, for reading) with sidebar, panels and code on the card `#F5F8FD`; dark page `#0E1013`, card `#181A1D`. Text and links per `color.md` §2: light links `#095EFA`; dark text `#FFFFFF` / `#B1B3B8`, links Blue 40 `#78A9FF`. Borders `#E1E3E8` / `#2B2D31`; `--tmrw-rule` (chips, placeholders) is the master's `--border-strong`. The header is always on the dark ramp.
- Note panels (Quick answer, blockquotes) share `--tmrw-note-*`: light is the brand panel, Blue 10 `#EDF5FF`, no border; dark is the raised step `#222427` with a `#2B2D31` hairline, because a dark panel shows by lift, and Blue 90 read as the heaviest block on the page. Blue appears only in the icon.
- The hero search field and the Popular chips use `--tmrw-field`, no borders: light `#EDF0F5` (the page step; the card at 1.05:1 disappeared, the well at 1.22 read too dark), dark `#222427`.
- Step rail = the border/rule token. The number rings still use Infima's `--ifm-color-emphasis-400` (left open).
- Screenshot mats (ZoomImage) keep their hand-picked per-product pastel gradients: a deliberate exception to the palette (user's call, 2026-10-25). Do not "fix" them to `color.md` values.

## Work Guidance

- Brand tokens come from the `tmrw-theme` skill and `~/Documents/GitHub/tmrw/designguide/`. Blue is a signal, not decoration — use sparingly.
- Per-product gradients belong only to screenshot mats (ZoomImage), not UI chrome.
- Design prototypes and decisions: `_internal/prototypes/2026-09-23-concept-c/` (gitignored).

## Verification

- `npm start` and eyeball homepage + a doc page in light and dark mode.
- `npm run build` must still pass.

## Child DOX Index

- None yet.
