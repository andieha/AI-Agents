# News TTS Convert

**Trigger:** Type **Convert News to TTS**. No confirmation needed.

## Setup

Read `../start.md` to get the Google Drive folder structure and Reports15 folder ID.

## Step 1 — Locate Today's Collection Folder

Find the folder named `📁 Collection – [Month DD, YYYY]` (today's date) inside Reports15. Note its folder ID.

## Step 2 — Find the 3 News Docs

Search inside today's Collection folder for these 3 documents:
- `🤖 AI News – [date]`
- `🌍 Global News – [date]`
- `🇸🇪 Swedish News – [date]`

Note the file ID of each. Do not process any other documents in the Collection folder.

## Step 3 — Convert Each Doc to TTS (run all 3 in parallel)

For each of the 3 news docs, read the file content and apply the following conversion rules (from `../sub/tts-convert.md`):

**Remove — noise:**
- Separator lines (━━━, ---, ===, ****)
- Source URLs and hyperlinks
- Markdown formatting symbols (#, **, __, ~~)
- Escaped characters (\&, \$, \_)
- Document headers and footers (e.g. "Collected automatically by Claude on...")

**Rewrite — for spoken audio:**
- `$72,000` → "72,000 dollars"
- `€` → "euros", `£` → "pounds", `kr` → "kronor"
- `%` → "percent"
- `&` → "and"
- Section headers → short spoken transitions ("A I News. Story one." etc.)
- Numbered lists → "First...", "Second...", "Third..." etc.
- No bullet points — convert to flowing prose or numbered sentences

**Structure:**
- One blank line between paragraphs
- Two blank lines between sections
- Plain text only — no markdown in the output

## Step 4 — Enforce Character Limit

Maximum **10,000 characters** per document. Count before saving. If over the limit, trim lower-priority stories from the bottom up until under 10,000. Do not save until confirmed under the limit.

## Step 5 — Save to Google Drive

For each converted doc, save a new plain-text file using `mcp__Google_Drive__create_file`:
- **Parent:** today's Collection folder ID
- **Title:** `[original title] – Narrated TTS`
- **contentMimeType:** `text/plain`
- **disableConversionToGoogleType:** `true`

One save per doc. No intermediate files.

## Done

Report the title and character count for each of the 3 saved TTS files.

## Rules

- Only process the 3 news documents — no other files in the Collection folder
- Never alter facts, numbers, or names
- Plain text only in output files
- 5xx error → wait 10s, retry up to 3×, then skip and continue
