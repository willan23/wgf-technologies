import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { partnerCategories } from '../data/partners';
import { FORM_ENV, mailtoUrl, submitFormspree, whatsappUrl } from '../lib/forms';
import { trackEvent } from '../lib/analytics';

const initial = {
  name: '',
  email: '',
  organization: '',
  category: 'technology',
  message: '',
  consent: false,
  fax: '',
};

export default function PartnerForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.fax) return;
    setStatus('sending');
    try {
      const result = await submitFormspree(FORM_ENV.partner, {
        formType: 'partner',
        name: form.name,
        email: form.email,
        organization: form.organization,
        category: form.category,
        message: form.message,
      });
      if (result.mode === 'fallback') {
        window.location.href = mailtoUrl({
          subject: `WGF Partnership — ${form.category}`,
          body: `Name: ${form.name}\nOrg: ${form.organization}\nCategory: ${form.category}\n\n${form.message}`,
        });
      }
      trackEvent('partner_form_submit', { category: form.category });
      setStatus('success');
      setForm(initial);
    } catch {
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-success glass-effect">
        <p>{t.contact.success}</p>
        <a className="btn-secondary" href={whatsappUrl('Hello WGF, I am interested in a strategic partnership.')} target="_blank" rel="noreferrer">
          {t.contact.whatsapp}
        </a>
      </div>
    );
  }

  return (
    <form id="partner-interest" className="wgf-form glass-effect" onSubmit={onSubmit}>
      <h3>{t.partners.formTitle}</h3>
      <input className="hp-field" tabIndex={-1} autoComplete="off" name="fax" value={form.fax} onChange={onChange} aria-hidden="true" />
      <label>
        {t.contact.name}
        <input name="name" value={form.name} onChange={onChange} required />
      </label>
      <label>
        {t.contact.email}
        <input type="email" name="email" value={form.email} onChange={onChange} required />
      </label>
      <label>
        Organization
        <input name="organization" value={form.organization} onChange={onChange} required />
      </label>
      <label>
        Category
        <select name="category" value={form.category} onChange={onChange}>
          {partnerCategories.map((c) => (
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
          {t.contact.consent} <Link to="/privacy">Privacy</Link>
        </span>
      </label>
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? <Loader2 className="spinner-icon" size={18} /> : <Send size={18} />}
        {t.partners.cta}
      </button>
    </form>
  );
}
