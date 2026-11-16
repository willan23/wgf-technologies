export const statusMeta = {
  live: { label: 'Live', color: '#22c55e', emoji: '🟢' },
  beta: { label: 'Beta', color: '#3b82f6', emoji: '🔵' },
  mvp: { label: 'MVP', color: '#a855f7', emoji: '🟣' },
  development: { label: 'Development', color: '#eab308', emoji: '🟡' },
  private: { label: 'Private', color: '#94a3b8', emoji: '⚪' },
  archived: { label: 'Archived', color: '#ef4444', emoji: '🔴' },
};

// PT / FR display labels; EN falls back to statusMeta[status].label.
const statusLabels = {
  PT: {
    live: 'Em produção',
    beta: 'Beta',
    mvp: 'MVP',
    development: 'Em desenvolvimento',
    private: 'Privado',
    archived: 'Arquivado',
  },
  FR: {
    live: 'En production',
    beta: 'Bêta',
    mvp: 'MVP',
    development: 'En développement',
    private: 'Privé',
    archived: 'Archivé',
  },
};

export function statusLabel(status, lang = 'EN') {
  return statusLabels[lang]?.[status] || statusMeta[status]?.label || status;
}
