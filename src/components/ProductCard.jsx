import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useLanguage } from '../context/LanguageContext';
import { localizeProduct, tagLabel } from '../data/products';
import { trackEvent } from '../lib/analytics';

export default function ProductCard({ product: base }) {
  const { t, lang } = useLanguage();
  const product = localizeProduct(base, lang);
  const tags = [...(product.markets || []).slice(0, 2), product.businessModel?.[0]].filter(Boolean);

  return (
    <article className="product-card glass-effect">
      <div className="product-card-top">
        <div className="product-logo-mark" aria-hidden>{product.name.slice(0, 2).toUpperCase()}</div>
        <StatusBadge status={product.status} />
      </div>
      <p className="product-category">{product.category}</p>
      <h3>
        <Link
          to={`/portfolio/${product.slug}`}
          className="product-card-link"
          onClick={() => trackEvent('portfolio_click', { slug: product.slug })}
        >
          {product.name}
        </Link>
      </h3>
      <p className="product-desc">{product.shortDescription}</p>
      <ul className="product-tags" aria-label={t.portfolio.market}>
        {tags.map((tag) => (
          <li key={tag}>{tagLabel(tag, lang)}</li>
        ))}
      </ul>
      <div className="product-card-actions">
        <span className="text-link" aria-hidden>
          {t.portfolio.cta} <ArrowRight size={16} />
        </span>
        {product.url && (
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="product-external"
            onClick={() => trackEvent('product_external_click', { slug: product.slug, source: 'card' })}
          >
            {t.portfolio.visitSite} <ArrowUpRight size={14} aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}
