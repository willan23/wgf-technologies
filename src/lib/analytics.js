const CONSENT_KEY = 'wgf-analytics-consent';

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
  // Lightweight local analytics buffer — replace with provider when consented + configured
  try {
    const key = 'wgf-analytics-events';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(payload);
    localStorage.setItem(key, JSON.stringify(existing.slice(-200)));
  } catch {
    /* ignore */
  }
  if (import.meta.env.DEV) {
    console.info('[analytics]', payload);
  }
}
