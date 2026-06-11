# Help-site

Docusaurus tooling for the **tmrw Help** site — live at
**[help.tmrw.education](https://help.tmrw.education)**.

This repo holds **only the machinery** that builds the site (configs, theme,
`src/`, `static/`, dependencies). The **doc content** lives in a separate repo,
[`tmrw-education/help`](https://github.com/tmrw-education/help), which is what
the trainers clone and write in.

Design decisions for the look-and-feel are logged in
[`_internal/design-lab/DECISIONS.md`](_internal/design-lab/DECISIONS.md).

## How the two repos fit together

```
help (content)          help-site (this repo, tooling)
  sxp/ hr/ finops/   +    docusaurus.config.ts, src/, static/, package.json
  pxp/ lxp/ ce/           sidebars.ts, theme, deps
        \                         /
         \                       /
          GitHub Actions (in `help`) snaps them together,
          builds, and publishes to https://help.tmrw.education
```

The deploy workflow lives in the **content** repo (`help`). A trainer pushing a
doc edit triggers it. To publish a **tooling** change from this repo, either
push an empty commit to `help`, or run the **Deploy** workflow manually from
`help` → Actions → Run workflow.

## Local development

Clone both repos **side by side** so `help` sits at `../help`:

```
parent/
  help/        ← content repo
  help-site/   ← this repo
```

Then:

```bash
npm install
npm start
```

The site reads content straight from `../help` (set by `CONTENT` in
`docusaurus.config.ts`) with live reload — edit content in `help`, edit
theme/feature code here, both hot-reload. **Do not** symlink or copy content into
this repo: symlinks break the Docusaurus build, and copies go stale.

To point at content elsewhere, set `CONTENT_DIR`, e.g. `CONTENT_DIR=../other npm start`.
