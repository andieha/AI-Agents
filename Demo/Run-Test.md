# Run the Phantom-Delivery Verification

**Trigger:** Type **Run tracking test**. Give Claude Code this file, or paste the prompt below into a session in the repository/folder containing `Demo/`.

---

## Prompt

```
Verify the phantom-delivery rules using Demo/Test/tracking_test.spec.ts.

Setup:
1. Create a working directory (use the session scratchpad, not the repo).
2. npm init -y && npm install -D @playwright/test
3. Do NOT run "npx playwright install". If a pre-installed Chromium exists
   (e.g. PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers), create playwright.config.ts
   pointing launchOptions.executablePath at that chrome binary. On a normal
   developer machine, the default install is fine and this step can be skipped.
4. Copy Demo/Test/tracking_test.spec.ts into the working directory.

Choose the mode:

MODE A — against a dev/staging build of the tracking app (preferred), or —
when no real app is available — against the reference pages in
Demo/Test/server.js: run "node server.js" (compliant page on :3000) and
"BUGGY=1 node server.js" (phantom-delivery page on :3001), then run the
suite against both. Expected: 5/5 pass on :3000, 4/5 fail on :3001 —
that is the suite working correctly.

When a real dev/staging build IS available:
- Set BASE_URL to the local/staging server. Never production.
- Replace the placeholder selectors and carrier route in the spec with the
  real ones from the codebase.
- Run: npx playwright test tracking_test.spec.ts
- All five tests must pass. Report each test's result and any failure output
  verbatim.

MODE B — observational, against a live tracking URL (no mocking possible):
- Write a read-only Playwright script that loads the URL, waits for network
  idle, then captures: (a) every carrier/tracking API request and response
  body, (b) the rendered page text and any delivery-window/status elements,
  (c) a full-page screenshot.
- Judge what is rendered against the five rules in Demo/Claude Code/CLAUDE.md:
  compare what the carrier API actually returned with what the UI displays.
- If the site is unreachable from the environment (network policy, 403 to
  anonymous fetches), say so plainly and fall back to MODE C — do not fake a
  result.

MODE C — evidence-based, from a capture (PDF/screenshot of the page):
- Default capture: Demo/Test/Elgiganten - Min order - 2312616203.pdf (the
  committed evidence for the observed case). Use a newer capture if the user
  supplies one.
- Read the capture. Extract: headline delivery promise, current status step,
  status ladder position, and the date of capture relative to the promised
  window. Note any embedded carrier tracking URL (this capture contains
  https://tracking.bring.se/tracking/370727790063193606) — if reachable, the
  carrier's own page completes the rule 2 check; if not, record it as the
  open verification item.
- Judge rule by rule (1: no window without carrier custody; 2: carrier truth
  over internal status; 3: forecast never styled as confirmed; 4: support
  parity — only if support statements are available; 5: fail loud — did a
  stale promise outlive its deadline?).
- Map each violated rule to the spec's test that would have caught it, and
  state which rules the artifact cannot verify.

Reporting (all modes):
- Lead with the verdict per rule (pass / violated / not verifiable) in a table.
- Include the evidence for each verdict — API response vs. rendered text, or
  the capture's exact wording.
- If a violated state is not covered by the five existing tests, propose the
  missing test case.
- Never point tests at production, never fabricate selectors, responses, or
  results — a blocked or inconclusive check is reported as exactly that.
```

---

## Notes

- This prompt reproduces the verification performed on August 2, 2026 for order
  2312616203: MODE B was attempted (blocked — network policy + 403), MODE C ran
  against a PDF capture and produced `Verification - Order 2312616203.md`, and
  the resulting gap became test 5 in the spec ("a stale window does not survive
  its own deadline").
- MODE A is the one Elgiganten's developers would use after adapting selectors,
  per `Instruktioner - Så används filerna.md`.
