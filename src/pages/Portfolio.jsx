import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getPublicProducts } from '../data/products';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { company } from '../data/company';

export default function Portfolio() {
  const { t } = useLanguage();
  const products = getPublicProducts();

  useEffect(() => {
    document.title = `Portfolio | ${company.name}`;
  }, []);

  return (
    <div>
      <PageHero title={t.portfolio.title} subtitle={t.portfolio.body} />
      <section className="section-block">
        {products.length === 0 ? (
          <p className="muted">{t.portfolio.empty}</p>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
