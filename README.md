# Handoff — inFIELD7 Marketing Site (Attendance)

## Overview

Responsive single-page marketing site for **inFIELD7** — an enterprise workforce
management & field employee tracking platform. On the Play Store the product is
listed as **Attendance**; on the web it's called **inFIELD7**. Both refer to the
same Android app + admin dashboard.

The site includes:

1. A **3-step interactive intro** that plays once per session before the main
   site: business type → business-specific questions → lead-capture form.
2. A **navy "PRESENTING → inFIELD7" reveal panel** that plays after the intro
   (2 seconds).
3. A **12-section main site**: hero → problem → one-app → live location →
   attendance → field activity → manager dashboard → payroll → 8 module tiles
   → how it works (+ 6-step login flow) → why the app uses location →
   download → contact → industries/audiences → final CTA → footer.
4. Two standalone **legal pages**: `privacy.html` and `terms.html`
5. A **design-time dev tweaks bar** (bottom-left) — remove before production.

---

## About the Design Files

The files in this bundle are **design references written in HTML/CSS/vanilla JS**.
They are a working prototype showing the intended look, layout, motion, and copy
— **not production code to ship as-is**.

The task is to **recreate these designs in your codebase's existing environment**
using its established patterns and libraries:

- If your app is a React / Next.js project → port sections to JSX components,
  use your CSS-in-JS / Tailwind / CSS modules solution.
- If Vue / Nuxt → single-file components.
- If no environment exists yet → Next.js + Tailwind is a reasonable default
  for a marketing site.

The CSS in this bundle is plain, token-driven, and small enough (~1,700 lines)
that porting it component-by-component is straightforward.

---

## Tech stack currently in use

| Layer | Tech |
|---|---|
| Markup | HTML5 (3 pages: `index.html`, `privacy.html`, `terms.html`) |
| Styles | One hand-written stylesheet `styles.css` (~1,700 lines, CSS custom properties for tokens) — no preprocessor, no framework |
| JS | Single vanilla-JS IIFE at the bottom of `index.html` — no build step |
| Fonts | **Inter** (400/500/600/700) + **JetBrains Mono** (500) via Google Fonts CDN |
| Icons | 100 % inline SVG — no icon library |
| Animation | IntersectionObserver + CSS `@keyframes` |
| State | `sessionStorage` (intro completion + lead form) + `localStorage` (dev toggle) |
| Backend | None. Static site. Drop into any static host. |

---

## Fidelity

**High-fidelity (hifi).** These mocks are pixel-close to intended production
output. Colors, typography, spacing, radii, shadows, animations, and copy are
all final. Recreate the UI pixel-perfectly using your codebase's libraries.

---

## Live Preview

Open `index.html` in any modern browser. All assets are local; the only external
dependency is Google Fonts.

**Testing the intro:**
- First load: intro shows automatically.
- Replay: click "Replay intro" in the dev-tweaks bar (bottom-left).
- Force it every load while porting: check "Always show intro" (persists in
  localStorage).

---

## Screens / Views

### 0. Intro Overlay (`.intro`, `#intro`)

**Purpose.** Warm the visitor up. Ask two quick questions so the hero can
personalize, then capture a lead.

