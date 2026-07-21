---
name: gdocs-research-brief-formatter
description: Formats a raw AI-pipeline "Research Brief" Google Doc into a polished, reader-friendly Google Doc — title, italic scope line, a "Key Findings" table (Theme / Finding / Activity to perform), numbered "Detail" sections, a numbered "Sources" list, and a footer citing the source doc. Use this whenever Andie asks to "format", "make nice", "polish", or "create a formatted Google Doc" from one or more research briefs, longevity reports, or similar Drive-generated research documents — especially when he points at an existing formatted doc as the style template, or says "do the same for the others" after one has already been approved.
---

# Research Brief → Formatted Google Doc

Converts a raw pipeline-generated research brief (dense sourced findings + numbered
citations) into a polished Google Doc matching Andie's established template style.

## When to use

- Andie shares/links a Drive folder of research briefs and asks for "nice", "formatted",
  or "polished" versions.
- He references an existing doc (e.g. "Longevity — Research Summaries") as "the format"
  to copy.
- Follow-up requests like "do the rest" / "same for the other 9" after one doc has been
  approved.

## Workflow

1. **Find the style template** (skip if already known from context). If Andie points at
   an example doc, fetch it to confirm structure. Otherwise the canonical shape below is
   sufficient — don't block on finding one.
2. **Read the source brief** (Google Doc) — extract the topic, the numbered findings, and
   the numbered source list at the bottom.
3. **Draft the formatted doc in Markdown** (Google Drive's `create_file` with
   `contentMimeType: text/markdown` auto-converts this to a native Google Doc):
   - `# **[Topic] — Research Brief**`
   - Italic one-line scope note: what this is, the source doc's name, and a
     domain-appropriate disclaimer (e.g. "Decision-support from personal research notes —
     not medical advice" for health topics; adapt or drop for other domains).
   - `## **Key Findings**` — a markdown table, columns `Theme | Finding | Activity to
     perform`. One row per major finding: the finding condensed to one sentence, the
     activity a concrete, actionable instruction.
   - `## **Detail**` — one `### N. <subsection title>` per finding theme, a short
     paragraph (2–4 sentences) expanding on it, preserving citation-worthy facts from the
     source brief.
   - `## **Sources**` — renumbered list `[n] Title — URL`, carried over from the source
     brief. Don't drop any sources.
   - Closing italic line: `*Source: [original brief title], Google Drive folder: [folder
     URL]*`
4. **Create the file**: `Google Drive:create_file` with `contentMimeType: text/markdown`,
   `parentId` = the folder holding the existing "nice" template docs (ask Andie once per
   project if unknown; reuse it for the rest of the batch), `title`: `[Topic] — Research
   Brief (Formatted)`.
5. **Verify**: `google_drive_fetch` the new doc's ID to confirm content actually landed.
   An unexpectedly tiny `fileSize` in the create response (e.g. `"1"`) signals the
   markdown→Doc conversion silently failed — recreate rather than reporting success.
6. **Gate the first one**: on the first doc in a batch, create just that one, share the
   link, and wait for explicit approval before doing the rest. Once approved, work
   through the remaining source briefs without re-asking per file — still create them one
   at a time, but report the batch as done at the end rather than after each file.

## Notes

- Keep prose tight — condense and rewrite, don't copy paragraphs verbatim from the source
  brief.
- Preserve every distinct citation number/URL from the source.
- Match table column names and section headers to the approved template if one exists in
  the same Drive area — small stylistic drift between docs in the same collection stands
  out.
