# Email Summary

**Trigger:** Called by `start.md` as part of Step 1 (parallel). Requires the Collection Drive folder ID from the caller.

## Steps

1. Fetch today's Gmail inbox. Filter out sent mail and unsubscribe emails.
2. For each email extract: sender, subject, time, 2–3 sentence summary.
3. All text in English.

## Output

- Create a Google Doc **inside the Collection folder** (parent = Collection Drive folder ID).
- Title: `📋 Email Summary – [Month DD, YYYY]`

## Notes

- Gmail 5xx → wait 10s, retry 3×, then skip and report
- Email body stays untranslated; summaries in English
