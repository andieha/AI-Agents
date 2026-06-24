# Skill Output Format

The deliverable is a real, installable `SKILL.md`. Follow this spec when synthesizing in Phase 4.

## File structure

```
<skill-name>/
└── SKILL.md
```

A single SKILL.md is the default and is enough for most extracted skills. Only split content into a `references/` file if the body would run long (>~400 lines) or contains a big lookup table, a deep example library, or a templated artifact the skill outputs. When in doubt, keep it in one file.

## Frontmatter

```yaml
---
name: skill-name-in-kebab-case
description: <one or two sentences: what it does AND when to trigger>
---
```

**name** — lowercase, hyphenated, derived from the Goal. Keep it short and memorable.

**description** — this is the single most important line. It is the only thing a future Claude sees when deciding whether to use the skill, so it has to carry both the Goal and the Trigger from Phase 1. Write it a little "pushy" to fight under-triggering: include the literal phrases and situations the person said would prompt it, and add "use this whenever…" / "trigger this even when…" language. Bad: "Helps write proposals." Good: "Turns a discovery-call transcript into a client-ready proposal with pricing and a roadmap. Use this whenever the user drops in call notes or says 'write a proposal,' 'turn this call into a proposal,' or describes wanting to propose working with a prospect — trigger it even if they don't say the word 'proposal.'"

## Body

Turn the interview into instructions a capable novice could follow without the expert in the room. Use imperative voice ("Start by…", "Check whether…"). Recommended shape — adapt to the actual skill:

```markdown
# <Skill Name>

<1–2 sentences: the goal, and the mindset/principle that makes it work.>

## When to use this
<The trigger, in plain terms.>

## The process
<The 5–7 macro steps as the backbone — as sections or a numbered list.>

### Step 1: <name>
- What to do (the actions)
- The key decision(s) and the if-this-then-that forks
- What to notice (the cues)
- How to know it's done well (quality bar)
- What beginners get wrong (failure mode)

### Step 2: …
…

## Principles / rules of thumb
<The beliefs and never-do rules, in the person's own words where possible.>
```

## Authoring rules

- **Preserve their voice.** Use the expert's actual phrasings, metaphors, and rules of thumb. That texture is the value — don't sand it into generic advice.
- **Explain the *why*, not just the *what*.** A novice follows steps better when they understand the principle underneath. Prefer reasons over bare "MUST" commands.
- **Encode the judgment.** The forks, cues, and failure modes are the difference between this and a generic checklist. Make sure they survive into the body.
- **Include examples** where they sharpen a fuzzy instruction — especially an input→output example if one came up in the interview.
- **Right-size it.** Don't pad. A tight skill that captures the real moves beats a long one full of filler.
- **Flag the thin spots.** If a step stayed shallow (or the escape hatch was pulled), still write it, but tell the person which sections are first-draft so they know where to come back.

## After writing

Save to the working directory. Present it, summarize what you captured, and name where it's thin. Offer to tighten any section. If `present_files` and a packaging script (`package_skill.py`) are available, offer to package it into an installable `.skill` file the person can load.
