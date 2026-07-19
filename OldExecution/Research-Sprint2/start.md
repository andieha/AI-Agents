# Market Research Pipeline

**Trigger:** Type **Run Market Research**. No confirmation needed. Execute immediately.

## Google Drive Structure

```
📁 Research  (folder ID: 15erYhF965pUgZddTedngq13s3ELUtGbM)
└── White list  (file ID: 1q1PdRa6YIZKmiv8O6f6uMT-eWVbSZa-BhRjzr_rkoV8)

📁 Reports15  (folder ID: 1SMSqUNdvNd9UOXBS6Anmimakh6Qld_ic)
└── 📁 Collection – [Month DD, YYYY]
    └── 📁 Research-Reports
        └── 📁 [Topic] Research  (one per topic)
            ├── Research Notes – [Topic] – Market Size & Growth
            ├── Research Notes – [Topic] – Key Players & Funding
            ├── Research Notes – [Topic] – Enterprise Adoption & Use Cases
            ├── Research Notes – [Topic] – Technology & Infrastructure
            ├── Data Summary – [Topic]
            └── 📊 [Topic] Report – [date]

📁 Execution Log  (folder ID: 1FKlcrsC8pHNOHPN1kA6bITNce-cOlC3j)
└── [Month DD, YYYY]  (one log entry per run)
```

## Before Step 1 — Read Topics

Read the whitelist using `mcp__Google_Drive__read_file_content` with file ID `1q1PdRa6YIZKmiv8O6f6uMT-eWVbSZa-BhRjzr_rkoV8`. Each non-empty line is one research topic. Run the full pipeline (Steps 1–4) for ALL topics in parallel — one independent pipeline per topic.

## Before Step 1 — Prepare Folders (per topic)

Once (shared across all topics):
1. Check if a folder named `📁 Collection – [Month DD, YYYY]` (today's date) already exists inside Reports15 (folder ID: `1SMSqUNdvNd9UOXBS6Anmimakh6Qld_ic`). Create it if it does not exist. Note its folder ID.
2. Check if a folder named `Research-Reports` exists inside the Collection folder. Create it if it does not exist. Note its folder ID — this is the **Research-Reports folder ID**.

For each topic (in parallel):
3. Inside Research-Reports, create a subfolder named `[Topic] Research`. Note its folder ID — this is the **Research folder ID** passed to all sub-agents for this topic.

## Step 1 — Research (parallel, per topic)

You MUST delegate ALL research to sub-agents. You NEVER research yourself.

Spawn all 4 researcher sub-agents IN PARALLEL for each topic — not sequential. Pass the Research folder ID and the topic name to each. For each: read `sub/researcher.md` then execute it with the assigned subtopic, topic name, and folder ID.

- **Subtopic A — Market size, growth rates & forecasts**
- **Subtopic B — Key players, funding rounds & M&A activity**
- **Subtopic C — Enterprise adoption, use cases & verticals**
- **Subtopic D — Technology infrastructure, frameworks & tooling**

Wait for ALL 4 researchers for a topic to complete before moving to Step 2 for that topic.

**Verify before continuing:** Check the Research folder in Google Drive. If fewer than 4 `Research Notes –` docs exist, identify which subtopics are missing and re-launch only those researchers. Wait for them to complete before proceeding.

## Step 2 — Analyse (after Step 1 completes, per topic)

Read `sub/analyst.md` then execute it. Pass the Research folder ID and the topic name.

## Step 3 — Report (after Step 2 completes, per topic)

Read `sub/report.md` then execute it. Pass the Research folder ID and the topic name.

## Step 4 — Log (per topic)

Add one entry to **Execution Log** (Google Drive — Execution Log, folder ID: `1FKlcrsC8pHNOHPN1kA6bITNce-cOlC3j`) for today (title: Month DD, YYYY; short bullet: "[Topic] research — report saved to Research-Reports/[Topic] Research inside today's Collection folder"). Overwrite if today's entry already exists.

## Rules

- Read the whitelist first — never hardcode topics
- You coordinate only — never research, analyse, or write reports yourself
- Spawn all topic pipelines in parallel; within each topic, spawn researchers in parallel; analyst and report writer are sequential after researchers finish
- Keep coordination responses to 2-3 sentences max — no greetings, no emojis
- 5xx error → wait 10s, retry up to 3×, then skip and continue
- If a researcher hasn't reported back after ~3 min, re-launch it
