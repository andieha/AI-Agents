# 🧪 Test Run Results — Phantom-Delivery Verification

**Run date:** August 2, 2026
**Executed per:** `Demo/Run-Test.md` (trigger: *Run tracking test*)
**Suite:** `Demo/Test/tracking_test.spec.ts` (5 tests, Playwright)
**Evidence:** `Demo/Test/Elgiganten - Min order - 2312616203.pdf` + first-hand incident timeline
**Related:** `Demo/Verification - Order 2312616203.md` · order 2312616203 · Bring parcel 370727790063193606

---

## Summary

| Mode | What | Outcome |
|---|---|---|
| MODE B | Live pages (Elgiganten tracking + Bring) | ⛔ **Blocked** — environment network policy + both sites answer 403 to anonymous fetchers. Recorded as blocked, not failed. |
| MODE C | PDF capture of the order page | 🔴 **Phantom-delivery pattern confirmed** — 4 rules violated, 1 partial |
| MODE A | Test suite vs. reference implementations | ✅ **Suite validated** — catches the bug (4/5 fail on buggy build), passes a compliant build (5/5) — and the run exposed + fixed a bug in the suite itself |

---

## MODE C — Rule-by-rule verdict (from the captured page + phone timeline)

| # | Rule | Verdict | Evidence |
|---|---|---|---|
| 1 | No delivery window without carrier custody | 🔴 **Violated** | "Förväntad leverans 31 juli 2026 09:00 - 15:00" headlined while status read "Skickad — på väg till **vår** terminal" (pre-terminal; no carrier scan) |
| 2 | Carrier truth over internal status | 🔴 **Violated, witnessed** | July 28 & 31: Elgiganten support confirmed delivery was on track; Bring, contacted directly, had **no record of receiving the parcel** and no record of Elgiganten's calls |
| 3 | Forecast never styled as confirmed | 🟠 **Partial** | Labeled "Förväntad" (correct word) but rendered as the page headline with clock-level precision — the visual form of a promise |
| 4 | Support dashboard parity | 🔴 **Violated, witnessed** | Support's data contradicted the carrier's live answer minutes apart — whatever support reads, it is not live Bring data |
| 5 | Fail loud, not silent | 🔴 **Violated** | Captured August 2: the July 31 window still headlined **two days past its deadline**, parcel still pre-terminal, no delayed/status-unavailable state |

**Root-cause hypothesis** (pending carrier-side capture): the order page links a real Bring parcel ID (370727790063193606), so a shipment was *electronically pre-advised* to Bring — the tracking page appears to treat that pre-advice as if it were physical custody. Pre-advice ≠ arrival scan.

**Open item:** capture of Bring's own tracking page for parcel 370727790063193606 (only reachable from the customer's browser) would complete the rule 2 check with carrier-side data.

---

## MODE A — Suite validation (local reference implementations)

Because no dev/staging build of the real app is available, the suite was run against two minimal reference implementations built for the purpose (localhost, carrier API mocked by the tests as designed):

**Against a deliberately buggy phantom-delivery page** (renders the internal promise unconditionally, ignores the carrier):

| Test | Result |
|---|---|
| 1. Hides window when carrier hasn't received parcel | ❌ FAIL *(correct — catches the bug)* |
| 2. Shows window once carrier confirms custody | ✅ pass *(window always shown, so trivially satisfied)* |
| 3. Degrades safely when carrier API unavailable | ❌ FAIL *(correct)* |
| 4. Estimate never rendered as confirmed window | ❌ FAIL *(correct)* |
| 5. Stale window does not survive its own deadline | ❌ FAIL *(correct)* |

**Against a compliant page** (five rules implemented): **5/5 passed** (1.8s).

➡️ The suite demonstrably detects the exact failure pattern observed on order 2312616203, and passes a correctly built page.

---

## Finding: a bug in the suite itself, found by running it

The first compliant run came back **4/5** — test 2 failed. Investigation showed the test, not the page, was wrong: it hardcoded `expectedDelivery: 2026-07-31` **without freezing the browser clock**, so from August 1 onward any implementation with stale-window protection correctly refuses to show that expired window — and the test wrongly fails it. A time-bomb fixture: green in July, red in August.

**Fix (committed `b5924bd`):** test 2 now freezes the clock inside the promised window (`2026-07-31T08:00`), making the fixture deterministic forever. The Drive copy of the spec was updated to match.

There is a pleasing symmetry here: the incident happened because the *product* let a promise silently outlive its deadline — and the first version of the *test* had the same blind spot.

---

## State after this run

- `Demo/Test/tracking_test.spec.ts` — 5 tests, deterministic clocks, validated both directions
- `Demo/Test/Elgiganten - Min order - 2312616203.pdf` — committed evidence, wired into Run-Test MODE C as default
- `Demo/Run-Test.md` — reproducible run prompt (modes A/B/C)
- `Demo/Verification - Order 2312616203.md` — full observed-case write-up
- Drive folder (shared with Elgiganten) — synced: spec, verification doc, run prompt
- **Open:** Bring-side capture for the rule 2 completion

*Verification of a consumer-facing bug on the customer's own order, using files the customer authored — not a security test. No production systems were tested against; live pages were only read (and were unreachable).*
