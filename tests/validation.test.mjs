import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanPayload, validateLead } from '../src/lib/validation.js';

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

test('cleanPayload trims strings and drops omitted keys', () => {
  assert.deepEqual(cleanPayload({ name: ' Ana ', consent: true, company: 'bot' }, ['consent', 'company']), { name: 'Ana' });
});
