import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Briefcase,
  Code2,
  FileText,
  Globe,
  HeartHandshake,
  Layers,
  LineChart,
  MessageSquare,
  Network,
  Rocket,
  Smartphone,
  Users,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import { getPublicProducts, STATUS } from '../data/products';
import { developmentServices } from '../data/services';
import { technologyCategories } from '../data/technology';
import { markets } from '../data/markets';
import { localizeList } from '../data/localize';
import ProductCard from '../components/ProductCard';
import Symbol3D from '../components/Symbol3D';
import TiltCard from '../components/TiltCard';
import { trackEvent } from '../lib/analytics';
import { usePageMeta } from '../lib/seo';
import { routeMeta } from '../lib/routeMeta';

const audienceIcons = { customers: Rocket, partners: HeartHandshake, investors: LineChart };
const serviceIcons = { Code2, Layers, Globe, Smartphone, Bot, Network, Wrench };

export default function Home() {
  const { t, lang } = useLanguage();
  const products = getPublicProducts();
  const liveProducts = products.filter((p) => p.status === STATUS.LIVE && p.url);

  // Every figure is derived from src/data — no invented metrics.
  const proof = [
    { value: products.length, label: t.home.proofPublic },
    { value: liveProducts.length, label: t.home.proofLive },
    { value: products.length - products.filter((p) => p.status === STATUS.LIVE).length, label: t.home.proofEarly },
    { value: t.home.proofBase, label: t.home.proofBaseLabel },
  ];

  usePageMeta(routeMeta('/', t, lang));

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
            <Link
              to="/servicos/desenvolvimento-software#solicitar-projeto"
              className="btn-primary"
              onClick={() => trackEvent('service_quote_cta_click', { source: 'home_hero' })}
            >
              <FileText size={18} /> {t.home.ctaQuote}
            </Link>
            <Link to="/portfolio" className="btn-secondary">
              <Briefcase size={18} /> {t.home.ctaPortfolio}
            </Link>
            <Link to="/partners" className="text-link">
              <Users size={16} /> {t.home.ctaPartner}
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

      <section className="section-block home-services-section" aria-labelledby="home-services-heading">
        <div className="home-services-header">
          <div className="section-narrow">
            <span className="section-eyebrow">{t.services.homeEyebrow}</span>
            <h2 id="home-services-heading">{t.services.homeTitle}</h2>
            <p className="lead muted">{t.services.homeSubtitle}</p>
            <div className="hero-actions">
              <Link
                to="/servicos/desenvolvimento-software#solicitar-projeto"
                className="btn-primary"
                onClick={() => trackEvent('service_quote_cta_click', { source: 'home_services_section' })}
              >
                {t.services.homeCtaQuote} <ArrowRight size={18} />
              </Link>
              <Link
                to="/servicos/desenvolvimento-software"
                className="btn-secondary"
                onClick={() => trackEvent('services_explore_click', { source: 'home_services_section' })}
              >
                {t.services.homeCtaExplore}
              </Link>
            </div>
          </div>
        </div>

        <div className="home-services-grid">
          {localizeList(developmentServices, lang).map((service) => {
            const ServiceIcon = serviceIcons[service.icon] || Code2;
            return (
              <TiltCard key={service.id} maxTilt={7}>
                <article className="home-service-card glass-effect">
                  <div className="service-icon-box" aria-hidden="true">
                    <ServiceIcon size={22} />
                  </div>
                  <h3>{service.title}</h3>
                  <p className="muted">{service.description}</p>
                  <ul className="home-service-tags">
                    {service.items.slice(0, 3).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link
                    to={`/servicos/desenvolvimento-software?servico=${service.serviceType}#solicitar-projeto`}
                    className="text-link home-service-cta"
                    onClick={() =>
                      trackEvent('service_card_quote_click', {
                        service: service.id,
                        source: 'home_services_grid',
                      })
                    }
                  >
                    {t.services.homeCtaQuote} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              </TiltCard>
            );
          })}
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
              <TiltCard key={item.id} maxTilt={7}>
                <article className={`audience-card glass-effect audience-${item.id}`}>
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
              </TiltCard>
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
          {localizeList(technologyCategories, lang).slice(0, 4).map((item) => (
            <TiltCard key={item.id} maxTilt={8}>
              <div className="mini-card glass-effect">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>{t.home.marketsTitle}</h2>
        <p className="muted">{t.home.marketsBody}</p>
        <div className="chip-grid">
          {localizeList(markets, lang).map((m) => (
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
            <li key={step.title}>
              <TiltCard maxTilt={7}>
                <div className="philosophy-step glass-effect">
                  <span className="step-number" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </TiltCard>
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
