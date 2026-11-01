import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf-8'));

test('SPA fallback works with cleanUrls (deep links must not 404)', () => {
  const spa = config.rewrites.find((r) => r.source === '/(.*)');
  assert.ok(spa, 'catch-all rewrite missing');
  // With cleanUrls, /index.html is served as "/", so a rewrite to "/index.html" 404s.
  if (config.cleanUrls) assert.equal(spa.destination, '/');
});

test('production CSP keeps scripts restricted to self', () => {
  const global = config.headers.find((h) => h.source === '/(.*)').headers;
  const csp = global.find((h) => h.key === 'Content-Security-Policy').value;
  assert.match(csp, /script-src 'self';/);
});
