import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { partnerCategories } from '../data/partners';
import { localizeList } from '../data/localize';
import { FORM_ENV, isFormConfigured } from '../lib/forms';
import { useLeadForm } from '../lib/useLeadForm';
import FormResult, { FormError } from './FormResult';

const initial = {
  name: '',
  email: '',
  organization: '',
  category: 'technology',
  message: '',
  consent: false,
  fax: '', // honeypot
};

export default function PartnerForm() {
  const { t, lang } = useLanguage();
  const { form, status, error, mailto, onChange, onSubmit, backToForm } = useLeadForm({
    initial,
    honeypot: 'fax',
    envKey: FORM_ENV.partner,
    formType: 'partner',
    required: ['name', 'email', 'organization', 'message'],
    subject: (p) => `WGF Partnership — ${p.category}`,
    eventName: 'partner_form_submit',
    eventProps: (p) => ({ category: p.category }),
  });

  if (status === 'submitted' || status === 'email_client') {
    return (
      <FormResult
        status={status}
        mailto={mailto}
        onBack={backToForm}
        whatsappMessage="Hello WGF, I am interested in a strategic partnership."
      />
    );
  }

  return (
    <form id="partner-interest" className="wgf-form glass-effect" onSubmit={onSubmit} noValidate>
      <h3>{t.partners.formTitle}</h3>
      {!isFormConfigured(FORM_ENV.partner) && <p className="form-hint">{t.contact.fallback}</p>}
      <input className="hp-field" tabIndex={-1} autoComplete="off" name="fax" value={form.fax} onChange={onChange} aria-hidden="true" />
      <label>
        {t.contact.name}
        <input name="name" value={form.name} onChange={onChange} autoComplete="name" required />
      </label>
      <label>
        {t.contact.email}
        <input type="email" name="email" value={form.email} onChange={onChange} autoComplete="email" required />
      </label>
      <label>
        {t.forms.organization}
        <input name="organization" value={form.organization} onChange={onChange} autoComplete="organization" required />
      </label>
      <label>
        {t.forms.category}
        <select name="category" value={form.category} onChange={onChange}>
          {localizeList(partnerCategories, lang).map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </label>
      <label>
        {t.contact.message}
        <textarea name="message" rows={4} value={form.message} onChange={onChange} required />
      </label>
      <label className="consent-row">
        <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} required />
        <span>
          {t.contact.consent} <Link to="/privacy">{t.forms.privacyLink}</Link>
        </span>
      </label>
      <FormError error={error} />
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? <Loader2 className="spinner-icon" size={18} /> : <Send size={18} />}
        {t.partners.cta}
      </button>
    </form>
  );
}
