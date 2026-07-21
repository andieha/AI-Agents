---
name: tts-script-writer
description: >
  Convert an existing document (Google Doc, Notion page, PDF, or any readable
  source) into a spoken-word script suitable for text-to-speech, and save it as
  a new Google Doc. Use this whenever the user asks to "make a TTS version",
  "text to speech document", "audio script", "make this listenable", or "turn
  this into something I can have read aloud" — for any source document and any
  destination folder they specify. Also trigger if they give a source link, a
  destination Drive folder, and a character/length limit and ask for a
  converted or condensed version meant for listening rather than reading.
  Source and destination locations, and the character limit, are parameters —
  always take them from the user's current request, never reuse a prior run's
  folder or limit as a default.
---

# TTS Script Writer

Turn a written document into a script written to be *heard*, not read — then
save it as a Google Doc at the user-specified destination. The two failure
modes to avoid: (1) just re-exporting the source text with headers and tables
intact (unlistenable), and (2) writing a vague, padded summary that loses the
actual figures and findings (not signal).

## Required parameters (get these from the current request, every time)

1. **Source** — the document/page/folder to convert. Fetch and read it fully.
2. **Destination folder** — where the output Google Doc gets saved. A Drive
   folder ID or link.
3. **Length limit** — a character count ceiling. If the user doesn't give one,
   ask, since it changes how aggressively to condense.

Never assume these carry over from a previous run in the conversation — a
skill invocation with a new source or folder is a fresh job, not a repeat.

## Workflow

### 1. Retrieve the source content in full
Fetch the actual document (Notion page, Google Doc, PDF, etc.) — don't
summarize from memory of an earlier conversation turn even if it looks
familiar. If the source spans multiple linked pages (e.g. an index page
linking to several sub-pages), fetch every linked page that contains
substantive content the user would want represented.

### 2. Extract signal, drop noise
Identify the load-bearing content: headline findings, key figures, and the
concrete action or takeaway tied to each. Cut:
- Navigational/meta content (indexes, "see also" links, provenance columns,
  X/verification marks, source URLs, table-of-contents scaffolding)
- Repetition and hedging
- Anything that only matters visually (tables, multi-column layouts, bold
  emphasis) — TTS engines read structure aloud badly or not at all

Keep the specific numbers and mechanisms; a script that generalizes them away
("some studies show exercise helps") is noise, not signal.

### 3. Write as spoken prose
- Full sentences, natural spoken cadence, no headers/bullets/tables/markdown
  syntax of any kind — a TTS engine reads `#`, `|`, `**` literally or chokes
  on them.
- Spell out or phrase numbers so they read naturally aloud ("three point
  seven percent" rather than relying on the raw digits/symbols to render
  correctly — use judgment; simple integers are fine as digits, but percents,
  decimals, and unit abbreviations often read better spelled out).
- Group related findings into flowing paragraphs by topic, with brief spoken
  transitions ("Next, ...", "On the topic of...", "Finally...") instead of
  section headers.
- End with a short, plain-language synthesis — the one thing to remember.

### 4. Enforce the character limit
Count characters on the finished draft before saving (e.g. `wc -c`). Cut
lower-priority material first — secondary examples, minor findings — rather
than compressing every sentence into unnatural fragments. Leaving meaningful
headroom under the limit is fine; going over is not.

### 5. Save to the destination
Create a new Google Doc (plain text or minimal HTML — no tables) in the
destination folder the user specified this run. Title it clearly, e.g.
`<Topic> — TTS Script`. Confirm back with the doc title, character count, and
link — no need to repeat the full script content in the chat reply.

## Output conventions
- Language: match the source/user's language unless told otherwise.
- Tone: plain, direct, easy to follow by ear — shorter sentences than you'd
  use in a written report.
- Never invent findings not present in the source; if the source itself
  contains unverified or speculative content, it's fine to include it, but
  don't add new claims during condensation.
