# Test Results — Did the tracking page lie, and would our tests have caught it?

**Date:** August 2, 2026
**Order:** 2312616203 (Dreame robot mower, never delivered)

This run answered three questions. Short version of the answers:

1. **Did the tracking page lie?** Yes — the saved copy of the page proves it.
2. **Would the tests in this folder have caught it?** Yes — proven by running them.
3. **Is anything still unverified?** One thing — what Bring's own tracking page says. Only you can open that link.

---

## Question 1: Did the tracking page lie?

I examined the saved PDF of the order page (`Test/Elgiganten - Min order - 2312616203.pdf`), captured August 2.

**What the page said, side by side:**

| The page promised | The page's own status said |
|---|---|
| "Förväntad leverans **31 juli 2026 09:00 - 15:00**" (big headline) | "Skickad — på väg till **vår terminal**" — the parcel had not even reached Elgiganten's own terminal, let alone Bring |

Two more problems:

- **The promise was dead and still on display.** The page was captured on August 2 — two days AFTER the promised July 31 window — and the headline still showed it, with no "delayed" message.
- **Support told you the opposite of what Bring told you.** On July 28 and again July 31, Elgiganten support said the delivery was on track. Bring, when you called them directly, said they had never received the parcel and had no record of Elgiganten contacting them.

**Conclusion: the page showed a precise delivery promise that had no basis in reality, and kept showing it after it expired. This is exactly the "phantom delivery" problem the files in this folder are about.**

**Likely explanation** (not yet confirmed): the page links to a real Bring parcel number (370727790063193606). That means Elgiganten *registered* a shipment with Bring electronically — but registering is not the same as handing over the parcel. The page seems to treat "registered" as "Bring has it."

---

## Question 2: Would the tests have caught it?

The folder contains 5 automated tests (`Test/tracking_test.spec.ts`). They can't run against Elgiganten's real website (we don't have their code, and tests must never run against production). So I built two small fake tracking pages on my own machine:

- **A "broken" page** that behaves like Elgiganten's did: always shows the delivery promise, ignores what the carrier says.
- **A "correct" page** that follows the five rules: only shows a time window after the carrier has actually scanned the parcel.

Then I ran the 5 tests against both:

| | Broken page (like Elgiganten's) | Correct page |
|---|---|---|
| Result | **4 of 5 tests FAILED** | **5 of 5 tests passed** |

That is exactly what should happen: **the tests light up red on a page with this bug, and stay green on a page without it.** If Elgiganten had these tests (adapted to their code) in place, the bug on your order could not have reached customers unnoticed.

**Bonus finding:** the first run also revealed a mistake in one of *our own* tests — it used the fixed date July 31 without freezing the test's clock, so from August onward it wrongly failed even correct pages. Fixed. (Ironic: our test briefly had the same flaw as the page — a date that silently went stale.)

---

## Question 3: What's still unverified?

One item: **what Bring's own tracking page shows** for parcel 370727790063193606
(https://tracking.bring.se/tracking/370727790063193606).

I could not open it from here — both Elgiganten's and Bring's sites refuse automated access. If you open that link in your browser and save it as PDF (like you did with the order page), that would be the final piece of evidence: Bring's own record confirming they never received the parcel while Elgiganten's page promised a delivery time.

---

## Where everything is

| File | What it is |
|---|---|
| `Test/tracking_test.spec.ts` | The 5 automated tests |
| `Test/Elgiganten - Min order - 2312616203.pdf` | The saved order page (the evidence) |
| `Run-Test.md` | Instructions to repeat this whole check |
| `Verification - Order 2312616203.md` | The detailed rule-by-rule analysis |
| `Results/` (this folder) | One results document per run |

*This was a check of a consumer bug on your own order, using files you authored. Nothing was tested against Elgiganten's live systems — their pages were only read (and weren't even reachable).*
