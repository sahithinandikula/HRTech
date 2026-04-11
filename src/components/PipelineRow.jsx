import MaterialIcon from './MaterialIcon'

const statusStyles = {
  healthy: {
    label: 'bg-secondary/10 text-secondary',
    score: 'bg-secondary-fixed/20 text-on-secondary-fixed-variant',
  },
  risk: {
    label: 'bg-error/10 text-error',
    score: 'bg-error-container/60 text-error',
  },
  warning: {
    label: 'bg-tertiary/10 text-tertiary',
    score: 'bg-surface-container-high text-on-surface-variant',
  },
}

function PipelineRow({ person }) {
  const status = statusStyles[person.statusTone]

  return (
    <div className="flex flex-col gap-6 rounded-[28px] px-2 py-3 transition hover:bg-surface-container-low lg:flex-row lg:items-center lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <img
          alt={person.name}
          className="h-14 w-14 rounded-full object-cover ring-4 ring-surface"
          src={person.avatar}
        />
        <div className="min-w-0">
          <h4 className="truncate text-base font-bold text-on-surface">{person.name}</h4>
          <p className="truncate text-sm text-on-surface-variant">{person.role}</p>
        </div>
      </div>

      <div className="w-full lg:max-w-xs lg:flex-1">
        <div className="mb-2 flex justify-between text-xs font-bold text-on-surface-variant">
          <span>Progress</span>
          <span>{person.progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container"
            style={{ width: `${person.progress}%` }}
          />
        </div>
      </div>

      <div className="flex w-full items-start justify-between gap-4 lg:w-56 lg:items-center lg:justify-end">
        <div className="flex flex-col lg:items-end">
          <span className="mb-1 text-[11px] font-bold text-on-surface-variant">
            Health Status &amp; Score
          </span>
          <div className="flex flex-col gap-1.5 lg:items-end">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${status.label}`}
              >
                {person.statusLabel}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${status.score}`}
              >
                <MaterialIcon className="text-[14px]" name={person.scoreIcon} />
                {person.score}
              </span>
            </div>
            {person.note ? <span className="text-[10px] font-medium text-error">{person.note}</span> : null}
          </div>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-outline transition hover:bg-surface-container-highest"
          type="button"
        >
          <MaterialIcon name="more_vert" />
        </button>
      </div>
    </div>
  )
}

export default PipelineRow
