# Release Notes

## 2026-06-09 — Initial KB scaffold

### What was set up
- Created `tmrw-education/help` as a public GitHub repo (renamed from `product`)
- Scaffolded **Docusaurus 3.10.1** as the help site framework
- Configured multi-instance docs plugin — one section per app, existing content folders untouched
- Built landing page with app selector cards
- GitHub Actions auto-deploy on push to `main`
- GitHub Pages enabled at `https://tmrw-education.github.io/help/`

### Structure
| URL | App | Folder |
|---|---|---|
| `/sxp` | StaffXP | `sxp/` |
| `/ess` | Employee Self-Service | `hr/` |
| `/fo` | Finance & Operations | `finops/` |
| `/pxp` | Parent Experience | `pxp/` |
| `/lxp` | Learner Experience | `lxp/` |

### Internal
- `_internal/` added for team docs (excluded from built site)
- `HELP_STRATEGY.md` and `AUTHORING_FOR_FELIX.md` added to `_internal/`

### Pending
- Custom domain `help.tmrw.education` — needs GoDaddy CNAME + GitHub Pages config
- Branding — logo, favicon, brand colors in `src/css/custom.css`
- Content restructure — split existing feature files into one-page-per-task format
