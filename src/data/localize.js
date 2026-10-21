// Data entries keep English as the base text and may carry `i18n: { PT: {...}, FR: {...} }`
// overrides. Missing keys fall back to English, so a partial translation never blanks a field.

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge(base, override) {
  const out = { ...base };
  for (const [key, value] of Object.entries(override)) {
    out[key] = isPlainObject(value) && isPlainObject(base[key]) ? deepMerge(base[key], value) : value;
  }
  return out;
}

export function localize(item, lang) {
  const override = item?.i18n?.[lang];
  return override ? deepMerge(item, override) : item;
}

export function localizeList(list, lang) {
  return list.map((item) => localize(item, lang));
}
