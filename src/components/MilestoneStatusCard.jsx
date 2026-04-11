import MaterialIcon from './MaterialIcon'
import SectionCard from './SectionCard'

const toneStyles = {
  success: 'bg-secondary-container text-on-secondary-container',
  primary: 'bg-primary-fixed text-primary',
}

function MilestoneStatusCard({ milestones }) {
  return (
    <SectionCard className="p-8">
      <h4 className="mb-6 font-headline text-lg font-bold">Milestone Status</h4>
      <div className="space-y-6">
        {milestones.map((item) => (
          <div className="flex items-center gap-4" key={item.title}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${toneStyles[item.tone]}`}>
              <MaterialIcon name={item.icon} />
            </div>
            <div>
              <p className="text-sm font-bold">{item.title}</p>
              <p className="text-xs text-on-surface-variant">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

export default MilestoneStatusCard
