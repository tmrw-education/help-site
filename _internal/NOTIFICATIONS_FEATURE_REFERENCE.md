# Notifications — Feature & Flow Reference

> **Source of truth for help-article writers.** Describes what the Notifications feature does and how staff use it, in plain user terms. Exhaustive on behaviour; not a developer/architecture doc. Derived from the StaffXP app source.

---

## Purpose

Notifications keep staff up to date as things happen in the school day. They arrive in two streams — **Messages** (things that concern you, often with a "go here" action — pending requests, attendance summaries, wellbeing follow-ups, approvals) and **Alerts** (school-wide operational and safety notices — transport disruptions, weather pauses, drills). Staff see a running count on the **bell** in the top bar, read items in a slide-out panel, and can open the full **Notifications** page for the complete history. Clicking a notification usually takes you straight to the thing it's about.

## Where it lives

| Screen | How you reach it | Who it's for |
| --- | --- | --- |
| **Notification bell + panel** | The **bell** icon in the top header bar (every page). Click to open the slide-out panel. | Everyone — the quick-glance view |
| **Notifications page** (`/notifications`) | **View all** at the bottom of the bell panel | Everyone — the full history view |
| **Notifications settings** | **Settings** (user menu, top-right avatar) → **Notifications** section | Everyone — one toggle |

There is no main-navigation link to the Notifications page; you reach it through the bell panel's **View all**.

## Who can do what (permissions)

Notifications are **not role-gated in the app itself** — every signed-in staff member has the bell, the panel, the page and the settings toggle, and every action (read, dismiss, dismiss-all, do-not-disturb) is available to all of them. There are no read-only / writer / leader tiers here.

| Capability | Needs |
| --- | --- |
| See the bell + unread badge, open the panel, open the Notifications page | Any signed-in staff member |
| Read (open) a notification, dismiss one, dismiss all, set Do not disturb, toggle Push notifications | Any signed-in staff member |

- **What differs by role is the *content*, not the controls.** Which notifications you receive is decided server-side by your role and responsibilities (e.g. an approver gets "approval required" messages; a year-level coordinator gets attendance-anomaly messages). Two staff will see different lists from the same feature.

---

# Task: Check your notifications (open the bell panel)

The quick-glance view. The bell sits in the top bar on every page.

**Flow**
1. Look at the **bell** icon (top-right of the header). If you have unread notifications, a **red badge** shows the count (capped at **99+**).
2. Click the bell to open the **Notifications** slide-out panel.
3. The panel has two tabs, each with its own unread count tag:
   - **Messages** (grey count tag) — items addressed to you, usually with an action.
   - **Alerts** (red count tag) — school-wide operational/safety notices.
4. Items are grouped under **Today**, **Yesterday** and **Previous**, newest first. Long items have a **Read more / Read less** toggle.
5. Click a notification to open what it's about (see *Open a notification*).

**Notes / non-obvious behaviour**
- The bell badge counts **unread items across both tabs**. It only counts items that are unread **and** either favourited or less than **7 days old** — older, unfavourited items don't add to the badge.
- Every notification shows the same blue "information" icon — the type and urgency are carried by the words, not the icon colour.
- The panel closes when you click outside it.

---

# Task: Open a notification (go to what it's about)

Clicking a notification marks it read and, where possible, deep-links you to the relevant screen.

**Flow**
1. Open the bell panel (or the Notifications page).
2. Click any notification row.
3. The notification is **marked as read** and:
   - If it links somewhere, you're taken straight there (e.g. the pending-requests queue, an attendance summary, a wellbeing case, an activity approval, a notice).
   - If it doesn't link anywhere, it simply marks read and the panel closes.

**Notes / non-obvious behaviour**
- **Clicking always marks the item read** — there's no separate "mark as read" button in the panel.
- The destination is worked out from the notification's content. Examples: a declined-venue message opens the Activities venues tab; an approved-venue message opens the activity-request flow; a wellbeing follow-up opens that student's case. Some links are resolved on the fly, so there can be a brief moment before the page opens.
- The landing screen is **briefly highlighted** so you can spot what the notification pointed you at.
- **Alerts don't deep-link** — opening an alert from the panel just marks it read.

---

# Task: View all notifications (the Notifications page)

The full-history view, with filtering and paging the panel doesn't have.

**Flow**
1. Open the bell panel and click **View all** at the bottom (it shows a count, e.g. "View all (12)").
2. The **Notifications** page opens at `/notifications`, with the same two tabs — **Messages** and **Alerts** — each showing its total count.
3. Use the **All / Unread / Read** filter (each shows a live count for the current tab) to narrow the list.
4. Items are grouped under **Today** and **Previous**, newest first.
5. The page shows the first **10** items; click **Load more** to reveal another 10 at a time.
6. Click an item to open it (same behaviour as the panel — see *Open a notification*). Each row also has a **dismiss (✕)** button.

**Notes / non-obvious behaviour**
- The page-level **count tags** on the tabs show the **total** number of items in each tab; the **panel** tab tags show **unread** counts. (Same look, different number.)
- Switching tab or changing the filter resets the list back to the first 10.

---

# Task: Dismiss a notification

Remove a single notification you've dealt with.

**Flow**
1. In the **bell panel**, hover/focus the notification and click its **dismiss (✕)** control, **or**
2. On the **Notifications page**, click the **✕** on the item's row.
3. The notification is removed from your list.

**Notes**
- Dismissing removes the item for you; it doesn't notify or affect anyone else.

---

# Task: Dismiss all notifications

