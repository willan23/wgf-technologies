import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import PageHero from '../components/PageHero';

export default function DataRoom() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `Investor Data Room | ${company.name}`;
    const robots = document.querySelector('meta[name="robots"]');
    const prev = robots?.getAttribute('content');
    if (robots) robots.setAttribute('content', 'noindex, nofollow');
    else {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    }
    return () => {
      const current = document.querySelector('meta[name="robots"]');
      if (current && prev) current.setAttribute('content', prev);
      else if (current && !prev) current.setAttribute('content', 'index, follow');
    };
  }, []);

  return (
    <div>
      <PageHero title={t.dataRoom.title} subtitle={t.dataRoom.body} />
      <section className="section-block">
        <p className="muted">{t.dataRoom.note}</p>
        <div className="feature-grid" style={{ marginTop: '1.5rem' }}>
          {t.dataRoom.sections.map((section) => (
            <article key={section} className="feature-card glass-effect locked-card">
              <h2>{section}</h2>
              <p>Access by invitation</p>
            </article>
          ))}
        </div>
        <Link to="/investors" className="btn-primary" style={{ marginTop: '2rem' }}>
          {t.dataRoom.cta}
        </Link>
      </section>
    </div>
  );
}
