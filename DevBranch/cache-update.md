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

Open the Cache database (Notion, Admin → 🗃️ Cache, data source ID: `9b61968e-b3f5-4765-acde-f74ab98d109a`).

- If a row with today's date already exists → update its Summary and Topics fields
- If it doesn't exist → create a new row with Date, Summary, Day (ISO date), and Topics

### 4 — Delete entries older than 30 days

Query the Cache database for rows where `Day` is earlier than today minus 30 days. Delete those rows.

## Rules

- Maximum 5 bullets per day entry — stay concise
- Always prepend new entries at the top (most recent first)
- Never delete entries within the last 30 days
- If there was no session today, skip silently
