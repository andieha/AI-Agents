# TTS Convert

**Trigger:** Either provide a Google Doc URL or file ID and type **Convert to TTS**, or be called by `start.md` with the aggregated report's Google Doc file ID. No confirmation needed.

## What this does

Reads a Google Doc and produces a clean plain-text file optimised for text-to-speech playback.
Saves the result as a new plain-text file in Google Drive next to the original.

## Steps

### 1 — Read the source document

Use `mcp__Google_Drive__read_file_content` with the file ID. If called from `start.md`, the file ID is the aggregated report's Google Doc file ID passed by the caller. If triggered manually, extract the file ID from the provided URL.

### 2 — Convert for speech (signal over noise)

**Remove — noise:**
- Separator lines (━━━, ---, ===, ****)
- Source URLs and hyperlinks
- Markdown formatting symbols (#, **, __, ~~)
- Escaped characters (\&, \$, \_)
- Exchange ticker details and stock codes (e.g. 000660.KS, EXS7.DE)
- Document headers and footers (e.g. "Compiled by...", "End of report")
- Closed or trivial personal items (delivered packages, review requests)
- Redundant sections that repeat content already covered earlier

**Rewrite — for spoken audio:**
- `$72,000` → "72,000 dollars"
- `€` → "euros", `£` → "pounds", `kr` → "kronor"
- `%` → "percent"
- `&` / `\&` → "and"
- `S&P` → "S and P"
- `Story 1:` → "Story one."
- Section headers → short spoken transitions ("Markets and Economy." etc.)
- Numbered lists → "First...", "Second...", "Third..." etc.
- Acronyms that read awkwardly when spelled out → keep as-is (TTS engines handle most)

**Structure:**
- One blank line between paragraphs
- Two blank lines between sections
- No bullet points — convert to flowing prose or numbered sentences

### 3 — Enforce the character limit

Maximum **10,000 characters**. Count the characters of the converted text before saving anything.

If the converted text exceeds 10,000 characters:
- Prioritise in order: Top Priorities → Executive Summary → Markets → AI/Tech → Geopolitics → Investment Signals → Personal Items
- Trim lower-priority sections from the bottom up until under the limit
- Recount after each trim — do not save until the count is confirmed below 10,000

Do not save to Google Drive until the final text is under the limit.

### 4 — Save to Google Drive

Only after Steps 2 and 3 are fully complete and the character count is confirmed under 10,000, create a single plain-text file using `mcp__Google_Drive__create_file`:
- Title: original filename + " – Narrated TTS"
- contentMimeType: `text/plain`
- disableConversionToGoogleType: true

Do not create any intermediate or draft files. One save only.

Confirm the file was saved and report the title and character count.

## Rules

- Signal over noise at every step — if a sentence adds no spoken value, cut it
- Never alter facts, numbers, or names
- Keep personal action items that require a decision or action; drop closed cases
- Plain text only — no markdown in the output file
