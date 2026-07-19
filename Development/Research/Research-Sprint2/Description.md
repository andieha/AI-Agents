# AI Agents Market Research — Description

Running `start.md` triggers a structured multi-agent research pipeline on the AI Agents market. No confirmation is needed.

## What happens

**Setup:** Checks for today's Collection folder in Google Drive (Reports15) and creates it if missing. Creates an `AI Research` subfolder inside it — this is where all output is saved.

**Step 1 — Research (parallel):** Four researcher agents run simultaneously, each covering one subtopic:
- Subtopic A — Market size, growth rates & forecasts
- Subtopic B — Key players, funding rounds & M&A activity
- Subtopic C — Enterprise adoption, use cases & verticals
- Subtopic D — Technology infrastructure, frameworks & tooling

Each agent saves a `Research Notes –` Google Doc to the AI Research folder. After all four complete, the pipeline verifies all four documents exist and re-launches any that are missing.

**Step 2 — Analyse:** The analyst agent reads all four Research Notes documents, synthesises findings, and saves a `Data Summary – AI Agents Market` document to the AI Research folder.

**Step 3 — Report:** The report writer reads the Data Summary and produces the final `📊 AI Agents Market Report – [date]`, saved to the AI Research folder.

**Step 4 — Log:** Writes or overwrites today's entry in the Execution Log folder in Google Drive with a short note that the research run completed.

## Output locations

- Google Drive → Reports15 → Collection – [date] → AI Research (all documents)
- Google Drive → Execution Log → [date] (run summary)

## Rules

The coordinator (start.md) never researches, analyses, or writes content itself — it only spawns and coordinates the sub-agents. Researchers run in parallel; analyst and report writer are strictly sequential after all researchers finish.
