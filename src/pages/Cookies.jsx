import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import PageHero from '../components/PageHero';

export default function Cookies() {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = `Cookies | ${company.name}`;
  }, []);

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
        <h2>Manage consent</h2>
        <p>Clear site data for this domain or contact us to update your preference.</p>
      </section>
    </div>
  );
}
