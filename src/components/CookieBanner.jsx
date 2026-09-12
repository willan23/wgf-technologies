import React from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '../context/ConsentContext';
import { useLanguage } from '../context/LanguageContext';
import './CookieBanner.css';

export default function CookieBanner() {
  const { showBanner, accept, decline } = useConsent();
  const { t } = useLanguage();
  if (!showBanner) return null;

  return (
    <div className="cookie-banner glass-effect" role="dialog" aria-label="Cookie consent">
      <div>
        <strong>{t.cookies.title}</strong>
        <p>{t.cookies.body}</p>
        <Link to="/cookies">{t.cookies.more}</Link>
      </div>
      <div className="cookie-actions">
        <button type="button" className="btn-secondary" onClick={decline}>
          {t.cookies.decline}
        </button>
        <button type="button" className="btn-primary" onClick={accept}>
          {t.cookies.accept}
        </button>
      </div>
    </div>
  );
}
