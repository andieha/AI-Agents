# Plan: Simplify "Execution development" release document

## Context
The "Execution development" release document (`383e3c20-a8ee-81a2-9ec5-c4ce9b49d9d6`) contains the same old-style UUID-based orchestration as the develop document we just simplified. Its scope instruction ("Prompt" subpage) says: "Only make changes inside document 383e3c20-a8ee-81a2-9ec5-c4ce9b49d9d6 and its sub document."

Two pages need the same treatment we applied to the develop version:
1. **Start the Execution** — still references folder by UUID and uses keyword-matching discovery logic
2. **Description** — still describes the old keyword-matching approach

---

## Approach: Create ONE Sprint per iteration — no edits to existing pages

Each Sprint is a child of the Sprint page (`383e3c20a8ee811b8c6cfdc54246cafb`) inside AI Agent Execution (`383e3c20a8ee81c598a8cb1c4463f074`). Previous Sprints remain unchanged.

**Sprint 5** (latest) — adds: news pages (AI News, Global News, Swedish News) now saved to BOTH their dedicated sections AND Reports10. Sprint 2 is superseded but not deleted.

---

## Core rules
1. Every place a UUID/ID appears in the original documents, Sprint 2 replaces it with the actual page name or section name that the ID refers to. No IDs of any kind in Sprint 2 content.
2. **Save location:** All prompts save to **"Reports10"** under **Admin** in Notion. Create Reports10 under Admin first if it doesn't exist.

## Sprint 2 content — 6 simplified documents, all UUIDs replaced with names

### 1. Start the Execution
Trigger: Type **Start the Execution**. No confirmation needed.

Step 1 — Collect (parallel): Start Collecting All / Collecting - AI/Robotics Investment Signals / Collecting - Newsletter Digest (Expand)
Step 2 — Clean: Clean All
Step 3 — Aggregate: Aggregated Report (TTS)
Step 4 — Log: one entry in Execution Log for today (overwrite if exists)

Notes: 5xx → wait 10s retry 3×; continue on failure; re-launch hung agent after ~3 min; summaries in English.

---

### 2. Start Collecting All
Trigger: **Start Collecting All** — runs 4 tasks in parallel.

**Start Collecting News** — 3 parallel tasks. Save each page to (1) its dedicated section (AI News / Global News / Swedish News) AND (2) Reports10 (under Admin). Title: [emoji] [Topic] – [Month DD, YYYY]. 5 stories, English, last 24h prioritized.

**Start Collecting Field Monitor** — 7-day analysis "AI Agents & Tool Use", 4+ web searches, themed clusters, "So What" + "Who to Follow". Save under Field Monitor. Title: Digest — AI Agents & Tool Use — Week [N], [YEAR]. See Daily Intelligence Brief — Sub-Agent Prompt for full agent logic.

**Start Collecting Email** — fetch today's Gmail, 2–3 sentence summary per email. Save as Email Summary – [Month DD, YYYY] under Email Summary. All labels/summaries in English. Gmail 5xx → wait 10s, retry 3×, then skip.

**Daily Intelligence Brief** — 48-hour sweep (Markets, AI/Tech, Strategic Signals, Top 3). Save as Daily Brief – [Month DD, YYYY] under **Reports10 (under Admin)**. Create Reports10 under Admin if it doesn't exist. See Daily Intelligence Brief — Sub-Agent Prompt for full prompt.

---

### 3. Clean All
Trigger: **Clean All** — cleans all sections in sequence.

Sections: AI News / Global News / Swedish News / Email Summary / Field Monitor / Reports10 (Daily Brief + News copies + Investment Signals + Newsletter Digest + Aggregated Report)

Logic per section: fetch all child pages → sort newest first → keep pages 1–5 → move pages 6+ to 🗑️ Clean under Admin.

⚠️ Manual step: permanently delete moved pages from 🗑️ Clean by hand — Claude cannot delete pages.

---

### 4. Aggregated Report (TTS)
[Same content as current, with all references to the AI Reports UUID replaced by "Reports10 (under Admin)" — find all source Daily Brief and Investment Signal pages under Reports10, save result under Reports10. Create Reports10 under Admin first if it doesn't exist.]

---

### 5. Collecting - Newsletter Digest (Expand)
[Same content as current, with the AI Reports UUID in Step 5 replaced by "Reports10 (under Admin)" — save Newsletter Digest page under Reports10. Create Reports10 under Admin first if it doesn't exist.]

---

### 6. Collecting - AI/Robotics Investment Signals
[Same content as current, with the AI Reports UUID in Agent 3 step 6 replaced by "Reports10 (under Admin)" — save Investment Signal summary page under Reports10. Create Reports10 under Admin first if it doesn't exist.]

---

## What is NOT changed
No existing pages are modified. Every current document stays exactly as-is.

## What is created per Sprint
- **Sprint 2** (completed): first simplified version, Reports10 as save target, no UUIDs.
- **Sprint 5** (completed, `383e3c20-a8ee-81b0-88b1-ec74b713c623`): Sprint 2 + news pages also saved to Reports10.

## Outputs
1. Notion Sprint pages under Sprint (`383e3c20a8ee811b8c6cfdc54246cafb`)
2. Commit and push this .md file to git branch `claude/agent-execution-lock-upoegt`

## Verification
Fetch the Sprint page: Sprint 5 exists with 6 sections including dual-save for news. Confirm git push succeeded.
