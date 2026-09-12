import { company } from '../data/company';

export function whatsappUrl(message) {
  const text = encodeURIComponent(message || 'Hello WGF Technologies, I would like to connect.');
  return `https://wa.me/${company.contacts.whatsapp}?text=${text}`;
}

export function mailtoUrl({ subject, body }) {
  const s = encodeURIComponent(subject || 'WGF Technologies Inquiry');
  const b = encodeURIComponent(body || '');
  return `mailto:${company.contacts.email}?subject=${s}&body=${b}`;
}

function formspreeEndpoint(envKey) {
  const id = import.meta.env[envKey];
  if (!id) return null;
  return `https://formspree.io/f/${id}`;
}

export async function submitFormspree(envKey, payload) {
  const endpoint = formspreeEndpoint(envKey);
  if (!endpoint) {
    return { ok: false, mode: 'fallback', reason: 'missing-formspree-id' };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Form submission failed');
  }

  return { ok: true, mode: 'formspree' };
}

export const FORM_ENV = {
  contact: 'VITE_FORMSPREE_CONTACT_ID',
  investor: 'VITE_FORMSPREE_INVESTOR_ID',
  partner: 'VITE_FORMSPREE_PARTNER_ID',
};
