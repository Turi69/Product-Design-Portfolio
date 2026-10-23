# Prompt: extract a portfolio case study from a project

Paste everything below the line into a Claude session opened in the project's folder. Run it once per project. It writes one dossier file and one screenshots folder, which you then bring back to the portfolio project.

---

You are extracting the material for a portfolio case study about this project. The portfolio belongs to Turi Ogefere, a product designer. Your job is evidence, not writing: find what is true, say where it came from, and say plainly what is missing. A thin, honest dossier is better than a full, invented one.

## 1. Read before you write

Go through everything this project has: the code, READMEs, docs, design logs (for example `.chief-designer/log.md`), specs, research notes, data files, commit history, project knowledge, and past conversations if you can see them. Note the path or source of everything you use.

If the project is a running app, find out how it starts. You will need it for screenshots.

## 2. Rules

- **Evidence tags.** Tag every claim as one of:
  - `[Stated: <source>]` when a file, doc, commit or conversation says it. Give the path or name.
  - `[Inferred: <reason>]` when it is your reading of the evidence.
  - `[Missing]` when nothing supports it. Leave the field empty and add a question for Turi.
- **No invented numbers.** A metric goes in Impact only if it was measured and the source says so (analytics, test results, a client report, a sales figure). Never estimate, round up or extrapolate. If nothing was measured, list honest counts from the work instead (screens designed, flows, research participants, features shipped, weeks to launch) and say what could be measured.
- **Turi's role, precisely.** Separate what Turi did from what the team, the client, or AI tools did. If Claude or another tool generated code, copy or designs, say so, and describe Turi's part in terms of the decisions they made, the direction they set, and what they designed or reviewed. Do not credit Turi with work the evidence gives to someone else.
- **Confidentiality.** This may be client work or an internal AIENAI product. Flag anything that should not go on a public portfolio: client names under NDA, unreleased products, revenue, pricing, contract values, personal data, internal strategy, credentials or private URLs. Propose an anonymised version for each (for example "a UK fintech" instead of the client name). Never copy secrets, keys or tokens into the dossier.
- **Style.** British English. No em dashes. Sentence case. Short sentences. Keep the user's or client's own words for quotes, verbatim.

## 3. Write the dossier

Create `portfolio-export/case-study.md` in this project, with exactly these sections. The length limits match the portfolio layout, so keep to them.

```markdown
# <Project name>

## Card
- Slug: <lowercase, no spaces, e.g. lemonsplit>
- Title: <product name>
- Year: <YYYY>
- Format: <Mobile or Web>, the main platform, used for the gallery layout
- One-line summary: <max 120 characters, what it is and who it is for>
- Live URL: <public URL, or "none">, and whether it is safe to link
- Confidentiality: <public / anonymise / do not publish>, with the reason

## Meta (four items)
- Category: <e.g. Mobile app, Web platform, Design system>
- Sector or Client: <e.g. Fintech, London; or the anonymised client>
- Role: <Turi's role in a few words, e.g. "Product design and front-end build">
- Year: <YYYY>

## 01 Project overview
- Statement: <one sentence, max 70 characters, the product's promise>
- Body: <two short paragraphs, max 45 words each: what it is, who uses it, what Turi did>

## 02 Problem
- Statement: <one sentence, max 110 characters>
- Points: <3 or 4, each a title of max 4 words plus one line of max 10 words>

## 03 Solution
- Statement: <one sentence, max 110 characters>
- Points: <3 or 4, same shape as Problem>

## 04 My role and work
- Summary: <one sentence, max 110 characters, how Turi approached it>
- What I owned: <4 to 6 skill chips, e.g. "User research", "Design system", "Prototyping">
- Stops: <4 or 5 stages of the work in order, e.g. Discover, Define, Design, Build, Launch. For each:>
  - Stage: <one word>
  - What Turi did: <1 or 2 lines, each max 20 words>
  - Artefact: <the real output of that stage, as one of:
    a quote (verbatim, with who said it),
    people (personas or interviewees: name or role, and a one-line note),
    chips (2 to 4 short labels),
    images (1 to 3 screenshots, listed by filename from section 4)>

## 05 Impact
- Title: <max 50 characters>
- Stats: <3 or 4 cards. For each: value (e.g. "4%", "14 min", "12"), label (max 5 words), note (one line, include the baseline if there is one), and its evidence tag>
- Caveat: <one sentence if the numbers are counts, a small sample, or a beta; else "none">
- What could be measured next: <optional, if Impact is thin>

## 06 Screens
- Title: <e.g. "Hi-fi screens">
- Groups: <optional group titles, e.g. "Onboarding", "Checkout">
- Shots: <every screenshot in order, as filename and a one-line caption of max 10 words>
- Prototype: <a public prototype URL (e.g. Figma), or "none">

## Sources
<every file, doc, commit range, conversation or URL you used, one per line>

## Questions for Turi
<numbered; everything marked [Missing], and every [Inferred] item that matters>

## Confidentiality flags
<each item, why it is sensitive, and the anonymised version>
```

## 4. Capture the screens

Save screenshots to `portfolio-export/screens/`, named `<slug>-<two-digit order>-<width>x<height>.png`, for example `lemonsplit-03-390x844.png`.

- If the app runs locally, start it and capture real screens with test data only. Use 390×844 for mobile and 1440×1024 for web. Capture the full journey: the first screen, the core flow, a success state, and one empty or error state if it exists.
- If there are existing exports or design files (PNG, JPG, Figma exports), copy the best ones in and rename them to the same pattern. Do not resize or edit them.
- Remove or blur personal data, real customer names, emails, phone numbers, amounts from real accounts, and anything flagged in Confidentiality. If you cannot remove it, leave the screen out and say why.
- Pick 8 to 15 screens. Quality over coverage.
- Also choose one hero screen for the homepage mockup, the most recognisable single screen, and name it in the dossier.

## 5. Finish

Reply with:
- the path to the dossier and the number of screenshots,
- the confidentiality verdict,
- the three biggest gaps Turi needs to fill.

Do not publish, push or share anything.
