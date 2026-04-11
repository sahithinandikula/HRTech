import SectionCard from './SectionCard'

function ActivityTimeline({ items }) {
  return (
    <SectionCard className="p-8">
      <h3 className="mb-8 font-headline text-lg font-bold text-on-surface">Recent Activity</h3>

      <div className="relative space-y-8 pl-8 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-0.5 before:bg-surface-container-high before:content-['']">
        {items.map((item) => (
          <div className="relative" key={`${item.title}-${item.time}`}>
            <div
              className={`absolute -left-[31px] top-1 h-6 w-6 rounded-full border-4 border-surface-container-lowest ${
                item.active ? 'bg-primary-container' : 'bg-surface-container-high'
              }`}
            />
            <div>
              <p className="text-sm font-bold text-on-surface">{item.title}</p>
              <p className="mt-1 text-xs text-on-surface-variant">{item.description}</p>
              <p className="mt-2 text-[10px] font-bold uppercase text-outline-variant">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

export default ActivityTimeline
