import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { markets } from '../data/markets';
import PageHero from '../components/PageHero';
import { usePageMeta } from '../lib/seo';

export default function Markets() {
  const { t } = useLanguage();
  usePageMeta({ title: t.nav.markets, description: t.markets.body, path: '/markets' });

  return (
    <div>
      <PageHero title={t.markets.title} subtitle={t.markets.body} />
      <section className="section-block">
        <div className="markets-map glass-effect" aria-hidden="true">
          <div className="map-orbit">
            <span className="map-node n1">EU</span>
            <span className="map-node n2">CPLP</span>
            <span className="map-node n3">STP</span>
            <span className="map-node n4">Global</span>
          </div>
          <p className="map-caption">Opportunity markets — not claimed physical offices</p>
        </div>
        <div className="feature-grid">
          {markets.map((item) => (
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
