HOW TO USE THESE FILES



Overview



This folder contains an illustrative example of how to prevent "phantom delivery" bugs — cases where a tracking page shows a confirmed delivery window even though the carrier has not actually received the parcel.



The example was put together by a customer (not a developer with access to the Elgiganten codebase), following a real incident where this happened. The files are meant as a template and starting point, not as drop-in production code.



What is Playwright?



Playwright is an open-source browser automation framework. It drives a real browser (Chrome, Firefox, Safari) to click, navigate, and check what appears on a page. It is commonly used for end-to-end (E2E) testing — simulating a real user moving through a web app to confirm it behaves correctly.



tracking_test.spec.ts is a Playwright test written in TypeScript. It opens a browser, navigates to a tracking page, fakes ("mocks") the carrier API's response, and checks whether the delivery window is shown or hidden as expected.



Important: this file cannot simply be run as-is



The test currently uses:

- Placeholder CSS selectors (e.g. [data-testid="tracking-status"]) that will not exist in the real codebase
- A placeholder BASE_URL pointing at localhost
- A placeholder carrier API route

Running it without changes will fail — not because the logic is wrong, but because there is nothing real for it to check yet.



Steps for a developer to actually use it



1. Add Playwright as a dev dependency in the project, if not already present:
   npm install -D @playwright/test

2. Copy tracking_test.spec.ts into the project's test suite, e.g. tests/tracking/tracking_test.spec.ts

3. Replace the placeholder selectors with the real ones used in the tracking page's markup (e.g. real data-testid or CSS classes).

4. Replace the placeholder carrier API route with the real Bring integration endpoint used internally.

5. Point BASE_URL at a local dev server or staging environment — never production.

6. Run the test:
   npx playwright test tracking_test.spec.ts

7. Once working, add it to the normal CI pipeline so this scenario is checked automatically on every future change.



About the two rule files



The Cursor and Claude Code folders each contain an instruction file for an AI coding assistant:

- .cursorrules — read automatically by Cursor
- CLAUDE.md — read automatically by Claude Code

These are not executable. They are read by the AI assistant at the start of a coding session to steer how it writes and reviews code touching delivery status and timing. Only one is needed, depending on which tool the team uses — both express the same five rules.
