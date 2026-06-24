# Description

Source: https://app.notion.com/p/37ee3c20a8ee8188b543c3957dade6dc

Reference companion to Start the Execution and the Collection of prompts folder.
Update this page whenever a prompt is added, removed, or changed.

---

## How the Run Is Structured

1. **Collection phase** — all prompts with "Collecting" or "Collect" in the title run first, in parallel.
2. **Cleanup phase** — all prompts with "Clean" in the title run second, after collection finishes.
3. **Aggregation / TTS phase** — "Aggregated Report (TTS)" always runs last.

---

## Phase 1 — Collection (parallel)

### Start Collecting All
- **AI / Global / Swedish News** — three web-search tasks, one dated sub-page each (5 stories, English, last 24h prioritized).
- **Field Monitor** — 7-day analysis of "AI Agents & Tool Use", weekly digest page (themed clusters, "So What", "Who to Follow").
- **Email Summary** — fetches today's Gmail, summarizes every inbox email (sender, subject, time, 2–3 sentence summary).
- **Daily Intelligence Brief** — 48-hour intelligence sweep: Markets & Investments, AI & Technology, Strategic Signals, Today's Top 3. Each item includes "why this matters" and a 5-year lens.

Supporting prompts:
- **Daily Intelligence Brief — Sub-Agent Prompt** — detailed sub-agent logic for the Daily Intelligence Brief.
- **Email Whitelist Monitor — Prompt** — scans last 24h of inbox, classifies each email, drafts replies (Gmail drafts only, never sent), logs results to Notion.

### Collecting - AI/Robotics Investment Signals
3-agent pipeline in sequence:
1. **News Collector** — searches web for fresh AI/robotics investment news (last 24h), writes to AI/Robotics News Feed database.
2. **Analyzer** — reads unprocessed rows, assesses investment implications, writes to AI/Robotics Analysis database.
3. **Signal Generator** — reads Analysis rows with actionable recommendations, writes to Investment Signals database and creates a summary page under AI Reports.

---

## Phase 2 — Cleanup

### Clean All
Keeps the 5 most recent pages per section and moves older ones to 🗑️ Clean staging page under Admin.

> ⚠️ Manual step: pages moved to 🗑️ Clean must be permanently deleted by hand in Notion.

---

## Phase 3 — Aggregation / TTS (always last)

### Aggregated Report (TTS)
Merges today's Daily Brief and Investment Signal pages into one TTS-friendly plain-prose report. Saves as 📊 Aggregated Report – [date] under AI Reports and outputs full plain-text in the chat.

### Collecting - Newsletter Digest (Expand)
Finds today's newsletter-style emails in Gmail, rewrites substantive content in clean prose, saves as 📨 Newsletter Digest – [date] under AI Reports.

---

## Quick Reference — Run Order

1. (parallel) Start Collecting All — News x3, Field Monitor, Email Summary, Daily Intelligence Brief
2. (parallel) Collecting - AI/Robotics Investment Signals — News Collector → Analyzer → Signal Generator
3. (parallel) Collecting - Newsletter Digest (Expand)
4. Clean All
5. Aggregated Report (TTS)

---

## Maintenance Notes

- Last updated: June 13, 2026.
- When adding a new prompt, add a short section here describing what it does, its inputs/outputs, and which phase it belongs to.
