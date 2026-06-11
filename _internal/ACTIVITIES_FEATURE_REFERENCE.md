# Activities — Feature & Flow Reference

> **Source of truth for help-article writers.** Describes what the Activities feature does and how staff use it, in plain user terms. Exhaustive on behaviour; not a developer/architecture doc. Derived from the StaffXP app source.

---

## Purpose

Activities is where staff plan and get sign-off for off-class school events: **excursions, visits, camps and overseas trips**, plus the **venues** and **resources** those events use. A teacher fills in a guided request — covering the activity, who's going, where it's held, and a risk assessment — and submits it for approval. An **activity coordinator** then reviews each request and approves it, declines it, or asks for more information. The overview page is the hub: it lists requests and their statuses, approved activities, venues, resource bookings and parent volunteers, and is where you start any new request.

## Where it lives

| Screen | How you reach it | Who it's for |
| --- | --- | --- |
| **Activities overview** (`/activities`) | "Activities" in the main navigation | Everyone with activity access — the hub |
| **Request an excursion / camp / visit / overseas trip** (`/activities/new?type=…`) | "Request activity" card → pick a type, or the request modal | Staff creating a request |
| **Request a venue** (`/activities/venue/new`) | "Request venue" card on the overview | Staff requesting a new venue |
| **Activities calendar** (`/activities/excursions/calendar`) | "Calendar view" card on the overview | Anyone checking dates before requesting |
| **Approved activity details** (`/activities/{id}`) | Clicking an approved activity's name | Anyone viewing a confirmed activity |
| **Review a request** (the request form in `mode=approve`) | Coordinator clicks **Review** on a Pending request | Activity coordinators |

> **Note:** the request **creation form and the approval review screen are the same screen.** When a coordinator opens a Pending request to review it, they see the submitted request laid out read-only with Approve / Decline / Request-more-info controls. There isn't a separate "approval page" for excursions, camps, visits and overseas trips.

## Who can do what (permissions)

A staff member's role decides what they see and can do. The key roles are the everyday **requester** (any staff member with activity access), the **activity coordinator** (the approver), and **school leader / super admin** (who get the extra cross-school views).

| Capability | Needs |
| --- | --- |
| View the overview, calendar, approved activities, venues, resource bookings | **Activity access** (general staff) |
| Create / edit / delete your own requests (excursion, camp, visit, overseas trip, venue) | **Activity access** (general staff) |
| See **everyone's** requests in the "All requests" tab and a separate **"My requests"** tab | **Activity coordinator**, **school leader**, or **super admin** |
| **Review** a Pending request — Approve, Decline, Request more info | **Activity coordinator** (with approve permission) |
| See the **"All activities"** tab (all approved activities org-wide) | **Activity coordinator** or **super admin** |
| Review / approve / decline **parent volunteers** | **Activity coordinator**, **school leader**, or **super admin** |

- **General staff** see a single **"Your requests"** tab — only the requests they submitted. Coordinators/leaders instead see **"All requests"** plus a **"My requests"** tab.
- The **Review** action (and the Approve / Decline / Request-more-info controls) only appear on a Pending request **for a coordinator.** A non-coordinator who opens their own Pending request sees it read-only, with an **Edit request** action if it's still editable.
- The **"All activities"** tab is hidden unless you're a coordinator or super admin.

---

# Task: Open the Activities overview

The hub. Three action cards across the top, then a set of tabs.

**Flow**
1. Open **Activities** from the navigation.
2. The top shows three cards:
   - **Request venue** — "Not listed in Approved Venues? Request a venue first." → opens the venue request.
   - **Calendar view** — "Check your preferred date before submitting request" → opens the activities calendar.
   - **Request activity** — "Plan a new activity with risk assessment" → opens the activity-type picker.
3. Below are the tabs (which tabs you see depends on your role):
   - **Your requests** (general staff) **/ All requests** (coordinators & leaders) — the request queue.
   - **My requests** *(coordinators & leaders only)* — just the requests you submitted.
   - **Booking status** — resource bookings for activities.
   - **All venues** — approved and declined venues.
   - **All activities** *(coordinators & super admins only)* — approved activities org-wide.
   - **Parent volunteers** — parent helper sign-ups awaiting review.

> **Note:** notifications can deep-link straight to a specific tab (for example, opening the overview with the **All venues** tab already in focus).

---

