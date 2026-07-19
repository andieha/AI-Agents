# AI/Robotics Investment Signals

**Trigger:** Called by `start.md` as part of Step 1 (parallel). Requires the Collection Drive folder ID from the caller.

**Shared storage:** AI Agents Memory (Google Drive — 100 AI Agents / AI Agents Memory, folder ID: `1FWKfAMO0oD4K8s4xzM3U0MD7pok3TTg3`)

**Important:** Do not spawn background sub-agents. Run all 3 agents sequentially and inline in this conversation. If any agent step fails, wait 10s and retry up to 3 times before skipping.

Run 3 agents in strict order. Report counts after each step.

**Memory docs** (both live in AI Agents Memory; create if missing, append-only, newest entries under a dated heading):
- `AI Robotics News Feed` — collected news items
- `AI Robotics Investment Analysis` — assessments and recommendations

## Agent 1 — News Collector

Search web for last 24h AI/robotics news (launches, funding, M&A, partnerships, regulatory, earnings). Capture: date, headline, source, 2–3 sentence summary, companies/tickers. Read the `AI Robotics News Feed` doc and skip any item whose headline/company already appears in the last 7 days of entries. Append 5–15 high-signal items under a heading for today's date.

## Agent 2 — Analyzer

Read today's entries from the `AI Robotics News Feed` doc. Assess investment implications against the following portfolio buckets:
- AI/robotics ETFs (e.g. BOTZ, ROBO)
- Semiconductor/memory stocks (e.g. NVDA, ASML, Samsung)
- Satellite portfolio (e.g. ASTS, RKLB)

For each ticker assessed, include current price vs. 52-week high/low as context.

Append to the `AI Robotics Investment Analysis` doc under a heading for today's date:
- Recommendation: None / Watch / Consider Buy / Consider Sell / Reduce
- Confidence: Low / Medium / High

## Agent 3 — Signal Generator

From today's entries in the `AI Robotics Investment Analysis` doc, take those where Recommendation is Consider Buy / Consider Sell / Reduce AND Confidence is Medium or High.

For each: Date, Signal Type, Ticker with exact exchange + currency, Recommendation, Reasoning, Source Links.

- Prioritize Xetra-listed tickers; if none, give best alternative and note it.
- Combine near-duplicate theses.
- Skip if the same ticker + recommendation appears in the last 7 days of the Analysis doc.

For each new signal, create a short summary Google Doc **inside the Collection folder** (parent = Collection Drive folder ID) titled `Investment Signal - [short description] ([Month DD, YYYY])`. Include: ticker, recommendation, confidence, reasoning, link to AI Agents Memory.

## Notes

- Run order: Agent 1 → Agent 2 → Agent 3, daily
- Agent 3 logs to Google Drive only (no auto-send). Review new Investment Signal docs in today's Collection folder.
- 5xx error → wait 10s, retry up to 3×, then skip and continue
