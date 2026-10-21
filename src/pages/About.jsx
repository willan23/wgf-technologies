import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import PageHero from '../components/PageHero';
import { usePageMeta } from '../lib/seo';

export default function About() {
  const { t } = useLanguage();
  usePageMeta({ title: t.nav.about, path: '/about' });

  return (
    <div>
      <PageHero title={t.about.title} />
      <section className="section-block section-narrow content-stack">
        <p className="lead">{t.about.p1}</p>
        <p>{t.about.p2}</p>
        <div className="chip-grid">
          {t.about.pillars.map((pillar) => (
            <span key={pillar} className="info-chip">
              {pillar}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
