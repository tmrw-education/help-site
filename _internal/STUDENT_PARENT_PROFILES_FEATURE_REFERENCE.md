# Student & Parent Profiles — Feature & Flow Reference

> **Source of truth for help-article writers.** Describes what the Student profile (and the staff member's own Profile) does and how staff use it, in plain user terms. Exhaustive on behaviour; not a developer/architecture doc. Derived from the StaffXP app source.

---

## Purpose

The **Student profile** is the single, read-only record for one student — their details, family/caregiver contacts, medical and wellbeing information, classroom and timetable data, and a row of at-a-glance **alert icons** (custody, physical, learning, medical). Staff open it to check who a student is, who to contact, what to watch for, and where they should be. Everything on it is **view-only**: staff read and copy information, they don't edit it here.

Separately, the **Profile** page (under the user menu) is the logged-in **staff member's own account card** — their name, role, contact and work details — also read-only.

## Where it lives

| Screen | How you reach it | Who it's for |
| --- | --- | --- |
| **Student profile** (`/student/{studentId}`) | Click a **student's name** anywhere it appears (class roll, attendance lists, wellbeing cases, emergency screens), or search a name in the **global header search** and pick the student | Staff with student-profile read access |
| **Profile** (your own account) (`/profile`) | **User menu** (avatar, top-right) → **Profile** | Every signed-in staff member — their own card |

> **Note:** A student's name is a link almost everywhere it shows in the app. The same destination opens regardless of where you click from; the starting screen only affects the breadcrumb trail back.

## Who can do what (permissions)

Student profiles are gated by student-profile permissions. The staff member's role decides what they get.

| Capability | Needs |
| --- | --- |
| Open and read a student profile (all tabs) | **Student-profiles read** access |
| Find a student via the global header search | **Student-profiles search** access |
| Open your own Profile page | Any signed-in staff member (no special permission) |

- A staff member **without student-profiles read** access cannot open `/student/{id}` — the route is blocked by the permission guard.
- A staff member **without student-profiles search** access does not get the student-results section in the header search (they can still search for pages).
- There is **no "write" or "edit" capability anywhere on the student profile** in this app. Every field is read-only; staff view and copy, never change. (Editing a student's record happens in the source system, not here.)
- The four alert icons, every tab, and every field appear the same for any staff member who can open the profile — there is **no per-field "leader sees more" tiering** within the profile. Visibility of an *individual* alert/field depends on the **student's data** (e.g. the Medical alert only lights up if that student has a medical condition on file), not on the viewer's role.

---

# Task: Find and open a student profile

The most common entry point — you have a student's name and want their record.

**Flow — from a student's name (most common)**
1. Find the student's name on any screen that lists students — a **class roll**, an attendance list, a wellbeing case, an emergency screen, etc.
2. **Click the name.** The student's profile opens at the **At a glance** tab.

**Flow — from search**
1. Open the **search** in the top toolbar.
2. Type at least **2 characters** of the student's name. Results appear after a short pause as you type.
3. Results are split into **pages** (places in the app) and **students**. Click the student row to open their profile.

**Notes / non-obvious behaviour**
- Opening from a class roll carries the **class context** into the breadcrumb, so the trail reads *Home › Attendance › {Class} › {Student}* and the back-link returns you to that roll. Opening from search or a context with no class gives a shorter *Home › {Student}* trail.
- The profile header shows the student's **name**, and as inline attributes their **Student ID**, **House**, and **Enrolment status**.
- Student search needs the **student-profiles search** permission; without it the students section of the search simply doesn't show.

---

# Task: View a student's details and alerts (At a glance)

The landing tab. A photo, the core identity fields, the **alert icons**, shared documents, and a key to what each alert means.

**Flow**
1. Open a student profile (it lands on **At a glance**).
2. Read the **Student details** block: photo, **Name**, **Surname**, **Preferred name**, **Gender**, **Age**, **Date of birth**, **First language**, **Nationality**.
3. Over the photo, check the **alert icon row** — four coloured icons (see *Statuses / states*). A **fully coloured** icon means that alert is active for this student; a **muted/greyed** icon means it's not on file. **Click an active icon** to open a short pop-up explaining it.
4. **Shared documents** lists any **Individual education plan (IEP)**, **diagnosed learning disability**, or **medical plan** document attached — click to view/download. If none are attached, the section says so.
5. **Alert descriptions** is a static key explaining all four alert types.

**Fields shown** (all read-only)

| Field | Notes |
| --- | --- |
| Photo | Student's photo, or a placeholder if none is on file. |
| Name / Surname / Preferred name | Identity. |
| Gender / Age / Date of birth | — |
| First language / Nationality | — |
| Shared documents | Links to IEP, learning-disability, and medical-plan documents when present. |

**Notes / non-obvious behaviour**
- The **alert icons appear in the same fixed order for every student** (custody, physical, learning, medical) so the row reads consistently — inactive ones stay in place but greyed, rather than disappearing.
- **Clicking an active alert icon** opens a small pop-up with a short explanation and, where relevant, a shortcut: the **Custody** pop-up links straight to the **Caregivers** tab; the **Learning** pop-up links IEP / learning-disability documents; **Medical** points you to the Medical plan and Wellbeing tab; **Physical** shows a generic note (see *Exclude* — physical detail isn't captured yet).
- Muted (inactive) alert icons are **not clickable**.

---

# Task: View a student's demographics

Fuller identity, residency, transport, visa information, and enrolled siblings.

**Flow**
1. On a student profile, open the **Demographics** tab.
2. Read the three blocks below.

**Fields shown** (all read-only)

| Block | Fields |
| --- | --- |
| **Student details** | Name, Surname, Preferred name, Gender, Age, Date of birth, First language, Nationality, Academic year group, Commencement year, Roll group, **Residential student** (Yes/No), **School transport** (Yes/No), Interest survey |
| **Visa information** | Visa number, Visa type, Issuing country, Place of issue, Number of entries, Date of issue, Date of expiration, Stay duration, Visa remarks (remarks only shown when present) |
| **Enrolled siblings** | A table: **Name**, **Relationship type**, **Academic year group**, **Date of birth**. Shows "No enrolled siblings" if there are none. |

**Notes**
- Any field with no value shows a dash (**—**). This is normal, not an error.

---

# Task: View a student's parents, caregivers and emergency contacts

Who the family is, how to reach them, custody status, and who's authorised to collect or be contacted.

**Flow**
1. On a student profile, open the **Caregivers** tab.
2. Read the sections in order: **Parent 1**, **Parent 2** (if recorded), **Custody arrangements**, **Emergency contacts**, **Authorised contacts**.

**Fields shown** (all read-only)

| Section | Fields |
| --- | --- |
| **Parent 1 / Parent 2 — Contact details** | First name, Last name, Parent preferred name, Relationship to student, Home address, "Same as residential address" tick, Mailing address (shown when different), Parent's email, Communication preference, Phone number, Work, WhatsApp |
| **Parent — Visa and passport details** | Visa type, Visa name, Visa sub-class, Visa effective, Visa expiry, Passport number |
| **Custody arrangements** | A single read-only tick: **Custody arrangements in place** |
| **Emergency contacts** (table) | **Contact full name**, **Emergency ranking**, **Address**, **Phone number** |
| **Authorised contacts** (table) | **Contact full name**, **Address**, **Phone number** |

**Notes / non-obvious behaviour**
- **Home address, mailing address, email and phone numbers have a copy button** next to them — click it to copy the value to your clipboard (handy for dialling or pasting into an email). The copy button only shows when there's actually a value.
- A second parent's section **only appears if a second parent is recorded**.
- The **"Same as residential address"** tick is read-only and reflects what's on file; when the mailing address differs, the separate **Mailing address** field appears.
- This tab is the destination the **Custody alert** pop-up links to — it's where you check who may collect a student before releasing them.

---

# Task: View a student's medical information

Medical condition, medication, care/medical plans, vaccination record, and the student's doctor.

**Flow**
1. On a student profile, open the **Medical** tab.
2. Read **Medical details** then **Doctor details**.

**Fields shown** (all read-only)

| Section | Fields |
| --- | --- |
| **Medical details** | Medical condition name, Severity, **Medication required** (Yes/No), Start date, End date, plus document links: **View care plan**, **View medication plan**, **View vaccination record** |
| **Doctor details** | Doctor name, Medical centre name, Medical centre address, Medical centre phone |

**Notes / non-obvious behaviour**
- **View vaccination record** opens a pop-up showing the **latest** vaccination record: student info, **Is vaccinated** / **Parent consent** ticks, vaccination and administered dates, and links to the vaccination card / card URL plus any extra details. The button only appears when a vaccination record exists; otherwise the tab says none is attached.
- Care plan, medication plan and vaccination links each show a "nothing attached" line when the document isn't on file.
- This tab is where the **Medical alert** pop-up sends you for condition and medication detail.

---

# Task: View a student's wellbeing notes

All wellbeing cases/notes raised for the student, plus who to notify.

**Flow**
1. On a student profile, open the **Wellbeing** tab.
2. **Staff to notify** lists the contacts to escalate to for this student (or "No staff to notify").
3. **Wellbeing notes** is a searchable table of every note raised for the student.

**Fields shown**

| Section | Fields |
| --- | --- |
| **Staff to notify** | Read-only list of escalation contacts. |
| **Wellbeing notes** (table) | **Date**, **Title**, **Priority** (Low / Medium / High / Critical, shown as an icon), **Status** (the wellbeing case status, shown as a coloured tag). Searchable; paginated (10/25/50/100 per page). |

**Notes**
- This table is **read-only** — it shows wellbeing notes; raising or managing a wellbeing case happens in the Wellbeing feature, not here.
- Empty states: "No wellbeing notes yet" when there are none, or an error message you can retry.

---

# Task: View a student's classroom and learning information

Learning programme, courses, attendance percentage, and disability/learning-difficulty detail.

**Flow**
1. On a student profile, open the **Classroom management** tab.
2. Read **Learning programs**, **Attendance**, and **Disability and learning difficulties**.

**Fields shown** (all read-only)

| Section | Fields |
| --- | --- |
| **Learning programs** | Curriculum type, Learning mode, Specialised program, **Timetable** (free-text), and a **Courses** table: Name, Code, Educational institution, Begin date – End date, Exit reason |
| **Attendance** | **Attendance percentage** (the student's overall attendance) |
| **Disability and learning difficulties** | Diagnosed disability (Yes/No), Category of diagnosed disability, Condition of diagnosed disability, Diagnosed learning disability (Yes/No), Category of diagnosed learning disability, plus a link to the **diagnosed learning disability document** (or a "none attached" line) |

**Notes**
- The Courses table shows "No courses" when empty.

---

# Task: View a student's timetable

What the student has on today.

**Flow**
1. On a student profile, open the **Timetable** tab.
2. **Today's Timetable** lists the day's classes: **Period**, **Full class name**, **Room number**, **Start and end time**.

**Notes / non-obvious behaviour**
- The **class happening right now** is tagged **"Now"** (a blue tag next to the class name), based on the current time against each class's start/end time.
- Empty fields show a dash; an empty timetable shows a "nothing scheduled" message.

---

# Task: View your own profile (staff account)

Your own staff account card — name, role, contact and work details.

**Flow**
1. Open the **user menu** (your avatar, top-right).
2. Click **Profile**.
3. The page shows your avatar and name, with **Role** and **Department** as header attributes, then three cards:
   - **Personal Information** — First name, Last name, Pronouns, Birthday.
   - **Professional Information** — Work email address, Phone number.
   - **Work Information** — Job title, Company, Department, Business address, Office location.

**Notes / non-obvious behaviour**
- Everything is **read-only** — this is a view of your account, not an editor. (Profile data comes from your organisation's directory.)
- **Only fields that have a value are shown** within a card; a card with nothing on file shows "Not provided."
- This page is reached from the user menu only; it is **not** the same as the Student profile and shows no student data.

---

# Statuses / states (the four student alerts)

Each student carries four alert slots, shown as coloured icons over their photo on the **At a glance** tab. An alert is either **active** (full colour, clickable, opens a detail pop-up) or **inactive** (muted/greyed, not clickable).

| Alert | Icon meaning | Active when (what drives it) |
| --- | --- | --- |
| **Custody alert** | A custody order limits who may collect the student — check Caregivers before releasing or contacting family | The student has a custody flag on file |
| **Physical alert** | A recorded physical accommodation (mobility, sensory, assistive equipment) — plan layout, evacuation, PE accordingly | The student has the "special" flag on file *(interim — see Exclude)* |
| **Learning alert** | A diagnosed learning-support need — refer to the IEP for adjustments | The student has a diagnosed learning difficulty on file |
| **Medical alert** | An active medical plan (allergies, medication, condition protocols) — review before excursions/sport/first aid | The student has a medical condition on file |

---

# Validation & limits (quick reference)

- The entire Student profile and the Profile page are **read-only** — there are no forms to submit, no character limits, no required fields, and nothing to save.
- **Header search:** needs at least **2 characters** before student results appear; results are capped (a handful of top matches).
- **Wellbeing notes table:** paginates at 10 / 25 / 50 / 100 per page.
- Missing values display as a dash (**—**) or a "not available"/"none attached" line — this is expected, not an error.

---

# Not user-facing / work-in-progress — exclude from help articles

These exist in the code/data but are **not usable, partial, or internal** today. Don't write articles about them, and don't describe them as live features:

- **Physical alert detail.** The Physical alert lights up from an interim "special" flag and its pop-up only shows a generic note — *specific physical-accommodation detail is not captured yet* (a dedicated field is a pending backend change). Document the alert exists and what it means, but don't promise detail behind it.
- **Felix "student profile" and "academic record" chat cards.** Asking Felix for a student's profile or academic record returns a card — but this is **showcase/demo-only mock content pinned to one demo student (Anya James)**, generated offline with no live backend. The **academic record has no real screen or route in the product** at all (it exists only as the Felix demo card and a `/dev` design lab). Do **not** write a "view a student's academic record" or "ask Felix for a profile" help article — these are not live, generally-available features.
- **Unused profile sections in the codebase** — *Achievements*, *Community*, an *At-a-glance insight card*, *Student stats*, and a *Table of contents* component exist in the source but are **not wired into the live seven-tab profile** (the tabs are: At a glance, Demographics, Caregivers, Classroom management, Medical, Wellbeing, Timetable). Ignore them.
- **The wellbeing-tab avatar / second student lookup, and the per-student attendance-percentage source** carry developer TODOs — they don't change what the user sees today, so nothing to document.
- **Showcase/offline-only behaviours** (mock data when there's no backend, `?mock=1` / `?role=` / `?mockAlerts=1` review flags, DiceBear placeholder avatars in dev) are not part of the live user experience.

---

# Behaviours worth calling out in help copy (summary)

- **The student profile is entirely read-only** — staff view and copy information across seven tabs (At a glance · Demographics · Caregivers · Classroom management · Medical · Wellbeing · Timetable); they never edit a student's record here.
- **A student's name is a link almost everywhere** — click it to open the profile; where you click from sets the breadcrumb back-link, not the content.
- **The four alert icons are the headline** — custody, physical, learning, medical; full colour = active and clickable, muted = none on file. Each active icon's pop-up routes you to the right tab/document. **Whether an alert shows depends on the student's data, not your role.**
- **The Caregivers tab has copy buttons** on addresses, emails and phone numbers — and is where the Custody alert sends you to check who may collect a student.
- **Permissions are coarse:** read access opens the whole profile; search access powers finding students in the header search; there is no in-app edit. The **Profile** page (user menu) is your *own* account, read-only, separate from any student.
- **Don't document the academic-record or Felix-profile cards as real features** — they're demo-only — and don't promise detail behind the Physical alert.
