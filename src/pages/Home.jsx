import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Briefcase, HeartHandshake, LineChart, MessageSquare, Rocket, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import { getPublicProducts, STATUS } from '../data/products';
import { technologyCategories } from '../data/technology';
import { markets } from '../data/markets';
import ProductCard from '../components/ProductCard';
import Symbol3D from '../components/Symbol3D';
import { trackEvent } from '../lib/analytics';
import { usePageMeta } from '../lib/seo';

const audienceIcons = { customers: Rocket, partners: HeartHandshake, investors: LineChart };

export default function Home() {
  const { t } = useLanguage();
  const products = getPublicProducts();
  const liveProducts = products.filter((p) => p.status === STATUS.LIVE && p.url);

  // Every figure is derived from src/data — no invented metrics.
  const proof = [
    { value: products.length, label: t.home.proofPublic },
    { value: liveProducts.length, label: t.home.proofLive },
    { value: products.length - products.filter((p) => p.status === STATUS.LIVE).length, label: t.home.proofEarly },
    { value: t.home.proofBase, label: t.home.proofBaseLabel },
  ];

  usePageMeta({ description: t.home.subheadline, path: '/' });

  return (
    <div className="home-page">
      <section className="home-hero">
        <motion.div
          className="home-hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-eyebrow">{t.home.badge}</span>
          <h1>{t.home.headline}</h1>
          <p className="lead">{t.home.subheadline}</p>
          <div className="hero-actions">
            <Link to="/portfolio" className="btn-primary">
              <Briefcase size={18} /> {t.home.ctaPortfolio}
            </Link>
            <Link to="/partners" className="btn-secondary">
              <Users size={18} /> {t.home.ctaPartner}
            </Link>
            <Link
              to="/investors"
              className="text-link"
              onClick={() => trackEvent('investor_cta_click', { source: 'home_hero' })}
            >
              <LineChart size={16} /> {t.home.ctaInvestor}
            </Link>
          </div>

          {liveProducts.length > 0 && (
            <div className="live-strip">
              <span className="live-strip-label">
                <span className="live-dot" aria-hidden /> {t.home.liveNow}
              </span>
              {liveProducts.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="live-pill"
                  onClick={() => trackEvent('product_external_click', { slug: p.slug, source: 'home_live' })}
                >
                  {p.name} <ArrowUpRight size={14} aria-hidden />
                </a>
              ))}
            </div>
          )}
        </motion.div>
        <motion.div
          className="home-hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <Symbol3D size="lg" alt="WGF symbol" />
        </motion.div>
      </section>

      <section className="section-block proof-section" aria-label="WGF Technologies in numbers">
        <dl className="proof-strip glass-effect">
          {proof.map((item) => (
            <div key={item.label} className="proof-item">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section-block">
        <div className="section-narrow">
          <h2>{t.home.positioningTitle}</h2>
          <p className="lead muted">{t.home.positioningBody}</p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header-row">
          <div>
            <h2>{t.home.portfolioTitle}</h2>
            <p className="muted">{t.home.portfolioBody}</p>
          </div>
          <Link to="/portfolio" className="text-link">
            {t.home.viewAll} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <span className="section-eyebrow">{t.home.audienceEyebrow}</span>
        <h2>{t.home.audienceTitle}</h2>
        <div className="audience-grid">
          {t.home.audience.map((item) => {
            const Icon = audienceIcons[item.id];
            return (
              <article key={item.id} className={`audience-card glass-effect audience-${item.id}`}>
                <div className="audience-icon" aria-hidden>
                  <Icon size={22} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Link
                  to={item.to}
                  className="text-link"
                  onClick={() => trackEvent('audience_cta_click', { audience: item.id })}
                >
                  {item.cta} <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block two-col">
        <div>
          <h2>{t.home.techTitle}</h2>
          <p className="muted">{t.home.techBody}</p>
          <Link to="/technology" className="text-link">
            {t.common.learnMore} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mini-grid">
          {technologyCategories.slice(0, 4).map((item) => (
            <div key={item.id} className="mini-card glass-effect">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>{t.home.marketsTitle}</h2>
        <p className="muted">{t.home.marketsBody}</p>
        <div className="chip-grid">
          {markets.map((m) => (
            <Link key={m.id} to="/markets" className="info-chip link-chip">
              {m.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block philosophy">
        <h2>{t.home.philosophyTitle}</h2>
        <ol className="philosophy-row">
          {t.home.steps.map((step, i) => (
            <li key={step.title} className="philosophy-step glass-effect">
              <span className="step-number" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-block founder-strip glass-effect">
        <img src={company.founder.photo} alt={company.founder.name} loading="lazy" />
        <div>
          <h2>{t.home.founderTitle}</h2>
          <h3>{company.founder.name}</h3>
          <p className="muted">{t.founder.role}</p>
          <Link to="/founder" className="text-link">
            {t.common.learnMore} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section-block cta-panel cta-final glass-effect">
        <div>
          <h2>{t.home.contactTitle}</h2>
          <p className="muted">{t.contact.body}</p>
        </div>
        <Link to="/contact" className="btn-primary">
          <MessageSquare size={18} /> {t.home.contactCta}
        </Link>
      </section>
    </div>
  );
}
