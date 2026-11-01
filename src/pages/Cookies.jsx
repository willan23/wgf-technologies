import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useConsent } from '../context/ConsentContext';
import PageHero from '../components/PageHero';
import { usePageMeta } from '../lib/seo';
import { routeMeta } from '../lib/routeMeta';
import { legalContent } from '../data/legal';
import LegalSections from '../components/LegalSections';

export default function Cookies() {
  const { t, lang } = useLanguage();
  const { choice, openSettings } = useConsent();
  usePageMeta(routeMeta('/cookies', t, lang));

  return (
    <div>
      <PageHero title={t.legal.cookiesTitle} subtitle={t.legal.updated} />
      <section className="section-block section-narrow legal-content">
        <LegalSections content={(legalContent[lang] || legalContent.EN).cookies} />
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
