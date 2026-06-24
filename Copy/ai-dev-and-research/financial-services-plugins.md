# Financial Services Plugins

Source: [anthropics/financial-services](https://github.com/anthropics/financial-services)  
Cloned to: `financial-services/` in this repo  
Date added: 2026-06-20

## What it is

Reference agents, skills, and slash commands for financial services workflows — investment banking, equity research, private equity, and wealth management. Built by Anthropic FSI.

Designed for two deployment modes:
- **Claude Cowork** — install as a plugin via the marketplace
- **Claude Managed Agents API** — deploy via `/v1/agents`

Since the marketplace plugin ID (`anthropics/financial-services`) requires Cowork, the repo is cloned locally so the skills and commands can be used directly in Claude Code sessions by referencing the files.

## How to use in Claude Code

Ask Claude to run a workflow by name. Claude reads the relevant skill file and executes the workflow. Example prompts:

- "Run a comps analysis for Apple"
- "Build a DCF for Stripe"
- "Write an IC memo for [deal]"
- "Screen a deal for [company]"
- "Run a KYC screen for [client]"

## Available Commands

### Financial Analysis (`plugins/vertical-plugins/financial-analysis/commands/`)
| Command | Description |
|---------|-------------|
| `comps.md` | Comparable company analysis with trading multiples |
| `dcf.md` | Discounted cash flow model |
| `lbo.md` | Leveraged buyout model |
| `3-statement-model.md` | Income statement, balance sheet, cash flow |
| `competitive-analysis.md` | Competitive landscape analysis |
| `debug-model.md` | Audit and fix financial models |
| `ppt-template.md` | PowerPoint deck generation |

### Investment Banking (`plugins/vertical-plugins/investment-banking/commands/`)
| Command | Description |
|---------|-------------|
| `comps.md` | IB-grade comparable company analysis |
| `cim.md` | Confidential information memorandum |
| `teaser.md` | Deal teaser / one-pager |
| `one-pager.md` | Company one-pager |
| `buyer-list.md` | Strategic and financial buyer list |
| `merger-model.md` | M&A merger model |
| `process-letter.md` | M&A process letter |
| `deal-tracker.md` | Deal pipeline tracker |

### Equity Research (`plugins/vertical-plugins/equity-research/commands/`)
| Command | Description |
|---------|-------------|
| `initiate.md` | Initiation of coverage report |
| `earnings.md` | Earnings analysis |
| `earnings-preview.md` | Pre-earnings preview note |
| `model-update.md` | Post-earnings model update |
| `thesis.md` | Investment thesis |
| `catalysts.md` | Catalyst identification |
| `sector.md` | Sector overview |
| `screen.md` | Stock screening |
| `morning-note.md` | Morning market note |

### Private Equity (`plugins/vertical-plugins/private-equity/commands/`)
| Command | Description |
|---------|-------------|
| `screen-deal.md` | Deal screening |
| `dd-checklist.md` | Due diligence checklist |
| `dd-prep.md` | Due diligence preparation |
| `ic-memo.md` | Investment committee memo |
| `returns.md` | Returns analysis |
| `unit-economics.md` | Unit economics model |
| `value-creation.md` | Value creation plan |
| `portfolio.md` | Portfolio company review |
| `source.md` | Deal sourcing |
| `ai-readiness.md` | AI readiness assessment |

### Wealth Management (`plugins/vertical-plugins/wealth-management/commands/`)
| Command | Description |
|---------|-------------|
| `proposal.md` | Client investment proposal |
| `client-report.md` | Client portfolio report |
| `client-review.md` | Client review meeting prep |
| `financial-plan.md` | Financial planning document |
| `rebalance.md` | Portfolio rebalancing |
| `tlh.md` | Tax-loss harvesting |

### Partner Plugins
| Plugin | Commands |
|--------|---------|
| LSEG | Bond basis, FX carry, swap curve, option vol, bond RV, equity research, macro rates, FI portfolio |

## Named Agents

Full end-to-end workflow agents in `plugins/agent-plugins/`:

| Agent | What it does |
|-------|-------------|
| `pitch-agent` | Comps → precedents → LBO → branded pitch deck |
| `market-researcher` | Sector/theme → industry overview + peer comps |
| `earnings-reviewer` | Earnings call + filings → model update → note draft |
| `model-builder` | DCF, LBO, 3-statement, comps in Excel |
| `meeting-prep-agent` | Briefing pack before client meetings |
| `valuation-reviewer` | GP packages → valuation template → LP reporting |
| `gl-reconciler` | GL breaks → root cause → sign-off routing |
| `month-end-closer` | Accruals, roll-forwards, variance commentary |
| `statement-auditor` | LP statement audit before distribution |
| `kyc-screener` | Onboarding docs → rules engine → gap flagging |

## Managed Agent Deployment

Cookbooks for deploying via the Claude Managed Agents API are in `managed-agent-cookbooks/`. Each agent has:
- `agent.yaml` — system prompt + skills config
- `subagents/*.yaml` — leaf worker definitions
- `steering-examples.json` — example steering events
- `README.md` — security tier and handoff notes

Deploy with:
```bash
python3 financial-services/scripts/deploy-managed-agent.sh <agent-slug>
```

## Notes

- Data source priority per skill: S&P Kensho MCP → FactSet MCP → Daloopa MCP → Bloomberg/SEC filings. Web search is explicitly discouraged for institutional-grade output.
- Skills live in `vertical-plugins/` and are synced into agent bundles via `scripts/sync-agent-skills.py`.
- Run `python3 financial-services/scripts/check.py` to validate all manifests before committing.
