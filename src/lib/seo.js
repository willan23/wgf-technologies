import { useEffect } from 'react';
import { company } from '../data/company';

const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

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

export function absoluteUrl(path = '/') {
  return path === '/' ? company.urls.canonical : `${company.urls.site}${path}`;
}

/**
 * Per-route metadata for the SPA. Every page calls this so title, description,
 * canonical, Open Graph / Twitter and robots always match the current route
 * (index.html only carries the homepage defaults).
 */
export function usePageMeta({ title, description, path, robots = DEFAULT_ROBOTS, image = company.assets.ogImage }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${company.name}` : `${company.name} | ${company.tagline}`;
    const desc = description || company.description;
    const url = absoluteUrl(path);
    const imageUrl = image.startsWith('http') ? image : `${company.urls.site}${image}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'robots', robots);
    upsertCanonical(url);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:url', url);
    upsertMeta('name', 'twitter:image', imageUrl);
  }, [title, description, path, robots, image]);
}
