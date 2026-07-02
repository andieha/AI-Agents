# CLAUDE.md

Guidance for AI assistants working in this repository.

## Overview

This repository contains a minimal, single-file Python CLI agent (`agent.py`) that
demonstrates Anthropic's tool-use (function calling) pattern. The agent runs an
interactive REPL, sends user messages to Claude, and executes tools (`calculator`,
`web_search`) when the model requests them, looping until the model produces a
final text response.

The codebase is intentionally small — treat it as a reference implementation of
the agentic tool-use loop, not a framework.

## Repository structure

| File | Purpose |
|---|---|
| `agent.py` | The entire application: tool definitions, tool implementations, the agentic loop, and the REPL entry point. |
| `requirements.txt` | Single dependency: `anthropic>=0.40.0`. |
| `email_agent/` | A separate, self-contained example: an email-triage agent built on the `claude_agent_sdk` (not the raw `anthropic` client). See `email_agent/README.md`. It has its own `requirements.txt` and is not imported by `agent.py` or vice versa. |

There are no tests, CI config, linter config, or license file in this
repository yet.

## Setup & running

```bash
pip install -r requirements.txt
export ANTHROPIC_API_KEY=...   # required; read implicitly by anthropic.Anthropic()
python agent.py
```

The REPL prompts with `You:`; type `quit`, `exit`, or `q` to end the session.

## Architecture: the agentic loop

`chat(messages)` is the core of the file:

1. Calls `client.messages.create()` with the running `messages` list, the `TOOLS`
   schema, and a fixed model/config (see below).
2. Appends the assistant's response content to `messages`.
3. If `stop_reason == "end_turn"`, returns the first text block as the final reply.
4. If `stop_reason == "tool_use"`, executes every `tool_use` block via
   `run_tool()`, wraps each result in a `tool_result` block keyed by
   `tool_use_id`, appends them as a single `user` message, and loops again.
5. Any other `stop_reason` breaks the loop and returns an empty string.

When modifying this loop, preserve the message-accumulation pattern (assistant
content, then a `user` message of `tool_result` blocks) — the Anthropic API
requires tool results to immediately follow the tool-use turn that requested them.

## Key conventions

- **Adding a tool** requires updating three things together, or the tool won't
  work end-to-end:
  1. A plain Python function implementing the behavior (e.g. `calculator`).
  2. A matching entry in the `TOOLS` list with `name`, `description`, and
     `input_schema` (JSON Schema).
  3. A dispatch branch in `run_tool()` mapping the tool `name` to the function.
- **`calculator`** evaluates expressions with `eval`, restricted to `math` module
  globals with `__builtins__` blocked. This is a narrow, intentional sandbox —
  any change here must preserve or tighten the restriction, never loosen it
  (e.g. don't pass through unrestricted builtins or allow attribute access that
  could escape the sandbox).
- **`web_search` is a stub.** It returns hardcoded placeholder text and does not
  perform a real search — the comment in the code marks where a real API (e.g.
  Brave Search, SerpAPI) should be wired in. Don't assume it returns live data.
- No test suite or CI exists yet, so there's no established testing convention
  to follow if tests are added — pick a standard approach (e.g. `pytest`) and
  keep it simple, matching the single-file style of the repo.

## Model/config notes

The model and generation settings are hardcoded in `chat()`:
`model="claude-opus-4-8"`, `max_tokens=4096`, `thinking={"type": "adaptive"}`.
This reflects what the code currently does — verify against the live
`anthropic` SDK/model catalog before assuming this is the latest recommended
model, since model availability changes over time.

## Gaps (nothing established yet for these)

No tests, no CI/CD, no linter/formatter config, no README, no license. If asked
to add any of these, there are no existing conventions in this repo to match —
use straightforward, standard defaults for a small Python project.
