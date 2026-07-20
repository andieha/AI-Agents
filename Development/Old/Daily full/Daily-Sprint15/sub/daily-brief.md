# Daily Intelligence Brief

**Trigger:** Called by `start.md` as part of Step 1 (parallel). Requires the Collection Drive folder ID from the caller.

48-hour sweep across four themes.

**Before writing Markets & Investments:** Check the `AI Robotics Investment Analysis` doc in 2 Work (Google Drive, folder ID: `1FWKfAMO0oD4K8s4xzM3U0MD7pok3TTg3`) for existing investment signals and reference them rather than duplicating. Note: investment-signals runs in parallel with this agent, so today's signals may not exist yet — use the most recent entries available and do not wait; the aggregated report merges today's signals later.

## Content Structure

| Theme | Items |
|-------|-------|
| Markets & Investments | 2–3 items |
| AI & Technology | 2–3 items |
| Strategic Signals | 1–2 items |
| Today's Top 3 | — |

For each item:
- Short paragraph summary
- "Why this matters"
- 5-year lens
- Action signal

Tone: sharp, direct.

## Output

- Create a Google Doc **inside the Collection folder** (parent = Collection Drive folder ID).
- Title: `📰 Daily Brief – [Month DD, YYYY]`

## Notes

- 5xx error → wait 10s, retry up to 3×, then skip and continue
- All content in English
