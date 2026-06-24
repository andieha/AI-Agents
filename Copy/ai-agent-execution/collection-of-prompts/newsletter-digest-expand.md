# Collecting - Newsletter Digest (Expand)

Source: https://app.notion.com/p/37ee3c20a8ee8158aa33e986294ba182

## Overview

Type **Expand Newsletter Digest** (optionally specifying which email or date) to take one or more newsletter-style emails from Gmail, strip out promotional clutter, and produce a clean, readable expanded document saved under AI Reports.

---

## Step 1 — Identify Source Email(s)

Search Gmail for the target newsletter(s), e.g.:
- `subject:"Daily AI Agent Brief"`
- `subject:"Weekly Digest"` (Skool community digests)

Default to today's date if no date is specified. If multiple matching emails exist, include all of them as separate sections in the output.

---

## Step 2 — Fetch Full Content

Use `get_thread` (FULL_CONTENT) to retrieve the full HTML/plaintext body of each email — `search_threads` snippets are too short to work from.

---

## Step 3 — Extract and Clean

For each email:
- Extract only the substantive editorial content (article items, headlines, "what changed / why it matters / try this" style sections, curated reading lists, etc.).
- **Exclude**: navigation bars, ad banners, promotional CTAs, feedback widgets, unsubscribe/footer text, tracking pixels, and any boilerplate.
- If an email is a notification-only teaser with no real content in the body, say so explicitly rather than inventing content.
- Rewrite each item in full prose paragraphs while preserving all distinct facts, names, products, and recommendations.

---

## Step 4 — Structure the Output

- Add a top-level one-sentence intro noting the source emails and date(s) covered, and that promotional content has been removed.
- Group content under a plain-text section heading per source email (e.g. "From [Newsletter Name], [Date]").
- Within each section, one paragraph per item/story, in the order they appeared in the original email.
- Plain prose only — no markdown symbols, bullet points, or emoji within the body text.

---

## Step 5 — Save to Notion

Create a new page titled `📨 Newsletter Digest – [Month DD, YYYY] (Expanded)` under AI Reports (parent ID: `377e3c20-a8ee-8141-baaf-d8a52d4d2c50`). No confirmation needed.

---

## Trigger Commands

> Expand Newsletter Digest
> Expand [newsletter name] for [date]
