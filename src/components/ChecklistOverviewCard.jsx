import ProgressBar from './ProgressBar'
import SectionCard from './SectionCard'

function ChecklistOverviewCard({ value }) {
  return (
    <SectionCard className="w-full max-w-sm p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-on-surface-variant">Overall Completion</span>
        <span className="font-headline text-xl font-bold text-primary">{value}%</span>
      </div>
      <ProgressBar className="h-3" value={value} />
    </SectionCard>
  )
}

export default ChecklistOverviewCard
