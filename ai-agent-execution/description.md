# Description

Source: https://app.notion.com/p/37ee3c20a8ee8188b543c3957dade6dc

Reference companion to Start the Execution and the Collection of prompts folder.
Update this page whenever a prompt is added, removed, or changed.

---

## How the Run Is Structured

Start the Execution runs child prompts in three ordered phases:

1. **Collection phase** — all prompts with "Collecting" or "Collect" in the title run first, in parallel.
2. **Cleanup phase** — all prompts with "Clean" in the title run second, after collection finishes.
3. **Aggregation / TTS phase** — "Aggregated Report (TTS)" always runs last.

Supporting prompts (titles containing "Sub-Agent", "Whitelist", or similar) run as part of the collection step that references them — not as separate top-level steps.

---

## Phase 1 — Collection (parallel)

### Start Collecting All
Runs four collection tasks simultaneously:
- **AI / Global / Swedish News** — three web-search tasks, one dated sub-page each (5 stories per page, English, last 24h prioritized).
- **Field Monitor** — 7-day analysis of "AI Agents & Tool Use", written as a weekly digest page (themed clusters, "So What", "Who to Follow").
- **Email Summary** — fetches today's Gmail, summarizes every inbox email (sender, subject, time, 2–3 sentence summary).
- **Daily Intelligence Brief** — 48-hour intelligence sweep covering Markets & Investments, AI & Technology, Strategic Signals, and Today's Top 3. Each item includes "why this matters" and a 5-year lens.

Supporting prompts:
- **Daily Intelligence Brief — Sub-Agent Prompt** — detailed sub-agent logic for the Daily Intelligence Brief.
- **Email Whitelist Monitor — Prompt** — scans last 24h of inbox, classifies each email (Whitelist / Action Needed / FYI / Skip), drafts replies (Gmail drafts only, never sent), logs results to Notion.

### Collecting - AI/Robotics Investment Signals
3-agent investment monitoring pipeline, run in sequence:
1. **News Collector** — searches web for fresh AI/robotics investment news (last 24h), writes new rows to AI/Robotics News Feed database (Status = Unprocessed).
2. **Analyzer** — reads unprocessed news rows, assesses investment implications against satellite portfolio, writes rows to AI/Robotics Analysis database, marks source news as Processed.
3. **Signal Generator** — reads Analysis rows with Recommendation in (Consider Buy / Consider Sell / Reduce) and Confidence Medium/High, identifies the most direct tradable ticker (Xetra-listed prioritized), writes new rows to Investment Signals database and creates a summary page under AI Reports.

---

## Phase 2 — Cleanup

### Clean All
For each collection section (AI News, Global News, Swedish News, Email Summary, Field Monitor, AI Reports / Daily Brief), keeps the 5 most recent pages and moves anything older to the 🗑️ Clean staging page under Admin.

> ⚠️ Manual step: pages moved to 🗑️ Clean must be permanently deleted by hand in Notion — Claude cannot delete pages.

---

## Phase 3 — Aggregation / TTS (always last)

### Aggregated Report (TTS)
Finds today's Daily Brief page(s) and Investment Signal page(s), merges and de-duplicates them into one TTS-friendly plain-prose report grouped by theme (Markets & Economy, AI & Technology, Geopolitics, Personal Items / Action Points, Investment Signals, Top Priorities). Saves as 📊 Aggregated Report – [date] under AI Reports and outputs full plain-text in the chat.

### Collecting - Newsletter Digest (Expand)
Finds today's newsletter-style emails in Gmail (subject containing "Digest" or "Brief"), strips promotional clutter, rewrites substantive editorial content in clean prose, saves as 📨 Newsletter Digest – [date] (Expanded) under AI Reports.

---

## Quick Reference — Run Order

1. (parallel) Start Collecting All — News x3, Field Monitor, Email Summary (+ Whitelist Monitor), Daily Intelligence Brief
2. (parallel) Collecting - AI/Robotics Investment Signals — News Collector → Analyzer → Signal Generator
3. (parallel) Collecting - Newsletter Digest (Expand)
4. Clean All — retention cleanup across all sections (manual deletion step afterward)
5. Aggregated Report (TTS) — merges Daily Brief + Investment Signal pages into one TTS-ready report

---

## Maintenance Notes

- Last updated: June 13, 2026.
- When adding a new prompt to the Collection of prompts folder, add a short section here describing what it does, its inputs/outputs, and which phase it belongs to.
- If a new prompt's title doesn't naturally fit the Collecting/Clean/Aggregated pattern, either rename it to fit or update Start the Execution's step list explicitly.
