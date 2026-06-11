# Notices — Feature & Flow Reference

> **Source of truth for help-article writers.** Describes what the Notices feature does and how staff use it, in plain user terms. Exhaustive on behaviour; not a developer/architecture doc. Derived from the StaffXP app source.

---

## Purpose

Notices is the school's noticeboard: staff create and publish announcements (general, sport, cultural, arts, community) targeted at chosen audiences — staff, parents and students — for a set period. Recipients read notices on a card-based board, follow categories they care about, and RSVP to events.

## Where it lives

| Screen | How you reach it | Who it's for |
| --- | --- | --- |
| **Notices board** (`/notices`) | "Notices" in the main navigation | Everyone with notice access — the reading view |
| **Manage notices** (`/notices/manage`) | "Manage notices" button on the board (top right) | Staff who can create/edit notices |

## Who can do what (permissions)

The product has three relevant permission levels. A staff member's role decides which they have.

| Capability | Needs |
| --- | --- |
| View the board, follow categories (interests), filter, RSVP, open a notice's full details | **Notice read** access |
| Create, edit and delete notices; reach "Manage notices" | **Notice write** access (e.g. teachers, admins) |
| Feature/unfeature, pin to top, set priority, broadcast to all campuses, see the All/My-notices split and extra stat cards | **School leader** (with write access) |

- Staff **without write access** (e.g. relief teachers, parent-style read-only roles) see only the reading board. The "Create notice" and "Manage notices" buttons are hidden, and the details pop-up shows just a Close button — no edit/delete.
- **Only staff with write access** can edit or delete. Leaders get the extra moderation controls listed in the leader-only sections below.

---

# Task: View the notices board (read notices)

The default reading experience. Notices show as cards; the board is organised into tabs.

**Flow**
1. Open **Notices** from the navigation.
2. The board opens on a set of tabs:
   - **Featured notices** — notices the school has highlighted (see *Feature a notice*).
   - **Your interests** — notices in the categories you follow (see *Set your interests*).
   - **One tab per category** — General, Sport, Cultural, Arts, Community.
3. Each notice is a card showing a thumbnail (or a category-coloured default image), the **category** tag, an **RSVP** tag if the notice takes RSVPs, the **title**, and the **activity date** if one is set.
4. **Click a card to flip it over.** The back shows the full description, activity date/time, author, attachment links, a reference link, and (if applicable) the **RSVP** button.

**Notes**
- The number of cards per row adapts to screen width; on narrow/phone screens cards stack one per row.
- A notice only appears to a person if they fall inside its targeted audience and the current date is within its visible window.

---

# Task: Set your interests (follow categories)

Lets a reader choose which notice categories matter to them. Drives the **Your interests** tab.

**Flow**
1. On the **Notices board**, open the **Interests** dropdown (top right of the board).
2. Tick the categories you want to follow; untick to stop following.
3. Selections save immediately and are remembered for you across sessions.

**Behaviour**
- The **Your interests** tab shows notices from exactly the categories you've ticked.
- This is a personal setting — it does not change what anyone else sees.

---

# Task: Filter the board by date

Narrows the board to notices in a date range.

**Flow**
1. On the **Notices board**, open the **filter** control (next to Interests).
2. Choose a date basis:
   - **Visible date** — when the notice is shown to its audience.
   - **Created date** — when it was made.
   - **Activity date** — the date of the event the notice is about.
3. Set **From** and **To** dates and apply. Use reset to clear.

---

# Task: RSVP to a notice

For notices that take RSVPs, a reader can respond — which adds the event to their own calendar.

**Flow**
1. Open the notice on the board and **flip the card** to the back.
2. Click **RSVP**.
3. A confirmation pop-up shows the event title and date. Click **Accept** (or Cancel).

**Important, non-obvious behaviour**
- Accepting **adds the event to the responder's Outlook calendar.** RSVP here means "add this to my calendar", not a yes/no headcount sent back to the organiser.
- Once you've RSVP'd, the button is **disabled** so you can't add it twice.
- The **RSVP** button only appears when the notice's creator switched on "RSVP required". A notice with RSVP on also shows an **RSVP** tag on the card front.

