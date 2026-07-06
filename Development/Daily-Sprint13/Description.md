# Daily Report Pipeline — Description

Running `start.md` triggers the full nightly intelligence pipeline. No confirmation is needed.

## What happens

**Setup:** Creates a dated Collection folder in Google Drive (Reports15) to hold all output from this run.

**Step 1 — Collect (parallel):** Six agents run simultaneously:
- Three news agents gather the latest AI, global, and Swedish news stories (last 24h) and save them as Google Docs.
- Field Monitor does a 7-day sweep of AI Agents & Tool Use developments and saves a digest.
- Email Summary fetches Gmail, classifies emails, drafts replies for anything requiring action, and logs to Notion.
- Daily Brief covers markets, AI & technology, and strategic signals for the past 48 hours.
- Newsletter Digest expands any newsletter emails received today into full prose.
- Investment Signals searches for AI/robotics news, assesses portfolio implications, and logs any actionable signals to Notion and Google Drive.

**Step 2 — Clean:** Scans Reports15 for Collection folders older than 30 days and lists them for manual deletion.

**Step 3 — Aggregate and Convert:** The Aggregated Report agent merges all collected documents into a single themed report (Markets, AI & Technology, Geopolitics, Personal Items, Investment Signals, Top Priorities) and saves it to the Collection folder. The TTS Convert agent then reads the aggregated report and produces a plain-text, speech-ready version (max 10,000 characters) saved alongside it.

**Step 4 — Log:** Writes or overwrites today's entry in the Execution Log folder in Google Drive with a short bullet summary of the run.

**Step 5 — Cache:** Updates the Notion Cache ring buffer (31 slots, keyed by day-of-month) with a summary of all Notion activity from today. Day 6 overwrites whatever was in slot 6 from any prior month.

## Output locations

- Google Drive → Reports15 → Collection – [date] (all documents)
- Google Drive → Execution Log → [date] (run summary)
- Notion → Admin → Cache → Row [day-of-month] (ring buffer entry)
- Gmail → Drafts (email replies, never auto-sent)
