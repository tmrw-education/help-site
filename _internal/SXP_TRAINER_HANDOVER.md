# SXP help — trainer handover

**Internal only** (lives in `help-site/_internal/`, never published to the site).
**For:** the training team taking over StaffXP help maintenance.
**As of:** 2026-06-11 · **shipped:** merged to `main` and live at
<https://help.tmrw.education> (GitHub release `v1.1.0`).

---

## 1. What shipped this pass

The whole **StaffXP** help section was reformatted and illustrated:

- **89 lean, task-per-page articles** across 9 topics (Navigating, Attendance,
  Activities, Extra-curricular, Wellbeing, Notifications, Profiles, Notices,
  + shared images). Replaces the old one-big-page-per-topic monoliths.
- **116 screenshots** captured and embedded — every page that needed a shot has
  one. 0 missing-image markers except the single placeholder in §4.
- Titles tightened so the sidebar reads clean.
- **Shipped:** merged to `main` (PR #73, superseding the Notices pilot #72) and
  auto-deployed. Live routes are `/sxp/<Topic>/<id>`.

## 2. How it deploys — and where the originals are

**Every push to `main` auto-rebuilds and publishes** (`deploy.yml`; ~1–2 min).
`main` is the source of truth and equals what's live — no branch tricks needed.
This release replaced the old SXP help, but the **previous content is not lost**:

- **Tag `notices-pre-hero`** — the pre-hero baseline.
- **GitHub release `v1.0.0`** — initial-scaffold snapshot (downloadable zip).
- **Local folder** `~/Documents/sxp-original-backup-main-2026-06-11/` (Ginno's machine).

To compare old vs current: `git diff notices-pre-hero main -- sxp/`.

## 3. Screenshots — SXP reshoot specifics

The **capture spec and all the evergreen rules** (light theme, 2×, crop tight,
clean state, role fidelity, hide dev chrome, mat-is-CSS-so-never-reshoot-for-looks)
live in **`AUTHORING_FOR_FELIX.md` §6**. Read that first. The StaffXP-only
operational details:

- **Source = the showcase app** `https://tmrw-sxp-showcase.azurewebsites.net`
  (Microsoft SSO), on **mock data** — names/dates/figures are fake, **not
  production**. Reshoot here if the real app's UI changes.
- **Dev chrome to hide** before snipping: the **role switcher** (bottom corner),
  the **Felix** panel, and the left **side-nav** drawer.
- **Roles** via the dev role switcher: **Teacher / Leader / Admin** — match the
  article (e.g. "Your requests" is staff, "All requests" + the **Emergency**
  button are leader/admin).
- **Files** live in each topic's own `images/` folder, named by the article's
  **`id`** (e.g. `sxp/03-Attendance/images/take-attendance-roll-2.png`).

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

## 6. House rules — see the authoring guide

The format rules (one task per page, the `id`/frontmatter standard, the Note rule,
Felix bold-only prose) are all in **`AUTHORING_FOR_FELIX.md`** — that's the bible.
Rationale + evidence: **`DOC_FORMAT_RATIONALE.md`**. Project tracker:
**`SXP_ROLLOUT.md`**.

The one thing to keep front-of-mind when *editing* shipped SXP pages: an article's
**`id` is its live URL and the key Felix uses — don't change an `id`** without
checking what links to it. **Titles are safe to edit; ids are not.**

## 7. Repo map

- **`help`** repo (`sxp-hero`) — the content trainers edit (`sxp/<topic>/*.md`
  + each topic's `images/`).
- **`help-site`** repo (`main`) — Docusaurus tooling that renders `../help`.
  These `_internal/` docs live here.
- Local dev: `cd help-site && npm start -- --port 3001 --no-open` → reads `../help`
  live with hot reload.
