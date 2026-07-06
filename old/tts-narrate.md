# TTS Narrate

**Trigger:** Runs automatically after the aggregated report is saved. No confirmation needed.

## What this does

Reads the aggregated report produced in Step 3 and rewrites it as flowing spoken narration
optimised for text-to-speech playback. Saves the result as a new plain-text file in Google Drive
inside today's Collection folder.

## Steps

### 1 — Read the aggregated report

Use `mcp__Google_Drive__read_file_content` with the file ID of the aggregated report saved
in today's Collection folder.

### 2 — Rewrite as spoken narration

**Format rules — strictly no:**
- Headers, section titles, or labels
- Bullet points or numbered lists
- Bold, italic, or any markdown formatting
- Symbols: %, $, →, &, #, *, —, /, \\
- Tables or columnar data

**Spell everything out in natural spoken language:**
- `$86` → "86 dollars"
- `3.5–3.75%` → "three and a half to three and three quarters percent"
- `→` → "leading to" or omit
- `S&P 500` → "S and P 500"
- `Q3` → "the third quarter"
- `EU` → "the European Union" (first use), then "the EU"
- Tickers and exchange codes → full speakable form on first use
  (e.g. "SKHY on the Nasdaq" rather than just "SKHY")

**Write in full connected paragraphs with verbal transitions:**
- Open each new topic conversationally:
  "Starting with...", "Turning now to...", "On the markets...", "In AI and technology...",
  "Looking at geopolitics...", "For personal action items...", "On the investment side..."
- Use bridging sentences between ideas rather than isolated facts
- Keep the same section order as the source document

**Preserve all signal — never drop:**
- Every number, date, percentage, and dollar figure
- Every named company, person, or organisation
- Every action item, deadline, or decision point
- Every investment signal, ticker (in speakable form), and price target

**Close with a spoken priority summary:**
Introduce it naturally, for example:
"To sum up the things that matter most today..." — then restate the top priorities in
conversational prose, not as a numbered list.

### 3 — Enforce the character limit

Maximum **95,000 characters**. If the narrated text would exceed this:
- Condense background colour and minor contextual detail first
- Never cut numbers, dates, action items, or named entities
- Preserve the closing priority summary in full

### 4 — Save to Google Drive

Create a new plain-text file using `mcp__Google_Drive__create_file`:
- Title: original filename + " – Narrated TTS"
- Parent: today's Collection folder ID
- contentMimeType: `text/plain`
- disableConversionToGoogleType: true

Confirm the file was saved and report the title and character count.
