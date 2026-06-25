# Differences: This Implementation vs Claude Agent SDK Demo

Based on the original demo at github.com/anthropics/claude-agent-sdk-demos/research-agent.

## What is the same

- 4-agent structure: lead coordinator → parallel researchers → data analyst → report writer
- Researcher rules: 5-10 web searches, minimum 10-15 statistics per note, all sources cited
- Sequential ordering: researchers must complete before analyst; analyst before report writer
- Parallel researcher execution: all 4 subtopics researched simultaneously

## What is different

| | SDK Demo | This Implementation |
|---|---|---|
| **Trigger** | Python `query()` call in code | Type "Run AI Agents Market Research" |
| **Orchestration** | `asyncio.gather()` — guaranteed parallel | Lead agent prompt — parallel by instruction |
| **Storage** | Local `files/` directory | Google Drive — AI Research subfolder in today's Collection folder |
| **Charts** | matplotlib PNG files via Python/Bash | Markdown tables in the Data Summary doc |
| **Final output** | PDF via reportlab | Google Doc in Drive |
| **Data freshness** | 2024-2025 (broad range) | Last 30 days only |
| **Topic** | Generic — user provides query each run | Fixed: AI agents market (4 fixed subtopics) |
| **Session tracking** | Hooks + `tool_calls.jsonl` audit log | Execution Log entry in Drive |
| **Error handling** | Code-level try/except with backoff | Prompt instruction: wait 10s, retry 3× |
| **Infrastructure** | Requires Python environment to run | Runs entirely inside Claude Code |

## Key tradeoff

The SDK demo enforces parallel execution and error handling in code — guaranteed behaviour.
This implementation relies on Claude following prompt instructions — equivalent for personal use,
but less robust at scale or in production.
