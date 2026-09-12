import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { technologyCategories } from '../data/technology';
import { company } from '../data/company';
import PageHero from '../components/PageHero';

export default function Technology() {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = `Technology | ${company.name}`;
  }, []);

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
