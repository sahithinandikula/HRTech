function StatCard({ stat }) {
  const toneStyles = {
    positive: 'text-emerald-300 bg-emerald-400/10',
    neutral: 'text-slate-300 bg-slate-400/10',
    warning: 'text-amber-300 bg-amber-400/10',
  }

  return (
    <article className="rounded-[28px] border border-white/10 bg-slate-900/65 p-5 shadow-soft">
      <p className="text-sm text-slate-400">{stat.title}</p>
      <div className="mt-6 flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold text-white">{stat.value}</p>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${toneStyles[stat.tone]}`}>
          {stat.change}
        </span>
      </div>
    </article>
  )
}

export default StatCard
