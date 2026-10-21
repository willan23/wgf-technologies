import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getProductBySlug, getPublicProducts, isPublicProduct, products } from '../src/data/products.js';
import { buildSitemap, sitemapPaths } from '../scripts/generate-sitemap.mjs';

test('only public + ready + live/beta/mvp products are published', () => {
  for (const p of getPublicProducts()) {
    assert.equal(p.public, true);
    assert.equal(p.ready, true);
    assert.ok(['live', 'beta', 'mvp'].includes(p.status), p.slug);
  }
});

test('unpublished products cannot be opened by slug', () => {
  for (const p of products.filter((x) => !isPublicProduct(x))) {
    assert.equal(getProductBySlug(p.slug), null, p.slug);
  }
});

test('slugs are unique and URL-safe', () => {
  const slugs = products.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const s of slugs) assert.match(s, /^[a-z0-9-]+$/);
});

test('public product URLs use https', () => {
  for (const p of getPublicProducts()) {
    if (p.url) assert.match(p.url, /^https:\/\//, p.slug);
  }
});

test('sitemap lists every public product and nothing private', () => {
  const xml = buildSitemap();
  for (const p of products) {
    assert.equal(xml.includes(`/portfolio/${p.slug}<`), isPublicProduct(p), p.slug);
  }
  assert.ok(!xml.includes('investor-data-room'));
  assert.equal(new Set(sitemapPaths()).size, sitemapPaths().length);
});

test('filterProducts matches text accent-insensitively, by market and by status', async () => {
  const { filterProducts, getProductMarkets } = await import('../src/data/products.js');
  const list = getPublicProducts();
  assert.deepEqual(filterProducts(list, {}).length, list.length);
  assert.deepEqual(filterProducts(list, { q: 'sao tome' }).map((p) => p.slug), ['stpway']);
  assert.ok(filterProducts(list, { market: 'Web3' }).every((p) => p.markets.includes('Web3')));
  assert.ok(filterProducts(list, { status: 'live' }).every((p) => p.status === 'live'));
  assert.equal(filterProducts(list, { q: 'zzz-no-match' }).length, 0);
  assert.ok(getProductMarkets(list).length > 0);
});
