import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { technologyCategories } from '../data/technology';
import PageHero from '../components/PageHero';
import { usePageMeta } from '../lib/seo';

export default function Technology() {
  const { t } = useLanguage();
  usePageMeta({ title: t.nav.technology, description: t.technology.body, path: '/technology' });

  return (
    <div>
      <PageHero title={t.technology.title} subtitle={t.technology.body} />
      <section className="section-block">
        <p className="muted">{t.technology.note}</p>
        <div className="feature-grid">
          {technologyCategories.map((item) => (
            <article key={item.id} className="feature-card glass-effect">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
