# Attendance — Feature & Flow Reference

> **Source of truth for help-article writers.** Describes what the Attendance feature does and how staff use it, in plain user terms. Exhaustive on behaviour; not a developer/architecture doc. Derived from the StaffXP app source.

---

## Purpose

Attendance is how the school records who is present each day. Teachers take the daily **roll** (mark present / absent / late and submit); attendance officers correct and resolve marks; school leaders watch attendance across the whole school, spot at-risk students, and run **emergency attendance** (an evacuation/lockdown headcount). It spans four jobs: *taking the roll*, *overseeing rolls*, *analysing patterns*, and *emergency muster*.

## Where it lives

The **Attendance** landing page is role-aware — the same "Attendance" nav item opens a different screen depending on who you are.

| Screen | How you reach it | Who it's for |
| --- | --- | --- |
| **Attendance** (teacher) (`/attendance`) | "Attendance" in the main navigation | A regular teacher — shows the **today calendar** + three top-10 stat cards. |
| **Attendance overview** (leader) (`/attendance`) | "Attendance" in the navigation | A **school leader** — whole-school dashboard (auto-shown instead of the teacher view). |
| **Attendance overview** (officer) (`/attendance`) | "Attendance" in the navigation | An **attendance officer / admin** — same dashboard plus the officer tab set. |
| **Class roll** (`/class/:classId/attendance`) | Click a class on your calendar, a Felix prompt, or a roll reminder | The teacher marking that class. Leader/officer variants add `/leader` and `/admin` to the URL. |
| **Attendance analytics** (`/attendance/analytics`) | "View analytics" on the teacher page; "View trends" tiles | Anyone with attendance-analytics access — charts + at-risk table. |
| **Attendance trends** (`/attendance/trends`) | "View trends" tiles on leader/officer dashboards | Leaders / officers — pattern bar charts. |
| **Emergency coordinator** (`/attendance/emergency-coordinator`) | Appears during an active emergency | Emergency coordinators / leaders — live muster overview. |
| **Muster coordinator** (`/attendance/muster-coordinator`) | Appears during an active emergency | Muster-point coordinators — their muster point's headcount. |
| **Emergency analytics** (`/attendance/emergency`) | "Attendance" › Emergency (history) | Leaders — past-incident history + timings. |
| **Emergency details** (`/attendance/emergency/details/:id`) | Click an incident in Emergency analytics | Leaders — one incident's full report. |

> The **Emergency** declare/end buttons live in the top app toolbar, not on an Attendance page. See *Start an emergency roll* and *End an emergency*.

## Who can do what (permissions)

A staff member's role decides which screens and actions they get.

| Capability | Needs |
| --- | --- |
| See the Attendance landing page, open a class roll (read-only) | **Attendance read** |
| Mark students and **submit** a roll; bulk "mark all"; off-roll add | **Attendance write** (e.g. teachers, relief teachers) |
| See the **leader dashboard** (whole-school tiles, today's attendance gauge, roll reminders, students-at-risk, class-rolls list) | **School leader** |
| See the **officer dashboard** + officer tabs (Leave requests, Class rolls, Unresolved attendance, Correction requests, Resolved requests); change a mark to a specific **category** (e.g. Excused: Sick) and override the past-date / approved-absence locks | **Attendance officer / admin** |
| See **Attendance analytics / trends** | **Attendance-analytics read** |
| **Declare** an emergency | **School leader** (holds *emergency activate*) |
| **End** an emergency | **School leader** (holds *emergency deactivate*) |
| Coordinate the muster / see all classes' emergency status | **Emergency coordinator** / **Muster coordinator** / leader |

- Staff **without write access** can open a roll but every status icon is **disabled** (read-only) and **Submit** stays greyed out.
- **The Emergency button is School-Leader-only.** Other roles never see the declare/end controls, even though everyone takes the emergency roll once it's declared.
- A **relief teacher** takes rolls like a normal teacher; their emergency-submit confirmation message is worded slightly differently ("Emergency roll submitted successfully") but the flow is identical.
- The roll's **bulk "mark all" dropdown** and tappable cells are hidden/disabled for anyone without write access.

---

# Task: Take the daily roll (mark present / absent / late)

The core teacher task. Open a class, mark each student, submit.

**Flow**
1. Get to the roll: from the **Attendance** page click your class on the **calendar**, follow a **roll reminder**, or ask Felix ("take the roll").
2. The page header shows the **class name**, the **period and student count** (e.g. "Period 2 · 24 students"), and the date.
3. The **Attendance roll** table lists every student with an avatar, name (first name bold), today's editable column on the right, up to **4 prior sessions** to its left (read-only), and an **Attendance %** column.
4. For each student, click the **status icon** in today's column to open the menu and pick **Present**, **Absent**, or **Late**. (The menu only shows the statuses you *aren't* already on.)
5. When **every** student has a status, the **Submit** button enables. Click **Submit**.
6. A success toast confirms — "Attendance submitted". If you came from a roll reminder and other classes still need rolls, the toast offers a **"Take roll for [next class]"** shortcut.

