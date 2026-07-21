# Aggregated Report (TTS)

**Trigger:** Called by `start.md` as Step 3 (always last). Optionally: `Create Aggregated Report for [date]`.

Variants:
- `Create Aggregated Report`
- `Create Aggregated Report for [date]`
- `Fetch the aggregated report for TTS` (skips Steps 1–3 if matching document already exists in today's Collection folder)

## Step 1 — Find Source Reports

Search for today's Collection folder under Reports15 (Google Drive, folder ID: `1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_`): look for a folder titled `📁 Collection – [target date]`. If it doesn't exist, say so and stop.

Inside the Collection folder, find: all Daily Brief documents, all Investment Signal documents, and any other dated documents for the target date.

## Step 2 — Aggregate and Clean

Write a 3–5 sentence **Executive Summary** covering the day's most important developments. This goes at the very top of the report, before all themed sections.

Merge all matching reports. Group by theme:
- Markets & Economy
- AI & Technology
- Geopolitics
- Personal Items & Action Points
- Investment Signals
- News Highlights
- Top Priorities

Deduplicate. Preserve all distinct facts.

Investment Signals section: plain prose — ticker (with exchange/currency), recommendation, confidence, brief reasoning. Always state buy/sell direction and exchange name explicitly.

TTS-friendly: plain prose only. No markdown (#, *, -, _), no emoji, no bullets. Section headers as plain text on their own line. Flowing paragraphs. End with "Top Priorities for Today".

## Step 3 — Save to Google Drive

Save as a Google Doc titled `📊 Aggregated Report – [Month DD, YYYY]` **inside today's Collection folder** (not directly under Reports15).

## Step 4 — Output for TTS

Output full plain-text report in chat — no preamble, no commentary, no markdown. Complete, not truncated.
