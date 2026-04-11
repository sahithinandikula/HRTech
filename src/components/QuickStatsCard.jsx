import SectionCard from './SectionCard'

function QuickStatsCard({ stats }) {
  return (
    <SectionCard className="flex items-center justify-between p-6">
      {stats.map((stat, index) => (
        <div className="flex flex-1 items-center justify-between" key={stat.label}>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">{stat.label}</p>
            <p className={`font-headline text-3xl font-extrabold ${stat.accent || 'text-on-surface'}`}>
              {stat.value}
            </p>
          </div>
          {index < stats.length - 1 ? <div className="mx-4 h-12 w-px bg-surface-container-high" /> : null}
        </div>
      ))}
    </SectionCard>
  )
}

export default QuickStatsCard
