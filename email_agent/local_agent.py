"""Run the email-triage agent locally with the Claude Agent SDK.

Talks to Gmail through a local stdio MCP server (GongRzhe/Gmail-MCP-Server,
run via npx) instead of raw IMAP, so the same tool-use pattern also works
once this agent is moved to Claude Managed Agents (see ../README.md) - only
the MCP transport changes (stdio here, a hosted URL there), not the tools
Claude calls or the system prompt.

Setup (one-time):
  1. pip install -r requirements.txt
  2. Set up Gmail OAuth credentials by following
     https://github.com/GongRzhe/Gmail-MCP-Server#readme
     (creates ~/.gmail-mcp/credentials.json + gcp-oauth.keys.json)
  3. export ANTHROPIC_API_KEY=...

Run:
  python local_agent.py
  python local_agent.py "Triage only emails from the last 24 hours"
"""

import asyncio
import sys

from claude_agent_sdk import ClaudeAgentOptions, ResultMessage, query

from config import MODEL, SYSTEM_PROMPT

DEFAULT_PROMPT = "Triage my unread emails from the last 24 hours."


async def main() -> None:
    prompt = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_PROMPT

    options = ClaudeAgentOptions(
        model=MODEL,
        system_prompt=SYSTEM_PROMPT,
        mcp_servers={
            "gmail": {
                "command": "npx",
                "args": ["@gongrzhe/server-gmail-autoauth-mcp"],
            }
        },
        # Wildcard-allow every tool the Gmail MCP server exposes. Run once
        # and inspect the SystemMessage(subtype="init") data to see the
        # actual tool names, then narrow this to an explicit list (and add
        # disallowed_tools for anything that sends mail) if you want a
        # tighter guarantee than the system prompt's "never send" rule.
        allowed_tools=["mcp__gmail__*"],
    )

    async for message in query(prompt=prompt, options=options):
        if isinstance(message, ResultMessage) and message.subtype == "success":
            print(message.result)


if __name__ == "__main__":
    asyncio.run(main())
