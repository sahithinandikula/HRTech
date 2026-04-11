import ChecklistTaskCard from './ChecklistTaskCard'

function ChecklistSection({ section }) {
  return (
    <section>
      <h4 className="mb-6 flex items-center gap-2 px-2 font-headline text-xs font-bold uppercase tracking-[0.24em] text-on-surface-variant">
        <span className="h-2 w-2 rounded-full bg-primary" />
        {section.title}
      </h4>
      <div className="space-y-3">
        {section.items.map((item) => (
          <ChecklistTaskCard item={item} key={item.title} />
        ))}
      </div>
    </section>
  )
}

export default ChecklistSection
