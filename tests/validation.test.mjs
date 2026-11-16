import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ALLOWED_SERVICE_TYPES,
  cleanPayload,
  validateLead,
  validateProjectQuote,
} from '../src/lib/validation.js';

const valid = { name: 'Ana', email: 'ana@example.com', message: 'Olá', consent: true, company: '' };
const opts = { required: ['name', 'email', 'message'] };

test('accepts a complete lead', () => {
  assert.equal(validateLead(valid, opts), null);
});

test('rejects missing required fields (whitespace counts as empty)', () => {
  assert.deepEqual(validateLead({ ...valid, name: '   ' }, opts), { field: 'name', code: 'required' });
});

test('rejects malformed email', () => {
  assert.deepEqual(validateLead({ ...valid, email: 'ana@' }, opts), { field: 'email', code: 'email' });
});

test('rejects oversized fields', () => {
  assert.deepEqual(validateLead({ ...valid, message: 'x'.repeat(5001) }, opts), { field: 'message', code: 'tooLong' });
  assert.deepEqual(validateLead({ ...valid, country: 'x'.repeat(201) }, opts), { field: 'country', code: 'tooLong' });
});

test('requires explicit consent', () => {
  assert.deepEqual(validateLead({ ...valid, consent: false }, opts), { field: 'consent', code: 'consent' });
});

test('cleanPayload trims strings, strips control characters and drops omitted keys', () => {
  assert.deepEqual(cleanPayload({ name: ' Ana\u0000 ', consent: true, company: 'bot' }, ['consent', 'company']), { name: 'Ana' });
});

test('validateProjectQuote accepts valid quote requests across all 8 service types', () => {
  const baseQuote = {
    name: 'Carlos Mendes',
    companyName: 'Empresa Lda',
    email: 'carlos@empresa.pt',
    phone: '+351 912 345 678',
    country: 'Portugal',
    serviceType: 'custom-software',
    description: 'Pretendemos desenvolver uma plataforma ERP e CRM integrada.',
    budget: '5.000 € – 15.000 €',
    timeline: '3 a 6 meses',
    requirementsUrl: 'https://docs.google.com/document/d/example',
    consent: true,
  };

  assert.equal(ALLOWED_SERVICE_TYPES.length, 8);
  for (const serviceType of ALLOWED_SERVICE_TYPES) {
    assert.equal(validateProjectQuote({ ...baseQuote, serviceType }), null, serviceType);
  }
});

test('validateProjectQuote rejects invalid phone, invalid URL, and unknown serviceType', () => {
  const baseQuote = {
    name: 'Carlos Mendes',
    email: 'carlos@empresa.pt',
    country: 'Portugal',
    serviceType: 'saas-platform',
    description: 'Plataforma SaaS multi-tenant.',
    consent: true,
  };

  assert.deepEqual(validateProjectQuote({ ...baseQuote, phone: 'abc' }), { field: 'phone', code: 'phone' });
  assert.deepEqual(validateProjectQuote({ ...baseQuote, requirementsUrl: 'javascript:alert(1)' }), {
    field: 'requirementsUrl',
    code: 'url',
  });
  assert.deepEqual(validateProjectQuote({ ...baseQuote, serviceType: 'unknown-service' }), {
    field: 'serviceType',
    code: 'invalidService',
  });
});
