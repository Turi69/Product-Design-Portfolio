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
