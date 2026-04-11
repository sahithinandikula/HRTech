const accentStyles = {
  error: 'border-error/20 bg-error-container/20',
  primary: 'border-primary/20 bg-primary-fixed/60',
  secondary: 'border-secondary/20 bg-secondary-fixed/25',
}

function InsightCard({ insight }) {
  return (
    <article className="flex items-center gap-4 rounded-[26px] bg-surface-container-lowest p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-ambient">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border ${accentStyles[insight.accent]} text-2xl`}
      >
        <span aria-hidden="true">{insight.emoji}</span>
      </div>

      <div>
        <h4 className="text-sm font-bold text-on-surface">{insight.title}</h4>
        <p className="text-xs font-medium text-on-surface-variant">{insight.description}</p>
      </div>
    </article>
  )
}

export default InsightCard