---

# Task: Create a notice

The main authoring flow. Opens as a guided, multi-step panel ("Create a new notice") with three steps: **Information**, **Audience type**, **Review & publish**. You can't move to the next step until the current step's required fields are valid; the final **Publish** button stays disabled until everything is valid.

**Flow**
1. On the **Notices board**, click **Create notice**.
2. Complete **Step 1 – Information** (notice content + when it's visible).
3. Click **Next**, complete **Step 2 – Audience type** (who it goes to).
4. Click **Next** to **Step 3 – Review & publish**; check the summary (use **Back** to amend).
5. Click **Publish**. A success message confirms the notice was created.

**Leaving early:** if you've entered anything and try to close or navigate away, an "unsaved changes" prompt appears. On a phone, a "best on a larger screen" notice appears first (you can continue anyway).

### Step 1 — Information

**Details**

| Field | Required? | Purpose / rules |
| --- | --- | --- |
| Notice title | **Required** | The headline. Up to **100 characters**. |
| Notice category | **Required** | General / Sport / Cultural / Arts / Community. Sets the card colour and which category tab the notice lands in. |
| Notice description | **Required** | The body text shown to readers. Up to **250 characters** (a live counter shows remaining). |
| Upload thumbnail | Optional | Cover image. **Max 10 MB**, file types **.jpg, .jpeg, .png, .bmp** only. Recommended size 1088×240. If omitted, a category default image is used. |
| RSVP required | Optional (default No) | When **Yes**, readers get an RSVP button and the card shows an RSVP tag. **Turning this on makes "Date of activity" and "Choose a time" required.** |
| Featured notice | Leader only | See *Feature a notice*. Hidden for non-leaders. |
| Pin to top | Leader only | See leader section. |
| Priority | Leader only | Normal / Important / Urgent. See leader section. |
| Date of activity | Optional — **required if RSVP is on** | The date the event happens. Can't be in the past. |
| Choose a time | Optional — **required if RSVP is on** | Time of the event (24-hour hh:mm). |
| Reference link title | Optional | Friendly label for a link. |
| Reference link | Optional | A URL readers can open from the notice. |
| Upload file attachments | Optional | Supporting documents. **Max 10 MB each**, **all file types**, **multiple files** allowed. |

**Visibility** (same step, below Details)

| Field | Required? | Purpose / rules |
| --- | --- | --- |
| From | **Required** | First date the notice is visible to its audience. Can't be in the past. |
| Until | **Required** | Last date it's visible. Must be on/after **From**. |
| Recurring notice | Optional (default No) | When **Yes**, reveals the repeat options below. |
| Recurrence frequency | Required if recurring | Daily / Weekly / Fortnightly / Monthly. |
| Recurrence days | Required for Weekly & Fortnightly | Which weekdays it repeats on (pick at least one). Hidden for Daily/Monthly. |
| Monthly pattern | Required for Monthly | Choose **Same date each month** or **Same day pattern each month** (e.g. "the 2nd Tuesday"). The day pattern asks for the week-in-month and weekday, pre-filled from your start date. |
| Recurrence end date | Required if recurring | When the repeat stops. Can't be in the past. |

> **Repeat shortcut:** if you choose **Weekly** and tick all seven days, the system automatically switches the frequency to **Daily**.

### Step 2 — Audience type

Decides who the notice reaches. **Every selector must have at least one choice** — a notice is always targeted across audience type, year groups, houses and campuses.

| Field | Required? | Purpose / rules |
| --- | --- | --- |
| Who can see this notice? | **Required** | Tick one or more of **Staff / Parents / Students**. (The "Parents" option carries a tooltip explaining how parent visibility works.) |
| Select staff | **Required *if* "Staff" is ticked** | Pick which staff types receive it. Only appears when Staff is selected. |
| Year groups | **Required** | One or more year groups. |
| Houses | **Required** | One or more houses. |
| Campuses | **Required** | One or more campuses. |
| Broadcast to all campuses | Leader only | Ticking it fills in every campus for you and locks the campus picker. Hidden for non-leaders. |

**What the audience choices mean:** a reader sees the notice only if they match the **audience type** (staff/parent/student) **and** fall within the selected **year groups / houses / campuses**.

### Step 3 — Review & publish

Read-only summary of everything entered. **Back** to amend, **Publish** to create. While publishing, a "Publishing…" indicator shows.

---

# Task: Manage notices (find the notices you created)

The management table for your own notices (and, for leaders, everyone's).

**Flow**
1. On the **Notices board**, click **Manage notices**.
2. The page shows **summary stat cards** across the top and a **table** of notices.

**Stat cards** (also act as quick filters — click one to filter the table to that status, click again to clear):
- **New this month** / (leader: this isn't a filter) — count of notices created this month, with month-on-month change.
- **Active notices** — currently live, with average duration.
- **Scheduled notices** — planned for the next 7 days.
- **Expired notices** *(leader view)* — past notices.
- **Featured notices** *(leader view)* — currently featured.

**The table** shows: Title, *(leader only)* Created by, Category, Last updated, Status, and a row actions cell. You can:
- **Search** by title.
- **Filter** by Status (Active / Scheduled / Expired) and/or Category, combined.
- **Page** through results (10/25/50/100 per page).
- **Click a title** to open the notice's full details (see *View a notice's details*).
- Use the **row actions** — Edit (pencil) for any writer; a **star** to feature/unfeature for leaders (see below).

**Leader vs non-leader view**
- **Leaders** get two tabs — **All notices** and **My notices** — plus the Created-by column and the extra stat cards.
- **Other writers** see a single **Your notices** table (their own notices only).

---

# Task: View a notice's full details

A read-only pop-up with everything about one notice.

**Flow**
1. From the **Manage notices** table, click a notice **title** (or it opens from other links to a notice).
2. The pop-up shows:
   - **Header:** title, category tag, status tag (Active / Scheduled / Expired).
   - **Details:** description, activity date, thumbnail (with view/download), attachments (view/download; images preview in place), reference link, RSVP required (Yes/No), Featured (Yes/No), From / Until dates, and recurrence days if it repeats.
   - **Audience:** who can see it, staff types, year groups, houses, campuses.
   - **Author & history:** author, created date/time, and last-edited (who and when), if edited.
3. Footer buttons depend on your role:
   - **Read-only staff:** no buttons — close with the **X**.
   - **Writers (teacher etc.):** **Delete** (and Cancel). Editing is done from the table's pencil icon.
   - **Leaders:** **Delete**, plus **Make featured / Unfeature**.

---

# Task: Edit a notice

Change a notice after it's been created. Same fields as Create, pre-filled.

**Flow**
1. In **Manage notices**, click the **Edit (pencil)** icon on the notice's row. *(Writers only — read-only staff don't see it.)*
2. The **Edit notice details** pop-up opens with all current values filled in, using the same Details / Audience / Visibility fields and rules as Create.
3. A banner at the top states the notice's current state:
   - **Active** — "currently live and visible to its audience."
   - **Scheduled** — "will go live on its start date."
   - **Expired** — "has ended and is no longer visible."
4. Make changes (you can add or remove attachments). **Save changes** is enabled only once you've changed something.
5. Click **Save changes**; a success message confirms the update. The notice's "last edited" record updates.

**Notes**
- You can edit a notice in any state, including **Active** (live) and **Expired** — the banner warns you which.
- Closing with unsaved changes prompts "unsaved changes" before discarding.

---

# Task: Delete a notice

Permanently remove a notice.

**Flow**
1. Open the notice's **details** pop-up (click its title in Manage notices).
2. Click **Delete**.
3. A confirmation step appears: *"Delete '[title]'? This action cannot be undone."*
4. Click **Confirm delete**. A success message confirms removal and the notice leaves the list.

**Notes**
- **Deletion is permanent** — there's no undo.
- Only staff with write access see Delete. (A read-only user who somehow triggers it is blocked with a "permission denied" message.)

---

# Task: Feature a notice *(leader only)*

Highlights a notice so it appears in the **Featured notices** tab on the board.

**Flow — two ways**
- **From the table:** click the **star** icon on the notice's row (filled star = featured). It toggles immediately with a confirmation message.
- **From the details pop-up:** click **Make featured notice** / **Unfeature notice**.
- **At creation:** turn on the **Featured notice** toggle in Step 1.

**Rules & non-obvious behaviour**
- **Leaders only.** Other staff never see the feature controls.
- You can only feature notices that are **Active or Scheduled** — not Expired ones.
- There's a **daily cap of featured notices**. If the cap is reached, the Featured toggle is replaced by a message explaining the notice will publish to the **non-featured** section instead.
- "Featured" is separate from "Pin to top" — see below.

---

# Task: Pin to top & set priority *(leader only)*

Extra emphasis controls available to leaders when creating or editing a notice (Step 1 – Details).

| Control | What it does |
| --- | --- |
| **Pin to top** | Pins the notice above others in the feed for short-term emphasis. Distinct from Featured (which uses the highlighted banner slot). |
| **Priority** — Normal / Important / Urgent | Sets the notice's priority band, which affects its card emphasis and push behaviour. |

- **Leaders only.** For all other staff these are hidden and the notice is always created at Normal priority, unpinned.

---

# Notice statuses (what drives them)

Every notice carries one status, shown as a coloured tag and used by the stat-card filters:

| Status | Meaning | Driven by |
| --- | --- | --- |
| **Scheduled** (blue) | Not visible yet; will go live | Start date is in the future |
| **Active** (green) | Live and visible to its audience now | Today is within From–Until |
| **Expired** (red) | Finished; no longer visible | End date has passed |

---

# Validation & limits (quick reference)

- **Title:** required, max 100 characters.
- **Description:** required, max 250 characters.
- **Category:** required.
- **Thumbnail:** optional, ≤10 MB, .jpg/.jpeg/.png/.bmp only.
- **Attachments:** optional, ≤10 MB each, any type, multiple allowed.
- **From / Until:** both required; Until can't be before From; dates can't be in the past.
- **Activity date & time:** optional, **but both required when RSVP is on**; can't be in the past; time is 24-hour hh:mm.
- **Audience:** at least one audience type, one year group, one house and one campus. If "Staff" is chosen, at least one staff type.
- **Recurrence (if on):** frequency required; weekday(s) required for Weekly/Fortnightly; monthly pattern required for Monthly; end date required.
- Errors show inline under the field; you can't advance a step or publish until they're cleared.

---

# Not user-facing / work-in-progress — exclude from help articles

These exist in the system but have **no usable control** for staff today, or are internal. Don't write articles about them:

- **RSVP reason / RSVP type / RSVP event location** — data exists but there's no screen control; RSVP today is simply the calendar-add described above. (Future capability.)
- **"Action required" flag** and **rich notice body** — present in the data model but with no editing control in the current UI; the visible body text is the 250-character description.
- **Featured-count card number** — the leader "Featured notices" stat is a placeholder figure pending a reporting update; don't quote the count as authoritative.
- **All notices vs My notices filtering** (leader tabs) — depends on who authored each notice; behaviour is a backend detail, not something the user configures.
- Internal/demo-only behaviours (offline showcase data handling, draft flags) are not part of the live user experience.

---

# Behaviours worth calling out in help copy (summary)

- **RSVP = add to my Outlook calendar**, not a reply to the organiser; it can only be done once.
- **Two kinds of emphasis:** Featured (banner slot, capped per day, Active/Scheduled only) vs Pin-to-top/Priority (leader emphasis controls). Both leader-only.
- **Targeting is always multi-dimensional** — audience type *and* year groups *and* houses *and* campuses all apply together.
- **Visibility is time-boxed** by From/Until and can repeat on a schedule.
- **Editing is allowed in any state** (including live and expired), with a banner warning; **deletion is permanent**.
- **What you can do depends on your role** — read-only staff just read; writers create/edit/delete; leaders also feature, pin, prioritise and broadcast.
