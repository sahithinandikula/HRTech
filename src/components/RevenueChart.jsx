function RevenueChart({ points }) {
  const max = Math.max(...points.map((point) => point.amount))

  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/65 p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-brand-200">Revenue trend</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Steady growth with stronger summer expansion</h3>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
          +18.4% QoQ
        </span>
      </div>

      <div className="mt-8 flex h-72 items-end gap-4">
        {points.map((point) => (
          <div key={point.month} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex h-56 w-full items-end rounded-3xl bg-white/5 p-2">
              <div
                className="w-full rounded-2xl bg-gradient-to-t from-brand-700 via-brand-500 to-cyan-300"
                style={{ height: `${(point.amount / max) * 100}%` }}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white">{point.month}</p>
              <p className="text-xs text-slate-400">${point.amount}K</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RevenueChart
