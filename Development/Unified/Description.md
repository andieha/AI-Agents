# Unified Suite — Description

Three independent products — **Brief**, **Mail**, **Invest** — share one set of
`Common/` agents (Preparation, Save-infolder, Speech-Converter, Logger, Clean,
Cache-Update) instead of each product duplicating its own copies, the way
Daily-Sprint15 and Hybrid-5 currently do. Research (Hybrid-5) is intentionally
NOT part of this suite — it stays a separate product with its own Control sheet.

Triggers: **Start Brief** / **Start Mail** / **Start Invest**. Each is independent
— run one, two, or all three on any given day. No confirmation needed for any of them.

## Google Drive Structure

The suite has its own numbered In / Work / Out tree under `500 Data`, matching the
pattern already used by Daily full / Analyze / Research:

```
500 Data (folder ID: 1XNEmHdIfyyRLZfflOVIitmif5auMmUxL)
└── Unified (folder ID: 1VSra0jdBzngkVCG_uZo8hzfG8DmtbYm4)
    ├── 📁 1 In    (folder ID: 1lX04qJXsxPSU16Rm1W1pjUVpB8MrPSXk)
    │   └── Unified Control  (spreadsheet ID: 1WPOBj3VlJMLr-x5lpDKlmO4X9GFIFXvPBMM_bX3TId8)
    ├── 📁 2 Work  (folder ID: 1C6-7RkbnDz17YQ_RUJt1FqD4H3LwVpui)
    │   └── Unified Execution Log  (Google Doc — created on first Logger run, then reused)
    └── 📁 3 Out   (folder ID: 1hKGLJa8cksuMGhHanSUh-VesOYLx_Pqo)
        └── 📁 Collection – [Month DD, YYYY]   (one per day, shared by all three products)
            ├── 🤖 AI News – [date]  /  🌍 Global News – [date]  /  🇸🇪 Swedish News – [date]
            ├── 📡 Field Monitor Digest – Week [N], [YEAR]
            ├── 📰 Daily Brief – [date]
            ├── 📊 Aggregated Report – [date]  (+ Narrated TTS)
            ├── 📋 Email Summary – [date]
            ├── 📨 Newsletter Digest – [date] (Expanded)
            └── Investment Signal – [desc] ([date])
```

**Important — this tree is intentionally separate from Daily-Sprint15's own
`Daily full / 3 Out`.** The two Collection-folder trees do not overlap; running
Daily-Sprint15 and the Unified suite on the same day produces two independent
Collection folders (one under each tree). This lets the suite be developed and
proven without touching Daily-Sprint15's live output.

### Deliberately shared with Daily-Sprint15 (NOT duplicated)

Anders has one Gmail inbox and one set of real contacts/cases — duplicating that
context under Unified's own `2 Work` would fork it into two diverging copies.
Mail and Invest therefore read/write these specific existing docs in
**Daily full / 2 Work** (folder ID `1FWKfAMO0oD4K8s4xzM3U0MD7pok3TTg3`) rather than
creating fresh ones:

- `Important` (file ID `1K83OcvWkjL9HLx5K9svgoeArTmEjPjMWnVZw0W7XAIY`)
- `Flightright Case File` (file ID `1YMWyDVHSmEuo1qDWFJzZalnMSoybebxQ4fGpoc7ANG8`)
- `Contacts` (file ID `1etlculH1YLMFnZ-vE8OIeWKn6VQfyezY204oJS3XoLQ`)
- `AI Robotics News Feed` and `AI Robotics Investment Analysis` (searched by name
  in the same `2 Work` folder)
- The email **Whitelist** in **Daily full / 1 In** (file ID
  `1_uLlUehxCpd8PTEJtJxtw1eQ906x5SYcktbPlrhSijE`)
- The Notion Cache ring buffer (`Admin → 🗃️ Cache`, data source ID
  `9b61968e-b3f5-4765-acde-f74ab98d109a`) — one account-wide activity cache,
  shared by every pipeline, not per-product

Everything else (the Control sheet, the Execution Log, the Collection folders)
is owned by Unified's own tree above.

## What each product does

**Brief** (`Brief/Orchestrator.md`) — ensures today's shared Collection folder,
then runs whichever of News / Field Monitor / Daily Brief are ON for today
(per the Control sheet) in parallel, then Clean, then Aggregated-Report merges
everything in the folder into one themed report, then Speech-Converter narrates
it, then Logger + Cache-Update.

**Mail** (`Mail/Orchestrator.md`) — ensures today's shared Collection folder,
then runs Email-Summary (classify inbox, research context, draft replies —
drafts only, never sent) and Newsletter-Digest (expand today's newsletter
emails into prose) in parallel, then Logger + Cache-Update.

**Invest** (`Invest/Orchestrator.md`) — ensures today's shared Collection folder,
then runs Investment-Signals (AI/robotics news → portfolio implications against
BOTZ/ROBO, NVDA/ASML/Samsung, ASTS/RKLB), then Logger + Cache-Update.

## Control sheet

`Unified Control` (spreadsheet ID `1WPOBj3VlJMLr-x5lpDKlmO4X9GFIFXvPBMM_bX3TId8`,
in `1 In`) is a copy of the original research Control sheet
(`1cDHR6lf_Xm2uj0td_bgccZ8wCadlTSkTMhKqi27EUb0`, untouched, still used by
Hybrid-5) plus a **PRODUCT** column and six new rows — one per collector, all
DAY=Daily, STATUS=ON:

| PRODUCT | PIPELINE | TASK |
|---|---|---|
| Brief | News | International News |
| Brief | FieldMonitor | Field Monitor Digest |
| Brief | Brief | Daily Intelligence Brief |
| Mail | Email | Email Summary |
| Mail | Newsletter | Newsletter Digest (Expand) |
| Invest | Signals | AI/Robotics Investment Signals |

Original Research/Longevity/News/YouTube/General rows are tagged with PRODUCT
(`Research` or blank) for readability only — Unified's Preparation ignores every
row whose PRODUCT doesn't match the product it was asked about. Edit FOCUS,
STATUS, or DAY on any row to change what runs and when, same as the original
Control sheet.

## Logging

`Common/Logger.md` writes to ONE running "Unified Execution Log" doc in `2 Work`
— created on its first run, then reused by file ID. Each day gets one heading;
each product that runs that day gets one section under it, overwritten if that
product reruns. This replaces the one-doc-per-day-per-pipeline pattern
Daily-Sprint15 and Hybrid-5 each use separately.

## Status

Shelved / newly built, not yet run end-to-end. See `PLAN.md` for the original
design rationale. No existing pipeline (Daily-Sprint15, Hybrid-5, Research-Sprint3)
is touched by this suite.
