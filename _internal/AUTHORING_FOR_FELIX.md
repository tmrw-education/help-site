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

## 6. Screenshots — under the step, cropped tight, element marked

> The rules below come straight from the learning-science + UX evidence. The full
> reasoning and citations are in **`DOC_FORMAT_RATIONALE.md`** — read it once and
> these will make sense.

**Put the image directly under the step it shows.** This is the single most
important rule. Indent the screenshot inside its step's body — **never** bunch
images after a block of steps or at the bottom of the page. (A step and the image
that explains it must stay together — separating them makes the reader's eye
ping-pong; *spatial contiguity*, g ≈ 0.63.)

**Crop tight to the part that matters.** Show **one focused thing** per image — the
dialog, the button, the field group you're talking about — not the whole window
with menus and chrome. (Extra detail lowers learning; *coherence*, d ≈ 0.86.)

**Mark the exact element.** Put a box, arrow, or numbered callout on the thing the
reader must click or fill. (Signaled screenshots → more tasks done correctly, in
eye-tracking tests.)

**Don't screenshot self-evident steps.** "Click **Next**" or "Click **Save**"
usually needs no picture. Image the steps a beginner could get stuck on.

**If a screen has numbered callouts**, treat the numbers as **labels into the
picture**, not step numbers — name the glyph in the text next to the image:
`Set **Customer type** to **Student** (④).` Steps stay numbered 1, 2, 3… from the
top; don't renumber them to match the image.

**Alt text is required.** Describe the action/screen — a filename is not alt text:

```markdown
2. Click the **edit icon** on your notice.

   ![The Manage notices list with a row's edit icon highlighted](./images/edit-a-notice-2.png)
```

**Naming:** `task-name-N.png`, where N is the screenshot's order in the task, e.g.
`create-a-notice-1.png`.

**Quality bar:**
- **Cropped** to the relevant area — legible at column width without zooming.
- Reads acceptably in **dark mode**.
- **PNG**, **under ~500 KB**.
- The on-screen labels also live in the **Markdown text** (not only in the image),
  so the page stays scannable and translatable.
- Lives in the feature folder's `images/`: `./images/filename.png` (always
  `./images/`, never `../`).

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
| Image **directly under the step** it shows | Bunch images after a block of steps |
| **Crop tight** — one focused thing per image | Full-window shots; whole-task composites |
| **Mark the element** (box/arrow/callout) | Leave the reader hunting for what to click |
| Image the steps that **need** it | Screenshot self-evident steps ("click **Next**") |
| Real **alt text** describing the action | `![Step 1]` or a filename |
| Bold the **exact** on-screen label | "click the blue button" |
| Keep `summary` to 3–4 lines | Re-paste the full steps into `summary` |
| Add real synonyms to `keywords` | Leave `keywords` empty |
| Name images `task-name-N.png` | `Screenshot 2026-06-08 at 14.32.png` |

---

## 10. Before you publish — checklist

- [ ] **One page per task**, named in `kebab-case`, in the right feature folder.
- [ ] A `--- … ---` **frontmatter** block at the very top.
- [ ] `summary` is 3–4 short lines with the **button names bolded**.
- [ ] `keywords` include how people actually ask.
- [ ] **One H1, no `##` sub-headings.** The body is a plain numbered list.
- [ ] Steps: short title line, detail indented under it, exact labels bolded.
- [ ] Each screenshot is **directly under the step it shows**, **cropped tight**,
      with the **element marked** and real **alt text**. Skip self-evident steps.
- [ ] Video id pasted (just the id), if you have one.

---

## What we handle (so you don't)

- Matching what a user typed to your page (typos included).
- Linking **"Take me there"** to the right screen in the app.
- The look of the answer, the chat, the walk-through, light/dark themes.
- Playing the video safely inside the app + the Bunny fallback.

Questions? Ping the dev team. Your pages are the whole product — thank you.
