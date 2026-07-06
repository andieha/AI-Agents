# Research1 — AI Agents Market Research

A prompt-only multi-agent pipeline that researches the AI agents market and produces a structured report saved to Google Drive.

## How to run

Type: **Run AI Agents Market Research**

## What it does

1. Creates an `AI Research` folder inside today's Collection folder in Google Drive
2. Runs 4 researcher agents in parallel — each covers one subtopic:
   - Market size, growth rates & forecasts
   - Key players, funding rounds & M&A
   - Enterprise adoption, use cases & verticals
   - Technology infrastructure, frameworks & tooling
3. Each researcher does 5-10 web searches and saves a data-dense notes doc to Drive (last 30 days only)
4. A data analyst reads all 4 notes and produces a summary with comparison tables
5. A report writer synthesises everything into a final 500-1000 word report with citations

## Output

All files saved to: `Reports15 / Collection – [today's date] / AI Research /`

- 4 × Research Notes docs
- 1 × Data Summary with tables
- 1 × AI Agents Market Report (final)

## Files

| File | Purpose |
|---|---|
| `start.md` | Lead agent — trigger and orchestration |
| `researcher.md` | Researcher sub-agent prompt (runs 4× in parallel) |
| `analyst.md` | Data analyst sub-agent prompt |
| `report.md` | Report writer sub-agent prompt |
| `sdk-comparison.md` | Differences between this version and the Claude Agent SDK demo |
