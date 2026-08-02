/**
 * Minimal reference implementation of a tracking page, for validating
 * Demo/Test/tracking_test.spec.ts in a sandbox (no real app available).
 *
 * Two modes:
 *   node server.js            -> compliant with the five rules (port 3000)
 *   BUGGY=1 node server.js    -> phantom-delivery behavior (port 3001)
 *
 * The page fetches /api/carrier/bring/status/:id client-side; the Playwright
 * spec intercepts that route and supplies the carrier responses, so this
 * server only provides the rendering logic under test.
 */
const http = require('http');

const BUGGY = !!process.env.BUGGY;
const PORT = BUGGY ? 3001 : 3000;

// Internal warehouse "optimism" — the stale promise internal systems hold.
const INTERNAL_PROMISE = { date: '2026-07-31', from: '09:00', to: '15:00' };

const compliantScript = `
  const orderId = location.pathname.split('/').pop();
  const statusEl = document.querySelector('[data-testid="tracking-status"]');
  const windowEl = document.querySelector('[data-testid="confirmed-delivery-window"]');
  const estimateEl = document.querySelector('[data-testid="estimated-delivery"]');

  function showDelayed() {
    statusEl.textContent = 'Försenad – väntar på inlämning till transportör';
    windowEl.hidden = true;
  }

  fetch('/api/carrier/bring/status/' + orderId)
    .then(r => { if (!r.ok) throw new Error('carrier http ' + r.status); return r.json(); })
    .then(data => {
      const custody = ['RECEIVED_AT_TERMINAL', 'OUT_FOR_DELIVERY'].includes(data.status);
      const win = data.expectedDelivery;
      const winExpired = win && new Date(win.date + 'T' + win.to) < new Date();

      if (custody && win && !winExpired) {
        // Rule 1/3: a confirmed window only with carrier custody.
        windowEl.textContent = 'Levereras ' + win.date + ' ' + win.from + '-' + win.to;
        windowEl.hidden = false;
        statusEl.textContent = 'Ute för leverans';
      } else if (win && winExpired && !custody) {
        // Rule 5 + stale-window rule: a promise must not survive its deadline.
        showDelayed();
      } else {
        // Rule 2: carrier truth over internal optimism.
        statusEl.textContent = 'Väntar på inlämning till transportör';
        windowEl.hidden = true;
        if (win) { estimateEl.textContent = 'Beräknad leverans: ' + win.date; estimateEl.hidden = false; }
      }
    })
    .catch(() => {
      // Rule 5: fail loud — never fall back to internal estimates as facts.
      statusEl.textContent = 'Status unavailable';
      windowEl.hidden = true;
    });
`;

const buggyScript = `
  const statusEl = document.querySelector('[data-testid="tracking-status"]');
  const windowEl = document.querySelector('[data-testid="confirmed-delivery-window"]');
  const promise = ${JSON.stringify(INTERNAL_PROMISE)};

  // Phantom delivery: render the internal promise unconditionally, ignore the carrier.
  statusEl.textContent = 'Skickad';
  windowEl.textContent = 'Förväntad leverans ' + promise.date + ' ' + promise.from + ' - ' + promise.to;
  windowEl.hidden = false;

  // Still calls the carrier API (so mocks/aborts apply) but ignores the answer.
  fetch('/api/carrier/bring/status/x').catch(() => {});
`;

const page = `<!doctype html>
<html><head><meta charset="utf-8"><title>Tracking (${BUGGY ? 'buggy' : 'compliant'})</title></head>
<body>
  <h1>Spåra din order</h1>
  <p data-testid="tracking-status">Laddar...</p>
  <p data-testid="confirmed-delivery-window" hidden></p>
  <p data-testid="estimated-delivery" hidden></p>
  <script>${BUGGY ? buggyScript : compliantScript}</script>
</body></html>`;

http.createServer((req, res) => {
  if (req.url.startsWith('/tracking/')) {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(page);
  } else if (req.url.startsWith('/api/carrier/')) {
    // Only reached if the test does NOT mock the route; behave like "no data".
    res.writeHead(502, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'no carrier data' }));
  } else {
    res.writeHead(404); res.end();
  }
}).listen(PORT, () => console.log(`${BUGGY ? 'BUGGY' : 'COMPLIANT'} tracking server on :${PORT}`));
