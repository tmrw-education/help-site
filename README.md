# help-site

Docusaurus tooling for the **tmrw Help** site.

This repo holds **only the machinery** that builds the site (configs, theme,
`src/`, `static/`, dependencies). The **doc content** lives in a separate repo,
[`tmrw-education/help`](https://github.com/tmrw-education/help), which is what
the trainers clone and write in.

## How the two repos fit together

```
help (content)          help-site (this repo, tooling)
  sxp/ hr/ finops/   +    docusaurus.config.ts, src/, static/, package.json
  pxp/ lxp/ ce/           sidebars.ts, theme, deps
        \                         /
         \                       /
          GitHub Actions (in `help`) snaps them together,
          builds, and publishes to https://tmrw-education.github.io/help/
```

The deploy workflow lives in the **content** repo (`help`). A trainer pushing a
doc edit triggers it. To publish a **tooling** change from this repo, either
push an empty commit to `help`, or run the **Deploy** workflow manually from
`help` → Actions → Run workflow.

## Local development

Content folders are not in this repo, so clone both side by side and symlink (or
copy) the content in before running the dev server:

```bash
# from this repo's root, with ../help checked out next to it
for d in sxp hr finops pxp lxp; do ln -sfn ../help/$d ./$d; done
npm install
npm start
```

Symlinked content folders are gitignored — never commit them here.
