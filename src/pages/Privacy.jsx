import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { legalContent } from '../data/legal';
import LegalSections from '../components/LegalSections';
import PageHero from '../components/PageHero';
import { usePageMeta } from '../lib/seo';
import { routeMeta } from '../lib/routeMeta';

export default function Privacy() {
  const { t, lang } = useLanguage();
  usePageMeta(routeMeta('/privacy', t, lang));

  return (
    <div>
      <PageHero title={t.legal.privacyTitle} subtitle={t.legal.updated} />
      <section className="section-block section-narrow legal-content">
        <LegalSections content={(legalContent[lang] || legalContent.EN).privacy} />
      </section>
    </div>
  );
}
