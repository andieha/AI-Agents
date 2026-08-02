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
});

/**
 * Suggested companion test (support dashboard, separate spec + auth):
 * assert that the agent-facing view shows the same carrier status as the
 * customer-facing page, so an agent cannot confirm a delivery the carrier
 * has no record of.
 */
