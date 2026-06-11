# SXP help — trainer handover

**Internal only** (lives in `help-site/_internal/`, never published to the site).
**For:** the training team taking over StaffXP help maintenance.
**As of:** 2026-06-11 · branch `sxp-hero` · last commit `d332e27`.

---

## 1. What shipped this pass

The whole **StaffXP** help section was reformatted and illustrated:

- **89 lean, task-per-page articles** across 9 topics (Navigating, Attendance,
  Activities, Extra-curricular, Wellbeing, Notifications, Profiles, Notices,
  + shared images). Replaces the old one-big-page-per-topic monoliths.
- **116 screenshots** captured and embedded — every page that needed a shot has
  one. 0 missing-image markers except the single placeholder in §4.
- Titles tightened so the sidebar reads clean (see commit `d332e27`).

## 2. Deploying replaces the old SXP help — originals are backed up

Deploy (`gh workflow run deploy.yml --repo tmrw-education/help`) builds the
current branch and **overwrites the live SXP help**. The previous content is
**not lost** — three copies exist:

- **`main` branch** — untouched pre-hero baseline.
- **Tag `notices-pre-hero`** — bookmark of pre-change main.
- **Local folder** `~/Documents/sxp-original-backup-main-2026-06-11/` (Ginno's machine).

To compare old vs new: `git diff main sxp-hero -- sxp/`.

## 3. Screenshots — where they come from & how to reshoot

**Source = the showcase app** `https://tmrw-sxp-showcase.azurewebsites.net`
(Microsoft SSO). It runs on **mock data** — the student names, dates, and figures
in every shot are fake, **not production**. If the real app's UI changes, the
shots must be reshot from the showcase (or production once it's safe to).

**Capture spec (match it when reshooting):**
- Light theme, **2× / Retina**, cropped tight, clean state (no half-filled forms).
- Hide dev chrome before shooting: the dev **role switcher**, the **Felix** panel,
  and the left **side-nav** drawer.
- **Role fidelity matters.** Staff and leader/coordinator/admin views differ
  (e.g. "Your requests" vs "All requests"; the Emergency button is leader-only).
  Use the **dev role switcher** (Teacher / Leader / Admin) to match what the
  article describes before you shoot.

**Where they live:** each topic's own `images/` folder, named by the article's
**`id`** (e.g. `sxp/03-Attendance/images/take-attendance-roll-2.png`).

**The wash/border behind each shot is CSS** (the `ZoomImage` component), derived
per-app from the icon gradient. Restyling the frame is a CSS change — **you never
reshoot just to change the look.**

## 4. Outstanding to-dos (please action)

1. **Extra-curricular `09-2` "Exclude students"** — one `📸 needs image`
   placeholder in `sxp/06-Extracurricular/09-review-extracurricular-request.md`.
   The control couldn't be reached in the automated pass. **Also fix the wording
   in that article:** it says you exclude students "in the Attendees section" of
   the read-only *Review and submit* summary — but the app shows that summary's
   section is **"Participants"** with **no exclude control**. The Exclude control
   actually lives in the **create/edit wizard → Attendees step**, and only after a
   **Student group** is selected. Capture it there and correct step 2.
2. **Integration stubs (Untis / Markbook / Follett)** — currently external-link
   placeholders; they need **3 real URLs**.
3. **Wellbeing metric cards** — the landing-page cards read **per category**
   (Mental, Academic, Social…), not per sentiment. The draft's
   "sentiment drives the cards" claim was dropped and the example aligned to
   categories. **Confirm with the product/twin** which is correct and finalise.

## 5. Copy corrected to match the live app

Where the draft (written from the twin's reference docs) disagreed with the
running app, the **app won** and the article was fixed. Watch these if the app
changes again:

- **Settings** applies changes **live — there is no Save button.**
- **Attendance** bulk-mark labels are **"All present" / "All absent"** (not
  "mark all Present/Absent").
- **Wellbeing** task edit is via the task's **⋮ (options) menu → Edit**, not an
  inline pencil.
- **Overseas trip** request fields are **"Max no. of students"** and
  **"Enable waitlist"**.
- **Wellbeing** landing cards are per **category** (see §4.3).

## 6. Structure & house rules (quick reference)

- **One task per page.** Title = a task ("Take the daily roll"), short steps,
  inline screenshots.
- **`id` is the slug and is KB-authoritative** (flat kebab, verb-first). It's the
  Docusaurus URL *and* the key Felix uses — **don't change an `id`** once shipped
  without checking what links to it. Article **titles** are safe to edit; ids are not.
- **Note rule:** inline behavioural facts in the step prose; only **box**
  (`> **Note:**`) a genuinely irreversible consequence (data loss, person
  contacted, permission block). 0–2 boxed notes per page.
- Felix help is verbatim/bold-only (no admonitions/MDX), so any must-know fact in
  a boxed Note must **also** appear in the step prose.
- Full authoring guidance: **`AUTHORING_FOR_FELIX.md`**. Format rationale:
  **`DOC_FORMAT_RATIONALE.md`**. Project tracker: **`SXP_ROLLOUT.md`**.

## 7. Repo map

- **`help`** repo (`sxp-hero`) — the content trainers edit (`sxp/<topic>/*.md`
  + each topic's `images/`).
- **`help-site`** repo (`main`) — Docusaurus tooling that renders `../help`.
  These `_internal/` docs live here.
- Local dev: `cd help-site && npm start -- --port 3001 --no-open` → reads `../help`
  live with hot reload.