# Task: Request an excursion

The full request flow for an excursion. It's a four-step guided form, with the step indicator across the top of the page header.

**Flow**
1. On the overview, click **Request activity**, choose **Excursion**, and **Submit** — or use the **Calendar view** first to check dates.
2. Work through the four steps:
   - **Activity details** — General information, Attendees, Venue details, Alignment and purpose.
   - **Resource booking** — optional; book equipment/finance/transport/technology.
   - **Risk management** — the risk assessment.
   - **Review and submit** — final summary.
3. Use **Next** / **Back** to move between steps; the step indicator at the top also lets you jump steps.
4. On the last step, click **Submit**. A success message confirms the request was submitted, and you land back on the overview with the request showing as **Pending**.

**Leaving early / drafts**
- **Save and exit** saves your progress as a **Draft** and returns you to the overview. It's enabled as soon as you've entered an activity name.
- If you try to leave with unsaved changes, an **"unsaved changes"** prompt appears first.

### Step 1 — Activity details

This step has four sections (shown in the left-hand section list):

**General information**

| Field | Required? | Purpose / rules |
| --- | --- | --- |
| Activity name | **Required** | The event's name. |
| Start date / End date | **Required** | When the activity runs. |
| Start time / End time | **Required** | Excursions capture times of day. |
| Cover image | Optional | A picture for the activity. |

**Attendees** — who's going and the staffing.

| Field | Required? | Purpose / rules |
| --- | --- | --- |
| Student groups | **Required** | Pick attendees by **house, year group, class or roll group**. |
| Student requirements | Optional | Notes on participant needs. |
| Staff-to-student ratio | Optional | The supervision ratio for the activity. |
| Attending staff | Optional | Staff accompanying the group. |
| Transport | Optional | One or more transport options. |
| Parent consent | Optional | For excursions, consent is set to **Yes** automatically. |
| Parent volunteers / volunteer count | Optional | Whether parent helpers are needed, and how many. |
| Cost to students | Optional | Cost per student and who pays (parent / school split). |

**Venue details** — the venue for the excursion (chosen from approved venues or entered manually), including venue contact phone, email and key contact.

**Alignment and purpose** — the activity's purpose and curriculum alignment, plus a **schedule file** upload.

### Step 2 — Resource booking *(optional)*

Lets you book resources the activity needs. Categories are **Finance, Equipment, Transportation, Technology**.
- The step is **optional** — leave it untouched and you can move straight on.
- **Once you start a booking row, you must finish it** (pick a resource category *and* a resource) before you can leave the step. Until then, **Next** stays disabled.

### Step 3 — Risk management

The risk assessment, organised into categories you fill in one at a time:
- **Student lists, Activity based, Transport, Staff capacity** — log risks and their mitigations (or mark a category "no risk").
- **Key contacts** — lead teacher, principal, deputy principal, first-aid teacher, **local emergency number**, and (optionally) nearest hospital / medical centre.
- **External provider** — confirmations about an outside provider (safeguarding, competence, staff responsibilities, evacuation plan, insurance).
- **Requester clarification** — supervision, identifying participants, communication, pre-event briefing.

### Step 4 — Review and submit

A read-only summary of everything entered. **Submit** is **disabled until every required field across all steps is valid.** If you try to submit with gaps, an error message appears **for each invalid field** so you know what's missing.

---

# Task: Request a camp

Same four-step flow as an excursion (**Activity details → Resource booking → Risk management → Review and submit**), with camp-specific differences:

**Flow** — identical to *Request an excursion* (start from **Request activity → Camp**), except for the fields below.

**Camp-specific differences**
- **Date/time fields** capture a **meeting date & time** and a **pick-up date & time** (not just start/end times).
- The venue section is called **Location details** and supports **multiple off-site venue entries** (each with name, address, phone, email, website and contact), rather than a single venue.
- Attendees include a **lead staff member, a second-in-charge** (with role), and an **insurance** option.
- **Capacity:** no maximum-attendees or wait-list controls.
- Risk management and key contacts (including **local emergency number**) work as for excursions; the alignment step adds a **packing-list file** upload alongside the schedule file.

---

# Task: Request a visit

Same four-step flow, tuned for a shorter, simpler visit.

**Flow** — identical to *Request an excursion* (start from **Request activity → Visit**), except for the fields below.

