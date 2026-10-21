const CONSENT_KEY = 'wgf-analytics-consent';
const EVENTS_KEY = 'wgf-analytics-events';

/** 'granted' | 'denied' | null (no choice made yet) */
export function getConsentChoice() {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function getAnalyticsConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'granted';
  } catch {
    return false;
  }
}

export function setAnalyticsConsent(granted) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
    // Revoking consent also discards anything collected under it.
    if (!granted) localStorage.removeItem(EVENTS_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent('wgf-consent-change', { detail: { granted } }));
}

export function trackEvent(name, props = {}) {
  if (!getAnalyticsConsent()) return;
  const payload = {
    event: name,
    props,
    ts: new Date().toISOString(),
    path: window.location.pathname,
  };
  // Local-only debug buffer: nothing is sent to a server, so these are NOT business metrics.
  // Replace with a consented analytics provider before reporting conversion numbers.
  try {
    const existing = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
    existing.push(payload);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(existing.slice(-200)));
  } catch {
    /* ignore */
  }
  if (import.meta.env.DEV) {
    console.info('[analytics]', payload);
  }
}
