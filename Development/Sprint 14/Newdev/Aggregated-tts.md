# Aggregated News TTS

**Trigger:** Type **Aggregate News TTS**. No confirmation needed.

## Setup

Read `../start.md` to get the Google Drive folder structure and Reports15 folder ID.

## Step 1 — Locate Today's Collection Folder

Find the folder named `📁 Collection – [Month DD, YYYY]` (today's date) inside Reports15. Note its folder ID.

## Step 2 — Read the 3 Narrated TTS Files

Find and read these 3 files from today's Collection folder:
- `🤖 AI News – [date] – Narrated TTS`
- `🌍 Global News – [date] – Narrated TTS`
- `🇸🇪 Swedish News – [date] – Narrated TTS`

## Step 3 — Write the Aggregated Summary

Produce one cohesive spoken-word document:
- One short paragraph per news source (2-3 sentences covering the key stories)
- Smooth spoken transition between sections
- Plain text only — no markdown, no URLs, no bullet points
- Written for natural spoken audio — flowing prose
- Maximum 9,000 characters total

## Step 4 — Save to Google Drive

Save the result to today's Collection folder:
- **Title:** `Aggregated News TTS – [date]`
- **contentMimeType:** `text/plain`
- **disableConversionToGoogleType:** `true`

Report the title and character count when done.

## Rules

- Only summarise the 3 news TTS files — no other documents
- Never alter facts, numbers, or names
- Plain text only in the output file
- 5xx error → wait 10s, retry up to 3×, then skip
