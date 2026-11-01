// Single source of per-route metadata. Used by usePageMeta in the browser and by
// scripts/prerender.mjs at build time, so crawlers and the SPA always agree.
// Pure module with explicit .js imports so node can load it.
import { company } from '../data/company.js';
import { legalContent } from '../data/legal.js';

export const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
export const NOINDEX = 'noindex, nofollow';

const staticRoutes = {
  '/': (t) => ({ description: t.home.subheadline }),
  '/portfolio': (t) => ({ title: t.nav.portfolio, description: t.portfolio.body }),
  '/technology': (t) => ({ title: t.nav.technology, description: t.technology.body }),
  '/markets': (t) => ({ title: t.nav.markets, description: t.markets.body }),
  '/about': (t) => ({ title: t.nav.about, description: t.about.p1 }),
  '/founder': (t) => ({ title: t.nav.founder, description: `${company.founder.name} — ${t.founder.role}` }),
  '/investors': (t) => ({ title: t.nav.investors, description: t.investors.subheadline }),
  '/investors/opportunity': (t) => ({ title: t.opportunity.title, description: t.opportunity.body }),
  '/partners': (t) => ({ title: t.nav.partners, description: t.partners.body }),
  '/contact': (t) => ({ title: t.nav.contact, description: t.contact.body }),
  '/privacy': (t, lang) => ({ title: t.legal.privacyTitle, description: (legalContent[lang] || legalContent.EN).privacy.intro }),
  '/terms': (t) => ({ title: t.legal.termsTitle }),
  '/cookies': (t) => ({ title: t.legal.cookiesTitle, description: t.cookies.body }),
  '/investor-data-room': (t) => ({ title: t.dataRoom.title, description: t.dataRoom.body, robots: NOINDEX }),
};

export const STATIC_PATHS = Object.keys(staticRoutes);

export function routeMeta(path, t, lang = 'EN') {
  const build = staticRoutes[path];
  if (!build) throw new Error(`No metadata for route ${path}`);
  return { path, ...build(t, lang) };
}

export function productMeta(product) {
  return { title: product.name, description: product.shortDescription, path: `/portfolio/${product.slug}` };
}

export function absoluteUrl(path = '/') {
  return path === '/' ? company.urls.canonical : `${company.urls.site}${path}`;
}

/** Resolves the final head values (full title, absolute URLs, defaults). */
export function resolveHead({ title, description, path = '/', robots = DEFAULT_ROBOTS, image = company.assets.ogImage }) {
  return {
    title: title ? `${title} | ${company.name}` : `${company.name} | ${company.tagline}`,
    description: description || company.description,
    url: absoluteUrl(path),
    image: image.startsWith('http') ? image : `${company.urls.site}${image}`,
    robots,
  };
}
