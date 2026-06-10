# Writing KB pages that connect to Felix

A guide for the training team. Your help pages already become the **public Help
site**. With three small habits, the **same pages** also power **Felix** — the
in-app assistant that answers "how do I…?" right inside StaffXP. One source, two
places, no extra system.

> **The golden rule:** **one page per task**, a tiny **frontmatter block** at the
> top of each page, and **each screenshot placed right after the step it shows**.
> Get those three right and Felix just works.

You write normal Markdown in your KB repo. You don't touch the app's code, and you
don't need to know anything about how the app is built.

---

## 1. How it connects

Every page you write does double duty:

- It renders as a **public Help article** (the Docusaurus site) — exactly as today.
- Felix reads the **same page** to answer that question in-app: a short summary,
  then a guided walk-through (your steps + screenshots), then a button into the app.

The only thing Felix needs that a reader doesn't is a few lines of **frontmatter**
— metadata at the very top of the page that is **invisible on the site** but
machine-readable. That's the whole trick.

---

## 2. Page structure — one page per task

**One Markdown page = one task = one thing Felix can answer.** Group the pages for
a feature in a **folder**; the folder becomes the section in the Help nav.

```
sxp/                        ← one folder per app section (= a Help nav section)
  Notices/                  ← one folder per feature (= a nav category)
    create-a-notice.md      ← one task per page
    edit-a-notice.md
    feature-a-notice.md
    images/                 ← this feature's screenshots live here (see §6)
      create_a_notice_1.png
  Wellbeing/
    create-a-wellbeing-note.md
    resolve-a-note.md
    images/
```

Each feature folder is **self-contained**: its task pages and its `images/` folder
sit together, so every screenshot path is just `./images/…` — never `../`.

**Why one-per-task, not one big page per feature?** Each task gets its own URL
(better search + linking), and — most importantly — each gets its own frontmatter
block so Felix can read it cleanly. One page, one answer.

- **File name** = the task in `kebab-case`: `create-a-notice.md`, `edit-a-notice.md`.
- Keep your usual folder-per-feature layout; nothing else changes for the Help site.

---

## 3. The frontmatter block (the one new habit)

At the **very top** of each page, between two `---` lines, add this. It's standard
Docusaurus frontmatter — it does **not** show on the rendered page.

```yaml
---
summary:
  - "Short step 1 (bold the **button names**)."
  - "Short step 2."
  - "Short step 3."
keywords: [phrase one, phrase two, a synonym]
video:
  youtube: VIDEO_ID
  bunny:                # optional — leave blank if none yet
---
```

| Field | What it is | Tips |
|---|---|---|
| `summary` | The **3–4 line gist** Felix shows first | Keep it short — point-of-need, not the manual. Bold the **exact** button names. |
| `keywords` | Phrases people might type | Add synonyms + how people actually ask ("post a notice", "make an announcement"). Helps Felix find the page. |
| `video.youtube` | The **YouTube video id** (primary) | Just the id from the URL — see §7. |
| `video.bunny` | A Bunny URL (fallback) | Optional. Leave blank; we add it later. |

If you omit `summary`, Felix falls back to your first few steps — but a hand-written
summary always reads better. Write it.

> You do **not** put the in-app link in here — we handle "Take me there" on our
> side from the page's name. One less thing for you to track.

---

## 4. The page body

After the frontmatter, write the article as you normally would:

- **One H1 only** — the task, as a user would say it: `# Create a notice`. One page
  is one task, so you do **not** need `##` sub-headings. Don't add them.
- A short intro line if it helps.
- A **numbered list** of steps (see §5).

---

## 5. Writing the steps — just a numbered list

Write a plain Markdown **numbered list**. The site automatically renders it as a
**stepper** (a numbered rail) — you don't write any special components.

**The shape of one step:** the **first line** is the step's short title; anything
you **indent underneath** it (detail, a `> **Note:**`, a screenshot) becomes that
step's body.

```markdown
1. Open the fee schedule form

   From the **FNO dashboard**, open **Modules ▸ Academic Management**, then click
   **All fee schedules** and **New**.

2. Complete the header

   Set **Customer type** to **Student** and select the **Fee and charge interval**.

   ![Fee schedule header …](./images/create-a-fee-schedule-1.png)
```

Rules:

- **Keep the first line short** — it's the title. Put the detail in the indented body.
- **Bold the EXACT on-screen label.** Write `**Create notice +**`, not "the create
  button". Users scan for the literal words.
- **Plain, literal, present tense.** "Click **Save changes**." Not "You'll want to go
  ahead and save."
- **Indent the body by 3 spaces** so it stays part of the step. A blank line between
  the title and the body is fine.
- `> **Note:**` callouts are fine for warnings/tips — use sparingly, inside the step.

---

## 6. Screenshots — one per screen, callouts matched to steps

A screenshot shows **one screen** of the task, not one step. Most screens are
annotated with **numbered black-circle callouts** — treat those numbers as **labels
into the picture**, not step numbers.

