# src/ — Site Theme & Custom Pages

Parent: `../AGENTS.md`. Read it first for stack, content map, and brand source of truth.

## Purpose

All site-chrome code: the homepage, global brand CSS, and any custom React pages/components. This is where the visual redesign lives. Article content stays in the content dirs (`sxp/`, `hr/`, etc.), not here.

## Ownership

- `src/pages/index.tsx` + `index.module.css` — homepage (app-picker landing). Currently a basic card grid over the five product surfaces.
- `src/css/custom.css` — global theme. Infima variable overrides + brand tokens. **Primary lever for the rebrand.**
- `src/pages/markdown-page.mdx` — stray default sample page; safe to remove.

## Local Contracts

- Override brand through Infima CSS custom properties (`--ifm-color-primary`, etc.) and brand tokens in `custom.css`. Avoid swizzling theme components unless an override genuinely can't reach it.
- Homepage app cards are defined in the `apps` array in `index.tsx`; hrefs are `/help/<route>` (baseUrl-prefixed). Keep in sync with the parent Content Map.
- Self-host fonts (Mona Sans / IBM Plex) via `static/` + `@font-face` in `custom.css`; don't assume system install.
- Map brand tokens to both `:root` (light) and `[data-theme='dark']` — never mix light/dark tokens in one block.

## Work Guidance

- Brand tokens (Carbon, blue `#0f62fe` accent, IBM Plex / Mona Sans) come from the `tmrw-theme` skill. Blue is a signal, not decoration — use sparingly.
- Replace the placeholder dino logo (`static/img/logo.svg`) with the real tmrw logo per mode.

## Verification

- `npm start` and eyeball homepage + a doc page in light and dark mode.
- `npm run build` must still pass.

## Child DOX Index

- None yet.
