import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { whatsappUrl } from '../lib/forms';

export function FormError({ error }) {
  const { t } = useLanguage();
  if (!error) return null;
  return (
    <p className="form-error" role="alert">
      {t.forms.errors[error.code] || t.forms.errors.network}
    </p>
  );
}

export default function FormResult({ status, mailto, onBack, whatsappMessage }) {
  const { t } = useLanguage();
  const whatsapp = (
    <a className="btn-secondary" href={whatsappUrl(whatsappMessage)} target="_blank" rel="noreferrer">
      {t.contact.whatsapp}
    </a>
  );

  if (status === 'email_client') {
    return (
      <div className="form-success glass-effect" role="status">
        <h3>{t.forms.emailClientTitle}</h3>
        <p>{t.forms.emailClientBody}</p>
        <div className="hero-actions">
          <a className="btn-primary" href={mailto}>
            {t.forms.reopenEmail}
          </a>
          {whatsapp}
          <button type="button" className="btn-secondary" onClick={onBack}>
            {t.forms.backToForm}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-success glass-effect" role="status">
      <p>{t.forms.submitted}</p>
      {whatsapp}
    </div>
  );
}
