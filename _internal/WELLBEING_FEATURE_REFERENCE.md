# Wellbeing — Feature & Flow Reference

> **Source of truth for help-article writers.** Describes what the Wellbeing feature does and how staff use it, in plain user terms. Exhaustive on behaviour; not a developer/architecture doc. Derived from the StaffXP app source.

---

## Purpose

Wellbeing is the school's pastoral case-management area: staff raise **wellbeing notes** about a student (a concern, an observation, a positive note), then track each note as a **case** — adding follow-up comments, assigning **tasks** to colleagues, notifying parents or other staff, and finally **resolving** or **cancelling** it. A metrics strip on the landing page summarises this month's notes by sentiment. Pastoral / student-support staff and school leaders are the main users; classroom teachers can read but generally can't create.

## Where it lives

| Screen | How you reach it | Who it's for |
| --- | --- | --- |
| **Wellbeing** landing (`/wellbeing`) | "Wellbeing" in the main navigation | Everyone with wellbeing access — metrics + the notes list |
| **Track wellbeing notes** (`/wellbeing/assigned`) | **Track my notes** button (top right of the landing page) | Staff tracking their own open tasks and notes |
| **Case detail** (`/wellbeing/assigned/case/{case}`) | Click a note's **Case title** in any wellbeing table | Anyone who can read wellbeing — the full case workspace |
| **Student profile → Wellbeing tab** | Student profile → **Wellbeing** tab | Read-only list of all notes raised for one student |

## Who can do what (permissions)

Three capability levels apply. A staff member's role decides what they hold. (In the school's role set, Teachers get **read only**; Student Support / pastoral staff and School Leaders get **write**.)

