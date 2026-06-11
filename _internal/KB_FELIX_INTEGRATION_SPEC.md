# KB ↔ Felix / In-App Help — Integration Spec

> **The contract for how StaffXP consumes help-centre content.** Written for the docs team so authored pages plug in cleanly. Derived directly from the app source. Where the app and the planned-KB diverge, both are stated and the open decision is flagged.

---

## TL;DR — read this first

- Today, Felix help is a **single hand-authored TypeScript registry** in the app: `src/constants/help/helpTopics.ts` (`HELP_TOPICS: HelpTopic[]`). It is the **only** thing the app reads. Nothing currently ingests your Markdown, JSON, or built HTML at runtime.
- There is **no live KB pipeline, no manifest, no LLM, no embeddings.** Retrieval is a client-side fuzzy match (Fuse.js). Rendering is **verbatim** — Felix never paraphrases.
- The app code itself says the **intended** end state is: ingest from the training-team Markdown, ground an agent on it. **That ingestion + agent does not exist yet.** Treat it as planned.
- So this spec has two layers: **(A) the shape the app reads today** — match this and content drops in; **(B) the planned KB→app ingestion** — undecided, we design together. The `HelpTopic` interface in (A) is the concrete target schema your Markdown frontmatter/body must be able to produce.

---

## 1. Article ID

**Field:** `id` (string). Required, first field of every topic.

**Format today:** kebab-case, verb-first, one task per id. Real examples in the app:
`create-notice`, `set-notice-featured`, `edit-notice`, `create-wellbeing-note`, `track-resolve-note`, `wellbeing-task-from-note`, `update-wellbeing-note`.

**Namespacing:** none. Flat global string — **not** namespaced by feature/app. (`feature` is a separate display field; it is not part of the id.)

**Uniqueness:** assumed, not enforced. The app builds `new Map(HELP_TOPICS.map(t => [t.id, t]))` — duplicate ids silently last-write-win. No build-time validation.

**Stability guarantees:** none currently. Ids are hand-typed. The id is load-bearing in two places, so renames are breaking:
1. `getHelpTopic(id)` lookup key.
2. Opener-line rotation seed (`topic.id.length % …`) — cosmetic, but means id length subtly affects greeting choice.

**Does a global/KB article ID exist?** **No.** The KB has no id contract today; the app invents these kebab ids locally. **OPEN DECISION:** who owns id allocation, and is the KB page slug the id? Recommend: **the KB page is the authority**, app `id` == KB slug (stable, unique, 1:1 with a page). Decide before authoring at scale.

---

## 2. Manifest / index

**Today:** there is **no generated manifest.** The "index" is the in-repo `HELP_TOPICS` array, compiled into the app bundle at build time. No JSON, no hosted file, no fetch, no refresh cadence — content ships only when the app is rebuilt and redeployed.

**What you'd need for real KB-driven help (planned):** a generated manifest — an array of objects matching the `HelpTopic` shape below — produced from your KB pages and made available to the app (build-time import **or** a hosted `help-manifest.json` the app fetches).

**OPEN DECISIONS for the manifest:**
- Format: JSON array of `HelpTopic` (recommended — mirrors what the app already consumes).
- Produced by: a build step in the KB repo (frontmatter → fields, body → walkthrough steps/images).
- Hosted where: alongside the Docusaurus build? A known URL? Bundled into the app?
- Refresh cadence: on KB publish? On app build? Live fetch with cache?

---

## 3. Retrieval (how Felix picks the article)

**Mechanism today:** keyword **fuzzy** match, fully client-side, via Fuse.js. No semantic/embedding step.

**Indexed fields + weights** (this is exactly what scoring sees — nothing else):

| Field | Weight |
| --- | --- |
| `title` | 3 |
| `keywords` | 2 |
| `summary` | 1 |

> Note: `walkthrough.steps[].text` and `feature` are **not** indexed. Findability lives entirely in `title`, `keywords`, `summary`.

**Fuse config:** `threshold: 0.4` (0 = exact, 1 = anything), `ignoreLocation: true`, `minMatchCharLength: 2`.

**Query pre-processing** (`normaliseQuery`): lowercases, strips how-to lead-ins via regex (`how do i`, `how can i`, `how to`, `where do i`, `guide me`, `show me how`, `walk me through`, `steps to`, `help me`, `please`, `tell me`), strips punctuation, collapses whitespace. This is load-bearing — a trailing `?` alone can drop an otherwise-clean match, hence the stripping.

**Trigger gate:** the help intent only fires when the message **both** contains a how-to trigger phrase (`how do i`, `how can i`, `how would i`, `how to`, `where do i`, `guide me`, `show me how`, `walk me through`, `steps to`, `help me`) **and** the fuzzy search returns ≥1 topic. Otherwise the message falls through to other Felix intents (it does not hijack non-help questions).

