function TaskList({ items }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/65 p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Priority queue</h3>
        <button type="button" className="text-sm text-brand-200 transition hover:text-brand-100">
          View all
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="flex items-center justify-between gap-4 rounded-3xl bg-white/5 px-4 py-4"
          >
            <div>
              <h4 className="text-sm font-medium text-white">{item.title}</h4>
              <p className="mt-1 text-sm text-slate-400">{item.owner}</p>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
              {item.priority}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TaskList
