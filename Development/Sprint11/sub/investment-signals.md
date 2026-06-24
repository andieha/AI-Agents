# AI/Robotics Investment Signals

**Trigger:** Called by `start.md` as part of Step 1 (parallel). Requires the Collection Drive folder ID from the caller.

**Shared storage:** AI Agents Memory (Google Drive — 100 AI Agents / AI Agents Memory, folder ID: `1TVTUon1jtQDNkH7OiANUvsTe015MNfec`)

Run 3 agents in strict order. Report counts after each step.

## Agent 1 — News Collector

Search web for last 24h AI/robotics news (launches, funding, M&A, partnerships, regulatory, earnings). Capture: date, headline, source, 2–3 sentence summary, companies/tickers. Check AI/Robotics News Feed for duplicates. Add 5–15 high-signal items (Status = Unprocessed).

## Agent 2 — Analyzer

Read all Unprocessed rows from AI/Robotics News Feed. Assess investment implications against AI/robotics ETFs, semiconductor/memory stocks, satellite portfolio. Write to AI/Robotics Analysis:
- Recommendation: None / Watch / Consider Buy / Consider Sell / Reduce
- Confidence: Low / Medium / High

Mark source rows as Processed.

## Agent 3 — Signal Generator

Read Analysis rows where Recommendation is Consider Buy / Consider Sell / Reduce AND Confidence is Medium or High.

Write row to Investment Signals (Date, Signal Type, Ticker with exact exchange + currency, Recommendation, Reasoning, Source Links, Review Status = New).

- Prioritize Xetra-listed tickers; if none, give best alternative and note it.
- Combine near-duplicate theses.
- Skip if same ticker + recommendation exists from last 7 days.

For each new signal, create a short summary Google Doc **inside the Collection folder** (parent = Collection Drive folder ID) titled `Investment Signal - [short description] ([Month DD, YYYY])`. Include: ticker, recommendation, confidence, reasoning, link to AI Agents Memory.

## Notes

- Run order: Agent 1 → Agent 2 → Agent 3, daily
- Agent 3 logs to Google Drive only (no auto-send). Review Investment Signals for items marked New.
- 5xx error → wait 10s, retry up to 3×, then skip and continue
