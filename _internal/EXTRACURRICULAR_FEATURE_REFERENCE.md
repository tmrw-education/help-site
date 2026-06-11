# Extra-curricular activities — Feature & Flow Reference

> **Source of truth for help-article writers.** Describes what the Extra-curricular (ECA) feature does and how staff use it, in plain user terms. Exhaustive on behaviour; not a developer/architecture doc. Derived from the StaffXP app source.
>
> **Scope note:** "Extra-curricular" covers the school's ongoing **clubs and teams** (Choir, Lego, Basketball A-Team, Model UN, etc.) — activities with enrolment, a registration window, and recurring meetings. It is a **separate feature** from **Activities** (excursions/camps/one-off events). This doc covers only the `/extra-curricular` surface. Where the two overlap (request statuses, the request review screen), the behaviour described here is the ECA copy.

---

## Purpose

Extra-curricular lets staff plan and run the school's clubs and teams. A teacher requests a new activity through a long, multi-step planning form (activity details, venue, attendees, costs, resources and a full risk assessment). The request is reviewed and approved by a coordinator/leader. Once approved, the activity is open for enrolment, appears on the school's extra-curricular calendar, and has a details page where the activity lead manages registered participants, the waitlist, staffing and resources.

## Where it lives

| Screen | How you reach it | Who it's for |
| --- | --- | --- |
| **Extra-curricular** (`/extra-curricular`) | "Extra curricular" in the main navigation | Everyone with extra-curricular access — the hub: action cards + a set of tabs |
| **Request an extra-curricular activity** (`/extra-curricular/new`) | **Create extra-curricular activity** action card, or **Add** from a request row | Staff requesting/creating an ECA |
| **Request a duplicate** (`/extra-curricular/duplicate`) | **Replicate** (duplicate) row action on an approved activity | Staff reusing an approved activity as a template |
| **Extra-curricular calendar** (`/extra-curricular/calendar`) | **View calendar** action card | Anyone planning around scheduled ECAs |
| **Review request** (`/extra-curricular/approve/:id`) | **Review** row action on a Pending request, or clicking a Pending/More-info/Declined request link | Coordinators/leaders who approve requests |
| **Activity details** (`/extra-curricular/:id`) | Clicking the **name** of an approved activity (All activities tab), or **Replicate** opens it as a template | Activity leads managing a live, approved activity |

The hub page itself isn't restricted — staff can open it — but what each **tab** and **action** shows is permission-driven (below).

## Who can do what (permissions)

Three things drive what a user sees: their **role** (regular staff vs Activity coordinator / School leader / Superadmin), and the **approve permission**.

| Capability | Needs |
| --- | --- |
| Open the hub, browse the tabs, view the calendar, view an approved activity's details | Any staff with extra-curricular access |
| Request / create an ECA, save a draft, edit own **New/Draft** request, delete own **New/Draft** request, duplicate an approved activity, view decline/review notes on own request | Any staff (request author) |
| See the **My requests** tab (a personal filter alongside the full queue) and have the **All requests** queue default to **Pending** | **Activity coordinator**, **School leader**, or **Superadmin** |
| **Review** a Pending request and **Approve / Decline / Request more info** | **Approve-requests** permission (coordinator/leader) |
| Manage an approved activity's roster — remove a registered participant, approve or remove someone from the **waitlist** | Activity lead / staff with access to the details page |

- A regular teacher sees a single **Your requests** tab (their own requests only); coordinators/leaders/superadmins see **All requests** plus a **My requests** tab.
- The **Review** action on a Pending row, and the **Approve / Decline / More info** buttons on the review screen, appear **only** to users with approve permission. A coordinator who lacks approve rights for that specific activity is told they can't act on it.
- Row actions are **status-driven** (see *Browse* below), not just role-driven — e.g. a **New/Draft** request shows Edit + Delete to its author; an **Approved** one shows only Duplicate.

---

# Task: Browse extra-curricular activities and requests

The hub at `/extra-curricular`. Two action cards sit at the top — **Request an extra-curricular activity** (button **Create extra-curricular activity**) and **Extra-curricular calendar** (button **View calendar**) — above a set of tabs.

**Flow**
1. Open **Extra curricular** from the navigation.
2. Use the tabs to switch views:
   - **All requests** (coordinators/leaders) / **Your requests** (other staff) — the request queue.
   - **My requests** *(coordinators/leaders only)* — the same queue filtered to your own submissions.
   - **Booking status** — resource bookings tied to ECAs.
   - **Supervising activities** — approved/declined activities ("All ECAs").
   - **Staffing** — external (and internal) staff members assigned to ECAs.
