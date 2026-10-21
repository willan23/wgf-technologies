// Pure lead validation (no imports) so it can run in the browser and in node tests.
// Server-side validation is still required once a backend endpoint exists.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const FIELD_LIMITS = {
  name: 120,
  email: 254,
  message: 5000,
  default: 200,
};

/**
 * Returns `null` when valid, otherwise `{ field, code }` where code is one of
 * `required | email | tooLong | consent`.
 */
export function validateLead(fields, { required = [], email = 'email', consent = 'consent' } = {}) {
  for (const name of required) {
    if (!String(fields[name] ?? '').trim()) return { field: name, code: 'required' };
  }

  if (email && fields[email] && !EMAIL_RE.test(String(fields[email]).trim())) {
    return { field: email, code: 'email' };
  }

  for (const [name, value] of Object.entries(fields)) {
    if (typeof value !== 'string') continue;
    const limit = FIELD_LIMITS[name] ?? FIELD_LIMITS.default;
    if (value.length > limit) return { field: name, code: 'tooLong' };
  }

  if (consent && fields[consent] !== true) return { field: consent, code: 'consent' };

  return null;
}

/** Trims string values and drops honeypot / consent keys before sending. */
export function cleanPayload(fields, omit = []) {
  return Object.fromEntries(
    Object.entries(fields)
      .filter(([key]) => !omit.includes(key))
      .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]),
  );
}
