---
name: research-brief-summarizer
description: >
  Turn a Google Drive folder of research briefs (or any source documents) into
  verified, cleanly-structured Notion summaries. Use this whenever the user points
  at a Drive folder and asks to summarize, extract findings, build a backlist, or
  create an action plan from its contents — especially longevity/health research,
  literature briefs, or any "read these documents and give me the key points"
  request. Trigger it even when the user doesn't say "skill": phrases like
  "summarize this folder", "what are the findings", "make a backlist from these
  docs", "only use these documents", "add a column with why", or "save this to
  Notion nicely" all apply. The skill's core value is a strict verify-before-you-
  attribute discipline plus a consistent, signal-not-noise Notion output format.
---

# Research Brief Summarizer

Convert a folder of source documents into Notion summaries where every "from the
documents" claim is actually backed by a document you retrieved and read — and
where your own additions are clearly separated from the source. This skill exists
because the easy failure mode is confabulation: producing plausible findings and
labelling them "from the documents" without having read them. Don't do that.

## The cardinal rule: verify before you attribute

Never mark, cite, or imply that content is "from the documents" unless you have
actually retrieved and read that specific document **in the current session**.

- If a retrieval tool returns empty output, that means you have NOT read the file —
  it does not mean the file is empty or that your memory of it is confirmed. Treat
  empty results as a tool failure to work around, never as verification.
- If you cannot retrieve a document, say so plainly and mark its findings as
  unverified. A smaller verified summary beats a complete-looking fabricated one.
- Distinguish three states explicitly: (a) verified from a document this session,
  (b) your own synthesis/commentary, (c) attributed earlier but not re-verified.
- When you catch yourself having over-claimed, correct it directly and move on —
  no spiralling. One clean correction, then continue.

## Workflow

### 1. Locate and list the folder
Get the folder ID from the user's link. List its contents and **exclude any files
the user asked to skip** (commonly TTS/audio files). Confirm the file set before
summarizing.

### 2. Retrieve the documents (with fallback)
Drive retrieval can be flaky. Try in this order and don't give up after one miss:
1. `google_drive_search` with `'<folderID>' in parents` and a `semantic_query`.
2. If that returns nothing, retry with a **workspace-wide `fullText contains`
   query** on distinctive terms from the topic (e.g. `fullText contains 'VO2' or
   fullText contains 'Mediterranean'`). This often surfaces documents the
   parent-filtered search misses. Note: when `api_query` uses `fullText`,
   `order_by` must be `relevance desc`.
3. Use `google_drive_fetch` with specific document IDs once you have them.
Keep going until you have actually read each document you intend to cite.

### 3. Extract findings — signal, not noise
For each document pull only the load-bearing claims: the headline finding, the key
figure, and the mechanism. Skip filler. Paraphrase faithfully (respect copyright —
short quotes only, under 15 words, one per source at most).

### 4. Produce the Notion output
Save to the section the user names (default: search for the right home, confirm the
location, match sibling formatting). All content in **English**. Concise, no
preamble. Use the standard table below.

**Standard findings table (use this exact shape):**

```
| Source | Key finding | Activity / Action |
| --- | --- | --- |
| <brief name> | <headline finding + key figure + mechanism> | <concrete next step> |
```

If the user wants provenance marks, add a **From docs** column: `X` = verified from
that document this session; blank = your addition. State the definition of `X`
above the table.

### 5. Separate verified from commentary
When the user asks (or whenever you've added framing), split the page into two
parts:
- **Part A — Exactly from the documents**: only verified findings.
- **Part B — My comments**: your prioritization, tiers, specific prescriptions
  (cadences/numbers), one-line synthesis, and any findings you could NOT re-verify
  (flag these explicitly as unconfirmed).

### 6. Phase large sets + index
If there are many documents, don't cram them into one wall. Split into logically
grouped pages (e.g. 4 + 4 + 2) and create a short **index page** with a table
linking each part and listing which sources it covers. Keep sibling pages
consistently formatted.

## Output conventions (defaults — adapt to the user's stated preferences)
- Language: English, always.
- Tone: concise, key signal only, no preamble or filler.
- Format: tables over prose for multi-item content; minimal bold/headers.
- Action focus: when the topic is "how to improve X", frame findings as activities
  to perform, not just facts.
- Always end by stating what was created/updated, its title, section, and URL.
- Never invent provider names, links, or figures. For "where to get this"-type
  columns, web-search real current providers rather than guessing URLs.

## Anti-patterns (things that went wrong before this skill existed)
- Marking every row `X` "from the documents" without having read them.
- Reading an empty tool result as confirmation.
- Over-correcting: flipping verified-correct content to something wrong out of
  misplaced doubt. Re-retrieve and check rather than guessing which past claim was
  the error.
- Building a single giant page when phased pages + an index read far better.
