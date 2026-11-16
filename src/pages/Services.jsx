import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  Globe,
  Layers,
  Mail,
  MessageSquare,
  Network,
  ShieldCheck,
  Smartphone,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import { localizeList } from '../data/localize';
import {
  commercialProcess,
  developmentServices,
  serviceDifferentiators,
  servicesFaq,
} from '../data/services';
import PageHero from '../components/PageHero';
import ProjectQuoteForm from '../components/ProjectQuoteForm';
import TiltCard from '../components/TiltCard';
import { trackEvent } from '../lib/analytics';
import { whatsappUrl } from '../lib/forms';
import { routeMeta } from '../lib/routeMeta';
import { usePageMeta } from '../lib/seo';
import { ALLOWED_SERVICE_TYPES } from '../lib/validation';

const SERVICE_ICONS = {
  Code2,
  Layers,
  Globe,
  Smartphone,
  Bot,
  Network,
  Wrench,
};

export default function Services() {
  const { t, lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const paramService = searchParams.get('servico') || searchParams.get('service') || '';
  const [selectedService, setSelectedService] = useState(() =>
    ALLOWED_SERVICE_TYPES.includes(paramService) ? paramService : 'custom-software',
  );

  usePageMeta(routeMeta('/servicos/desenvolvimento-software', t, lang));

  const servicesList = localizeList(developmentServices, lang);
  const processSteps = localizeList(commercialProcess, lang);
  const differentiators = localizeList(serviceDifferentiators, lang);
  const faqList = localizeList(servicesFaq, lang);

  useEffect(() => {
    trackEvent('services_page_view', { lang });
  }, [lang]);

  useEffect(() => {
    if (paramService && ALLOWED_SERVICE_TYPES.includes(paramService)) {
      setSelectedService(paramService);
    }
  }, [paramService]);

  useEffect(() => {
    if (location.hash === '#solicitar-projeto') {
      const el = document.getElementById('solicitar-projeto');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    }
  }, [location.hash]);

  // Inject Service + FAQPage JSON-LD structured data
  useEffect(() => {
    const existing = document.getElementById('services-jsonld');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'services-jsonld';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: t.services.metaTitle,
          description: t.services.metaDescription,
          url: `${company.urls.site}/servicos/desenvolvimento-software`,
          provider: {
            '@type': 'Organization',
            name: company.name,
            url: company.urls.site,
          },
          areaServed: ['PT', 'EU', 'Global'],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: t.services.catalogTitle,
            itemListElement: servicesList.map((s) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: s.title,
                description: s.description,
              },
            })),
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqList.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        },
      ],
    });
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [lang, t.services.metaTitle, t.services.metaDescription, t.services.catalogTitle, servicesList, faqList]);

  const handleSelectServiceForQuote = (serviceType, serviceId) => {
    setSelectedService(serviceType);
    const next = new URLSearchParams(searchParams);
    next.set('servico', serviceType);
    setSearchParams(next, { replace: true });
    trackEvent('service_card_quote_click', { service: serviceId, serviceType });

    const section = document.getElementById('solicitar-projeto');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="services-page">
      <PageHero
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        subtitle={t.services.subtitle}
        actions={
          <>
            <a
              href="#solicitar-projeto"
              className="btn-primary"
              onClick={() => trackEvent('service_quote_cta_click', { source: 'services_hero' })}
            >
              {t.services.ctaQuote} <ArrowRight size={18} />
            </a>
            <a
              href={whatsappUrl(
                'Olá WGF Technologies, gostaria de conversar sobre o desenvolvimento de um projeto tecnológico.',
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              onClick={() => trackEvent('service_whatsapp_click', { source: 'services_hero' })}
            >
              <MessageSquare size={18} /> {t.services.ctaWhatsapp}
            </a>
          </>
        }
      />

      {/* 1. Catálogo dos 7 Serviços de Desenvolvimento */}
      <section className="section-block" aria-labelledby="services-catalog-heading">
        <div className="section-narrow">
          <span className="section-eyebrow">{t.services.catalogEyebrow}</span>
          <h2 id="services-catalog-heading">{t.services.catalogTitle}</h2>
          <p className="lead muted">{t.services.catalogBody}</p>
        </div>

        <div className="services-catalog-grid">
          {servicesList.map((service, index) => {
            const IconComponent = SERVICE_ICONS[service.icon] || Code2;
            return (
              <TiltCard key={service.id} maxTilt={6} className="service-card-tilt">
                <article className="service-detail-card glass-effect">
                  <div className="service-card-header">
                    <div className="service-icon-box" aria-hidden="true">
                      <IconComponent size={24} />
                    </div>
                    <span className="service-number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>

                  <div className="service-deliverables">
                    <span className="service-deliverables-label">{t.services.deliverablesLabel}</span>
                    <ul className="clean-list service-items-list">
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="service-quote-link"
                    onClick={() => handleSelectServiceForQuote(service.serviceType, service.id)}
                  >
                    {t.services.requestServiceCta} <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </article>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* 2. Processo Comercial ("Como Trabalhamos") */}
      <section className="section-block" aria-labelledby="commercial-process-heading">
        <div className="section-narrow">
          <span className="section-eyebrow">{t.services.processEyebrow}</span>
          <h2 id="commercial-process-heading">{t.services.processTitle}</h2>
          <p className="lead muted">{t.services.processBody}</p>
        </div>

        <ol className="commercial-process-grid">
          {processSteps.map((step) => (
            <li key={step.id}>
              <TiltCard maxTilt={6}>
                <div className="philosophy-step process-step-card glass-effect">
                  <span className="step-number">{step.number}</span>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </TiltCard>
            </li>
          ))}
        </ol>

        <aside className="legal-callout process-transparency-note glass-effect">
          <p>{t.services.processNote}</p>
        </aside>
      </section>

      {/* 3. Área de Diferenciação */}
      <section className="section-block" aria-labelledby="differentiation-heading">
        <div className="section-narrow">
          <span className="section-eyebrow">{t.services.diffEyebrow}</span>
          <h2 id="differentiation-heading">{t.services.diffTitle}</h2>
          <p className="lead muted">{t.services.diffBody}</p>
        </div>

        <div className="differentiators-grid">
          {differentiators.map((item) => (
            <TiltCard key={item.id} maxTilt={6}>
              <article className="differentiator-card glass-effect">
                <div className="differentiator-icon" aria-hidden="true">
                  <ShieldCheck size={20} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 4. Formulário Inteligente de Pedidos de Orçamento ("Solicitar um Projeto") */}
      <section
        id="solicitar-projeto"
        className="section-block quote-request-section"
        aria-labelledby="quote-request-heading"
      >
        <div className="quote-request-layout">
          <div className="content-stack quote-request-info">
            <div>
              <span className="section-eyebrow">{t.services.quoteEyebrow}</span>
              <h2 id="quote-request-heading">{t.services.quoteTitle}</h2>
              <p className="lead muted">{t.services.quoteBody}</p>
            </div>

            <ul className="quote-highlights-list">
              {t.services.quoteHighlights.map((highlight) => (
                <li key={highlight}>
                  <CheckCircle2 size={18} className="quote-highlight-icon" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="contact-methods">
              <a
                className="contact-card glass-effect"
                href={whatsappUrl(
                  'Olá WGF Technologies, gostaria de solicitar um orçamento para um projeto tecnológico.',
                )}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('service_whatsapp_click', { source: 'quote_section' })}
              >
                <MessageSquare />
                <div>
                  <span>{t.contact.whatsapp}</span>
                  <strong>{company.contacts.phoneDisplay}</strong>
                </div>
              </a>
              <a className="contact-card glass-effect" href={`mailto:${company.contacts.email}`}>
                <Mail />
                <div>
                  <span>{t.contact.emailLabel}</span>
                  <strong>{company.contacts.email}</strong>
                </div>
              </a>
            </div>
          </div>

          <div className="quote-request-form-col">
            <ProjectQuoteForm selectedService={selectedService} />
          </div>
        </div>
      </section>

      {/* 5. FAQ Comercial e Técnica */}
      <section className="section-block" aria-labelledby="services-faq-heading">
        <div className="section-narrow">
          <span className="section-eyebrow">{t.services.faqEyebrow}</span>
          <h2 id="services-faq-heading">{t.services.faqTitle}</h2>
          <p className="lead muted">{t.services.faqBody}</p>
        </div>

        <div className="faq-list">
          {faqList.map((faq) => (
            <details
              key={faq.id}
              className="faq-item glass-effect"
              onToggle={(e) => {
                if (e.currentTarget.open) {
                  trackEvent('service_faq_open', { id: faq.id });
                }
              }}
            >
              <summary className="faq-question">{faq.question}</summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
