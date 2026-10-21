import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { filterProducts, getProductMarkets, getPublicProducts } from '../data/products';
import { statusMeta } from '../lib/status';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { usePageMeta } from '../lib/seo';

function FilterRow({ label, options, value, onSelect, allLabel }) {
  return (
    <div className="filter-row" role="group" aria-label={label}>
      <span className="filter-row-label">{label}</span>
      {[['', allLabel], ...options].map(([key, text]) => (
        <button
          key={key || 'all'}
          type="button"
          className="filter-chip"
          aria-pressed={value === key}
          onClick={() => onSelect(key)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const products = getPublicProducts();
  // Filters live in the URL (?q=&market=&status=) so a filtered view can be shared.
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const market = params.get('market') || '';
  const status = params.get('status') || '';

  usePageMeta({ title: t.nav.portfolio, description: t.portfolio.body, path: '/portfolio' });

  const markets = getProductMarkets(products);
  const statuses = [...new Set(products.map((p) => p.status))];
  const results = filterProducts(products, { q, market, status });
  const hasFilters = Boolean(q || market || status);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <div>
      <PageHero title={t.portfolio.title} subtitle={t.portfolio.body} />
      <section className="section-block">
        {products.length === 0 ? (
          <p className="muted">{t.portfolio.empty}</p>
        ) : (
          <>
            <div className="portfolio-toolbar">
              <label className="search-field">
                <span className="sr-only">{t.portfolio.search}</span>
                <Search size={18} aria-hidden />
                <input
                  type="search"
                  value={q}
                  placeholder={t.portfolio.searchPlaceholder}
                  onChange={(e) => update('q', e.target.value)}
                />
              </label>
              <FilterRow
                label={t.portfolio.market}
                allLabel={t.portfolio.all}
                options={markets.map((m) => [m, m])}
                value={market}
                onSelect={(v) => update('market', v)}
              />
              {statuses.length > 1 && (
                <FilterRow
                  label={t.portfolio.status}
                  allLabel={t.portfolio.all}
                  options={statuses.map((s) => [s, statusMeta[s]?.label || s])}
                  value={status}
                  onSelect={(v) => update('status', v)}
                />
              )}
              <div className="results-row">
                <span className="muted" aria-live="polite">
                  {results.length} {t.portfolio.results}
                </span>
                {hasFilters && (
                  <button type="button" className="link-btn" onClick={() => setParams({}, { replace: true })}>
                    {t.portfolio.clear}
                  </button>
                )}
              </div>
            </div>

            {results.length === 0 ? (
              <p className="muted">{t.portfolio.noResults}</p>
            ) : (
              <div className="products-grid">
                {results.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
