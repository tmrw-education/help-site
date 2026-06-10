# Why the tmrw Help pages look the way they do

*The evidence behind our documentation format — a reference for the training team
and anyone reviewing the Help Centre.*

## Who we're writing for

The tmrw Help Centre is used by **educators** — teachers, admin, school leaders,
bursars, parents — **not** developers or technical staff. They arrive **at the
point of need** ("how do I publish a notice?"), are usually **time-poor**, have
**varied digital literacy**, and some are on **mobile**. Every format decision
below is judged against *that* reader, not a power user.

## How we decided (not by opinion)

We ran a structured, multi-source research pass and **adversarially fact-checked**
every claim (each had to survive a 3-vote refutation test). 25 sources were
fetched across learning science, UX practice, and technical-writing style guides;
120 candidate claims were extracted; **22 survived verification, 3 were killed.**
What follows is built only on the claims that survived, with the weak spots called
out honestly at the end.

---

## What the evidence says — and the rule it gives us

### 1. Keep each screenshot next to the step it explains (spatial contiguity)
People learn procedures better when the words and the picture are **physically
close**. Meta-analysis: **g = 0.63** across 58 comparisons (n = 2,426)
(Schroeder & Cenkci, 2018); the effect held in **22 of 22** tests in Mayer &
Fiorella's review.

> **Rule:** the screenshot sits **immediately under the step it shows** — never
> after a block of steps.

### 2. Don't split the reader's attention (split-attention effect)
When two things must be understood *together* (a step and the screenshot it
describes), separating them forces the reader to hold one in memory while hunting
for the other — wasted effort that hurts novices most (Cambridge Handbook of
Multimedia Learning; Ayres & Sweller).

> **Rule:** the **anti-pattern** is putting numbered callouts on an image while the
> text that explains them sits in a separate block away from it. Integrate them.

### 3. Show one thing; cut the clutter (coherence effect)
Extra, decorative, or off-topic visual detail *lowers* learning — it eats limited
attention (Mayer & Moreno; median effect **d ≈ 0.86**). A full-window screenshot
with menus, sidebars and chrome, or one composite image cramming a whole task,
makes the reader search for the part that matters.

> **Rule:** **crop tight** to the relevant area; **one focused thing per image**;
> never a single composite image for a whole task.

### 4. Mark the exact thing to click (visual signaling)
A controlled **eye-tracking** study (*Effects of Visual Signaling in Screenshots*,
Technical Communication, 2019) found readers using **signaled** screenshots
(arrows / boxes / highlights on the relevant element) completed **more tasks
correctly** — and looked straight at the marked area.

> **Rule:** **signal the element** on the image (a box/arrow/callout) so the reader
> can't miss it.

### 5. Write fully worked steps for a beginner (worked-example effect)
Novices learn far more from **explicit, worked, step-by-step** guidance than from
being left to explore (Tuovinen & Sweller, 1999, teaching a database program; via
Kalyuga, 2007). Because our readers are novices by default, we write for them.

> **Rule:** spell out every step in plain language; assume no prior knowledge.

### 6. Format for scanning, not reading (how people actually use help)
Time-poor users **skim** — they jump between headings, bold words and pictures
(NN/g "layer-cake" scanning). Scannable formatting tested **~47% more usable**
(Morkes & Nielsen, 1997). Chunking content into small units improves comprehension
and lets people skim to the part they need.

> **Rule:** descriptive step titles, **bold the on-screen labels**, one action per
> step, short chunks — no walls of text.

### 7. Beginners benefit; experts don't need it (expertise-reversal)
The same screenshots that help a novice become redundant for someone who already
knows the screen (Kalyuga, 2007).

> **Rule (optional):** offer **collapsible "show me" detail** so confident/returning
> users can skip what they don't need.

### 8. Video is a supplement, not the format
*Medium confidence — reasoned, not from a single surviving study.* A video can't be
scanned or jumped into at the point of need, and motion/audio adds processing load
(NN/g scanning; coherence). A well-integrated static page satisfies the same
learning goals at lower production cost and lower staleness risk.

