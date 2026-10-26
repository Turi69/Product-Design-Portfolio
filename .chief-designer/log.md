# Design log

## 22/10/2026 — Portfolio / homepage rebuild (React + Vite)
Brief: faithful rebuild of turiux.framer.website in React. The live site is the reference; no new direction.
Type: Geist (display + body), Geist Mono (labels, years), Inter (nav, client labels), DM Mono (clock)
Palette: white cards on #262626 page, ink #0f0f0f, body #313336, single accent purple rgb(114 14 158) in the hero grid
Signature: hero sentence with inline photo tiles, over drifting meteors and a flickering purple grid
Motion: calm and quiet. Line-by-line hero entrance, gentle scroll reveals, sub-1200px cards grow in on scroll (CSS scroll-driven, progressive)
Vendored: lottie-web 5.12.2 (MIT) for the three project-card reels; Phosphor icons (MIT) inline
Breakpoints mirrored from Framer: desktop >=1200, tablet 810–1199, phone <=809
Fixes over the original: broken "Book a short call" href (was "https://<a href=tel:...>"), keyboard-operable gallery tabs and carousel, reduced-motion handling, audio error state
Open: three case-study pages (/wayfinder, /cwook, /jaa) not yet rebuilt; cards link to the live pages for now
Superseded 22/10/2026 by the redesign below. Previous build kept in _previous-build/.

