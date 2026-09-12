import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPublicProducts } from '../data/products';
import { FORM_ENV, mailtoUrl, submitFormspree, whatsappUrl } from '../lib/forms';
import { trackEvent } from '../lib/analytics';

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
  website: '',
};

export default function InvestorForm() {
  const { t } = useLanguage();
  const products = getPublicProducts();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.website) return;
    if (!form.consent) {
      setError('Consent required');
      return;
    }
    setStatus('sending');
    try {
      const payload = {
        formType: 'investor-interest',
        ...form,
        website: undefined,
      };
      const result = await submitFormspree(FORM_ENV.investor, payload);
      if (result.mode === 'fallback') {
        const body = Object.entries(form)
          .filter(([k]) => !['consent', 'website'].includes(k))
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n');
        window.location.href = mailtoUrl({
          subject: 'WGF Investor Interest',
          body,
        });
      }
      trackEvent('investor_form_submit', { range: form.range, type: form.investorType });
      setStatus('success');
      setForm(initial);
    } catch (err) {
      setStatus('idle');
      setError(err.message || 'Error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-success glass-effect">
        <p>{t.contact.success}</p>
        <a
          className="btn-secondary"
          href={whatsappUrl('Hello WGF Investor Relations, I registered interest via the website.')}
          target="_blank"
          rel="noreferrer"
        >
          {t.contact.whatsapp}
        </a>
      </div>
    );
  }

  return (
    <form id="investor-interest" className="wgf-form glass-effect" onSubmit={onSubmit}>
      <h3>{t.investors.formTitle}</h3>
      <input className="hp-field" tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={onChange} aria-hidden="true" />

      <label>
        {t.investorForm.name}
        <input name="name" value={form.name} onChange={onChange} required />
      </label>
      <label>
        {t.investorForm.email}
        <input type="email" name="email" value={form.email} onChange={onChange} required />
      </label>
      <label>
        {t.investorForm.country}
        <input name="country" value={form.country} onChange={onChange} required />
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
          {t.investorForm.consent} <Link to="/privacy">Privacy</Link>
        </span>
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? <Loader2 className="spinner-icon" size={18} /> : <Send size={18} />}
        {t.investorForm.submit}
      </button>
    </form>
  );
}
