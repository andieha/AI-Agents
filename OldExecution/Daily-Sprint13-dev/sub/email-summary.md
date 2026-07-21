# Email Summary

**Trigger:** Called by `start.md` as part of Step 1 (parallel). Requires the Collection Drive folder ID from the caller.

**Important:** Do not spawn background sub-agents. Run all 4 agents sequentially and inline in this conversation. If any agent step fails, wait 10s and retry up to 3 times before skipping.

Run 4 agents in strict order. Report counts after each step.

## Agent 1 — Fetch & Classify

Fetch Gmail inbox (last 24h). Filter out sent mail and unsubscribe emails.

Read whitelist from Google Drive using `mcp__Google_Drive__read_file_content` with file ID `1_uLlUehxCpd8PTEJtJxtw1eQ906x5SYcktbPlrhSijE`.

Classify each email:
- **WHITELIST** — sender or subject matches any keyword in the whitelist
- **ACTION NEEDED** — any other email requiring a personal response
- **FYI** — newsletters, alerts, updates
- **NEWSLETTER** — marketing, auto-replies, promotions

Report counts per category.

## Agent 2 — Research

For each WHITELIST and ACTION NEEDED email:
1. Search Google Drive (Email Memory folder ID: `1FWKfAMO0oD4K8s4xzM3U0MD7pok3TTg3`) — check `Contacts`, `Flightright Case File`, and `Important` docs for context on this sender
2. Search prior Gmail threads with this sender

Extract: who they are, prior agreements, open commitments, relevant context.

Skip FYI and NEWSLETTER.

## Agent 3 — Draft

- WHITELIST (important or action needed) → create Gmail draft
- ACTION NEEDED → create Gmail draft if a response is warranted
- WHITELIST (routine, holding, or auto-reply) → no draft
- FYI / NEWSLETTER → no draft

All drafts follow these rules:
- Use research context — reference prior agreements and commitments where relevant
- Direct and specific — no fluff, no generic apologies
- Peer-to-peer tone
- If no answer is available, say so and offer a next step
- Never invent facts or documents
- Sign off: "Best, Anders"
- Save as Gmail draft only — never send

## Agent 4 — Log & Summarize

**Email Memory folder** (permanent, not inside Collection): Google Drive folder ID `1FWKfAMO0oD4K8s4xzM3U0MD7pok3TTg3`

Log to Google Drive (Email Memory folder):
- WHITELIST or ACTION NEEDED → append to `Important` doc (file ID: `1K83OcvWkjL9HLx5K9svgoeArTmEjPjMWnVZw0W7XAIY`) — format: `Date | Sender | Subject | Summary | Action taken`
- Any active case (e.g. Flightright) → append to `Flightright Case File` doc (file ID: `1YMWyDVHSmEuo1qDWFJzZalnMSoybebxQ4fGpoc7ANG8`) with date and event
- Other case types → search for matching doc by name in the Email Memory folder; create it if it does not exist

Create a Google Doc **inside the Collection folder** (parent = Collection Drive folder ID):
- Title: `📋 Email Summary – [Month DD, YYYY]`
- Sections in order: Whitelist | Action Needed | FYI | Newsletters
- For each email: sender, subject, time, 2–3 sentence summary, classification tag, and draft status (Draft created / No draft)
- All summaries in English

## Error Handling

- Gmail 5xx → wait 10s, retry 3×, then skip and report
- Google Drive unavailable → Gmail draft only, skip logging
- Unclear email → flag as ⚠️ NEEDS MANUAL REVIEW, no draft
- Email body stays untranslated; summaries in English
