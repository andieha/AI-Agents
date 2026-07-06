# AI Agents Market Research

**Trigger:** Type **Run AI Agents Market Research**. No confirmation needed. Execute immediately.

## Google Drive Structure

```
100 AI Agents (folder ID: 1AAGGDZsJLGBLv3MgmOSMiJBkCthIwTId)
└── 📁 Reports15  (folder ID: 1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_)
    └── 📁 Collection – [Month DD, YYYY]
        └── 📁 AI Research
            ├── Research Notes – Market Size & Growth
            ├── Research Notes – Key Players & Funding
            ├── Research Notes – Enterprise Adoption & Use Cases
            ├── Research Notes – Technology & Infrastructure
            ├── Data Summary – AI Agents Market
            └── 📊 AI Agents Market Report – [date]
```

## Before Step 1 — Prepare Folders

1. Check if a folder named `📁 Collection – [Month DD, YYYY]` (today's date) already exists inside Reports15 (folder ID: `1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_`). Create it if it does not exist. Note its folder ID.
2. Inside the Collection folder, create a subfolder named `AI Research`. Note its folder ID — this is the **AI Research folder ID** passed to all sub-agents.

## Step 1 — Research (parallel)

You MUST delegate ALL research to sub-agents. You NEVER research yourself.

Spawn all 4 researcher sub-agents IN PARALLEL — not sequential. Pass the AI Research folder ID to each. For each: read `sub/researcher.md` then execute it with the assigned subtopic and folder ID.

- **Subtopic A — Market size, growth rates & forecasts**
- **Subtopic B — Key players, funding rounds & M&A activity**
- **Subtopic C — Enterprise adoption, use cases & verticals**
- **Subtopic D — Technology infrastructure, frameworks & tooling**

Wait for ALL 4 to complete before moving to Step 2.

**Verify before continuing:** Check the AI Research folder in Google Drive. If fewer than 4 `Research Notes –` docs exist, identify which subtopics are missing and re-launch only those researchers. Wait for them to complete before proceeding.

## Step 2 — Analyse (after Step 1 completes)

Read `sub/analyst.md` then execute it. Pass the AI Research folder ID.

## Step 3 — Report (after Step 2 completes)

Read `sub/report.md` then execute it. Pass the AI Research folder ID.

## Step 4 — Log

Add one entry to **Execution Log** (Google Drive — 100 AI Agents / Execution Log, folder ID: `1fcIrmGBV1vO-KiD3vZDFZEx4N_grS80D`) for today (title: Month DD, YYYY; short bullet: "AI Agents Market Research — report saved to AI Research folder"). Overwrite if today's entry already exists.

## Rules

- You coordinate only — never research, analyse, or write reports yourself
- Spawn researchers in parallel; analyst and report writer are sequential after researchers finish
- Keep coordination responses to 2-3 sentences max — no greetings, no emojis
- 5xx error → wait 10s, retry up to 3×, then skip and continue
- If a researcher hasn't reported back after ~3 min, re-launch it
