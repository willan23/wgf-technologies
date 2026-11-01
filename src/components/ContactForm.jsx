import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FORM_ENV, isFormConfigured } from '../lib/forms';
import { useLeadForm } from '../lib/useLeadForm';
import FormResult, { FormError } from './FormResult';

const initial = {
  name: '',
  email: '',
  country: '',
  type: 'general',
  message: '',
  consent: false,
  company: '', // honeypot
};

export default function ContactForm({ defaultType = 'general' }) {
  const { t } = useLanguage();
  const { form, status, error, mailto, onChange, onSubmit, backToForm } = useLeadForm({
    initial: { ...initial, type: defaultType },
    honeypot: 'company',
    envKey: FORM_ENV.contact,
    formType: 'contact',
    required: ['name', 'email', 'message'],
    subject: (p) => `WGF Contact — ${p.type}`,
    eventName: 'contact_form_submit',
    eventProps: (p) => ({ type: p.type }),
  });

  if (status === 'submitted' || status === 'email_client') {
    return (
      <FormResult
        status={status}
        mailto={mailto}
        onBack={backToForm}
        whatsappMessage="Hello WGF, following up on my contact form."
      />
    );
  }

  return (
    <form className="wgf-form glass-effect" onSubmit={onSubmit} noValidate>
      <h3>{t.contact.formTitle}</h3>
      {!isFormConfigured(FORM_ENV.contact) && <p className="form-hint">{t.contact.fallback}</p>}

      <input className="hp-field" tabIndex={-1} autoComplete="off" name="company" value={form.company} onChange={onChange} aria-hidden="true" />

      <label>
        {t.contact.name}
        <input name="name" value={form.name} onChange={onChange} autoComplete="name" required />
      </label>
      <label>
        {t.contact.email}
        <input type="email" name="email" value={form.email} onChange={onChange} autoComplete="email" required />
      </label>
      <label>
        {t.contact.country}
        <input name="country" value={form.country} onChange={onChange} autoComplete="country-name" />
      </label>
      <label>
        {t.contact.type}
        <select name="type" value={form.type} onChange={onChange}>
          {Object.entries(t.contact.types).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </label>
      <label>
        {t.contact.message}
        <textarea name="message" rows={5} value={form.message} onChange={onChange} required />
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
        {status === 'sending' ? t.contact.sending : t.contact.send}
      </button>
    </form>
  );
}