Clear the whole list in one go.

**Flow — two ways**
- **From the bell panel:** click **Dismiss all** in the panel header.
- **From the Notifications page:** click **Dismiss all** (the page action, top-right). It's disabled when there's nothing to dismiss. A confirmation pop-up — *"All notifications will be permanently dismissed. Continue?"* — appears; click **Dismiss all** to confirm or **Cancel**.

**Notes / non-obvious behaviour**
- Dismiss-all **keeps any favourited notifications** — only the rest are cleared. (Most staff won't have favourites; there's no button to set one in the current UI — see the exclude list.)
- The page version asks for confirmation; the panel version clears immediately.

---

# Task: Turn on "Do not disturb"

Stops pop-up notifications appearing while you're busy, without turning notifications off entirely.

**Flow**
1. Open the **bell panel**.
2. Toggle **Do not disturb** in the panel header.

**Notes / non-obvious behaviour**
- Do not disturb only suppresses the **pop-up toasts** for newly arriving notifications. Items still arrive in the panel and the bell badge still updates.
- The toggle is remembered for you between sessions.

---

# Task: Turn pop-up notifications on or off (Settings)

Controls whether new notifications show a brief pop-up (toast) in the corner of the screen as they arrive.

**Flow**
1. Open the **user menu** (avatar, top-right) and choose **Settings**.
2. In the **Notifications** section, switch **Push notifications** on or off.
3. Save the settings page as usual.

**Notes / non-obvious behaviour**
- "Push notifications" here means the **in-app pop-up toast** — a small card that slides in when a new notification arrives and auto-dismisses. It is **on by default**.
- A toast appears only when **Push notifications is on AND Do not disturb is off**. Either one will suppress the pop-up.
- Clicking a toast does the same thing as clicking the notification in the panel: it marks it read and opens what it's about (alerts open their alert details instead of navigating).
- This setting does **not** affect the bell, the panel, or the Notifications page — those always work.

---

# Notification types & states

| Item | Meaning | Driven by |
| --- | --- | --- |
| **Message** | Something addressed to you, usually with a "go here" action (requests, summaries, approvals, follow-ups). Shown on the **Messages** tab. | Server-side, based on your role/responsibilities |
| **Alert** | A school-wide operational or safety notice (transport, weather, drills, facilities). Shown on the **Alerts** tab; alerts don't deep-link. | Server-side, school operations |
| **Unread** | Not yet opened. Visually emphasised; counted by the bell badge and the **Unread** filter. | Default for a new item, until clicked |
| **Read** | Opened (or marked read by clicking). Counted by the **Read** filter. | Set when you click the item or its toast |

# Validation & limits (quick reference)

- **Bell badge** displays the unread count, shown as **99+** above 99.
- **Unread counting window:** an item counts toward the badge only if it's unread **and** (favourited **or** less than **7 days** old).
- **History retention (your device):** the panel/page keep recent items — anything within **7 days**, plus any favourited items — between sessions; older unfavourited items drop off the locally stored list.
- **Notifications page paging:** **10** items shown at a time, **Load more** adds 10.
- **Push notifications** default: **on**.
- No fields to fill in — staff don't *create* notifications; they only read, dismiss and configure.

# Not user-facing / work-in-progress — exclude from help articles

These exist in the code/data but have **no usable control** for staff today, or are internal. Don't write articles about them:

- **Favourites / starring notifications.** The data model supports a "favourite" flag (and favourited items survive Dismiss all and stay counted past 7 days), but there is **no button in the current UI to set or clear a favourite**. Mention favourites only as the reason Dismiss-all may leave some items behind — don't document "how to favourite".
- **Mark as read / unread buttons and "Mark all as read".** These actions exist in the underlying store but are **not surfaced** in the panel or page. Reading happens implicitly by clicking. Don't document a mark-read control.
- **Standalone `NotificationItem` / `AlertNotificationItem` cards** and a separate **alert-details pop-up** — these components exist but aren't mounted in the live Messages/Alerts surfaces today. The live panel is the IBM "Notifications panel" pattern. (Alert details still open from a *toast* click, but not from the panel list.) Treat the alert-details modal as not part of the documented flow.
- **A "Favourites" tab / unread-favourites count** — tracked in the store, no tab renders it.
- **Notification settings icon inside the bell panel** — present in the underlying component but hidden; settings live on the Settings page only.
- **Rich fields** (image, HTML body, resource-link lists, scenario data, "authorised by") — populated for some notifications but largely back-end-driven presentation; the user does nothing with them. Don't promise them as a consistent feature.
- **Offline/showcase seeding** (mock notification data, campus-switch reseed, count-from-store fallback) is demo-only and not part of the live user experience.

# Behaviours worth calling out in help copy (summary)

- **Two streams:** **Messages** (about you, usually actionable, deep-link on click) and **Alerts** (school-wide notices, no deep-link). The bell badge is the combined unread count.
- **Clicking = reading.** There's no separate mark-as-read; opening an item (or its pop-up) marks it read and, for messages, jumps you to the relevant screen.
- **Two ways to quieten things:** **Do not disturb** (in the bell panel, suppresses pop-ups) and **Push notifications** (in Settings, the master switch for pop-ups). Either off = no pop-up; the panel and bell keep working regardless.
- **Dismiss all keeps favourites** and asks for confirmation on the full page (but clears instantly from the panel).
- **Everyone has the same controls** — what differs between staff is which notifications the system sends them, decided by role server-side.
- **History is recent + 7 days** on your device; the badge stops counting unfavourited items older than 7 days.
