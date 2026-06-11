# tmrw Help — Restyle Decision Record

Running log of design decisions for the Docusaurus → tmrw brand restyle.
Append-only: newest entries at the bottom of each section. Never rewrite history — supersede with a new dated entry.

**Brand source:** `tmrw-theme` skill (Carbon foundation — IBM Plex Sans/Mono, Mona Sans display, blue `#0f62fe`, 8pt grid).
**Method:** `design-lab` — build real variants in a sandbox, judge live across light+dark, lock one winner per layer.
**Sandbox:** `_internal/design-lab/sandbox/` — throwaway, internal-only, never part of the site build.

---

## Framing decisions (2026-06-09)

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| F1 | Scope | Start small, work up | Visual/theme layer first; expand to nav/IA/content later only if wanted. Lowest risk. |
| F2 | Workflow | design-lab sandbox | Explore 2-4 variants per layer live before committing, vs propose-and-react. |
| F3 | tmrw-theme skill stale logo paths | Fixed first | Both light+dark logo paths corrected to `~/Documents/GitHub/tmrw/slide-examples/` before using skill as brand source. |
| F4 | Sandbox + decisions location | `_internal/design-lab/` | Internal-only. `_internal/` is tracked but NOT a Docusaurus build source (no plugin/page refs), so sandbox can't leak into the shipped site. |

## Layer stack (outside-in)

Each layer sits on the one before; later layers judged inside the settled earlier ones.

1. **Foundations** — color tokens (blue `#0f62fe`, Carbon neutrals) + fonts (Mona Sans / IBM Plex Sans / Mono), light+dark.
2. **Shell** — navbar (logo swap dino→tmrw, nav treatment) + footer.
3. **Homepage hero** — "How can we help?" headline + intro.
4. **App card grid** — 5 product cards; hover/focus states live here.

---

## Locked decisions

### L1 — Foundations (2026-06-09)

**Chosen: "A + C graft" — Signal Blue base with Editorial reading comfort.**

Explored 3 variants live (light+dark) in sandbox; `impeccable` critique applied named laws (restraint, hierarchy, affordance, a11y, anti-slop).

What's locked:
- **Color** — direct tmrw-theme tokens, light + dark. Blue (`#0f62fe` / `#4589ff`) used as a *signal only* (active nav, focus ring, tags, buttons), never as default link/decoration color.
- **Links** — neutral text color with a blue underline (color-blind-safe; not color-alone). NOT blue-filled links.
- **Type** — Mona Sans ExtraBold for hero/H1; IBM Plex Sans for H2/H3 **but with explicit weight/size contrast** so hierarchy stays ≥1.25 between steps (fix vs plain A). IBM Plex Mono for labels/code. Body IBM Plex Sans.
- **Prose measure** — cap doc-body at ~70ch (grafted from C), line-height 1.6–1.7.
- **Radius** — `border-radius-subtle: 8px` per brand token (NOT square).

Rejected:
- **B "Carbon Bold"** — blue-everywhere links fail the brand's own "blue is a signal" principle + impeccable restraint; square 0-radius buttons contradict the 8px brand token; reads as the first-order category reflex (AI-slop) for a Carbon docs site.
- **Plain A** — H2/H3 in body weight flattened hierarchy; fixed by the weight-contrast graft above.

Mandatory fixes baked in (impeccable absolute bans / laws):
- 🔴 **No side-stripe borders.** Callouts + code blocks use full 1px border + bg tint (callouts get a leading label/icon), never a `border-left` accent stripe.
- H2/H3 weight + size contrast to preserve hierarchy.

### L2 — Shell (2026-06-09)

