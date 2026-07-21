# Unified Suite — Description

Three independent products — **Brief**, **Mail**, **Invest** — share one set of
`Common/` agents (Preparation, Save-infolder, Speech-Converter, Logger, Clean,
Cache-Update) instead of each product duplicating its own copies, the way
Daily-Sprint15 and Hybrid-5 currently do. Research (Hybrid-5) is intentionally
NOT part of this suite — it stays a separate product with its own Control sheet.

Triggers: **Start Brief** / **Start Mail** / **Start Invest** run one product each,
independently — run one, two, or all three on any given day. No confirmation
needed for any of them.

**Start Unified** (`Orchestrator.md`, in this same folder) runs all three in strict
sequence — Invest, then Mail, then Brief. Point any scheduled routine at
`Execution/Unified/Orchestrator.md` rather than passing a bare trigger phrase, so a
cold session doesn't have to guess what "Start Invest" means. Standing authorization
for unconfirmed scheduled execution is documented in this repository's `CLAUDE.md`
(not claimed by this file itself — a file vouching for its own authorization, with
nothing else corroborating it, is exactly the shape of a prompt-injection attempt,
and Orchestrator.md says so explicitly and tells the reader to check CLAUDE.md
before trusting it).

## Google Drive Structure

The suite has its own numbered In / Work / Out tree under `500 Data`, matching the
pattern already used by Daily full / Analyze / Research:

