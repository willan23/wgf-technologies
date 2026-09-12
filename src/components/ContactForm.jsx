import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FORM_ENV, mailtoUrl, submitFormspree, whatsappUrl } from '../lib/forms';
import { trackEvent } from '../lib/analytics';

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
  const [form, setForm] = useState({ ...initial, type: defaultType });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.company) return;
    if (!form.consent) {
      setError('Consent required');
      return;
    }
    setStatus('sending');
    try {
      const payload = {
        formType: 'contact',
        name: form.name,
        email: form.email,
        country: form.country,
        inquiryType: form.type,
        message: form.message,
      };
      const result = await submitFormspree(FORM_ENV.contact, payload);
      if (result.mode === 'fallback') {
        const body = `Name: ${form.name}\nEmail: ${form.email}\nCountry: ${form.country}\nType: ${form.type}\n\n${form.message}`;
        window.location.href = mailtoUrl({
          subject: `WGF Contact — ${form.type}`,
          body,
        });
      }
      trackEvent('contact_form_submit', { type: form.type });
      setStatus('success');
      setForm({ ...initial, type: defaultType });
    } catch (err) {
      setStatus('idle');
      setError(err.message || 'Error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-success glass-effect">
        <p>{t.contact.success}</p>
        <a className="btn-secondary" href={whatsappUrl('Hello WGF, following up on my contact form.')} target="_blank" rel="noreferrer">
          {t.contact.whatsapp}
        </a>
      </div>
    );
  }

  return (
    <form className="wgf-form glass-effect" onSubmit={onSubmit} noValidate>
      <h3>{t.contact.formTitle}</h3>
      <p className="form-hint">{t.contact.fallback}</p>

      <input className="hp-field" tabIndex={-1} autoComplete="off" name="company" value={form.company} onChange={onChange} aria-hidden="true" />

      <label>
        {t.contact.name}
        <input name="name" value={form.name} onChange={onChange} required />
      </label>
      <label>
        {t.contact.email}
        <input type="email" name="email" value={form.email} onChange={onChange} required />
      </label>
      <label>
        {t.contact.country}
        <input name="country" value={form.country} onChange={onChange} />
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
          {t.contact.consent} <Link to="/privacy">Privacy</Link>
        </span>
      </label>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? <Loader2 className="spinner-icon" size={18} /> : <Send size={18} />}
        {status === 'sending' ? t.contact.sending : t.contact.send}
      </button>
    </form>
  );
}
