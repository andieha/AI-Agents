# Daily Report Pipeline — Description

Running `start.md` (trigger: **Start Daily-Sprint15**) triggers the full nightly intelligence pipeline. No confirmation is needed.

## What happens

**Setup:** Reuses or creates a dated Collection folder in Google Drive (`3 Out`) to hold all output from this run.

**Step 1 — Collect (parallel):** Six agents run simultaneously:
- Three news agents gather the latest AI, global, and Swedish news stories (last 24h) and save them as Google Docs.
- Field Monitor does a 7-day sweep of AI Agents & Tool Use developments and saves a digest.
- Email Summary fetches Gmail, classifies emails, drafts replies for anything requiring action, and logs to Google Drive (email memory docs in `2 Work`).
- Daily Brief covers markets, AI & technology, and strategic signals for the past 48 hours.
- Newsletter Digest expands any newsletter emails received today into full prose.
- Investment Signals searches for AI/robotics news, assesses portfolio implications, and logs any actionable signals to Google Drive (memory docs in `2 Work`).

**Step 2 — Clean:** Scans `3 Out` for Collection folders older than 30 days and lists them for manual deletion.

**Step 3 — Aggregate and Convert:** The Aggregated Report agent merges all collected documents into a single themed report (Markets, AI & Technology, Geopolitics, Personal Items, Investment Signals, Top Priorities) and saves it to the Collection folder. The TTS Convert agent then reads the aggregated report and produces a plain-text, speech-ready version (max 10,000 characters) saved alongside it.

**Step 4 — Log:** Writes or overwrites today's entry in the execution log (`2 Work`) in Google Drive with a short bullet summary of the run.

**Step 5 — Cache:** Updates the Notion Cache ring buffer (31 slots, keyed by day-of-month) with a summary of all Notion activity from today. Day 6 overwrites whatever was in slot 6 from any prior month.

## Output locations

- Google Drive → Daily full → 3 Out → Collection – [date] (all documents)
- Google Drive → Daily full → 2 Work → [date] (run summary + memory docs)

Folder names follow the numbered In / Work / Out tree under the `Daily full` root in Drive (`1 In` = email whitelist, `2 Work` = execution log and agent/email memory, `3 Out` = reports). See start.md for the folder IDs.
- Notion → Admin → Cache → Row [day-of-month] (ring buffer entry)
- Gmail → Drafts (email replies, never auto-sent)
