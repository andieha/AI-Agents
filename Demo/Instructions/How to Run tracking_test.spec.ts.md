# How to Run `tracking_test.spec.ts`

A short, practical checklist for getting the Playwright test file in
`Demo/Test/tracking_test.spec.ts` actually running — whether that's a quick
sandbox check or wiring it into a real project.

---

## Quick checklist

- [ ] Node.js installed (v18 or later)
- [ ] `@playwright/test` installed as a dev dependency
- [ ] A Chromium browser available to Playwright
- [ ] Something to point the test at — a real app, or the included reference server
- [ ] `BASE_URL` set to that target (never production)
- [ ] Run: `npx playwright test tracking_test.spec.ts`

---

## 1. Prerequisites

| Requirement | Why |
|---|---|
| **Node.js** (v18+) | Playwright and its test runner are Node-based. |
| **npm** (ships with Node) | Used to install Playwright. |

Check what you have:

```bash
node -v
npm -v
```

---

## 2. Install Playwright

From the project (or a scratch folder), install the test package:

```bash
npm init -y
npm install -D @playwright/test
```

This gives you the `@playwright/test` module the file imports at the top:

```ts
import { test, expect } from '@playwright/test';
```

## 3. Get a browser

Playwright needs an actual Chromium binary to drive. Two options:

- **Normal machine:** run the usual installer once —
  ```bash
  npx playwright install chromium
  ```
- **Sandboxed / restricted environment with no internet access for downloads:**
  if a Chromium binary is already present on the machine, skip the installer
  and point Playwright at it directly with a `playwright.config.ts`:
  ```ts
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    use: {
      launchOptions: {
        executablePath: '/path/to/existing/chromium',
      },
    },
  });
  ```

## 4. Give it something to test against

The file is not runnable in isolation — it needs a live page at
`${BASE_URL}/tracking/<order-id>` to visit. There are two ways to supply one:

**Option A — a real app (preferred)**
Point it at a local dev server or staging build of the actual tracking page.
This is how it would be used for real, once adapted (see the caveat below).

**Option B — no real app available**
Use the small reference server included alongside the test,
`Demo/Test/server.js`. It serves two versions of a minimal tracking page so
the suite has something concrete to pass/fail against:

```bash
node server.js            # compliant page → http://localhost:3000
BUGGY=1 node server.js    # phantom-delivery page → http://localhost:3001
```

Expected result: **5/5 tests pass** against the compliant page, and
**4/5 fail** against the buggy one — that contrast is what proves the suite
is actually catching the bug it was written for.

## 5. Point the test at your target

Set `BASE_URL` to whichever server you're using — never a production URL:

```bash
BASE_URL=http://localhost:3000 npx playwright test tracking_test.spec.ts
```

If `BASE_URL` is left unset, it defaults to `http://localhost:3000`.

## 6. Run it

```bash
npx playwright test tracking_test.spec.ts
```

Add `--reporter=list` for readable pass/fail output per test, or
`--headed` to watch it run in a visible browser window.

---

## Before this runs against a real app

The file as written uses **placeholders**, by design — it was written by
someone without access to the real codebase. Before it's useful against an
actual product, a developer needs to swap in the real values:

| Placeholder in the file | Needs to become |
|---|---|
| `selectors.status`, `.deliveryWindow`, `.estimate` (`[data-testid="..."]`) | The real `data-testid`s (or selectors) used in the tracking page's markup |
| `CARRIER_ROUTE` (`**/api/carrier/bring/status/*`) | The real Bring carrier API route the app actually calls |
| Mocked JSON shape (`status`, `expectedDelivery`, etc.) | Bring's real response schema and status codes |

Once those are real, add the test to CI so this scenario is checked
automatically on every future change — see `Instruktioner - Så används
filerna.md` for the full adoption steps.
