import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, LineChart, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import { getPublicProducts } from '../data/products';
import { technologyCategories } from '../data/technology';
import { markets } from '../data/markets';
import ProductCard from '../components/ProductCard';
import Symbol3D from '../components/Symbol3D';
import { trackEvent } from '../lib/analytics';

export default function Home() {
  const { t } = useLanguage();
  const products = getPublicProducts();

  useEffect(() => {
    document.title = `${company.name} | ${company.tagline}`;
  }, []);

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

      <section className="section-block">
        <div className="section-narrow">
          <h2>{t.home.positioningTitle}</h2>
          <p className="lead muted">{t.home.positioningBody}</p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header-row">
          <div>
            <h2>{t.home.snapshotTitle}</h2>
            <p className="muted">{t.home.snapshotBody}</p>
          </div>
        </div>
        <div className="chip-grid">
          {company.portfolioCategories.map((cat) => (
            <span key={cat} className="info-chip">{cat}</span>
          ))}
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
        <div className="philosophy-row">
          {company.narrative.map((step) => (
            <div key={step} className="philosophy-step glass-effect">
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block cta-panel glass-effect">
        <div>
          <h2>{t.home.investorTitle}</h2>
          <p className="muted">{t.home.investorBody}</p>
        </div>
        <Link
          to="/investors#investor-interest"
          className="btn-primary"
          onClick={() => trackEvent('investor_cta_click', { source: 'home_panel' })}
        >
          {t.home.investorCta}
        </Link>
      </section>

      <section className="section-block cta-panel glass-effect">
        <div>
          <h2>{t.home.partnersTitle}</h2>
          <p className="muted">{t.home.partnersBody}</p>
        </div>
        <Link to="/partners#partner-interest" className="btn-secondary">
          {t.home.partnersCta}
        </Link>
      </section>

      <section className="section-block founder-strip glass-effect">
        <img src={company.founder.photo} alt={company.founder.name} />
        <div>
          <h2>{t.home.founderTitle}</h2>
          <h3>{company.founder.name}</h3>
          <p className="muted">{company.founder.role}</p>
          <Link to="/founder" className="text-link">
            {t.common.learnMore} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section-block cta-panel glass-effect">
        <div>
          <h2>{t.home.contactTitle}</h2>
        </div>
        <Link to="/contact" className="btn-primary">
          {t.home.contactCta}
        </Link>
      </section>
    </div>
  );
}
