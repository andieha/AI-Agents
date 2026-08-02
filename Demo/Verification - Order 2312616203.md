# Verification — Real Observed Case (Order 2312616203)

**Date of verification:** August 2, 2026
**Source:** PDF capture of the order page at `mypage.elgiganten.se` (order confirmation
view, logged out), order 2312616203 — Dreame A1 Pro 2000 robot mower, ordered July 26,
2026, home delivery to Furudal.
**Method:** the live tracking URL could not be loaded from the verification environment
(network policy + the site answering 403 to anonymous fetches), so the customer supplied
a PDF capture of the page instead. The analysis below checks the rendered state against
the five rules in `Claude Code/CLAUDE.md` / `Cursor/.cursorrules` and maps it to the
test cases in `Test/tracking_test.spec.ts`.

## What the captured page shows

- Headline: **"Förväntad leverans 31 juli 2026 09:00 - 15:00"** — a specific date with a
  precise 6-hour clock window.
- Current status: **"Skickad"** — "Dina varor har skickats från oss och är på väg till
  **vår terminal**" (shipped from the warehouse, still en route to Elgiganten's own
  terminal).
- Status ladder: Behandlas → **Skickad** (current) → Sorterad på terminal → Levererad —
  i.e. the parcel had **not** reached the terminal; no carrier scan / custody event is
  reflected anywhere on the page.
- As of the verification date (August 2), the promised window (July 31, 09:00–15:00) had
  passed **two days earlier**, with the status still pre-terminal, and the page still
  headlining that window.

## Verdict against the five rules

| Rule | Result |
|---|---|
| 1 — No phantom delivery | **Violated in substance.** A precise time window is displayed while the shown status is pre-terminal — no confirmed carrier custody. |
| 2 — Single source of truth | Not directly verifiable from this view (internal statuses only; the carrier's own record is not shown). Pattern is consistent with internal optimism driving the display. |
| 3 — Forecast vs. fact | **Partial violation.** The label "Förväntad" (expected) is the right word, but the estimate is rendered as the page headline with clock-level precision — the visual format of a confirmed window. A forecast that looks this precise reads as a promise. |
| 4 — Support dashboard parity | Not verifiable from this artifact. |
| 5 — Fail loud, not silent | **Violated — sharpest finding.** The delivery window passed two days before the capture, the parcel still hadn't reached the terminal, and the page silently kept headlining the stale window instead of showing an explicit delayed/status-unavailable state. |

## Mapping to `Test/tracking_test.spec.ts`

- **Test 1** ("hides the delivery window when the carrier has not received the parcel"):
  the observed live behavior is this test's **failing case** — the window is shown anyway.
- **Test 4** ("an estimate is never rendered as a confirmed window"): failing case —
  estimate rendered in headline/confirmed-window style.
- Additional case worth adding to the spec, directly from this observation: **a stale
  window must not survive its own deadline** — if `now > expectedDelivery.to` and the
  carrier still reports no custody, the UI must switch to an explicit delayed state.
  None of the four current tests cover this.

## Caveats

- This is the order-confirmation view, not the "Spåra din order" tracking page; the
  tracking page could in principle show carrier data this view does not.
- Carrier custody is inferred from the displayed status ladder (current step "Skickad",
  pre-terminal), not from a direct read of the carrier API.

## Conclusion

The captured page exhibits the phantom-delivery pattern the template in this folder was
written to prevent: a clock-precise delivery promise displayed without carrier custody,
left standing silently after it had already expired. Had the spec been adapted to the
real codebase and wired into CI as described in the instructions file, tests 1 and 4
should have caught this state before a customer saw it — and the "stale window" case
above should be added as a fifth test.
