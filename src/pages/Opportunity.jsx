import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { capitalDeployment } from '../data/partners';
import PageHero from '../components/PageHero';
import { usePageMeta } from '../lib/seo';
import { routeMeta } from '../lib/routeMeta';

export default function Opportunity() {
  const { t, lang } = useLanguage();
  usePageMeta(routeMeta('/investors/opportunity', t, lang));

  return (
    <div>
      <PageHero title={t.opportunity.title} subtitle={t.opportunity.body} />
      <section className="section-block">
        <div className="feature-grid">
          {(capitalDeployment[lang] || capitalDeployment.EN).map((item) => (
            <article key={item} className="feature-card glass-effect">
              <h2>{item}</h2>
            </article>
          ))}
        </div>
        <p className="legal-note" style={{ marginTop: '1.5rem' }}>
          {t.investors.legalNote}
        </p>
        <Link to="/investors" className="btn-secondary" style={{ marginTop: '1rem' }}>
          {t.opportunity.back}
        </Link>
      </section>
    </div>
  );
}