**Layout.** Full-viewport fixed overlay on `--bg-alt` (#F4F7FB). Top row has
logo (left), 3-dot progress indicator (center — hidden below 520 px), "Skip
intro →" (right). Center holds one of three step panels.

**State (JS):**
```js
var state = {
  businessType: null,       // set in step 1
  problems: [],             // question strings selected in step 2
  lead: null,               // { business, contact, phone } from step 3
  currentStep: 1
};
```

**Persistence:** on finish → `sessionStorage[inf7_intro_done_v1] = '1'` and
`sessionStorage[inf7_lead] = JSON.stringify(state.lead)`.

#### Step 1 — Business type (single-select, auto-advance)

- 7 compact cards in `.intro-grid.biz` — 4-col grid, falls back to 2-col at
  800 px, 2-col at 480 px.
- Data attribute: `data-b="Service Centers" | "Construction" | "Healthcare" | "Field Sales" | "Maintenance" | "Logistics" | "Other"`
- Selecting a card highlights it in blue, then auto-advances to step 2 after
  260 ms.

#### Step 2 — Business-specific questions (multi-select)

- Cards are rendered dynamically by `renderBusinessQuestions()` from the
  `BUSINESS_QUESTIONS` map based on `state.businessType`.
- Heading personalizes: **"For a construction team, which of these are true?"**
- Each question card: 40 × 40 icon square, body text, circular checkmark.
  Selected: `--blue` border + `--blue-tint` bg + filled blue checkmark.
- **Continue** button disabled until ≥ 1 selected. **Back** returns to step 1.

**Question banks (5 questions per business):**

**Service Centers**
1. How many technicians are actually available today?
2. Who is assigned to which job, and where are they posted?
3. Can you verify employees are actually at the attendance location?
4. Do you have visibility into technician visits and completed jobs?
5. How much time is lost because you can't see who's free for the next call?

**Construction**
1. How many workers are actually present at each site today?
2. Who arrived, who left, and how many hours did they actually work?
3. Are workers staying at the assigned site or leaving during hours?
4. Which workers are assigned to which site or task?
5. Are daily wages based on actual attendance and working hours?

**Healthcare**
1. Do you know which doctors, nurses and staff are available right now?
2. Can you see who is assigned to each ward or department?
3. Are staff actually present at their assigned workplace at check-in?
4. Can you track shift schedules and staff availability in one place?
5. What happens when someone leaves their assigned area during a shift?

**Field Sales**
1. Do you know where your sales team is and who is available right now?
2. Can you verify which clients each salesperson actually visited?
3. Are salespeople completing their planned visits and schedules?
4. How much visibility do you have into daily field activity?
5. Can you measure field performance based on actual visits and progress?

**Maintenance**
1. How many technicians are on-shift and free for the next job?
2. Are technicians actually on-site when they mark job complete?
3. Can you track which jobs were assigned, started, and closed?
4. How much time is spent looking for the nearest available technician?
5. Do you have a single view of scheduled and unscheduled work?

**Logistics**
1. Do you know where your drivers and delivery crews are right now?
2. Can you verify a delivery was actually made at the right address?
3. Are drivers completing their planned routes on time?
4. How much time is lost coordinating dispatch on WhatsApp calls?
5. Can you measure route performance and daily delivery activity?

**Other** — generic fallback with 5 workforce visibility questions.

#### Step 3 — "We've solved it all." + form

- **Heading:** "We've solved it all."
- **Sub-line:** "We've built the tools your {businessType} team needs to fix that."
- **Two-column layout** (`.intro-form-wrap`) — form left (1.15fr), solutions
  aside right (0.85fr). Collapses to 1-col at ≤ 900 px.
- **Form fields (`.intro-form`):**
  - Business name — text
  - Contact name — text
  - Phone number — tel with `+91` prefix + 15-char max (accepts any input)
- **Validation:** none. Any values accepted, form always submits.
- **Solutions aside:** shows amber-checkmark chips built via keyword-matching
  step-2 answers through `questionToSolution()`. Chip icons use `--accent` (orange).
- **Submit** stores lead in sessionStorage, then triggers `finishIntro()`.

**Transitions between steps:** `.intro-step.is-leaving` fades out (260 ms +
transform 12 px), next step fades in with `step-in` keyframe (400 ms).

**Dismissal paths:**
- Skip button → `skipIntro()` (no reveal panel)
- Escape key → skip
- Form submit → `finishIntro()` (with reveal panel)

### 0b. Reveal Panel (`.reveal-panel`, `#revealPanel`)

**Purpose.** 2-second cinematic reveal after the intro.

**Layout.** Full-viewport `--navy` panel. Wipes up from `translateY(100%)` to
0 (550 ms). Center column contains:
1. Logo (72 px tall, tinted white via `filter: brightness(0) invert(1)`)
2. "PRESENTING" (letter-spacing 0.35em, muted white)
3. "inFIELD7" — 3 spans that cascade in, the "7" is `--blue`
4. Sub-line: "One Platform. Complete Workforce Visibility."

**Auto-dismissal:** 2 seconds after appearing (`REVEAL_MS = 2000`). Wipes
UP off-screen via `.is-leaving` class.

**Manual dismissal:** click anywhere on the panel, or press Escape/Enter/Space.

### 1. Sticky Nav (`.nav`, `#nav`)

- Fixed top, full-width, white with border-bottom on scroll. 72 px tall,
  shrinks to 60 px at ≤ 640 px.
- **Logo** (36 px img + wordmark "inFIELD7") · **Links:** Product · Solutions ·
  Features · How It Works · Industries · Pricing · Download · **CTA:** "Book a
  Demo" (orange primary).
- **Mobile (< 960 px):** hamburger button appears; nav links + CTA hide.

### 2. Hero (`section.hero`)

- Two columns: copy (1.05fr) + phone (1fr). Stacks below 1024 px.
- Background `--bg-alt` with a subtle radial gradient wash top-right.
- **Left column:**
  - Eyebrow pill (`.hero-eyebrow`, hidden by default; set to "Built for
    {businessType} teams" after intro).
  - H1 (clamp 36 → 60 px, `-0.03em`): "Manage Your Workforce. Smarter."
  - Blue line (22 px, `--blue`): "One Platform. Complete Workforce Visibility."
  - Lead paragraph
  - **Buttons:** primary orange "Book a Demo" + outline "See How It Works"
  - 3 checks: Live location · Real-time attendance · Auto payroll
- **Right column:** 360 px phone mockup showing `assets/mobile-ref-hd-2x.png`
  with animated overlays (`.hp-live-pill`, `.hp-fp-ripple`, `.hp-toast`),
  ambient concentric rings behind it, and two floating stat chips:
  - **Top-left:** "On duty now · 32 / 150" (green icon)
  - **Bottom-right:** "Monthly payout · ₹24,000" (**amber/orange icon** —
    reinforces primary CTA color)

### 3. Problem (section 2)

3-card row (`.prob-cards`). Each card: label + question.
Bottom line: "Spreadsheets, calls and manual updates aren't enough."
Followed by big blue line: "That's where we come in."

### 4. One App (section 3)

3-col grid — 6 labeled icons around a center phone, dashed SVG connectors
on desktop. Below 900 px sides become a 3-col row above the phone.

### 5. Live Location (section 4)

Split — copy left, map panel right. Map has faux roads (SVG), 5 drifting
markers (`marker-drift`), dashed geofence circle, bottom-left "Zone alert"
toast, employee list, and legend row.

### 6. Attendance (section 5)

Split — panel left, copy right. `.att-panel` has 3 KPIs, employee table
(entry/exit times + status pills), 7-day attendance bar chart.

### 7. Field Activity (section 6)

Split — copy left, `.field-panel` right. 3 KPIs, animated "Sales progress
72%" bar, 4-visit mini-timeline.

### 8. Manager Dashboard (section 7)

Full-width `--navy` band with a large browser dashboard mockup:
- Sidebar (hidden < 900 px) — 9 nav items
- Topbar — "Good afternoon, Layla · Wednesday · Sep 22"
- **8 KPI cards** (`.kpis-8`) — Present, Absent, On Leave, Employees, Sales,
  Payroll, Field Visits, Attendance %
- **4 chart panels** — attendance bars, sales line chart (draws in via
  `stroke-dashoffset`), payroll donut (55/25/20), field activity bars

### 9. Payroll (section 8)

Split — copy left, 3 cards right. Daily ₹800 · Weekly ₹5,600 (highlighted
navy) · Monthly ₹24,000. Numbers count up on scroll.

### 10. Everything in One Place (section 9)

**8 feature tiles** (`.tiles.tiles-4`) — 4 col → 3 col at 1024 → 2 col at 800 → 1 col at 500:

1. Clock in / Clock out
2. Office location check
3. Live tracking on shift
4. Leave requests
5. Holidays & history
6. MPIN lock
7. Admin dashboard
8. Update notices

### 11. How It Works (section 10)

**Top:** 3-step macro flow with 44 px numbered circles.

**Below:** "How employees sign in — Six taps and you're in." subsection with
6 login-flow items in a 3-col grid: Open the app → Enter name & phone →
Pick your office → Accept T&C + Privacy → Set a 4-digit MPIN → Next time
MPIN only.

### 12. Why the App Uses Location (section 10b, `#location-why`)

Split — 4 green-check rules left, 4-permission card right.

**Rules:** at clock-in/out · during shift · when clocked out · you can refuse.

**Permissions card:** Precise/coarse location · Background location ·
Foreground service · Notifications.

Button: "Read the full Privacy Policy" → `privacy.html`.

### 13. Download (section 11b, `#download`)

2-col — copy + Play Store button left, phone mockup right (phone moves
above on mobile via `order: -1`).

**Play button:** dark navy pill (`.dl-play`) linking to
`https://play.google.com/store/apps/details?id=com.ankit.attendance`.
Meta rows: Package = `com.ankit.attendance` · Platform = Android · No iOS yet.

### 14. Contact (section 11c, `#contact`)

3 cards: Email (mailto:), Phone (tel:), Address.
**All three values are `[SUPPORT EMAIL]` / `[SUPPORT PHONE]` / `[COMPANY ADDRESS]`
placeholders — replace before shipping.**

### 15. Who It's For (section 11, `#industries`)

- **3 audience cards on top** (`.who-cards-3`): Employees / Managers /
  Work use only.
- **Below:** "By industry" sub-heading + 6 industry cards: Service Centers,
  Construction, Healthcare, Field Sales, Maintenance, Logistics.

### 16. Final CTA (section 12, `#demo`)

`--navy` background, centered. H2 (word-cascade) "Manage Your Workforce.
Smarter." + orange "Book a Demo Today" + outline "Explore the Platform".

### 17. Footer

5-col grid (1.4fr / 1fr × 4). Brand + one-line description on the left,
then Product / Solutions / Company / Legal columns. Copyright row at bottom.

**Legal column links:**
- Privacy Policy → `privacy.html`
- Terms & Conditions → `terms.html`
- Location use → `#location-why` anchor

---

## Legal Pages

### `privacy.html`

Full 13-section Privacy Policy for the Attendance Android app. Slim sticky
header, same design tokens as main site, back-link to `index.html`.

**Effective date:** 17 September 2026
**Placeholders to replace:** `[SUPPORT EMAIL]`, `[COMPANY ADDRESS]`

### `terms.html`

Full 13-section Terms & Conditions. Cross-linked to `privacy.html` in
section 5.

**Placeholders to replace:** `[SUPPORT EMAIL]`, `[SUPPORT PHONE]`, `[COMPANY ADDRESS]`

---

## Interactions & Behavior

### Global — Scroll Reveal

- **Selector:** `.reveal`
- **JS:** IntersectionObserver + 1.5 s safety timeout that unconditionally
  reveals everything to protect against observer stalls.
- **Behavior:** Content is visible by default. JS adds `.pre` (invisible)
  synchronously before paint. On scroll into view, `.pre` → `.in` — transitions
  opacity 0 → 1 and translateY(20 px → 0) over 700 ms with
  `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Directional variants:** `.fade-left` / `.fade-right` / `.scale-in` /
  `.zoom-in` — auto-applied to split-layout siblings by the JS.
- **Word-split headings:** All H1 and section-head H2 get their words wrapped
  in `<span class="rw">` for cascade fade-in.
- **Stagger children:** Card grids get incremental 80 ms `transition-delay`
  applied to their `.reveal` children.

### Global — Reduced motion

`@media (prefers-reduced-motion: reduce)` block kills all animations, reveals
everything opaque, un-transformed. Stops phone floats, ring pulses, chip bobs,
marker drifts.

### Nav — Sticky border on scroll

`#nav` listens for scroll, toggles `.scrolled` at 8 px scrollY, fades in
border-bottom.

### Mobile menu

Hamburger toggles `.mobile-menu.open`. Auto-closes when any link inside is
clicked.

### Count-up numbers

`[data-count="N"]` (+ optional `data-format="comma"`). IntersectionObserver
fires once at 20 % visibility; 1300 ms ease-out cubic count from 0 to N.

### Bar charts

`.bars .bar[data-h="N"]`. On IO fire, sets `height: N%` with 60 ms stagger.
CSS transition 1.1 s `cubic-bezier(0.16, 1, 0.3, 1)`.

### Line chart draw

`.line-chart .line`. On IO, compute `getTotalLength()`, set `stroke-dasharray`,
animate `stroke-dashoffset` from full to 0 over 1.6 s. Area fill fades in
600 ms later.

### Field progress bar

`.field-progress .bar > div[data-w="N"]`. Sets `width: N%` on IO, 1.4 s
transition, 200 ms delay.

### Map marker drift

`.marker-drift`. Every 4–6 s, JS picks a random ±6 px translation. CSS
transition (4 s ease-in-out) smooths it.

---

## Design-Time Only

### `.dev-tweaks` bar

Bottom-left panel with "Always show intro" checkbox and "Replay intro"
button is a **design-time helper only. Do NOT ship it to production.**

**Remove during port:**
- Delete the `<div class="dev-tweaks" id="devTweaks">…</div>` block from
  `index.html`
- Delete `.dev-tweaks { … }` block from `styles.css`
- Delete the `alwaysBox` / `replayBtn` / `ALWAYS_KEY` code from the IIFE

Or feature-flag with `?dev=1`.

---

## Design Tokens

Defined as CSS custom properties in `:root` at the top of `styles.css`.

### Colors

| Token | Hex | Use |
|---|---|---|
| `--blue` | `#11409A` | Nav, headings, text links, brand accents, dashboard sidebar |
| `--blue-600` | `#0E367F` | Blue hover |
| `--blue-700` | `#0B2C68` | Blue pressed / deep |
| `--blue-tint` | `#EEF2FB` | Icon square bg, pill bg |
| `--blue-tint-2` | `#E4EBF7` | Softer bg |
| `--navy` | `#0A1F44` | Section bg, dashboard sidebar, reveal panel |
| `--navy-2` | `#0D2452` | Slightly lighter navy |
| `--ink` | `#0F1B36` | Heading text |
| `--ink-2` | `#2B3654` | Body text |
| `--muted` | `#5A6784` | Meta / labels |
| `--line` | `#E3E9F2` | 1 px borders |
| `--line-strong` | `#D4DCEA` | Input borders |
| `--bg` | `#FFFFFF` | Page bg |
| `--bg-alt` | `#F4F7FB` | Alt section bg, hero bg |
| `--bg-alt-2` | `#EEF2F9` | Deeper alt bg |
| `--green` | `#0E9F6E` | Positive status, check marks |
| `--green-tint` | `#E1F4EB` | Green pill bg |
| `--amber` | `#D97706` | Warning status |
| `--amber-tint` | `#FDF1DC` | Amber pill bg |
| `--red` | `#DC2626` | Negative status |
| `--red-tint` | `#FBE4E4` | Red pill bg |
| `--sky` | `#2563EB` | Info / on-visit marker |
| **`--accent`** | **`#F97316`** | **PRIMARY CTA FILL — orange (complementary of blue). All click magnets.** |
| **`--accent-600`** | **`#EA580C`** | **CTA hover** |
| **`--accent-700`** | **`#C2410C`** | **CTA pressed** |
| **`--accent-tint`** | **`#FFEDD5`** | **Soft orange chip bg** |
| **`--accent-glow`** | **`rgba(249, 115, 22, 0.28)`** | **CTA shadow tint** |

**Color hierarchy:** Orange = "act now" buttons. Blue = trust, navigation,
brand chrome. Navy = section backgrounds. Green/red/amber = status only.

### Typography

- **Body:** Inter (400/500/600/700) via Google Fonts
- **Mono:** JetBrains Mono (500) — meta labels, tables, code snippets, times

**Scale:**
- H1 — `clamp(36px, 5.4vw, 60px)`, `-0.03em`, line-height 1.05
- H2 — `clamp(28px, 3.6vw, 42px)`, `-0.02em`, line-height 1.1
- H3 — 20 px, `-0.01em`
- Body — 16 px, line-height 1.55
- Lead — 18 px, line-height 1.6
- Eyebrow — 12 px, uppercase, `0.12em`, `--blue`, with a small `--accent` dot before it

### Spacing

- Section vertical: 96 px desktop → 64 px tablet → 52 px mobile (`--sec-y`)
- Horizontal padding: 24 px → 20 px → 18 px mobile (`--pad-x`)
- Content max-width: 1180 px (`--max`)
- Card padding: 20–28 px
- Grid gaps: 12–24 px

### Radii

`--r-sm 6 · --r-md 10 · --r-lg 12 · --r-xl 16 · --r-pill 999`

### Shadows (warm navy-brown, never gray)

- `--shadow-xs` — `0 1px 2px rgba(10, 31, 68, 0.05)`
- `--shadow-sm` — `0 1px 3px rgba(10, 31, 68, 0.06), 0 1px 2px rgba(10, 31, 68, 0.04)`
- `--shadow-md` — `0 8px 24px rgba(10, 31, 68, 0.08), 0 2px 6px rgba(10, 31, 68, 0.04)`
- `--shadow-lg` — `0 24px 60px rgba(10, 31, 68, 0.12), 0 8px 24px rgba(10, 31, 68, 0.06)`

Primary buttons also get an inset white top highlight + a colored orange glow
(`0 4px 12px var(--accent-glow)` → `0 8px 22px var(--accent-glow)` on hover).

### Breakpoints

- 1100 px — tablet-landscape nav CTA shrinks
- 1024 px — hero stacks; feature tiles drop to 3 col
- 960 px — nav → hamburger
- 900 px — most splits stack; dashboard sidebar hides; form wrap collapses
- 800 px — most 3-col grids drop to 2
- 768 px — smaller heading scale, section padding shrinks
- 720 px — 8 KPI grid drops to 2
- 640 px — nav shrinks; heavy mobile pass
- 560 px — login steps stack to 1 col
- 520 px — intro progress dots hide
- 480 px — 1-col fallbacks; type scale drops; hero CTAs stack full-width

---

## State Management (JS)

All in one IIFE at the bottom of `index.html`.

```js
// Intro flow
var state = {
  businessType: null,       // 'Construction', 'Healthcare', etc.
  problems: [],             // array of question strings
  lead: null,               // { business, contact, phone }
  currentStep: 1
};

var revealDismissed = false; // reveal-panel guard

// Persistence
sessionStorage.getItem('inf7_intro_done_v1');  // "1" if intro completed
sessionStorage.getItem('inf7_lead');            // JSON string of lead
localStorage.getItem('inf7_always_intro');      // "1" if dev toggle on
```

**Timing constants:**
- `REVEAL_MS = 2000` — reveal-panel auto-dismiss

**Key data structures:**

```js
// Business-specific question banks
var BUSINESS_QUESTIONS = {
  'Service Centers': [ { icon, text }, … ],
  'Construction':    [ … ],
  'Healthcare':      [ … ],
  'Field Sales':     [ … ],
  'Maintenance':     [ … ],
  'Logistics':       [ … ],
  'Other':           [ … ]
};

// Icon glyph library (inline SVG bodies)
var ICONS = {
  people, pin, check, calendar, clock, money, alert, chart, trending
};

// Question → solution keyword mapping
function questionToSolution(txt) { … }
```

---

## Assets

Local files in `assets/` — no CDNs, no external image URLs.

| File | Approx size | Use |
|---|---|---|
| `infield7-logo.png` | ~340 KB, 579×734 | Logo + wordmark, transparent bg. Used in nav, footer, dashboard sidebar, reveal panel, intro top bar, favicon. |
| `mobile-ref-hd-2x.png` | ~1.4 MB, 986×2048 | Full mobile-app screenshot (2× for Retina). Used inside every phone frame. |

**Before shipping:** the mobile screenshot currently shows a "GM" logo and
the name "ankit" from the source screenshot. Swap for a brand-neutral or
your own product screenshot.

---

## Files

```
design_handoff_infield7_landing/
├── README.md              ← this file
├── index.html             ← main marketing site
├── privacy.html           ← standalone privacy policy
├── terms.html             ← standalone terms & conditions
├── styles.css             ← all styles (~1,700 lines)
└── assets/
    ├── infield7-logo.png
    └── mobile-ref-hd-2x.png
```

**External dependencies:** Google Fonts only (Inter + JetBrains Mono). Zero JS libraries.

---

## Copy Placeholders To Replace

- `[SUPPORT EMAIL]` — contact section, privacy.html, terms.html
- `[SUPPORT PHONE]` — contact section, terms.html
- `[COMPANY ADDRESS]` — contact section, privacy.html, terms.html

Also review:
- Legal effective date (currently 17 September 2026)
- Trust strip company names (Meridian Facilities, Nova Constructions, Blue
  Harbor Health, Kirti Group, Arion Field Services — all placeholder)
- Dashboard employee names (Rahul S., Meera K., Arjun P., Priya N., etc.)
- Manager greeting name ("Layla")

---

## Notes for the Developer

1. **The primary CTA color is orange, not blue.** `--accent: #F97316` is the
   complementary of the deep blue brand. Every "Book a Demo", "Continue",
   "Show me the platform", and final-CTA button uses `.btn-primary` which
   fills orange. Blue is reserved for navigation, headings, links, and
   dashboard chrome.

2. **The reveal panel is safe.** 3 dismissal paths (auto after 2 s, click
   anywhere, keyboard Esc/Enter/Space) plus a re-entry guard. Do not shorten
   below 1.5 s — the letter cascade needs it.

3. **The intro is session-scoped.** A user who reopens the tab sees it again.
   Switch `sessionStorage` → `localStorage` in `finishIntro()`/`skipIntro()`
   for lifetime persistence.

4. **`[hidden]` needs `!important`.** `styles.css` has
   `[hidden] { display: none !important; }` at the top of the intro block
   because `.intro` and `.reveal-panel` use `display: flex`. Keep this rule
   if you keep the intro flow.

5. **No JS libraries.** All animations are CSS + IntersectionObserver + a
   little JS orchestration. Port to Framer Motion / GSAP if your stack
   already uses one, but the vanilla approach is small and SSR-friendly.

6. **The dashboard mockup is static.** Fake data displayed via HTML.
   Layout works whether you wire it to real analytics later or keep it as
   a mockup.

7. **Font sizes use `clamp()`.** They scale fluidly. If your framework
   prefers pinned tokens, use the min/max values in the type scale table.

8. **Form submission is a no-op right now.** `finishIntro()` stashes the
   lead in `sessionStorage[inf7_lead]`. Replace with a `fetch()` POST to
   your CRM/ATS endpoint.
