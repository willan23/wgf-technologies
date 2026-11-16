import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { translations } from '../src/i18n/translations.js';
import { getPublicProducts, localizeProduct, productTranslations, products, tagLabel } from '../src/data/products.js';
import { markets } from '../src/data/markets.js';
import { technologyCategories } from '../src/data/technology.js';
import {
  commercialProcess,
  developmentServices,
  serviceDifferentiators,
  servicesFaq,
} from '../src/data/services.js';
import { capitalDeployment, partnerCategories } from '../src/data/partners.js';
import { legalContent } from '../src/data/legal.js';
import { localize } from '../src/data/localize.js';
import { STATIC_PATHS, resolveHead, routeMeta } from '../src/lib/routeMeta.js';
import { prerenderPages, renderHead } from '../scripts/prerender.mjs';

const LANGS = ['EN', 'PT', 'FR'];

function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  return typeof value;
}

test('every public product has PT and FR copy with the same structure as EN', () => {
  for (const product of getPublicProducts()) {
    for (const lang of ['PT', 'FR']) {
      const override = productTranslations[product.slug]?.[lang];
      assert.ok(override, `${product.slug} missing ${lang}`);
      for (const [key, value] of Object.entries(override)) {
        assert.ok(key in product, `${product.slug}.${lang}.${key} is not a product field`);
        assert.deepEqual(shape(value), shape(product[key]), `${product.slug}.${lang}.${key} shape differs from EN`);
      }
    }
  }
});

test('localizeProduct keeps canonical markets and falls back to EN', () => {
  const base = getPublicProducts()[0];
  const pt = localizeProduct(base, 'PT');
  assert.deepEqual(pt.markets, base.markets);
  assert.equal(pt.url, base.url);
  assert.notEqual(pt.shortDescription, base.shortDescription);
  assert.equal(localizeProduct(base, 'EN'), base);
  const privateProduct = products.find((p) => !p.public);
  assert.equal(localizeProduct(privateProduct, 'PT').shortDescription, privateProduct.shortDescription);
});

test('market / business-model tags translate and unknown tags pass through', () => {
  assert.equal(tagLabel('Mobility', 'PT'), 'Mobilidade');
  assert.equal(tagLabel('Web3', 'PT'), 'Web3');
  assert.equal(tagLabel('Mobility', 'EN'), 'Mobility');
});

test('data lists have PT/FR text wherever EN differs', () => {
  for (const list of [markets, technologyCategories, developmentServices, commercialProcess, serviceDifferentiators]) {
    for (const item of list) {
      for (const lang of ['PT', 'FR']) {
        const local = localize(item, lang);
        assert.ok(local.description !== item.description, `${item.id} description untranslated in ${lang}`);
      }
    }
  }
  assert.equal(developmentServices.length, 7);
  for (const svc of developmentServices) {
    assert.equal(svc.items.length, 7, `${svc.id} should have 7 items`);
    assert.equal(localize(svc, 'PT').items.length, 7, `${svc.id} PT items`);
    assert.equal(localize(svc, 'FR').items.length, 7, `${svc.id} FR items`);
  }
  assert.equal(commercialProcess.length, 5);
  assert.equal(serviceDifferentiators.length, 8);
  assert.equal(servicesFaq.length, 5);
  for (const faq of servicesFaq) {
    assert.notEqual(localize(faq, 'PT').question, faq.question);
    assert.notEqual(localize(faq, 'FR').question, faq.question);
  }
  assert.ok(localize(partnerCategories[0], 'PT').title === 'Tecnologia');
  for (const lang of LANGS) assert.equal(capitalDeployment[lang].length, capitalDeployment.EN.length);
});

test('legal copy exists for every language with matching sections', () => {
  for (const lang of LANGS) {
    for (const page of ['privacy', 'terms', 'cookies']) {
      assert.equal(legalContent[lang][page].sections.length, legalContent.EN[page].sections.length, `${lang}.${page}`);
    }
  }
});

test('route metadata resolves for every route in every language', () => {
  for (const lang of LANGS) {
    for (const path of STATIC_PATHS) {
      const head = resolveHead(routeMeta(path, translations[lang], lang));
      assert.ok(head.title && head.description && head.url.startsWith('https://'), `${lang} ${path}`);
    }
  }
});

test('every SPA route in App.jsx has metadata (and vice versa)', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf-8');
  const routes = [...app.matchAll(/path="([^"*:]+)"/g)].map((m) => `/${m[1]}`);
  for (const route of routes) assert.ok(STATIC_PATHS.includes(route), `missing metadata for ${route}`);
  for (const path of STATIC_PATHS.filter((p) => p !== '/')) assert.ok(routes.includes(path), `metadata for unknown route ${path}`);
});

test('prerender writes route-specific head tags and product JSON-LD', () => {
  const shell = readFileSync(new URL('../index.html', import.meta.url), 'utf-8');
  const pages = prerenderPages();
  const stpway = pages.find((p) => p.path === '/portfolio/stpway');
  const html = renderHead(shell, stpway.meta, stpway.jsonLd);
  assert.match(html, /<title>STPway \| WGF Technologies<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.wgf-technologies\.site\/portfolio\/stpway"/);
  assert.match(html, /property="og:url" content="https:\/\/www\.wgf-technologies\.site\/portfolio\/stpway"/);
  assert.match(html, /id="product-jsonld"/);
  const dataRoom = pages.find((p) => p.path === '/investor-data-room');
  assert.match(renderHead(shell, dataRoom.meta), /name="robots" content="noindex, nofollow"/);
  const servicesPage = pages.find((p) => p.path === '/servicos/desenvolvimento-software');
  assert.ok(servicesPage, 'services route prerendered');
  const servicesHtml = renderHead(shell, servicesPage.meta, servicesPage.jsonLd);
  assert.match(servicesHtml, /https:\/\/www\.wgf-technologies\.site\/servicos\/desenvolvimento-software/);
  assert.match(servicesHtml, /FAQPage/);
  assert.ok(!pages.some((p) => products.some((x) => !x.public && p.path.endsWith(x.slug))), 'private product prerendered');
});
