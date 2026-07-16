# Collecting News

**Trigger:** Called by `start.md` as part of Step 1 (parallel). Requires the Collection Drive folder ID from the caller.

Run 3 tasks in parallel. For each:

- Create one dated Google Doc **inside the Collection folder** (parent = Collection Drive folder ID).
- Title: [emoji] [Topic] – [Month DD, YYYY].
- Content: 5 stories (title + 2–3 sentence summary + source), English, last 24h prioritized.
- Footer: "Collected automatically by Claude on [date]".

## Topics

| Emoji | Topic |
|-------|-------|
| 🤖 | AI News |
| 🌍 | Global News |
| 🇸🇪 | Swedish News |

## Notes

- 5xx error → wait 10s, retry up to 3×, then skip and continue
- All summaries in English
