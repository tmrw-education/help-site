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
  create-a-notice.md        ← one task per page
  edit-a-notice.md
  feature-a-notice.md
  create-a-wellbeing-note.md
  resolve-a-note.md
  99-Images/                ← all screenshots for this section live here (see §6)
    create-a-notice-1.png
```

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

- An **H1 title** — the task, as a user would say it: `# Create a notice`.
- A short intro line if it helps.
- **Numbered steps** (see §5).

---

## 5. Writing the steps

- **One action per step.** "Click X" then "Fill in Y" are two steps, not one.
- **Bold the EXACT on-screen label.** Write `**Create notice +**`, not "the create
  button". Felix shows these bold; users scan for the literal words.
- **Plain, literal, present tense.** "Click **Save changes**." Not "You'll want to
  go ahead and save."
- `> **Note:**` callouts are fine for warnings/tips — use sparingly.

---

## 6. Screenshots — naming & placement

**Naming:** `task-name-N.png`, where `N` is the step number.

```
create-a-notice-1.png      ← illustrates step 1 of "Create a notice"
create-a-notice-2.png      ← step 2
edit-a-notice-3.png        ← step 3 of "Edit a notice"
```

**Placement (the one people get wrong):** put each screenshot **immediately after
the step it shows** — not bunched at the end.

✅ **Do**
```markdown
1. Click **Notices** in the navigation bar.
   ![Step 1](./99-Images/create-a-notice-1.png)
2. Click **Create notice +**.
   ![Step 2](./99-Images/create-a-notice-2.png)
```

❌ **Don't**
```markdown
1. Click **Notices**.
2. Click **Create notice +**.
![](./99-Images/create-a-notice-1.png)
![](./99-Images/create-a-notice-2.png)   ← Felix can't tell which step each belongs to
```

**Other image rules**
- Not every step needs a screenshot. Text-only steps are fine.
- **PNG**, landscape, cropped to the relevant area.
- Keep each file **under ~500 KB** where you can (they load inside the app).
- Use a relative path to your section's `99-Images/` folder, e.g. `./99-Images/filename.png`.

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

1. In the **Notices** tab, click **Manage notices**.
   ![Step 1](./99-Images/edit-a-notice-1.png)
2. Find the notice you want to edit — filter via the **Active** / **Scheduled** tiles.
   ![Step 2](./99-Images/edit-a-notice-2.png)
3. Click the **edit icon** on that notice.
   ![Step 3](./99-Images/edit-a-notice-3.png)
4. Expand the section and make your changes.
   ![Step 4](./99-Images/edit-a-notice-4.png)
5. Click **Save changes**.

> **Note:** You can only edit a notice you created.
````

That single file is the public "Edit a notice" article **and** Felix's answer.

---

## 9. Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| One page per task | One giant page for a whole feature |
| Bold the **exact** on-screen label | "click the blue button" |
| One action per step | Cram three actions into one step |
| Place each image **after its step** | Dump all images at the end |
| Keep `summary` to 3–4 lines | Re-paste the full steps into `summary` |
| Add real synonyms to `keywords` | Leave `keywords` empty |
| Name images `task-name-N.png` | `Screenshot 2026-06-08 at 14.32.png` |

---

## 10. Before you publish — checklist

- [ ] **One page per task**, named in `kebab-case`, in the right feature folder.
- [ ] A `--- … ---` **frontmatter** block at the very top.
- [ ] `summary` is 3–4 short lines with the **button names bolded**.
- [ ] `keywords` include how people actually ask.
- [ ] An **H1** title; steps are one action each with exact labels bolded.
- [ ] Each screenshot sits **right after its step**, named `task-name-N.png`.
- [ ] Video id pasted (just the id), if you have one.

---

## What we handle (so you don't)

- Matching what a user typed to your page (typos included).
- Linking **"Take me there"** to the right screen in the app.
- The look of the answer, the chat, the walk-through, light/dark themes.
- Playing the video safely inside the app + the Bunny fallback.

Questions? Ping the dev team. Your pages are the whole product — thank you.
