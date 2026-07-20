# Daily-Sprint15

**Trigger:** Type **Start Daily-Sprint15**. No confirmation needed.

## Google Drive Structure

The Daily pipeline lives in its own numbered In / Work / Out tree under the
`Daily full` root in Google Drive. The names below are the REAL folder names —
do not "correct" the IDs to match older names like 100 AI Agents / Email /
Execution Log / AI Agents Memory / Email Memory / Reports15.

```
Daily full (folder ID: 1rC_0BZjUfVEbMB8TAxtbUkY0JM1DiirU)
├── 📁 1 In  (folder ID: 1xn75BXwd8JXstSOIGyNsuG25qbrtCsyL)  ← input: email whitelist
│   └── Whitelist  (file ID: 1_uLlUehxCpd8PTEJtJxtw1eQ906x5SYcktbPlrhSijE)
├── 📁 2 Work  (folder ID: 1FWKfAMO0oD4K8s4xzM3U0MD7pok3TTg3)  ← execution log + agent memory + email memory
│   ├── Important  (file ID: 1K83OcvWkjL9HLx5K9svgoeArTmEjPjMWnVZw0W7XAIY)
│   ├── Flightright Case File  (file ID: 1YMWyDVHSmEuo1qDWFJzZalnMSoybebxQ4fGpoc7ANG8)
│   └── Contacts  (file ID: 1etlculH1YLMFnZ-vE8OIeWKn6VQfyezY204oJS3XoLQ)
└── 📁 3 Out  (folder ID: 19LWpMihga0tvkaoFTaPpECkD3NMFCt5F)  ← output: reports
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

First check whether today's Collection folder already exists (rerun protection): search 3 Out with
`title contains 'Collection – [Month DD, YYYY]' and mimeType = 'application/vnd.google-apps.folder' and parentId = '19LWpMihga0tvkaoFTaPpECkD3NMFCt5F'`
If found, reuse its folder ID. Otherwise create a folder titled `📁 Collection – [Month DD, YYYY]` inside 3 Out (Google Drive, folder ID: `19LWpMihga0tvkaoFTaPpECkD3NMFCt5F`). This is the parent for all documents created in this run. Note the Collection Drive folder ID — all agents in Step 1 must save inside it.

## Step 1 — Collect (parallel)

Pass the Collection Drive folder ID to each agent and run all in parallel. All sub-agent paths are relative to the folder containing this file. Before executing each sub-prompt, read its file first (e.g. `Read ./sub/collecting-news.md then execute it`):

- **collecting-news** (`sub/collecting-news.md`)
- **field-monitor** (`sub/field-monitor.md`)
- **email-summary** (`sub/email-summary.md`)
- **daily-brief** (`sub/daily-brief.md`)
- **newsletter-digest** (`sub/newsletter-digest.md`)
- **investment-signals** (`sub/investment-signals.md`)

## Step 2 — Clean (after Step 1 completes)

- **clean** (`sub/clean.md`)

## Step 3 — Aggregate and Convert (always last)

- **aggregated-report** (`sub/aggregated-report.md`) — pass today's Collection folder ID (already known from Before Step 1); save inside that folder; note the Google Doc file ID of the saved document
- **tts-convert** (`sub/tts-convert.md`) — run after aggregated-report is saved; pass the aggregated report's Google Doc file ID as the source; converts it to a clean TTS-ready plain-text file and saves it inside today's Collection folder

## Step 4 — Log

Add one entry to the execution log in **2 Work** (Google Drive — Daily full / 2 Work, folder ID: `1FWKfAMO0oD4K8s4xzM3U0MD7pok3TTg3`) for today (title: Month DD, YYYY; short bullet summary). Overwrite if today's entry already exists.

## Step 5 — Cache

- **cache-update** (`sub/cache-update.md`) — run after Step 4; updates today's slot in the Notion Cache ring buffer with a summary of all activity from this run

## Notes

- 5xx error → wait 10s, retry up to 3×, then skip and continue
- If a step fails, continue — still run aggregated-report last
- If a collection agent hasn't reported back after ~10 min, re-launch it (normal runs take 1–8 min per agent)
- Email body stays untranslated; all summaries in English
