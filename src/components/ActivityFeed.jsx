function ActivityFeed({ items }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/65 p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Recent activity</h3>
        <span className="text-sm text-slate-400">Live</span>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <article key={item.title} className="rounded-3xl bg-white/5 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-sm font-medium text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
              </div>
              <span className="whitespace-nowrap text-xs text-slate-500">{item.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ActivityFeed
