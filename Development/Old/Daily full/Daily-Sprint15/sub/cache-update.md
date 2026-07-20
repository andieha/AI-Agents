# Daily Cache Update

**Trigger:** Called by `start.md` as Step 5, after the execution log entry in 2 Work is written.

## What this does

Updates the 31-slot ring buffer Cache in Notion (Admin → 🗃️ Cache) with a summary of ALL
Notion activity today. Each slot is indexed by day-of-month (1–31). Today's slot overwrites
whatever was there before — e.g. June 26 overwrites April 26.

## Steps

### 1 — Collect today's activity

Primary source: this pipeline run — documents created, investment signals, emails processed, drafts created.
Also search Notion for pages modified today using `notion-search` and include anything found (Admin, Entry, Current Focus, any databases updated).

### 2 — Write a short summary

Compress everything into **3–5 bullet points max**. Cover:
- Topics touched (AI Dev / Travel / Health / Finance / Admin / Research / Entry)
- Key pages created or updated
- Key decisions or outputs
- Any pipelines run or tools created

### 3 — Identify today's ring buffer slot

Today's **Day Number** = today's day-of-month (e.g. June 26 → 26).

Open the Cache database (data source ID: `9b61968e-b3f5-4765-acde-f74ab98d109a`).

Query the default view and find the row where `Day Number = today's day-of-month`:

- **Row found** → overwrite it: update Date (today's full date string), Summary, Topics,
  `date:Day:start` (ISO date), and Day Number
- **No row found** → create a new row with Date, Summary, Topics, Day (ISO date), Day Number

### 4 — Confirm

Verify the row was written correctly. Done — no deletion step needed (the ring buffer
overwrites by slot, so there are never more than 31 rows).

## Rules

- Maximum 5 bullets per entry — stay concise
- Source: this pipeline run's activity plus any Notion activity today
- The ring buffer key is Day Number (1–31), not the full date
- Never delete rows — slots are reused, not deleted
