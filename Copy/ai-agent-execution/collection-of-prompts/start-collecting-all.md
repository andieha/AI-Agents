# Start Collecting All

Source: https://app.notion.com/p/377e3c20a8ee81f2ab9ceb63c9202f3d

## Overview

Type **Start Collecting All** to run all four collection tasks in parallel in a single command. Claude will execute News, Field Monitor, Email, and Daily Intelligence Brief simultaneously — no confirmation needed.

---

## What It Runs

### Start Collecting News
Run 3 tasks in parallel, creating a dated sub-page under each category:
- AI News (parent ID: `34ce3c20-a8ee-8113`)
- Global News (parent ID: `34ce3c20-a8ee-8154`)
- Swedish News (parent ID: `34ce3c20-a8ee-816a`)

Title format: `[emoji] [Topic] – [Month DD, YYYY]`
Content: English, dated header, 5 stories (title + 2–3 sentence summary + source), footer "Collected automatically by Claude on [date]". Prioritize last 24h sources. No confirmation.

---

### Start Collecting Field Monitor
Run a full analysis on "AI Agents & Tool Use (MCP, multi-agent frameworks)" covering the last 7 days. Execute 4+ web searches, cluster findings by theme, synthesize with "So What" and "Who to Follow" sections.

Write the digest as a child page under Field Monitor (parent ID: `34de3c20-a8ee-81bc-9e04-eb27418bb596`).
Title format: `Digest — AI Agents & Tool Use — Week [N], [YEAR]`, icon 📡.
No confirmation. All content in English.

---

### Start Collecting Email
Fetch today's Gmail (filter out sent/unsubscribe). Extract sender, subject, time, and a 2–3 sentence summary per email.

Create a Notion page titled `📋 Email Summary – [Month DD, YYYY]` under parent `34ce3c20-a8ee-81da-857f-d9754fd3935f`.
Use category sections + stats footer. ALL text in English. Email body content stays untranslated; summaries and all labels in English. No confirmation.

---

### Daily Intelligence Brief
Search the web for the most important developments from the past 48 hours. Generate a full intelligence brief covering: Markets & Investments (2–3 items), AI & Technology (2–3 items), Strategic Signals (1–2 items), and Today's Top 3. Each item must include a short paragraph, a "Why this matters to you" line, a 5-year lens, and a concrete action signal. Tone: sharp, direct, no generic summaries.

Save as a new page titled `📰 Daily Brief – [Month DD, YYYY]` under AI Reports (parent ID: `377e3c20-a8ee-8141-baaf-d8a52d4d2c50`). No confirmation.

---

## Trigger Command

> Start Collecting All
