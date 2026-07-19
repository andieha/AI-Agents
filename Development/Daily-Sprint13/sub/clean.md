# Clean All

**Trigger:** Called by `start.md` as Step 2, after all collection agents complete.

Audits Collection folders under Reports15 and reports any that are older than 30 days.

**Note:** The Google Drive MCP does not expose a delete tool, so this step cannot auto-delete. It identifies stale folders for manual cleanup.

## Steps

### 1 — List Collection folders

Search inside Reports15 (Google Drive, folder ID: `19LWpMihga0tvkaoFTaPpECkD3NMFCt5F`) for all folders whose name starts with `📁 Collection –`.

Use `mcp__Google_Drive__search_files` with a query like:
`name contains 'Collection' and mimeType = 'application/vnd.google-apps.folder' and '[folder_id]' in parents`

### 2 — Identify stale folders

For each folder found, parse the date from its name (`📁 Collection – Month DD, YYYY`).
Flag any folder where the date is more than 30 days before today.

### 3 — Report

List the stale folders (name + file ID) and state they need manual deletion from Google Drive.
If no stale folders exist, say so and continue.
