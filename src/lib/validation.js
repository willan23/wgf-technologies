// Pure lead validation (no imports) so it can run in the browser and in node tests.
// Server-side validation is still required once a backend endpoint exists.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s().-]{5,28}$/;

export const FIELD_LIMITS = {
  name: 120,
  companyName: 140,
  organization: 140,
  email: 254,
  phone: 40,
  country: 200,
  serviceType: 80,
  budget: 100,
  timeline: 100,
  requirementsUrl: 500,
  message: 5000,
  description: 5000,
  default: 200,
};

export const ALLOWED_SERVICE_TYPES = [
  'custom-software',
  'saas-platform',
  'website',
  'mobile-app',
  'ai-automation',
  'system-integration',
  'maintenance',
  'other',
];

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Strips dangerous control characters while preserving normal text and line breaks.
 */
export function sanitizeString(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
}

/**
 * Returns `null` when valid, otherwise `{ field, code }` where code is one of
 * `required | email | phone | url | invalidService | tooLong | consent`.
 */
export function validateLead(
  fields,
  { required = [], email = 'email', phone = null, url = null, serviceType = null, consent = 'consent' } = {},
) {
  for (const name of required) {
    if (!String(fields[name] ?? '').trim()) return { field: name, code: 'required' };
  }

  if (email && fields[email] && !EMAIL_RE.test(String(fields[email]).trim())) {
    return { field: email, code: 'email' };
  }

  if (phone && fields[phone] && String(fields[phone]).trim()) {
    if (!PHONE_RE.test(String(fields[phone]).trim())) {
      return { field: phone, code: 'phone' };
    }
  }

  if (url && fields[url] && String(fields[url]).trim()) {
    if (!isValidHttpUrl(String(fields[url]).trim())) {
      return { field: url, code: 'url' };
    }
  }

  if (serviceType && fields[serviceType]) {
    if (!ALLOWED_SERVICE_TYPES.includes(String(fields[serviceType]).trim())) {
      return { field: serviceType, code: 'invalidService' };
    }
  }

  for (const [name, value] of Object.entries(fields)) {
    if (typeof value !== 'string') continue;
    const limit = FIELD_LIMITS[name] ?? FIELD_LIMITS.default;
    if (value.length > limit) return { field: name, code: 'tooLong' };
  }

  if (consent && fields[consent] !== true) return { field: consent, code: 'consent' };

  return null;
}

/**
 * Specialized validator for the "Solicitar um Projeto" commercial quote form.
 */
export function validateProjectQuote(fields) {
  return validateLead(fields, {
    required: ['name', 'email', 'country', 'serviceType', 'description'],
    email: 'email',
    phone: 'phone',
    url: 'requirementsUrl',
    serviceType: 'serviceType',
    consent: 'consent',
  });
}

/** Trims/sanitizes string values and drops honeypot / consent keys before sending. */
export function cleanPayload(fields, omit = []) {
  return Object.fromEntries(
    Object.entries(fields)
      .filter(([key]) => !omit.includes(key))
      .map(([key, value]) => [key, typeof value === 'string' ? sanitizeString(value) : value]),
  );
}
