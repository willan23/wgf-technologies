import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import PageHero from '../components/PageHero';
import { usePageMeta } from '../lib/seo';

export default function Terms() {
  const { t } = useLanguage();
  usePageMeta({ title: t.legal.termsTitle, path: '/terms' });

  return (
    <div>
      <PageHero title={t.legal.termsTitle} subtitle={t.legal.updated} />
      <section className="section-block section-narrow legal-content">
        <p>By using this website you agree to these terms.</p>
        <h2>Informational content</h2>
        <p>
          Content describes WGF Technologies and its products for informational purposes. Product availability and features may change.
        </p>
        <h2>No securities offer</h2>
        <p>
          Investor Relations materials and interest forms do not constitute an offer to sell securities, equity, or investment products. Any investment process requires a separate qualified conversation and legal structure.
        </p>
        <h2>Crypto / Web3 products</h2>
        <p>
          Where crypto-related products are presented, information is observational only and is not financial advice.
        </p>
        <h2>Contact</h2>
        <p>
          Questions: <a href={`mailto:${company.contacts.email}`}>{company.contacts.email}</a>
        </p>
      </section>
    </div>
  );
}
