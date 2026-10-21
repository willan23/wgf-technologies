import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../lib/seo';

export default function NotFound() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  // Static hosting still answers 200 for SPA routes; noindex keeps these out of search results.
  usePageMeta({ title: t.notFound.title, description: t.notFound.body, path: pathname, robots: 'noindex, follow' });

  return (
    <section className="section-block not-found">
      <div>
        <p className="not-found-code" aria-hidden>404</p>
        <h1>{t.notFound.title}</h1>
        <p className="lead muted">{t.notFound.body}</p>
        <div className="hero-actions">
          <Link to="/" className="btn-primary">
            {t.notFound.home}
          </Link>
          <Link to="/portfolio" className="btn-secondary">
            {t.notFound.portfolio}
          </Link>
        </div>
      </div>
    </section>
  );
}