**Ranking:** Fuse default relevance; the app takes the **top match only** (`searchHelpTopics(text)[0]`). No multi-result disambiguation in the answer (there is a fallback topic menu only when there are zero confident matches: `TOP_HELP_TOPIC_IDS = ['create-notice','create-wellbeing-note','track-resolve-note']`).

**Authoring implication:** because retrieval is keyword/title/summary only, **`keywords` is your findability lever.** Put real teacher phrasings and synonyms there (the app already does, e.g. `['create notice','new notice','post notice','add notice','make a notice','publish notice','announcement']`).

---

## 4. Ingestion (how content gets into Felix)

**Today:** **none.** Content is hand-written TypeScript objects in `helpTopics.ts`, compiled into the app. The app does **not** at runtime read Markdown, built HTML, a manifest, an API, or a DB. It does **not** parse MDX or any components (no `<Steps>`, no JSX) — there is no Markdown/MDX parser in this path at all. The file is hand-seeded as "a representative subset until the ingestion + agent plumbing exist" (the code's own words).

**Media handling today:** screenshots are static files under `/public/help-demo/*.png`, referenced by absolute path string. Video is a YouTube id or Bunny URL string. No upload/transform pipeline.

**Planned (not built):** ingest from the training-team Markdown — `summary` from frontmatter, `walkthrough` steps + images from the body — and ground an agent on it. **OPEN:** the parser that turns your Markdown/MDX (including `<Steps>`) into the `HelpTopic` shape does not exist; its mapping rules are undecided (see §8).

---

## 5. Rendering (verbatim vs paraphrase)

**Verbatim. Always.** There is no LLM in this path; Felix renders your fields exactly.

| Field | Where it renders |
| --- | --- |
| `summary[]` | Inline chain stepper (`HelpChainSteps`) — the short answer shown directly in chat. |
| `walkthrough.steps[].text` | Two-pane guided viewer; each step's text becomes an **H3 heading** (so keep it short). |
| `walkthrough.steps[].image` | Rendered directly under its step text; click opens a full lightbox ("Click to enlarge"). |
| `walkthrough.video` | First page of the viewer ("Overview"); YouTube (nocookie, `rel=0`) primary, Bunny fallback. |
| `route` | "Take me there" primary button → navigates to the feature. |
| `feature` | Quiet footer credit: `Help guide · StaffXP · {feature}`. |

**Inline formatting:** only `**bold**` is interpreted (a custom `InlineBold`/`helpInlineBold` renderer). **No other Markdown renders** — links, lists, italics, headings, tables, code, blockquotes, and MDX components all appear as literal text. The conversational lead-in above the card ("Here's how to …") is generated by the app from `title`, not authored.

---

## 6. Frontmatter / schema — the complete field set

This is the `HelpTopic` interface the app reads. **Match this and content plugs in.**

| Field | Required | Type / format | Purpose |
| --- | --- | --- | --- |
| `id` | ✅ | kebab-case string, unique | Identity + lookup key + deep-link anchor. |
| `feature` | ✅ | display string (`'Notices'`, `'Wellbeing'`) | Footer credit + grouping. **Not** searched. |
| `title` | ✅ | imperative phrase (`'Create a notice'`) | Highest search weight; viewer header. |
| `keywords` | ✅ | string[] of synonym phrases | Search boost — your main findability lever. |
| `summary` | ✅ | string[], 3–4 short lines, `**bold**` ok | The inline answer (chain stepper). |
| `walkthrough.steps` | ✅ | array of `{ text, image? }` | The guided procedure. `text` `**bold**` ok; `image` absolute `/…` path. |
| `route` | ⬜ optional | app path string (`'/notices/manage'`) | "Take me there" deep-link. Omit → no button. |
| `walkthrough.video` | ⬜ optional | `{ youtube?: string; bunny?: string }` | Overview clip. `youtube` = 11-char id; `bunny` = embed URL. |
| `walkthrough.steps[].image` | ⬜ optional | absolute web path | Per-step screenshot. |

**Fields the docs team asked about that DO NOT exist today** (flag — author would be writing to nothing until modelled):
- **`question` / `intent`** — there is no per-article question field; how-to triggers are a single global list, not per-page.
- **`category`** — none; `feature` is the nearest thing.
- **`app`** — none (single app today).
- **`related`** — none.
- **deep-link** — only the single `route` string exists; no structured/parameterised deep-link, no "related routes".

If we want any of these, they must be added to the `HelpTopic` interface **and** the ingester — decide in §8.

---

## 7. Toggletips / deep-links

**Article → app screen ("Take me there"):** the topic's `route` string is passed to react-router `navigate(route)`. One-way, plain app path, hand-set per topic. Maps an article back to the **feature screen**, not to a specific element on it.

**App element → article (toggletips / help icons):** **DOES NOT EXIST.** No in-app toggletip, help icon, or UI element anywhere references a help topic id. Searched: the only consumers of `HELP_TOPICS` are the Felix chat path (`intentRouter`, `HelpCard`, `CustomComponentRenderer`) and two `/dev` preview labs. The **sole entry point to help today is typing a how-to question to Felix.** (The onboarding "JIT pulse-tips" are a separate system and do not link to KB articles.)

**OPEN DECISION:** if we want UI elements to deep-link into articles, we need a **UI-element → article-id registry** (and a way to open the help viewer outside chat). Undecided — does not exist.

---

## 8. Constraints the docs must respect

1. **One task per page.** Strongly assumed. Each `HelpTopic` = one task = one `summary` + one linear `steps` sequence + one `route`. Multi-task pages have no representation.
2. **`summary`: 3–4 short lines.** It's an inline stepper, not prose. Front-load the click path.
3. **Only `**bold**` renders.** No links, lists, italics, headings, tables, code, blockquotes, or MDX/JSX — these show as literal characters. Plan around this (or extend the renderer — a decision, not a given).
4. **Step text becomes a heading** in the viewer — keep each step to one short instruction.
5. **Images:** web-served paths the app can load (today `/public/help-demo/*.png`). One image per step max. Alt text is not currently used (decorative `alt=""`) — accessibility gap to flag.
6. **Video:** one per article. YouTube id (primary; played via nocookie host) or Bunny embed URL (fallback for schools that filter YouTube).
7. **`id` must be unique and stable** — it's a map key and a deep-link anchor. Renames are breaking.
8. **`keywords` carries findability** — retrieval ignores body/steps, so synonyms must live in `keywords` (and `title`/`summary`).

---

## 9. Current state vs planned — what's real

| Capability | State |
| --- | --- |
| `helpTopics.ts` registry, the `HelpTopic` shape | ✅ **Live** (showcase). The concrete contract. |
| Felix answers how-to questions → summary card + guided walkthrough | ✅ **Live** (showcase mock; client-side). |
| Fuzzy keyword retrieval (Fuse.js, title/keywords/summary) | ✅ **Live.** |
| "Take me there" deep-link via `route` | ✅ **Live.** |
| Screenshots per step + click-to-enlarge; YouTube/Bunny video | ✅ **Live** (where authored; some topics use a placeholder video). |
| **Ingesting content from the KB Markdown** (frontmatter→summary, body→steps/images) | ⛔ **Planned / not built.** |
| **A grounded LLM agent** over the KB (semantic retrieval, generated answers) | ⛔ **Planned / not built.** Today it's verbatim + fuzzy. |
| **Generated manifest / index** (JSON) | ⛔ **Does not exist.** |
| **App-element → article toggletips / registry** | ⛔ **Does not exist.** |
| `category` / `app` / `related` / per-article `question` fields | ⛔ **Not modelled.** |

**Do not author to the ⛔ rows as if they exist.** They are the design space, not the current contract.

---

## 10. Open decisions to settle together

1. **Article ID authority** — KB slug == app `id`? Who allocates/guarantees uniqueness + stability?
2. **Manifest** — format (JSON array of `HelpTopic`?), producer, host, refresh cadence.
3. **Markdown → `HelpTopic` mapping** — exact frontmatter keys; how the body (and any `<Steps>`/MDX) maps to `summary[]` + `walkthrough.steps[]` + per-step images + video.
4. **Renderer scope** — keep bold-only, or support links/lists in `summary`/steps?
5. **New fields** — do we add `category` / `app` / `related` / per-article `question`(intents)? If so, app interface + ingester both change.
6. **Retrieval upgrade** — stay fuzzy-keyword, or move to embeddings/grounded agent? Changes what text must be indexable (today: title/keywords/summary only).
7. **UI → article** — build a toggletip→article registry and an out-of-chat help launcher, or keep Felix-typed-question as the only entry point.

---

### Source references (app)
- Registry + schema + retrieval: `src/constants/help/helpTopics.ts`
- Routing/trigger gate: `src/_mock/felix/intentRouter.ts` (`helpIntent`, `HELP_TRIGGERS`)
- Render seam: `src/components/chat/CustomComponentRenderer/CustomComponentRenderer.tsx` (`case 'help'`)
- Answer card + footer + "Take me there": `src/components/chat/HelpCard/HelpCard.tsx`
- Guided viewer (steps/images/video/lightbox): `src/components/chat/HelpCard/HelpWalkthroughViewer.tsx`
- Bold-only inline renderer: `src/components/chat/HelpCard/helpInlineBold.tsx`
- Demo screenshots: `public/help-demo/*.png`
- Strategy context (planned): `docs/HELP_STRATEGY.md`
