import SectionCard from './SectionCard'

function ExpertiseCard({ tags }) {
  return (
    <SectionCard className="bg-white/40 p-8 backdrop-blur-sm">
      <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-on-surface">
        Expertise Focus
      </h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            className="rounded-full bg-primary-fixed-dim px-3 py-1 text-xs font-bold text-on-primary-fixed"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </SectionCard>
  )
}

export default ExpertiseCard
