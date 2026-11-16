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

export const FORM_ENV = {
  contact: 'VITE_FORMSPREE_CONTACT_ID',
  investor: 'VITE_FORMSPREE_INVESTOR_ID',
  partner: 'VITE_FORMSPREE_PARTNER_ID',
  project: 'VITE_FORMSPREE_PROJECT_ID',
};

export const DEFAULT_FORMSPREE_ID = 'xaeqrpqb';

function formspreeEndpoint(envKey) {
  const id =
    import.meta.env?.[envKey] ||
    (envKey === FORM_ENV.project ? import.meta.env?.[FORM_ENV.contact] : '') ||
    DEFAULT_FORMSPREE_ID;
  if (!id) return null;
  return `https://formspree.io/f/${id}`;
}

export function isFormConfigured(envKey) {
  return Boolean(formspreeEndpoint(envKey));
}

const SUBMIT_TIMEOUT_MS = 15000;
const RATE_LIMIT_KEY = 'wgf-form-last-submit-ts';
const BACKUP_KEY = 'wgf-last-lead-backup';

export function checkSubmissionCooldown(cooldownMs = 8000) {
  try {
    const last = Number(sessionStorage.getItem(RATE_LIMIT_KEY) || 0);
    if (last && Date.now() - last < cooldownMs) {
      return false;
    }
    sessionStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
    return true;
  } catch {
    return true;
  }
}

export function saveLeadBackup(payload, mail) {
  try {
    sessionStorage.setItem(
      BACKUP_KEY,
      JSON.stringify({
        ts: new Date().toISOString(),
        payload,
        subject: mail?.subject || '',
        body: mail?.body || '',
      }),
    );
  } catch {
    /* ignore storage quota errors */
  }
}

export async function submitFormspree(envKey, payload) {
  const endpoint = formspreeEndpoint(envKey);
  if (!endpoint) {
    return { ok: false, mode: 'fallback', reason: 'missing-formspree-id' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Form submission failed');
    }
  } finally {
    clearTimeout(timer);
  }

  return { ok: true, mode: 'formspree' };
}

/**
 * Delivers a lead and reports HOW it was delivered:
 * - `submitted`: the form provider confirmed receipt (HTTP 2xx).
 * - `email_client`: no provider configured; a pre-filled mailto: was opened.
 *   Nothing has been sent yet — the user still has to press Send.
 */
export async function deliverLead(envKey, payload, mail) {
  saveLeadBackup(payload, mail);
  const result = await submitFormspree(envKey, payload);
  if (result.mode === 'formspree') return { delivery: 'submitted' };

  const href = mailtoUrl(mail);
  if (typeof window !== 'undefined') {
    window.location.href = href;
  }
  return { delivery: 'email_client', mailto: href };
}
