import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { company, fundingStageLabels } from '../data/company';
import PageHero from '../components/PageHero';
import InvestorForm from '../components/InvestorForm';
import { trackEvent } from '../lib/analytics';

export default function Investors() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `Investors | ${company.name}`;
    trackEvent('investor_page_view');
  }, []);

  return (
    <div>
      <PageHero title={t.investors.title} subtitle={t.investors.subheadline} />

      <section className="section-block two-col">
        <article className="content-stack">
          <h2>{t.investors.opportunityTitle}</h2>
          <p>{t.investors.opportunityBody}</p>
          <h2>{t.investors.whyTitle}</h2>
          <ul className="clean-list">
            {t.investors.why.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>{t.investors.stageTitle}</h2>
          <span className="info-chip stage-chip">{fundingStageLabels[company.fundingStage]}</span>
          <h2>{t.investors.thesisTitle}</h2>
          <p>{t.investors.thesisBody}</p>
          <Link to="/investors/opportunity" className="text-link">
            {t.investors.opportunityLink} →
          </Link>
        </article>
        <InvestorForm />
      </section>

      <section className="section-block cta-panel glass-effect">
        <div>
          <h2>{t.investors.ctaTitle}</h2>
          <p className="muted">{t.investors.ctaBody}</p>
          <p className="legal-note">{t.investors.legalNote}</p>
        </div>
        <a href="#investor-interest" className="btn-primary">
          {t.investors.ctaButton}
        </a>
      </section>
    </div>
  );
}
