import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPublicProducts } from '../data/products';
import { FORM_ENV, isFormConfigured } from '../lib/forms';
import { useLeadForm } from '../lib/useLeadForm';
import FormResult, { FormError } from './FormResult';

const initial = {
  name: '',
  email: '',
  country: '',
  investorType: 'Angel Investor',
  interest: '',
  product: '',
  range: '€5K–€25K',
  message: '',
  consent: false,
  website: '', // honeypot
};

export default function InvestorForm() {
  const { t } = useLanguage();
  const products = getPublicProducts();
  const { form, status, error, mailto, onChange, onSubmit, backToForm } = useLeadForm({
    initial,
    honeypot: 'website',
    envKey: FORM_ENV.investor,
    formType: 'investor-interest',
    required: ['name', 'email', 'country'],
    subject: () => 'WGF Investor Interest',
    eventName: 'investor_form_submit',
    eventProps: (p) => ({ range: p.range, type: p.investorType }),
  });

  if (status === 'submitted' || status === 'email_client') {
    return (
      <FormResult
        status={status}
        mailto={mailto}
        onBack={backToForm}
        whatsappMessage="Hello WGF Investor Relations, I registered interest via the website."
      />
    );
  }

  return (
    <form id="investor-interest" className="wgf-form glass-effect" onSubmit={onSubmit} noValidate>
      <h3>{t.investors.formTitle}</h3>
      {!isFormConfigured(FORM_ENV.investor) && <p className="form-hint">{t.contact.fallback}</p>}
      <input className="hp-field" tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={onChange} aria-hidden="true" />

      <label>
        {t.investorForm.name}
        <input name="name" value={form.name} onChange={onChange} autoComplete="name" required />
      </label>
      <label>
        {t.investorForm.email}
        <input type="email" name="email" value={form.email} onChange={onChange} autoComplete="email" required />
      </label>
      <label>
        {t.investorForm.country}
        <input name="country" value={form.country} onChange={onChange} autoComplete="country-name" required />
      </label>
      <label>
        {t.investorForm.investorType}
        <select name="investorType" value={form.investorType} onChange={onChange}>
          {t.investorForm.types.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>
      <label>
        {t.investorForm.interest}
        <input name="interest" value={form.interest} onChange={onChange} />
      </label>
      <label>
        {t.investorForm.product}
        <select name="product" value={form.product} onChange={onChange}>
          <option value="">—</option>
          {products.map((p) => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
          <option value="Portfolio / Platform">Portfolio / Platform</option>
        </select>
      </label>
      <label>
        {t.investorForm.range}
        <select name="range" value={form.range} onChange={onChange}>
          {t.investorForm.ranges.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>
      <label>
        {t.investorForm.message}
        <textarea name="message" rows={4} value={form.message} onChange={onChange} />
      </label>
      <label className="consent-row">
        <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} required />
        <span>
          {t.investorForm.consent} <Link to="/privacy">{t.forms.privacyLink}</Link>
        </span>
      </label>
      <FormError error={error} />
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? <Loader2 className="spinner-icon" size={18} /> : <Send size={18} />}
        {t.investorForm.submit}
      </button>
    </form>
  );
}
