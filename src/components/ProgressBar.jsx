function ProgressBar({ value, tone = 'primary', className = '' }) {
  const fillClass =
    tone === 'success'
      ? 'bg-secondary'
      : 'bg-gradient-to-r from-primary to-primary-container'

  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-surface-container-high ${className}`}>
      <div className={`h-full rounded-full ${fillClass}`} style={{ width: `${value}%` }} />
    </div>
  )
}

export default ProgressBar
