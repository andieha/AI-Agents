# Aggregated Report (TTS)

Source: https://app.notion.com/p/37ee3c20a8ee812980baf250a59b4528

## Overview

Type **Create Aggregated Report** (optionally followed by a date, e.g. "Create Aggregated Report for June 13") to merge all of today's Daily Brief reports into a single, clean, TTS-ready summary, save it to Notion, and output the full text in the chat for copy/paste into a text-to-speech tool.

---

## Step 1 — Find Source Reports

In the AI Reports section (parent ID: `377e3c20-a8ee-8141-baaf-d8a52d4d2c50`), find all Daily Brief pages whose title date matches the target date (default: today). Include all matching pages as source material.

Also find any "Investment Signal" pages in the same AI Reports section for the target date and include them as additional source material.

If no Daily Brief pages exist for the target date, say so and stop.

---

## Step 2 — Aggregate and Clean

Merge the content of all matching source reports into one unified report:

**Structure:**
- Group content by theme (Markets & Economy, AI & Technology, Geopolitics, Personal Items / Action Points, Investment Signals, Top Priorities).
- Investment Signal pages go into a dedicated "Investment Signals" section — describe in prose: ticker (including exchange/currency), recommendation, confidence, brief reasoning. Always state explicitly whether the recommendation is to buy or sell, and name the exchange (e.g. "a recommendation to buy, or add to, VVSM on Xetra").
- Deduplicate repeated stories — merge into a single paragraph using the most complete version.
- Preserve all distinct facts, figures, names, and action items.

**TTS-friendly formatting (strict):**
- Plain prose only. No markdown symbols: no `#`, `##`, `*`, `**`, `-`, `_`, emoji, or bullet points.
- Section headers are plain text on their own line (e.g. "Markets and Economy").
- Write numbers, currency, and percentages in a TTS-friendly way.
- No tables, no code blocks, no links.
- Each section: 1 to 4 paragraphs, full sentences.
- End with a "Top Priorities for Today" section in plain prose.

---

## Step 3 — Save to Notion

Create a new page titled `📊 Aggregated Report – [Month DD, YYYY]` under AI Reports (parent ID: `377e3c20-a8ee-8141-baaf-d8a52d4d2c50`). No confirmation needed.

---

## Step 4 — Output for TTS

Output the full plain-text report in the chat in a single response — no preamble, no commentary, no markdown. Ready to copy straight into a text-to-speech tool. Do not summarize or truncate.

---

## Trigger Commands

> Create Aggregated Report
> Create Aggregated Report for [date]
> Fetch the aggregated report for TTS

The last variant skips Steps 1–3 if a matching Aggregated Report page already exists, and goes straight to outputting its plain-text content.
