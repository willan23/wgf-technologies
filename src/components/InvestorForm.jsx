import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPublicProducts } from '../data/products';
import { FORM_ENV, mailtoUrl, submitFormspree, whatsappUrl } from '../lib/forms';
import { trackEvent } from '../lib/analytics';

function makeAlias() {
  const part = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `INV-${part}`;
}

const buildInitial = (defaultProduct = 'WGF IP Shield') => ({
  name: '',
  email: '',
  country: '',
  investorType: 'Angel Investor',
  interest: 'Strategic investment / growth capital',
  product: defaultProduct,
  range: '€5K–€25K',
  message: '',
  anonymous: false,
  consent: false,
  website: '',
});

export default function InvestorForm({ defaultProduct = 'WGF IP Shield' }) {
  const { t } = useLanguage();
  const products = getPublicProducts();
  const [form, setForm] = useState(() => buildInitial(defaultProduct));
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [alias, setAlias] = useState('');

  const typeOptions = useMemo(() => {
    const base = [...t.investorForm.types];
    if (!base.includes('Anonymous Investor')) base.push('Anonymous Investor');
    return base;
  }, [t.investorForm.types]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'anonymous' && checked) {
        next.investorType = 'Anonymous Investor';
        next.name = '';
      }
      return next;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.website) return;
    if (!form.consent) {
      setError('Consent required');
      return;
    }
    if (!form.anonymous && !form.name.trim()) {
      setError(t.investorForm.nameRequired);
      return;
    }
    if (!form.anonymous && !form.email.trim()) {
      setError(t.investorForm.emailRequired);
      return;
    }
    if (form.anonymous && !form.email.trim() && !form.message.trim()) {
      setError(t.investorForm.anonymousContactHint);
      return;
    }

    const investorAlias = form.anonymous ? makeAlias() : '';
    setStatus('sending');
    try {
      const payload = {
        formType: form.anonymous ? 'investor-interest-anonymous' : 'investor-interest',
        anonymous: form.anonymous,
        alias: investorAlias || undefined,
        name: form.anonymous ? `Anonymous (${investorAlias})` : form.name,
        email: form.email || undefined,
        country: form.country || undefined,
        investorType: form.anonymous ? 'Anonymous Investor' : form.investorType,
        interest: form.interest,
        product: form.product,
        range: form.range,
        message: form.message,
        note: 'Interest registration only — no payment / no equity purchase via website.',
      };
      const result = await submitFormspree(FORM_ENV.investor, payload);
      if (result.mode === 'fallback') {
        const body = Object.entries(payload)
          .filter(([, v]) => v != null && v !== '')
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n');
        window.location.href = mailtoUrl({
          subject: form.anonymous
            ? `WGF Anonymous Investor Interest (${investorAlias})`
            : 'WGF Investor Interest',
          body,
        });
      }
      trackEvent('investor_form_submit', {
        range: form.range,
        type: form.anonymous ? 'Anonymous Investor' : form.investorType,
        anonymous: form.anonymous,
      });
      setAlias(investorAlias);
      setStatus('success');
      setForm(buildInitial(defaultProduct));
    } catch (err) {
      setStatus('idle');
      setError(err.message || 'Error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-success glass-effect">
        <p>{t.contact.success}</p>
        {alias && (
          <p className="legal-note">
            {t.investorForm.aliasLabel}: <strong>{alias}</strong>
          </p>
        )}
        <p className="legal-note">{t.investors.noPaymentNote}</p>
        <a
          className="btn-secondary"
          href={whatsappUrl(
            alias
              ? `Hello WGF Investor Relations. Anonymous interest alias: ${alias}.`
              : 'Hello WGF Investor Relations, I registered interest via the website.',
          )}
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
      <p className="form-hint">{t.investors.noPaymentNote}</p>
      <input
        className="hp-field"
        tabIndex={-1}
        autoComplete="off"
        name="website"
        value={form.website}
        onChange={onChange}
        aria-hidden="true"
      />

      <label className="consent-row">
        <input type="checkbox" name="anonymous" checked={form.anonymous} onChange={onChange} />
        <span>{t.investorForm.anonymousToggle}</span>
      </label>
      {form.anonymous && <p className="form-hint">{t.investorForm.anonymousHelp}</p>}

      {!form.anonymous && (
        <label>
          {t.investorForm.name}
          <input name="name" value={form.name} onChange={onChange} required={!form.anonymous} />
        </label>
      )}
      <label>
        {t.investorForm.email}
        {form.anonymous ? ` (${t.investorForm.optional})` : ''}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required={!form.anonymous}
          placeholder={form.anonymous ? t.investorForm.anonymousEmailPlaceholder : undefined}
        />
      </label>
      <label>
        {t.investorForm.country}
        {form.anonymous ? ` (${t.investorForm.optional})` : ''}
        <input name="country" value={form.country} onChange={onChange} required={!form.anonymous} />
      </label>
      {!form.anonymous && (
        <label>
          {t.investorForm.investorType}
          <select name="investorType" value={form.investorType} onChange={onChange}>
            {typeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      )}
      <label>
        {t.investorForm.interest}
        <input name="interest" value={form.interest} onChange={onChange} />
      </label>
      <label>
        {t.investorForm.product}
        <select name="product" value={form.product} onChange={onChange}>
          <option value="">—</option>
          {products.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
          <option value="Portfolio / Platform">Portfolio / Platform</option>
        </select>
      </label>
      <label>
        {t.investorForm.range}
        <select name="range" value={form.range} onChange={onChange}>
          {t.investorForm.ranges.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
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
          {form.anonymous ? t.investorForm.anonymousConsent : t.investorForm.consent}{' '}
          <Link to="/privacy">Privacy</Link>
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
