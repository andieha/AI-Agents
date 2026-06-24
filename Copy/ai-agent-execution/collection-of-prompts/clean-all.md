# Clean All

Source: https://app.notion.com/p/377e3c20a8ee815ea9b6cf6d232266b3

## Overview

Type **Clean All** to clean up all collection sections. Claude will keep the 5 most recent pages per section and move all older pages to the 🗑️ Clean staging page under Admin.

---

## Sections to Clean

- AI News (parent ID: `34ce3c20-a8ee-8113-8376-e08b4f639036`)
- Global News (parent ID: `34ce3c20-a8ee-8154-b1eb-d40769989c50`)
- Swedish News (parent ID: `34ce3c20-a8ee-816a-a682-f5d2cfc60ace`)
- Email Summary (parent ID: `34ce3c20-a8ee-81da-857f-d9754fd3935f`)
- Field Monitor (parent ID: `34de3c20-a8ee-81bc-9e04-eb27418bb596`)
- Daily Brief / AI Reports (parent ID: `377e3c20-a8ee-8141-baaf-d8a52d4d2c50`)

---

## Logic Per Section

1. Fetch all child pages under the section
2. Sort by date — newest first
3. Keep pages 1–5 in place
4. Move pages 6 and older to 🗑️ Clean (page ID: `36ee3c20-a8ee-815f-9f9b-ee2e0129711c`)
5. If 🗑️ Clean does not exist, create it under Admin first

---

## Trigger Command

> Clean All

---

## After Clean All

> ⚠️ Manual step required: Go to 🗑️ Clean and permanently delete the pages that were moved there. Claude cannot delete pages — this must be done manually in Notion.
