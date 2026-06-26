# Daily Cache Update

**Trigger:** Type **Update Cache** at the end of any session. No confirmation needed.

## What this does

Updates the 30-day rotation cache in Notion (Admin → Cache) with a short summary of today's session. Overwrites any entry older than 30 days to keep the cache fresh.

## Steps

### 1 — Read today's Session Log entry

Fetch the Session Log page (Notion, Admin → Entry → Session Log). Read only the most recent entry (today's date at the top).

### 2 — Write a short summary

Compress today's entry into 3–5 bullet points max. Include:
- What topics were covered (AI Dev / Travel / Health / Finance / Admin / Research)
- Key decisions or outputs
- Any open items added or closed

### 3 — Update the Cache page

Fetch the Cache page (Notion, Admin → Cache, ID: `38be3c20-a8ee-8102-8369-f294c1120b78`).

- If today's date section already exists → replace it with the new summary
- If it doesn't exist → prepend a new section at the top

Format:
```
## [Month DD, YYYY]
**Topics:** [comma-separated]
- [bullet 1]
- [bullet 2]
- [bullet 3]

---
```

### 4 — Remove entries older than 30 days

Scan the Cache page for any `## [date]` sections where the date is more than 30 days before today. Delete those sections entirely.

## Rules

- Maximum 5 bullets per day entry — stay concise
- Always prepend new entries at the top (most recent first)
- Never delete entries within the last 30 days
- If there was no session today, skip silently
