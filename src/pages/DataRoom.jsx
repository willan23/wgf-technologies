import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PageHero from '../components/PageHero';
import { usePageMeta } from '../lib/seo';

export default function DataRoom() {
  const { t } = useLanguage();

  // Not indexed (also enforced via X-Robots-Tag in vercel.json). This page holds NO documents:
  // robots/noindex is not access control — confidential files need server-side auth first.
  usePageMeta({ title: t.dataRoom.title, description: t.dataRoom.body, path: '/investor-data-room', robots: 'noindex, nofollow' });

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