**Notes / non-obvious behaviour**
- **Submit is gated:** for a teacher it stays disabled until *every visible student* has a real status (no one left on "Not yet marked"). You can't part-submit a roll.
- A roll shows the **whole class on one page** — there's deliberately no pagination to click through, so nobody gets missed. (A pager only appears if a list is unusually huge.)
- The prior-session columns to the left are **read-only history** — you can only mark **today's** column.
- The roll **auto-refreshes** roughly every minute while open.
- **"Not yet marked"** (the `···` default) is the MIS "Staff to advise" state — it counts as unmarked and blocks Submit.
- The roll can't be submitted while **offline** — Submit disables.
- See *Read the attendance key* for what each glyph means, and *Mark a whole column at once* for the bulk action.

---

# Task: Mark a whole column at once (bulk mark / reset)

A shortcut to set every student in today's session in one go.

**Flow**
1. On the roll, click the **action control on the today column header**.
2. Choose **mark all Present** / **mark all Absent** (the menu reflects the column's current state).
3. Use the **reset** option to clear your pending marks for that column.

**Notes**
- Bulk "mark all" **skips students who already hold an approved absence** — it won't overwrite a resolved absence.
- This is **write-access only**; the control is hidden for read-only staff.
- Bulk marking still leaves you to click **Submit** — it doesn't auto-save.

---

# Task: See a student's day at a glance (expand a roll row)

Each roll row opens a quick-glance card with cross-class context.

**Flow**
1. On the roll, click the **expand chevron** at the start of a student's row.
2. The card shows:
   - **Alert icons** (safeguarding / medical / learning / custody) — click one for its detail.
   - The student's **preferred name**, **house**, **first language**, and **age** (where known).
   - **Today · all classes** — a timeline of the student's whole day across *every* class, with **your** period ringed, and a one-line summary ("2 present · 1 late today").
   - An **Attendance rate** big number on the right.

**Notes**
- The expanded card loads its data **only when you open the row** (a small lazy fetch).
- The "Today" timeline is **cross-class** — it shows lessons you don't teach, so you can see "present in my class but absent period 5".

---

# Task: Read the attendance key (status glyphs)

The roll uses icons, not words, in each cell. The key explains them.

**Flow**
1. On the roll, click the **information (ⓘ)** icon next to the "Attendance roll" title.
2. The key groups the statuses:
   - **You set:** Present, Absent, **Unresolved late**.
   - **System:** **Approved absence** (resolved elsewhere), **Not yet marked** (the default before you mark).

**Notes**
- "Not yet marked" is what the empty `···` cell means — there's still work to do on that student.
- **Approved absence** cells aren't editable by a teacher (they were resolved by an officer); clicking one opens the absence's details instead of a status menu.

---

# Task: Change the roll date

View or take a past session instead of today.

**Flow**
1. On the roll toolbar, click the **calendar icon** ("Change attendance date").
2. Pick a date in the popover.

**Notes**
- Past sessions open **read-only for teachers** — you can review marks but the cells are locked. (An attendance officer can still edit a past date.)
- The chosen date rides in the URL, so a link to a specific day's roll is shareable.

---

# Task: Search and filter the roll

Find a student fast, or focus on flagged students.

**Flow**
1. Use **Search students…** in the roll toolbar to filter by name.
2. Use the **filter** control to show only students carrying an alert: **Physical / wellbeing**, **Medical**, **Custody**, or **Learning** flag.

**Notes**
- Filters combine with search; reset clears the alert filters.

---

# Task: Print the roll

Get a paper copy of a class roll.

**Flow**
1. On the roll toolbar, click the **print** icon.
2. The attendance document is fetched and sent to your printer.

**Notes**
- Printing needs a **live connection** — it fails with a message if you're offline.

---

# Task: Correct an already-submitted mark (request a correction)

Submitted rolls are locked. To fix a mistake, a teacher logs a **correction request** via Felix; an officer resolves it.

**Flow**
1. Ask Felix something like "I need to correct an attendance mark" / "fix the roll".
2. Felix explains submitted rolls are read-only and opens a **correction form** pre-filled for a recent session.
3. Set the **corrected mark** and a **reason**, then submit.

**Notes**
- A teacher **cannot** edit a submitted roll directly — the correction request is the only route.
- The request lands in the officer's **Correction request** tab to approve/resolve (see *Officer dashboard*).

---

# Task: Use the teacher Attendance page (calendar + top-10 cards)

The regular-teacher landing screen.

**Flow**
1. Open **Attendance**.
2. The page shows three stat cards and a **calendar**:
   - **Late students** (all classes today) — **Show top 10**.
   - **Unexcused absences** (all classes today) — **Show top 10**.
   - **Absent students** (this month, assessment days) — **Show top 10**.
3. Each card's **Show top 10** opens a modal list of the students.
4. The **calendar** shows your day's classes; click a class to open its roll.
5. **View analytics** (top right) goes to Attendance analytics (only enabled if you have analytics access).

**Notes**
- Each card's count is **clickable trend data** with a "from yesterday / previous month" change.
- See *Not user-facing* — the **Unexcused absences** card runs on placeholder data until its endpoint ships.

---

# Task: Use the leader / officer dashboard (Attendance overview)

What a school leader or attendance officer sees instead of the teacher page.

**Flow**
1. Open **Attendance** — leaders/officers get **Attendance overview** automatically.
2. Top row of tiles:
   - **Roll reminders** — count of classes that haven't submitted; **View all** lists them (teacher · class · period · outstanding count).
   - **Students at risk** — count below the attendance threshold; **View all** opens the at-risk list.
   - **View trends** — jumps to Attendance trends.
3. Chart row: **Today's attendance** (gauge, filterable by Present/Absent/Late), **Attendance errors** (correction sources), **Attendance category** (Present/Late/Absent split). Each carries an AI-style summary line.
4. Below: a **Class rolls** list/table (see *Find and open any class roll*). Officers also get the **officer tabs**.

**Notes**
- The dashboard is the same for leaders and officers except officers get the extra **tab set**.

---

# Task: Find and open any class roll (leader / officer)

Drill into any class's roll from the dashboard.

**Flow**
1. On the dashboard, use the **Class rolls** table.
2. **Search** by class or teacher; **filter** by year group; set a **date range** via the calendar trigger.
3. Click a **class name** to open that roll.

**Notes**
- A leader opens the roll via the **leader** variant; an officer via the **admin** variant — both are the same roll screen with the officer's extra editing powers when applicable.
- The roll inherits the class's **year-group attendance setting** (AM/PM *or* Period — never both).

---

# Task: Resolve and correct marks (officer tabs)

Attendance officers work through requests and unresolved marks in tabs on the dashboard.

**Flow**
1. On the **Attendance overview**, the officer tab bar shows:
   - **Leave requests** — approve/decline parent-submitted leave.
   - **Class rolls** — open any roll to edit.
   - **Unresolved attendance** — marks needing a resolution category.
   - **Correction request** — teacher correction requests to action.
   - **Resolved requests** — the history of resolved items.
2. Open the relevant tab and work the list.

**Notes — officer-only powers on a roll**
- When an officer changes a cell, a **category picker** opens — they pick the specific reason (e.g. Absent → *Excused: Sick / Holiday*), not just Present/Absent/Late.
- Officers can **edit past-dated rolls** and **change approved absences** — the teacher-side date lock and resolved-absence lock don't apply to them.
- An officer's submit sends **partial corrections** — they don't need every student marked (the all-marked gate is teacher-only).
- Cells an officer has changed show a **hover tooltip** with the correction history.

---

# Task: View attendance analytics (charts + at-risk table)

The analytics screen — patterns, risk banner, and the at-risk student list.

**Flow**
1. Open **Attendance analytics** (from the teacher page's **View analytics**, or a trends tile).
2. The page shows:
   - An **at-risk banner** with a **flagged-students** action that opens the at-risk modal.
   - Stat cards: **Attendance rate** (with a "below threshold" warning when low), **Late students**, **Unexcused absences**, **Absent students**.
   - **Trends** charts (attendance trend line, absence timing, absence by day) — filterable **by class**.
   - An **at-risk table** filterable by **year group** and risk level.

**Notes**
- This whole page currently runs on **demo/sample data** (see *Not user-facing*) — useful for showing the shape of the feature, but don't write articles implying the numbers are live.

---

# Task: View attendance trends (pattern bar charts)

Leader/officer view of timing patterns.

**Flow**
1. Open **Attendance trends** (a **View trends** tile).
2. Filter by **period**, **class**, and **year**.
3. Three bar lists show: **Absence timing trends**, **Tardiness timing trends**, **Learning-area attendance trends**, each with a summary line.

**Notes**
- The **filters are visual only right now** — the sample data isn't bucketed by period/class/year yet (see *Not user-facing*).

---

# Task: Start an emergency roll (declare an emergency) *(leader only)*

Flips the whole school into evacuation/lockdown attendance.

**Flow**
1. In the **top app toolbar**, click the red **Emergency** button (School-Leader-only).
2. The **Initiate emergency protocol** dialog opens. Choose an **Incident type** (required) and optionally type a **Message to staff** (max **100 characters**).
3. Click **Confirm**.

**What it does (non-obvious)**
- It **immediately notifies all staff** and **requires emergency attendance submission** — every teacher's roll flips into a stripped-down **Emergency roll**.
- The action is **logged with the leader's name and timestamp**.
- The app gains an emergency banner state; emergency-coordinator and muster-coordinator screens become available.

---

# Task: Take the emergency roll (mark present / missing)

What every teacher does once an emergency is declared — a fast, focused headcount.

**Flow**
1. Your open roll becomes the **Emergency roll** (red "Emergency roll" tag in the header).
2. The table strips back to two columns: **Student name** and **Emergency roll**. Per-period history and Attendance % are hidden so nothing competes with marking.
3. Tap each student **Present** or **Missing** (or use the **mark all** header action). A live **Unmarked / Missing / Present** counter strip sits in the card header.
4. Add a **note** to a student where needed.
5. Click **Submit** to send your class's emergency status.

**Notes**
- Emergency mode has **no Submit-gate on all-marked** — you submit what you have, fast; coordinators chase the rest.
- There's **no date picker, no print, no birthday cue** in emergency mode — it's deliberately minimal.
- Submitting shows a confirmation ("Your class roll has been submitted").

---

# Task: Add a student who isn't on your roll (off-roll / "Students not on roll")

In an emergency, account for students physically with you who belong to another class.

**Flow**
1. On the **Emergency roll**, click **Students not on roll** (shows a count when any are added).
2. In the modal, click **Add**, **search and pick** the student, and add an optional **reason** (max **100 characters**).
3. Added students appear in a **"Not on roll"** group below your roll, marked **Present**, each with a **Remove** and an **Edit/add note** action.

**Notes**
- Off-roll students count toward your **Present** total.
- The same student **can't be added twice** — you'll get an "Already added" warning.
- Removing a row offers a brief **Undo**.

---

# Task: Coordinate the muster (coordinator views) *(during an emergency)*

How coordinators watch the whole evacuation.

**Flow**
- **Emergency coordinator** (`/attendance/emergency-coordinator`): a live **muster table** of all classes/muster points plus a **Cleared classes** table. Leaders also get the **Turn off emergency protocol** action here.
- **Muster coordinator** (`/attendance/muster-coordinator`): the coordinator's **own muster point** headcount + cleared classes for that point.

**Notes**
- These pages only exist **while an emergency is active**.

---

# Task: End an emergency *(leader only)*

Return the school to normal attendance.

**Flow**
1. With an emergency active, the leader clicks **Turn off emergency protocol** (in the header / emergency-coordinator page).
2. Confirm in the **Turn off emergency protocol** dialog.
3. A confirmation toast with a timestamp confirms the emergency has ended.

**Notes**
- **Leader-only** (holds *emergency deactivate*) — coordinators see the live data but can't end the incident.

---

# Task: Review past emergencies (emergency analytics & details) *(leader)*

After-the-fact reporting on drills and real incidents.

**Flow**
1. Open **Emergency analytics** (`/attendance/emergency`) — a history table of past incidents with timing stats (e.g. average clear time), filterable by type / term / year.
2. Click an incident to open **Emergency details** — per-class and per-muster-point **time taken**, present/absent comparison, and a printable report.

**Notes**
- Gauge bounds and historical averages on the details page are **placeholder values** pending school-configurable thresholds (see *Not user-facing*).

---

# Task: Take the roll in chat (Felix) *(showcase)*

Felix can surface and submit a roll inside the chat panel.

**Flow**
1. Ask Felix "show me my attendance roll" / "take the roll".
2. A compact in-chat roll appears with some pupils unmarked. Either tap a status icon yourself, or use the **Mark all present / Mark all absent** chips to have Felix propose a bulk mark.
3. If Felix proposes a bulk mark, it pre-fills the roll and asks you to **confirm**; confirming submits.

**Notes**
- This mirrors the page roll — it isn't a separate capability. The in-chat roll and the page roll use the same data so they never disagree.
- See *Not user-facing* for the showcase-only nature of Felix mock answers.

---

# Statuses / states

| Status | What it means | Driven by |
| --- | --- | --- |
| **Present** | Student is in class | Teacher mark (category **P**) |
| **Absent** (Unresolved) | Away, not yet excused | Teacher mark (category **UR**) |
| **Unresolved late** | Arrived late, not yet resolved | Teacher mark (category **L**) |
| **Approved absence** | Absence resolved/excused (e.g. Sick, Holiday) | Set by an officer / system (EA-\* categories) — **read-only to teachers** |
| **Not yet marked** ("Staff to advise") | The default before marking | No mark set (category **SU-S**) — **blocks Submit** |
| **Emergency: Present / Missing** | Headcount during an emergency | Teacher emergency mark |

> Officers can set finer **category** reasons under Absent / Late / Approved absence; teachers only see the five simple states above.

---

# Validation & limits (quick reference)

- **Take roll:** every student must have a real status before **Submit** enables (teacher); officers can submit partial corrections.
- **Roll page size:** whole class on one page (no pagination unless a list is unusually large).
- **Roll history:** today's column editable; up to **4 prior sessions** shown read-only; a ~2-week window is fetched behind the scenes.
- **Past dates:** read-only for teachers; editable for officers.
- **Approved absences:** not editable / not overwritten by teachers or bulk "mark all".
- **Emergency message to staff:** optional, **max 100 characters**.
- **Off-roll reason:** optional, **max 100 characters**; no duplicate students.
- **Print / Submit:** require a live connection (disabled offline).
- **Emergency declare:** Incident type **required**.

---

# Not user-facing / work-in-progress — exclude from help articles

These exist in the UI/data but aren't usable live today, are placeholder, or are demo-only. Don't write articles about them, and drop these fields:

- **Attendance analytics page (`/attendance/analytics`)** runs entirely on **bundled sample data** — the charts, attendance-rate, late/unexcused/absent counts and at-risk table are not yet wired to a live endpoint. Document the *shape* of the feature, not the numbers.
- **Attendance trends page (`/attendance/trends`)** — the **period / class / year filters are visual only**; the sample data isn't bucketed by those dimensions yet. Don't tell users the filters change the data.
- **"Unexcused absences" top-10 card** (teacher page) — its endpoint isn't built; production shows "—" and suppresses the trend. Don't document the count as authoritative.
- **Emergency details gauges** (average clear time / mark time / muster time bounds + historical averages) are **hardcoded placeholders** pending school-configurable thresholds — don't quote the figures.
- **Per-student "this class" vs "overall" attendance %** — today there's a single attendance-percentage field shown in both the roll column and the expanded card; the separate class-scoped rate is a pending backend change. Treat the % as one number, not two.
- **Roll "View" batch action** and a couple of internal table affordances are stubbed (no-op) — don't document them.
- **Felix in-chat attendance answers** (show roll, bulk-mark proposal, correction form, "who's away") are **showcase/offline mock responses** that mirror the real roll. The real Felix routes through the live agent — don't describe the canned demo wording as guaranteed behaviour.
- **Leader/officer dashboard sample figures** (roll-reminder counts, attendance-error breakdown, some AI summary lines) include demo/mock values in the showcase build — the *layout and tasks* are real, the specific numbers aren't.
- **The `/studentAttendance/:classId` route** is not a standalone page a user navigates to — it backs a Felix chat card. Don't write a "student attendance page" article.

---

# Behaviours worth calling out in help copy (summary)

- **A teacher's roll won't submit until everyone is marked** — "Not yet marked" students block Submit. (Officers can submit partial corrections.)
- **Once submitted, a roll is locked** — fixing a mistake means a **correction request** (via Felix), which an officer resolves. There's no direct edit of a submitted roll.
- **The Attendance landing page is role-aware** — teachers get a calendar + cards, leaders/officers get a whole-school dashboard, all from the same nav item.
- **Emergency mode is a different, minimal roll** — Present/Missing only, no all-marked gate, plus an off-roll "students not on roll" path. Only a **School Leader** can declare or end it; everyone takes the roll.
- **Officers have extra power on a roll** — finer absence categories, editing past dates, and overriding approved-absence locks that stop teachers.
- **History on the roll is read-only** — you only ever mark *today's* column; prior sessions and approved absences are look-but-don't-touch.
