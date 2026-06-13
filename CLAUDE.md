# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Setup

```bash
pip install -r requirements.txt
```

Requires `ANTHROPIC_API_KEY` set in the environment.

## Running

```bash
python agent.py
```

This runs three hardcoded example prompts through the agent loop and prints results to stdout.

## Architecture

The entire project is a single file (`agent.py`) implementing a minimal agentic loop using the Anthropic SDK directly (no framework).

**Core loop** (`run_agent`): Sends a user message to Claude, then loops — if the response stop reason is `tool_use`, it dispatches to `run_tool`, appends tool results as a new `user` turn, and calls the API again. The loop exits when stop reason is `end_turn`.

**Tool dispatch** (`run_tool`): Routes to `calculator` or `web_search` by name. `calculator` uses `eval` sandboxed to `math` module functions. `web_search` is a stub returning placeholder text — replace with a real search API (Brave, SerpAPI, etc.) to make it functional.

**Model config**: Uses `claude-opus-4-8` with `thinking: {type: "adaptive"}` (extended thinking enabled). Tool results and thinking blocks are preserved in the message history across turns, which is required for the API to function correctly with extended thinking.
