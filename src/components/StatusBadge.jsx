import React from 'react';
import { statusMeta } from '../lib/status';

export default function StatusBadge({ status }) {
  const meta = statusMeta[status] || statusMeta.development;
  return (
    <span
      className="status-badge"
      style={{
        color: meta.color,
        borderColor: `${meta.color}55`,
        background: `${meta.color}14`,
      }}
    >
      <span aria-hidden>{meta.emoji}</span> {meta.label}
    </span>
  );
}
