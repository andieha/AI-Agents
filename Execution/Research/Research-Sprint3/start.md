# Market Research Pipeline

**Trigger:** Type **Run Research-Sprint3**. No confirmation needed. Execute immediately.

## Google Drive Structure

All three folders live under the Research root in Google Drive, organised as a
numbered In / Work / Out tree. The names below are the REAL folder names — do not
"correct" the IDs to match older names like Research / Reports15 / Execution Log.

```
📁 1 In  (folder ID: 15erYhF965pUgZddTedngq13s3ELUtGbM)  ← input: topics whitelist
└── White list  (file ID: 1q1PdRa6YIZKmiv8O6f6uMT-eWVbSZa-BhRjzr_rkoV8)

📁 3 Out  (folder ID: 1SMSqUNdvNd9UOXBS6Anmimakh6Qld_ic)  ← output: reports
└── 📁 Collection – [Month DD, YYYY]
    └── 📁 Research-Reports
        └── 📁 [Topic] Research  (one per topic)
            ├── Research Notes – [Topic] – Market Size & Growth
            ├── Research Notes – [Topic] – Key Players & Funding
            ├── Research Notes – [Topic] – Enterprise Adoption & Use Cases
            ├── Research Notes – [Topic] – Technology & Infrastructure
            ├── Data Summary – [Topic]
            └── 📊 [Topic] Report – [date]

📁 2 Work  (folder ID: 1FKlcrsC8pHNOHPN1kA6bITNce-cOlC3j)  ← execution log
└── [Month DD, YYYY]  (one log entry per run)
```

## Before Step 1 — Read Topics

Read the whitelist using `mcp__Google_Drive__read_file_content` with file ID `1q1PdRa6YIZKmiv8O6f6uMT-eWVbSZa-BhRjzr_rkoV8`. Each non-empty line is one research topic. Run the full pipeline (Steps 1–4) for ALL topics in parallel — one independent pipeline per topic.

## Before Step 1 — Prepare Folders (per topic)

Once (shared across all topics):
1. Check if a folder named `📁 Collection – [Month DD, YYYY]` (today's date) already exists inside 3 Out (folder ID: `1SMSqUNdvNd9UOXBS6Anmimakh6Qld_ic`). Create it if it does not exist. Note its folder ID.
2. Check if a folder named `Research-Reports` exists inside the Collection folder. Create it if it does not exist. Note its folder ID — this is the **Research-Reports folder ID**.

For each topic (in parallel):
3. Check if a subfolder named `[Topic] Research` already exists inside Research-Reports (a rerun today reuses it). Create it only if it does not exist. Note its folder ID — this is the **Research folder ID** passed to all sub-agents for this topic.

## Step 1 — Research (parallel, per topic)

You MUST delegate ALL research to sub-agents. You NEVER research yourself.

All sub-agent paths (`sub/…`) are relative to the folder containing this file — resolve them from this file's location, never from another copy of the pipeline.

Spawn all 4 researcher sub-agents IN PARALLEL for each topic — not sequential. For each: read `sub/researcher.md` then execute it, passing the topic name, the Research folder ID, the subtopic scope, and the EXACT doc title. The doc titles below are a contract — the analyst and report writer look these titles up verbatim, so pass them exactly as written:

- **Subtopic A** — scope: market size, growth rates & forecasts
  → doc title: `Research Notes – [Topic] – Market Size & Growth`
- **Subtopic B** — scope: key players, funding rounds & M&A activity
  → doc title: `Research Notes – [Topic] – Key Players & Funding`
- **Subtopic C** — scope: enterprise adoption, use cases & verticals
  → doc title: `Research Notes – [Topic] – Enterprise Adoption & Use Cases`
- **Subtopic D** — scope: technology infrastructure, frameworks & tooling
  → doc title: `Research Notes – [Topic] – Technology & Infrastructure`

Wait for ALL 4 researchers for a topic to complete before moving to Step 2 for that topic.

**Verify before continuing:** Check the Research folder in Google Drive. If fewer than 4 `Research Notes –` docs exist, identify which subtopics are missing and re-launch only those researchers. Wait for them to complete before proceeding.

## Step 2 — Analyse (after Step 1 completes, per topic)

Read `sub/analyst.md` then execute it. Pass the Research folder ID and the topic name.

## Step 3 — Report (after Step 2 completes, per topic)

Read `sub/report.md` then execute it. Pass the Research folder ID and the topic name.

## Step 4 — Log (ONCE, after ALL topic pipelines finish)

Do NOT log per topic — parallel per-topic writes overwrite each other. Wait until every topic pipeline has completed (or failed), then add ONE entry to **2 Work** (Google Drive, folder ID: `1FKlcrsC8pHNOHPN1kA6bITNce-cOlC3j`) for today (title: Month DD, YYYY). One bullet per topic: "[Topic] research — report saved to Research-Reports/[Topic] Research inside today's Collection folder" (or the failure reason). Overwrite if today's entry already exists.

## Rules

- Read the whitelist first — never hardcode topics
- You coordinate only — never research, analyse, or write reports yourself
- Spawn all topic pipelines in parallel; within each topic, spawn researchers in parallel; analyst and report writer are sequential after researchers finish
- Keep coordination responses to 2-3 sentences max — no greetings, no emojis
- 5xx error → wait 10s, retry up to 3×, then skip and continue
- If a researcher hasn't reported back after ~10 min, re-launch it