**Visit-specific differences**
- Attendees use a **single group selection** (one house / year group / class / roll group) rather than multiple groups.
- **Parent consent** is shown as a dropdown you choose, rather than auto-set.
- **Transport** is not part of the visit flow, and the **Transport** risk category is **not** included (risk management goes Student lists → Activity based → Staff capacity → Key contacts → External provider → Requester clarification).
- The **local emergency number** is not required for a visit.

---

# Task: Request an overseas trip

Same four-step flow, with the most controls of any type.

**Flow** — identical to *Request an excursion* (start from **Request activity → Overseas trip**), except for the fields below.

**Overseas-trip-specific differences**
- Captures **start/end times** like an excursion.
- Supports **multiple off-site venue entries** (like a camp).
- Adds a **maximum-attendees cap** and a **wait list** — the only activity type with these.
- Includes **lead / second-in-charge staff** and **insurance**, a **schedule file and packing-list file**, and the **local emergency number** (required).

---

# Task: Request a venue

When the venue you need isn't already an approved venue, you request it. This is its own three-step flow (separate from the activity request).

**Flow**
1. On the overview, click **Request venue** (or open it from inside an activity request when picking a venue).
2. Work through the three steps:
   - **Venue details** — Basic information, Contacts, Students, Attach documents.
   - **Risk management** — the venue risk assessment.
   - **Review and submit**.
3. Click **Submit**. A success message confirms the venue request was created and you return to the overview.
- **Save and exit** saves a **Draft** (enabled once a venue name is entered); leaving with unsaved changes prompts first.

### Step 1 — Venue details

**Basic information** — Reason for request, Venue name, Address, Telephone, Email, Website.

