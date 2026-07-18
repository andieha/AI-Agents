---
name: notion-data-entry
description: >
  Use this skill whenever the user asks to save, add, create, log, record, or enter
  new information into Notion — a new page, a note, a link, a quick fact, a database
  row, or an update to an existing page. Triggers on phrases like "create a page for X",
  "add this to Notion", "save this", "log this in Notion", "put this under [section]",
  "create a new entry", "note this down", or any request to enter data without an
  explicit destination given. Also use when updating, appending to, or editing existing
  Notion pages or database rows. Andie stores essentially everything in Notion (not in
  Claude memory), so default to this skill whenever new information appears in
  conversation that looks like it should be persisted — even if the user doesn't use
  the word "Notion" explicitly, as long as they signal they want something kept.
---

# Notion Data Entry Skill

A general-purpose skill for entering new data into Andie's Notion workspace — creating
pages, adding database rows, and updating existing content — in a way that matches the
existing structure rather than guessing or creating clutter.

This skill is deliberately **general**. For travel-specific page structures (trip pages,
KML maps, year folders under Travels), defer to the `travel-organizer` and
`multi-city-trip-planner` skills instead — this skill is for everything else (and for
travel entries that don't need that full structure, like the quick "Dalarna" idea page).

---

## Core Workflow

### 1. Figure out where the content belongs

Never guess blindly and never create a page at the workspace root or in the wrong
section. Always do at least one of:

- If the user names a section ("under Travel future", "in Admin", "in the Satellite
  portfolio") → use `Notion:notion-search` and/or `Notion:notion-fetch` to locate that
  exact parent page or database. Fetch the parent to see its existing children before
  creating, so the new page sits alongside siblings that match its naming/structure.
- If the user does **not** name a section → use `Notion:notion-search` with relevant
  keywords to find the most plausible home. Check the page content/title for genre
  clues (a flight idea → Travels > Future; a contact → Social; a bill or subscription →
  Admin; a stock/ETF note → AI/Satellite portfolio area, etc.)
- If a database is the right home (matching schema/columns) rather than a freeform page,
  prefer adding a row there over creating a loose page nearby.

### 2. Always show the proposed location before creating — no exceptions

Regardless of confidence level, state where you're about to create or modify something
and what it will be called, **before** calling the create/update tool. Keep this short:

> Creating **"[Title]"** under **Travels > Future**. OK?

Exception: none. Even when the destination seems obvious (e.g. user explicitly gives a
full path like "under Travel future, called Dalarna"), still confirm briefly — but you
can fold this into the action itself rather than a separate question, e.g. proceed and
state clearly afterward what you did and where, so the user can immediately catch a
wrong location. When the destination is genuinely ambiguous (multiple plausible
parents), ask explicitly and wait for confirmation before creating anything.

### 3. Match existing conventions, don't invent new ones

Before creating a page, look at 1–2 sibling pages in the same section (via
`notion-fetch`) to mirror:
- Title format and emoji usage (many sections use a leading emoji icon)
- Heading structure (e.g. travel destination pages follow a strict template — see
  `travel-organizer` skill)
- Property names and types if it's a database row — fetch the data source schema first,
  never invent property names
- Language: **all Notion content is in English**, regardless of what language the user
  writes the request in or what language the source content (e.g. a forwarded link or
  note) is in. Translate non-English fragments into English when entering them, unless
  it's a proper noun, place name, or quoted material that shouldn't be translated.

### 4. Creating vs. updating

- **New standalone page**: use `Notion:notion-create-pages` with `parent: {page_id}`.
- **New database row**: use `Notion:notion-create-pages` with
  `parent: {data_source_id}` (get this from `<data-source url="collection://...">` in
  the fetch output — never guess it), and populate properties using the source's actual
  schema (correct types: dates split into `date:Prop:start`/`date:Prop:end`, checkboxes
  as `__YES__`/`__NO__`, etc.)
- **Updating/appending to an existing page**: fetch the page first to see current
  content, then use the appropriate Notion update tool (search for it via `tool_search`
  if not already loaded — e.g. an update-page or append-content tool) rather than
  recreating the page from scratch. Preserve existing content unless the user asks to
  replace it.
- **Editing a database row's properties**: fetch the row, confirm the property names
  match the schema, then update only the fields the user mentioned.

### 5. Content formatting

- Use Notion-flavored Markdown for page content (see the `notion://docs/enhanced-markdown-spec`
  resource if unsure of syntax — don't guess at exotic formatting).
- Don't repeat the title inside the content body — it's already shown as the page heading.
- Keep entries minimal and signal-only by default: if the user pastes a raw link + a few
  short lines, enter exactly that — don't pad it with generated commentary, headers, or
  summaries unless asked. Andie prefers concise, no-preamble content, in Notion as much
  as in chat.
- For links: paste as a bare URL or a clean Markdown link if there's accompanying label
  text — don't wrap in extra explanation.

### 6. After creating or updating

Confirm in one or two lines: what was created/changed, its title, and where it lives
(parent section), plus the URL. No extended recap of the content you just entered — the
user just gave it to you, they don't need it played back at length.

> Created **Dalarna** under Travels > Future: [url]
> Contains the map link, "Stämmoveckan", and "Rättviks parken."

---

## Common Sections (starting points for search/fetch — not exhaustive)

| Area | Notion page ID |
|---|---|
| AI (parent) | `374e3c20-a8ee-81c0-93fe-e3afde37b926` |
| Admin | `35fe3c20-a8ee-8175-9b51-d69fbe45237d` |
| Social | `352e3c20-a8ee-8184-83d3-de0c52d1a91e` |
| Travels | `34ee3c20-a8ee-8170-a16c-cb2db52e02ba` |
| Travels > Future | `35ee3c20-a8ee-813b-b8f9-c31d28f91c52` |
| Todo List (data source) | `4fa846f7-b30e-4016-9879-34af3ab84159` |
| Bookmarks (data source) | `358e3c20-a8ee-8022-82b9-000bd49fbd7e` |

If the destination isn't one of these, use `notion-search` — don't assume the workspace
only has these areas. Treat this table as a shortcut, not a ceiling.

### Known shorthand
- "Bookmarks" with no other context → the Bookmarks database above.
- "Start the Execution" / "Start Collecting All" / "Clean All" → these refer to specific
  AI pipeline prompts in Notion, not data-entry destinations. Don't confuse a request to
  *run* one of these with a request to *log data into* one of these.

---

## Quick Decision Tree

```
User wants to save/add/log something
│
├─ Names exact section/page?
│   ├─ Yes → fetch that page, confirm location line, create as sibling-matching page
│   └─ No  → notion-search for best-fit section
│              ├─ Single clear best match → state proposed location, then create
│              └─ Multiple plausible matches → ask which one, wait for answer
│
├─ Is the target a database (not a freeform page)?
│   └─ Yes → fetch schema first, create as a row with correctly-typed properties
│
└─ Is this an update to something that already exists?
    └─ Yes → fetch existing content first, append/update — don't duplicate the page
```
