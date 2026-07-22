# Plan: Unified suite — Brief + Mail + Invest on shared Common agents

Status: **built and fully live-tested — all three products (Invest, Mail, Brief) ran
end-to-end successfully on 2026-07-20**. This file is the durable copy of a plan first
drafted in a local plan-mode session (which does not survive container recycling);
committing it here keeps it available across sessions.

## Update — Control sheet cleanup (2026-07-20, continued)

The live-tested sheet carried 25 rows copied wholesale from Hybrid-5's own
Control sheet, kept "for readability." This backfired: two of those rows
(Monday News, Monday YouTube — both blank PRODUCT) looked like they should do
something but were orphans, matching no product's Preparation filter and never
wired to anything under Hybrid-5 either. Rather than leave 19 dead rows sitting
next to the 6 real ones, the sheet was rebuilt containing ONLY the 6 rows
Unified reads. New file ID: `1yx5HqhSihf-UCIp0WEgIw8_ecGa_I0xSEnLnW5vMjhg`
(replacing `1WPOBj3VlJMLr-x5lpDKlmO4X9GFIFXvPBMM_bX3TId8`, which cannot be
deleted automatically — no delete tool exists — and needs manual removal from
Drive). All three agent files referencing the old ID (`Common/Preparation.md`,
`Description.md`, this file) were updated to the new one.

## Update — full end-to-end validation (2026-07-20, continued)

After the Invest fix below, Mail and Brief were also run live for the first time:

- **Mail**: 21 real Gmail threads triaged (4 whitelist, 0 action needed, 0 drafts —
  all whitelist items were routine Flightright status updates); 3 newsletters matched
  the Digest/Brief subject filter and were expanded, with one correctly flagged as a
  content-free teaser rather than fabricated, per Newsletter-Digest's own rule.
- **Brief**: all three collectors (News, Field Monitor, Daily Brief) ran in parallel
  using live web research and real market data (via FMP), Clean found nothing stale,
  and — critically — **Aggregated-Report correctly picked up all 10 documents already
  in the shared Collection folder from Invest's and Mail's earlier runs that same
  day**, confirming the cross-product shared-folder design works regardless of run
  order. Speech-Converter produced an 8,078-character narration, under the 10,000
  limit with no trimming needed.
- Both products' Logger and Cache-Update steps correctly merged into the SAME Notion
  Cache row Invest had already written earlier, without clobbering Invest's or
  Daily-Sprint15's bullets, respecting the 5-bullet cap by trimming as new products
  added their own lines.

No bugs found beyond the append/update constraint already fixed. The suite is
considered validated; remaining follow-ups are the ones noted in Description.md
(Daily-Sprint15/Hybrid-5 likely have the same append-to-Doc gap, not yet fixed there).

## Update — live-test finding and fix (2026-07-20)

