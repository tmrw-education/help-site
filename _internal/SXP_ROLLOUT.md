# SXP rollout — apply the Notices hero format to the rest of StaffXP

> Scope: **StaffXP only** (other apps deferred). Format/tooling is done (mats, `id`
> standard, capture pipeline). This is "apply the recipe." See
> `AUTHORING_FOR_FELIX.md` (how), `REFERENCE_DOC_TEMPLATE.md` (twin source format),
> `NOTICES_FEATURE_REFERENCE.md` (the proven example).

**Decisions (locked):** source = twin reference docs first · writing = workflow-batched ·
ship = one PR for all of SXP (branch `sxp-hero`, separate from the Notices PR #72).

> **STATUS 2026-06-10 — WRITING + CAPTURE ~DONE.** All twin reference docs landed; all
> topics drafted (81 lean articles, commit `3e0959d`) and the screenshot capture pass is
> done: **115 shots captured, every `{/* CAPTURE */}` marker swapped to a real image ref,
> refs verified repo-wide (0 broken, 0 orphan).** Committed on `sxp-hero` (`ed37355`).
> **2 items left:** (1) Navigating `01-sign-in` — needs the signed-out screen, deferred
> because it ends the live session (the only remaining CAPTURE marker); (2) Extra-curricular
> `09-2` "Exclude students" — gated wizard step, left a `📸 needs image` placeholder.
> Several copy fixes applied where the app diverged from the draft (see commit `ed37355`);
> the Wellbeing metric-cards category-vs-sentiment point still wants twin confirmation.
> Next: shoot sign-in in a fresh session → then open the SXP PR for trainer review.

## Run loop (per feature)
twin reference doc → workflow maps tasks + drafts lean articles → serial capture pass
(role-accurate, 2×) → pages land on `sxp-hero` → one SXP PR when complete → trainer review.

---

## A. Task-features — drafted + captured

| Topic | Reference doc | Map | Draft | Capture | Status |
|---|---|---|---|---|---|
| 03-Attendance | `ATTENDANCE_FEATURE_REFERENCE` | ✅ | ✅ | ✅ | **DONE — 31 shots** (incl. mock emergency declared+ended) |
| 08-Notifications | `NOTIFICATIONS_FEATURE_REFERENCE` | ✅ | ✅ | ✅ | **DONE — 10 shots** |
| 07-Wellbeing | `WELLBEING_FEATURE_REFERENCE` | ✅ | ✅ | ✅ | **DONE — 17 shots** |
| 05-Activities | `ACTIVITIES_FEATURE_REFERENCE` | ✅ | ✅ | ✅ | **DONE — 21 shots** |
| 06-Extracurricular | `EXTRACURRICULAR_FEATURE_REFERENCE` | ✅ | ✅ | 🟡 | **16/17** — 09-2 "Exclude students" placeholder |
| 09-Student & Parent Profiles | `STUDENT_PARENT_PROFILES_FEATURE_REFERENCE` | ✅ | ✅ | ✅ | **DONE — 16 shots** |
| Notices (pilot) | `NOTICES_FEATURE_REFERENCE` | ✅ | ✅ | ✅ | DONE — 8 shots (PR #72) |

## B. Orientation — no twin doc; can start now
| Topic | Approach | Status |
|---|---|---|
| 02-Navigating the Platform | reformat + fresh shots | ✅ **DONE — 5 shots** (sign-in captured 2026-06-11) |
| Landing (`index.md`) | rich front door: intro + MyDay hero + browse-by-topic | ✅ **DONE** — folded in the old `01-Overview`, which was removed |
| 10-AI & Felix | light reformat (conceptual) | ⬜ still a monolith |
| 14-FAQs / 15-Glossary | — | ❌ **removed** (empty placeholders; add real ones later if needed) |

## C. Integrations — REMOVED from the shared help (2026-06-11)

Untis, Markbook, and Follett are **customer-specific** — not relevant to the
general customer base. The stub pages were **removed** from StaffXP help (commit
`4a117bb`); this content belongs in the **customer-specific training guides**
instead. Source remains in git history + the pre-hero local backup.

## Commission to the twin (in order)
ATTENDANCE → WELLBEING → NOTIFICATIONS → ACTIVITIES → EXTRACURRICULAR → PROFILES.
One `*_FEATURE_REFERENCE.md` each, per `REFERENCE_DOC_TEMPLATE.md`, into the SXP app
repo `training/`. Workflow drafts each as it lands.

## Notes
- Notices (PR #72) stays its own pilot PR; the rest of SXP is branch `sxp-hero` off
  main once #72 merges (so they don't tangle).
- `id` scheme: flat kebab, verb-first, KB-authoritative (e.g. `mark-attendance`,
  `resolve-wellbeing-note`). Reuse any ids the app's `helpTopics.ts` already ships.
- Capture is the throughput bottleneck (single app session, role switching, 2×).
  Attendance + Extracurricular are heaviest (few/no existing shots).

---

## Seed text — feature section intros (rescued from old 02-Navigating)
Use these as the starting intro at the top of each feature's section when we build it.

- **Attendance:** Track attendance for a single school day or across a week. Teachers see their classes as a list in the calendar schedule (Day/Week toggle, date arrows); tiles show Late students, Unexcused absences, Absent students on assessment days, plus View analytics. Admins/leaders get the whole-school view.
- **Activities:** Plan school activities and manage resources against a shared calendar so bookings don't clash. Three tiles: Request venue, Calendar view, Request activity. Tabs: Your requests, Booking status, All venues, Parent volunteers (each with search + filter).
- **Wellbeing:** Monitor and support student wellbeing by creating and tracking wellbeing notes; metrics show category trends.
- **Extra-curricular:** Plan, browse, and create extra-curricular activities, tracked on a calendar. Two tiles: Request an extra-curricular activity, Extra-curricular calendar. Tabs: Your request, Booking status, Supervising activities, Staffing.
