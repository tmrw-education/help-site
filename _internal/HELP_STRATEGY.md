# StaffXP — In-App Help & Training Strategy

**For:** Internal team review / approach alignment
**Status:** Proposed direction (thinking-through doc, not yet built)
**Last updated:** 2026-06-06

---

## TL;DR

Replace the clunky topics page with a **layered help system** built on **one knowledge base**, surfaced three ways:

1. **Contextual tooltips** in the app (free) — for the genuinely non-obvious controls.
2. **A searchable public Help site** (free, GitHub Pages) — browse/search articles with video.
3. **Felix** (paid per message) — conversational answers, *grounded* on the same KB.

One content source (our existing KB), three doors, linked by **topic IDs**. The cheap/free surfaces handle the common questions; Felix handles the long tail. That layering is both better UX **and** the cost-control strategy — Felix is the only piece that costs real money at scale.

---

## The problem

The current topics page is clunky — likely a **content findability / IA / search** problem, not a "needs to be a chatbot" problem. A chatbot bolted over weak content is just clunky with extra latency. So the real asset is the **help content** (which we've been building), and the job is surfacing it well.

## Guiding principles

- **The value is the content + grounding, not the chat UI.** Wrong/hallucinated help is worse than no help — it burns trust fast, especially with busy school staff.
- **Felix is an accelerant, never the spine.** Help must work when Felix is slow/down (free surfaces always work).
- **Free surfaces first, Felix as the smart fallback.** Deflect common questions to tooltips + KB; reserve paid Felix for the long tail.
- **One source of truth.** Update an article once; all three surfaces improve.
- **SaaS-safe.** Multi-tenant: everything must be reachable by every school with **no login gate** (same lesson as our feedback intake).

---

## The approach — layered help, one KB

### Surface 1 — Contextual tooltips (in-app)
Small help markers pinned to the genuinely non-obvious controls (we have an affordance audit identifying these — e.g. "Felix can *do* things," where the theme switcher lives, stat-cards-are-filters, expandable rows).
- Click a "?" / info marker → a short popover: one line of plain copy **+ "Learn more"** (deep-links to the matching KB article with its video) **+ optional "Ask Felix."**
- **Discoverability:** a "?" in the toolbar toggles "help mode" — flip it on and the helpable spots light up; off and they vanish. Non-intrusive by default.
- Works with zero Felix dependency (it's just UI + a link). **Free.**

### Surface 2 — Searchable Help site (the KB)
Our existing content, published as a **public help site** with real search, navigation, video, and images. This is the browse/self-serve anchor and Felix's knowledge source — the same site serves humans and the AI. **Free** (GitHub Pages).

### Surface 3 — Felix (grounded)
Felix answers "how do I…" conversationally, **grounded on the KB** (Copilot Studio knowledge source) so answers stay accurate and cite/link the real article. When it doesn't know: "I don't have that one — here's the article / contact," never a guess.
- Note: **no special "help mode" needed** — a grounded agent answers help questions inline as part of normal chat.
- **Paid** per message (see costs).

### The spine: topic IDs
Every help topic gets a stable **ID**. The tooltip, the KB article URL, and Felix's citation all reference the same ID → **one content source, three surfaces.** The tooltip's "Ask Felix" can open Felix pre-seeded with the topic's question. Layers hand off to each other.

---

## Architecture / stack

| Piece | Choice | Why |
|---|---|---|
| **KB authoring** | Markdown in **GitHub** | Content already lives there; small technical team maintains it |
| **KB site** | **MkDocs Material** or **Docusaurus** → **GitHub Pages** → `help.<domain>` | Free, searchable, clean per-topic URLs, you control it |
| **Video host** | **Bunny Stream** on a **custom domain** (`video.<domain>`) | Public/anonymous (all tenants), **custom domain dodges school content filters** that block YouTube/Vimeo by name |
| **Felix** | **Central Copilot Studio agent** grounded on the public KB URL | One agent for all tenants (SaaS) → ground once, works everywhere |
| **In-app** | Tooltips + a Help entry, keyed by topic ID → same article URLs | One source, three surfaces |

### Decisions / gotchas locked in
- **Felix is central** (one shared agent — our app is SaaS), so grounding one public KB covers every tenant.
- **Public KB approved** — published to a public web URL (no tenant gate). SharePoint was rejected for the *human-facing* KB (tenant-login-gated; fine only as a private grounding source).
- **Video host must be public + filter-proof:**
  - ❌ **Microsoft Stream** — tenant-gated (OneDrive/SharePoint-backed) → external schools can't view → same access problem.
  - ⚠️ **YouTube** — free but **commonly blocked on school networks** (dealbreaker for our audience).
  - ✅ **Bunny Stream via custom domain** — public, cheap, no branding, and the custom domain isn't on filter blocklists.
- **Videos are embedded, never committed to the repo** (git is bad at big binaries). Bunny Stream **includes** CDN delivery + player — no separate CDN product needed; GitHub Pages already CDN-serves the site/images.
- **Felix grounds on text, not video** — it reads the article and **links** to the clip ("watch the 30-second clip"); it doesn't "play" video.

---

## Cost model

**Context:** ~100k users, ~200 help videos (~1–1.5 min each), **starting in the Middle East market** (Bunny's priciest delivery region). All costs are bundled into our product subscription (COGS/margin, not user-facing). *Pricing is approximate — verify current rates.*

### Video — Bunny Stream
- **Storage:** ~13 GB → **~$0.13/month** (negligible).
- **Delivery** scales with **views, not users** (~10 MB per view assumed: ~1.5 min, adaptive ~480–720p).

| Region (delivery $/GB) | Light (200k views, 2 TB) | Moderate (500k, 5 TB) | Heavy (1M, 10 TB) |
|---|---|---|---|
| Europe & N. America ($0.01) | $20 | $50 | $100 |
| Asia & Oceania ($0.03) | $60 | $150 | $300 |
| South America ($0.045) | $90 | $225 | $450 |
| **Middle East & Africa ($0.06)** ⬅ start here | **$120** | **$300** | **$600** |

- **Our realistic figure (ME, light–moderate help usage): ~$120–$300/month.** Rounding error vs. the value.
- Swing factors: heavier clips (1080p) → ~1.5–2×; expanding into EU/NA blends the rate **down** (6× cheaper there).

### Felix grounded help — Copilot Studio (the real line item)
- Billed **per message**: ~$0.008/message (capacity pack: $200 / 25,000) to ~$0.01 (pay-as-you-go).
- **Grounded answers cost ~2× a classic reply** → a grounded help answer ≈ **~2 message-units ≈ ~$0.016–0.02.**

| Help answers / month | Message-units | @ $0.008 | @ $0.01 |
|---|---|---|---|
| 100k | 200k | ~$1,600 | ~$2,000 |
| 500k | 1M | ~$8,000 | ~$10,000 |
| 1M | 2M | ~$16,000 | ~$20,000 |

- **This dwarfs video** (thousands–tens-of-thousands/mo vs. hundreds). It's the cost that needs managing.

### Net (rough planning)
| Component | Monthly |
|---|---|
| KB site (GitHub Pages) | **Free** |
| Video (Bunny, ME, realistic) | ~$120–300 |
| Felix grounded help | ~$1.5k–10k (adoption-dependent, **controllable**) |

---

## Cost-control strategy (= the layered design)

Every question answered **without** invoking Felix is **free**:
- Tooltips (static UI + link) → free
- KB browse/search (GitHub Pages) → free
- Felix (grounded answer) → **paid per message**

**Route the common, simple "how do I X" to the free surfaces; let Felix handle the long tail / "I can't find it."** If tooltips + KB deflect even 60–70% of help intents, the Felix cost table drops by the same proportion. A help system that is *only* Felix is the most expensive possible design.

> Bonus: this same help system fills the "Help feature doesn't exist yet" gap flagged in the onboarding plan — it becomes the self-serve anchor onboarding needs.

---

## Key decisions made
1. Layered help (tooltips + KB site + grounded Felix), **not** an ungrounded chatbot, **not** the old topics page alone.
2. Public KB site on **GitHub Pages** (content already in GitHub; small team maintains).
3. **Bunny Stream + custom domain** for video (school-filter-proof); **not** MS Stream, **not** YouTube.
4. **Central Copilot Studio** Felix grounded on the public KB.
5. **Topic IDs** as the single spine linking all three surfaces.
6. Deflection (free surfaces first) is the **cost strategy**, not just UX.

## Open questions / next steps
1. **Pick the site generator** — MkDocs Material (simplest) vs Docusaurus (more flexible). 
2. **Pilot a video on Bunny via a custom subdomain and test playback on a real ME school network** (confirms the filter-proof claim before standardizing).
3. **Stand up the public KB** from existing GitHub content → choose `help.<domain>`.
4. **Wire Copilot Studio grounding** to the public KB URL (verify citations/freshness).
5. **Build the tooltip system** (topic-ID-keyed) using the affordance audit as the where-list.
6. **Verify current pricing** for Bunny and Copilot Studio (both change).
7. Define **deflection routing** UX (tooltip → KB → Felix hand-offs).

## Risks / caveats
- **Hallucination** if Felix isn't properly grounded → the whole approach hinges on grounding quality. Always provide a "no guess / here's the article" fallback.
- **School network filtering** of video — validate Bunny custom-domain playback on real school networks early.
- **Copilot Studio cost** scales with adoption — deflection is essential; monitor message volume.
- **Pricing drift** — Microsoft and Bunny both change rates; figures here are order-of-magnitude.
- **Content maintenance** — the KB is an ongoing commitment; stale help is worse than none.

---

*Questions / corrections → Kelley.*
