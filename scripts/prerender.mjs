// Bakes per-route <head> metadata into static HTML after `vite build`.
// dist/index.html is the SPA shell; for every public route we write dist/<route>.html with the
// right title, description, canonical, Open Graph / Twitter and robots tags (plus product JSON-LD).
// With `cleanUrls` Vercel serves /portfolio from portfolio.html, so crawlers and link previews
// get correct metadata without running JavaScript. React then boots exactly as before.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { translations } from '../src/i18n/translations.js';
import { company } from '../src/data/company.js';
import { getPublicProducts } from '../src/data/products.js';
import { STATIC_PATHS, productMeta, resolveHead, routeMeta } from '../src/lib/routeMeta.js';

// Static HTML is served before the visitor's language is known; English matches index.html.
const LANG = 'EN';

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`index.html is missing <meta ${attr}="${key}">`);
  return html.replace(re, `$1${escapeHtml(value)}$2`);
}

export function renderHead(shell, meta, jsonLd) {
  const head = resolveHead(meta);
  let html = shell.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(head.title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escapeHtml(head.url)}$2`);
  html = setMeta(html, 'name', 'title', head.title);
  html = setMeta(html, 'name', 'description', head.description);
  html = setMeta(html, 'name', 'robots', head.robots);
  html = setMeta(html, 'property', 'og:url', head.url);
  html = setMeta(html, 'property', 'og:title', head.title);
  html = setMeta(html, 'property', 'og:description', head.description);
  html = setMeta(html, 'property', 'og:image', head.image);
  html = setMeta(html, 'name', 'twitter:url', head.url);
  html = setMeta(html, 'name', 'twitter:title', head.title);
  html = setMeta(html, 'name', 'twitter:description', head.description);
  html = setMeta(html, 'name', 'twitter:image', head.image);
  if (jsonLd) {
    // id matches ProductDetail, which replaces this node on client-side navigation.
    const script = `<script type="application/ld+json" id="product-jsonld">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`;
    html = html.replace('</head>', `    ${script}\n  </head>`);
  }
  return html;
}

function productJsonLd(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: product.category,
    operatingSystem: 'Web',
    description: product.shortDescription,
    url: product.url || `${company.urls.site}/portfolio/${product.slug}`,
    publisher: { '@type': 'Organization', name: company.name, url: company.urls.site },
  };
}

export function prerenderPages() {
  const t = translations[LANG];
  return [
    ...STATIC_PATHS.map((path) => ({ path, meta: routeMeta(path, t, LANG) })),
    ...getPublicProducts().map((p) => ({ path: `/portfolio/${p.slug}`, meta: productMeta(p), jsonLd: productJsonLd(p) })),
  ];
}

function outputFile(distDir, path) {
  return path === '/' ? `${distDir}/index.html` : `${distDir}${path}.html`;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const distDir = fileURLToPath(new URL('../dist', import.meta.url));
  const shell = readFileSync(`${distDir}/index.html`, 'utf-8');
  const pages = prerenderPages();
  for (const { path, meta, jsonLd } of pages) {
    const file = outputFile(distDir, path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, renderHead(shell, meta, jsonLd));
  }
  console.log(`prerender: wrote head metadata for ${pages.length} routes`);
}
