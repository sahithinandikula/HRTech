const toneStyles = {
  success: 'bg-secondary-container text-on-secondary-container',
  primary: 'bg-primary-fixed text-on-primary-fixed-variant',
  neutral: 'bg-surface-container-high text-on-surface-variant',
}

function StatusBadge({ children, tone = 'neutral' }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${toneStyles[tone]}`}
    >
      {children}
    </span>
  )
}

export default StatusBadge
