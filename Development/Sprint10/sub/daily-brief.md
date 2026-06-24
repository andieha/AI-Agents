# Daily Intelligence Brief

**Trigger:** Called by `start.md` as part of Step 1 (parallel). Requires the Collection Drive folder ID from the caller.

48-hour sweep across four themes.

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