**Contacts** — Contact name, Contact email, Position (the venue's key contact).

**Students** — Relevant learning area, Year groups, Cost to students, Currency.

**Attach documents** — **Public-liability insurance** and an **emergency plan** are **both required** uploads; additional documents are optional.

### Step 2 — Risk management

A venue risk assessment across **Student list, Activity based, Transport, Staff capacity** (log risks + mitigations, or mark "no risk"), plus **Key contacts, External provider** confirmations, and a **Medical support** section (venue first-aid qualification, first-aid kit, defibrillator).

### Step 3 — Review and submit

A summary with any missing items flagged. **Submit** stays disabled until venue details, contacts, students, both required documents, every risk category, key contacts and external-provider confirmations are complete.

**Fields (quick reference)**

| Field | Required? | Purpose / rules |
| --- | --- | --- |
| Venue name | **Required** | The venue's name. |
| Address | **Required** | Venue address. |
| Telephone / Email | **Required** | Venue contact details. |
| Website | Optional | Must be a valid `http(s)://` URL if entered. |
| Contact name / email / position | **Required** | The venue's key contact. |
| Relevant learning area | **Required** | Curriculum area the venue supports. |
| Year groups | **Required** | Which year groups it's for. |
| Cost / Currency | **Required** | Cost to students and currency. |
| Public-liability insurance file | **Required** | An upload. |
| Emergency plan file | **Required** | An upload. |
| Additional documents | Optional | Any number of extra files. |

---

# Task: View the activities calendar

A month / week / day calendar of scheduled activities — useful for checking a date before you request.

**Flow**
1. On the overview, click **Calendar view** (card), or open **Calendar view** from the navigation.
2. Switch between **Month / Week / Day** and page through dates.
3. Activities show as coloured blocks (colour = activity type). **Click an event** to open a pop-up with its name, type, dates, and the year group / house / class it's for.

> **Note:** the calendar is **read-only** — you can't create or edit an activity from it. It's there to help you pick a clear date.

---

# Task: Find and track your requests

The request table is the heart of the overview.

**Flow**
1. On the overview, open **Your requests** (general staff) or **All requests** (coordinators & leaders). Coordinators/leaders can also open **My requests** for just their own submissions.
2. The table lists each request's **Requests** (name), **Activity lead**, **Type** and **Status**.
3. You can:
   - **Search** by request name.
   - **Filter** by **Status** (Pending / Approved / Rejected / More info) and/or **Type** (Excursion / Visit / Camp / Overseas trip).
   - **Page** through results (10 / 25 / 50 / 100 per page).
   - **Click a request name** to open it (where it goes depends on status — see below).
   - Use the **row action** (one icon per row, depending on status).

**What each status lets you do (the row action & clicking the name):**

| Status | Row action | Clicking the name does… |
| --- | --- | --- |
| **New / Draft** | **Edit** and **Delete** | Opens the draft to keep editing |
| **Pending** | **Review** *(coordinators only)* | Opens the request to review/approve (coordinator) or read-only (staff) |
| **Approved** | **Replicate** (duplicate it) | Opens the approved activity's details |
| **More info** | **View review notes** | Reopens the request to edit and resubmit |
| **Rejected / Denied** | **View review notes** | Opens the request read-only |

> **Note:** for coordinators, the **All requests** queue **opens filtered to Pending** by default — the action queue is what you see first. Clear the status filter to see every request. General staff see all of their own requests across every status.

---

# Task: Review a request (approve / decline / request more info) *(coordinator only)*

How a coordinator acts on a Pending request. The request is shown laid out, and the decision controls live in the page header / footer.

**Flow**
1. In **All requests**, find a **Pending** request and click **Review** (the row action), or click the request name.
2. The request opens showing the submitted details. As a coordinator you get the decision controls:
   - **Approve** — approves the request. A success message confirms it and you return to the queue.
   - **Decline** — opens a notes box; enter notes and confirm. The leader is notified and the request becomes **Rejected**.
   - **Request more info** — opens a notes box; enter what's needed. The request goes to **More info** and the leader is notified to update and resubmit.
   - **Edit on behalf** — lets the coordinator edit the request themselves, then return to the decision step.
3. For a **venue** request, the same Approve / Decline / More info controls appear in the venue review.

**Important, non-obvious behaviour**
- **Approve is blocked by a venue conflict.** If the requested venue clashes with another approved event, **Approve is disabled** and a **"Venue conflict detected"** pop-up names the conflicting event. You must resolve the clash before you can approve.
- The **decision controls only show while the request is Pending** and **only to a coordinator.** Once approved or declined, they disappear.
- **Decline and Request-more-info both require notes** — they open a notes box (free-text) that the requester can read back via **View review notes**.
- **Edit on behalf** drops you into the editable form, with a **"Back to approval"** action to return to the decision step without saving.

> **Note:** there is a separate, more polished approval screen (a readiness "verdict" with at-a-glance facts and a roster) — but it is currently **only wired up for extra-curricular activity approvals**, not for excursions/camps/visits/overseas trips. See the EXCLUDE section.

---

# Task: Edit or delete a request

**Edit**
1. In the request table, click the **Edit** (pencil) row action on a **New / Draft** request, or click the name of a **More info** request.
2. The request reopens in the same guided form with your values filled in. Make changes and **Submit** (or **Save and exit** to keep it a draft).

**Delete**
1. Click the **Delete** (bin) row action on a **New / Draft** request.
2. Confirm in the pop-up. A success message confirms the request was deleted and it leaves the list.

> **Note:** only **New / Draft** requests show Edit + Delete. Once a request is Pending/Approved/Rejected it can't be deleted from here; a **Rejected** or **More info** request is reopened (to view notes or edit) rather than deleted.

---

# Task: Duplicate an approved activity

Reuse a past activity as the starting point for a new request.

**Flow**
1. Find the activity — either an **Approved** request (row action **Replicate**) or a row in **All activities** (**Duplicate** action).
2. The request form opens **pre-filled** from that activity, **but the dates and times are cleared** so you set fresh ones.
3. Adjust anything that's changed and **Submit** as a new request.

---

# Task: Browse approved venues

**Flow**
1. On the overview, open **All venues**.
2. The table lists **Venue name, Address, Learning area, Phone** and **Status**.
3. **Filter** by Status (**Approved** / **Declined**) and/or Learning area, and **search** by name.
4. For a **Declined** venue you can **view the declined notes** (row action) and open the venue read-only.

> **Note:** the venues tab **opens filtered to Approved** by default. Switch the status filter to **Declined** to see rejected venue requests and their notes.

---

# Task: Check resource bookings (Booking status)

**Flow**
1. On the overview, open **Booking status**.
2. The table lists each booking's **Event, Resource, Quantity, Picked up by, Return date** and **Status**.
3. **Search** by event name and **filter** by booking status.

This is a read-only view of equipment/resource bookings tied to activities.

---

# Task: Review parent volunteers

Parents can sign up to help on an activity; approvers review those sign-ups here.

**Flow**
1. On the overview, open **Parent volunteers**.
2. The table lists each volunteer's parent name, the event, child, contact details, role and **Status**.
3. **Approvers** (coordinator / school leader / super admin) can:
   - **Review** a volunteer (opens a detail modal with their documents).
   - **Approve** or **Decline** a volunteer — including selecting several and using the **batch Approve / Decline** actions.
   - **Remove** an already-approved volunteer.
4. The tab **opens filtered to Pending / More info** for approvers, so the queue to action is what you see first.

> **Note:** parent-volunteer **review and approval is approver-only.** General staff see the list but not the approve/decline controls.

---

# Statuses / states

Requests and venues carry a status, shown as a coloured tag.

| Status | Meaning | Driven by |
| --- | --- | --- |
| **New / Draft** (gray) | Started but not submitted | Saved with "Save and exit" |
| **Pending** (amber) | Submitted, awaiting a coordinator's decision | Request submitted |
| **Approved** (green) | Signed off; the activity is confirmed | Coordinator clicks Approve |
| **More info** (blue) | Coordinator has asked the requester to update and resubmit | Coordinator: Request more info |
| **Rejected / Denied** (red) | Declined by the coordinator | Coordinator clicks Decline |

- **Venues** use a simpler set: **Approved** (green) and **Declined** (red).

---

# Validation & limits (quick reference)

- **Activity name, start/end dates** are always required; **start/end times** are required for excursions and overseas trips; camps require **meeting** and **pick-up** date/time.
- **Attendees:** at least one student group (house / year group / class / roll group) is required.
- **Local emergency number** is required for excursions, camps and overseas trips (not visits), and must be a valid phone number.
- **Venue contact details** entered manually must be valid: phone (7–15 digits), email, and website (`http(s)://…`).
- **Resource booking** is optional, but **a started booking row must be completed** (category + resource) before leaving the step.
- **Submit is gated:** the request can't be submitted until every required field across all steps is valid; each missing field surfaces its own error message.
- **Venue request:** public-liability insurance and emergency-plan files are **both required**; every risk category and the key-contact / external-provider confirmations must be complete.
- **Approve is blocked** while a **venue conflict** exists on the request.
- **Decline / Request more info** require **notes**.

---

# Not user-facing / work-in-progress — exclude from help articles

These exist in the code/UI but aren't usable as documented features today. Don't write articles about them:

- **The standalone "readiness verdict" approval page** (`ActivityRequestApprovalPage` — readiness hero, pass/warn/block checks, participant roster, logistics/safety groups). It's **only routed for extra-curricular approvals**, not for activities (excursions/camps/visits/overseas trips). The activity approval the user actually does is the request-form-in-approve-mode described under *Review a request*. Don't document the readiness-verdict screen as part of Activities.
- **Dev / showcase placeholder rows.** When there's no live data (or in the offline showcase build), the Requests, Booking-status and Parent-volunteer tables show sample rows. These are demo fillers, not real records — don't treat them as live behaviour.
- **"My requests" client-side filtering.** The coordinator "My requests" tab is filtered by matching your staff profile in the browser; it's an internal detail, not something the user configures.
- **Mock approval fixtures** (sample activities seeded under `?mock=1`) are for demos/screenshots only.
- **Some optional schema fields** (e.g. credit-card / currency detail on finance bookings, certain transport-resource sub-types) may appear conditionally and aren't core to the everyday flow — document only the fields a requester routinely fills.

---

# Behaviours worth calling out in help copy (summary)

- **One request, four steps:** Activity details → Resource booking (optional) → Risk management → Review and submit. The four activity types share this flow; they differ mainly in date/time fields, venue handling, staffing, and which risk/consent fields apply.
- **The request form is also the approval screen.** Coordinators review a Pending request in the same layout, with Approve / Decline / Request-more-info controls in the header.
- **A venue conflict blocks approval.** If the venue clashes with an approved event, Approve is disabled until it's resolved.
- **Statuses drive what you can do:** New/Draft = edit or delete; Pending = await decision (coordinator can review); More info = update and resubmit; Approved = view or duplicate; Rejected = view notes.
- **If a venue isn't approved yet, request it first** — venue requests are their own three-step flow with their own risk assessment and two required document uploads.
- **What you can do depends on your role:** general staff request and track their own activities; coordinators review and approve everyone's, and see the cross-school "All activities" and "My requests" views.