## 22/10/2026 — Portfolio redesign, dark editorial (Index, Works, About, project pages)
Brief: redesign to match the layout, interactions, motion, type and dark theme of cedarstudio.framer.ai (a free Framer template). Owner asked to drop all previous styles and layouts.
Boundary: structure and interaction patterns matched; no template images, copy or code reused. All copy is the owner's, all imagery is the owner's real screens or newly generated scenes.
Type: Switzer only (Fontshare, ITF Free Font Licence), 400/500/600. Display fluid, UI fixed.
Palette: stage oklch(0.145 0.002 70) (#0a0a0a), type oklch(0.97 0.003 70) (#f6f6f6), muted oklch(0.62), hairlines at 12% white. Dark only, as the reference.
Signature: the Index drum. Receding card stack driven by wheel, drag, arrow keys and Tab; centre card sharp, next card larger and blurred in front, earlier cards recede and dim. Loops; settles on a whole card with no overshoot.
Motion character: slow, soft and precise. Letter-rise name entrance, blur-to-sharp words on About, white band wipe on Works rows, cursor-trailing preview, sliding nav pill, rolling social labels.
Mockups: 11 Sunburst (gpt-image-2.5-sunburst) scenes in Figma file ndqPxKr2yM1vjGErdzUtG7, one per project: front-on phone or laptop with a blank screen, one object from the product's world, backdrop in the product's colour. Real screens composited onto the screens locally with sharp (scratchpad tools/composite.mjs).
Rejected: fully generated mockups (would show invented UI, misleading in a portfolio).
Fixes: route-change animation reduced to opacity only (a transform on <main> trapped the fixed drum stage); one wheel notch now always advances a card; sideways overflow clipped; Role field removed from project pages (unsupported claim).
Open: Services page not built (out of agreed scope); featured case studies still link to the old site; featured projects have no screen strip yet.

## 22/10/2026 — Case studies: WayFinder, Cwook, JAA
Structure (owner's brief, fixed for every study): 01 Project overview, 02 Problem, 03 Solution, 04 My role and work, 05 Impact, 06 Screens. Supporting research is folded into the matching section, nothing dropped.
Layout: the reference's project-page vocabulary. Huge blur-in title, four-column mono meta row, full-bleed parallax hero, numbered section heads with word reveal, dark #161616 cards at 16px radius, impact cards (Switzer 80/500 figure counting up, Fragment Mono caption, note pinned to the bottom), screen gallery on card tiles. Sticky section rail on desktop.
Type addition: Fragment Mono (Google Fonts, OFL) for labels, as the reference uses.
Honesty rule for Impact: only Cwook has measured results. WayFinder (untested) and JAA (in build at hand-off) show true counts from the work, each with a visible caveat. No invented outcomes.
Copy: owner's text carried over as written; only heading typos fixed. Interview and tester quotes kept verbatim.
Content source: extracted from the owner's live Framer pages; 80 images converted to WebP (3.9MB) with recorded sizes.
Open: case-study heroes reuse the drum mockups; prototype embed loads on request.

## 22/10/2026 — Case studies, condensed + role route
Brief: problem and solution very concise; impact on metric cards; "My role and work" designed creatively.
Problem / Solution: one statement plus 3–4 one-line points on hairlines, no cards. Overview cut to two short paragraphs. Pages ~25% shorter.
Impact: metric cards plus caveat only; reflections and tester quotes moved out.
Signature: the role route, a transit-diagram line (refs: Beck's Tube map, Vignelli's 1972 subway diagram, and WayFinder's own subject). Stop per stage of the work; each stop shows what I did plus the real artefact of that stage (quote, persona faces, journey map and flow, fanned screens, chips).
Motion spec:
  Route fill    | progress through the work | scroll | scaleY, linear (real progress) | full under reduced motion
  Stop marker   | emphasis, you are here    | crosses 55% of viewport | inner dot scale, 240ms enter | instant
  Artefact      | the stage's output lands  | stop lit | opacity + translateY, 420ms enter | instant
  Fanned phones | affordance, open me       | hover (pointer only) | transform, 420ms move | none

## 22/10/2026 — Six more case studies: AXE, Azuri, Circuitmind, Fantasy One, Rhapsody, Tendarly
Same six-section layout and route map. Sources: gallery copy, resume (AXE, Eko/Azuri), live sites (circuitmind.io, fantasy1.app, myapp.rhapsodyofrealities.org), App Store (Tendarly Doctor by Heckerbella), the screens themselves.
Honesty: measured impact only where the owner's notes have it (Rhapsody, Circuitmind); counts plus caveat elsewhere. Every inferred line carries an "Inferred" comment in caseStudies.ts for the owner to confirm.
Addition: "Live product" pill with a status dot on studies that have a public product.
Open: AXE audience conflict (resume says 13 to 19-year-olds, gallery copy says individuals and businesses); Rhapsody reach figures unverified publicly.

## 22/10/2026 — LemonSplit and Freyda case studies
Same layout. Both have measured results in the owner's notes (LemonSplit closed beta; Freyda post-launch audit), so both use real impact cards. LemonSplit has no public footprint; Freyda context (London fintech, institutional investor customers) from directory listings, flagged. All 11 projects now have full case studies; the short project page remains only as the not-found fallback.

## 23/10/2026 — About: What I do
Rewritten from the CV's core skills: six rows (product design, design systems, front-end build, AI and automation, research and analytics, mentorship). Each row adds a mono skills line and one proof figure the CV states. Name column fixed so notes align; proof sits right on wide desktop and drops under the skills below 1200px. "Data and dashboards" dropped (not in the CV); research absorbed it. Front-end copy keeps the CV's distinction: HTML, CSS and motion by hand, React apps with AI coding agents.
Open: "My stack" still lists Framer, Mobbin, ClickUp and ChatGPT, out of step with the CV (Claude Code, Codex, GitHub, Vercel). Hero still says "Designer"; the CV title is Design Engineer.
Follow-up: row 03 renamed "Vibe coding" at the owner's request; note keeps "from written specs" so it reads as directed, not unreviewed. My stack replaced with nine CV tools (Figma, Claude Code, Codex, GitHub, Vercel, Turborepo, Vitest, n8n, Framer) as monochrome Simple Icons glyphs (CC0) in public/assets/stack/. Playwright and Remotion have no Simple Icons glyph, so they are left out.
Follow-up 2: stack rebalanced towards design at the owner's request. Vitest and Turborepo replaced with Webflow and Adobe Creative Cloud (both in the CV); design tools lead the grid, build tools follow.

## 23/10/2026 — Index drum: continuous drift and hover label
Brief: cards drift continuously like the reference; hovering names the project with a call to view the case study. Owner then asked that hover not pause the drift, for a dark label, and for a short subtitle; and removed the pause control.
Reference: cedarstudio.framer.ai drifts at about one card every 8 seconds, cards travelling from the far top towards the viewer, and wheel-down moves them the same way. Ours moved the other way on wheel, so the stack was flipped (d = pos - i) to match: drift, wheel, arrows and drag now agree.
Motion spec:
  Drift        | ambient browsing, shows there is more | always, unless held | target advances 0.12 cards/s, linear; eases in over 600ms after input | none (static)
  Hold         | keep a chosen card still            | keyboard focus, touch tap, drag, 1.5s after wheel/keys | drift velocity to 0, 140ms | n/a
  Label        | name the card under the cursor + CTA | card under pointer (hit-tested every frame, cards slide under a still cursor) | opacity 240ms enter / 120ms exit, content scale 0.96 to 1, trails cursor | fade only, no trail lag
Label: dark glass like the nav pill (title, year and format in mono, one-line subtitle, "View case study" on a hairline). Portalled to body so it sits above the name and tagline. Subtitles live in projects.ts (dubs), condensed from each study's overview.
Touch: first tap holds and names the card ("Tap again to view case study"), second tap opens, tap elsewhere or drag lets go.
Screen readers: live region announces only the visitor's own moves, not the drift. Card names include the subtitle.
Fix: .drum used overflow hidden, which scrolled when Tab focused an off-screen card and threw the stack off centre. Now overflow clip.
Risk accepted by owner: no pause control. WCAG 2.2.2 asks for a way to pause auto-moving content lasting over 5 seconds; mitigated by reduced-motion (no drift) and keyboard focus holding it, but mouse users cannot stop it.

## 23/10/2026 — Index tagline
Tagline (owner's wording, tightened): "Senior product designer and team lead. I design and build digital products for consumers and enterprises." Under it, the CV's four disciplines as mono fine print, one per line on desktop, wrapped with dot separators on phones, arriving after the tagline (40ms stagger). Hairline rule above the list removed at the owner's request.

## 23/10/2026 — Works: client marquee and industry filter
Marquee: the old site's "I have designed products for" logo strip, rebuilt for the dark stage, placed under the title and above the filters. Original brand colours at the owner's request; the two logos set in black ink (Four Points, Digital Jewels) are flipped with invert + hue-rotate(180deg) so the ink turns light and the brand hues hold. Linear 48s loop, edge fade masks, no hover pause (matches the owner's preference on the drum); reduced motion shows one still, wrapping set. Client list in home.ts; "The Ebony Life" renamed "The Rising Tide Africa" to match the logo it shows.
Industry filter: nine industries condensed from each case study's sector or client (projects.ts), chips with counts, most-used first. URL param ?industry=, saved per visitor. Empty state offers "Show all projects".
Platform and display controls hidden at the owner's request (SHOW_VIEW_CONTROLS in Works.tsx); while hidden, a saved platform or grid view is ignored so nothing applies unseen.
Phone: industry chips scroll sideways in one row. Fixes on the way: the bar was a wrapping column, so the row grew to its content and widened the page to 1,147px; and the visually-hidden count text escaped the scroller. Both fixed (no wrap in column; chips positioned).

## 24/10/2026 — Case studies: WhoDeyGo and OutOut, plus OutOut story interludes
Two studies added in the same six-section layout (owner's role on both: design lead, product definition in place of a PM, research and testing, frontend build). Screens from the owner's Figma files; drum scenes generated with Sunburst as before.
OutOut screens: third-party event covers (celebrity and concert artwork) replaced locally with a neutral peach-pink-violet gradient cover; frames showing the CEO's name or real-looking handles skipped. Figma files untouched.
Interludes (new, optional per study): staged photos between sections that tell one outing as a timeline. Plan (Tue 21:40, after Overview), the night (Sat 18:30, after Solution), the split (Sat 23:10, after Role), keeping it (Sun 10:15, after Impact). The mono timestamp is the structure: order carries the story. Generated in Figma (Sunburst, 3:2), warm plum and peach grade to sit with the brand. Where a phone faces the camera (held front-on, or flat in an overhead), the real screen is composited on; generated UI is still rejected.
Layout: full column width, 3:2, radius-lg, timestamp in mono beside a one-line caption (stacked on phones). Motion: the existing Reveal fade only; the hero keeps the page's one parallax.
Open: the interludes are staged scenes, not research photos. Say so if asked; consider a small "staged" note if the page is shown to a client.

## 24/10/2026 — OutOut: key decisions, leadership stop, reflection
Brief: lift the study to product-design-lead level. Added three optional template blocks: role.decisions ("Key decisions": Before / We chose / Why / Trade-off on a definition list, numbered rows on hairlines, labelled screens cropped to one phone shape so labels align), a "Lead" route stop, and impact.reflection ("Looking back").
Evidence: the v1 Figma file (OutOut-V1) gives the before states and counts: trips and outings as two create flows (110 frames) vs one v2 event form (37); 35 v1 sign-in screens vs 16 in v2; light yellow-orange v1 vs dark v2; v1 tabs vs v2 tabs plus explorations A, B, C. Why, trade-off, the Lead stop and the reflection are drafted and marked Inferred for the owner to confirm. Baselines for the 20% and the 4/5 were not invented; still needed.

## 25/10/2026 — Résumé viewer (CV link)
Brief: the top bar CV link opens the résumé in a full-screen centred modal with zoom and pan, instead of a new tab.
Direction: the paper sheet on the dark stage, nothing else competing. Chrome reuses the house glass pill (same blur, line and 40px targets as the nav pill), so it reads as site navigation, not a third-party PDF viewer. References: Apple Preview and Google Drive's viewer (bottom-centre zoom pill, percentage doubles as reset), Figma's canvas (ctrl/cmd + wheel zooms at the cursor, plain wheel pans).
Build: native <dialog> with showModal, portalled to body so the top bar's mix-blend-mode does not reach it. Pages are pre-rendered from the PDF at 300 dpi, lossless WebP (~200 KB a page), by tools/resume-pages.py, which also writes src/data/resumePages.ts. Rerun it whenever the PDF changes. Zoom is relative to fit width (50–300%, 1.25 steps) and changes the sheet's width rather than a transform scale, so text re-renders sharp at every level. Pan is a translate, clamped so the sheet is centred where it fits and edge-limited where it does not.
Input: buttons; + / − / 0 keys; arrows, Page Up/Down, Home/End to pan; wheel pans, ctrl/cmd + wheel and trackpad pinch zoom at the cursor; drag pans; two-finger pinch zooms at the midpoint. Plain click opens the viewer; ctrl/cmd/shift/middle click still reaches the PDF.
Motion: backdrop fades (240ms enter), the stage rises 24px (420ms enter), chrome fades in 120ms behind it; exit 180ms accelerating. Zoom and pan are instant (direct manipulation). Reduced motion: fades only.
States: pages hold their exact shape in surface grey while decoding (no shift); load failure shows a message with a PDF download; zoom buttons disable at the limits; focus starts on Close and returns to the CV link; page scroll locked while open.
Known gap: the pages are images, so screen readers get "Résumé, page 1 of 2" rather than the text. The Download PDF control in the toolbar is the accessible route.

## 25/10/2026 — Opening intro (TURI)
Brief: the owner asked for studio-onto.com's loader, with the letters TURI, white on the dark stage. Later additions: the letter scaling to fill the screen (Onto's ending), and Onto's gentle page entrance afterwards.
Studied Onto frame by frame (it is a Lottie file, so nothing was copied): thin lines rise into blocks left to right, counters cut each block into its letter, the word holds, the letters slide into the O and merge, the O scales until it fills the screen, the fill fades off the site.
Rebuilt in our own type and code (components/Intro.tsx, Intro.css), Switzer 600, which the site already loads:
- Rise: each letter's ink box is a block that grows from a hairline on the baseline (scaleY), 420ms, 110ms stagger.
- Carve: each glyph is drawn with a 64-unit outline clipped to its ink box, so it reads as a solid block; the outline thins to 0 (800ms, in-out, 70ms stagger) and counters open from a point. stroke-width is a paint property, accepted for four glyphs, once.
- Merge: U, R and I slide into the T and dissolve (500ms, in-out, 40ms stagger) while the T centres.
- Fill: the T scales from inside its stem until white covers the screen; it accelerates because it is leaving (600ms).
- Lift: a flat white layer fades off (600ms, exit curve) as the page's own entrance (split-text name, tagline, disciplines, nav pill, .reveal sections) is released from html[data-intro]; the top bar fades in 300ms behind.
Total about 3.7s. Once per browser session (sessionStorage), any input skips straight to the lift, no intro under reduced motion, and no intro if Switzer has not loaded within 1.5s (never draws in the fallback face).
Rejected: landing the word in the TURI® top bar mark (first build; replaced by the owner's choice of Onto's fill ending).
Open: a full-screen white moment on a dark site is deliberate here; revisit if it feels too bright on a phone at night.

## 25/10/2026 — Motion retune: gentle, iOS-like, site-wide
Brief: the owner found the intro's scale too quick and asked for all motion to be very gentle and smooth, to iOS standards.
Diagnosis: the fill was a linear tween from 1× to ~100×. The eye reads scale logarithmically, so it barely moved for most of its run and rushed at the end; a longer duration alone would not have fixed it.
Tokens (tokens.css), which carry almost every animation on the site:
- Durations: instant 120 → 150ms, state 240 → 320ms, layout 420 → 520ms, entrance 800 → 1000ms.
- Enter: cubic-bezier(0.16, 1, 0.3, 1) (expo out, a hard start) → cubic-bezier(0.32, 0.72, 0, 1), the iOS sheet curve.
- Move: (0.65, 0, 0.35, 1) → (0.45, 0, 0.25, 1), a soft start and a long settle.
- Exit: (0.7, 0, 0.84, 0) → (0.42, 0, 0.84, 0.4), eases away instead of snapping.
Intro: the zoom uses geometric keyframes (each moment multiplies the size by the same amount) on the move curve over 1400ms, and overshoots to 1.6× of full cover so the screen is white before the zoom ends; the merge is 800ms with opacity trailing the slide; beats overlap by 150ms so nothing stops dead; the white lifts over 1000ms on the move curve; skip fades over 600ms. Curves are read from the tokens at runtime, so the intro always matches the pages. Total about 5.2s, skippable.
Hard-coded timings brought in line: drum and project hero entrances 1100 → 1400ms; résumé viewer close 180 → 380ms; the drum's wheel follow from ~90% in 300ms to ~90% in 450ms (still critically damped, no overshoot).
Motion character, recorded: calm, unhurried, settled. Nothing starts abruptly; everything glides to rest.

## 25/10/2026 — Ribbon dive tried and rejected
The owner asked for Netflix's intro (the camera diving into the letter until it separates into ribbons of light) at the moment the T scales. Built twice: coloured ribbons (88 soft vertical bands across the spectrum, added together where they cross), then black ribbons streaking across the white. The owner rejected both ("doesn't look good"), and the intro is back to the approved ending: the even-speed zoom to white, then the white lifting over 1s as the page makes its entrance.
Lesson: the ribbon look depends on rendered light (bloom, depth of field, motion blur) that flat CSS bands cannot fake well; a convincing version would need video or a shader. Do not retry it with DOM layers.

## 25/10/2026 — Intro ending: dissolve, no white
The owner asked to drop the white fill: after the T zooms, it should fade gently into the page.
Ending now: the T grows from inside its stem until it is 2.4 screens tall (scale sized to the viewport, geometric keyframes on the move curve, 1800ms). It dissolves across 30–85% of that zoom, while the dark stage lifts from 35% to the end and the page's held entrance is released at the same moment, so the page comes through the growing letter. The stem never covers the screen, so there is no flat white moment. Skip fades the whole intro over 600ms.
Measured: 120 frames through the ending at a steady 16.7ms (worst 17.4ms), no dropped frames.

## 25/10/2026 — Nav pill polish
Reference: iOS tab bars and segmented controls (the selection marks where you are and does not move on hover; 44pt targets).
- The white pill now stays on the current page. Hover and keyboard focus get their own quiet highlight (a ghost in --color-line) that slides between items, so pointing never hides where you are.
- Fixed a long-standing 4px offset: items are measured from the list, which starts one padding step inside the nav, but the pill was positioned from the nav's edge. The pill now sits exactly on its label, with equal padding either side.
- Inactive labels sit back in --color-text-soft and brighten on hover or focus; the current label is the only strong mark.
- Targets raised from 40px to 44px.
- Label colour now changes on the pill's own duration and curve, so a label never turns dark before the pill reaches it.
- Glass recipe denser and lifted (--color-glass 0.62, blur 24px, saturate 1.4, top sheen, --shadow-float), so labels hold over bright project images. New tokens: --color-sheen, --shadow-float. The résumé viewer's toolbar and close button now use the same recipe.
- Reduced motion: the pill, highlight and label colour change instantly.

## 25/10/2026 — Freyda and Tendarly removed
At the owner's request, both case studies are off the site: their case study entries (caseStudies.ts), Works list rows and subtitles (projects.ts) and gallery text (home.ts). The Works list now shows 11 projects; the Health filter disappears with Tendarly, its only project. Old links (/work/freyda, /work/tendarly) land on the existing "Project not found" page. Freyda's logo stays in the client logo strip on the Works page, by the owner's choice: a past client, even without a case study.

## 25/10/2026 — AXE: natural photos, real screens
Story photos: the four AXE interludes were regenerated in Figma (file ndqPxKr2yM1vjGErdzUtG7, gpt-image-2.5-sunburst, 3:2) as natural stock photography: soft window daylight, neutral true-to-life colour, bright exposure, candid moments. Replaces the earlier warm, golden-hour cinematic grade. Learners now span ages (twenties to fifties), since AXE is not age-specific. The at-home photo was generated with a blank black laptop screen facing camera, and the real learner dashboard (axe-learner-home) composited on with tools/composite.mjs (radius 0.02, threshold 30). Sources in source/scenes/axe-story-v2/.
Screens: the six light screenshots from the old "TC Application" design (Framer-era hash names) are replaced with frames from the AXE Tutor Application file (CUrLhFAhQmxRfn7tYobAqR), exported at 1× (1512 wide) to match the other AXE screens:
- Lesson editor (117073:83444) as axe-tutor-builder, in the Translate route stop and the tutor gallery.
- Course overview (116884:82144) as axe-course-overview, now first in the tutor gallery.
- Report, team tab (117172:59562) as axe-report-team; performance breakdown (117172:61303) as axe-report-performance.
- Team management with unassigned learners (117172:70379) as axe-tutor-teams.
- Lesson preview slide (117088:48208) as axe-lesson-slide.
The old hash images are no longer referenced by the case study; they remain only in home.ts's legacy gallery data and the size table.

## 26/10/2026 — Tendarly back, at lead level
At the owner's request Tendarly returns (Works row, subtitle, Health filter, gallery text, case study), then gets the same pass as OutOut and AXE.
Facts from the owner: both apps are live; Turi led the design with the internal team assigned to the project, as its only designer, under Heckerbella's design team lead; no usage figures; no Figma file with earlier versions. From the stores: Tendarly (patients) on Google Play by Heckerbella Limited, updated 16/09/2024; Tendarly Doctor on the App Store since 23/11/2023.
- Meta: Company Heckerbella (now confirmed), Role Lead designer.
- Two live links (patients on Google Play, doctors on the App Store). `website` is now a list with an optional `kind` label, so a study can link more than one product; Circuitmind, Fantasy One and Rhapsody moved to one-item lists.
- Problem gains the doctors' side (limited reach). Solution points rewritten as outcomes for patients and doctors.
- Route: Intake, Connect, Consult, Record, then Lead and Launch replace System.
- Four key decisions: the assistant listens and the doctor decides; any available doctor first; the fee up front and the first session free; a note the patient keeps. No earlier versions survive, so "before" is the usual way and the images are final screens.
- Impact: two cards, 2 apps live and 1 designer end to end, with a caveat that there are no usage figures. A year as a stat was dropped because CountUp would count it up from zero; a third card left an orphan at mid widths.
- Looking back: agree measures before launch; design for urgent symptoms from the first wireframe.
- Screens regrouped: Before the call, With the doctor.
- Story interludes generated in Figma (ndqPxKr2yM1vjGErdzUtG7, gpt-image-2.5-sunburst, 3:2), natural daylight in whites and soft blues to match the app: one patient's Tuesday from a cough at 06:50 to the pharmacy at 12:30. One mockup only, the kitchen, with the real pre-session chat composited on (tools/composite.mjs, threshold 45). Sources in source/scenes/tendarly-story/.
Open: the assistant is "Stacy" on the greeting screen and "Tendy" in the chat; the copy avoids naming it.

## 26/10/2026 — Azuri at lead level
The same pass as OutOut, AXE and Tendarly. Facts from the owner: Turi was co-designer with the lead designer, not the lead; the system is live and used daily by Eko Development Company's facility and operations teams; Turi designed property and occupants, the tower dashboards with requests and incidents, and members and roles; automated maintenance workflows shipped, the 3D property view did not; no numbers, feedback or Figma file. Enterprise product, so no public link.
- Meta: Enterprise web app; client Eko Development Company (the app's own footer, and the press, use this name, not "EKO Development Group"); Role Co-designer, at Heckerbella.
- 3D property view removed everywhere, including the gallery text in home.ts, which also said "I led" and cited unconfirmed "early feedback".
- Route: Structure, Occupants, Operate, Access, Partner (how the work was split with the lead), Launch.
- Four key decisions, from evidence in the screens: the building as the way in (incidents are located as tower, floor, apartment); details beside the list; a dashboard for each tower (its building switcher); access by role with a reason (the Reason column in Manage members).
- Impact: Daily use, 3 towers on one system; caveat explains the missing link and figures.
- Story interludes modelled on the real towers from EstateIntel's gallery (two white residential slabs with terracotta bands, a dark glass office tower, Eko Atlantic waterfront): an operations manager's Monday from arrival to dusk. One mockup, the office, with the real Azuri One dashboard composited on.
- tools/composite.mjs gains an "occlude" option: only the screen's own dark pixels are replaced, so a shoulder or hand in front of the screen stays in front. Sources in source/scenes/azuri-story/.

## 26/10/2026 — WhoDeyGo at lead level
The same pass as OutOut, AXE, Tendarly and Azuri. Facts from the owner: in internal device testing, not released; Turi led 2 designers; no results yet; the Figma Archive's earlier light-theme screens are not to be shown, so decisions use final screens only.
- Copy is definitive: the owner asked for "2 designers", not a range. Saved as a standing rule for all case studies.
- Solution points rewritten as outcomes for senders and travellers.
- New Lead stop (2 designers, work split by journey, reviews against one set of tokens). The 20 changes and 32 screens moved from Impact into the Define and Design stops.
- Four key decisions: roles belong to the parcel, not the person; declare every item, checked as you go; see inside before saying yes; evidence, not self-report (identity when an action needs it, flight bookings instead of typed trips).
- Impact 2x2: 3 roles in one account, testing on Android devices, 2 designers led, 20 fixes to version 1. Looking back added.
- Story interludes generated in Figma: one parcel from a London flat to a family home in Lagos. One mockup, the traveller on his sofa, with the real package review screen composited on (composite.mjs with occlude, so his fingers stay in front). Sources in source/scenes/whodeygo-story/.
