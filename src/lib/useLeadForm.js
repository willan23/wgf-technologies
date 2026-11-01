import { useState } from 'react';
import { deliverLead } from './forms';
import { trackEvent } from './analytics';
import { cleanPayload, validateLead } from './validation';

function mailBody(payload) {
  const { message, ...rest } = payload;
  const lines = Object.entries(rest)
    .filter(([key, value]) => key !== 'formType' && value)
    .map(([key, value]) => `${key}: ${value}`);
  return message ? `${lines.join('\n')}\n\n${message}` : lines.join('\n');
}

/**
 * Shared state machine for lead forms.
 * status: idle | sending | submitted | email_client
 */
export function useLeadForm({ initial, honeypot, envKey, formType, required, subject, eventName, eventProps = () => ({}) }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [mailto, setMailto] = useState('');

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // Bots fill the hidden field: pretend success, send nothing.
    if (form[honeypot]) {
      setStatus('submitted');
      return;
    }

    const invalid = validateLead(form, { required });
    if (invalid) {
      setError(invalid);
      return;
    }

    setStatus('sending');
    const payload = { formType, ...cleanPayload(form, [honeypot, 'consent']) };
    try {
      const result = await deliverLead(envKey, payload, { subject: subject(payload), body: mailBody(payload) });
      trackEvent(eventName, { ...eventProps(payload), delivery: result.delivery });
      if (result.delivery === 'submitted') {
        setForm(initial);
      } else {
        setMailto(result.mailto);
      }
      setStatus(result.delivery);
    } catch {
      setStatus('idle');
      setError({ code: 'network' });
    }
  };

  const backToForm = () => setStatus('idle');

  return { form, status, error, mailto, onChange, onSubmit, backToForm };
}
