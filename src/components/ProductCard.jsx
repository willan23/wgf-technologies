import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';

export default function ProductCard({ product }) {
  const { t } = useLanguage();

  return (
    <article className="product-card glass-effect">
      <div className="product-card-top">
        <div className="product-logo-mark">{product.name.slice(0, 2).toUpperCase()}</div>
        <StatusBadge status={product.status} />
      </div>
      <p className="product-category">{product.category}</p>
      <h3>{product.name}</h3>
      <p className="product-desc">{product.shortDescription}</p>
      <div className="product-meta">
        <span>{product.markets?.[0]}</span>
        <span>{product.businessModel?.[0]}</span>
      </div>
      <Link
        to={`/portfolio/${product.slug}`}
        className="btn-secondary product-card-cta"
        onClick={() => trackEvent('portfolio_click', { slug: product.slug })}
      >
        {t.portfolio.cta} <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}
