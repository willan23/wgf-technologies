import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { statusLabel, statusMeta } from '../lib/status';

export default function StatusBadge({ status }) {
  const { lang } = useLanguage();
  const key = statusMeta[status] ? status : 'development';
  const meta = statusMeta[key];
  return (
    <span
      className="status-badge"
      style={{
        color: meta.color,
        borderColor: `${meta.color}55`,
        background: `${meta.color}14`,
      }}
    >
      <span aria-hidden>{meta.emoji}</span> {statusLabel(key, lang)}
    </span>
  );
}
