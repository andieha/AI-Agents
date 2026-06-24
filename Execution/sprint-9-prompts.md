# Sprint 9 – AI Agent Execution Prompts

Based on Sprint 8. Key changes: all report outputs are saved to **Reports15 (Google Drive)** inside the **100 AI Agents** folder. Reports15 folder ID: `1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_` (https://drive.google.com/drive/folders/1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_). **Execution Log** and **AI Agents Memory** have moved to **Google Drive** under the **100 AI Agents** folder (https://drive.google.com/drive/folders/1AAGGDZsJLGBLv3MgmOSMiJBkCthIwTId) — they are no longer in Notion.

---

## Structure per run

```
100 AI Agents (Google Drive, folder ID: 1AAGGDZsJLGBLv3MgmOSMiJBkCthIwTId)
├── 📁 Execution Log  (folder ID: 1fcIrmGBV1vO-KiD3vZDFZEx4N_grS80D)
├── 📁 AI Agents Memory  (folder ID: 1TVTUon1jtQDNkH7OiANUvsTe015MNfec)
└── 📁 Reports15  (folder ID: 1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_)
    └── 📁 Collection – [Month DD, YYYY]  ← Drive folder created first, everything else goes inside
        ├── 🤖 AI News – [date]             (Google Doc)
        ├── 🌍 Global News – [date]          (Google Doc)
        ├── 🇸🇪 Swedish News – [date]        (Google Doc)
        ├── 📡 Field Monitor Digest – Week [N], [YEAR]  (Google Doc)
        ├── 📋 Email Summary – [date]        (Google Doc)
        ├── 📰 Daily Brief – [date]          (Google Doc)
        ├── 📨 Newsletter Digest – [date] (Expanded)  (Google Doc)
        ├── Investment Signal – [desc] ([date])        (Google Doc)
        └── 📊 Aggregated Report – [date]    (Google Doc)
```

---

## 1. Start the Execution

**Trigger:** Type **Start the Execution**. No confirmation needed.

**Before Step 1 — Create Collection folder**
Create a folder titled `📁 Collection – [Month DD, YYYY]` inside Reports15 (Google Drive, folder ID: `1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_`). This is the parent for all documents created in this run. Note the Collection Drive folder ID — all agents in Step 1 must save inside it.

**Step 1 — Collect (parallel)** — pass the Collection Drive folder ID to each agent:
- Start Collecting All
- Collecting - AI/Robotics Investment Signals
- Collecting - Newsletter Digest (Expand)

**Step 2 — Clean** (after Step 1 completes)
- Clean All

**Step 3 — Aggregate** (always last)
- Aggregated Report (TTS) — save inside today's Collection folder in Google Drive

**Step 4 — Log**
Add one entry to **Execution Log** (**Google Drive — 100 AI Agents / Execution Log**, folder ID: `1fcIrmGBV1vO-KiD3vZDFZEx4N_grS80D`) for today (title: Month DD, YYYY; short bullet summary). Overwrite if today's entry already exists.

**Notes**
- 5xx error → wait 10s, retry up to 3×, then skip and continue
- If a step fails, continue — still run Aggregated Report (TTS) last
- If a collection agent hasn't reported back after ~3 min, re-launch it
- Email body stays untranslated; all summaries in English

---

## 2. Start Collecting All

**Trigger:** Type **Start Collecting All** — runs 4 tasks in parallel. Requires the Collection Drive folder ID from the caller.

All documents below are created as Google Docs inside the Collection folder for today's run.

### Start Collecting News
Run 3 tasks in parallel. For each:
- Create one dated Google Doc **inside the Collection folder** (parent = Collection Drive folder ID).
- Title: [emoji] [Topic] – [Month DD, YYYY]. 5 stories (title + 2–3 sentence summary + source), English, last 24h prioritized. Footer: "Collected automatically by Claude on [date]".
- Emojis: 🤖 AI News, 🌍 Global News, 🇸🇪 Swedish News.

### Start Collecting Field Monitor
7-day analysis on "AI Agents & Tool Use". 4+ web searches, themed clusters, "So What" + "Who to Follow" sections.
- Create a Google Doc **inside the Collection folder**.
- Title: Digest — AI Agents & Tool Use — Week [N], [YEAR]. All content in English.

### Start Collecting Email
Fetch today's Gmail (filter out sent/unsubscribe). Extract sender, subject, time, 2–3 sentence summary per email. All text in English. Gmail 5xx → wait 10s, retry 3×, then skip and report.
- Create a Google Doc **inside the Collection folder**.
- Title: 📋 Email Summary – [Month DD, YYYY].

### Daily Intelligence Brief
48-hour sweep: Markets & Investments (2–3 items), AI & Technology (2–3 items), Strategic Signals (1–2 items), Today's Top 3. Each item: short paragraph + "Why this matters" + 5-year lens + action signal. Tone: sharp, direct.
- Create a Google Doc **inside the Collection folder**.
- Title: 📰 Daily Brief – [Month DD, YYYY].
- See Daily Intelligence Brief — Sub-Agent Prompt for full sub-agent logic.

---

## 3. Clean All

**Trigger:** Type **Clean All** — cleans Collection folders under Reports15 (Google Drive). No confirmation needed.

_(placeholder)_

---

## 4. Aggregated Report (TTS)

**Trigger:** Type **Create Aggregated Report** (optionally with a date).

**Step 1 — Find Source Reports**
Search for today's Collection folder under Reports15 (Google Drive, folder ID: `1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_`): look for a folder titled "📁 Collection – [target date]". If it doesn't exist, say so and stop.
Inside the Collection folder, find: all Daily Brief documents, all Investment Signal documents, and any other dated documents for the target date.

**Step 2 — Aggregate and Clean**
Merge all matching reports. Group by theme: Markets & Economy / AI & Technology / Geopolitics / Personal Items & Action Points / Investment Signals / News Highlights / Top Priorities. Deduplicate. Preserve all distinct facts.
Investment Signals section: plain prose — ticker (with exchange/currency), recommendation, confidence, brief reasoning. Always state buy/sell direction and exchange name explicitly.
TTS-friendly: plain prose only. No markdown (#, *, -, _), no emoji, no bullets. Section headers as plain text on their own line. Flowing paragraphs. End with "Top Priorities for Today".

**Step 3 — Save to Google Drive**
Save as a Google Doc titled 📊 Aggregated Report – [Month DD, YYYY] **inside today's Collection folder in Google Drive** (not directly under Reports15).

**Step 4 — Output for TTS**
Output full plain-text report in chat — no preamble, no commentary, no markdown. Complete, not truncated.

Variants:
- Create Aggregated Report
- Create Aggregated Report for [date]
- Fetch the aggregated report for TTS (skips Steps 1–3 if matching document already exists in today's Collection folder)

---

## 5. Collecting - Newsletter Digest (Expand)

**Trigger:** Type **Expand Newsletter Digest** (optionally specify email or date). Requires the Collection Drive folder ID from the caller.

**Step 1:** Search Gmail for today's newsletter emails (subject contains "Digest" or "Brief"). Default to today.
**Step 2:** Fetch full content with get_thread (FULL_CONTENT) — not search snippets.
**Step 3:** Extract editorial content only. Exclude nav bars, ads, CTAs, unsubscribe footers, tracking pixels. If email is a teaser with no real body, say so — don't invent content. Rewrite in full prose paragraphs. Preserve all facts, names, products.
**Step 4:** Structure: one-sentence intro (source, date, promo removed) → one section per source email → one paragraph per item in original order. Plain prose only — no markdown, no bullets, no emoji.
**Step 5:** Save as a Google Doc titled 📨 Newsletter Digest – [Month DD, YYYY] (Expanded) **inside the Collection folder (Google Drive)** (parent = Collection Drive folder ID).

Variants: Expand Newsletter Digest / Expand [name] for [date].

---

## 6. Collecting - AI/Robotics Investment Signals

**Trigger:** Runs as part of Start the Execution (Step 1 — Collect). Requires the Collection Drive folder ID from the caller.

**Orchestrator:** Run 3 agents in strict order using **AI Agents Memory** (**Google Drive — 100 AI Agents / AI Agents Memory**, folder ID: `1TVTUon1jtQDNkH7OiANUvsTe015MNfec`) as shared storage. Report counts after each step.

**Agent 1 — News Collector**
Search web for last 24h AI/robotics news (launches, funding, M&A, partnerships, regulatory, earnings). Capture: date, headline, source, 2–3 sentence summary, companies/tickers. Check AI/Robotics News Feed for duplicates. Add 5–15 high-signal items (Status = Unprocessed).

**Agent 2 — Analyzer**
Read all Unprocessed rows from AI/Robotics News Feed. Assess investment implications against AI/robotics ETFs, semiconductor/memory stocks, satellite portfolio. Write to AI/Robotics Analysis (Recommendation: None/Watch/Consider Buy/Consider Sell/Reduce; Confidence: Low/Medium/High). Mark source rows as Processed.

**Agent 3 — Signal Generator**
Read Analysis rows where Recommendation is Consider Buy/Consider Sell/Reduce AND Confidence is Medium or High. Write row to Investment Signals (Date, Signal Type, Ticker with exact exchange + currency, Recommendation, Reasoning, Source Links, Review Status = New). Prioritize Xetra-listed tickers; if none, give best alternative and note it. Combine near-duplicate theses. Skip if same ticker + recommendation exists from last 7 days.
For each new signal, create a short summary Google Doc **inside the Collection folder** (parent = Collection Drive folder ID) titled "Investment Signal - [short description] ([Month DD, YYYY])". Include: ticker, recommendation, confidence, reasoning, link to AI Agents Memory.

**Notes**
- Run order: Agent 1 → Agent 2 → Agent 3, daily
- Agent 3 logs to Google Drive only (no auto-send). Review Investment Signals for items marked New.
