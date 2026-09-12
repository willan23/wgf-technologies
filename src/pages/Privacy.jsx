import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import PageHero from '../components/PageHero';

export default function Privacy() {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = `Privacy | ${company.name}`;
  }, []);

  return (
    <div>
      <PageHero title={t.legal.privacyTitle} subtitle={t.legal.updated} />
      <section className="section-block section-narrow legal-content">
        <p>
          WGF Technologies (&quot;we&quot;) processes limited personal data when you contact us, register investor interest, or submit partnership inquiries.
        </p>
        <h2>Data we collect</h2>
        <p>Name, email, country, message content, and optional investor/partnership fields you choose to provide.</p>
        <h2>Purpose</h2>
        <p>To respond to inquiries, evaluate partnership or investor conversations, and operate our website.</p>
        <h2>Legal basis</h2>
        <p>Consent and/or legitimate interest in responding to business communications. You may withdraw consent at any time.</p>
        <h2>Retention</h2>
        <p>We retain inquiry data only as long as needed for the conversation and legitimate follow-up, then delete or anonymize it.</p>
        <h2>Sharing</h2>
        <p>We do not sell personal data. Form processors (e.g. Formspree) may process submissions as processors on our behalf.</p>
        <h2>Your rights (GDPR)</h2>
        <p>
          You may request access, rectification, erasure, restriction, or portability of your data, and lodge a complaint with a supervisory authority.
        </p>
        <h2>Contact</h2>
        <p>
          Data requests: <a href={`mailto:${company.contacts.email}`}>{company.contacts.email}</a>
        </p>
      </section>
    </div>
  );
}
