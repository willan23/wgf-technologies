import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getProductBySlug } from '../data/products';
import { company } from '../data/company';
import StatusBadge from '../components/StatusBadge';
import { trackEvent } from '../lib/analytics';

export default function ProductDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const product = getProductBySlug(slug);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | ${company.name}`;
      trackEvent('product_view', { slug: product.slug });

      const existing = document.getElementById('product-jsonld');
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'product-jsonld';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: product.name,
        applicationCategory: product.category,
        operatingSystem: 'Web',
        description: product.shortDescription,
        url: product.url || `${company.urls.site}/portfolio/${product.slug}`,
        publisher: {
          '@type': 'Organization',
          name: company.name,
          url: company.urls.site,
        },
      });
      document.head.appendChild(script);
      return () => {
        script.remove();
      };
    }
    document.title = `Product | ${company.name}`;
    return undefined;
  }, [product]);

  if (!product) {
    return (
      <section className="section-block">
        <p>{t.product.notFound}</p>
        <Link to="/portfolio" className="btn-secondary">
          {t.product.back}
        </Link>
      </section>
    );
  }

  return (
    <div className="product-detail">
      <section className="page-hero product-hero">
        <div className="page-hero-inner">
          <StatusBadge status={product.status} />
          <h1>{product.name}</h1>
          <p className="page-hero-sub">{product.valueProposition}</p>
          <div className="hero-actions">
            {product.url && (
              <a href={product.url} target="_blank" rel="noreferrer" className="btn-primary">
                <ExternalLink size={16} /> {t.product.visit}
              </a>
            )}
            <Link to="/portfolio" className="btn-secondary">
              {t.product.back}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-block content-stack">
        <article>
          <h2>{t.product.problem}</h2>
          <p>{product.problem}</p>
        </article>
        <article>
          <h2>{t.product.solution}</h2>
          <p>{product.solution}</p>
        </article>
        <article>
          <h2>{t.product.technology}</h2>
          <ul className="clean-list">
            {product.technology.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>{t.product.market}</h2>
          <p>
            <strong>{t.product.geography}:</strong> {product.targetMarket.geography.join(', ')}
          </p>
          <p>
            <strong>{t.product.segments}:</strong> {product.targetMarket.segments.join(', ')}
          </p>
          <p>
            <strong>{t.product.opportunity}:</strong> {product.targetMarket.opportunity}
          </p>
        </article>
        <article>
          <h2>{t.product.businessModel}</h2>
          <div className="chip-grid">
            {product.businessModel.map((m) => (
              <span key={m} className="info-chip">
                {m}
              </span>
            ))}
          </div>
        </article>
        <article>
          <h2>{t.product.roadmap}</h2>
          <div className="roadmap-grid">
            {[
              ['completed', t.product.completed],
              ['current', t.product.current],
              ['next', t.product.next],
              ['future', t.product.future],
            ].map(([key, label]) => (
              <div key={key} className="roadmap-card glass-effect">
                <h3>{label}</h3>
                <ul>
                  {(product.roadmap[key] || []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
        {product.disclaimer && (
          <aside className="legal-callout glass-effect">
            <p>{product.disclaimer}</p>
          </aside>
        )}
      </section>
    </div>
  );
}