**Chosen: Carbon-styled navbar (built on Docusaurus's own navbar) + minimal footer.**

Navbar look = IBM Carbon UI Shell header. **Build architecture = Option 1: restyle Docusaurus's existing `Navbar` via swizzle + CSS** — NOT a replacement with `@carbon/react`, and NOT a hand-rolled component. The sandbox HTML was only a look mockup.

Why Option 1 (over real `@carbon/react` Header):
- Keeps everything Docusaurus already provides free: routing, active-state, **mobile drawer, color-mode toggle, search integration**.
- Light footprint, no `@carbon/react` bundle, no SSR rewiring.
- Trade-off accepted: Carbon-*styled*, not pixel-identical to the real Carbon component. Right call for a docs site.

Carbon look spec (to apply in CSS): dark `#161616` bar in both themes, 48px tall, 1px `#393939` bottom border, tmrw light-on-dark logo, nav items 14px `#c6c6c6` / hover bg `#2c2c2c`, **active = white + 3px blue `#0f62fe` bottom indicator**, global actions as 48×48 buttons.

Footer = minimal: logo + `© 2026 tmrw education` + a **Privacy** link only (rejected F2 columns as over-built; would be dead links to non-existent pages).

Consequence for "props": under Option 1, search / theme toggle / mobile menu are **Docusaurus features we style + keep/hide**, not slots we build. The Carbon prop-checklist (notifications, account, app-switcher) only mattered under Option 2 and is moot.

**Header look — finalized against IBM references (white Carbon UI Shell + IBM masthead spacing):**
- **Always dark**, regardless of page theme: over light OR dark content. Logo always the light-on-dark variant. (Tried theme-aware white/dark header first; user chose always-dark.)
- **Header color = brand Cool Gray ramp** (NOT neutral Gray): bg Cool Gray 100 `#121619`, border/divider Cool Gray 80 `#343a3f`, links Cool Gray 30 `#c1c7cd`, hover Cool Gray 90 `#21272a`, active/name Cool Gray 10 `#f2f4f8`, active underline Blue `#4589ff`. (Corrected from neutral `#161616`/`#393939` — brand dark surfaces are Cool Gray, e.g. brand card = CG100 #121619.)
- Content + SideNav DO follow the page theme; only the header is pinned dark.
- **Left lockup:** tmrw logo only (16px), no product-name word. (Tried "Help" text after the logo; dropped — logo │ nav like the IBM masthead.)
- **Divider** between name and nav, ~28px breathing room each side (16px name pad + 12px divider margin), matching the airier IBM masthead, not the compact product header.
- **Nav items:** 15px, 18px horizontal padding. Link `#525252` (light) / `#c6c6c6` (dark), hover bg `#e8e8e8` / `#2c2c2c`.
- **Active item = blue underline** (3px `#0f62fe`), full-item width (true Carbon), NOT bold. (IBM masthead uses bold; we keep the underline from the first Carbon docs reference. Tried a text-width underline to even the perceived spacing — user rejected, kept full-width.)
- **Right global actions:** Search + theme toggle only. **Dropped:** notifications bell (no backend), app-switcher waffle.
- **Left SideNav** (Carbon) for doc pages: collapsible category rows + sub-links, active row = gray bg + 3px blue left indicator. Maps to the Docusaurus docs sidebar.

Open: doc-page H1 currently uses locked-L1 Mona Sans ExtraBold (brand), which diverges from the reference's Plex-Sans light headings. Flagged to user; kept Mona Sans pending any change.

**Dark-mode ramp correction (2026-06-09):** brand's locked-L1 dark `--bg` was `#141A1B` (an off-Cool-Gray value the tmrw-theme skill itself flagged "change this color"). It clashed with the always-dark header (CG100 `#121619`). Fixed by snapping the dark page to proper Carbon g100 layering on the Cool Gray ramp:
- page `--bg` = CG100 `#121619` (now identical to header → seamless, divided only by border)
- card `--card` = CG90 `#21272a`
- surface `--surface2` = CG80 `#343a3f`
- content rule `--rule` = CG70 `#4d5358`; chrome border = CG80 `#343a3f`
- text/text-2/muted unchanged (CG10/30/50). **TODO:** push this `#141A1B → #121619` fix back into the tmrw-theme skill's dark palette.

Explored N1 classic bar / N2 product-dropdown / N3 two-tier; user steered to the IBM **Carbon UI Shell header** (on-brand — brand is Carbon-rooted). Verified live light+dark via Playwright screenshots.

What's locked:
- **Navbar = Carbon UI Shell header** — dark `#161616` bar in BOTH themes, 48px tall, 1px `#393939` bottom border. tmrw light-on-dark logo (20px). Nav items 14px `#c6c6c6`, hover bg `#2c2c2c`, **active = white + 3px blue `#0f62fe` bottom indicator**. Right-aligned global actions (Search ⌘K, theme toggle) as 48×48 buttons.
- **Footer = minimal (F1)** — single row: logo + `© 2026 tmrw education` + a **Privacy** link. Nothing else.

Rejected:
- **N1 classic bar** — 5 long product labels crush the bar < ~1100px (overflow).
- **N2 product dropdown** — buries the primary axis (which product) behind a click; hurts help-center discoverability.
- **N3 two-tier** — fine, but Carbon shell is the more on-brand expression of the same "products visible" goal.
- **F2 columned footer** — over-built for current content: "Products" just duplicates the nav; Resources/Legal columns would be links to pages that don't exist yet (dead links worse than minimal). User + impeccable restraint agreed: don't manufacture columns.

Open follow-ups (port phase, not blockers):
- **Responsive:** Carbon header needs a hamburger side-nav + nav overflow menu below ~900px (the 5 labels squeeze the actions at 940px). Standard Carbon pattern.
- **Real Privacy URL** needed for the footer link (placeholder `#` for now).

### L3 — Homepage (2026-06-09)

**Chosen: headline + Carbon-tile card grid (no hero search).**

Built directly in the real site ([src/pages/index.tsx](../../src/pages/index.tsx) + index.module.css):
- **Hero** — mono blue eyebrow "tmrw Help Center", Mona Sans ExtraBold "How can we help?", subhead. Centered, max-width 1000px.
- **Cards** — 5 Carbon tiles, `repeat(auto-fit, minmax(300px,1fr))` (3-up). Each: a Carbon icon (StaffXP=Education, ESS=Identification, F&O=Wallet, Parent=Chat, Learner=Notebook), 600 name, secondary desc, blue ArrowRight that slides in on hover (reduced-motion safe).
- Rejected a big hero search: redundant with the navbar search + extra wiring.
- Gotcha fixed: `<main>` is a flex child and shrink-wrapped to content; needs `width:100%` (not just max-width) or the grid collapses to 1 column.

### Port to real site — COMPLETE (2026-06-09)

Branch `restyle/carbon-shell`. Option 1 (restyle Docusaurus, no @carbon/react component).

- **[docusaurus.config.ts](../../docusaurus.config.ts)** — logo-only navbar (title dropped); sxp docs instance id `sxp`→`default` (needed so @easyops-cn search resolves version context on non-doc pages); added `@easyops-cn/docusaurus-search-local` theme indexing all 5 instances.
- **[src/css/custom.css](../../src/css/custom.css)** — fonts (IBM Plex + Mona Sans via CDN), brand tokens both themes (Cool Gray ramp), always-dark Carbon navbar (logo + 24px divider + 15px nav + blue active underline), Carbon doc sidebar, signal-blue underline content links, styled search box.
- **Logo** — `static/img/tmrw-logo.svg` (light-on-dark, used in both modes).
- **Carbon icons** (`@carbon/icons-react`) via swizzled `@theme/Icon/*`: LightMode→Light, DarkMode→Asleep, SystemColorMode→Laptop, Home→Home, Edit→Edit; plus CSS-swapped search magnifier (Carbon Search) + sidebar caret (Carbon ChevronDown). Navbar icons 20px.

Open follow-ups:
- **Search only indexes on `npm run build`** — dev shows the box but returns nothing.
- **Footer** still Infima default dark — not yet aligned to CG100.
- **Responsive:** Carbon header needs hamburger + nav overflow < ~900px (5 long labels squeeze).
- **Real Privacy URL** for footer link.
- **TODO:** push `#141A1B → #121619` dark-bg fix back into the tmrw-theme skill.

### L4 — Content / doc-page type + breadcrumb (2026-06-09)

- **Carbon type scale** (sizes + line-heights, hand-mapped — no `@carbon/type` dep): H1 42/50 **Mona Sans ExtraBold** (display; all main H1 use Mona Sans via a global `h1` rule), H2 28/36, H3 20/28, H4 16/22, body 16/24. Docusaurus overrides `--ifm-hX` at `.markdown` level, so sizes are set directly on `.markdown` headings.
- **Expressive heading weights**: H2/H3 = Regular 400 (lighter, editorial, matches IBM docs). Exception: **H3 bumped to 600** (critique fix — 20px/400 read too close to 16px/400 body).
- **8pt vertical rhythm**: heading/paragraph/list spacing in 8px multiples (Carbon grid). Infima is flexbox + rem, NOT 8pt by default — imposed via overrides.
- **Blockquotes = note layer**: brand blue-light fill (`#edf4ff` / dark `#001d6c`) + blue border, NO side-stripe.
- **Tables** = Carbon DataTable look; **images** unframed (docs have broken `99-Images/*` refs) + floated images get 24px text gap.
- **Breadcrumb** = Carbon text (swizzled `DocBreadcrumbs/Items/Home` → "Home" text link, no icon) + `/` slash separators + no pill. Style-default approach (not `@carbon/react`).
- **Layout**: content+TOC anchored as a left group (`.container` max-width 1000, `margin-left:0`); 32px gutter. **Left-edge unified to 32px** across navbar logo + sidebar items + content. Top stays 16px.
- **Chrome type**: navbar nav 14px (was 15) to match sidebar 14px + Carbon. Body 16px (Body 02), sidebar/nav 14px — intentionally different (reading vs UI).
- **Broken images**: `src/theme/Root.tsx` hides images that fail to load (real fix = add the missing files).

### Homepage v2 (2026-06-09)

- **Hero search** — large central 56px field, submits to the local-search page (`/search?q=`). (Search results need `npm run build` to index.)
- **Pictograms** — `@carbon/pictograms-react` per product (Teacher / UserProfile / FinanceAndOperations / Collaboration / Education), thickened with a 0.5 stroke, white on the dark cards.
- **Dark "highlight-card" cards** (adapted from 21st.dev beratberkay/highlight-card): brand Cool Gray subtle gradient (`#121619 → #181d21`, near-flat like the original), 16px radius, soft shadow at rest that lifts away on hover. **Hover motion only** (no constant ambient): card scale+tilt, pictogram scale/rotate. Reduced-motion guarded. Rejected: the shine sweep (naff), the constant ping/bounce ambient (fights docs restraint), the 180° icon flip (figurative pictograms upside-down). Dropped the redundant "TMRW HELP CENTER" eyebrow.

### impeccable critique (2026-06-09)

Scored ~3.2/4. Fixed: P1 broken-image boxes (Root hides them), P2 doc right-void (container 1000), P2 H3 hierarchy (600), P2 homepage eyebrow (dropped), P3 navbar 14px, P3 em-dashes in card copy (→ colons), P3 hollow cards (min-height 168, arrow at rest). Kept the 5-card grid (functional, not de-templated).

### Session 2 polish (2026-06-09)

- **Morphing hero search** (adapted from 21st.dev 0xUrvish/morphing-input, CSS-only — no `motion` dep): muted pill, Carbon search-icon button + arrow submit, placeholder **cycles hints** with a per-phrase 3D flip+blur. Submits to `/search`.
- **Dark "highlight-card" → theme-aware**: cards revert to theme-aware (light gradient `#fff→#f2f5f6` / dark Cool Gray `#121619→#181d21`), 16px radius, soft shadow at rest. Hover = scale+tilt+lift + pictogram scale/rotate; **monochrome neutral tint on hover** (not blue border). Reduced-motion guarded. (5 black tiles were too heavy in light mode.)
- **Pictograms** black/ink (theme-aware) on the theme-aware cards.
- **Navbar**: search restyled to a **pill** (280px, no ⌘K chips); active indicator switched from `border-bottom` to inset `box-shadow` (fixed the text-shifted-up / logo-misalign — the 3px border was eating box height); 32px left+right margins symmetric; nav 14px.
- **Search-results page** input → pill + Carbon magnifier + Carbon Close × (data-URIs; native `type=search` so CSS not React). Specificity: needed `input[class*=...]` to beat the plugin's own rule.
- **Footer removed** entirely.
- **Color mode** kept 3-state (system/light/dark — laptop = system).
- **Type weights** (uncle typeset pass): homepage hero = Mona Sans **700** (punchy, one step down from 800); **doc-page H1 = Mona Sans Light 300** (big-display-is-light, IBM-docs look); **doc H2 bumped 400→600** to fix the H2(400)/H3(600) weight inversion — now H1 light / H2+H3 SemiBold (size-separated) / body regular.

### Session 3 — components + search-first homepage + tables (2026-06-09)

- **Pagination / page actions**: arrow moved next to the Prev/Next sublabel (dropped the « » on the title); neutral text (card border signals nav, no blue link color). **"Edit this page" hidden** (contributor affordance, not for end users).
- **`<Steps>` component** ([src/components/Steps](../../src/components/Steps), registered in [src/theme/MDXComponents.tsx](../../src/theme/MDXComponents.tsx) → usable in any .md/.mdx without import). Native rebuild of prompt-kit's chain-of-thought for docs. Numbered rail; **title + body always visible** (uncle: progressive disclosure default-expand for a KB — Ctrl-F/SEO/mobile). Optional `<StepDetail>` collapsible for *secondary* asides only. Markers: **outlined = normal**, `final` = inverse ink (the result step), `accent` = blue (important). Outlined default is what makes the filled states read as signals. Carbon icons, reduced-motion guarded, a11y `button aria-expanded`. Live demo at `/markdown-page`.
- **Homepage inverted to search-first**: search is the hero (large pill + Popular quick-search chips); 5 products demoted to compact **horizontal** tiles under "Or browse by product". Carbon **icons** (not pictograms — those need 48px+) at 28px: UserMultiple / UserProfile / **Money** / Chat / Education.
- **Tables** restyled to the ruixen "contributors-overview" look: card-wrapped (subtle border + soft shadow), **subtle gray header bar** + muted header text, **no zebra** (clean rows + hover only), whisper-thin row dividers (emphasis-100), no vertical cell borders, no th double-border. Simple markdown tables only (no badge/total/caption components — not needed).

### Session 4 — cosmetic pass (2026-06-11)

- **Sidebar collapse caret**: now points **right (›) when collapsed**, down (∨) when expanded (was rotating to point left). Override on `.menu__list-item--collapsed … { transform: rotateZ(-90deg) }`. Caret also **shrunk 2rem → 1.25rem** background-size — smaller/lighter to match mockup.
- **Homepage product cards**: dropped the diagonal gradient + resting shadow → **flat fill**. Iterated the gray: tried `#f2f5f6` (hardcoded, read as a different gray family from the rest of the page) → `--ifm-color-emphasis-200` (matched the hero-search pill) → **`--ifm-color-emphasis-100`** (final: matches the Popular chips). Same token light + dark. Hover keeps lift+tilt + neutral border only (no shadow).
- **Card links fixed** — were `/help/<app>` (dead; `baseUrl` is `/`, no `/help` prefix). Now `/sxp /pxp /lxp /ess /fo`, verified against `.docusaurus/routes.js`.
- **Navbar reordered + renamed**: StaffXP · ParentXP · LearnerXP · Employee Self-Service · Finance & Operations. PXP "Parent Experience"→**ParentXP**, LXP "Learner Experience"→**LearnerXP** (product-name style, matches StaffXP). Home cards still read "Parent/Learner Experience" — left as-is unless we unify later.
- **Doc-page type hierarchy** (supersedes Session 2): **H2/H3 both → Regular 400** (were 600/600 — every subhead same weight, flat). Now H1 Light 300 / H2 400 / H3 400 / H4 SemiBold 600 → real weight rhythm. **H1 dropped 42px → 34px** (2.125rem): the 42→28 jump was too big and 42px floated oversized on the many h1-only pages. 34/28 = 1.21, gentle step, H1 still dominant.
- **`<Steps>` rail gap fixed**: rail no longer starts 4px below each circle and stop at the next circle's edge. Now spans **circle-center → next circle-center** (`top:15px; bottom:-15px; z-index:0`); the opaque circles (z-index 1) mask the overlap, so it's geometrically gap-proof at both ends regardless of step height. Rail centered on circles (both at x=15px).

### Session 5 — navbar brand + link underline (2026-06-11)

- **Navbar brand reworked** (Carbon "product" pattern): swapped the **tmrw wordmark → 't' icon mark** (`tmrw-logo-icon-light.svg`, 24px) + added a **"Help" label** (`title: 'Help'`, 18px/500, white). Layout = **[icon · Help] | nav items**: icon and label grouped (10px gap, no divider between), then the 24px divider (`.navbar__brand::after`), then the nav links. (First tried the divider *between* icon and label like the mockup, then moved it after the group per request.)
- **Divider colour** lightened from `--tmrw-hd-border` (#343a3f, too dark on the bar) → `rgba(255,255,255,0.28)`.
- **Content links → Carbon style** (supersedes the "signal-blue *underline*" rule): now **blue (`--ifm-color-primary`), no underline at rest**, underline on hover (5px offset). (Briefly tried text-colour + always-on underline; reverted — Carbon links are blue and undecorated until hover.)

## Deferred / backlog ideas

- "C Editorial" full treatment (Mona Sans on all headings, 60px hero) — parked; revisit if the site wants a more magazine feel later. Watch the eyebrow-on-every-section ban if adopted.
- **Unify card labels with navbar** (ParentXP/LearnerXP on the homepage tiles) — deferred this session.