3. Each table has **search**, **filters**, and **pagination** (10/25/50/100 per page).

**The "All requests" / "Your requests" / "My requests" tabs** list requests with columns **Requests** (name, a link), **Submitted** (date), **Type**, **Status**, and a row-actions cell. Search by request name; filter by **Status** and/or **Type** (combined). Row actions and the name link are **status-aware**:

| Request status | Row action | Clicking the name / action goes to |
| --- | --- | --- |
| **New / Draft** | Edit (pencil) + Delete (bin) | The request form (editable) |
| **Pending** | Review (only if you can approve) | The **Review request** screen |
| **Approved** | Replicate (duplicate) | The approved **Activity details** page |
| **Declined / Rejected / More info** | View review notes | Opens the review/decline notes; review screen for More-info |

> **Note:** The **All requests** tab opens pre-filtered to **Pending** for approvers — it's the triage queue. Clear the Pending chip to see every status. **My requests** and a teacher's **Your requests** show all statuses (you're checking your own submissions, not triaging).

> **Note:** **My requests** is a personal filter of the same queue, matched on who the activity lead is — not a separate list.

**Booking status tab** — columns **Event**, **Resource**, **Quantity**, **Picked up by**, **Return date**, **Status**. Search by event name; filter by booking status.

**Supervising activities tab** ("All ECAs") — approved and declined activities only. Columns **Name** (link → details), **Event type**, **Event start**, **Event end**, **Activity lead**, **Status**. Search across name/type/lead; filter by **Approved / Rejected**. Row action: **Replicate** on Approved rows; **View review notes** on Rejected rows.

**Staffing tab** — staff assigned to ECAs. Columns **Name**, **Role**, **Phone**, **Email**, **Consent**. Search by name; filter by role. **Consent** shows **View** (opens the clearance document) for external members with a document, **Internal** for internal staff, otherwise a dash.

---

# Task: Request (create) an extra-curricular activity

The main planning flow. Opens as a **full-page, four-step create flow** with a progress indicator in the header and a fixed action bar at the bottom. The four steps are **Activity details → Resource booking → Risk management → Review and submit**. Steps 1–3 are split into named sub-sections shown in a side rail.

**Flow**
1. From the hub, click **Create extra-curricular activity** (action card). Or, from a **New/Draft** request row, click **Edit** to resume it.
2. Work through the steps. The bottom bar carries **Save and exit** (saves a draft), **Back**, and **Next**; on the final step **Next** becomes **Submit**.
3. On **Step 4 – Review and submit**, check the summary, then **Submit**. A success message confirms the activity is created (or updated, if you were editing).

**Leaving early:** if you've made changes and try to navigate away, an **unsaved-changes** prompt appears (Stay / Leave without saving). **Save and exit** keeps a draft; it's disabled until the activity has a name.

> **Note:** You can **Save and exit** at any point to keep a draft, then resume from the **New/Draft** request row later.

> **Note:** The progress indicator lets you jump between steps you've reached. Each step/section is validated as you leave it; **Submit** stays disabled until every required field across all steps is valid.

### Step 1 — Activity details

Three sub-sections: **General information**, **Venue details**, **Attendees**.

**General information**

| Field | Required? | Purpose / rules |
| --- | --- | --- |
| Search previous activity | Optional | Type-ahead over your **approved** activities. Picking one **pre-fills** the whole form from that activity (a fast template). Dates/times that must be fresh are cleared for you (see below). |
| Extra-curricular name | **Required** | The activity name. |
| Extra activity type | **Required** | Activity type (e.g. Sport, Arts) from the school's type list. |
| Event start date | **Required** | Can't be in the past. |
| Event start time | **Required** | |
| Event end date | **Required** | Can't be before the start date; disabled until a start date is set. |
| Event end time | **Required** | Start date/time must be **before** end date/time. |
| Registration start date | **Required** | When enrolment opens. Can't be in the past. |
| Registration start time | **Required** | |
| Registration end date | **Required** | Can't be before the registration start date. |
| Registration end time | **Required** | Registration start must be **before** registration end. |
| Create a Teams for this activity | Optional | Creates a Microsoft Teams space for the activity. |
| Event image | Optional | Cover image. **Max 10 MB, image files only (.png/.jpg/.jpeg), one file.** |
| Fixtures | Optional | Schedule/fixtures document. **Max 10 MB each, .pdf/.doc/.docx, multiple files.** |

> **Note:** Picking a **previous activity** to pre-fill copies its venue, attendees, costs, resources and risk content, but **clears all dates and times** — you must re-enter the event dates, registration window and any collection/return dates so they're current.

**Venue details** — choose **On-site location** ("at the school") or **Off-site location**. You **must set the event date/time first** — until then the section shows *"Please select event date first."*
- **On-site:** add one or more rooms. Each needs a **room**, a **room configuration** (e.g. Classroom Style, Theater Style), and an **expected no. of attendees**. A room flagged as accessible shows a "physically accessible for all students" tag.
- **Off-site:** add one or more venues. Each needs **venue name, address, phone, email, website, contact name, contact email, and contact position** — all required; phone and emails are format-checked.

> **Note:** Switching between On-site and Off-site **clears** the other type's entries.

**Attendees**

| Field | Required? | Purpose / rules |
| --- | --- | --- |
| Student group(s) | **Required** (at least one) | Add one or more **student groups**: pick a **group type** (House / Year group / Roll group / Class) then the specific group. Use **Add student group** to add more; removing a group asks to confirm. |
| Student requirements | **Required** | Free text — equipment, uniforms, personal items, etc. |
| Max no. of students | **Required** | Must be greater than 0. |
| Enable waitlist | Optional | When on, students beyond the max join a waitlist instead of being turned away. |
| Additional staffing | Optional | Add extra staff. Each entry is **internal** (staff member + role) or **external** (name, role, email, phone, and **clearance documents** — all required for external). Removing an entry asks to confirm. |
| Staff to student ratio | **Required** | Must be set (not 0). |
| Cost to | **Required** | Who pays: **Parent**, **Parents & School**, or **School**. This decides which amount fields are required (see below). |
| Payment due date | **Required** | |
| Amount fields | Conditionally required | **Parent** → amount per pax. **Parents & School** → amount per pax **and** amount. **School** → amount. Each must be > 0. |
| Accessibility considerations | **Required** (at least one) | Tick the accommodations the activity supports (font size, vision, hearing, neurodiverse, wheelchair access, documentation, other). Choosing **Other** makes its detail text required. |

> **Note:** Approvers reviewing the request can **Exclude students** from a chosen group (a button on the Attendees section in review mode) — those students won't be enrolled when the request is approved. This control is review-only; it doesn't appear while you're creating.

### Step 2 — Resource booking

Two sub-sections: **Select resources** and **Resource collection**. **This whole step is optional** — you can skip it.

- **Select resources:** add resource rows; each row picks a **resource category** and a specific **available resource**, and (for most categories) a **quantity** that must be greater than 0. Finance, transport and "class set" equipment rows don't need a quantity.
- **Resource collection:** only relevant **if you booked a resource**. Then **Picked up by**, **Collection date** and **Return date** become required. If you booked nothing, this sub-section is skipped/disabled.

### Step 3 — Risk management

Seven sub-sections: **Student list**, **Activity based**, **Transport**, **Staff capacity**, **Key contacts**, **External provider**, **Requester clarification**.

- **Student list / Activity based / Transport / Staff capacity** — for each risk area you either **add risks** (each risk needs at least one **mitigation**) or explicitly mark the area as **no risk**. You can't leave an area blank.
- **Key contacts** — **Lead teacher**, **First aid qualified teacher**, **Principal**, **Deputy principal** (each with a phone number), plus a **Local emergency number**. Principal and deputy principal auto-fill from the school profile. All required; phone numbers are format-checked. (Nearest hospital / medical centre may also be captured.)
- **External provider** — tick the single **"I confirm all mandatory external provider checks have been completed"** box. It confirms five underlying checks (safeguarding, provider competence, staff responsibilities, evacuation plan, insurance). **Required.**
- **Requester clarification** — tick **"I confirm that all the above requirements have been met"** (supervision, participant identification, communication), and choose a **Pre-event briefing status** (Completed / Organised / To be arranged). Both **required.**

### Step 4 — Review and submit

A read-only summary of everything entered. **Back** to amend, **Submit** to create. Submit stays disabled until every step validates.

---

# Task: Duplicate (replicate) an activity

Reuse an approved activity as the starting point for a new request.

**Flow**
1. From the **All requests** tab (Approved row) or the **Supervising activities** tab (Approved row), click the **Replicate** (duplicate) icon. (You can also reach it via an approved activity.)
2. The create flow opens at `/extra-curricular/duplicate` pre-filled from that activity.
3. Adjust the copy and submit as a brand-new request.

> **Note:** Duplicating creates a **new** request — it never edits the original. As with template pre-fill, you'll need to set fresh dates and the registration window.

---

# Task: View the extra-curricular calendar

A month/week calendar of scheduled ECAs.

**Flow**
1. From the hub, click **View calendar** (action card). It opens in the canvas pane (or full page at `/extra-curricular/calendar`).
2. Switch between **Month** and **Week** views and page through dates.
3. Events are colour-coded by activity type. **Click an event** to open a small details pop-up showing the activity name, type, start/end, and its year group / house / class.

> **Note:** The next upcoming activity is highlighted automatically.

---

# Task: Review and approve a request *(approvers only)*

The coordinator/leader flow for acting on a **Pending** request. It opens the request as a **read-only Review** of the full plan, with the decision buttons in the page header and bottom bar.

**Flow**
1. From the **All requests** tab, find a **Pending** request and click **Review** (or click the request name).
2. The request opens read-only on the **Review and submit** summary — the whole plan (activity, venue, attendees, costs, resources, risks).
3. Optionally open the **Attendees** section and **Exclude students** to drop specific students from enrolment on approval.
4. Choose an outcome from the header / bottom bar:
   - **Approve** — approves the request; the activity becomes live and open for enrolment.
   - **Decline** — opens a notes box; the activity leader is notified with your reason.
   - **More info** — opens a notes box; sends it back to the activity leader to update and resubmit.
5. A confirmation message appears and you return to the hub.

**Notes**
- **Approve / Decline / More info** appear **only** to users with approve permission. A coordinator who isn't authorised for that activity sees the request but **can't act** on it.
- **Decline** and **More info** both **require notes**. Those notes are what the author later reads via **View review notes** on their request row.
- If the author opens their own **Pending/More-info** request, they land on the same read-only review with an **Edit request** button instead of the approve controls (so they can revise and resubmit).

---

# Task: View an approved activity's details

The management page for a live, approved activity (`/extra-curricular/:id`).

**Flow**
1. From the **Supervising activities** tab (or other links), click an activity **name**.
2. The page header shows the activity **name**, an **approval status** tag, and an attributes row — **Dates**, **Lead**, **Year groups**, and **Attendees** (registered / maximum).
3. The body is a two-column layout:
   - **Venue details** — location type, venue/room, room configuration, capacity, address, contact details, and a **View fixture** link if a fixtures file was attached.
   - **Staffing** — assigned staff with role, phone, email, and a **consent** link for external members.
   - **Registered participants** — see *Manage participants* below.
   - **Waitlist** — see *Manage the waitlist* below.
4. After the activity's end date passes, a **post-event feedback** section also appears.

---

# Task: Manage registered participants

On an approved activity's details page.

**Flow**
1. Open the activity's **details** page; find the **Registered participants** table (shows **Maximum: N**). Columns: **Name**, **Year group/s**, **Gender**.
2. **Search** participants by name/year/gender.
3. To remove someone, click the **bin** icon on their row → confirm in **Remove participant**. A success message confirms removal.

> **Note:** The **Print** button on this table is **not connected yet** — it shows a "Print unavailable" message.

---

# Task: Manage the waitlist

On an approved activity's details page (appears when a waitlist exists).

**Flow**
1. Find the **Waitlist** table (shows **Maximum: N**). Columns: **Name**, **Year group/s**, **Gender**.
2. **Tick** one or more rows — a batch action bar appears with **Approve** and **Remove**.
   - **Approve** moves the selected students from the waitlist into the activity.
   - **Remove** takes them off the waitlist (asks to confirm; supports removing several at once).
3. Success messages confirm each action.

> **Note:** Waitlist approve/remove is done via **row selection + the batch bar**, not per-row buttons. The **Print** button here is also **not connected yet**.

---

# Task: Edit or delete your request

**Edit** — from the **All/Your requests** tab, a **New** or **Draft** request shows an **Edit (pencil)** action that reopens it in the create flow, pre-filled. Approved activities open read-only; Pending ones open the review screen.

**Delete** — a **New** or **Draft** request shows a **Delete (bin)** action → a confirm step → a success message and the request leaves the list.

> **Note:** Edit and Delete only appear on **New/Draft** requests. Once a request is **Pending/Approved/Declined**, you act on it through Review / View notes / Duplicate instead.

---

# Statuses / states

Requests carry one status, shown as a coloured tag and used by the queue's filters and row actions.

| Status | Meaning | Driven by |
| --- | --- | --- |
| **New / Draft** | Saved but not submitted | Saved via **Save and exit** before submitting |
| **Pending** | Submitted, awaiting a decision | Author has submitted; an approver hasn't acted |
| **More info** | Sent back for changes | Approver chose **More info** with notes |
| **Approved** | Approved; activity is live and open for enrolment | Approver chose **Approve** |
| **Declined / Rejected** | Turned down | Approver chose **Decline** with notes |

The **Supervising activities** tab lists only **Approved** and **Rejected** activities.

---

# Validation & limits (quick reference)

- **Name, type:** required.
- **Event dates/times:** all four required; end can't precede start; **start must be before end**; start date can't be in the past.
- **Registration window:** all four required; **start must be before end**; start date can't be in the past.
- **Event image:** optional, ≤10 MB, **.png/.jpg/.jpeg only**, one file.
- **Fixtures:** optional, ≤10 MB each, **.pdf/.doc/.docx**, multiple files.
- **Venue:** set the event date first. On-site rooms need room + configuration + expected attendees. Off-site venues need name/address/phone/email/website/contact-name/contact-email/contact-position (phone & emails format-checked).
- **Attendees:** at least one student group (type + group); student requirements; max students > 0; staff:student ratio set; **Cost to** + payment due date, with the matching amount(s) > 0; at least one accessibility consideration (Other needs detail text).
- **Additional staffing (if added):** internal needs staff + role; external needs name/role/email/phone + clearance documents.
- **Resources:** optional; a chosen resource needs quantity > 0 (except finance/transport/class-set); if any resource is booked, picked-up-by + collection date + return date are required.
- **Risks:** every risk area must have risks (each with a mitigation) **or** be marked no-risk. Key contacts all required (lead, first-aid, principal, deputy + phones, local emergency number). External-provider and requester-clarification confirmations + pre-event briefing status required.
- **Submit** stays disabled until all of the above pass; errors show inline.

---

# Not user-facing / work-in-progress — exclude from help articles

These exist in the system but have **no usable control** today, or are internal. Don't write articles about them:

- **Print buttons** on the Registered participants and Waitlist tables — show a "Print unavailable / connected in a later pass" message; not functional.
- **Dev/showcase mock fallbacks** — when no backend data is present, the tabs surface canonical sample rows (Choir, Lego, Basketball A-Team, Model UN, etc.). This is demo/offline-showcase behaviour, not a live feature. Don't document the sample data as real records.
- **"My requests" server-side filtering** — currently a client-side match on the activity lead; a backend detail, not something the user configures.
- **Nearest hospital / medical centre** fields in Key contacts — captured in the form model but secondary to the required emergency contacts; treat the required contacts (lead, first-aid, principal, deputy, local emergency number) as the documented set.
- Internal field-highlighting (changed-field markers on resubmitted requests) and draft flags — internal review aids, not user actions.

---

# Behaviours worth calling out in help copy (summary)

- **Two different things share the request queue:** ongoing **clubs/teams** (this feature) and one-off **excursions** (Activities) both produce approval requests with the same statuses. This doc is the **club/team** flow.
- **It's a long, gated, multi-step form** — Activity → Resources → Risk → Review — and **Submit** only unlocks when every required field across all four steps is valid. **Save and exit** keeps a draft to finish later.
- **Search previous activity / Duplicate** are the fast paths — they clone an approved activity, but **always clear the dates and registration window** so you re-enter current ones.
- **Approval is a real gate:** a request is reviewed and **Approved / Declined / More-info'd** (the last two require notes the author can read back). Only authorised approvers see the decision buttons.
- **Once approved, the activity is managed on its details page** — registered participants, waitlist (approve/remove via selection + batch bar), staffing and resources — and it appears on the **extra-curricular calendar**.
- **What you can do depends on status and role:** authors edit/delete only **New/Draft**; approvers triage **Pending** (queue defaults to Pending for them); everyone can browse and view the calendar.
