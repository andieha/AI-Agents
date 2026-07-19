# Market Research Pipeline — Description

Running `start.md` (trigger: **Run Research-Sprint3**) starts a topic-driven multi-agent research pipeline. No confirmation is needed.

## What happens

**Setup:** Reads the topics whitelist from Google Drive (`1 In` / White list — one topic per non-empty line). Checks for today's `Collection – [date]` folder inside `3 Out` and a `Research-Reports` subfolder inside it, creating either only if missing. For each topic, reuses or creates a `[Topic] Research` subfolder inside Research-Reports. The full pipeline then runs for ALL topics in parallel — one independent pipeline per topic.

**Step 1 — Research (parallel, per topic):** Four researcher agents run simultaneously, each covering one subtopic and saving a Google Doc with an exact, contract-defined title:
- `Research Notes – [Topic] – Market Size & Growth`
- `Research Notes – [Topic] – Key Players & Funding`
- `Research Notes – [Topic] – Enterprise Adoption & Use Cases`
- `Research Notes – [Topic] – Technology & Infrastructure`

Each researcher runs 5–10 web searches (last 30 days for news/funding; up to 12 months for market-size and forecast figures, with publication dates noted). After all four complete, the pipeline verifies all four documents exist and re-launches any that are missing.

**Step 2 — Analyse (per topic):** The analyst agent reads all four Research Notes documents, synthesises the quantitative data into comparison tables, and saves `Data Summary – [Topic]` to the topic's Research folder.

**Step 3 — Report (per topic):** The report writer reads the notes and Data Summary and produces the final `📊 [Topic] Report – [date]`, saved to the topic's Research folder.

**Step 4 — Log (once, after ALL topics finish):** Writes or overwrites today's single entry in the `2 Work` execution-log folder, with one bullet per topic. Logging is deliberately not per-topic — parallel writes would overwrite each other.

## Output locations

- Google Drive → 3 Out → Collection – [date] → Research-Reports → [Topic] Research (all documents, one folder per topic)
- Google Drive → 2 Work → [date] (one consolidated run summary)

Folder names follow the numbered In / Work / Out tree under the Research root in Drive (`1 In` = whitelist input, `2 Work` = execution log, `3 Out` = reports). See start.md for the folder IDs.

## Rules

The coordinator (start.md) never researches, analyses, or writes content itself — it only spawns and coordinates the sub-agents. Topic pipelines run in parallel; within each topic, researchers run in parallel, and the analyst and report writer are strictly sequential after all researchers finish. A researcher that has not reported back after ~10 minutes is re-launched.
