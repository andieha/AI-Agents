# Fortune Finder Orchestrator

**Trigger:** Type **Run Fortune Finder**. No confirmation needed.

Runs the weekly Fortune Finder pipeline: research → critical review → buy list,
strictly in sequence — the Critic reviews the report the Finder just produced, and
the Buy List distills the review the Critic just saved, so no step may start before
the previous one's output is confirmed saved.

## Google Drive structure

```
Rich (folder ID: 1T-BsdQHfAK_8_FDDkIXQTaw7C0Yjltyc)
├── 📁 1 In    (folder ID: 1fB_n4qamTfAowmyWfRlGJHuudQQif-e6)
│   ├── Whitelist – Focus Areas       (file ID: 1mGzs1jAouJ4Bi1EkDpKfRDnVDbFIAB-qqGVTS-FV2X8)
│   ├── Whitelist – Where to Purchase (file ID: 1SgQcXoqGp0I9V4yUmwqysBRo94U2KLO-4uA3cH-VV00)
│   └── Whitelist – Review Sources    (file ID: 1OfAwsbixNNgNFndzv90HNWck1heh9vYHB5IOVLQnaqY)
├── 📁 2 Work  (folder ID: 1PgpEOXbBkoqdKZJweBJwJ1WwQzYRSxp-)
│   └── 📈 Thesis Tracker             (file ID: 16UQluI9FiQBUbcFF2b0jSb9gtnPgFoKmNXSZ9ZsG7F8)
└── 📁 3 Out   (folder ID: 1xmfNsHdNUzx4KsEgPZgAd5hhV0S36k6w)
    ├── 💰 Fortune Finder – Week [N] [YYYY]               (Step 1 output)
    ├── 🔎 Recommendations after Review – Week [N] [YYYY] (Step 2 output)
    └── 🛒 Buy List – Week [N] [YYYY]                     (Step 3 output)
```

All sub-agent paths below are relative to the folder containing this file. Before
executing each step, read its file first, then execute it.

## Step 0 — Preparation

- Determine the current ISO week number and year — both outputs use it in their titles.
- Verify the three Whitelists and the Thesis Tracker are readable. If a Whitelist is
  missing, stop and report — the agents must not run on baked-in defaults alone.
  If only the Thesis Tracker is missing, note it; Step 1 recreates it.

## Step 1 — Fortune Finder (research)

- Read `fortune-finder-agent.md` and execute it in full.
- Confirm its report was saved to `3 Out` with the title
  `💰 Fortune Finder – Week [N] [YYYY]` and note that document's file ID.
- Confirm the Thesis Tracker in `2 Work` was updated (new/updated cards, scoreboard).
- **Do not proceed to Step 2 until the report document is confirmed saved.**

## Step 2 — Critic (review) — after Step 1 completes

- Read `fortune-finder-critic-agent.md` and execute it in full, pointing it at the
  report file ID produced in Step 1 (not just "the latest file" — if Step 1 just ran,
  its output is the review target).
- Confirm its review was saved to `3 Out` as
  `🔎 Recommendations after Review – Week [N] [YYYY]`.
- Confirm the Thesis Tracker was updated with verdicts, checked falsifiers, and kills.

## Step 3 — Buy List — after Step 2 completes

- Read `fortune-finder-buylist-agent.md` and execute it in full, pointing it at the
  review file ID produced in Step 2.
- Confirm the list was saved to `3 Out` as `🛒 Buy List – Week [N] [YYYY]`.
- The Buy List only distills the review — if Step 2 failed, skip this step entirely
  rather than building a list from a stale review.

## Step 4 — Wrap-up

Report a short summary to the user (or session log when scheduled):

- Links to all three documents in `3 Out` (report, review, buy list).
- The scoreboard line and this week's Lesson from the Thesis Tracker.
- The concentration status (the shared-kill-scenario warning if it still applies).
- Counts: how many recommendations passed / were downgraded / failed review, and how
  many made the BUY NOW vs. WATCH sections of the Buy List.

## Notes

- Strictly sequential — never run the Critic in parallel with the Finder.
- 5xx / transient tool error → wait 10s, retry up to 3×, then continue with what's
  available and state the gap in the output (e.g. "13F not available this run") —
  never fabricate the missing data.
- If Step 1 fails entirely, do not run Step 2 against last week's report — stop and
  report the failure instead.
- Both agents' hard rules travel with them regardless of invocation: research only,
  no promised returns, no position sizing, no fabricated sources or purchase links.
- This pipeline is in Development. When promoted, the Execution copy is a straight
  copy of these files, done as its own deliberate step per `CLAUDE.md`.
