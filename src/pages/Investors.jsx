import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { company, fundingStageLabels } from '../data/company';
import { getPublicProducts } from '../data/products';
import PageHero from '../components/PageHero';
import InvestorForm from '../components/InvestorForm';
import { trackEvent } from '../lib/analytics';
import { whatsappUrl } from '../lib/forms';

export default function Investors() {
  const { t } = useLanguage();
  const featured = getPublicProducts().find((p) => p.featured) || getPublicProducts()[0];

  useEffect(() => {
    document.title = `Investors | ${company.name}`;
    trackEvent('investor_page_view');
  }, []);

  return (
    <div>
      <PageHero
        title={t.investors.title}
        subtitle={t.investors.subheadline}
        actions={
          <>
            <span className="info-chip stage-chip">
              {fundingStageLabels[company.fundingStage]} · {t.investors.openBadge}
            </span>
            <a
              href="#investor-interest"
              className="btn-primary"
              onClick={() => trackEvent('investor_cta_click', { source: 'investors_hero' })}
            >
              {t.investors.ctaButton}
            </a>
          </>
        }
      />

      {featured && (
        <section className="section-block">
          <article className="cta-panel glass-effect" style={{ alignItems: 'flex-start' }}>
            <div>
              <span className="section-eyebrow">{t.investors.featuredLabel}</span>
              <h2 style={{ marginTop: '0.75rem' }}>{featured.name}</h2>
              <p className="muted">{featured.shortDescription}</p>
              <div className="chip-grid" style={{ marginTop: '0.85rem' }}>
                {featured.businessModel.slice(0, 3).map((m) => (
                  <span key={m} className="info-chip">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <Link to={`/portfolio/${featured.slug}`} className="btn-secondary">
                {t.common.learnMore}
              </Link>
              {featured.url && (
                <a href={featured.url} target="_blank" rel="noreferrer" className="btn-primary">
                  <ExternalLink size={16} /> {t.product.visit}
                </a>
              )}
            </div>
          </article>
        </section>
      )}

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
          <p className="muted" style={{ marginTop: '0.75rem' }}>
            {t.investors.openBody}
          </p>
          <h2>{t.investors.thesisTitle}</h2>
          <p>{t.investors.thesisBody}</p>
          <Link to="/investors/opportunity" className="text-link">
            {t.investors.opportunityLink} →
          </Link>
        </article>
        <div className="content-stack">
          <InvestorForm defaultProduct="WGF IP Shield" />
          <a
            className="btn-secondary"
            href={whatsappUrl(
              'Hello WGF Investor Relations — I am interested in investing / strategic capital for WGF Technologies / WGF IP Shield.',
            )}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('investor_cta_click', { source: 'investors_whatsapp' })}
          >
            <MessageSquare size={16} /> {t.investors.whatsappCta}
          </a>
        </div>
      </section>

      <section className="section-block cta-panel glass-effect">
        <div>
          <h2>{t.investors.ctaTitle}</h2>
          <p className="muted">{t.investors.ctaBody}</p>
          <p className="legal-note">{t.investors.noPaymentNote}</p>
          <p className="legal-note">{t.investors.legalNote}</p>
        </div>
        <a
          href="#investor-interest"
          className="btn-primary"
          onClick={() => trackEvent('investor_cta_click', { source: 'investors_bottom' })}
        >
          {t.investors.ctaButton}
        </a>
      </section>
    </div>
  );
}
