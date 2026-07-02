# Email triage agent

An agent that triages a Gmail inbox: labels messages by priority and drafts
replies for anything that needs one. It never sends mail or deletes anything
— see the rules in `config.py`'s `SYSTEM_PROMPT`.

It's built in two stages on purpose:

1. **`local_agent.py`** — runs now, on your own machine, using the
   [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)
   and a local Gmail MCP server, so you can develop and test the prompt/tool
   behavior quickly.
2. **Claude Managed Agents** — the hosted runtime you'd move it to once
   you're happy with it (Anthropic runs the sandbox and agent loop instead
   of your own machine). See "Moving to Managed Agents" below.

The model and system prompt (`config.py`) are shared across both. The tool
wiring is not, because the two runtimes support different MCP transports —
that's the main thing this README walks through.

## Run it locally

```bash
cd email_agent
pip install -r requirements.txt
```

Set up Gmail OAuth for the MCP server (one-time; follow
[GongRzhe/Gmail-MCP-Server](https://github.com/GongRzhe/Gmail-MCP-Server#readme)
to create a Google Cloud OAuth client and run its auth flow — it writes
credentials to `~/.gmail-mcp/`). You'll also need Node.js installed, since
the server runs via `npx`.

```bash
export ANTHROPIC_API_KEY=...
python local_agent.py
# or: python local_agent.py "Triage only emails from the last 24 hours"
```

## Moving to Managed Agents

Managed Agents ([overview](https://platform.claude.com/docs/en/managed-agents/overview))
is a hosted REST API: instead of `local_agent.py` running the loop on your
machine, you `POST` an agent definition once, then start sessions against it.

**The one thing that doesn't carry over directly: MCP transport.** Managed
Agents' `mcp_servers` field only accepts `"type": "url"` — a remote,
network-reachable MCP endpoint. The local setup above uses a *stdio* server
(`npx @gongrzhe/server-gmail-autoauth-mcp`), which only exists as a local
process. Before moving, you need the Gmail MCP server reachable over HTTPS —
either self-host that server behind an HTTP(S)/SSE endpoint yourself, or
swap in a Gmail MCP provider that already exposes a hosted URL. Everything
else (system prompt, model, tool-use pattern) is unchanged.

Once you have a URL for it:

**1. Create the agent** (system prompt + model from `config.py`, plus the
MCP server declared by name/URL and a matching `mcp_toolset`):

```bash
curl https://api.anthropic.com/v1/agents \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d '{
    "name": "Email Triage Agent",
    "model": "claude-opus-4-8",
    "system": "<contents of config.py SYSTEM_PROMPT>",
    "mcp_servers": [
      {"type": "url", "name": "gmail", "url": "https://your-gmail-mcp-host.example.com"}
    ],
    "tools": [
      {"type": "mcp_toolset", "mcp_server_name": "gmail"}
    ]
  }'
```

**2. Create an environment** (the sandbox the session runs in):

```bash
curl https://api.anthropic.com/v1/environments \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d '{"name": "email-agent-env", "config": {"type": "cloud", "networking": {"type": "unrestricted"}}}'
```

**3. Register Gmail credentials in a vault**, then reference the vault when
creating a session, so the agent definition itself stays credential-free
(see [Authenticate with vaults](https://platform.claude.com/docs/en/managed-agents/vaults)):

```bash
curl https://api.anthropic.com/v1/sessions \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d '{"agent": "<agent_id>", "environment_id": "<environment_id>", "vault_ids": ["<vault_id>"]}'
```

**4. Send an event** with your triage prompt and stream the response — see
[Session event stream](https://platform.claude.com/docs/en/managed-agents/events-and-streaming)
for the event format.

The MCP toolset defaults to requiring approval before each tool call
(`always_ask`); see
[permission policies](https://platform.claude.com/docs/en/managed-agents/permission-policies)
if you want draft-creation auto-approved while still requiring approval for
anything unexpected.