| Capability | Needs |
| --- | --- |
| Open the Wellbeing area, see the metrics strip, read the notes list, open a case, read comments/tasks | **Wellbeing read** |
| Create a wellbeing note; edit a note; add comments; create/edit tasks; change a case's status; mark notes resolved/cancelled | **Wellbeing write** (e.g. pastoral / student-support staff, leaders) |
| See **all** wellbeing notes (everyone's), not just your own | **Wellbeing "view all"** (leaders / coordinators) |

- Staff **without write** access (e.g. classroom teachers) see the landing page and can open cases, but the **Create wellbeing note** button is **disabled**, and the **Edit details** action and the **+** add-buttons on Comments/Tasks don't appear for them.
- The landing table heading and scope change with **view-all**: writers/leaders with view-all see **"All wellbeing notes"**; everyone else sees **"My wellbeing notes"** (only notes they created or were assigned).
- The **Create wellbeing note** button is also disabled when the app is **offline**.

---

# Task: View the Wellbeing landing page

The overview: a metrics strip plus your notes list.

**Flow**
1. Open **Wellbeing** from the navigation.
2. The page shows a **Metrics** strip of stat cards across the top, then a notes table below.
3. **Metrics cards** (this month, with a "from previous month" change figure):
   - **Total wellbeing notes** — all categories combined.
   - **One card per sentiment** (e.g. Positive / Neutral / Negative / High concern) showing that month's count.
4. Below, the notes table lists your active notes — **Case title**, **Student name**, **Priority**, **Case status**. Search and filter by priority; page through results.
5. Click a **Case title** to open that case's detail page; click a **Student name** to open the student's profile.

**Notes**
- The metrics cards are read-only summary figures — they are **not** clickable filters.
- The table heading reads **"All wellbeing notes"** for staff with view-all permission, otherwise **"My wellbeing notes"** (your notes only).

---

# Task: Create a wellbeing note

The main authoring flow. Opens as a single modal ("Create wellbeing note") — not a multi-step wizard. Grouped into **Subject**, **Note**, **Link**, **Notifications** and **Attachments** sections. **Publish note** stays disabled until every required field is valid.

**Flow**
1. On the **Wellbeing** landing page, click **Create wellbeing note** (top right).
2. In **Subject**, search for and pick the **Student name**. Their **Student ID** and **Year group** fill in automatically (read-only).
3. In **Note**, enter the **Title**, choose a **Note type**, write the **Description**, and choose a **Sentiment** and **Priority**.
4. *(Optional)* In **Link**, attach a related **Linked note**. In **Notifications**, pick staff to notify and/or turn on **Notify parents**. In **Attachments**, upload photos or documents.
5. Click **Publish note**. A success toast — "Wellbeing note created" — confirms it.

**Fields**

| Field | Required? | Purpose / rules / limits |
| --- | --- | --- |
| Student name | ✅ Required | Type to search the student list and select. Drives the read-only ID + year-group fields. Only one student per note; can't be changed after creation. |
| Student ID | (auto) | Filled from the chosen student; read-only. |
| Year group | (auto) | Filled from the chosen student; read-only. |
| Title | ✅ Required | The note headline. Up to **100 characters**. |
| Note type | ✅ Required | Pick from the school's list of note types. |
| Description | ✅ Required | The body of the note (free text, multi-line). |
| Sentiment | ✅ Required | The note's sentiment/category (e.g. Positive, Negative, High concern) — drives the metrics cards. |
| Priority | ✅ Required | Low / Medium / High / Critical (each option shows a short description). |
| Linked note | Optional | Link this note to an existing related record. Add via the picker's row pattern (search, then add). |
| Notify staff member | Optional | Search and pick one or more staff to be notified of this note. |
| Notify parents | Optional (default **Yes/On**) | Toggle. When on, parents are notified. **Defaults to On.** |
| Attachments | Optional | Photos or documents. **Max 10 MB each**, types **.jpg, .png, .pdf, .doc, .docx**, multiple allowed. |

**Notes / non-obvious behaviour**
- **Notify parents defaults to ON.** Turn it off before publishing if parents should *not* be notified.
- "Notify staff" is implied by the picker — adding any staff member switches staff-notification on; leaving it empty leaves it off.
- The student you pick **cannot be changed later** — the Subject section is hidden when you edit the note. Pick the right student before publishing.
- **Clear form** is a guarded action: clicking it shows a warning and swaps the button for **Never mind** / **Yes, clear**. It auto-cancels after about 5 seconds if you do nothing.
- Closing with the **X** while you have unsaved entries prompts an "unsaved changes" warning; **Cancel** closes without prompting.
- Creating a note only requires **write** permission; the **Publish** button is also blocked while offline.

---

# Task: Track my notes (open tasks & active/closed notes)

Your personal tracking workspace, reached from **Track my notes**. Three tabs, each with a live count badge.

**Flow**
1. On the **Wellbeing** landing page, click **Track my notes** (top right). This opens **Track wellbeing notes**.
2. Use the tabs:
   - **Open tasks (n)** — tasks assigned to you across all cases. Table of Task title, Case, Student, Priority, etc. Search, filter by **status** and **priority**, and **expand a row** to see the description, status, created/updated dates, and **Open case** / **Edit task** buttons.
   - **Active notes (n)** — your active wellbeing notes (the same table layout as the landing page).
   - **Closed/resolved notes (n)** — your resolved and cancelled notes.
3. Click a **Case** link (in tasks) or a **Case title** (in notes) to open the case detail page.

**Notes**
- The count in each tab label reflects what that tab will load, so you can see your workload before clicking in.
- The **Open tasks** tab defaults to showing **Open** tasks; clear or change the status filter to see completed/cancelled ones.

---

# Task: View a wellbeing case (case detail page)

The full case workspace for one note. Reached by clicking a **Case title** anywhere.

**Flow**
1. Click a **Case title** in any wellbeing table.
2. The page header shows the **case title**, an interactive **status pill** (Active / Resolved / Cancelled), the **student** (avatar, name link, ID, year group), and attribute chips — **Note type**, **Staff notified**, **Sentiment**, **Priority**, **Linked records**, **Attachments**. A chevron button collapses/expands these details.
3. The body has three areas:
   - **Summary** — an AI-generated case summary (with a "last updated" label).
   - **Comments** — the timeline of follow-up comments (see *Add a comment*).
   - **Tasks** — follow-up tasks for the case (see *Create / edit a task*).
4. Writers see an **Edit details** action in the header (see *Edit a wellbeing note*).

**Notes**
- Attachments and linked records in the header are clickable — images open in a preview; other files download.
- **A resolved or cancelled case is read-only.** An info banner appears and the **Edit details**, **Add comment** and **Add task** controls are hidden/disabled until you reopen the case from the status menu.

---

# Task: Change a case's status (resolve / cancel / reopen)

Move a case between **Active**, **Resolved** and **Cancelled**.

**Flow — two ways**
- **From a notes table (the reliable way):** on the landing page or the **Active notes** tab, **tick** one or more notes, then use the batch action bar — **Mark Active**, **Mark Resolved** or **Mark Cancelled**. A success toast confirms how many cases changed, with an **Undo** option.
- **From the case detail header:** click the **status pill** and choose **Active / Resolved / Cancelled**.

**Notes / non-obvious behaviour**
- **Resolving or cancelling makes the case read-only** — no new comments, tasks or edits until it's reopened (set back to Active).
- The batch action shows a short **"Undo"** toast (about 8 seconds) that reverts each note to its previous status, even across a mixed selection.
- You can select multiple notes at once and change them all together.
- **Resolved/closed notes can't be reselected for status change** on the Closed/resolved tab — the tick-boxes only appear on the active list.

> **For the writer:** the case-detail header status menu currently updates only the on-screen pill (the live save is a pending backend hookup). The **table batch actions are the dependable path** for actually changing status. Document the table/batch flow as the primary method; treat the header pill as a quick visual switch.

---

# Task: Edit a wellbeing note

Change a note's content after it's created. Same fields as Create, pre-filled — **except the student, which can't change.**

**Flow**
1. Open the case detail page and click **Edit details** in the header. *(Writers only — disabled if the case is resolved/cancelled.)*
2. The **Edit wellbeing note** modal opens with current values. Change the **Title**, **Note type**, **Sentiment**, **Priority**, **Description**, **Notify parents/staff**, linked notes or attachments.
3. Click **Save**. A success toast confirms the update.

**Notes**
- The **Subject** (student) section is **hidden** — you can't reassign a note to a different student.
- **Edit details** is disabled while the case is **resolved or cancelled**; reopen it first.
- Unsaved changes prompt a warning if you close without saving.

---

# Task: Add a comment to a case

Log a follow-up note in the case timeline ("Comments").

**Flow**
1. On the case detail page, in the **Comments** tile, click the **+** (Add comment). *(Writers only; hidden when the case is closed.)*
2. In **Add comment**, enter a **Title**, the **Notes** text, and *(optional)* attach a file.
3. Click **Save**. The comment appears in the timeline.

**Fields**

| Field | Required? | Purpose / rules / limits |
| --- | --- | --- |
| Title | ✅ Required | Comment headline. Up to **100 characters**. |
| Notes | ✅ Required | The comment body. Up to **250 characters**. |
| Upload file | Optional | One supporting file. **Max 10 MB**, all file types. |

**Notes**
- Edit a comment later via the **pencil icon** on the comment.
- Comments show newest-first; **Show older comments** reveals the rest once there are more than five.

---

# Task: Create a task from a case

Assign a follow-up action to a colleague.

**Flow**
1. On the case detail page, in the **Tasks** tile, click the **+** (Add task). *(Writers only; hidden when the case is closed.)*
2. In **Add new task**, enter a **Title**, search and pick an **Assignee**, and write the **Notes**.
3. Click **Save**. The task appears in the Tasks list and in the assignee's **Open tasks** tab.

**Fields**

| Field | Required? | Purpose / rules / limits |
| --- | --- | --- |
| Title | ✅ Required | Task headline. Up to **100 characters**. |
| Assignee | ✅ Required | Search staff and pick who the task is for. |
| Notes | ✅ Required | What needs doing. Up to **250 characters**. |

**Notes**
- All three fields are required — **Save** stays disabled until each is filled.
- A new task starts in an **open** state and is visible to the assignee under **Track my notes → Open tasks**.

---

# Task: Edit / update a task

Change a task's details or move it through its statuses.

**Flow**
1. Open the task: on the case detail page click its **pencil** (in the Tasks list), or from **Track my notes → Open tasks** expand the row and click **Edit task**.
2. In **Edit task**, change the **Title**, **Assignee**, **Status** (Open / Completed / Cancelled), or **Notes**.
3. Click **Save**. A success toast confirms it.

**Fields**

| Field | Required? | Purpose / rules / limits |
| --- | --- | --- |
| Title | ✅ Required | Up to **100 characters**. |
| Assignee | ✅ Required | Search and reassign to another staff member. |
| Status | ✅ Required | Open / Completed / Cancelled. The task's *current* status is shown but can't be re-picked (no-op). |
| Notes | ✅ Required | Up to **250 characters**. |

**Notes / non-obvious behaviour**
- **Save** is only enabled once you've actually changed something *and* the form is valid.
- **Delete task** asks to confirm — *"Are you sure you want to delete this task?"* with the task title and "This action cannot be undone." **Deletion is permanent.**
- You can **reassign** a task to a different colleague simply by changing the Assignee.

---

# Task: See a student's wellbeing notes (student profile)

A read-only roll-up of every note raised for one student.

**Flow**
1. Open the student's profile and select the **Wellbeing** tab.
2. **Staff to notify** lists the student's escalation contacts.
3. **Wellbeing notes** is a read-only table — **Date**, **Title**, **Priority**, **Status** — with search and pagination.

**Notes**
- This tab is **read-only**: there are no create/edit controls here. Raise or change notes from the Wellbeing area itself.

---

# Statuses / states

**Case status** (shown as a coloured tag, drives the table tabs and the case header pill):

| Status | Meaning | Driven by |
| --- | --- | --- |
| **Active** (blue) | Open case being worked | Default / set to Active |
| **Resolved** (green) | Finished — case closed; read-only | Marked Resolved |
| **Cancelled** (grey) | Closed without resolution; read-only | Marked Cancelled |

**Priority** (shape indicator on the note): **Low / Medium / High / Critical**.

**Task status**: **Open / Completed / Cancelled**.

---

# Validation & limits (quick reference)

- **Note title:** required, max **100 characters**.
- **Note description / sentiment / priority / note type / student:** all required.
- **Note attachments:** optional, ≤**10 MB** each, **.jpg / .png / .pdf / .doc / .docx**, multiple.
- **Comment title:** required, max **100 chars**; **Comment notes:** required, max **250 chars**; one optional file ≤10 MB (any type).
- **Task title:** required, max **100 chars**; **Assignee:** required; **Task notes:** required, max **250 chars**.
- **Notify parents** defaults **On** when creating a note.
- A **resolved/cancelled** case blocks all edits, comments and tasks until reopened.

---

# Not user-facing / work-in-progress — exclude from help articles

These exist in the UI/data but aren't dependable user features today. Don't write articles about them:

- **Case-status menu on the case-detail header** — currently updates only the on-screen pill; the actual save is a pending backend hookup. Document status changes via the **table batch actions** instead (those do persist). Don't tell users to resolve a case from the header pill.
- **"Reassign" a note** — the route subtitle mentions "reassign your wellbeing notes," but there is **no reassign control** for a *note's* owner in the UI. Only **tasks** can be reassigned (via the task Assignee). Don't promise note reassignment.
- **AI case summary / sentiment colouring** — auto-generated summary content; treat as informational, not something the user authors or edits. The summary's "last updated" label is a proxy date pending a dedicated field.
- **Student avatar on a case** — pulled from a second behind-the-scenes lookup; an internal detail, not a user action.
- **Metrics figures** — the per-sentiment counts and "from previous month" change are derived/aggregate numbers; don't quote them as audited reporting.
- Internal / offline-showcase data handling (`?mock=1`, fixture data) is not part of the live user experience.

---

# Behaviours worth calling out in help copy (summary)

- **Notify parents is ON by default** on a new note — switch it off if parents shouldn't be told.
- **The student on a note is fixed** — chosen at creation, can't be changed by editing.
- **Resolving or cancelling a case locks it** (read-only) until it's reopened; the batch table actions are the reliable way to change status, and they offer an **Undo**.
- **Tasks** are the assignable, trackable follow-ups — created on a case, surfaced to the assignee under **Track my notes → Open tasks**, reassignable, and **permanently deletable**.
- **What you can do depends on your role** — readers (e.g. teachers) browse and open cases; writers (pastoral staff, leaders) create notes, comment, task and resolve; view-all unlocks everyone's notes, not just your own.
