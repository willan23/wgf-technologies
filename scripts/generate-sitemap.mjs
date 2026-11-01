// Generates public/sitemap.xml from the static routes + products that pass isPublicProduct().
// Runs automatically before `npm run build` (prebuild), so unpublished products never leak.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getPublicProducts } from '../src/data/products.js';
import { translations } from '../src/i18n/translations.js';
import { NOINDEX, STATIC_PATHS, routeMeta } from '../src/lib/routeMeta.js';

export const SITE = 'https://www.wgf-technologies.site';

// Same route list as the per-route metadata; noindex routes (investor data room) are left out.
export const STATIC_ROUTES = STATIC_PATHS.filter((path) => routeMeta(path, translations.EN).robots !== NOINDEX);

export function sitemapPaths() {
  const productPaths = getPublicProducts().map((p) => `/portfolio/${p.slug}`);
  // Product pages sit right after /portfolio, matching the previous hand-written order.
  const [home, portfolio, ...rest] = STATIC_ROUTES;
  return [home, portfolio, ...productPaths, ...rest];
}

export function buildSitemap() {
  const urls = sitemapPaths()
    .map((path) => `  <url><loc>${SITE}${path === '/' ? '/' : path}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const out = new URL('../public/sitemap.xml', import.meta.url);
  writeFileSync(out, buildSitemap());
  console.log(`sitemap.xml written with ${sitemapPaths().length} URLs`);
}
