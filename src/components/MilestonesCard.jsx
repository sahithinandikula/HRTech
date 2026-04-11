function MilestonesCard({ milestones }) {
  return (
    <article className="rounded-[30px] bg-surface-container-low p-8">
      <h4 className="font-headline text-lg font-bold text-on-surface">Upcoming Milestones</h4>

      <div className="mt-6 space-y-4">
        {milestones.map((milestone) => (
          <div key={milestone.title} className="flex items-center gap-4">
            <span
              className={`h-2 w-2 rounded-full ${
                milestone.tone === 'secondary' ? 'bg-secondary' : 'bg-primary'
              }`}
            />
            <span className="text-sm font-medium text-on-surface">{milestone.title}</span>
            <span className="ml-auto text-xs font-bold text-on-surface-variant">{milestone.when}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

export default MilestonesCard
