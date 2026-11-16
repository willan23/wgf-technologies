import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICE_TYPES, serviceTypeLabel } from '../data/services';
import { FORM_ENV, checkSubmissionCooldown, deliverLead, isFormConfigured } from '../lib/forms';
import { trackEvent } from '../lib/analytics';
import { ALLOWED_SERVICE_TYPES, cleanPayload, validateProjectQuote } from '../lib/validation';
import FormResult, { FormError } from './FormResult';

function createInitialState(defaultService = 'custom-software') {
  const validService = ALLOWED_SERVICE_TYPES.includes(defaultService) ? defaultService : 'custom-software';
  return {
    name: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    serviceType: validService,
    description: '',
    budget: '',
    timeline: '',
    requirementsUrl: '',
    consent: false,
    fax_url: '', // honeypot
  };
}

function buildQuoteSummary(payload, lang) {
  const serviceName = serviceTypeLabel(payload.serviceType, lang);
  const lines = [
    `Service: ${serviceName} (${payload.serviceType})`,
    `Name: ${payload.name}`,
    payload.companyName ? `Company/Organization: ${payload.companyName}` : null,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    `Country: ${payload.country}`,
    payload.budget ? `Estimated Budget: ${payload.budget}` : null,
    payload.timeline ? `Desired Timeline: ${payload.timeline}` : null,
    payload.requirementsUrl ? `Requirements Link: ${payload.requirementsUrl}` : null,
    '',
    'Project Description:',
    payload.description,
  ].filter((line) => line !== null);

  return lines.join('\n');
}

export default function ProjectQuoteForm({ selectedService = 'custom-software' }) {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState(() => createInitialState(selectedService));
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [mailto, setMailto] = useState('');
  const [summaryText, setSummaryText] = useState('');

  useEffect(() => {
    if (selectedService && ALLOWED_SERVICE_TYPES.includes(selectedService)) {
      setForm((prev) => ({ ...prev, serviceType: selectedService }));
    }
  }, [selectedService]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Honeypot check against automated bots
    if (form.fax_url) {
      setStatus('submitted');
      return;
    }

    const validationError = validateProjectQuote(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!checkSubmissionCooldown(6000)) {
      setError({ code: 'cooldown' });
      return;
    }

    setStatus('sending');
    const cleaned = cleanPayload(form, ['fax_url', 'consent']);
    const serviceLabel = serviceTypeLabel(cleaned.serviceType, lang);
    const payload = {
      formType: 'project-quote',
      ...cleaned,
      serviceLabel,
    };

    const subject = `WGF Project Request — ${serviceLabel}${cleaned.companyName ? ` (${cleaned.companyName})` : ''}`;
    const body = buildQuoteSummary(cleaned, lang);
    setSummaryText(body);

    try {
      const result = await deliverLead(FORM_ENV.project, payload, { subject, body });
      trackEvent('project_quote_submit', {
        serviceType: cleaned.serviceType,
        hasBudget: Boolean(cleaned.budget),
        hasTimeline: Boolean(cleaned.timeline),
        delivery: result.delivery,
      });

      if (result.delivery === 'submitted') {
        setForm(createInitialState(selectedService));
      } else {
        setMailto(result.mailto);
      }
      setStatus(result.delivery);
    } catch {
      setStatus('idle');
      setError({ code: 'network' });
    }
  };

  if (status === 'submitted' || status === 'email_client') {
    const whatsappMsg = summaryText
      ? `Olá WGF Technologies, enviei um pedido de orçamento:\n\n${summaryText}`
      : 'Olá WGF Technologies, gostaria de solicitar um orçamento de desenvolvimento.';
    return (
      <FormResult
        status={status}
        mailto={mailto}
        summaryText={summaryText}
        onBack={() => setStatus('idle')}
        whatsappMessage={whatsappMsg}
      />
    );
  }

  return (
    <form
      id="solicitar-projeto-form"
      className="wgf-form project-quote-form glass-effect"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="project-form-header">
        <h3>{t.projectForm.title}</h3>
        <p className="form-hint">{t.projectForm.subtitle}</p>
      </div>

      {!isFormConfigured(FORM_ENV.project) && (
        <p className="form-hint">{t.contact.fallback}</p>
      )}

      <input
        className="hp-field"
        tabIndex={-1}
        autoComplete="off"
        name="fax_url"
        value={form.fax_url}
        onChange={onChange}
        aria-hidden="true"
      />

      <div className="form-grid-two">
        <label>
          <span>{t.projectForm.name} *</span>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder={t.projectForm.namePlaceholder}
            autoComplete="name"
            required
          />
        </label>

        <label>
          <span>{t.projectForm.companyName}</span>
          <input
            name="companyName"
            value={form.companyName}
            onChange={onChange}
            placeholder={t.projectForm.companyPlaceholder}
            autoComplete="organization"
          />
        </label>
      </div>

      <div className="form-grid-two">
        <label>
          <span>{t.projectForm.email} *</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder={t.projectForm.emailPlaceholder}
            autoComplete="email"
            required
          />
        </label>

        <label>
          <span>{t.projectForm.phone}</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder={t.projectForm.phonePlaceholder}
            autoComplete="tel"
          />
        </label>
      </div>

      <div className="form-grid-two">
        <label>
          <span>{t.projectForm.country} *</span>
          <input
            name="country"
            value={form.country}
            onChange={onChange}
            placeholder={t.projectForm.countryPlaceholder}
            autoComplete="country-name"
            required
          />
        </label>

        <label>
          <span>{t.projectForm.serviceType} *</span>
          <select name="serviceType" value={form.serviceType} onChange={onChange} required>
            {SERVICE_TYPES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label[lang] || s.label.PT}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-grid-two">
        <label>
          <span>{t.projectForm.budget}</span>
          <select name="budget" value={form.budget} onChange={onChange}>
            <option value="">{t.projectForm.budgetPlaceholder}</option>
            {t.projectForm.budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>{t.projectForm.timeline}</span>
          <select name="timeline" value={form.timeline} onChange={onChange}>
            <option value="">{t.projectForm.timelinePlaceholder}</option>
            {t.projectForm.timelineOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>{t.projectForm.description} *</span>
        <textarea
          name="description"
          rows={5}
          value={form.description}
          onChange={onChange}
          placeholder={t.projectForm.descriptionPlaceholder}
          required
        />
      </label>

      <label>
        <span>{t.projectForm.requirementsUrl}</span>
        <input
          type="url"
          name="requirementsUrl"
          value={form.requirementsUrl}
          onChange={onChange}
          placeholder={t.projectForm.requirementsUrlPlaceholder}
        />
        <span className="field-micro-hint">{t.projectForm.requirementsHint}</span>
      </label>

      <label className="consent-row">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={onChange}
          required
        />
        <span>
          {t.projectForm.consent} <Link to="/privacy">{t.forms.privacyLink}</Link>.
        </span>
      </label>

      <FormError error={error} />

      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? <Loader2 className="spinner-icon" size={18} /> : <Send size={18} />}
        {status === 'sending' ? t.projectForm.sending : t.projectForm.submit}
      </button>
    </form>
  );
}
