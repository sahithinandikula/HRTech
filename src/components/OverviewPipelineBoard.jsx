import MaterialIcon from './MaterialIcon'
import ProgressBar from './ProgressBar'
import SectionCard from './SectionCard'

const scoreToneClasses = {
  green: 'bg-secondary-fixed/20 text-on-secondary-fixed-variant',
  yellow: 'bg-tertiary-fixed/30 text-on-tertiary-fixed-variant',
  red: 'bg-error-container text-on-error-container',
  neutral: 'bg-surface-container-high text-on-surface-variant',
}

function OverviewPipelineBoard({ rows }) {
  return (
    <SectionCard className="p-6 sm:p-8 xl:p-10">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-headline text-2xl font-bold text-on-surface">Onboarding Pipeline</h3>
          <p className="mt-1 text-sm text-on-surface-variant">
            Real-time completion tracking for new hires
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-full bg-secondary-fixed/30 px-4 py-2 text-xs font-bold text-on-secondary-container">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          AI Optimizer Active
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((person) => (
          <div
            className={`flex flex-col gap-6 rounded-[28px] px-2 py-3 transition hover:bg-surface-container-low lg:flex-row lg:items-center lg:px-6 ${
              person.isAtRisk ? 'bg-error-container/40 ring-1 ring-error/10' : ''
            }`}
            key={person.name}
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <img alt={person.name} className="h-14 w-14 rounded-full object-cover ring-4 ring-surface" src={person.avatar} />
              <div className="min-w-0">
                <h4 className="truncate text-base font-bold text-on-surface">{person.name}</h4>
                <p className="truncate text-sm text-on-surface-variant">
                  {person.role} • {person.lastActive}
                </p>
              </div>
            </div>

            <div className="w-full lg:max-w-xs lg:flex-1">
              <div className="mb-2 flex justify-between text-xs font-bold text-on-surface-variant">
                <span>Progress</span>
                <span>{person.progress}%</span>
              </div>
              <ProgressBar value={person.progress} />
            </div>

            <div className="flex w-full items-start justify-between gap-4 lg:w-auto lg:items-center lg:justify-end">
              <div className="flex flex-col lg:items-end">
                <span className="mb-1 text-[11px] font-bold text-on-surface-variant">Health Score</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${scoreToneClasses[person.scoreTone]}`}
                >
                  <MaterialIcon className="text-[14px]" name={person.scoreIcon} />
                  {person.score}
                </span>
                <span className="mt-1 text-[11px] font-medium text-on-surface-variant">
                  {person.questionsAsked} questions asked
                </span>
              </div>
              <button
                className="rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition hover:bg-primary/20"
                onClick={() => alert('Check-in sent successfully')}
                type="button"
              >
                Send Check-in
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full text-outline transition hover:bg-surface-container-highest"
                type="button"
              >
                <MaterialIcon name="more_vert" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-outline-variant/10 pt-8 text-center">
        <button className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:underline" type="button">
          View complete pipeline
          <MaterialIcon className="text-base" name="arrow_forward" />
        </button>
      </div>
    </SectionCard>
  )
}

export default OverviewPipelineBoard
