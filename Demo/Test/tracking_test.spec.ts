/**
 * ILLUSTRATIVE EXAMPLE — written by an external customer without access to
 * the Elgiganten codebase.
 *
 * Selectors, API routes and status codes below are PLACEHOLDERS. They are
 * meant to show the shape of the regression test, not to run as-is.
 * Replace with real test IDs, the real carrier endpoint and Bring's actual
 * status codes.
 *
 * Run against a local or staging environment (BASE_URL), never production.
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const TEST_ORDER_ID = 'test-order-id';

const CARRIER_ROUTE = '**/api/carrier/bring/status/*';

/** Placeholder — map to Elgiganten's real test IDs. */
const selectors = {
  status: '[data-testid="tracking-status"]',
  deliveryWindow: '[data-testid="confirmed-delivery-window"]',
  estimate: '[data-testid="estimated-delivery"]',
};

test.describe('Tracking page — carrier sync integrity', () => {

  test('hides the delivery window when the carrier has not received the parcel', async ({ page }) => {
    await page.route(CARRIER_ROUTE, route =>
      route.fulfill({
        json: { carrier: 'Bring', status: 'NOT_RECEIVED', expectedDelivery: null },
      })
    );

    await page.goto(`${BASE_URL}/tracking/${TEST_ORDER_ID}`);

    // Customer must see the carrier's truth, not internal warehouse optimism.
    await expect(page.locator(selectors.status)).toContainText(/väntar på inlämning|awaiting carrier/i);

    // Core regression: no confirmed time window may be rendered.
    await expect(page.locator(selectors.deliveryWindow)).toBeHidden();
  });

  test('shows the delivery window once the carrier confirms custody', async ({ page }) => {
    // Freeze the clock INSIDE the promised window — without this, the fixed
    // fixture date silently expires and the test starts failing against any
    // implementation with stale-window protection (found in a real run).
    await page.clock.setFixedTime(new Date('2026-07-31T08:00:00+02:00'));

    await page.route(CARRIER_ROUTE, route =>
      route.fulfill({
        json: {
          carrier: 'Bring',
          status: 'OUT_FOR_DELIVERY',
          expectedDelivery: { date: '2026-07-31', from: '09:00', to: '15:00' },
        },
      })
    );

    await page.goto(`${BASE_URL}/tracking/${TEST_ORDER_ID}`);

    await expect(page.locator(selectors.deliveryWindow)).toBeVisible();
    await expect(page.locator(selectors.deliveryWindow)).toContainText('09:00');
  });

  test('degrades safely when the carrier API is unavailable', async ({ page }) => {
    await page.route(CARRIER_ROUTE, route => route.abort());

    await page.goto(`${BASE_URL}/tracking/${TEST_ORDER_ID}`);

    // Never fall back to an internal estimate presented as a confirmed window.
    await expect(page.locator(selectors.deliveryWindow)).toBeHidden();
  });

  test('an estimate is never rendered as a confirmed window', async ({ page }) => {
    await page.route(CARRIER_ROUTE, route =>
      route.fulfill({
        json: { carrier: 'Bring', status: 'NOT_RECEIVED', expectedDelivery: null },
      })
    );

    await page.goto(`${BASE_URL}/tracking/${TEST_ORDER_ID}`);

    // An estimate may appear, but must live in its own labelled component.
    await expect(page.locator(selectors.deliveryWindow)).toBeHidden();
  });

  /**
   * Added after a real observed incident (order 2312616203, July 2026 — see
   * "Verification - Order 2312616203.md"): the page kept headlining
   * "Förväntad leverans 31 juli 09:00-15:00" two days AFTER that window had
   * passed, while the parcel had still not reached the carrier. A promise
   * must not silently survive its own deadline.
   */
  test('a stale window does not survive its own deadline', async ({ page }) => {
    // Freeze the browser clock AFTER the promised window has expired.
    await page.clock.setFixedTime(new Date('2026-08-02T10:00:00+02:00'));

    await page.route(CARRIER_ROUTE, route =>
      route.fulfill({
        json: {
          carrier: 'Bring',
          status: 'NOT_RECEIVED',
          // Internal systems may still hold the old promise — the UI must not repeat it.
          expectedDelivery: { date: '2026-07-31', from: '09:00', to: '15:00' },
        },
      })
    );

    await page.goto(`${BASE_URL}/tracking/${TEST_ORDER_ID}`);

    // The expired promise must be gone…
    await expect(page.locator(selectors.deliveryWindow)).toBeHidden();

    // …and replaced by an explicit delayed/unknown state — fail loud, not silent.
    await expect(page.locator(selectors.status)).toContainText(/försenad|delayed|status unavailable|väntar på inlämning/i);
  });
});

/**
 * Suggested companion test (support dashboard, separate spec + auth):
 * assert that the agent-facing view shows the same carrier status as the
 * customer-facing page, so an agent cannot confirm a delivery the carrier
 * has no record of.
 */
