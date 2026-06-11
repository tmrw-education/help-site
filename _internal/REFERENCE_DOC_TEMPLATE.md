# Feature Reference — template for the twin

> **Purpose:** one of these per topic is the **source of truth** the help-article
> workflow drafts from. Same shape as `NOTICES_FEATURE_REFERENCE.md` (the proven
> one). Describe what the feature *does* and how staff use it, in plain user terms.
> Exhaustive on behaviour; not an architecture doc. Derived from the app source.
>
> **Why this format:** the drafting workflow reads these sections directly —
> permissions → role fidelity in screenshots, per-task Flow → the numbered steps,
> "non-obvious behaviour" → the `> Note:` callouts, "exclude" → what we leave out.
> Keep the headings exactly; the workflow keys off them.

File name: `<TOPIC>_FEATURE_REFERENCE.md` (e.g. `WELLBEING_FEATURE_REFERENCE.md`).
One per topic. Drop in the SXP app repo `training/` (same place as Notices).

---

## Purpose
2–4 sentences: what the feature is, who uses it, why.

## Where it lives
| Screen | How you reach it | Who it's for |
| --- | --- | --- |
| **<Screen>** (`/route`) | nav path | audience |

## Who can do what (permissions)
The relevant permission tiers and what each unlocks. Be explicit about what
**read-only** vs **write** vs **leader/admin** see — this drives which fields we
show in which screenshot (staff vs leader fidelity).

| Capability | Needs |
| --- | --- |
| … | read / write / leader |

- Call out anything **hidden** for lower tiers (buttons, fields, columns).

---

## Task: <verb the user would use>
Repeat this block **once per task** (one task = one help page). Use the verb the
user would say ("Create a …", "Approve a …", "Find a …").

**Flow**
1. Numbered, plain-language steps from entry point to done.
2. Name the **exact on-screen labels** (buttons, fields, tabs) in bold.

**Fields** (if the task has a form — table form)
| Field | Required? | Purpose / rules / limits |
| --- | --- | --- |
| … | ✅ / optional / leader-only | char limits, file types, defaults, conditional-required |

**Notes / non-obvious behaviour**
- The things the screen **can't** tell you: side effects, "doing X also does Y",
  once-only actions, irreversible actions, what a toggle actually does.
- These become the `> Note:` callouts in the article — the highest-value bits.

---

## Statuses / states (if any)
| Status | Meaning | Driven by |
| --- | --- | --- |

## Validation & limits (quick reference)
Bullet the hard limits (char counts, file types/sizes, required combinations,
date rules) so the article can state them precisely.

## Not user-facing / work-in-progress — EXCLUDE from articles
List anything present in the UI/data but **not usable** today, relic, or internal.
We will not write articles about these, and will drop the fields. (Saves us
documenting dead ends — this section was gold for Notices.)

## Behaviours worth calling out (summary)
3–6 bullets: the non-obvious, must-know behaviours for this feature. The headline
"if you remember nothing else" facts.

---

### Tier note for the writer
- **XP apps (StaffXP, ESS, PXP, LXP):** lean — concise, 1 tight screenshot/task, no markers.
- **F&O (Dynamics):** thorough — explicit steps, screenshot per meaningful screen, mark the element.
Match the depth to the app; the reference can be equally detailed either way.
