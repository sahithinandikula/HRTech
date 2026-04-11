import MaterialIcon from './MaterialIcon'
import SectionCard from './SectionCard'

const toneStyles = {
  green: {
    bar: 'from-secondary-container to-secondary',
    ring: 'text-secondary',
    chip: 'bg-secondary-fixed text-on-secondary-container',
  },
  yellow: {
    bar: 'from-tertiary-fixed to-tertiary',
    ring: 'text-tertiary',
    chip: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  },
  red: {
    bar: 'from-error-container to-error',
    ring: 'text-error',
    chip: 'bg-error-container text-on-error-container',
  },
}

function HealthScoreCard({ score }) {
  const circumference = 283
  const dashOffset = circumference - (circumference * score.value) / 100
  const tone = toneStyles[score.tone]

  return (
    <SectionCard className="relative flex flex-col items-center overflow-hidden p-8">
      <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${tone.bar}`} />
      <h3 className="mb-8 self-start font-headline text-lg font-bold text-on-surface">Employee Health Score</h3>

      <div className="relative mb-6 h-48 w-48">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle
            className="stroke-current text-surface-container-high"
            cx="50"
            cy="50"
            fill="transparent"
            r="45"
            strokeWidth="8"
          />
          <circle
            className={`origin-center -rotate-90 stroke-current ${tone.ring}`}
            cx="50"
            cy="50"
            fill="transparent"
            r="45"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            strokeWidth="8"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">
            {score.value}%
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.26em] text-on-surface-variant">
            {score.label}
          </span>
        </div>
      </div>

      <p className="px-4 text-center text-sm leading-7 text-on-surface-variant">{score.summary}</p>

      <div className={`mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${tone.chip}`}>
        <MaterialIcon className="text-sm" name="auto_awesome" />
        {score.insight}
      </div>
    </SectionCard>
  )
}

export default HealthScoreCard
