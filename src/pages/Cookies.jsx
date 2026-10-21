import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useConsent } from '../context/ConsentContext';
import PageHero from '../components/PageHero';
import { usePageMeta } from '../lib/seo';

export default function Cookies() {
  const { t } = useLanguage();
  const { choice, openSettings } = useConsent();
  usePageMeta({ title: 'Cookies', description: t.cookies.body, path: '/cookies' });

  return (
    <div>
      <PageHero title={t.legal.cookiesTitle} subtitle={t.legal.updated} />
      <section className="section-block section-narrow legal-content">
        <h2>Essential</h2>
        <p>Theme preference, language preference, and consent choice stored in local storage so the site works correctly.</p>
        <h2>Analytics (optional)</h2>
        <p>
          Only after consent, we may record lightweight event analytics (page path, portfolio clicks, form submissions). No unnecessary personal profiling.
        </p>
        <h2>{t.consent.settings}</h2>
        <p>
          {t.consent.current}: <strong>{t.consent[choice || 'unset']}</strong>
        </p>
        <button type="button" className="btn-secondary" onClick={openSettings}>
          {t.consent.manage}
        </button>
      </section>
    </div>
  );
}
