import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { partnerCategories } from '../data/partners';
import { localizeList } from '../data/localize';
import PageHero from '../components/PageHero';
import PartnerForm from '../components/PartnerForm';
import { usePageMeta } from '../lib/seo';
import { routeMeta } from '../lib/routeMeta';

export default function Partners() {
  const { t, lang } = useLanguage();
  usePageMeta(routeMeta('/partners', t, lang));

  return (
    <div>
      <PageHero title={t.partners.title} subtitle={t.partners.body} />
      <section className="section-block">
        <div className="chip-grid" style={{ marginBottom: '2rem' }}>
          {localizeList(partnerCategories, lang).map((c) => (
            <span key={c.id} className="info-chip">
              {c.title}
            </span>
          ))}
        </div>
        <div className="section-narrow">
          <PartnerForm />
        </div>
      </section>
    </div>
  );
}