**Naming:** `task-name-N.png`, where **N is the screen's order** in the task (1st
screen, 2nd screen…), e.g. `create-a-fee-schedule-1.png`.

**Placement:** group the steps that happen on one screen, and put that screen's
image **immediately after the last of those steps** (indented as the step body) —
never bunched at the bottom of the page.

**Tie callouts to steps in the prose.** When a step matches a callout, name the glyph
in the text — `Set **Customer type** to **Student** (④).` Your steps stay numbered
1, 2, 3… from the top; the in-image numbers are independent and may not start at 1
(navigation steps often have no callout). **Don't renumber steps to chase the image**
— bridge them with the glyph reference instead.

**One image per screen — never one per step.** Don't re-crop a screen into a
separate picture per field; the single annotated screenshot is the right artifact.

**Alt text is required.** Describe the screen and what the callouts cover — a
filename is not alt text:

```markdown
![Fee schedule header — Customer type ④, Description ⑤, and the Condition toolbar
button ⑭](./images/create-a-fee-schedule-1.png)
```

**Quality bar — re-capture only when one of these fails:**
- Callouts and field labels are **legible at column width** (readers can click to
  zoom, but it should read without it). Crop full-screen captures to the relevant area.
- The shot reads acceptably in **dark mode**.
- **PNG**, landscape, **under ~500 KB**.
- Field labels live in the **Markdown text**, not only in the image (keeps pages
  translatable).
- Use the feature folder's `images/` folder: `./images/filename.png` (always `./images/`, never `../`).

---

## 7. Videos — YouTube first, Bunny as fallback

A short clip is optional but lovely. Felix shows it as the **"Overview"** step at
the top of the walk-through.

1. Upload the clip to **YouTube** as **Unlisted**.
2. Copy the **video id** — the part after `v=` (or after `youtu.be/`):
   `https://www.youtube.com/watch?v=` **`dQw4w9WgXcQ`**
3. Paste **just the id** into the frontmatter: `youtube: dQw4w9WgXcQ`.

Felix plays the clip **inside the app** (no leaving for YouTube, no suggested
videos). If a school blocks YouTube, we fall back to a **Bunny** copy — leave
`bunny:` blank and we'll wire that up; you don't need to.

---

## 8. Full worked example (a complete page)

`notices/edit-a-notice.md`

````markdown
---
summary:
  - "Notices → **Manage notices**."
  - "Find your notice, click the **edit icon**."
  - "Expand the section, make changes, then **Save changes**."
keywords: [edit notice, change notice, update notice, modify notice]
video:
  youtube: dQw4w9WgXcQ
---

# Edit a notice

1. Open Manage notices

   In the **Notices** tab, click **Manage notices**, then filter with the
   **Active** / **Scheduled** tiles to find your notice.

   ![Manage notices — the Active and Scheduled filter tiles ① and the edit icon ②](./images/edit-a-notice-1.png)

2. Edit and save

   Click the **edit icon** (②), expand the section, make your changes, then click
   **Save changes**.

   > **Note:** You can only edit a notice you created.

   ![The notice editor — the expandable section ③ and the Save changes button ④](./images/edit-a-notice-2.png)
````

That single file is the public "Edit a notice" article **and** Felix's answer.

---

## 9. Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| One page per task, **one H1, no `##` headings** | One giant page; sub-headings |
| A plain numbered list (renders as the stepper) | Hand-written components or tables |
| Short step title, detail **indented** under it | Cram everything onto the title line |
| Bold the **exact** on-screen label | "click the blue button" |
| One image **per screen**, after that screen's steps | Dump all images at the end |
| Real **alt text** describing the screen | `![Step 1]` or a filename |
| Glyph refs `(④)` — labels into the image | Renumber steps to match the image |
| Keep `summary` to 3–4 lines | Re-paste the full steps into `summary` |
| Add real synonyms to `keywords` | Leave `keywords` empty |
| Name images `task-name-N.png` (N = screen) | `Screenshot 2026-06-08 at 14.32.png` |

---

## 10. Before you publish — checklist

- [ ] **One page per task**, named in `kebab-case`, in the right feature folder.
- [ ] A `--- … ---` **frontmatter** block at the very top.
- [ ] `summary` is 3–4 short lines with the **button names bolded**.
- [ ] `keywords` include how people actually ask.
- [ ] **One H1, no `##` sub-headings.** The body is a plain numbered list.
- [ ] Steps: short title line, detail indented under it, exact labels bolded.
- [ ] One screenshot **per screen**, right after that screen's steps, with real
      **alt text**, named `task-name-N.png`.
- [ ] Video id pasted (just the id), if you have one.

---

## What we handle (so you don't)

- Matching what a user typed to your page (typos included).
- Linking **"Take me there"** to the right screen in the app.
- The look of the answer, the chat, the walk-through, light/dark themes.
- Playing the video safely inside the app + the Bunny fallback.

Questions? Ping the dev team. Your pages are the whole product — thank you.
