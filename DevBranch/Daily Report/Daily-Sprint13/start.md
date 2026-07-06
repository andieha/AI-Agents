# Start the Execution

**Trigger:** Type **Start the Execution**. No confirmation needed.

## Google Drive Structure

```
100 AI Agents (folder ID: 1AAGGDZsJLGBLv3MgmOSMiJBkCthIwTId)
├── 📁 Execution Log  (folder ID: 1fcIrmGBV1vO-KiD3vZDFZEx4N_grS80D)
├── 📁 AI Agents Memory  (folder ID: 1TVTUon1jtQDNkH7OiANUvsTe015MNfec)
└── 📁 Reports15  (folder ID: 1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_)
    └── 📁 Collection – [Month DD, YYYY]
        ├── 🤖 AI News – [date]
        ├── 🌍 Global News – [date]
        ├── 🇸🇪 Swedish News – [date]
        ├── 📡 Field Monitor Digest – Week [N], [YEAR]
        ├── 📋 Email Summary – [date]
        ├── 📰 Daily Brief – [date]
        ├── 📨 Newsletter Digest – [date] (Expanded)
        ├── Investment Signal – [desc] ([date])
        ├── 📊 Aggregated Report – [date]
        └── 📊 Aggregated Report – [date] – Narrated TTS (plain text, TTS-ready)
```

## Notion Output

```
Admin → 🗃️ Cache (data source ID: 9b61968e-b3f5-4765-acde-f74ab98d109a)
└── Row [day-of-month] — updated with today's session summary (ring buffer, 31 slots)
```

## Before Step 1 — Create Collection Folder

Create a folder titled `📁 Collection – [Month DD, YYYY]` inside Reports15 (Google Drive, folder ID: `1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_`). This is the parent for all documents created in this run. Note the Collection Drive folder ID — all agents in Step 1 must save inside it.

## Step 1 — Collect (parallel)

Pass the Collection Drive folder ID to each agent and run all in parallel. Before executing each sub-prompt, read its file first (e.g. `Read DevBranch/Sprint13/sub/collecting-news.md then execute it`):

- **collecting-news** (`sub/collecting-news.md`)
- **field-monitor** (`sub/field-monitor.md`)
- **email-summary** (`sub/email-summary.md`)
- **daily-brief** (`sub/daily-brief.md`)
- **newsletter-digest** (`sub/newsletter-digest.md`)
- **investment-signals** (`sub/investment-signals.md`)

## Step 2 — Clean (after Step 1 completes)

- **clean** (`sub/clean.md`)

## Step 3 — Aggregate and Convert (always last)

- **aggregated-report** (`sub/aggregated-report.md`) — save inside today's Collection folder; note the Google Doc file ID of the saved document
- **tts-convert** (`sub/tts-convert.md`) — run after aggregated-report is saved; pass the aggregated report's Google Doc file ID as the source; converts it to a clean TTS-ready plain-text file and saves it inside today's Collection folder

## Step 4 — Log

Add one entry to **Execution Log** (Google Drive — 100 AI Agents / Execution Log, folder ID: `1fcIrmGBV1vO-KiD3vZDFZEx4N_grS80D`) for today (title: Month DD, YYYY; short bullet summary). Overwrite if today's entry already exists.

## Step 5 — Cache

- **cache-update** (`sub/cache-update.md`) — run after Step 4; updates today's slot in the Notion Cache ring buffer with a summary of all activity from this run

## Notes

- 5xx error → wait 10s, retry up to 3×, then skip and continue
- If a step fails, continue — still run aggregated-report last
- If a collection agent hasn't reported back after ~3 min, re-launch it
- Email body stays untranslated; all summaries in English
