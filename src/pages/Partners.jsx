import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { partnerCategories } from '../data/partners';
import { company } from '../data/company';
import PageHero from '../components/PageHero';
import PartnerForm from '../components/PartnerForm';

export default function Partners() {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = `Partners | ${company.name}`;
  }, []);

  return (
    <div>
      <PageHero title={t.partners.title} subtitle={t.partners.body} />
      <section className="section-block">
        <div className="chip-grid" style={{ marginBottom: '2rem' }}>
          {partnerCategories.map((c) => (
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