> **Rule:** use a short, silent, captioned clip **only** when a gesture, drag, or
> timing genuinely can't be shown in a still — and always keep the scannable
> text+image steps on the same page.

---

## The format, in one line

**One task per page → fully worked steps written for a beginner → each step's
screenshot sits right under it, cropped tight, with the exact element marked →
scannable headings and bold labels → video only when motion is essential.**

## Do / Don't (the team's cheat-sheet)

| ✅ Do | ❌ Don't |
|---|---|
| Put the screenshot **right under its step** | Bunch images after a block of steps |
| **Crop tight** to the relevant area | Use full-window shots with extra chrome |
| **One focused thing** per image | Cram a whole task into one composite image |
| **Mark the element** (box/arrow/callout) | Leave the reader hunting for what to click |
| Image the steps that **need** it | Screenshot self-evident steps ("click **Next**") |
| **Bold the exact on-screen labels** | "click the blue button" |
| One action per step, descriptive titles | Walls of text |
| Short captioned clip only for motion | Replace text steps with a video |

---

## Honest caveats (so we don't overclaim)

- **Effect sizes are approximate.** Cite spatial contiguity as **g ≈ 0.63**
  (meta-analytic anchor); coherence as **d ≈ 0.86** (range 0.70–0.97); the **47%**
  scannability figure is from a small 1997 study — treat as illustrative.
- **The split-attention rule passed 2 of 3 verification votes**, not unanimously.
  The dissent is useful: if a step's text is **fully self-explanatory**, it doesn't
  need an image, and over-illustrating risks redundancy. → *Image the steps that
  need it, not every step.*
- **The video recommendation is medium-confidence** — no peer-reviewed study
  directly comparing video vs. integrated static help survived verification.
- **Style guides** (Microsoft Writing Style Guide; Google developer documentation)
  were consulted and broadly agree ("one action per step," "use screenshots
  sparingly," keep them current), but specific wording should be confirmed against
  those guides directly.
- **Mobile specifics** were under-covered by the surviving evidence — image sizing
  and tap-target layout on small screens is an open question worth a later look.

## Sources

- Schroeder & Cenkci (2018), *Spatial Contiguity and Spatial Split-Attention*,
  Educational Psychology Review — https://link.springer.com/content/pdf/10.1007/s10648-018-9435-9.pdf
- *The Split-Attention Principle in Multimedia Learning* (Ayres & Sweller),
  Cambridge Handbook of Multimedia Learning — https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/splitattention-principle-in-multimedia-learning/497A2FCB9737E3009B3CF0E4D97F7B99
- Mayer & Moreno, *Nine Ways to Reduce Cognitive Load in Multimedia Learning* —
  https://faculty.washington.edu/farkas/WDFR/MayerMoreno9WaysToReduceCognitiveLoad.pdf
- Kalyuga (2007), *Expertise Reversal Effect and Its Implications* —
  https://www.uky.edu/~gmswan3/EDC608/Kalyuga2007_Article_ExpertiseReversalEffectAndItsI.pdf
- *Effects of Visual Signaling in Screenshots* (eye-tracking study, 2019) —
  https://www.researchgate.net/publication/326265014_Effects_of_visual_signaling_in_screenshots_an_eye_tracking_study
- Nielsen Norman Group: Chunking — https://www.nngroup.com/articles/chunking/ ·
  Layer-cake scanning — https://www.nngroup.com/articles/layer-cake-pattern-scanning/ ·
  Formatting long-form content — https://www.nngroup.com/articles/formatting-long-form-content/ ·
  Help & documentation — https://www.nngroup.com/articles/help-and-documentation/
- Microsoft Writing Style Guide — *Step-by-step instructions* —
  https://learn.microsoft.com/en-us/style-guide/procedures-instructions/writing-step-by-step-instructions
- Google developer documentation style guide — *Images / Screenshots* —
  https://developers.google.com/style/screenshots

*Method: multi-source web research with 3-vote adversarial verification per claim
(25 sources → 120 claims → 22 confirmed). Last updated 2026-06-10.*
