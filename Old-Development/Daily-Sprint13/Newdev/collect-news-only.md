# Collect News Only

**Trigger:** Type **Collect News**. No confirmation needed.

## Google Drive Structure

```
100 AI Agents (folder ID: 1AAGGDZsJLGBLv3MgmOSMiJBkCthIwTId)
└── 📁 Reports15  (folder ID: 1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_)
    └── 📁 Collection – [Month DD, YYYY]
        ├── 🤖 AI News – [date]
        ├── 🌍 Global News – [date]
        └── 🇸🇪 Swedish News – [date]
```

## Step 1 — Create Collection Folder

Check if a folder named `📁 Collection – [Month DD, YYYY]` (today's date) already exists inside Reports15 (folder ID: `1aa0mOKOM_n_z2VkpU8r-Q7HgoVfdD-p_`). Create it if it does not exist. Note the Collection folder ID.

## Step 2 — Collect News (parallel)

Read `../sub/collecting-news.md` then execute it. Pass the Collection folder ID from Step 1.

Run all 3 topics in parallel:
- 🤖 AI News
- 🌍 Global News
- 🇸🇪 Swedish News

Each saves one dated Google Doc inside the Collection folder.

## Notes

- 5xx error → wait 10s, retry up to 3×, then skip and continue
- All summaries in English
