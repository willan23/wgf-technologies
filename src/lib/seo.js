import { useEffect } from 'react';
import { resolveHead } from './routeMeta.js';

export { absoluteUrl } from './routeMeta.js';

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-route metadata for the SPA. Every page calls this so title, description,
 * canonical, Open Graph / Twitter and robots always match the current route.
 * The same values are baked into static HTML at build time by scripts/prerender.mjs.
 */
export function usePageMeta({ title, description, path, robots, image }) {
  useEffect(() => {
    const head = resolveHead({ title, description, path, robots, image });

    document.title = head.title;
    upsertMeta('name', 'description', head.description);
    upsertMeta('name', 'robots', head.robots);
    upsertCanonical(head.url);
    upsertMeta('property', 'og:title', head.title);
    upsertMeta('property', 'og:description', head.description);
    upsertMeta('property', 'og:url', head.url);
    upsertMeta('property', 'og:image', head.image);
    upsertMeta('name', 'twitter:title', head.title);
    upsertMeta('name', 'twitter:description', head.description);
    upsertMeta('name', 'twitter:url', head.url);
    upsertMeta('name', 'twitter:image', head.image);
  }, [title, description, path, robots, image]);
}
