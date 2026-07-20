# Newsletter Digest (Expand)

**Trigger:** Called by `start.md` as part of Step 1 (parallel). Requires the Collection Drive folder ID from the caller.

Variants: `Expand Newsletter Digest` / `Expand [name] for [date]`

## Steps

1. Search Gmail for today's newsletter emails (subject contains "Digest" or "Brief"). Default to today. This subject filter is intentionally narrow — newsletters with other subject lines are out of scope for this step (they still appear in Email Summary as FYI/NEWSLETTER).
2. Fetch full content with `get_thread` (FULL_CONTENT) — not search snippets.
3. Extract editorial content only. Exclude nav bars, ads, CTAs, unsubscribe footers, tracking pixels. If email is a teaser with no real body, say so — don't invent content. Rewrite in full prose paragraphs. Preserve all facts, names, products.
4. Structure: one-sentence intro (source, date, promo removed) → one section per source email → one paragraph per item in original order. Plain prose only — no markdown, no bullets, no emoji.
5. Save output as Google Doc inside the Collection folder.

## Output

- Create a Google Doc **inside the Collection folder** (parent = Collection Drive folder ID).
- Title: `📨 Newsletter Digest – [Month DD, YYYY] (Expanded)`

## Notes

- Gmail 5xx → wait 10s, retry 3×, then skip and report
