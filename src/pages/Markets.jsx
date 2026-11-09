import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { markets } from '../data/markets';
import { localizeList } from '../data/localize';
import PageHero from '../components/PageHero';
import TiltCard from '../components/TiltCard';
import { usePageMeta } from '../lib/seo';
import { routeMeta } from '../lib/routeMeta';

export default function Markets() {
  const { t, lang } = useLanguage();
  usePageMeta(routeMeta('/markets', t, lang));

  return (
    <div>
      <PageHero title={t.markets.title} subtitle={t.markets.body} />
      <section className="section-block">
        <div className="markets-map glass-effect" aria-hidden="true">
          <div className="markets-3d-stage">
            <div className="map-orbit-ring map-orbit-outer" />
            <div className="map-orbit-ring map-orbit-inner" />
            <div className="map-core-sphere" />
            <div className="map-orbit">
              <span className="map-node n1">EU</span>
              <span className="map-node n2">CPLP</span>
              <span className="map-node n3">STP</span>
              <span className="map-node n4">Global</span>
            </div>
          </div>
          <p className="map-caption">{t.markets.mapCaption}</p>
        </div>
        <div className="feature-grid">
          {localizeList(markets, lang).map((item) => (
            <TiltCard key={item.id} maxTilt={7}>
              <article className="feature-card glass-effect">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </article>
            </TiltCard>
          ))}
        </div>
      </section>
    </div>
  );
}