```
500 Data (folder ID: 1XNEmHdIfyyRLZfflOVIitmif5auMmUxL)
└── Unified (folder ID: 1VSra0jdBzngkVCG_uZo8hzfG8DmtbYm4)
    ├── 📁 1 In    (folder ID: 1lX04qJXsxPSU16Rm1W1pjUVpB8MrPSXk)
    │   └── Unified Control  (spreadsheet ID: 1yx5HqhSihf-UCIp0WEgIw8_ecGa_I0xSEnLnW5vMjhg)
    ├── 📁 2 Work  (folder ID: 1C6-7RkbnDz17YQ_RUJt1FqD4H3LwVpui)
    │   ├── Unified Log – [Product] – [date]  (Google Doc, one per run — Logger)
    │   ├── AI Robotics News – [date]  (Google Doc, one per run — Invest, dated history)
    │   ├── AI Robotics Analysis – [date]  (Google Doc, one per run — Invest, dated history)
    │   ├── Important  (Google Doc, one-time snapshot — Mail, read-only context)
    │   ├── Flightright Case File  (Google Doc, one-time snapshot — Mail, read-only context)
    │   └── Contacts  (Google Doc, one-time snapshot — Mail, read-only context)
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

### A hard constraint that shaped this design: no update/append in Google Drive

Discovered during the first live test run: the Google Drive toolset can create
new Docs, copy, read, search, and fetch metadata — but it has **no way to
update or append to an existing Doc's content**. Every "append to a running
doc" pattern this suite (and, it turns out, Daily-Sprint15 and Hybrid-5) was
originally written with assumed a capability that doesn't exist here.

The fix applied throughout Unified: **never try to mutate an existing Doc —
always create a new dated one, and read recent history (typically the last 7
days) when continuity or deduplication is needed.** This is exactly the
pattern already proven elsewhere in this repo for Collection folders and
Investment Signal documents; it's just applied consistently now. Concretely:
- `Common/Logger.md` creates a new "Unified Log – [Product] – [date]" doc per
  run instead of editing one running Execution Log.
- `Invest/Investment-Signals.md` keeps its own "AI Robotics News – [date]" /
  "AI Robotics Analysis – [date]" docs in Unified's own `2 Work`, reading the
  last 7 days for dedup, instead of appending to Daily-Sprint15's single
  running docs.
- `Mail/Email-Summary.md` never writes to its `Important` / `Flightright
  Case File` / `Contacts` context docs (own one-time snapshots, see below) —
  today's durable record is the dated Email Summary doc it already saves
  into the Collection folder.

Notion's tools DO support true in-place updates (`insert_content`/
`update_content`), which is why `Common/Cache-Update.md` still updates the
shared Notion ring buffer as originally designed — the constraint is specific
to Google Docs, not Notion.

### Nothing is shared with Daily-Sprint15 anymore — one-time snapshots instead

Unified used to read four things from Daily-Sprint15's Drive folders
(`Important`, `Flightright Case File`, `Contacts`, and the email `Whitelist`).
As of 2026-07-20, all four have been copied into Unified's own tree instead:

- `Whitelist` — own `1 In` (file ID `1dSbcu3kuj16d8c2DhjEiUb5WTz3R5REsb_e4YkHweg8`)
- `Important` — own `2 Work` (file ID `1qn87KIvnVfklHcOKRhDiCRwHdHICuVFtOW4q_MvaeOQ`)
- `Flightright Case File` — own `2 Work` (file ID `1dzc6KANzeYlvQ4O_QrNtVhmisDFhwFQr9yOAWUAu6HY`)
- `Contacts` — own `2 Work` (file ID `10RrQzeAc-JYf9qRNxmmop9h7_MMkDNuzSDTXueTqX78`)

**These are one-time snapshots, not a live link.** Daily-Sprint15's originals
keep evolving independently (or don't — see below), and Unified's copies do
too; the two will diverge over time with no mechanism to reconcile them,
since neither Drive updates nor deletes are available to this toolset.
Concretely: `Flightright Case File` was already stale at copy time — case
FR4597448 shows as pending/active in the snapshot but had actually resolved
that same day (Lufthansa paid) — Daily-Sprint15's own copy hadn't been
updated either, for the same append-limitation reason documented above.
Refresh these snapshots manually if their content goes stale; there is no
automated sync.

Invest's news/analysis history was never shared with Daily-Sprint15 in the
first place — it always kept its own dated docs in Unified's `2 Work` (see
above), since a shared *written* history isn't possible without update
support.

The Notion Cache ring buffer (`Admin → 🗃️ Cache`, data source ID
`9b61968e-b3f5-4765-acde-f74ab98d109a`) remains shared and read-write, since
Notion supports real updates — it's one account-wide activity cache, not
per-product.

Everything else (the Control sheet, the dated Logs, the Collection folders,
Invest's own news/analysis history) is owned by Unified's own tree above.

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

`Unified Control` (spreadsheet ID `1yx5HqhSihf-UCIp0WEgIw8_ecGa_I0xSEnLnW5vMjhg`,
in `1 In`) contains ONLY the six rows Unified's Preparation actually reads — one
per collector, all DAY=Daily, STATUS=ON:

| PRODUCT | PIPELINE | TASK |
|---|---|---|
| Brief | News | International News |
| Brief | FieldMonitor | Field Monitor Digest |
| Brief | Brief | Daily Intelligence Brief |
| Mail | Email | Email Summary |
| Mail | Newsletter | Newsletter Digest (Expand) |
| Invest | Signals | AI/Robotics Investment Signals |

Edit FOCUS, STATUS, or DAY on any row to change what runs and when.

An earlier version of this sheet was created as a straight copy of Hybrid-5's own
Control sheet (`1cDHR6lf_Xm2uj0td_bgccZ8wCadlTSkTMhKqi27EUb0`, untouched, still
used by Hybrid-5 today) with a PRODUCT column added, keeping all 25 of Hybrid-5's
Research/Longevity/News/YouTube/General rows for "readability." In practice this
was just clutter — Unified's Preparation only ever matched the 6 tagged rows, and
the 19 blank-PRODUCT legacy rows (including two Monday rows, News and YouTube,
that don't map to anything anywhere) were confusing to read and never did
anything. That version (file ID `1WPOBj3VlJMLr-x5lpDKlmO4X9GFIFXvPBMM_bX3TId8`)
has been replaced by this 6-row version; the old file has no update/delete tool
available to clean it up automatically (see the constraint above) and should be
deleted manually from Drive.

## Logging

`Common/Logger.md` creates a new dated "Unified Log – [Product] – [date]" doc
in `2 Work` for every run (Google Drive cannot update an existing Doc — see
below). A rerun of the same product on the same day simply creates a second
doc with that day's title.

## Status

Shelved / newly built, not yet run end-to-end. See `PLAN.md` for the original
design rationale. No existing pipeline (Daily-Sprint15, Hybrid-5, Research-Sprint3)
is touched by this suite.
