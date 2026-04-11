import PipelineRow from './PipelineRow'

function PipelineBoard({ rows }) {
  return (
    <section className="rounded-[34px] bg-surface-container-lowest p-6 shadow-card sm:p-8 xl:p-10">
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

      <div className="space-y-3">
        {rows.map((person) => (
          <PipelineRow key={person.name} person={person} />
        ))}
      </div>

      <div className="mt-10 border-t border-outline-variant/10 pt-8 text-center">
        <button
          className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:underline"
          type="button"
        >
          View complete pipeline
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default PipelineBoard
