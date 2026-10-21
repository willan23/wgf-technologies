import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { capitalDeployment } from '../data/partners';
import PageHero from '../components/PageHero';
import { usePageMeta } from '../lib/seo';

export default function Opportunity() {
  const { t } = useLanguage();
  usePageMeta({ title: t.opportunity.title, description: t.opportunity.body, path: '/investors/opportunity' });

  return (
    <div>
      <PageHero title={t.opportunity.title} subtitle={t.opportunity.body} />
      <section className="section-block">
        <div className="feature-grid">
          {capitalDeployment.map((item) => (
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
