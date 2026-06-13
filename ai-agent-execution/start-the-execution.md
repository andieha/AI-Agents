# Start the Execution

Source: https://app.notion.com/p/37ee3c20a8ee81cda6b8c7c1b0574304

## Overview

Type **Start the Execution** to run every prompt document inside the Collection of prompts folder, in a single end-to-end pipeline. No confirmation needed at any step.

---

## How It Works

1. Fetch the Collection of prompts folder and list all of its child pages.
2. Execute those child pages as steps, in this priority order:
   - Any page whose title contains "Collecting" or "Collect" runs first (in parallel with each other if multiple).
   - Any page whose title contains "Clean" runs next, after the collection step completes.
   - Pages whose titles contain "Sub-Agent", "Whitelist", or other supporting/helper terms run as part of or alongside the collection/cleanup steps that reference them.
   - Any page whose title contains "Aggregated" or "TTS" runs **last, always**.
3. If new prompt pages are added to the Collection of prompts folder later, they are automatically included according to the same ordering rules.

---

## Step Details

### Collection step(s) — run first
Execute all "Collecting"/"Collect" prompts in parallel. These produce the day's news, field monitor digest, email summary, and daily intelligence brief.

### Cleanup step(s) — run second
Execute all "Clean" prompts after collection completes. Apply retention rules and archive excess pages across all report sections.

### Aggregation / TTS step — always last
Execute the "Aggregated Report (TTS)" prompt targeting today's date. This:
1. Finds all of today's Daily Brief, AI News, Global News, and Swedish News pages.
2. Merges and deduplicates them into one clean, TTS-friendly summary (plain prose, no markdown, no symbols).
3. Saves it as `📊 Aggregated Report – [Month DD, YYYY]` under AI Reports.
4. Outputs the full plain-text report directly in the chat, ready to copy into a text-to-speech tool.

### Execution Log step — always after Aggregation/TTS
Add one entry to the Execution Log database for this run:
- **Run** (title): [Month DD, YYYY]
- **Date**: today's date
- **Content**: short bulleted summary — what was collected/created, anything skipped and why, Email Whitelist Monitor result, Clean All results (counts moved), Investment Signal headline (ticker, buy/sell, exchange) if any, notable issues.

If an Execution Log entry for today already exists, update it rather than creating a duplicate.

---

## Notes

- If collection produces multiple Daily Brief pages for today, include all of them as source material for the aggregation step.
- If any step fails, report which step failed but continue with remaining steps where possible.
- Email body content stays untranslated; all summaries, headers, and footers must be in English.

---

## Trigger Command

> Start the Execution