Running `Start Invest` end-to-end surfaced a real constraint: the Google Drive
toolset has no way to update or append to an existing Doc, only create new ones —
so every "append to a running doc" instruction ported from Daily-Sprint15/Hybrid-5
(Logger's Execution Log, Investment-Signals' News Feed/Analysis docs,
Email-Summary's `Important` log) was unexecutable as written. This is a
pre-existing gap in those source pipelines too, not something introduced here.

Fix applied to every Unified file: never mutate an existing Doc — always create a
new dated one, and read the last 7 days of history when continuity/dedup is
needed. This is the same pattern already proven for Collection folders and
Investment Signal documents. Concretely: Logger now creates
"Unified Log – [Product] – [date]" per run; Investment-Signals keeps its own
"AI Robotics News – [date]" / "AI Robotics Analysis – [date]" docs in Unified's
own `2 Work` (no longer shared with Daily-Sprint15's docs, since a shared
*written* history isn't possible without update support); Email-Summary still
reads Daily's `Important`/`Flightright Case File`/`Contacts` for context but no
longer tries to write to them. Notion's Cache ring buffer is unaffected — Notion
does support real in-place updates.

Daily-Sprint15 and Hybrid-5 were NOT touched by this fix — same latent gap likely
exists there, treated as a separate follow-up if/when raised.

## Context

Daily-Sprint15 (`Development/Daily full/`) and Hybrid-5 (`Development/Analyze/`)
duplicate infrastructure (two TTS converters, two loggers, same save/retry/fan-out
patterns) while bundling genuinely different products (intelligence brief, email
assistant, investment monitor) into one nightly run. Decision: build a **suite** —
three thin product orchestrators over one shared `Common/` agent folder, driven by
its own Control spreadsheet; research (Hybrid-5) stays a separate product;
Daily-Sprint15 and Hybrid-5 remain live in Execution until the suite is proven.
All files use the Hybrid agent-file format (`name / description / model / system /
tools / metadata`); content is ported from existing files (a merge, not a rewrite),
keeping every fix made in this repo's history (real Drive names `1 In`/`2 Work`/
`3 Out`, `parentId` query syntax, file-ID TTS input, rerun-safe folder reuse,
~10 min relaunch, daily-brief no-wait note).

## Drive footprint — ALREADY CREATED (2026-07-20)

Unlike the original draft (which proposed reusing Daily's Drive tree), the suite
now has its own dedicated tree under `500 Data` (`1XNEmHdIfyyRLZfflOVIitmif5auMmUxL`),
alongside the existing `Daily full`, `Analyze`, and `Research` trees:

```
500 Data (1XNEmHdIfyyRLZfflOVIitmif5auMmUxL)
└── Unified (1VSra0jdBzngkVCG_uZo8hzfG8DmtbYm4)
    ├── 1 In    (1lX04qJXsxPSU16Rm1W1pjUVpB8MrPSXk)  — control sheet lives here
    ├── 2 Work  (1C6-7RkbnDz17YQ_RUJt1FqD4H3LwVpui)  — memory docs + Execution Log (to be created on first run)
    └── 3 Out   (1hKGLJa8cksuMGhHanSUh-VesOYLx_Pqo)  — Collection folders (to be created per run)
```

**Unified Control** sheet — created in `1 In`:
`https://docs.google.com/spreadsheets/d/1yx5HqhSihf-UCIp0WEgIw8_ecGa_I0xSEnLnW5vMjhg/edit`
(file ID `1yx5HqhSihf-UCIp0WEgIw8_ecGa_I0xSEnLnW5vMjhg`)

Content: ONLY the six rows Unified's Preparation actually reads, one per
collector, all DAY=Daily, STATUS=ON (an earlier version copied all 25 rows from
Hybrid-5's own Control sheet with a PRODUCT column added — cleaned up on
2026-07-20, see below, since none of those 25 rows were ever read by Unified):

| PRODUCT | PIPELINE | TASK |
|---|---|---|
| Brief | News | International News |
| Brief | FieldMonitor | Field Monitor Digest |
| Brief | Brief | Daily Intelligence Brief |
| Mail | Email | Email Summary |
| Mail | Newsletter | Newsletter Digest (Expand) |
| Invest | Signals | AI/Robotics Investment Signals |

FOCUS on each new row is marked `(default)` and holds the collector's built-in
default scope — edit in place to override without touching agent files.

## Remaining work: agent-file folder layout — `Development/Unified/`

```
Description.md            suite overview, triggers, Drive tree, Control-sheet spec
Common/
  Preparation.md          reads Unified Control sheet (1yx5HqhSihf-UCIp0WEgIw8_ecGa_I0xSEnLnW5vMjhg);
                          input: PRODUCT name; returns that product's rows for today
                          (STATUS=ON, DAY matches; DAY=Daily means every day)
  Save-infolder.md        generalized: report text + title + target folder ID
  Speech-Converter.md     ONE TTS agent (merges Hybrid Speech-Converter + Sprint15
                          tts-convert): input = Google Doc file ID passed by caller,
                          10,000-char limit with Sprint15 trim priority
  Logger.md               ONE logger writing to ONE running "Execution Log" doc in
                          2 Work (1C6-7RkbnDz17YQ_RUJt1FqD4H3LwVpui) — created on
                          first run, then a fixed file ID: today's date heading at
                          the top, one section per product, overwrite that
                          product's section on rerun
  Clean.md                flag Collection folders in 3 Out (1hKGLJa8cksuMGhHanSUh-VesOYLx_Pqo)
                          older than 30 days (from Sprint15)
  Cache-Update.md         Notion ring buffer; reads today's sections in the
                          Execution Log doc so the last product to run writes the
                          complete day summary
Brief/
  Orchestrator.md         trigger "Start Brief": Preparation(Brief) → ensure today's
                          Collection folder in 3 Out (rerun-safe search-or-create;
                          shared across products) → parallel collectors → Clean →
                          Aggregated-Report → Speech-Converter → Logger → Cache-Update
  News-Collector.md  Field-Monitor.md  Daily-Brief.md  Aggregated-Report.md
Mail/
  Orchestrator.md         trigger "Start Mail": Preparation(Mail) → Email-Summary +
                          Newsletter-Digest (parallel) → Logger → Cache-Update
  Email-Summary.md  Newsletter-Digest.md
Invest/
  Orchestrator.md         trigger "Start Invest": Preparation(Invest) →
                          Investment-Signals → Logger → Cache-Update
  Investment-Signals.md
```

Cross-product touch points (to document in Description.md):
- All products write into the SAME dated Collection folder in `3 Out` — the
  rerun-safe search-or-create makes this safe in any run order.
- Daily-Brief reads Invest's memory docs in `2 Work` without waiting (Sprint15
  semantics — investment-signals may not have run yet this session).
- Brief's Aggregated-Report covers whatever is in today's Collection folder at its
  run time; research reports are mentioned by title only (separate narrations per
  topic, unchanged from Hybrid-5).
- Collector agents: `model: claude-sonnet-5`.

## Delivery (when resumed)

1. Branch: `git checkout -b unified-suite main` — main stays clean until review.
2. Build the folder layout above on `unified-suite`, reusing existing agent content.
3. Push with retry/backoff.
4. No changes to existing pipeline folders; no Execution promotion; merge to main
   only when approved.

## Verification (when resumed)

- Grep `Development/Unified/` (excluding this PLAN.md) for stale names — only
  intentional warning lines may match.
- Confirm exactly one Speech-Converter and one Logger exist (in `Common/` only).
- Spot-check every Drive/Notion ID above against live values with read-only
  `get_file_metadata` (all four Drive IDs above were created and verified live on
  2026-07-20; the Control sheet content was read back and confirmed byte-correct).
- Read back `Unified Control`: original 25 rows intact with PRODUCT column, six
  collector rows present, file ID matches what Preparation.md and the three
  Orchestrators reference.
- Optional live smoke test only if asked (e.g. run **Start Invest** end to end).

## Update — Investment-Signals dedup rule fixed to catch confidence upgrades (2026-07-22)

Orchestrator-v2's first real scheduled run (2026-07-22) surfaced a real gap in
`Invest/Investment-Signals.md`'s Agent 3 dedup rule: it excluded any ticker +
recommendation combination already logged in the last 7 days, with no
awareness of confidence level. That day's Analysis doc independently found
three genuinely new, concrete catalysts — ASML (Citi price-target hike + DZ
Bank upgrade), Samsung (Tesla AI5/AI6 foundry capacity expansion, on top of
the prior day's HBM4 news), and Rocket Lab ($266M US Air Force suborbital
contract) — each raising that ticker's confidence tier (Medium → Medium-High
or High) while leaving the recommendation itself unchanged (still Consider
Buy). Because only the ticker+recommendation pair was checked, all three were
silently dropped from generating a standalone Investment Signal document,
even though each was independently reasoned through in the Analysis doc.

Manually created the 3 missing Investment Signal docs for 2026-07-22 using
the Analysis doc's own reasoning, and fixed the rule itself: Agent 3 now
tracks the highest confidence tier previously logged per ticker+recommendation
pair, and only excludes a repeat if today's tier is no higher than that.
A confidence upgrade on an unchanged recommendation is now treated as a new,
signal-worthy event, with its own Signal Type ("Confidence Upgrade") and
title convention. Applied in Development only, per this repo's Development-
only editing convention — promote to Execution once validated on a future
run.
