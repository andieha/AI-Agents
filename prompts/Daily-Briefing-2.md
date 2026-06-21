# Daily Briefing Agent Prompt

Generate a briefing to help me catch up. Also Include:

1. **Schedule** — List upcoming meetings and events with times, attendees, and any preparation needed
2. **Important emails** — Summarize unread emails that need attention, grouped by urgency
3. **Messages requiring response** — Flag any direct messages or mentions that need a reply
4. **Action items** — List any pending tasks or follow-ups from recent activity

Keep the briefing concise and scannable. If there's nothing notable in a section, skip it rather than saying "nothing to report."

Save the result as a Google Doc inside the **Daily Briefing** folder in Google Drive (folder ID: `1EV3CxjxYDJJcZ8saqB1QFLKDseT54bow`, path: 1 New → 100 agents → Daily Briefing). Create a new doc titled "Daily Briefing – [Month DD, YYYY]" each run.

---

## Data sources

- **Google Calendar** — upcoming events for the next 7 days
- **Gmail** — unread inbox threads
- **Google Drive** — save folder: Daily Briefing (ID: `1EV3CxjxYDJJcZ8saqB1QFLKDseT54bow`, path: 1 New → 100 agents → Daily Briefing)

## Output format

```
## Schedule
<day-by-day table or list, times + attendees>

## Important Emails
### Needs attention
- <sender> — <subject> (<date>) — one-line summary + why it matters
### FYI / No action required
- ...
### Newsletters (low priority)
- ...

## Messages Requiring Response
- <source> — <who> — <context>

## Action Items
- [ ] <task>
```
